"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/src/lib/store';
import CartSlider from './CartSlider';

export default function Header() {
    const router = useRouter();
    // Read cart open state and notification state from our global Zustand store
    const {
        cartCount,
        isCartOpen,
        setIsCartOpen,
        showNotification,
        lastAddedItem,
    } = useCartStore();

    // Hydration fix & Local search state
    const [isMounted, setIsMounted] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Live Search state
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                    const data = await res.json();
                    if (data.products) {
                        setSearchResults(data.products);
                    }
                } catch (e) {
                    console.error("Search failed:", e);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            router.push(`/store?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery("");
            setSearchResults([]); // Clear live results
        }
    };

    return (
        <>
            <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 transition-all duration-300">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between relative">

                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium text-neutral-500 hover:text-black transition-colors" href="/store">Store</Link>
                        <a className="text-sm font-medium text-neutral-500 hover:text-black transition-colors" href="#">Audio</a>
                        <a className="text-sm font-medium text-neutral-500 hover:text-black transition-colors" href="#">Accessories</a>
                        <a className="text-sm font-medium text-neutral-500 hover:text-black transition-colors" href="#">Support</a>
                    </nav>

                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <Link href="/" className="text-xl font-display font-bold tracking-widest text-black uppercase">TechNoir</Link>
                    </div>

                    <div className="flex items-center gap-6 relative">
                        {/* --- THE NEW SEARCH BAR --- */}
                        {isSearchOpen ? (
                            <div className="relative z-50 animate-fade-in">
                                <form onSubmit={handleSearchSubmit} className="flex items-center">
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-40 md:w-64 border-b border-black outline-none bg-transparent text-sm py-1 px-2 text-black placeholder:text-neutral-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery("");
                                            setSearchResults([]);
                                        }}
                                        className="ml-2 text-neutral-400 hover:text-black transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </form>

                                {/* Live Search Dropdown */}
                                {(searchQuery.trim().length >= 2) && (
                                    <div className="absolute top-10 right-0 md:left-0 md:right-auto w-[280px] md:w-[320px] bg-white border border-neutral-100 shadow-2xl rounded-2xl overflow-hidden animate-fade-in max-h-[60vh] overflow-y-auto">
                                        {isSearching ? (
                                            <div className="p-4 text-center text-sm font-medium text-text-muted animate-pulse">
                                                Searching...
                                            </div>
                                        ) : searchResults.length > 0 ? (
                                            <ul className="py-2">
                                                {searchResults.map((product) => (
                                                    <li key={product.id}>
                                                        <Link
                                                            href={`/product/${product.slug}`}
                                                            onClick={() => {
                                                                setIsSearchOpen(false);
                                                                setSearchQuery("");
                                                                setSearchResults([]);
                                                            }}
                                                            className="flex items-center gap-3 px-4 py-2 hover:bg-surface-light transition-colors group"
                                                        >
                                                            <div className="w-10 h-10 bg-surface-light rounded-md flex-shrink-0 p-1 flex items-center justify-center">
                                                                <img src={product.image || 'https://placehold.co/100x100?text=Img'} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                                                            </div>
                                                            <div className="flex-1 overflow-hidden">
                                                                <h4 className="text-sm font-bold text-black truncate group-hover:text-neutral-600 transition-colors">{product.name}</h4>
                                                                <p className="text-xs text-text-muted font-medium">₦{Number(product.price || 0).toLocaleString()}</p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className="px-4 py-3 border-t border-neutral-100 text-center">
                                                    <button
                                                        onClick={handleSearchSubmit}
                                                        className="text-xs font-bold text-black hover:text-neutral-600 transition-colors w-full tracking-wide"
                                                    >
                                                        See all results for &quot;{searchQuery}&quot; →
                                                    </button>
                                                </li>
                                            </ul>
                                        ) : (
                                            <div className="p-4 text-center text-sm text-text-muted font-medium">
                                                No results found for &quot;{searchQuery}&quot;
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-neutral-500 hover:text-black transition-colors text-sm font-medium"
                            >
                                Search
                            </button>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-neutral-500 hover:text-black transition-colors text-sm font-medium flex items-center gap-2"
                        >
                            Cart
                            <span className="bg-neutral-100 text-black px-2 py-0.5 rounded-full text-xs font-bold border border-neutral-200">
                                {isMounted ? cartCount() : 0}
                            </span>
                        </button>

                        {/* Toast Notification — drops down under the Cart button */}
                        <div
                            className={`absolute top-12 right-0 bg-white border border-neutral-100 shadow-2xl rounded-2xl p-4 w-80 transition-all duration-300 origin-top-right z-50 ${showNotification
                                ? 'scale-100 opacity-100 translate-y-0'
                                : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-black mb-0.5">Added to Cart</h4>
                                    <p className="text-xs text-text-muted line-clamp-1">{lastAddedItem}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    useCartStore.setState({ showNotification: false });
                                    setIsCartOpen(true);
                                }}
                                className="w-full bg-surface-light hover:bg-neutral-100 border border-neutral-200 text-black text-xs font-bold py-3 rounded-xl transition-colors"
                            >
                                View Cart →
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* CartSlider now reads and writes isCartOpen from the global store */}
            <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
