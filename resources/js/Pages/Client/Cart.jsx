import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, 
    Trash2, 
    Minus, 
    Plus, 
    ArrowLeft, 
    ShoppingCart, 
    CreditCard,
    MapPin,
    Truck,
    Zap,
    Info,
    CheckCircle2,
    ChevronRight,
    PlusCircle,
    Home,
    Briefcase,
    Building2,
    MoreHorizontal,
    Trash
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cart({ auth, cartItems, addresses: initialAddresses = [] }) {
    const { patch, delete: destroy, post, processing } = useForm();
    const [step, setStep] = useState(1); // 1: Carrinho, 2: Entrega, 3: Pagamento/Revisão
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState(initialAddresses.find(a => a.is_default) || null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
    const [shippingData, setShippingData] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [shippingMode, setShippingMode] = useState('ensemble'); // 'ensemble' or 'individual'
    const [individualShipping, setIndividualShipping] = useState({}); // { cart_item_id: { methods, selected } }

    const [addressForm, setAddressForm] = useState({
        name: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        is_default: false,
    });

    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.final_price) * item.quantity), 0);

    // Calculate total shipping
    const totalShipping = shippingMode === 'ensemble' 
        ? (selectedMethod ? selectedMethod.price : 0)
        : Object.values(individualShipping).reduce((acc, curr) => acc + (curr.selected ? curr.selected.price : 0), 0);

    const total = subtotal + totalShipping;

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        patch(route('cart.update', id), { quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        destroy(route('cart.remove', id), { preserveScroll: true });
    };

    const fetchAddressFromCep = async (cep) => {
        const cleaned = cep.replace(/\D/g, '');
        if (cleaned.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cleaned}/json/`);
                if (!response.data.erro) {
                    setAddressForm(prev => ({
                        ...prev,
                        logradouro: response.data.logradouro,
                        bairro: response.data.bairro,
                        cidade: response.data.localidade,
                        uf: response.data.uf,
                        cep: cleaned
                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar CEP', error);
            }
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route('client.addresses.store'), addressForm);
            setAddresses([response.data, ...addresses.map(a => addressForm.is_default ? { ...a, is_default: false } : a)]);
            setSelectedAddress(response.data);
            setShowAddressForm(false);
            setAddressForm({ name: '', cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '', is_default: false });
        } catch (error) {
            console.error('Erro ao salvar endereço', error);
            alert('Erro ao salvar endereço. Verifique os campos.');
        }
    };

    const calculateShipping = async (address) => {
        if (!address) return;
        setIsCalculatingShipping(true);
        try {
            if (shippingMode === 'ensemble') {
                const response = await axios.post(route('shipping.calculate'), {
                    cep: address.cep,
                    cart: true
                });
                setShippingData(response.data);
                if (response.data.methods.length > 0) {
                    setSelectedMethod(response.data.methods[0]);
                }
            } else {
                // Individual mode
                const results = {};
                for (const item of cartItems) {
                    const response = await axios.post(route('shipping.calculate'), {
                        cep: address.cep,
                        product_id: item.product_id
                    });
                    results[item.id] = {
                        methods: response.data.methods,
                        selected: response.data.methods[0] || null
                    };
                }
                setIndividualShipping(results);
            }
        } catch (error) {
            console.error('Erro ao calcular frete', error);
        } finally {
            setIsCalculatingShipping(false);
        }
    };

    useEffect(() => {
        if (step === 2 && selectedAddress) {
            calculateShipping(selectedAddress);
        }
    }, [step, selectedAddress, shippingMode]);

    const handleCheckout = () => {
        const shippingPayload = shippingMode === 'ensemble'
            ? { shipping_method: selectedMethod?.id, shipping_amount: selectedMethod?.price }
            : { 
                shipping_mode: 'individual',
                individual_shipping: Object.entries(individualShipping).reduce((acc, [id, data]) => {
                    acc[id] = { method: data.selected?.id, price: data.selected?.price };
                    return acc;
                }, {})
              };

        post(route('client.orders.store'), {
            ...shippingPayload,
            subtotal,
            address_id: selectedAddress?.id,
        });
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-12">
            {[
                { id: 1, name: 'Carrinho', icon: ShoppingBag },
                { id: 2, name: 'Entrega', icon: Truck },
                { id: 3, name: 'Pagamento', icon: CreditCard },
            ].map((s, idx) => (
                <div key={s.id} className="flex items-center">
                    <div className="flex flex-col items-center relative">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                            step >= s.id 
                                ? 'bg-gold-500 border-gold-500 text-neutral-900 shadow-lg shadow-gold-500/20' 
                                : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400'
                        }`}>
                            <s.icon className="h-5 w-5" />
                        </div>
                        <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${
                            step >= s.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                        }`}>
                            {s.name}
                        </span>
                    </div>
                    {idx < 2 && (
                        <div className={`w-16 h-0.5 mx-2 ${step > s.id ? 'bg-gold-500' : 'bg-slate-200 dark:border-white/10'}`} />
                    )}
                </div>
            ))}
        </div>
    );

    const CartStep = (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                    {cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group relative flex flex-col sm:flex-row gap-6 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-sm backdrop-blur-xl transition hover:border-gold-300/50 dark:hover:border-gold-500/30"
                        >
                            <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/5">
                                <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.product.name}</h3>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{item.product.description}</p>
                                        <div className="mt-2 flex gap-2">
                                            {item.options?.size && <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest">T: {item.options.size}</span>}
                                            {item.options?.color && <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest">C: {item.options.color}</span>}
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold text-gold-600">R$ {parseFloat(item.final_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-1">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Minus className="h-4 w-4" /></button>
                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="h-5 w-5" /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 shadow-xl backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6">Resumo</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                    </div>
                    <button 
                        onClick={() => setStep(2)}
                        className="mt-8 w-full flex items-center justify-center gap-3 rounded-full bg-gold-500 py-4 text-sm font-bold text-neutral-950 shadow-lg"
                    >
                        Continuar para Entrega
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );

    const ShippingStep = (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Endereço de Entrega</h2>
                    <button 
                        onClick={() => setShowAddressForm(!showAddressForm)}
                        className="flex items-center gap-2 text-sm font-bold text-gold-600 hover:text-gold-500 transition"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Novo Endereço
                    </button>
                </div>

                <AnimatePresence>
                    {showAddressForm && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <form onSubmit={handleAddAddress} className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Nome do Local (Ex: Minha Casa, Trabalho)</label>
                                        <input 
                                            required
                                            value={addressForm.name}
                                            onChange={e => setAddressForm({...addressForm, name: e.target.value})}
                                            className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">CEP</label>
                                        <input 
                                            required
                                            value={addressForm.cep}
                                            onChange={e => {
                                                setAddressForm({...addressForm, cep: e.target.value});
                                                fetchAddressFromCep(e.target.value);
                                            }}
                                            className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Rua / Logradouro</label>
                                        <input 
                                            required
                                            value={addressForm.logradouro}
                                            onChange={e => setAddressForm({...addressForm, logradouro: e.target.value})}
                                            className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Número</label>
                                        <input 
                                            required
                                            value={addressForm.numero}
                                            onChange={e => setAddressForm({...addressForm, numero: e.target.value})}
                                            className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Complemento</label>
                                        <input 
                                            value={addressForm.complemento}
                                            onChange={e => setAddressForm({...addressForm, complemento: e.target.value})}
                                            className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Bairro</label>
                                        <input 
                                            required
                                            value={addressForm.bairro}
                                            onChange={e => setAddressForm({...addressForm, bairro: e.target.value})}
                                            className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">Cidade</label>
                                            <input 
                                                required
                                                value={addressForm.cidade}
                                                onChange={e => setAddressForm({...addressForm, cidade: e.target.value})}
                                                className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                            />
                                        </div>
                                        <div className="w-20">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 mb-2 block">UF</label>
                                            <input 
                                                required
                                                value={addressForm.uf}
                                                onChange={e => setAddressForm({...addressForm, uf: e.target.value})}
                                                className="w-full rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-6 py-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full rounded-full bg-slate-900 text-white dark:bg-white dark:text-neutral-950 py-4 font-bold">Salvar Endereço</button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid gap-4 sm:grid-cols-2">
                    {addresses.map(addr => (
                        <div 
                            key={addr.id}
                            onClick={() => setSelectedAddress(addr)}
                            className={`cursor-pointer group relative rounded-[2rem] border-2 p-6 transition-all ${
                                selectedAddress?.id === addr.id 
                                    ? 'border-gold-500 bg-gold-500/5 shadow-xl shadow-gold-500/10' 
                                    : 'border-slate-100 bg-white dark:border-white/5 dark:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                    <Home className="h-5 w-5 text-slate-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{addr.name}</h4>
                                    {addr.is_default && <span className="text-[8px] font-black uppercase tracking-widest text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded-full">Padrão</span>}
                                </div>
                                {selectedAddress?.id === addr.id && <CheckCircle2 className="h-5 w-5 text-gold-500 ml-auto" />}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {addr.logradouro}, {addr.numero} {addr.complemento && `- ${addr.complemento}`}<br />
                                {addr.bairro} - {addr.cidade}/{addr.uf}<br />
                                CEP: {addr.cep}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Modo de Envio</h2>
                        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-full">
                            <button 
                                onClick={() => setShippingMode('ensemble')}
                                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition ${shippingMode === 'ensemble' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'}`}
                            >
                                Em Conjunto
                            </button>
                            <button 
                                onClick={() => setShippingMode('individual')}
                                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition ${shippingMode === 'individual' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'}`}
                            >
                                Individual
                            </button>
                        </div>
                    </div>

                    {isCalculatingShipping ? (
                        <div className="flex flex-col items-center py-12">
                            <div className="h-12 w-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
                            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Calculando Frete...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {shippingMode === 'ensemble' ? (
                                <div className="grid gap-4">
                                    {shippingData?.methods.map((method, idx) => (
                                        <div 
                                            key={idx}
                                            onClick={() => setSelectedMethod(method)}
                                            className={`cursor-pointer flex items-center justify-between rounded-2xl border-2 p-5 transition-all ${
                                                selectedMethod?.id === method.id 
                                                    ? 'border-gold-500 bg-gold-500/5' 
                                                    : 'border-slate-100 dark:border-white/5'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 flex items-center justify-center shadow-sm">
                                                    {method.icon === 'zap' ? <Zap className="h-6 w-6 text-gold-500" /> : <Truck className="h-6 w-6 text-gold-500" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{method.name}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{method.deadline} dias úteis</p>
                                                </div>
                                            </div>
                                            <p className="font-black text-slate-900 dark:text-white">R$ {method.price.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl overflow-hidden">
                                                    <img src={item.product.image} className="h-full w-full object-cover" />
                                                </div>
                                                <p className="text-xs font-bold">{item.product.name}</p>
                                            </div>
                                            <div className="grid gap-3 pl-13">
                                                {individualShipping[item.id]?.methods.map((method, idx) => (
                                                    <div 
                                                        key={idx}
                                                        onClick={() => setIndividualShipping(prev => ({
                                                            ...prev,
                                                            [item.id]: { ...prev[item.id], selected: method }
                                                        }))}
                                                        className={`cursor-pointer flex items-center justify-between rounded-xl border p-4 transition-all ${
                                                            individualShipping[item.id].selected?.id === method.id 
                                                                ? 'border-gold-500 bg-gold-500/5' 
                                                                : 'border-slate-100 dark:border-white/5'
                                                        }`}
                                                    >
                                                        <span className="text-[10px] font-bold">{method.name}</span>
                                                        <span className="text-[10px] font-bold">R$ {method.price.toFixed(2).replace('.', ',')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 shadow-xl backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6">Resumo</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between text-slate-500"><span>Frete</span><span>R$ {totalShipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                        <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between text-2xl font-black">
                            <span>Total</span>
                            <span className="text-gold-600">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setStep(3)}
                        disabled={!selectedAddress || (shippingMode === 'ensemble' ? !selectedMethod : Object.values(individualShipping).some(s => !s.selected))}
                        className="mt-8 w-full flex items-center justify-center gap-3 rounded-full bg-gold-500 py-4 text-sm font-bold text-neutral-950 shadow-lg disabled:opacity-50"
                    >
                        Revisar Pedido
                        <ChevronRight className="h-5 w-5" />
                    </button>
                    <button onClick={() => setStep(1)} className="w-full mt-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition">Voltar ao Carrinho</button>
                </div>
            </div>
        </div>
    );

    const ReviewStep = (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/50 dark:bg-white/5 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gold-500" />
                        Destino da Entrega
                    </h3>
                    <div className="text-slate-600 dark:text-slate-400">
                        <p className="font-bold text-slate-900 dark:text-white mb-1">{selectedAddress?.name}</p>
                        <p>{selectedAddress?.logradouro}, {selectedAddress?.numero} {selectedAddress?.complemento}</p>
                        <p>{selectedAddress?.bairro} - {selectedAddress?.cidade}/{selectedAddress?.uf}</p>
                        <p className="mt-2 font-medium">CEP: {selectedAddress?.cep}</p>
                    </div>
                </div>

                <div className="bg-white/50 dark:bg-white/5 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-gold-500" />
                        Itens do Pedido
                    </h3>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5">
                                        <img src={item.product.image} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{item.product.name}</p>
                                        <p className="text-xs text-slate-500">{item.quantity}x R$ {parseFloat(item.final_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        {shippingMode === 'individual' && (
                                            <p className="text-[10px] text-gold-600 font-bold mt-1">
                                                Envio: {individualShipping[item.id]?.selected?.name} (+ R$ {individualShipping[item.id]?.selected?.price.toFixed(2)})
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">R$ {(item.final_price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 shadow-xl backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6">Total Final</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between text-slate-500"><span>Frete</span><span>R$ {totalShipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                        <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between text-3xl font-black">
                            <span>Total</span>
                            <span className="text-gold-600">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleCheckout}
                        disabled={processing}
                        className="mt-8 w-full flex items-center justify-center gap-3 rounded-full bg-slate-900 dark:bg-white py-5 text-sm font-bold text-white dark:text-neutral-950 shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        Finalizar Pedido
                    </button>
                    <button onClick={() => setStep(2)} className="w-full mt-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition">Mudar Entrega</button>
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">Finalizar Compra</h2>}
        >
            <Head title="Carrinho - Miu Store" />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {cartItems.length > 0 && <StepIndicator />}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {cartItems.length === 0 ? (
                            <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-20 text-center backdrop-blur-xl">
                                <div className="flex justify-center mb-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-500/10 text-gold-600 dark:text-gold-200">
                                        <ShoppingCart className="h-10 w-10" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-semibold">Seu carrinho está vazio</h2>
                                <Link href={route('products.index')} className="mt-8 inline-flex items-center rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-neutral-950">Ver Produtos</Link>
                            </div>
                        ) : (
                            <>
                                {step === 1 && CartStep}
                                {step === 2 && ShippingStep}
                                {step === 3 && ReviewStep}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </AuthenticatedLayout>
    );
}