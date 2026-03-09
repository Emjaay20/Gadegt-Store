// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/src/types/woocommerce';

// Define what a single item in the cart looks like
export interface CartItem extends Product {
    cartQuantity: number;
}

// Define the actions our store can perform
interface CartState {
    // ── Data State ────────────────────────────────────────────────────
    cartItems: CartItem[];

    // ── UI State (NOT persisted to localStorage) ──────────────────────
    isCartOpen: boolean;
    showNotification: boolean;
    lastAddedItem: string | null;

    // ── Actions ───────────────────────────────────────────────────────
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    cartTotal: () => number;
    cartCount: () => number;
    clearCart: () => void;

    // UI actions
    setIsCartOpen: (isOpen: boolean) => void;
    triggerNotification: (productName: string) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            isCartOpen: false,
            showNotification: false,
            lastAddedItem: null,

            addItem: (product) => {
                const currentItems = get().cartItems;
                const existingItem = currentItems.find((item) => item.id === product.id);
                if (existingItem) {
                    set({
                        cartItems: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ cartItems: [...currentItems, { ...product, cartQuantity: 1 }] });
                }
            },

            removeItem: (productId) => {
                set({ cartItems: get().cartItems.filter((item) => item.id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set({
                    cartItems: get().cartItems.map((item) =>
                        item.id === productId ? { ...item, cartQuantity: quantity } : item
                    ),
                });
            },

            cartTotal: () =>
                get().cartItems.reduce(
                    (total, item) => total + Number(item.price || 0) * item.cartQuantity,
                    0
                ),

            cartCount: () =>
                get().cartItems.reduce((count, item) => count + item.cartQuantity, 0),

            clearCart: () => set({ cartItems: [] }),

            // ── UI Actions ────────────────────────────────────────────────
            setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

            triggerNotification: (productName) => {
                set({ showNotification: true, lastAddedItem: productName });
                // Auto-dismiss after 4 seconds
                setTimeout(() => set({ showNotification: false }), 4000);
            },
        }),
        {
            name: 'technoir-cart-storage',
            // Pro-trick: Only persist cart items — UI state resets on refresh
            partialize: (state) => ({ cartItems: state.cartItems }),
        }
    )
);
