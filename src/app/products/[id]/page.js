"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SizeGuideModal from "@/components/SizeGuideModal";
import { useCart } from "@/context/CartContext";
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Star, 
  Minus, 
  Plus, 
  ChevronRight, 
  Check, 
  Sparkles,
  Info
} from "lucide-react";
import { formatPrice } from "@/utils/currency";

function ProductDetailContent({ params }) {
  // Unwrap Next.js dynamic params with React.use()
  const resolvedParams = use(params);
  const identifier = resolvedParams.id;

  const product = PRODUCTS.find(
    (p) => p.slug === identifier || p.id === identifier
  );

  if (!product) {
    notFound();
  }

  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const isSaved = isInWishlist(product.id);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery 
    : [product.primaryImage, product.hoverImage].filter(Boolean);

  // Configuration state
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // "description", "composition", "fit", "shipping"
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor, quantity);
    setTimeout(() => setIsAdding(false), 600);
  };

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#8E8A80] mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <Link href="/shop" className="hover:text-black transition-colors">Collection</Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-black transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <span className="text-[#1A1A18] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Grid: Gallery (Left 7 cols) & Details (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Gallery Frame */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Display Frame */}
          <div className="relative aspect-[3/4] bg-[#EDE8DE] overflow-hidden group">
            <img
              src={galleryImages[activeImageIndex] || product.primaryImage}
              alt={`${product.name} editorial view`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
            />
            
            {/* Tag Badge */}
            {product.tag && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#1A1A18]/90 text-[#FCFBF8] text-[10px] font-medium tracking-widest uppercase px-3 py-1">
                  {product.tag}
                </span>
              </div>
            )}

            {/* Wishlist Floating Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isSaved 
                  ? "bg-[#1A1A18] text-[#FCFBF8]" 
                  : "bg-white/85 hover:bg-white text-[#1A1A18] backdrop-blur-xs"
              }`}
              aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] bg-[#EDE8DE] overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx 
                      ? "border-[#1A1A18] opacity-100" 
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* House Guarantee micro-banner */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E8E3D9] text-[11px] text-[#736E64] font-light text-center">
            <div className="p-2 bg-[#F5F2EC] flex flex-col items-center justify-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#747C69]" />
              <span className="uppercase tracking-wider font-mono text-[9px] text-[#1A1A18]">
                Bespoke Canvassing
              </span>
            </div>
            <div className="p-2 bg-[#F5F2EC] flex flex-col items-center justify-center space-y-1">
              <Truck className="w-4 h-4 text-[#747C69]" />
              <span className="uppercase tracking-wider font-mono text-[9px] text-[#1A1A18]">
                Express Courier
              </span>
            </div>
            <div className="p-2 bg-[#F5F2EC] flex flex-col items-center justify-center space-y-1">
              <RotateCcw className="w-4 h-4 text-[#747C69]" />
              <span className="uppercase tracking-wider font-mono text-[9px] text-[#1A1A18]">
                30-Day Returns
              </span>
            </div>
          </div>

        </div>

        {/* Right: Product Merchandising & Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header */}
          <div className="space-y-2 border-b border-[#E8E3D9] pb-6">
            <div className="flex items-center justify-between text-xs text-[#736E64]">
              <span className="font-mono uppercase tracking-widest text-[10px]">
                {product.gender || "UNISEX"} • {product.category}
              </span>
              <div className="flex items-center space-x-1 text-[11px]">
                <Star className="w-3.5 h-3.5 text-[#B5A38A] fill-current" />
                <span className="font-semibold text-[#1A1A18]">{product.rating}</span>
                <span className="text-[#8E8A80]">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-wide text-[#1A1A18] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#736E64] font-light">
              {product.subtitle}
            </p>

            <div className="pt-2 flex items-baseline space-x-3">
              <span className="font-mono text-2xl font-semibold text-[#1A1A18]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-base text-[#8E8A80] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[10px] tracking-wider uppercase text-[#67705B] font-mono ml-auto">
                GST & Taxes Included
              </span>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider font-semibold text-[#1A1A18]">
                  Color:
                </span>
                <span className="text-[#736E64] font-mono text-[11px]">{selectedColor}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative p-0.5 rounded-full border-2 transition-all ${
                      selectedColor === c.name ? "border-[#1A1A18]" : "border-transparent"
                    }`}
                    title={c.name}
                    aria-label={`Select color ${c.name}`}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider font-semibold text-[#1A1A18]">
                Select Size:
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[11px] uppercase tracking-wider text-[#736E64] hover:text-[#1A1A18] flex items-center space-x-1 underline transition-colors"
              >
                <Ruler className="w-3 h-3 mr-1 text-[#B5A38A]" />
                <span>Size Guide & Measurements</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 text-xs font-mono uppercase text-center border transition-all ${
                    selectedSize === size
                      ? "bg-[#1A1A18] text-[#FCFBF8] border-[#1A1A18] font-semibold"
                      : "bg-[#F5F2EC] text-[#4A4740] border-[#E2DDD2] hover:bg-[#EAE4D7]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Stock Level Note */}
            <div className="pt-1 flex items-center space-x-2 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#747C69] animate-pulse" />
              <span className="text-[#545149]">
                {product.stock <= 4 
                  ? `Archive Alert: Only ${product.stock} pieces remain in this cut` 
                  : "Ready for courier dispatch from our European atelier"}
              </span>
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex space-x-3">
              
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#DCD5C9] bg-[#F5F2EC]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-[#1A1A18] hover:bg-[#EAE4D7] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-mono font-medium text-[#1A1A18]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-3 text-[#1A1A18] hover:bg-[#EAE4D7] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add To Bag Primary CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322D] py-3.5 px-6 text-xs font-semibold tracking-widest-editorial uppercase transition-all flex items-center justify-center space-x-2 shadow-md active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdding ? "Adding To Bag..." : `Add To Bag • ${formatPrice(product.price * quantity)}`}</span>
              </button>

            </div>

            {/* Secondary Wishlist Action */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="w-full py-2.5 border border-[#DCD5C9] hover:border-[#1A1A18] bg-transparent text-xs uppercase tracking-wider font-medium text-[#1A1A18] transition-colors flex items-center justify-center space-x-2"
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current text-[#8A353D]" : ""}`} />
              <span>{isSaved ? "Saved In Personal Archive" : "Save To Private Wishlist"}</span>
            </button>
          </div>

          {/* Deep Information Tabs */}
          <div className="border-t border-[#E8E3D9] pt-6 space-y-4">
            {/* Tab Headers */}
            <div className="flex border-b border-[#EDE8DE] text-xs font-medium uppercase tracking-wider overflow-x-auto">
              {[
                { id: "description", label: "Overview" },
                { id: "composition", label: "Textile & Care" },
                { id: "fit", label: "Fit Protocol" },
                { id: "shipping", label: "Delivery" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2.5 px-3 whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? "border-[#1A1A18] text-[#1A1A18] font-semibold"
                      : "border-transparent text-[#78746B] hover:text-[#1A1A18]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="text-xs text-[#524F48] leading-relaxed font-light min-h-[90px]">
              {activeTab === "description" && (
                <div className="space-y-2">
                  <p>{product.description}</p>
                  <p className="pt-1 text-[#1A1A18] font-medium">
                    Finished with hand-set horn buttons and continuous interior Bemberg cupro piping.
                  </p>
                </div>
              )}

              {activeTab === "composition" && (
                <div className="space-y-2">
                  <p><strong className="text-[#1A1A18] font-medium">Composition:</strong> {product.composition}</p>
                  <p><strong className="text-[#1A1A18] font-medium">Care Protocol:</strong> {product.care}</p>
                </div>
              )}

              {activeTab === "fit" && (
                <div className="space-y-2">
                  <p><strong className="text-[#1A1A18] font-medium">Fit Assessment:</strong> {product.fitNotes}</p>
                  <p>Our tailoring masters recommend ordering true to size for intended sculptural drape, or down one size for a formal silhouette.</p>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2">
                  <p><strong className="text-[#1A1A18] font-medium">Express Shipping:</strong> Complimentary express courier delivery across India on orders exceeding ₹1,999. Delivered in archival garment dust bags.</p>
                  <p><strong className="text-[#1A1A18] font-medium">Returns:</strong> 30-day doorstep courier collection with full refund or bespoke size exchange.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-14 border-t border-[#E8E3D9]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
                Atelier Pairing
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-[#1A1A18] mt-0.5">
                Complete The Silhouette
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-wider font-medium text-[#1A1A18] hover:underline"
            >
              Explore Full Catalog
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

    </div>
  );
}

export default function ProductDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-xs uppercase tracking-widest font-mono text-[#8E8A80]">Loading Garment Details...</div>}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
