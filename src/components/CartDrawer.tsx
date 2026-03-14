"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { associateCustomerWithCart } from "@/lib/shopify";
import type { ShopifyPrice } from "@/lib/shopify";

function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CartDrawer() {
  const { cart, isOpen, loading, closeCart, updateItem, removeItem } =
    useCartStore();
  const { accessToken } = useAuthStore();

  const handleCheckout = async () => {
    if (!cart?.checkoutUrl) return;
    if (cart.id && accessToken) {
      try {
        await associateCustomerWithCart(cart.id, accessToken);
      } catch {
        // Non-fatal — proceed to checkout even if association fails
      }
    }
    window.location.href = cart.checkoutUrl;
  };

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const isEmpty = lines.length === 0;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-primary/15 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-[var(--glass-bg-heavy)] backdrop-blur-[20px] border-l border-[var(--glass-border)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary/10 px-6 py-5">
              <h2 className="font-sans text-lg font-medium text-primary">
                Cart
                {cart && cart.totalQuantity > 0 && (
                  <span className="ml-2 font-mono text-xs text-primary/40">
                    ({cart.totalQuantity})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 text-primary/50 transition-colors hover:text-primary"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Cart lines */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isEmpty ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-base font-light text-primary/40">
                    Your cart is empty.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-4 font-sans text-sm font-medium text-accent transition-colors hover:text-accent-dark"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {lines.map((line) => {
                    const { merchandise } = line;
                    const image = merchandise.product.featuredImage;

                    return (
                      <li
                        key={line.id}
                        className="flex gap-4 border-b border-primary/5 pb-6 last:border-0"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-primary/5">
                          {image ? (
                            <Image
                              src={image.url}
                              alt={image.altText || merchandise.product.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="font-mono text-[9px] text-primary/20">
                                No img
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="font-sans text-sm font-medium text-primary">
                              {merchandise.product.title}
                            </p>
                            {merchandise.title !== "Default Title" && (
                              <p className="mt-0.5 font-mono text-[11px] text-primary/40">
                                {merchandise.title}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                  line.quantity <= 1
                                    ? removeItem(line.id)
                                    : updateItem(line.id, line.quantity - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/15 font-mono text-xs text-primary/60 transition-colors hover:border-primary/30 disabled:opacity-40"
                                aria-label="Decrease quantity"
                              >
                                &minus;
                              </button>
                              <span className="w-6 text-center font-mono text-xs text-primary">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                  updateItem(line.id, line.quantity + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/15 font-mono text-xs text-primary/60 transition-colors hover:border-primary/30 disabled:opacity-40"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            {/* Line price */}
                            <p className="font-mono text-xs tracking-wide text-primary">
                              {formatPrice(merchandise.price)}
                            </p>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => removeItem(line.id)}
                          className="shrink-0 self-start p-1 text-primary/30 transition-colors hover:text-accent disabled:opacity-40"
                          aria-label={`Remove ${merchandise.product.title}`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="border-t border-primary/10 px-6 py-5">
                {/* Subtotal */}
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="font-sans text-sm text-primary/60">
                    Subtotal
                  </span>
                  <span className="font-mono text-base tracking-wide text-primary">
                    {cart && formatPrice(cart.cost.subtotalAmount)}
                  </span>
                </div>

                <p className="mb-5 font-mono text-[10px] tracking-wide text-primary/30">
                  Shipping and taxes calculated at checkout.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="block w-full rounded-full bg-accent py-3.5 text-center font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-accent-dark"
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="w-full rounded-full border border-primary/15 py-3.5 font-sans text-sm font-medium tracking-wide text-primary transition-colors hover:border-primary/30"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
