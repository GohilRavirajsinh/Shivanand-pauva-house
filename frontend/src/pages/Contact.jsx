import { Mail, MapPin, Phone, Clock, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display mb-4">Find <span className="text-primary">Us</span></h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
                        Visit us in the heart of Vallabh Vidyanagar for a taste of authentic Pauva and thick shakes.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8 animate-fade-up">
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display mb-8">Get in Touch</h2>
                            
                            <div className="space-y-6">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">Our Location</p>
                                        <p className="font-bold text-lg leading-snug">
                                            12 Ground Floor, Vraj Prime,<br />
                                            Iscon Temple Road, Opposite NCC Office,<br />
                                            Mota Bazaar, Vallabh Vidyanagar,<br />
                                            Gujarat 388120
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                                        <Clock size={28} />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">Business Hours</p>
                                        <p className="font-bold text-lg">Open Daily: 8 AM – 11 PM</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                                        <Instagram size={28} />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-1">Instagram</p>
                                        <a 
                                            href="https://www.instagram.com/shivanand.pauva.house?igsh=MTFlcDBtaGxyd25hcw==" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="font-bold text-lg text-primary hover:underline"
                                        >
                                            @shivanand.pauva.house
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-foreground rounded-[2.5rem] shadow-xl p-10 text-background">
                            <h3 className="text-2xl font-display mb-4 text-primary">Bulk Orders?</h3>
                            <p className="opacity-70 font-medium leading-relaxed mb-6">
                                We accept bulk orders for parties, events, and college functions. 
                                Contact us on Instagram for special rates.
                            </p>
                            <Link to="/products" className="px-8 py-3 bg-primary text-white rounded-xl font-black">View Combo Packs</Link>
                        </div>
                    </div>

                    {/* Map Placeholder / Info */}
                    <div className="bg-muted rounded-[2.5rem] overflow-hidden aspect-square lg:aspect-auto lg:h-full shadow-2xl border-4 border-white animate-fade-up delay-200">
                        {/* Embedding a real Google Map for the location */}
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.664567228801!2d72.9213!3d22.5551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzE4LjQiTiA3MsKwNTUnMTYuNyJF!5e0!3m2!1sen!2sin!4v1714310000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Shivanand Pauva House Location"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
