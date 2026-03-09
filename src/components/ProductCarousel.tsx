"use client";

import { useRef } from 'react';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel({ products }: { products: any[] }) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (products.length === 0) {
        return (
            <div className="w-full text-center text-text-muted py-32 border border-dashed border-neutral-300 rounded-3xl bg-surface-light">
                No products found. Please add products in LocalWP.
            </div>
        );
    }

    return (
        <div className="relative group">
            {/* Navigation Arrows (Hidden on Mobile, Visible on Desktop Hover) */}
            <button
                onClick={() => scroll('left')}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                <ChevronRight size={24} strokeWidth={2.5} />
            </button>

            {/* The Scrollable Track */}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {products.slice(0, 6).map((product: any) => (
                    <div key={product.id} className="w-[85vw] md:w-[380px] lg:w-[400px] flex-shrink-0 snap-center md:snap-start group/card flex flex-col">
                        <Link href={`/product/${product.slug}`} className="aspect-[4/5] bg-surface-light rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center p-8 cursor-pointer shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] transition-shadow duration-500">
                            <div
                                className="absolute inset-0 bg-contain bg-center bg-no-repeat m-8 transition-transform duration-700 ease-out group-hover/card:scale-110"
                                style={{ backgroundImage: `url(${product.images?.[0]?.src || 'https://placehold.co/600x800/f5f5f7/a3a3a3?text=No+Image'})` }}
                            />
                        </Link>

                        <div className="flex justify-between items-start gap-4 px-2">
                            <div className="pr-2">
                                <Link href={`/product/${product.slug}`}>
                                    <h3 className="font-display text-lg font-bold text-black mb-1 group-hover/card:text-neutral-600 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div
                                    className="text-sm text-text-muted font-medium line-clamp-1"
                                    dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
                                />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-base font-bold text-black whitespace-nowrap">
                                    ₦{Number(product.price || 0).toLocaleString()}
                                </span>
                                <AddToCartButton product={product} compact />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
