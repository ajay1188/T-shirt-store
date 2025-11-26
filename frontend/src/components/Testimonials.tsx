'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Verified Buyer",
        content: "The quality of the oversized tees is unmatched. The fabric feels incredibly premium and the fit is exactly what I was looking for.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Fashion Blogger",
        content: "LOOMSPACE has become my go-to for basics. The color palette is sophisticated and they wash perfectly without losing shape.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Designer",
        content: "Finally, a brand that understands minimalism. No loud logos, just great cuts and premium materials. Highly recommended.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/86.jpg"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-secondary/30 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">What People Are Saying</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have upgraded their wardrobe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-foreground leading-relaxed mb-8">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-secondary">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
