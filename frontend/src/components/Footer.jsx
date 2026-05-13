import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => (
    <footer className="bg-foreground text-background py-16">
        <div className="container grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
                <Link to="/" className="font-display text-3xl font-black mb-4 inline-block">
                    Shivanand <span className="text-primary">Pauva</span>
                </Link>
                <p className="text-background/60 text-sm max-w-sm leading-relaxed mb-6">
                    Vallabh Vidyanagar's favorite destination for authentic Pauva and premium thick shakes. 
                    Serving happiness in every bite and sip since years.
                </p>
                <div className="flex gap-4">
                    <a 
                        href="https://www.instagram.com/shivanand.pauva.house?igsh=MTFlcDBtaGxyd25hcw==" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] transition-all duration-300 group"
                    >
                        <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                    </a>
                </div>
            </div>
            <div>
                <h4 className="font-display text-lg mb-6 text-primary">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                    <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link to="/products" className="hover:text-primary transition-colors">Menu</Link></li>
                    <li><Link to="/reviews" className="hover:text-primary transition-colors">Reviews</Link></li>
                    <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-display text-lg mb-6 text-primary">Visit Us</h4>
                <p className="text-background/60 text-sm leading-relaxed">
                    12 Ground Floor, Vraj Prime,<br />
                    Iscon Temple Road, Opposite NCC Office,<br />
                    Mota Bazaar, Vallabh Vidyanagar,<br />
                    Anand, Gujarat 388120
                </p>
                <p className="text-primary font-bold mt-4 text-sm">
                    Open Daily: 8 AM – 11 PM
                </p>
            </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-background/10 text-center text-xs text-background/40">
            © {new Date().getFullYear()} Shivanand Pauva House & The Shake Maker. All rights reserved.
        </div>
    </footer>
);

export default Footer;

