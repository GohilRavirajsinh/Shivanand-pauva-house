import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Instagram } from "lucide-react";
import heroImg from "@/assets/hero.png";
import pauvaImg from "@/assets/pauva.png";
import shakeImg from "@/assets/shake.png";
import comboImg from "@/assets/combo.png";


const useInView = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { 
            if (e.isIntersecting) {
                setVisible(true);
                obs.disconnect();
            } 
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
};

const Section = ({ children, className = "" }) => {
    const { ref, visible } = useInView();
    return (
        <div 
            ref={ref} 
            className={cn(
                "transition-all duration-1000 ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
                className
            )}
        >
            {children}
        </div>
    );
};

import { cn } from "@/lib/utils";

const Home = () => {
    const allReviews = useSelector((state) => state.reviews.reviews);
    const offers = useSelector((state) => state.products.offers);
    const combos = useSelector((state) => state.products.combos);
    const reviews = allReviews.slice(0, 3);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[100vh] flex items-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img src={heroImg} alt="Shivanand Pauva House" className="w-full h-full object-cover brightness-[0.7]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
                </div>
                
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-xs tracking-widest uppercase mb-6 animate-fade-up">
                            Vallabh Vidyanagar's Finest
                        </span>
                        <h1 className="text-5xl md:text-8xl font-display text-white mb-6 leading-[0.9] animate-fade-up">
                            Taste the <br />
                            <span className="text-primary italic">Legendary</span> <br />
                            Pauva House
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 animate-fade-up delay-200 leading-relaxed">
                            Serving 200+ varieties of authentic Pauva and handcrafted thick shakes from The Shake Maker. 
                            A legacy of flavor in the heart of Mota Bazaar.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
                            <Link to="/products" className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 text-center">
                                Explore Menu 🍴
                            </Link>
                            <Link to="/contact" className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-white hover:text-foreground transition-all text-center">
                                Visit Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-24 bg-background">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12">
                        <Section className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl">
                            <img src={pauvaImg} alt="Variety of Pauva" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                                <h3 className="text-4xl text-white font-display mb-2">200+ Varieties</h3>
                                <p className="text-white/70 mb-6 font-medium">From Masala to Dry Fruit, we have it all.</p>
                                <Link to="/products" className="w-fit px-6 py-2 bg-primary text-white rounded-full font-bold text-sm">View Pauva Range</Link>
                            </div>
                        </Section>
                        <Section className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl md:mt-24">
                            <img src={shakeImg} alt="Thick Shakes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                                <h3 className="text-4xl text-white font-display mb-2">Thick Shakes</h3>
                                <p className="text-white/70 mb-6 font-medium">Handcrafted goodness from The Shake Maker.</p>
                                <Link to="/products" className="w-fit px-6 py-2 bg-secondary text-white rounded-full font-bold text-sm">Explore Shakes</Link>
                            </div>
                        </Section>
                    </div>
                </div>
            </section>

            {/* Best Combos */}
            <section className="py-24 bg-cream relative overflow-hidden">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Value Meals</span>
                            <h2 className="text-4xl md:text-6xl font-display mt-2">Signature <span className="text-secondary">Combos</span></h2>
                        </div>
                        <p className="text-muted-foreground max-w-sm font-medium">
                            Our most loved combinations designed to satisfy your cravings at the best price.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-8">
                        {combos.map((c, i) => (
                            <Section key={c.id} className="group bg-white rounded-[2rem] p-4 shadow-xl hover:shadow-2xl transition-all border border-border/50">
                                <div className="aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-muted">
                                    <img src={c.image || comboImg} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="px-2 pb-2">
                                    <h3 className="text-xl font-display mb-1">{c.name}</h3>
                                    <p className="text-muted-foreground text-xs font-medium mb-4 line-clamp-1">{c.items}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground line-through text-xs font-bold">₹{c.originalPrice}</span>
                                            <span className="text-2xl font-black text-primary leading-none">₹{c.comboPrice}</span>
                                        </div>
                                        <div className="bg-accent/10 text-accent font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-tighter">
                                            Save ₹{c.originalPrice - c.comboPrice}
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Marquee - Improved */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-display mb-4">Loved by <span className="text-primary">Vidyanagar</span></h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
                        Don't take our word for it. Here's what our customers say about their experience.
                    </p>
                </div>
                
                <div className="flex gap-6 animate-marquee whitespace-nowrap">
                    {[...allReviews, ...allReviews].map((r, i) => (
                        <div key={`${r.id}-${i}`} className="inline-block w-[350px] bg-muted/30 rounded-[2rem] p-8 border border-border/50">
                            <div className="flex items-center gap-1 text-accent mb-4">
                                {"★".repeat(r.rating)}
                            </div>
                            <p className="text-foreground font-medium text-lg italic leading-relaxed mb-6 whitespace-normal line-clamp-3">
                                "{r.comment}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                    {r.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-black text-sm">{r.name}</p>
                                    <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">{r.type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <Link to="/reviews" className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-transform">
                        Share Your Experience ✍️
                    </Link>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-primary relative">
                <div className="container relative z-10 text-center">
                    <h2 className="text-5xl md:text-7xl font-display text-white mb-8">Ready to Feast?</h2>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Join us at Vallabh Vidyanagar's most iconic Pauva house. Fresh, fast, and legendary flavor.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/products" className="px-12 py-5 bg-white text-primary rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                            Order Now
                        </Link>
                        <a 
                            href="https://www.instagram.com/shivanand.pauva.house?igsh=MTFlcDBtaGxyd25hcw==" 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-12 py-5 bg-black/20 text-white border border-white/20 rounded-2xl font-black text-xl hover:bg-white hover:text-primary transition-all inline-flex items-center gap-3"
                        >
                            Follow Us <Instagram size={24} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

