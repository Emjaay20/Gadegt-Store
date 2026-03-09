"use client";

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/src/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartSliderProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSlider({ isOpen, onClose }: CartSliderProps) {
    // Bring in everything from our Zustand engine, including clearCart
    const { cartItems, removeItem, updateQuantity, cartTotal, clearCart } = useCartStore();
    const router = useRouter();

    // Hydration fix
    const [isMounted, setIsMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Navigate to the checkout page — the form there handles the actual API call
    const handleCheckout = () => {
        onClose();
        router.push('/checkout');
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                    <h2 className="font-display text-2xl font-bold text-black">Your Cart</h2>
                    <button onClick={onClose} className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full hover:bg-neutral-100">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4">
                            <span className="text-4xl">🛒</span>
                            <p className="font-medium">Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-24 h-24 bg-surface-light rounded-xl border border-neutral-100 flex items-center justify-center p-2 flex-shrink-0">
                                    <img src={item.images?.[0]?.src || 'https://placehold.co/200'} alt={item.name} className="object-contain" />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-display font-bold text-black line-clamp-1 pr-2">{item.name}</h3>
                                            <button onClick={() => removeItem(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center border border-neutral-200 rounded-lg">
                                            <button onClick={() => updateQuantity(item.id, item.cartQuantity - 1)} className="p-2 text-neutral-500 hover:text-black transition-colors"><Minus size={14} /></button>
                                            <span className="w-8 text-center text-sm font-semibold text-black">{item.cartQuantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.cartQuantity + 1)} className="p-2 text-neutral-500 hover:text-black transition-colors"><Plus size={14} /></button>
                                        </div>
                                        <span className="font-bold text-black">₦{((Number(item.price) || 0) * item.cartQuantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-neutral-100 bg-surface-light/50">
                        <div className="flex justify-between text-base mb-2">
                            <span className="text-text-muted font-medium">Subtotal</span>
                            <span className="font-bold text-black">₦{cartTotal().toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-text-muted mb-6">Shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-neutral-800 transition-colors duration-300 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? "Processing Order..." : "Proceed to Checkout"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}


