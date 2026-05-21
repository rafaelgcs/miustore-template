import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Folder, 
    Image as ImageIcon, 
    Plus, 
    ChevronRight, 
    Home, 
    Upload, 
    X, 
    Loader2, 
    FolderPlus,
    FileImage
} from 'lucide-react';
import axios from 'axios';

export default function MediaSelectorModal({ isOpen, onClose, onSelect }) {
    const [folders, setFolders] = useState([]);
    const [media, setMedia] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [creatingFolder, setCreatingFolder] = useState(false);
    
    const fileInputRef = useRef(null);

    const fetchFolder = async (folderId) => {
        setLoading(true);
        try {
            const response = await axios.get(route('admin.media.index'), {
                params: { folder_id: folderId }
            });
            setFolders(response.data.folders);
            setMedia(response.data.media);
            setCurrentFolder(response.data.currentFolder);
            setBreadcrumbs(response.data.breadcrumbs);
            setCurrentFolderId(folderId);
        } catch (err) {
            console.error('Erro ao buscar biblioteca:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchFolder(null);
        }
    }, [isOpen]);

    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;
        setCreatingFolder(true);
        try {
            await axios.post(route('admin.media.folders.store'), {
                name: newFolderName,
                parent_id: currentFolderId
            });
            setNewFolderName('');
            setIsCreateFolderOpen(false);
            fetchFolder(currentFolderId);
        } catch (err) {
            console.error('Erro ao criar pasta:', err);
        } finally {
            setCreatingFolder(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        if (currentFolderId) {
            formData.append('folder_id', currentFolderId);
        }

        setUploading(true);
        try {
            await axios.post(route('admin.media.upload'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchFolder(currentFolderId);
        } catch (err) {
            console.error('Erro ao fazer upload:', err);
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
                    onClick={onClose}
                />

                {/* Modal Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative flex flex-col w-full max-w-4xl h-[85vh] rounded-[2.5rem] bg-white p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Selecionar Imagem</h3>
                            {/* Breadcrumbs */}
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <button 
                                    onClick={() => fetchFolder(null)} 
                                    className="hover:text-gold-600 transition flex items-center gap-1 font-semibold"
                                >
                                    <Home className="h-3.5 w-3.5" />
                                    Home
                                </button>
                                {breadcrumbs.map((crumb) => (
                                    <div key={crumb.id} className="flex items-center gap-2">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                        <button 
                                            onClick={() => fetchFolder(crumb.id)}
                                            className="hover:text-gold-600 transition font-semibold"
                                        >
                                            {crumb.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsCreateFolderOpen(true)}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <FolderPlus className="h-3.5 w-3.5" />
                                Nova Pasta
                            </button>
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                disabled={uploading}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-gold-500 px-3 py-2 text-xs font-bold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-600 disabled:opacity-50"
                            >
                                <Upload className="h-3.5 w-3.5" />
                                {uploading ? 'Enviando...' : 'Carregar'}
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleUpload} 
                                className="hidden" 
                                accept="image/*"
                            />
                            <button 
                                onClick={onClose} 
                                className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto py-6">
                        {loading ? (
                            <div className="flex h-full flex-col items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
                                <span className="mt-2 text-sm text-slate-500">Carregando arquivos...</span>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Create Folder Mini Inline Panel */}
                                {isCreateFolderOpen && (
                                    <motion.form 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onSubmit={handleCreateFolder} 
                                        className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800"
                                    >
                                        <input 
                                            type="text" 
                                            value={newFolderName}
                                            onChange={e => setNewFolderName(e.target.value)}
                                            placeholder="Nome da pasta..."
                                            className="flex-1 rounded-xl border-slate-200 bg-white px-3 py-2 text-xs focus:border-gold-500 focus:ring-gold-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            autoFocus
                                        />
                                        <button 
                                            type="submit"
                                            disabled={creatingFolder || !newFolderName.trim()}
                                            className="rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-md transition hover:bg-gold-600 disabled:opacity-50"
                                        >
                                            {creatingFolder ? 'Criando...' : 'Salvar'}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setIsCreateFolderOpen(false)}
                                            className="p-2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </motion.form>
                                )}

                                {/* Folders */}
                                {folders.length > 0 && (
                                    <div>
                                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Pastas</h4>
                                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                            {folders.map((folder) => (
                                                <button
                                                    key={folder.id}
                                                    onClick={() => fetchFolder(folder.id)}
                                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-gold-300 hover:bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/50"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                                                        <Folder className="h-4.5 w-4.5" />
                                                    </div>
                                                    <span className="truncate font-medium text-xs text-slate-700 dark:text-slate-200">{folder.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Media Files */}
                                <div>
                                    <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Imagens</h4>
                                    
                                    {media.length === 0 && folders.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-100 rounded-3xl dark:border-slate-800">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-slate-900">
                                                <FileImage className="h-7 w-7" />
                                            </div>
                                            <h4 className="mt-3 text-sm font-semibold text-slate-700 dark:text-white">Pasta Vazia</h4>
                                            <p className="mt-1 text-xs text-slate-500">Nenhuma imagem cadastrada nesta pasta.</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                                            {media.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => onSelect(item.url)}
                                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-gold-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/50"
                                                >
                                                    <div className="aspect-square w-full overflow-hidden bg-slate-50 dark:bg-black/20">
                                                        <img 
                                                            src={item.url} 
                                                            alt={item.name} 
                                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="p-2 w-full">
                                                        <p className="truncate text-left text-[10px] font-medium text-slate-700 dark:text-slate-200">{item.name}</p>
                                                        <p className="mt-0.5 text-left text-[9px] text-slate-400">
                                                            {(item.size / 1024).toFixed(0)} KB
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
