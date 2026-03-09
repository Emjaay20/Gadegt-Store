"use client";

import { useState } from "react";
import { Product } from "@/src/types/woocommerce";
import { useCartStore } from "@/src/lib/store";
import { ShoppingBag, Check } from "lucide-react";

export default function AddToCartButton({ product, compact = false }: { product: Product, compact?: boolean }) {
    const { addItem, triggerNotification } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a <Link>

        addItem(product);
        triggerNotification(product.name); // Fire the global toast popup

        // Temporarily flash a success state on the button itself
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`
                group relative overflow-hidden font-bold tracking-wide transition-all duration-500 ease-out
                flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                ${compact ? 'px-5 py-2.5 rounded-full text-xs' : 'w-full py-4 rounded-2xl text-sm'}
                ${isAdded
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20 disabled:cursor-default'
                    : 'bg-black text-white hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
                }
            `}
        >
            <div className={`flex items-center gap-2 transform transition-transform duration-500 ${isAdded ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100'}`}>
                <ShoppingBag size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6" />
                Add to Cart
            </div>

            <div className={`flex items-center gap-2 transform transition-all duration-500 ${isAdded ? 'scale-100 opacity-100' : 'scale-50 opacity-0 absolute'}`}>
                <Check size={18} strokeWidth={3} />
                Added to Cart
            </div>
        </button>
    );
}
