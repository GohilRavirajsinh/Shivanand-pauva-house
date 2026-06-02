import { useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

const Products = () => {
    const products = useSelector((state) => state.products.products);
    const combos = useSelector((state) => state.products.combos);
    const [filter, setFilter] = useState("all");

    const filteredProducts = filter === "all" 
        ? products 
        : products.filter(p => p.category === filter);

    const categories = [
        { id: "all", label: "All Items", icon: "🍱" },
        { id: "pauva", label: "Pauva Varieties", icon: "🍛" },
        { id: "shake", label: "Thick Shakes", icon: "🥤" },
    ];

    return (
        <div className="pt-32 pb-24 min-h-screen bg-muted/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display mb-4">Our <span className="text-primary">Menu</span></h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
                        Explore our wide range of authentic Pauva varieties and creamy thick shakes. 
                        Made fresh, served with love.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setFilter(c.id)}
                            className={cn(
                                "px-8 py-3 rounded-2xl font-black transition-all flex items-center gap-2 shadow-sm",
                                filter === c.id 
                                    ? "bg-primary text-white scale-105 shadow-primary/30" 
                                    : "bg-white text-foreground hover:bg-primary/5"
                            )}
                        >
                            <span className="text-xl">{c.icon}</span>
                            {c.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((p, i) => (
                        <div 
                            key={p.id} 
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-border/50 animate-fade-up"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="aspect-square relative overflow-hidden bg-muted">
                                {p.image ? (
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
                                        {p.category === "pauva" ? "🍛" : "🥤"}
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-black text-primary text-sm shadow-sm">
                                    ₹{p.price}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                    {p.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Signature Combos Section */}
                {filter === "all" && (
                    <div className="mt-32">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-4xl font-display">Signature <span className="text-secondary">Combos</span></h2>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {combos.map((c, i) => (
                                <div 
                                    key={c.id} 
                                    className="bg-primary/5 rounded-[2.5rem] p-6 flex flex-col md:flex-row gap-8 border border-primary/10 hover:border-primary/30 transition-all group"
                                >
                                    <div className="w-full md:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 bg-white">
                                        <img src={c.image || "/assets/combo.png"} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="flex flex-col justify-center py-2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-display">{c.name}</h3>
                                            <span className="bg-secondary text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Best Seller</span>
                                        </div>
                                        <p className="text-muted-foreground font-medium mb-6">{c.items}</p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-muted-foreground line-through text-sm font-bold leading-none">₹{c.originalPrice}</span>
                                                <span className="text-3xl font-black text-primary">₹{c.comboPrice}</span>
                                            </div>
                                            <div className="h-10 w-px bg-border" />
                                            <div className="text-accent font-black text-xs uppercase tracking-tighter">
                                                Instant Save<br />₹{c.originalPrice - c.comboPrice}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
