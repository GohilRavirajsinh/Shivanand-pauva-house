import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Menu" },
    { path: "/reviews", label: "Reviews" },
    { path: "/about", label: "Our Story" },
    { path: "/contact", label: "Find Us" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg py-2" : "bg-transparent py-4"
        )}>
            <div className="container flex items-center justify-between">
                <Link to="/" className="font-display text-2xl font-black flex items-center gap-2 group">
                    <span className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform">S</span>
                    <span className={cn("hidden sm:inline", scrolled ? "text-foreground" : "text-foreground")}>
                        Shivanand <span className="text-primary">Pauva</span>
                    </span>
                </Link>
                
                {/* Desktop */}
                <ul className="hidden md:flex gap-1 items-center">
                    {navLinks.map((l) => (
                        <li key={l.path}>
                            <Link 
                                to={l.path} 
                                className={cn(
                                    "px-5 py-2 rounded-full font-bold text-sm transition-all duration-300",
                                    pathname === l.path
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "hover:bg-primary/10 text-foreground"
                                )}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button 
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary" 
                    onClick={() => setOpen(!open)} 
                    aria-label="Menu"
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <ul className="md:hidden absolute top-full left-0 right-0 bg-white border-t p-4 space-y-2 animate-fade-up shadow-xl">
                    {navLinks.map((l) => (
                        <li key={l.path}>
                            <Link 
                                to={l.path} 
                                onClick={() => setOpen(false)} 
                                className={cn(
                                    "block py-3 px-6 rounded-xl font-bold transition-colors",
                                    pathname === l.path ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                                )}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};
export default Navbar;
