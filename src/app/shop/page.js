"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, COLLECTIONS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Heart,
  Search
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { wishlist } = useCart();

  // Initial params
  const paramCategory = searchParams.get("category") || "all";
  const paramGender = searchParams.get("gender") || "all";
  const paramFilter = searchParams.get("filter") || "";
  const paramCollection = searchParams.get("collection") || "";
  const paramView = searchParams.get("view") || "";
  const paramQuery = searchParams.get("q") || "";

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedGender, setSelectedGender] = useState(paramGender);
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(paramFilter === "new" ? "newest" : "featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available filter options
  const sizes = ["all", "XS", "S", "M", "L", "XL", "30", "32", "34", "36", "41", "42", "43"];
  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under-250", label: "Under $250" },
    { id: "250-500", label: "$250 – $500" },
    { id: "above-500", label: "Above $500" },
  ];
  const colors = [
    { name: "all", label: "All Hues" },
    { name: "Charcoal Slate", hex: "#2B2B2A" },
    { name: "Sand Dune", hex: "#D8CFBC" },
    { name: "Olive Muted", hex: "#67705B" },
    { name: "Ivory Chalk", hex: "#EBE7DF" },
    { name: "Midnight Noir", hex: "#191919" },
    { name: "Warm Camel", hex: "#B5A38A" },
  ];

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Wishlist view
      if (paramView === "wishlist") {
        if (!wishlist.includes(product.id)) return false;
      }

      // Search query filter
      if (paramQuery.trim()) {
        const q = paramQuery.toLowerCase();
        const matchesQuery = 
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Collection filter
      if (paramCollection === "archive-04" && product.tag !== "ARCHIVE 04" && !product.isNew) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Gender filter
      if (selectedGender !== "all" && product.gender && product.gender !== selectedGender) {
        return false;
      }

      // Size filter
      if (selectedSize !== "all") {
        const hasSize = product.sizes.some((s) => s.includes(selectedSize));
        if (!hasSize) return false;
      }

      // Price range filter
      if (selectedPriceRange === "under-250" && product.price >= 250) return false;
      if (selectedPriceRange === "250-500" && (product.price < 250 || product.price > 500)) return false;
      if (selectedPriceRange === "above-500" && product.price <= 500) return false;

      // Color filter
      if (selectedColor !== "all") {
        const hasColor = product.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      // In stock filter
      if (inStockOnly && product.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "bestselling") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0; // Default curated
    });
  }, [
    paramView,
    wishlist,
    paramQuery,
    paramCollection,
    selectedCategory,
    selectedGender,
    selectedSize,
    selectedPriceRange,
    selectedColor,
    inStockOnly,
    sortBy,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedSize("all");
    setSelectedPriceRange("all");
    setSelectedColor("all");
    setInStockOnly(false);
    setSortBy("featured");
    router.push("/shop");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedGender !== "all",
    selectedSize !== "all",
    selectedPriceRange !== "all",
    selectedColor !== "all",
    inStockOnly,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header Banner */}
      <div className="border-b border-[#E8E3D9] pb-8 mb-8 space-y-4">
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#8E8A80]">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A18] font-medium">
            {paramView === "wishlist" ? "Personal Archive" : "Atelier Catalog"}
          </span>
          {paramCollection && (
            <>
              <span>/</span>
              <span className="text-[#B5A38A]">Archive 04</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl uppercase tracking-wider text-[#1A1A18]">
              {paramView === "wishlist" 
                ? "Saved Archive Pieces" 
                : paramCollection 
                  ? "Archive 04: Silk & Concrete" 
                  : selectedGender === "men" 
                    ? "Men's Collection" 
                    : selectedGender === "women" 
                      ? "Women's Collection" 
                      : "The Permanent Archive"}
            </h1>
            <p className="text-xs sm:text-sm text-[#736E64] font-light max-w-xl mt-2 leading-relaxed">
              {paramView === "wishlist"
                ? "Your personally curated selections reserved for private consideration."
                : "Architectural silhouettes engineered with high-density natural fibers, canvassed floating construction, and considered proportions."}
            </p>
          </div>

          <div className="text-xs font-mono text-[#8E8A80] tracking-wider uppercase">
            Displaying <span className="text-[#1A1A18] font-semibold">{filteredProducts.length}</span> Pieces
          </div>
        </div>
      </div>

      {/* Control Bar: Filter Trigger & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[#E8E3D9] mb-8 bg-[#FCFBF8]">
        
        {/* Left: Filter Toggle Button & Active Badges */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="inline-flex items-center space-x-2 bg-[#F5F2EC] hover:bg-[#EDE8DE] border border-[#DCD5C9] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1A1A18] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter Archive</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1A1A18] text-[#FCFBF8] text-[9px] flex items-center justify-center font-mono ml-1">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Quick Gender Chips */}
          <div className="hidden sm:flex items-center space-x-1 text-xs">
            {["all", "men", "women"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1.5 uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  selectedGender === g 
                    ? "bg-[#1A1A18] text-[#FCFBF8]" 
                    : "bg-[#F5F2EC] text-[#5A574F] hover:bg-[#EDE8DE]"
                }`}
              >
                {g === "all" ? "All Genders" : g === "men" ? "Men" : "Women"}
              </button>
            ))}
          </div>

          {/* Clear Filters Chip */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-wider text-[#8A353D] hover:underline flex items-center space-x-1 pl-2 font-medium"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Right: Sorting Select */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[#8E8A80] uppercase tracking-wider hidden sm:inline">Sort By:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#F5F2EC] border border-[#DCD5C9] pl-3 pr-8 py-2 text-xs uppercase tracking-wider text-[#1A1A18] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Curation</option>
              <option value="newest">New Releases</option>
              <option value="bestselling">Bestselling Pieces</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#736E64] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Main Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Desktop Sidebar Filters (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
          
          {/* Categories */}
          <div className="space-y-3 pb-6 border-b border-[#E8E3D9]">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1A1A18]">
              Garment Silhouettes
            </h3>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left py-1 flex items-center justify-between transition-colors ${
                      selectedCategory === cat.id
                        ? "font-semibold text-[#1A1A18]"
                        : "text-[#6B675E] hover:text-[#1A1A18]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A18]" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizes */}
          <div className="space-y-3 pb-6 border-b border-[#E8E3D9]">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1A1A18]">
              Sizing
            </h3>
            <div className="grid grid-cols-4 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-1.5 text-xs font-mono uppercase text-center border transition-colors ${
                    selectedSize === s
                      ? "bg-[#1A1A18] text-[#FCFBF8] border-[#1A1A18]"
                      : "bg-[#F5F2EC] text-[#545149] border-[#E2DDD2] hover:bg-[#EAE4D7]"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pb-6 border-b border-[#E8E3D9]">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1A1A18]">
              Price Horizon
            </h3>
            <div className="space-y-2 text-xs">
              {priceRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex items-center space-x-2 text-[#5E5A51] cursor-pointer hover:text-black"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === range.id}
                    onChange={() => setSelectedPriceRange(range.id)}
                    className="accent-[#1A1A18]"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Hues */}
          <div className="space-y-3 pb-6 border-b border-[#E8E3D9]">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1A1A18]">
              Color Palette
            </h3>
            <div className="space-y-2 text-xs">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-full flex items-center justify-between py-1 text-left transition-colors ${
                    selectedColor === c.name ? "font-semibold text-black" : "text-[#6B675E] hover:text-black"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {c.hex && (
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.label || c.name}</span>
                  </div>
                  {selectedColor === c.name && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability */}
          <div className="pt-2">
            <label className="flex items-center space-x-2 text-xs text-[#4A4740] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#1A1A18]"
              />
              <span>In Stock Ready For Courier</span>
            </label>
          </div>

        </aside>

        {/* Product Grid Area (9 Cols) */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 border border-[#E8E3D9] bg-[#F9F7F2] p-8">
              <p className="font-serif text-2xl uppercase tracking-wider text-[#1A1A18]">
                No Archival Pieces Found
              </p>
              <p className="text-xs text-[#736E64] max-w-md mx-auto leading-relaxed">
                No garments in our current catalog match the chosen combination of silhouette, size, and price filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322E] px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Reset All Filters</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-start lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FCFBF8] h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E3D9]">
              <span className="font-serif text-lg uppercase tracking-wider">Filter Archive</span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#1A1A18]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-1 overflow-y-auto divide-y divide-[#EDE8DE]">
              
              {/* Category */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider block text-[#1A1A18]">
                  Category
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 text-xs uppercase tracking-wider transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-[#1A1A18] text-white"
                          : "bg-[#F5F2EC] text-[#55524B]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider block text-[#1A1A18]">
                  Size
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-1 text-xs font-mono uppercase text-center border transition-colors ${
                        selectedSize === s
                          ? "bg-[#1A1A18] text-white border-black"
                          : "bg-[#F5F2EC] text-[#55524B] border-[#E2DDD2]"
                      }`}
                    >
                      {s === "all" ? "All" : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Horizon */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider block text-[#1A1A18]">
                  Price
                </span>
                <div className="space-y-1.5 text-xs">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center space-x-2 text-[#5E5A51]">
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={selectedPriceRange === range.id}
                        onChange={() => setSelectedPriceRange(range.id)}
                        className="accent-[#1A1A18]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#E8E3D9] space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#1A1A18] text-[#FCFBF8] py-3 text-xs font-semibold tracking-widest uppercase"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-center text-xs text-[#8A353D] uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-xs uppercase tracking-widest font-mono text-[#8E8A80]">Loading Atelier Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
