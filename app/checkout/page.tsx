"use client";

import { useState } from 'react';
import { useCartStore } from '@/src/lib/store';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cartItems, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState<number | null>(null);

    // Controlled form state
    const [formData, setFormData] = useState({
        email: '', phone: '', firstName: '', lastName: '', address: '', city: '', state: ''
    });

    const subtotal = cartItems.reduce((total, item) => total + (Number(item.price || 0) * item.cartQuantity), 0);
    const shipping = cartItems.length > 0 ? 5000 : 0;
    const total = subtotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: formData,
                    items: cartItems,
                }),
            });

            const data = await res.json();

            if (data.success) {
                clearCart();
                setOrderSuccess(data.orderId);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch {
            alert('A network error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── SUCCESS SCREEN ──────────────────────────────────────────────────
    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-surface-light pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="font-display text-4xl font-bold text-black mb-4">Order Confirmed!</h1>
                <p className="text-text-muted mb-2">Thank you, {formData.firstName}. Your order has been placed.</p>
                <p className="font-bold text-black mb-8">Order ID: #{orderSuccess}</p>
                <Link href="/store" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // ── EMPTY CART GUARD ────────────────────────────────────────────────
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-surface-light pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center">
                <h1 className="font-display text-4xl font-bold text-black mb-4">Your cart is empty.</h1>
                <p className="text-text-muted mb-8">Add some gear to your cart to proceed.</p>
                <Link href="/store" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors">
                    Return to Store
                </Link>
            </div>
        );
    }

    const inputClass = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder:text-neutral-400";

    // ── CHECKOUT UI ─────────────────────────────────────────────────────
    return (
        <div className="bg-surface-light min-h-screen pt-24 pb-32">
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="mb-12">
                    <h1 className="font-display text-4xl font-bold text-black mb-2">Checkout</h1>
                    <p className="text-text-muted">Securely complete your order.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">

                    {/* LEFT: Customer Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">

                            <div>
                                <h2 className="text-lg font-bold text-black mb-4 tracking-tight">Contact Information</h2>
                                <div className="space-y-4">
                                    <input required name="email" onChange={handleInputChange} type="email" placeholder="Email Address" className={inputClass} />
                                    <input required name="phone" onChange={handleInputChange} type="tel" placeholder="Phone Number" className={inputClass} />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-black mb-4 tracking-tight">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <input required name="firstName" onChange={handleInputChange} type="text" placeholder="First Name" className={inputClass} />
                                    <input required name="lastName" onChange={handleInputChange} type="text" placeholder="Last Name" className={inputClass} />
                                </div>
                                <div className="space-y-4">
                                    <input required name="address" onChange={handleInputChange} type="text" placeholder="Street Address" className={inputClass} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required name="city" onChange={handleInputChange} type="text" placeholder="City" className={inputClass} />
                                        <input required name="state" onChange={handleInputChange} type="text" placeholder="State / Province" className={inputClass} />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors duration-300 disabled:bg-neutral-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? 'Processing...' : `Complete Order • ₦${total.toLocaleString()}`}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="w-full lg:w-[420px]">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 sticky top-32">
                            <h2 className="text-lg font-bold text-black mb-6 tracking-tight">Order Summary</h2>

                            <ul className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-surface-light rounded-lg flex-shrink-0 flex items-center justify-center p-2 relative border border-neutral-100">
                                            <img
                                                src={item.images?.[0]?.src || 'https://placehold.co/100x100/f5f5f7/a3a3a3?text=Img'}
                                                alt={item.name}
                                                className="object-contain w-full h-full mix-blend-multiply"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-neutral-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                                {item.cartQuantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-black text-sm line-clamp-1">{item.name}</h4>
                                            <span className="text-text-muted text-sm mt-1 block">
                                                ₦{(Number(item.price || 0) * item.cartQuantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t border-neutral-100 pt-6 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Subtotal</span>
                                    <span className="font-bold text-black">₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Shipping (Flat Rate)</span>
                                    <span className="font-bold text-black">₦{shipping.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-neutral-100 pt-4 flex justify-between items-center">
                                    <span className="text-base font-bold text-black">Total</span>
                                    <span className="text-xl font-bold text-black">₦{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
