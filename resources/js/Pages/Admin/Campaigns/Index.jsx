import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Search, Megaphone, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, campaigns }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { delete: destroy } = useForm();

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta campanha?')) {
            destroy(route('admin.campaigns.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Campanhas</h2>}
        >
            <Head title="Gerenciar Campanhas" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar campanhas..."
                            className="w-full rounded-2xl border-slate-200 bg-white/50 pl-10 pr-4 py-2.5 text-sm backdrop-blur-sm transition focus:border-gold-500 focus:ring-gold-500 dark:border-slate-800 dark:bg-slate-950/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link
                        href={route('admin.campaigns.create')}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                    >
                        <Plus className="h-4 w-4" />
                        Nova Campanha
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {filteredCampaigns.map((campaign) => (
                        <div key={campaign.id} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition hover:border-gold-300 dark:border-white/10 dark:bg-slate-950/80">
                            <div className="flex gap-6">
                                {campaign.image && (
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5">
                                        <img src={campaign.image.startsWith('http') ? campaign.image : `/storage/${campaign.image}`} alt={campaign.title} className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-slate-900 dark:text-slate-100">{campaign.title}</h3>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.campaigns.edit', campaign.id)} className="text-slate-400 hover:text-gold-500">
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(campaign.id)} className="text-slate-400 hover:text-red-500">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{campaign.subtitle}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${campaign.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            {campaign.active ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                            {campaign.active ? 'Ativa' : 'Inativa'}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ordem: {campaign.order}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
