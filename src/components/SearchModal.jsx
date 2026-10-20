"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { Search, X, ArrowUpRight, Sparkles } from "lucide-react";
import { formatPrice } from "@/utils/currency";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const popularSearches = [
    "Overcoat",
    "Belted Trench",
    "Cashmere",
    "Alpaca",
    "Wide-Leg",
    "Japanese Denim",
    "Lug Loafer"
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#F8F6F1] border border-[#DDD8CF] shadow-2xl z-10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-5 border-b border-[#DDD8CF] bg-[#F0ECE4]">
          <Search className="w-5 h-5 text-[#777168] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY GARMENT, TEXTILE, OR SILHOUETTE..."
            className="w-full bg-transparent text-sm sm:text-base tracking-wider uppercase placeholder-[#9E988D] text-[#171716] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs tracking-wider uppercase text-[#777168] hover:text-[#C9342D] mr-3"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#171716] hover:text-[#C9342D] transition-colors ml-2"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-3.5 bg-[#F8F6F1] border-b border-[#DDD8CF] flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#777168] flex items-center mr-1">
            <Sparkles className="w-3 h-3 mr-1 text-[#C9342D]" /> Suggestions:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="bg-[#F0ECE4] hover:bg-[#171716] hover:text-[#F8F6F1] text-[#171716] px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {query.trim() === "" ? (
            <div className="py-10 text-center space-y-3">
              <p className="font-serif text-lg tracking-wide uppercase text-[#1A1A18]">
                Explore The Atelier Archive
              </p>
              <p className="text-xs text-[#736E64] max-w-md mx-auto leading-relaxed">
                Discover architectural overcoats, Japanese selvedge denim, Grade-A royal cashmere, and fine Italian tailored slacks.
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase bg-[#1A1A18] text-[#FCFBF8] px-5 py-2.5 hover:bg-[#34322E] transition-colors"
                >
                  <span>View All 12 Pieces</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-serif text-base tracking-wider uppercase text-[#1A1A18]">
                No Pieces Found for "{query}"
              </p>
              <p className="text-xs text-[#736E64]">
                Try searching for "overcoat", "wool", "cashmere", or "trench".
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE8DE] mb-4 text-xs">
                <span className="text-[#736E64] uppercase tracking-wider">
                  Found {filteredProducts.length} archival {filteredProducts.length === 1 ? "piece" : "pieces"}
                </span>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs font-medium tracking-wider uppercase text-[#1A1A18] hover:underline flex items-center"
                >
                  View In Full Catalog <ArrowUpRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug || product.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex space-x-3.5 p-2.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-transparent hover:border-[#E0D9CB] transition-all group"
                  >
                    <div className="w-16 h-22 bg-[#EDE8DE] overflow-hidden flex-shrink-0">
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8E8A80] block font-mono">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18] group-hover:text-[#8A353D] transition-colors line-clamp-1 mt-0.5">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#736E64] line-clamp-1 font-light mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>
                      <div className="text-xs font-mono font-medium text-[#1A1A18] flex items-center space-x-2">
                        <span>{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-[#8E8A80] line-through text-[11px]">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
