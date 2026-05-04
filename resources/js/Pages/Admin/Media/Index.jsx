import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    Folder, 
    Image as ImageIcon, 
    MoreVertical, 
    Plus, 
    ChevronRight, 
    Home, 
    Trash2, 
    Download, 
    Copy,
    Upload,
    Grid,
    List as ListIcon,
    X,
    FileImage,
    Edit2,
    ExternalLink
} from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

export default function Index({ folders, media, currentFolder, breadcrumbs }) {
    const [viewMode, setViewMode] = useState('grid');
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [editingMedia, setEditingMedia] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const folderForm = useForm({
        name: '',
        parent_id: currentFolder?.id || null,
    });

    const editForm = useForm({
        name: '',
    });

    const createFolder = (e) => {
        e.preventDefault();
        folderForm.post(route('admin.media.folders.store'), {
            onSuccess: () => {
                setIsCreateFolderModalOpen(false);
                folderForm.reset();
            }
        });
    };

    const startEditing = (item) => {
        setEditingMedia(item);
        editForm.setData('name', item.name);
    };

    const updateMedia = (e) => {
        e.preventDefault();
        editForm.put(route('admin.media.update', editingMedia.id), {
            onSuccess: () => setEditingMedia(null)
        });
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        if (currentFolder) {
            formData.append('folder_id', currentFolder.id);
        }

        setUploading(true);
        router.post(route('admin.media.upload'), formData, {
            onFinish: () => setUploading(false),
        });
    };

    const deleteMedia = (id) => {
        if (confirm('Tem certeza que deseja excluir esta imagem?')) {
            router.delete(route('admin.media.destroy', id));
        }
    };

    const deleteFolder = (id) => {
        if (confirm('Tem certeza que deseja excluir esta pasta e todo o seu conteúdo?')) {
            router.delete(route('admin.media.folders.destroy', id));
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Link copiado para a área de transferência!');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Biblioteca de Mídia</h2>
                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Link href={route('admin.media.index')} className="hover:text-gold-600 transition flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                Home
                            </Link>
                            {breadcrumbs.map((crumb) => (
                                <div key={crumb.id} className="flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4" />
                                    <Link 
                                        href={route('admin.media.index', { folder_id: crumb.id })}
                                        className="hover:text-gold-600 transition"
                                    >
                                        {crumb.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsCreateFolderModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <Plus className="h-4 w-4" />
                            Nova Pasta
                        </button>
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            disabled={uploading}
                            className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-600 disabled:opacity-50"
                        >
                            <Upload className="h-4 w-4" />
                            {uploading ? 'Enviando...' : 'Carregar'}
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleUpload} 
                            className="hidden" 
                            accept="image/*"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Biblioteca de Mídia" />

            <div className="space-y-8">
                {/* Folders Section */}
                {folders.length > 0 && (
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Pastas</h3>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {folders.map((folder) => (
                                <div 
                                    key={folder.id}
                                    className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-gold-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/50"
                                >
                                    <Link 
                                        href={route('admin.media.index', { folder_id: folder.id })}
                                        className="flex flex-1 items-center gap-3 overflow-hidden"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                            <Folder className="h-5 w-5" />
                                        </div>
                                        <span className="truncate font-medium text-slate-700 dark:text-slate-200">{folder.name}</span>
                                    </Link>
                                    <button 
                                        onClick={() => deleteFolder(folder.id)}
                                        className="rounded-lg p-1 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Media Section */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Arquivos</h3>
                        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`rounded-lg p-1.5 transition ${viewMode === 'grid' ? 'bg-white shadow-sm dark:bg-slate-700 text-gold-600' : 'text-slate-500'}`}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`rounded-lg p-1.5 transition ${viewMode === 'list' ? 'bg-white shadow-sm dark:bg-slate-700 text-gold-600' : 'text-slate-500'}`}
                            >
                                <ListIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {media.length === 0 && folders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 py-24 dark:border-slate-800">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-slate-900">
                                <FileImage className="h-10 w-10" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Esta pasta está vazia</h4>
                            <p className="mt-2 text-slate-500">Arraste arquivos ou clique em carregar para começar.</p>
                        </div>
                    ) : (
                        viewMode === 'grid' ? (
                            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {media.map((item) => (
                                    <div 
                                        key={item.id}
                                        className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:border-gold-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/50"
                                    >
                                        <div 
                                            className="aspect-square cursor-pointer overflow-hidden bg-slate-50 dark:bg-black/20"
                                            onClick={() => startEditing(item)}
                                        >
                                            <img 
                                                src={item.url} 
                                                alt={item.name} 
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-4 cursor-pointer" onClick={() => startEditing(item)}>
                                            <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {item.width && item.height ? `${item.width}x${item.height} • ` : ''}
                                                {(item.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        
                                        {/* Actions Overlay */}
                                        <div className="absolute inset-x-0 top-0 flex items-center justify-end gap-2 p-3 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-b from-black/50 to-transparent">
                                            <button 
                                                onClick={() => copyToClipboard(item.url)}
                                                className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition hover:bg-white/40"
                                                title="Copiar Link"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => startEditing(item)}
                                                className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition hover:bg-white/40"
                                                title="Editar"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => deleteMedia(item.id)}
                                                className="rounded-full bg-red-500/80 p-2 text-white backdrop-blur-md transition hover:bg-red-600"
                                                title="Excluir"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Nome</th>
                                            <th className="px-6 py-4 font-semibold">Dimensões</th>
                                            <th className="px-6 py-4 font-semibold">Tamanho</th>
                                            <th className="px-6 py-4 font-semibold">Data</th>
                                            <th className="px-6 py-4 font-semibold text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {media.map((item) => (
                                            <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/5">
                                                <td className="px-6 py-4 cursor-pointer" onClick={() => startEditing(item)}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                                            <img src={item.url} className="h-full w-full object-cover" />
                                                        </div>
                                                        <span className="font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{item.width ? `${item.width}x${item.height} px` : '-'}</td>
                                                <td className="px-6 py-4 text-slate-500">{(item.size / 1024).toFixed(1)} KB</td>
                                                <td className="px-6 py-4 text-slate-500">{new Date(item.created_at).toLocaleDateString('pt-BR')}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => copyToClipboard(item.url)}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-gold-600 dark:hover:bg-slate-800 shadow-sm"
                                                            title="Copiar Link"
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => startEditing(item)}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-gold-600 dark:hover:bg-slate-800 shadow-sm"
                                                            title="Renomear"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteMedia(item.id)}
                                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                                            title="Excluir"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </section>
            </div>

            {/* Create Folder Modal */}
            {isCreateFolderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCreateFolderModalOpen(false)}></div>
                    <div className="relative w-full max-w-md rounded-[2.5rem] bg-white p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Criar Nova Pasta</h3>
                            <button onClick={() => setIsCreateFolderModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={createFolder} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome da Pasta</label>
                                <input 
                                    type="text" 
                                    value={folderForm.data.name}
                                    onChange={e => folderForm.setData('name', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                                    placeholder="Ex: Coleção Verão"
                                    autoFocus
                                />
                                {folderForm.errors.name && <p className="mt-1 text-sm text-red-500">{folderForm.errors.name}</p>}
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsCreateFolderModalOpen(false)}
                                    className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    disabled={folderForm.processing}
                                    className="flex-1 rounded-2xl bg-gold-500 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-600 disabled:opacity-50"
                                >
                                    {folderForm.processing ? 'Criando...' : 'Criar Pasta'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Media Modal */}
            {editingMedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingMedia(null)}></div>
                    <div className="relative w-full max-w-2xl rounded-[2.5rem] bg-white p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Detalhes do Arquivo</h3>
                            <button onClick={() => setEditingMedia(null)} className="text-slate-400 hover:text-slate-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="aspect-square overflow-hidden rounded-3xl bg-slate-50 dark:bg-black/20">
                                    <img src={editingMedia.url} className="h-full w-full object-contain" />
                                </div>
                                <div className="flex justify-center">
                                    <a 
                                        href={editingMedia.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Abrir em nova aba
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <form onSubmit={updateMedia} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome do Arquivo</label>
                                        <input 
                                            type="text" 
                                            value={editForm.data.name}
                                            onChange={e => editForm.setData('name', e.target.value)}
                                            className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                                        />
                                        {editForm.errors.name && <p className="mt-1 text-sm text-red-500">{editForm.errors.name}</p>}
                                    </div>

                                    <div className="flex gap-2">
                                        <button 
                                            type="submit"
                                            disabled={editForm.processing}
                                            className="flex-1 rounded-2xl bg-gold-500 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-600 disabled:opacity-50"
                                        >
                                            {editForm.processing ? 'Salvando...' : 'Salvar Nome'}
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => copyToClipboard(editingMedia.url)}
                                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                            title="Copiar Link"
                                        >
                                            <Copy className="h-5 w-5" />
                                        </button>
                                    </div>
                                </form>

                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 space-y-2">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Informações</h4>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        <span className="text-slate-500">Tipo:</span>
                                        <span className="text-slate-700 dark:text-slate-300">{editingMedia.mime_type}</span>
                                        <span className="text-slate-500">Tamanho:</span>
                                        <span className="text-slate-700 dark:text-slate-300">{(editingMedia.size / 1024).toFixed(1)} KB</span>
                                        {editingMedia.width && (
                                            <>
                                                <span className="text-slate-500">Dimensões:</span>
                                                <span className="text-slate-700 dark:text-slate-300">{editingMedia.width}x{editingMedia.height} px</span>
                                            </>
                                        )}
                                        <span className="text-slate-500">Enviado em:</span>
                                        <span className="text-slate-700 dark:text-slate-300">{new Date(editingMedia.created_at).toLocaleString('pt-BR')}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => {
                                        deleteMedia(editingMedia.id);
                                        setEditingMedia(null);
                                    }}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Excluir permanentemente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
