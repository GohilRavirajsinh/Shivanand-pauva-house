import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addReview as addReviewAction } from "@/store/slices/reviewSlice";
import { cn } from "@/lib/utils";

const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

const ReviewCard3D = ({ review, index }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
        } }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div 
            ref={ref} 
            className={cn(
                "transition-all duration-1000 ease-out",
                visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
            )}
            style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
        >
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-border/50 hover:shadow-2xl transition-all group">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                            {review.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-black text-foreground">{review.name}</p>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{review.type}</p>
                        </div>
                    </div>
                    <div className="text-accent text-xl">{stars(review.rating)}</div>
                </div>
                <p className="text-foreground/80 font-medium leading-relaxed italic mb-6">
                    "{review.comment}"
                </p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{review.date}</p>
            </div>
        </div>
    );
};

const Reviews = () => {
    const reviews = useSelector((state) => state.reviews.reviews);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [type, setType] = useState("review");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) return;
        dispatch(addReviewAction({ name, rating, comment, type }));
        setName("");
        setComment("");
        setRating(5);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-muted/30">
            <div className="container max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display mb-4">Customer <span className="text-primary">Stories</span></h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
                        Your feedback drives us to serve better. Share your experience with Shivanand Pauva House.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form Column */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl p-8 sticky top-32 border border-border/50">
                            <h3 className="text-2xl font-display mb-6">Write a Review</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Your Name</label>
                                    <input 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder="Enter your name" 
                                        required 
                                        className="w-full px-6 py-3 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <button 
                                                key={n} 
                                                type="button" 
                                                onClick={() => setRating(n)} 
                                                className={cn(
                                                    "text-3xl transition-transform hover:scale-120",
                                                    n <= rating ? "text-accent" : "text-muted"
                                                )}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Review Type</label>
                                    <div className="flex gap-2">
                                        {["review", "feedback"].map((t) => (
                                            <button 
                                                key={t} 
                                                type="button" 
                                                onClick={() => setType(t)} 
                                                className={cn(
                                                    "flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest border-2 transition-all",
                                                    type === t 
                                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                                                        : "bg-transparent border-muted text-muted-foreground hover:border-primary/30"
                                                )}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Comment</label>
                                    <textarea 
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)} 
                                        placeholder="Tell us about your visit..." 
                                        rows={4} 
                                        required 
                                        className="w-full px-6 py-3 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary outline-none transition-all font-medium resize-none"
                                    />
                                </div>

                                <Button type="submit" className="w-full py-6 rounded-xl font-black text-lg shadow-xl shadow-primary/20">
                                    Submit Review
                                </Button>
                                
                                {submitted && (
                                    <p className="text-primary font-bold text-center animate-fade-up">
                                        🎉 Thank you for your feedback!
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Reviews List Column */}
                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-6">
                            {reviews.map((r, i) => (
                                <ReviewCard3D key={r.id} review={r} index={i} />
                            ))}
                        </div>
                        {reviews.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-muted-foreground/30">
                                <p className="text-muted-foreground font-medium">Be the first to leave a review!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;

