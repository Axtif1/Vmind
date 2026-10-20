"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck } from "lucide-react";
import { formatPrice } from "@/utils/currency";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 1999;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progressPercentage = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F8F6F1] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DDD8CF]">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-xl tracking-[0.16em] uppercase text-[#171716]">Shopping Bag</span>
            <span className="text-xs font-mono font-medium text-[#777168] bg-[#F0ECE4] px-2 py-0.5">
              {cartCount}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#171716] hover:text-[#C9342D] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-[#F0ECE4] px-6 py-3.5 border-b border-[#DDD8CF]">
          <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-1.5 font-medium">
            <span className="flex items-center text-[#777168]">
              <Truck className="w-3.5 h-3.5 mr-1.5 text-[#C9342D]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#C9342D] font-semibold">Complimentary Pan-India Delivery Unlocked</span>
              ) : (
                <span>Add {formatPrice(remainingForFreeShipping)} for Free Express Shipping</span>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#777168]">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-[#DDD8CF] h-1.5 overflow-hidden">
            <div
              className="bg-[#171716] h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EDE8DE]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#8E8A80]">
                <ShoppingBag className="w-7 h-7 stroke-1" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg tracking-wider uppercase text-[#1A1A18]">
                  Your Bag Is Empty
                </p>
                <p className="text-xs text-[#736E64] max-w-xs leading-relaxed">
                  Explore our permanent collection or the newly released Archive 04 capsule.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/shop");
                }}
                className="mt-4 bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#383632] px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors flex items-center space-x-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4 flex space-x-4">
                {/* Image */}
                <div className="w-20 h-26 flex-shrink-0 bg-[#EDE8DE] overflow-hidden relative">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <Link
                        href={`/products/${item.slug || item.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-medium tracking-wide uppercase hover:underline text-[#1A1A18] line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-[#8E8A80] hover:text-[#8A353D] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center space-x-2 text-[11px] text-[#736E64] font-light">
                      <span>Size: {item.selectedSize}</span>
                      <span>•</span>
                      <span>{item.selectedColor}</span>
                    </div>

                    <div className="mt-1 text-xs font-mono font-medium text-[#1A1A18]">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D9D3C7] bg-[#F5F2EC]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="px-2 py-1 text-[#1A1A18] hover:bg-[#EAE4D7] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono font-medium text-[#1A1A18]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="px-2 py-1 text-[#1A1A18] hover:bg-[#EAE4D7] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-semibold text-[#1A1A18]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-[#DDD8CF] bg-[#F8F6F1] p-6 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#777168]">
                <span>Estimated Subtotal</span>
                <span className="font-mono text-[#171716] font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#777168]">
                <span>GST & Taxes</span>
                <span className="font-mono text-[#566150]">Included</span>
              </div>
              <div className="flex justify-between text-[#777168]">
                <span>Express Courier</span>
                <span className="font-mono text-[#566150]">
                  {remainingForFreeShipping === 0 ? "Complimentary" : formatPrice(199)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#DDD8CF] text-[#171716]">
                <span className="uppercase tracking-wider">Total</span>
                <span className="font-mono">
                  {formatPrice(remainingForFreeShipping === 0 ? cartSubtotal : cartSubtotal + 199)}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
                className="w-full bg-[#171716] text-[#F8F6F1] hover:bg-[#C9342D] py-3.5 px-4 text-xs font-semibold tracking-widest-editorial uppercase transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 text-center text-xs tracking-wider uppercase text-[#777168] hover:text-[#171716] transition-colors font-medium"
              >
                Continue Browsing
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2 text-[10px] text-[#777168] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#566150]" />
              <span>Complimentary Returns • Insured Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
