"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight,
  Globe
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsSearchOpen, 
    wishlist,
    notification
  } = useCart();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON ORDERS OVER $250",
    "ARCHIVE 04: SILK & CONCRETE — AUTUMN / WINTER 2026 NOW RELEASED",
    "PRIVATE ATELIER CONSULTATIONS AVAILABLE IN PARIS & NEW YORK"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-[#1A1A18] text-[#FCFBF8] px-5 py-3.5 shadow-2xl border border-[#3E3C36] flex items-center space-x-3 text-xs tracking-wider uppercase transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#B5A38A] animate-pulse"></span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-[#1A1A18] text-[#FCFBF8] py-2 px-4 text-[10px] md:text-[11px] font-medium tracking-widest-editorial text-center uppercase border-b border-[#2C2A26] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-block text-[#8E8A80]">PARIS • NEW YORK • TOKYO</span>
          <p className="flex-1 text-center font-light tracking-widest">
            {announcements[announcementIndex]}
          </p>
          <div className="hidden md:flex items-center space-x-4 text-[#8E8A80]">
            <span className="cursor-pointer hover:text-white transition-colors flex items-center space-x-1">
              <Globe className="w-3 h-3 inline mr-1" /> USD ($)
            </span>
            <Link href="/shop" className="hover:text-white transition-colors">
              THE LEDGER
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-[#FCFBF8]/95 backdrop-blur-md border-b border-[#E8E3D9] shadow-xs" 
            : "bg-[#FCFBF8] border-b border-[#E8E3D9]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-[12px] font-medium tracking-wider-editorial uppercase text-[#1A1A18]">
              <Link 
                href="/shop" 
                className={`link-underline transition-colors ${
                  pathname === "/shop" ? "font-semibold text-black" : "text-[#3A3833] hover:text-black"
                }`}
              >
                Collection
              </Link>
              <Link 
                href="/shop?gender=men" 
                className="link-underline text-[#3A3833] hover:text-black transition-colors"
              >
                Men
              </Link>
              <Link 
                href="/shop?gender=women" 
                className="link-underline text-[#3A3833] hover:text-black transition-colors"
              >
                Women
              </Link>
              <Link 
                href="/shop?category=outerwear" 
                className="link-underline text-[#3A3833] hover:text-black transition-colors"
              >
                Outerwear
              </Link>
              <Link 
                href="/shop?filter=new" 
                className="link-underline text-[#8A353D] font-medium hover:text-[#5e2026] transition-colors"
              >
                New Arrivals
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-[#1A1A18] hover:opacity-70 transition-opacity"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Brand Wordmark */}
            <div className="flex-1 lg:flex-none text-center">
              <Link href="/" className="inline-block group py-1">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] font-normal text-[#1A1A18] uppercase group-hover:opacity-85 transition-opacity">
                  VÉNDÔME
                </span>
                <span className="block text-[8px] sm:text-[9px] tracking-[0.38em] uppercase text-[#736E64] font-sans font-light -mt-0.5">
                  Atelier Contemporain
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-[#1A1A18] hover:text-[#736E64] transition-colors flex items-center space-x-1.5"
                aria-label="Search collection"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xl:inline text-[11px] tracking-wider uppercase font-medium">Search</span>
              </button>

              {/* Wishlist Link */}
              <Link
                href="/shop?view=wishlist"
                className="p-1.5 text-[#1A1A18] hover:text-[#736E64] transition-colors relative"
                aria-label="View saved archive pieces"
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#747C69] text-white text-[9px] flex items-center justify-center rounded-full font-mono font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-[#1A1A18] hover:text-[#736E64] transition-colors relative flex items-center space-x-2"
                aria-label="Open shopping bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#1A1A18] text-[#FCFBF8] text-[9px] min-w-[17px] h-[17px] px-1 flex items-center justify-center font-mono font-medium">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-[11px] tracking-wider uppercase font-medium">
                  Bag ({cartCount})
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FCFBF8] h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8E3D9]">
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-normal uppercase">VÉNDÔME</span>
                <span className="block text-[8px] tracking-[0.3em] uppercase text-[#736E64]">Menu</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#1A1A18] hover:text-black"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-6 mb-4">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between py-2.5 px-3.5 bg-[#F5F2EC] border border-[#E8E3D9] text-xs text-[#736E64] uppercase tracking-wider"
              >
                <span className="flex items-center">
                  <Search className="w-3.5 h-3.5 mr-2" /> Search archive...
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 space-y-1">
              <Link 
                href="/shop"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#1A1A18] border-b border-[#EFECE4]"
              >
                <span>Full Collection</span>
                <ChevronRight className="w-4 h-4 text-[#8E8A80]" />
              </Link>
              <Link 
                href="/shop?gender=men"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#1A1A18] border-b border-[#EFECE4]"
              >
                <span>Men's Atelier</span>
                <ChevronRight className="w-4 h-4 text-[#8E8A80]" />
              </Link>
              <Link 
                href="/shop?gender=women"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#1A1A18] border-b border-[#EFECE4]"
              >
                <span>Women's Atelier</span>
                <ChevronRight className="w-4 h-4 text-[#8E8A80]" />
              </Link>
              <Link 
                href="/shop?category=outerwear"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#1A1A18] border-b border-[#EFECE4]"
              >
                <span>Outerwear & Coats</span>
                <ChevronRight className="w-4 h-4 text-[#8E8A80]" />
              </Link>
              <Link 
                href="/shop?category=tailoring"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#1A1A18] border-b border-[#EFECE4]"
              >
                <span>Tailoring & Slacks</span>
                <ChevronRight className="w-4 h-4 text-[#8E8A80]" />
              </Link>
              <Link 
                href="/shop?category=knitwear"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#1A1A18] border-b border-[#EFECE4]"
              >
                <span>Cashmere & Knits</span>
                <ChevronRight className="w-4 h-4 text-[#8E8A80]" />
              </Link>
              <Link 
                href="/shop?filter=new"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#8A353D] border-b border-[#EFECE4]"
              >
                <span>New Arrivals (Archive 04)</span>
                <ChevronRight className="w-4 h-4 text-[#8A353D]" />
              </Link>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-[#E8E3D9] text-xs text-[#736E64] space-y-3">
              <p className="tracking-wider uppercase text-[11px] font-semibold text-[#1A1A18]">
                Atelier Locations
              </p>
              <p className="text-[11px] font-light">
                Rue Saint-Honoré, Paris • Mercer St, Soho, NY
              </p>
              <div className="flex items-center space-x-4 pt-2 text-[11px]">
                <span className="text-[#1A1A18] font-medium">Currency: USD ($)</span>
                <span>•</span>
                <span>Global Express</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
