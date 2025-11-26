import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter">LOOMSPACE</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Premium quality tees for the modern minimalist. Crafted with care, designed for comfort.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-6 text-foreground">Shop</h4>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li><Link href="/shop?category=men" className="hover:text-primary transition-colors">Men</Link></li>
                            <li><Link href="/shop?category=women" className="hover:text-primary transition-colors">Women</Link></li>
                            <li><Link href="/shop?category=oversized" className="hover:text-primary transition-colors">Oversized</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-6 text-foreground">Support</h4>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-6 text-foreground">Stay Updated</h4>
                        <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for new drops.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-background border border-border text-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-sm"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-border mt-16 pt-8 text-center text-muted-foreground text-sm">
                    <p>&copy; {new Date().getFullYear()} LOOMSPACE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
