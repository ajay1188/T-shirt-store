import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">LOOMSPACE</h3>
                        <p className="text-gray-400">Premium quality tees for the modern minimalist. Crafted with care, designed for comfort.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/shop?category=men" className="hover:text-white">Men</Link></li>
                            <li><Link href="/shop?category=women" className="hover:text-white">Women</Link></li>
                            <li><Link href="/shop?category=oversized" className="hover:text-white">Oversized</Link></li>
                            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-white">Shipping & Returns</Link></li>
                            <li><Link href="/size-guide" className="hover:text-white">Size Guide</Link></li>
                            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter for new drops.</p>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full" />
                            <button className="bg-white text-black px-4 py-2 rounded-r-md font-medium hover:bg-gray-200">Join</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LOOMSPACE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
