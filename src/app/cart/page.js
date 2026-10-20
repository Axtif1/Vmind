"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  ChevronRight
} from "lucide-react";
import { formatPrice } from "@/utils/currency";

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartCount,
    clearCart 
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 1999;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progressPercentage = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#8E8A80] mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <Link href="/shop" className="hover:text-black transition-colors">Collection</Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <span className="text-[#1A1A18] font-medium">Shopping Bag</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E8E3D9] pb-6 mb-10 gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
            Atelier Order Preparation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl uppercase tracking-wider text-[#1A1A18] mt-1">
            Shopping Bag
          </h1>
        </div>
        <div className="text-xs font-mono text-[#736E64] uppercase tracking-wider">
          {cartCount} {cartCount === 1 ? "Piece" : "Pieces"} Selected
        </div>
      </div>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="py-24 text-center space-y-5 border border-[#E8E3D9] bg-[#F9F7F2] p-8 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#EDE8DE] flex items-center justify-center text-[#736E64] mx-auto">
            <ShoppingBag className="w-8 h-8 stroke-1" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl uppercase tracking-wider text-[#1A1A18]">
              Your Bag Is Currently Empty
            </h2>
            <p className="text-xs text-[#736E64] max-w-sm mx-auto leading-relaxed font-light">
              Explore our permanent outerwear collection, Japanese selvedge denim, or the newly released Archive 04 capsule.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322E] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Cart Grid: Items (Left 8 cols) & Order Summary (Right 4 cols) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cart Table / Items List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Free Shipping Banner */}
            <div className="bg-[#F5F2EC] p-4 border border-[#E8E3D9]">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium mb-2">
                <span className="flex items-center text-[#4A4740]">
                  <Truck className="w-4 h-4 mr-2 text-[#747C69]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#67705B] font-semibold">
                      Complimentary Pan-India Delivery Unlocked
                    </span>
                  ) : (
                    <span>Add {formatPrice(remainingForFreeShipping)} for Free Express Courier</span>
                  )}
                </span>
                <span className="font-mono text-[11px] text-[#736E64]">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-[#E5DFD3] h-1.5 overflow-hidden">
                <div
                  className="bg-[#242421] h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="divide-y divide-[#EDE8DE] border-b border-[#EDE8DE]">
              {cart.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                  className="py-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-start"
                >
                  {/* Thumbnail */}
                  <Link 
                    href={`/products/${item.slug || item.id}`}
                    className="w-24 sm:w-28 aspect-[3/4] bg-[#EDE8DE] flex-shrink-0 overflow-hidden relative"
                  >
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link 
                          href={`/products/${item.slug || item.id}`}
                          className="font-serif text-lg uppercase tracking-wide hover:underline text-[#1A1A18]"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#736E64] font-light">
                          {item.subtitle}
                        </p>
                      </div>

                      <span className="font-mono text-base font-semibold text-[#1A1A18]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-[#545149] font-mono">
                      <span>Size: {item.selectedSize}</span>
                      <span>•</span>
                      <span>Color: {item.selectedColor}</span>
                      <span>•</span>
                      <span>{formatPrice(item.price)} each</span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#D9D3C7] bg-[#F5F2EC]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                          className="px-2.5 py-1 text-[#1A1A18] hover:bg-[#EAE4D7] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3.5 text-xs font-mono font-medium text-[#1A1A18]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                          className="px-2.5 py-1 text-[#1A1A18] hover:bg-[#EAE4D7] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-xs text-[#8E8A80] hover:text-[#8A353D] transition-colors flex items-center space-x-1 uppercase tracking-wider font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Actions below items */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/shop"
                className="text-xs font-medium tracking-wider uppercase text-[#736E64] hover:text-[#1A1A18] underline"
              >
                ← Continue Exploring Archive
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-medium tracking-wider uppercase text-[#8A353D] hover:underline"
              >
                Clear Entire Bag
              </button>
            </div>

          </div>

          {/* Right: Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#F5F2EC] border border-[#E8E3D9] p-6 sm:p-8 space-y-6 sticky top-28">
              
              <h3 className="font-serif text-xl uppercase tracking-wider text-[#1A1A18] pb-3 border-b border-[#E2DDD2]">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#636058]">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-[#1A1A18] font-medium">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#636058]">
                  <span>GST & Taxes</span>
                  <span className="font-mono text-[#67705B]">Included</span>
                </div>
                <div className="flex justify-between text-[#636058]">
                  <span>Pan-India Express Courier</span>
                  <span className="font-mono text-[#67705B]">
                    {remainingForFreeShipping === 0 ? "Complimentary" : formatPrice(199)}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] flex justify-between text-base font-semibold text-[#1A1A18]">
                  <span className="uppercase tracking-wider">Estimated Total</span>
                  <span className="font-mono">
                    {formatPrice(remainingForFreeShipping === 0 ? cartSubtotal : cartSubtotal + 199)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322D] py-4 px-6 text-xs font-semibold tracking-widest-editorial uppercase transition-all flex items-center justify-center space-x-2 shadow-md active:scale-98"
                >
                  <span>Proceed To Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Guarantees */}
              <div className="space-y-2.5 pt-4 border-t border-[#E2DDD2] text-[11px] text-[#736E64]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#747C69] flex-shrink-0" />
                  <span>Insured transit with carbon-neutral courier</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-[#747C69] flex-shrink-0" />
                  <span>Complimentary 30-day doorstep exchange collection</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
