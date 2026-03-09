export default function Footer() {
    return (
        <footer className="bg-surface-light border-t border-neutral-200 text-black py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col">
                    <span className="font-display font-bold text-xl mb-4">TechNoir</span>
                    <p className="text-sm text-neutral-500 max-w-xs">
                        Curated tech essentials for the modern workflow.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">All Products</a>
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">New Arrivals</a>
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">Accessories</a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">About Us</a>
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">Careers</a>
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">Contact</a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Legal</h4>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">Privacy Policy</a>
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">Terms of Service</a>
                        <a href="#" className="text-sm text-neutral-500 hover:text-black">Returns</a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-neutral-200 flex justify-between items-center text-sm text-neutral-500">
                <p>&copy; {new Date().getFullYear()} TechNoir. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-black">Twitter</a>
                    <a href="#" className="hover:text-black">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
