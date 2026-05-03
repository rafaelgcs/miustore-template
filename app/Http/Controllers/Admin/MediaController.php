<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $folderId = $request->query('folder_id');
        
        $currentFolder = null;
        if ($folderId) {
            $currentFolder = MediaFolder::with('parent')->findOrFail($folderId);
        }

        $folders = MediaFolder::where('parent_id', $folderId)
            ->orderBy('name')
            ->get();

        $media = Media::where('folder_id', $folderId)
            ->orderByDesc('created_at')
            ->get();

        // Breadcrumbs
        $breadcrumbs = [];
        $tempFolder = $currentFolder;
        while ($tempFolder) {
            array_unshift($breadcrumbs, [
                'id' => $tempFolder->id,
                'name' => $tempFolder->name
            ]);
            $tempFolder = $tempFolder->parent;
        }

        return Inertia::render('Admin/Media/Index', [
            'folders' => $folders,
            'media' => $media,
            'currentFolder' => $currentFolder,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }

    public function storeFolder(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:media_folders,id',
        ]);

        MediaFolder::create($data);

        return back()->with('success', 'Pasta criada com sucesso.');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:10240', // 10MB limit
            'folder_id' => 'nullable|exists:media_folders,id',
        ]);

        $file = $request->file('file');
        $folderId = $request->input('folder_id');
        
        $originalName = $file->getClientOriginalName();
        $fileName = pathinfo($originalName, PATHINFO_FILENAME);
        $extension = 'webp';
        $uniqueName = Str::slug($fileName) . '-' . time() . '.' . $extension;
        
        $path = 'media/' . ($folderId ? $folderId . '/' : '') . $uniqueName;

        // Process Image
        $hasGd = extension_loaded('gd');
        $hasImagick = extension_loaded('imagick');

        if ($hasGd || $hasImagick) {
            $manager = new ImageManager($hasGd ? new Driver() : new \Intervention\Image\Drivers\Imagick\Driver());
            $image = $manager->read($file);
            
            // Auto-orient and resize if larger than 1920px width
            if ($image->width() > 1920) {
                $image->scale(width: 1920);
            }
            
            // Convert to WebP and save
            $encoded = $image->toWebp(80);
            
            Storage::disk('public')->put($path, (string) $encoded);

            Media::create([
                'folder_id' => $folderId,
                'name' => $fileName,
                'file_name' => $uniqueName,
                'mime_type' => 'image/webp',
                'disk' => 'public',
                'path' => $path,
                'size' => strlen($encoded),
                'width' => $image->width(),
                'height' => $image->height(),
            ]);
        } else {
            // Fallback: Store original file without optimization
            $extension = $file->getClientOriginalExtension();
            $uniqueName = Str::slug($fileName) . '-' . time() . '.' . $extension;
            $path = $file->storeAs('media/' . ($folderId ? $folderId . '/' : ''), $uniqueName, 'public');
            
            // Get dimensions if possible (getimagesize doesn't always need GD for basic info)
            $dimensions = @getimagesize($file);

            Media::create([
                'folder_id' => $folderId,
                'name' => $fileName,
                'file_name' => $uniqueName,
                'mime_type' => $file->getMimeType(),
                'disk' => 'public',
                'path' => $path,
                'size' => $file->getSize(),
                'width' => $dimensions[0] ?? null,
                'height' => $dimensions[1] ?? null,
            ]);
        }

        return back()->with('success', ($hasGd || $hasImagick) 
            ? 'Imagem enviada e otimizada com sucesso.' 
            : 'Imagem enviada com sucesso (Nota: Otimização automática desabilitada pois a extensão GD/Imagick não está instalada no servidor).');
    }

    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $media->update($data);

        return back()->with('success', 'Arquivo renomeado com sucesso.');
    }

    public function destroy(Media $media)
    {
        Storage::disk($media->disk)->delete($media->path);
        $media->delete();

        return back()->with('success', 'Arquivo excluído com sucesso.');
    }

    public function destroyFolder(MediaFolder $folder)
    {
        // Recursive delete could be dangerous, so we'll just check if it's empty or handle it simply
        // For now, let's delete all media and subfolders
        $this->deleteRecursive($folder);
        
        return back()->with('success', 'Pasta e conteúdos excluídos com sucesso.');
    }

    private function deleteRecursive(MediaFolder $folder)
    {
        foreach ($folder->media as $media) {
            Storage::disk($media->disk)->delete($media->path);
            $media->delete();
        }

        foreach ($folder->children as $child) {
            $this->deleteRecursive($child);
        }

        $folder->delete();
    }
}
