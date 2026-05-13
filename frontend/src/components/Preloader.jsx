import { useState, useEffect } from "react";
import logoImg from "@/assets/logo.jpg";

const Preloader = ({ onDone }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(onDone, 500);
                    return 100;
                }
                return p + (Math.random() * 5);
            });
        }, 30);
        return () => clearInterval(timer);
    }, [onDone]);

    return (
        <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-all duration-700 ${progress >= 100 ? "opacity-0 invisible scale-110" : "opacity-100 visible scale-100"}`}>
            <div className="relative mb-12">
                <img 
                    src={logoImg} 
                    alt="Shivanand Pauva House" 
                    className="w-32 h-32 rounded-full object-cover animate-float filter drop-shadow-2xl" 
                />
                <div className="absolute -inset-4 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin" style={{ animationDuration: "1.5s" }} />
            </div>
            
            <div className="text-center">
                <h1 className="font-display text-4xl text-foreground mb-1 tracking-tight">Shivanand</h1>
                <p className="font-display text-2xl text-primary mb-8 tracking-wider">PAUVA HOUSE</p>
                
                <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto">
                    <div 
                        className="h-full bg-primary transition-all duration-300 ease-out" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-4 animate-pulse">
                    Crafting Flavor... {Math.round(progress)}%
                </p>
            </div>
        </div>
    );
};

export default Preloader;

