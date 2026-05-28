import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    cardId: string;
    listingId?: number;
    title: string;
    image: string;
    edition: string;
    condition: string;
    price: number;
    quantity: number;
    sellerName: string;
    shippingCost: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getShippingTotal: () => number;
    getItemCount: () => number;
    selectedShippingMethod: Record<string, 'local' | 'regional'>;
    setShippingMethod: (sellerName: string, method: 'local' | 'regional') => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            
            addItem: (newItem) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.cardId === newItem.cardId && item.sellerName === newItem.sellerName && item.condition === newItem.condition
                    );

                    if (existingItemIndex >= 0) {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += newItem.quantity;
                        return { items: updatedItems };
                    }

                    return { items: [...state.items, newItem] };
                });
            },
            
            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },
            
            updateQuantity: (id, quantity) => {
                set((state) => ({
                    items: state.items.map((item) => 
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }));
            },
            
            clearCart: () => set({ items: [], selectedShippingMethod: {} }),
            
            selectedShippingMethod: {},
            
            setShippingMethod: (sellerName, method) => {
                set((state) => ({
                    selectedShippingMethod: {
                        ...state.selectedShippingMethod,
                        [sellerName]: method
                    }
                }));
            },
            
            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            
            getShippingTotal: () => {
                const itemsBySeller: Record<string, CartItem[]> = {};
                get().items.forEach(item => {
                    if (!itemsBySeller[item.sellerName]) {
                        itemsBySeller[item.sellerName] = [];
                    }
                    itemsBySeller[item.sellerName].push(item);
                });

                let totalShipping = 0;
                const FREE_SHIPPING_THRESHOLD = 50.0;

                Object.entries(itemsBySeller).forEach(([sellerName, sellerItems]) => {
                    const packageSubtotal = sellerItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    if (packageSubtotal < FREE_SHIPPING_THRESHOLD) {
                        const method = get().selectedShippingMethod[sellerName] || 'local';
                        const packageShipping = method === 'regional' ? 15.50 : (sellerItems[0]?.shippingCost || 0);
                        totalShipping += packageShipping;
                    }
                });

                return totalShipping;
            },
            
            getItemCount: () => {
                return get().items.length;
            }
        }),
        {
            name: 'tcghub-cart', // name of the item in the storage (must be unique)
        }
    )
);
