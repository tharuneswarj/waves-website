import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCart,
  addToCart,
  getCart,
  updateCartLine,
  removeFromCart,
  type ShopifyCart,
} from "./shopify";

interface CartState {
  cart: ShopifyCart | null;
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isOpen: false,
      loading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: async (variantId, quantity = 1) => {
        set({ loading: true });
        try {
          const { cart } = get();
          let updatedCart: ShopifyCart;

          if (cart) {
            updatedCart = await addToCart(cart.id, variantId, quantity);
          } else {
            updatedCart = await createCart(variantId, quantity);
          }

          set({ cart: updatedCart, isOpen: true, loading: false });
        } catch (error) {
          console.error("Failed to add item to cart:", error);
          set({ loading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        const { cart } = get();
        if (!cart) return;

        set({ loading: true });
        try {
          const updatedCart = await updateCartLine(cart.id, lineId, quantity);
          set({ cart: updatedCart, loading: false });
        } catch (error) {
          console.error("Failed to update cart line:", error);
          set({ loading: false });
        }
      },

      removeItem: async (lineId) => {
        const { cart } = get();
        if (!cart) return;

        set({ loading: true });
        try {
          const updatedCart = await removeFromCart(cart.id, [lineId]);
          set({ cart: updatedCart, loading: false });
        } catch (error) {
          console.error("Failed to remove cart line:", error);
          set({ loading: false });
        }
      },

      refreshCart: async () => {
        const { cart } = get();
        if (!cart) return;

        try {
          const refreshed = await getCart(cart.id);
          set({ cart: refreshed });
        } catch {
          set({ cart: null });
        }
      },
    }),
    {
      name: "waves-cart",
      partialize: (state) => ({ cart: state.cart }),
      skipHydration: true,
    }
  )
);
