"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS, COLLECTIONS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Scissors,
  Check
} from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedArrivalCategory, setSelectedArrivalCategory] = useState("all");

  // Filter new arrivals
  const arrivalProducts = PRODUCTS.filter((p) => {
    if (selectedArrivalCategory === "all") return true;
    return p.category === selectedArrivalCategory;
  }).slice(0, 8);

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  // Spotlight featured product
  const spotlightProduct = PRODUCTS.find((p) => p.id === "prod-01") || PRODUCTS[0];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO CAMPAIGN SECTION */}
      <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-end justify-start bg-[#141412] text-[#FCFBF8] overflow-hidden">
        {/* Background Editorial Campaign Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=88"
            alt="VÉNDÔME Autumn/Winter 2026 Campaign"
            className="w-full h-full object-cover object-[center_35%] opacity-85 scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Subtle gradient vignette to guarantee maximum text legibility without muddying the photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-black/35 to-black/20" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Seasonal Tag */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-black/40 backdrop-blur-md border border-[#E8E3D9]/20 text-[10px] tracking-widest uppercase font-mono text-[#E5DFD3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5A38A]"></span>
              <span>Autumn / Winter 2026 Archive</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.06em] uppercase text-[#FCFBF8] leading-[1.05]">
                Silk &<br />Concrete.
              </h1>
              <p className="text-sm sm:text-base text-[#D4CEC2] font-light tracking-wide max-w-lg leading-relaxed pt-1">
                Rigid structural tailoring juxtaposed against fluid natural silks and washed heavyweight twills. A study in contemporary permanence.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <Link
                href="/shop?collection=archive-04"
                className="bg-[#FCFBF8] text-[#1A1A18] hover:bg-[#B5A38A] hover:text-[#1A1A18] px-8 py-4 text-xs font-semibold tracking-widest-editorial uppercase transition-all flex items-center justify-center space-x-3 shadow-lg"
              >
                <span>Explore Archive 04</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop"
                className="bg-black/40 hover:bg-black/60 text-[#FCFBF8] border border-[#E8E3D9]/30 backdrop-blur-xs px-8 py-4 text-xs font-semibold tracking-widest-editorial uppercase transition-all flex items-center justify-center space-x-2 text-center"
              >
                <span>Discover All Pieces</span>
              </Link>
            </div>

            {/* Key Notes */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 text-[11px] font-mono text-[#C4BDAF]">
              <div>
                <p className="text-white font-medium">BIELLA & OKAYAMA</p>
                <p className="text-[#8E8A80] text-[10px] uppercase">Heritage Mills</p>
              </div>
              <div>
                <p className="text-white font-medium">100% CANVASSED</p>
                <p className="text-[#8E8A80] text-[10px] uppercase">Tailored Rigor</p>
              </div>
              <div>
                <p className="text-white font-medium">LIMITED RUNS</p>
                <p className="text-[#8E8A80] text-[10px] uppercase">Numbered Edits</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. EDITORIAL CATEGORY MERCHANDISING (Asymmetrical Layout) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
              Atelier Categorization
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-wider text-[#1A1A18] mt-1">
              Curated Silhouettes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#736E64] font-light max-w-md mt-3 md:mt-0 leading-relaxed">
            Every category is forged around distinct structural parameters—from 820 GSM heavy English wools to 14.5oz shuttle-loomed Japanese selvedge.
          </p>
        </div>

        {/* Asymmetrical Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Outerwear (Hero 7 cols) */}
          <Link
            href="/shop?category=outerwear"
            className="md:col-span-7 group relative aspect-[4/5] sm:aspect-[16/11] bg-[#EDE8DE] overflow-hidden flex flex-col justify-end p-6 sm:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=85"
              alt="Outerwear and Overcoats"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="relative z-10 text-[#FCFBF8] space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A]">
                4 Cuts • Heavy Melton Wools
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl uppercase tracking-wide">
                Outerwear & Overcoats
              </h3>
              <p className="text-xs text-[#D8D3C8] font-light max-w-sm line-clamp-2">
                Substantial drape and weather-resistant canvas designed for authoritative silhouettes.
              </p>
              <div className="pt-2 flex items-center text-xs tracking-wider uppercase font-medium text-white group-hover:text-[#B5A38A] transition-colors">
                <span>Explore Coats</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 2 & 3: Stacked Right (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            
            {/* Card 2: Tailoring */}
            <Link
              href="/shop?category=tailoring"
              className="group relative aspect-[4/3] bg-[#EDE8DE] overflow-hidden flex flex-col justify-end p-6"
            >
              <img
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=85"
                alt="Tailoring & Slacks"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative z-10 text-[#FCFBF8]">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A]">
                  Worsted Flannels & Pleats
                </span>
                <h3 className="font-serif text-xl uppercase tracking-wide">
                  Tailoring & Slacks
                </h3>
                <div className="pt-1 flex items-center text-xs tracking-wider uppercase font-medium text-white group-hover:text-[#B5A38A] transition-colors">
                  <span>View Tailoring</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 3: Knitwear */}
            <Link
              href="/shop?category=knitwear"
              className="group relative aspect-[4/3] bg-[#EDE8DE] overflow-hidden flex flex-col justify-end p-6"
            >
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85"
                alt="Mongolian Cashmere & Royal Alpaca"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative z-10 text-[#FCFBF8]">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A]">
                  Grade-A Mongolian Cashmere
                </span>
                <h3 className="font-serif text-xl uppercase tracking-wide">
                  Cashmere & Knits
                </h3>
                <div className="pt-1 flex items-center text-xs tracking-wider uppercase font-medium text-white group-hover:text-[#B5A38A] transition-colors">
                  <span>View Knitwear</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>

          {/* Card 4 & 5: Lower Dual Wide Split */}
          <Link
            href="/shop?category=streetwear"
            className="md:col-span-6 group relative aspect-[16/10] bg-[#EDE8DE] overflow-hidden flex flex-col justify-end p-6 sm:p-8"
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
              alt="Heavyweight Raw Cotton & Streetwear"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="relative z-10 text-[#FCFBF8]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A]">
                340-480 GSM Cotton Jersey
              </span>
              <h3 className="font-serif text-2xl uppercase tracking-wide">
                Raw Cotton & Streetwear
              </h3>
              <p className="text-xs text-[#D8D3C8] font-light max-w-xs mt-1">
                Boxy drops, loopback fleeces, and unrefined Okayama raw selvedge.
              </p>
            </div>
          </Link>

          <Link
            href="/shop?category=footwear"
            className="md:col-span-6 group relative aspect-[16/10] bg-[#EDE8DE] overflow-hidden flex flex-col justify-end p-6 sm:p-8"
          >
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
              alt="Goodyear-Welted Footwear and Accessories"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="relative z-10 text-[#FCFBF8]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A]">
                Goodyear-Welted • Portuguese Calfskin
              </span>
              <h3 className="font-serif text-2xl uppercase tracking-wide">
                Footwear & Leather Goods
              </h3>
              <p className="text-xs text-[#D8D3C8] font-light max-w-xs mt-1">
                Chunky Vibram commando tread and vegetable-tanned accessories.
              </p>
            </div>
          </Link>

        </div>
      </section>


      {/* 3. NEW ARRIVALS INTERACTIVE PRODUCT GRID */}
      <section className="py-16 sm:py-24 bg-[#F5F2EC] border-y border-[#E8E3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Category Filter Buttons */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E0D9CB] mb-10 gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
                Seasonal Capsule Drop
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-wider text-[#1A1A18] mt-1">
                New Arrivals
              </h2>
            </div>

            {/* In-page Category Filter Buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              {[
                { id: "all", label: "All Items" },
                { id: "outerwear", label: "Coats" },
                { id: "tailoring", label: "Tailoring" },
                { id: "knitwear", label: "Knits" },
                { id: "streetwear", label: "Raw Street" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedArrivalCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-colors ${
                    selectedArrivalCategory === tab.id
                      ? "bg-[#1A1A18] text-[#FCFBF8]"
                      : "bg-[#EDE8DE] text-[#545149] hover:bg-[#E2DDD2]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {arrivalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Section Footer Link */}
          <div className="mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322E] px-8 py-3.5 text-xs font-semibold tracking-widest-editorial uppercase transition-all shadow-sm"
            >
              <span>Explore The Full Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* 4. EDITORIAL SPOTLIGHT: SIGNATURE PIECE FEATURE */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A18] text-[#FCFBF8] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Frame (7 cols) */}
            <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[620px] bg-[#242421]">
              <img
                src={spotlightProduct.primaryImage}
                alt={spotlightProduct.name}
                className="w-full h-full object-cover object-[center_25%]"
              />
              <div className="absolute top-6 left-6 bg-[#FCFBF8] text-[#1A1A18] px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase font-semibold">
                MASTERWORK PIECE № 01
              </div>
            </div>

            {/* Editorial Narrative & Direct Purchase (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A]">
                  Canvassed Virgin Melton Wool (820 GSM)
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal uppercase tracking-wide leading-tight">
                  {spotlightProduct.name}
                </h3>
                <p className="text-xl font-mono text-[#B5A38A] font-medium pt-1">
                  ${spotlightProduct.price} USD
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#A8A49B] font-light leading-relaxed">
                Hand-cut in our Northern Italian atelier with an imposing dropped shoulder line and an extended floor-grazing hem. Full floating chest canvas delivers an organic sculpt that softens to the wearer's posture with age.
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2.5 pt-2 text-xs text-[#D8D3C8] font-light">
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B5A38A]" />
                  <span>Woven exclusively from Yorkshire unblended fleece</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B5A38A]" />
                  <span>Custom cast solid horn button closures</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B5A38A]" />
                  <span>Hidden interior archival passport pocket in Bemberg cupro</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(spotlightProduct, spotlightProduct.sizes[1], spotlightProduct.colors[0]?.name, 1)}
                  className="bg-[#FCFBF8] text-[#1A1A18] hover:bg-[#B5A38A] py-3.5 px-6 text-xs font-semibold tracking-widest uppercase transition-colors text-center"
                >
                  Add To Bag Directly
                </button>
                <Link
                  href={`/products/${spotlightProduct.slug || spotlightProduct.id}`}
                  className="border border-[#4A4740] hover:border-[#FCFBF8] text-[#FCFBF8] py-3.5 px-6 text-xs font-semibold tracking-widest uppercase transition-colors text-center"
                >
                  Inspect Specifications
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 5. BESTSELLERS CURATION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E3D9] mb-10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
              Permanent House Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-wider text-[#1A1A18] mt-1">
              Archival Bestsellers
            </h2>
          </div>
          <Link
            href="/shop?sort=bestselling"
            className="text-xs font-medium tracking-wider uppercase text-[#1A1A18] hover:underline hidden sm:flex items-center"
          >
            <span>View All Bestsellers</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      {/* 6. BRAND MANIFESTO & ARTISAN HERITAGE */}
      <section className="py-20 sm:py-28 bg-[#EDE8DE] border-t border-[#D9D3C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Atelier Photography */}
            <div className="lg:col-span-5 relative aspect-[4/5] bg-[#D8D2C5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
                alt="VÉNDÔME Atelier Craftsmanship"
                className="w-full h-full object-cover filter grayscale contrast-110"
              />
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-xs text-[#FCFBF8] px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase">
                ATELIER CUTTING TABLE • BIELLA, ITALY
              </div>
            </div>

            {/* Manifesto Content */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E64] block">
                House Manifesto
              </span>
              
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal uppercase tracking-wide text-[#1A1A18] leading-tight">
                "We do not design for temporary seasonal trend cycles. We construct timeless architectural garments for lifetimes of wear."
              </blockquote>

              <p className="text-xs sm:text-sm text-[#57554F] font-light leading-relaxed max-w-xl">
                Founded on the premise that modern streetwear and classical tailoring should never exist in separate wardrobes. 
                By pairing untreated raw selvedge denims and heavyweight loopback cottons with floating-canvas English melton wools, 
                we create garments that express quiet power and unapologetic ease.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#D9D3C7]">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                    01. Natural Fibers
                  </h4>
                  <p className="text-[11px] text-[#63615A] font-light leading-relaxed">
                    Zero synthetic blends in our wools and cashmeres. Completely biodegradable raw staples.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                    02. Canvassed Rigor
                  </h4>
                  <p className="text-[11px] text-[#63615A] font-light leading-relaxed">
                    Floating horsehair canvas replaces modern chemical adhesives for organic mold and drape.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                    03. House Ledger
                  </h4>
                  <p className="text-[11px] text-[#63615A] font-light leading-relaxed">
                    Every garment is cataloged with mill origin, artisan batch number, and repair guarantee.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 7. CLIENT CONCIERGE PERKS BAR */}
      <section className="py-12 bg-[#FCFBF8] border-b border-[#E8E3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
              <Truck className="w-5 h-5 text-[#B5A38A] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                  Global Express
                </h4>
                <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                  Complimentary on all orders over $250
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
              <RotateCcw className="w-5 h-5 text-[#B5A38A] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                  30-Day Returns
                </h4>
                <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                  Complimentary courier pickup service
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
              <Scissors className="w-5 h-5 text-[#B5A38A] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                  Bespoke Sizing
                </h4>
                <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                  Virtual atelier fit consultations
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-[#B5A38A] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">
                  Authenticity Verified
                </h4>
                <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                  Numbered archive passport certificate
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
