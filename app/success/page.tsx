"use client";

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// We separate the core content into a component so we can wrap it in Suspense
// (A strict Next.js requirement when reading URL parameters on the client side)
function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-neutral-100 transform transition-all">
            <div className="flex justify-center mb-6">
                <CheckCircle className="text-black w-20 h-20" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-4xl font-bold text-black mb-4">Order Confirmed!</h1>
            <p className="text-text-muted mb-8 text-lg font-medium">
                Thank you for your purchase. Your new gear is being prepped for shipment.
            </p>

            {orderId && (
                <div className="bg-surface-light py-4 px-6 rounded-xl mb-8 border border-neutral-200">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Order Number</p>
                    <p className="font-mono text-2xl font-bold text-black">#{orderId}</p>
                </div>
            )}

            <Link
                href="/"
                className="block w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-neutral-800 transition-colors duration-300"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-surface-light flex flex-col items-center justify-center p-6 pt-24">
            <Suspense fallback={<div className="text-black font-medium">Loading your receipt...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
