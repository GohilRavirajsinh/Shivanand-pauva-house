import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { addProduct, deleteProduct, addCombo, deleteCombo, addOffer, deleteOffer } from "@/store/slices/productSlice";
import { deleteReview } from "@/store/slices/reviewSlice";
import { updateBio } from "@/store/slices/authSlice";
import { cn } from "@/lib/utils";
import { LayoutDashboard, UtensilsCrossed, Package, Zap, MessageSquare, Settings, LogOut, Plus, Trash2 } from "lucide-react";

const tabs = [
    { id: "Products", icon: UtensilsCrossed },
    { id: "Combos", icon: Package },
    { id: "Offers", icon: Zap },
    { id: "Reviews", icon: MessageSquare },
    { id: "Settings", icon: Settings },
];

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [tab, setTab] = useState("Products");
    
    if (!isLoggedIn) {
        return <Navigate to="/about" replace/>;
    }

    const handleLogout = () => { 
        dispatch(logout()); 
        navigate("/"); 
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-muted/30">
            <div className="container max-w-6xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-display flex items-center gap-3">
                            <LayoutDashboard className="text-primary" size={36} />
                            Admin <span className="text-primary">Panel</span>
                        </h1>
                        <p className="text-muted-foreground font-medium">Manage your shop content and customer feedback.</p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-bold hover:bg-primary transition-colors shadow-lg"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        {tabs.map((t) => (
                            <button 
                                key={t.id} 
                                onClick={() => setTab(t.id)} 
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all",
                                    tab === t.id 
                                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
                                        : "bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-border/50"
                                )}
                            >
                                <t.icon size={20} />
                                {t.id}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-border/50 animate-scale-in">
                            {tab === "Products" && <ProductsTab />}
                            {tab === "Combos" && <CombosTab />}
                            {tab === "Offers" && <OffersTab />}
                            {tab === "Reviews" && <ReviewsTab />}
                            {tab === "Settings" && <SettingsTab />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductsTab = () => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("pauva");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !price) return;
        dispatch(addProduct({ name, category, price: Number(price), description: desc, image }));
        setName(""); setPrice(""); setDesc(""); setImage("");
    };

    return (
        <div className="space-y-10">
            <form onSubmit={handleAdd} className="space-y-6 bg-muted/30 p-8 rounded-[2rem]">
                <h3 className="text-xl font-display flex items-center gap-2"><Plus className="text-primary" /> Add New Item</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" required className="px-6 py-3 rounded-xl bg-white border border-border outline-none focus:border-primary font-medium w-full"/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (₹)" type="number" required className="px-6 py-3 rounded-xl bg-white border border-border outline-none focus:border-primary font-medium w-full"/>
                </div>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-6 py-3 rounded-xl bg-white border border-border outline-none focus:border-primary font-bold">
                    <option value="pauva">🍛 Pauva</option>
                    <option value="shake">🥤 Shake</option>
                </select>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" rows={2} className="w-full px-6 py-3 rounded-xl bg-white border border-border outline-none focus:border-primary font-medium resize-none"/>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black shadow-lg shadow-primary/20">Add to Menu</button>
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-display">Active Menu ({products.length})</h3>
                <div className="grid gap-4">
                    {products.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 bg-muted/20 p-4 rounded-2xl border border-border/50 group">
                            <div className="w-14 h-14 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-border flex items-center justify-center text-2xl">
                                {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : (p.category === "pauva" ? "🍛" : "🥤")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-foreground">{p.name}</p>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">₹{p.price} · {p.category}</p>
                            </div>
                            <button onClick={() => dispatch(deleteProduct(p.id))} className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CombosTab = () => {
    const combos = useSelector((state) => state.products.combos);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [items, setItems] = useState("");
    const [orig, setOrig] = useState("");
    const [combo, setCombo] = useState("");

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !orig || !combo) return;
        dispatch(addCombo({ name, items, originalPrice: Number(orig), comboPrice: Number(combo) }));
        setName(""); setItems(""); setOrig(""); setCombo("");
    };

    return (
        <div className="space-y-10">
            <form onSubmit={handleAdd} className="space-y-6 bg-muted/30 p-8 rounded-[2rem]">
                <h3 className="text-xl font-display flex items-center gap-2"><Plus className="text-secondary" /> Create Combo</h3>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Combo Title" required className="w-full px-6 py-3 rounded-xl bg-white border border-border outline-none font-medium"/>
                <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="Included Items (e.g., 2 Masala Pauva + 1 Shake)" required className="w-full px-6 py-3 rounded-xl bg-white border border-border outline-none font-medium"/>
                <div className="grid grid-cols-2 gap-4">
                    <input value={orig} onChange={(e) => setOrig(e.target.value)} placeholder="Original Price" type="number" required className="px-6 py-3 rounded-xl bg-white border border-border outline-none font-medium w-full"/>
                    <input value={combo} onChange={(e) => setCombo(e.target.value)} placeholder="Combo Price" type="number" required className="px-6 py-3 rounded-xl bg-white border border-border outline-none font-medium w-full"/>
                </div>
                <button type="submit" className="w-full bg-secondary text-white py-4 rounded-xl font-black shadow-lg shadow-secondary/20">Launch Combo</button>
            </form>

            <div className="space-y-4">
                {combos.map((c) => (
                    <div key={c.id} className="flex items-center justify-between bg-muted/20 p-6 rounded-2xl border border-border/50">
                        <div>
                            <p className="font-black text-lg">{c.name}</p>
                            <p className="text-sm text-muted-foreground font-medium">{c.items} · <span className="line-through">₹{c.originalPrice}</span> → <span className="text-primary font-black">₹{c.comboPrice}</span></p>
                        </div>
                        <button onClick={() => dispatch(deleteCombo(c.id))} className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OffersTab = () => {
    const offers = useSelector((state) => state.products.offers);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [badge, setBadge] = useState("🔥 HOT");

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addOffer({ title, badge, description: "", discount: 0 }));
        setTitle(""); setBadge("🔥 HOT");
    };

    return (
        <div className="space-y-10">
            <form onSubmit={handleAdd} className="space-y-6 bg-muted/30 p-8 rounded-[2rem]">
                <h3 className="text-xl font-display flex items-center gap-2"><Zap className="text-accent" /> New Offer Banner</h3>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Offer Title" required className="w-full px-6 py-3 rounded-xl bg-white border border-border outline-none font-medium"/>
                <input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Badge (e.g., ⭐ POPULAR)" className="w-full px-6 py-3 rounded-xl bg-white border border-border outline-none font-medium"/>
                <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl font-black shadow-lg shadow-accent/20">Add Offer</button>
            </form>
            <div className="space-y-4">
                {offers.map((o) => (
                    <div key={o.id} className="flex items-center justify-between bg-muted/20 p-6 rounded-2xl border border-border/50">
                        <p className="font-bold"><span className="text-primary">{o.badge}</span> {o.title}</p>
                        <button onClick={() => dispatch(deleteOffer(o.id))} className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReviewsTab = () => {
    const reviews = useSelector((state) => state.reviews.reviews);
    const dispatch = useDispatch();
    
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display">Manage Reviews</h3>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-black text-xs">{reviews.length} Total</span>
            </div>
            <div className="space-y-4">
                {reviews.map((r) => (
                    <div key={r.id} className="bg-muted/20 p-6 rounded-2xl border border-border/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-black text-lg">{r.name}</p>
                                <div className="text-accent text-sm">{"★".repeat(r.rating)}</div>
                            </div>
                            <button onClick={() => dispatch(deleteReview(r.id))} className="text-destructive font-black text-xs uppercase tracking-widest hover:underline">Delete</button>
                        </div>
                        <p className="text-muted-foreground font-medium italic leading-relaxed">"{r.comment}"</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-4">{r.date} · {r.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SettingsTab = () => {
    const bio = useSelector((state) => state.auth.shopBio);
    const dispatch = useDispatch();
    const [text, setText] = useState(bio);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        dispatch(updateBio(text));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-display">Shop Settings</h3>
            <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">About / Bio Text</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full px-8 py-4 rounded-[2rem] bg-muted/30 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium resize-none leading-relaxed"/>
            </div>
            <button onClick={handleSave} className="bg-primary text-white px-10 py-4 rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Save Global Settings
            </button>
            {saved && <p className="text-primary font-black animate-fade-up text-center">✓ Settings Updated Successfully!</p>}
        </div>
    );
};

export default Admin;

