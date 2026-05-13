import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { cn } from "@/lib/utils";

const About = () => {
    const shopBio = useSelector((state) => state.auth.shopBio);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Since Years</span>
                    <h1 className="text-5xl md:text-7xl font-display mt-2 mb-6">Our <span className="text-primary">Story</span></h1>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-24">
                    <div className="space-y-8 animate-fade-up">
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display mb-6">The Legacy</h2>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                {shopBio}
                            </p>
                        </div>
                        <div className="bg-primary rounded-[2.5rem] shadow-xl p-10 text-white">
                            <h2 className="text-3xl font-display mb-6">Our Mission</h2>
                            <p className="opacity-90 leading-relaxed font-medium">
                                To serve the most authentic and innovative Pauva varieties while 
                                delivering the creamiest, most indulgent thick shakes in Vallabh Vidyanagar.
                                Quality is our signature.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 animate-fade-up delay-200">
                        <div className="bg-muted/50 rounded-[2.5rem] p-10 border border-border/50">
                            <h2 className="text-3xl font-display mb-6 text-secondary">Why Shivanand?</h2>
                            <ul className="space-y-4">
                                {[
                                    "🍛 200+ Varieties of authentic Pauva",
                                    "🥤 Handcrafted Thick Shakes by The Shake Maker",
                                    "✨ Fresh ingredients sourced daily",
                                    "❤️ Legendary taste loved by generations",
                                    "📍 Heart of Mota Bazaar, Vallabh Vidyanagar",
                                    "⭐ Premium cafe experience"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-foreground/80">
                                        <span className="w-2 h-2 bg-primary rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Admin Access Section */}
                <div className="pt-24 border-t border-border/50 text-center">
                    {!showLogin ? (
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className="group flex flex-col items-center gap-2 mx-auto transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                🔒
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">
                                Admin Access
                            </span>
                        </button>
                    ) : (
                        <AdminLoginBox onClose={() => setShowLogin(false)}/>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdminLoginBox = ({ onClose }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ id: id.trim(), password: pass.trim() }));
        if (!isLoggedIn) setError(true);
    };

    if (isLoggedIn) {
        return <Navigate to="/admin" replace/>;
    }

    return (
        <form onSubmit={handleLogin} className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-sm mx-auto animate-scale-in space-y-6 border border-border/50">
            <h3 className="text-2xl font-display text-center">Admin Portal</h3>
            {error && <p className="text-destructive text-xs font-bold text-center bg-destructive/10 py-2 rounded-lg">Invalid Credentials</p>}
            <div className="space-y-4">
                <input 
                    value={id} 
                    onChange={(e) => { setId(e.target.value); setError(false); }} 
                    placeholder="Admin ID" 
                    required 
                    className="w-full px-6 py-3 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium"
                />
                <input 
                    value={pass} 
                    onChange={(e) => { setPass(e.target.value); setError(false); }} 
                    placeholder="Password" 
                    type="password" 
                    required 
                    className="w-full px-6 py-3 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium"
                />
            </div>
            <div className="flex flex-col gap-3">
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Verify & Enter
                </button>
                <button type="button" onClick={onClose} className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default About;

