"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { formatPrice } from "@/utils/currency";

export default function ProductCard({ product }) {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, product.colors[0]?.name, 1);
    setShowQuickAdd(false);
  };

  const [imgSrc, setImgSrc] = useState(product.primaryImage);
  const [hoverSrc, setHoverSrc] = useState(product.hoverImage || product.primaryImage);

  const fallbackImage = "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85";

  return (
    <div 
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Visual Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#EAE5DC] overflow-hidden">
        
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isSaved 
              ? "bg-[#1A1A18] text-[#FCFBF8]" 
              : "bg-white/80 hover:bg-white text-[#1A1A18] backdrop-blur-xs opacity-0 group-hover:opacity-100"
          }`}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
        </button>

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-[#1A1A18]/90 backdrop-blur-xs text-[#FCFBF8] text-[9px] font-medium tracking-widest uppercase px-2.5 py-1">
              {product.tag}
            </span>
          </div>
        )}

        {/* Product Images (Primary + Alternate Swap with Fallback) */}
        <Link href={`/products/${product.slug || product.id}`} className="block w-full h-full">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(fallbackImage)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered && hoverSrc ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />
          {hoverSrc && (
            <img
              src={hoverSrc}
              alt={`${product.name} alternate view`}
              onError={() => setHoverSrc(imgSrc)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                isHovered ? "opacity-100 scale-103" : "opacity-0 scale-100"
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Quick Add Overlay Drawer */}
        <div 
          className={`absolute inset-x-0 bottom-0 z-20 bg-[#1A1A18]/95 backdrop-blur-md p-3.5 text-center transition-transform duration-300 ease-out ${
            showQuickAdd ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="text-[10px] tracking-widest uppercase text-[#B5A38A] mb-2 font-medium">
            Select Size for Quick Bag Add
          </p>
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => handleQuickAdd(e, size)}
                className="bg-[#2D2C28] hover:bg-[#FCFBF8] text-[#FCFBF8] hover:text-[#1A1A18] text-[10px] font-mono px-2.5 py-1.5 transition-colors border border-[#44423C]"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Hover Quick Action Buttons */}
        {!showQuickAdd && (
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowQuickAdd(true);
              }}
              className="flex-1 bg-[#FCFBF8]/95 hover:bg-white text-[#1A1A18] backdrop-blur-sm py-2.5 text-[11px] font-semibold tracking-widest uppercase transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
            <Link
              href={`/products/${product.slug || product.id}`}
              className="bg-[#1A1A18]/90 hover:bg-[#1A1A18] text-[#FCFBF8] p-2.5 backdrop-blur-sm transition-colors flex items-center justify-center"
              aria-label="View product details"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 space-y-1">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#777168] font-mono">
          <span>{product.gender || "UNISEX"} • {product.category}</span>
          {product.stock <= 4 && (
            <span className="text-[#C9342D] font-sans font-medium">Low Stock</span>
          )}
        </div>

        <h3 className="text-xs sm:text-[13px] font-medium tracking-wide uppercase text-[#171716] group-hover:text-[#C9342D] transition-colors line-clamp-1">
          <Link href={`/products/${product.slug || product.id}`}>
            {product.name}
          </Link>
        </h3>

        <p className="text-[11px] text-[#777168] font-light line-clamp-1">
          {product.subtitle}
        </p>

        {/* Price and Color Swatches */}
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-baseline space-x-2 text-xs font-mono">
            <span className="font-semibold text-[#171716]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[#9E988D] line-through text-[11px]">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/15"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
