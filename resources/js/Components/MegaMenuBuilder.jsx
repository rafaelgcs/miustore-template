import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Image as ImageIcon, Link as LinkIcon, Type, AlignLeft, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MegaMenuBuilder({ content, onChange }) {
    const updateContent = (newContent) => {
        onChange({ ...content, ...newContent });
    };

    const addColumn = () => {
        const columns = [...(content.columns || [])];
        columns.push({
            title: 'Nova Coluna',
            links: [],
            footer: { name: '', href: '' }
        });
        updateContent({ columns });
    };

    const removeColumn = (index) => {
        const columns = content.columns.filter((_, i) => i !== index);
        updateContent({ columns });
    };

    const updateColumn = (index, field, value) => {
        const columns = [...content.columns];
        columns[index] = { ...columns[index], [field]: value };
        updateContent({ columns });
    };

    const moveColumn = (index, direction) => {
        const columns = [...content.columns];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < columns.length) {
            [columns[index], columns[newIndex]] = [columns[newIndex], columns[index]];
            updateContent({ columns });
        }
    };

    const addLink = (colIndex) => {
        const columns = [...content.columns];
        columns[colIndex].links.push({ name: '', href: '' });
        updateContent({ columns });
    };

    const removeLink = (colIndex, linkIndex) => {
        const columns = [...content.columns];
        columns[colIndex].links = columns[colIndex].links.filter((_, i) => i !== linkIndex);
        updateContent({ columns });
    };

    const updateLink = (colIndex, linkIndex, field, value) => {
        const columns = [...content.columns];
        columns[colIndex].links[linkIndex] = { ...columns[colIndex].links[linkIndex], [field]: value };
        updateContent({ columns });
    };

    const moveLink = (colIndex, linkIndex, direction) => {
        const columns = [...content.columns];
        const links = [...columns[colIndex].links];
        const newIndex = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
        if (newIndex >= 0 && newIndex < links.length) {
            [links[linkIndex], links[newIndex]] = [links[newIndex], links[linkIndex]];
            columns[colIndex].links = links;
            updateContent({ columns });
        }
    };

    const updateFeatured = (field, value) => {
        updateContent({
            featured: { ...(content.featured || {}), [field]: value }
        });
    };

    const updateFooter = (colIndex, field, value) => {
        const columns = [...content.columns];
        columns[colIndex].footer = { ...(columns[colIndex].footer || {}), [field]: value };
        updateContent({ columns });
    };

    return (
        <div className="space-y-12">
            {/* Columns Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <AlignLeft className="h-5 w-5 text-gold-500" />
                            Colunas do Menu
                        </h4>
                        <p className="text-xs text-slate-500">Adicione até 4 colunas de links para o mega menu.</p>
                    </div>
                    <button
                        type="button"
                        onClick={addColumn}
                        disabled={(content.columns || []).length >= 4}
                        className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-gold-400 disabled:opacity-50"
                    >
                        <Plus className="h-4 w-4" />
                        Adicionar Coluna
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {(content.columns || []).map((col, colIdx) => (
                            <motion.div
                                key={colIdx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative rounded-[2rem] border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-white/5 transition-all hover:border-gold-500/30"
                            >
                                <div className="absolute -top-3 -right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => moveColumn(colIdx, 'up')}
                                        disabled={colIdx === 0}
                                        className="h-8 w-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-gold-500 disabled:opacity-30 shadow-sm"
                                    >
                                        <ChevronUp className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveColumn(colIdx, 'down')}
                                        disabled={colIdx === content.columns.length - 1}
                                        className="h-8 w-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-gold-500 disabled:opacity-30 shadow-sm"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeColumn(colIdx)}
                                        className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Título da Coluna</label>
                                        <input
                                            type="text"
                                            value={col.title}
                                            onChange={(e) => updateColumn(colIdx, 'title', e.target.value)}
                                            className="w-full rounded-xl border-slate-200 bg-white px-4 py-2 text-sm focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                            placeholder="Ex: Coleções, Categorias"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Links</label>
                                            <button
                                                type="button"
                                                onClick={() => addLink(colIdx)}
                                                className="text-[10px] font-bold text-gold-600 dark:text-gold-400 hover:underline uppercase tracking-wider"
                                            >
                                                + Adicionar Link
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {(col.links || []).map((link, linkIdx) => (
                                                <div key={linkIdx} className="flex items-center gap-2">
                                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            value={link.name || ''}
                                                            onChange={(e) => updateLink(colIdx, linkIdx, 'name', e.target.value)}
                                                            className="rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                                            placeholder="Nome"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={link.href || ''}
                                                            onChange={(e) => updateLink(colIdx, linkIdx, 'href', e.target.value)}
                                                            className="rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                                            placeholder="URL/Rota"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => moveLink(colIdx, linkIdx, 'up')}
                                                            disabled={linkIdx === 0}
                                                            className="p-1 text-slate-400 hover:text-gold-500 disabled:opacity-20"
                                                        >
                                                            <ChevronUp className="h-3 w-3" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLink(colIdx, linkIdx)}
                                                            className="p-1 text-slate-400 hover:text-red-500"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {(col.links || []).length === 0 && (
                                                <p className="text-[10px] text-slate-500 italic text-center py-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">Nenhum link adicionado.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Link de Rodapé (Opcional)</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="text"
                                                value={col.footer?.name || ''}
                                                onChange={(e) => updateFooter(colIdx, 'name', e.target.value)}
                                                className="rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                                placeholder="Texto (ex: Ver Todos)"
                                            />
                                            <input
                                                type="text"
                                                value={col.footer?.href || ''}
                                                onChange={(e) => updateFooter(colIdx, 'href', e.target.value)}
                                                className="rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                                placeholder="URL/Rota"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Featured Section */}
            <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-gold-500" />
                        Destaque Lateral
                    </h4>
                    <p className="text-xs text-slate-500">Personalize o banner que aparece no lado direito do mega menu.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start rounded-[2.5rem] border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-white/5">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <LinkIcon className="h-4 w-4 text-gold-500" />
                                URL da Imagem
                            </label>
                            <input
                                type="text"
                                value={content.featured?.image || ''}
                                onChange={(e) => updateFeatured('image', e.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Type className="h-4 w-4 text-gold-500" />
                                Título do Destaque
                            </label>
                            <input
                                type="text"
                                value={content.featured?.title || ''}
                                onChange={(e) => updateFeatured('title', e.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                placeholder="Ex: Nova Coleção"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Info className="h-4 w-4 text-gold-500" />
                                Descrição
                            </label>
                            <textarea
                                value={content.featured?.description || ''}
                                onChange={(e) => updateFeatured('description', e.target.value)}
                                rows="3"
                                className="w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                placeholder="Uma breve descrição sobre o destaque..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Prévia do Destaque</label>
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                            {content.featured?.image ? (
                                <>
                                    <img
                                        src={content.featured.image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h5 className="text-sm font-bold text-white uppercase">{content.featured.title || 'Título Aqui'}</h5>
                                        <p className="text-[10px] text-white/80 line-clamp-2">{content.featured.description || 'Descrição aparece aqui...'}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-slate-400">
                                    <ImageIcon className="h-8 w-8 mb-2" />
                                    <p className="text-xs">Sem imagem para exibir</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
