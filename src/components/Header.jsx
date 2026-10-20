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
import Logo from "@/components/Logo";

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
    "COMPLIMENTARY EXPRESS DELIVERY ACROSS INDIA ON ORDERS OVER ₹1,999",
    "ARCHIVE 04: SILK & CONCRETE — AUTUMN / WINTER 2026 NOW RELEASED",
    "PRIVATE ATELIER CONSULTATIONS AVAILABLE IN MUMBAI & JAIPUR"
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
        <div className="fixed top-4 right-4 z-50 bg-[#171716] text-[#F8F6F1] px-5 py-3.5 shadow-2xl border border-[#DDD8CF]/25 flex items-center space-x-3 text-xs tracking-wider uppercase transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#C9342D] animate-pulse"></span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-[#171716] text-[#F8F6F1] py-2 px-4 text-[10px] md:text-[11px] font-medium tracking-widest-editorial text-center uppercase border-b border-[#252524] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-block text-[#9E988D]">MUMBAI • JAIPUR</span>
          <p className="flex-1 text-center font-light tracking-widest">
            {announcements[announcementIndex]}
          </p>
          <div className="hidden md:flex items-center space-x-4 text-[#9E988D]">
            <span className="cursor-pointer hover:text-white transition-colors flex items-center space-x-1">
              <Globe className="w-3 h-3 inline mr-1 text-[#C9342D]" /> ₹ INR
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
            ? "bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#DDD8CF] shadow-xs" 
            : "bg-[#F8F6F1] border-b border-[#DDD8CF]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. Left: Brand Identity (Logo Mark + Name Horizontal) & Mobile Toggle */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 -ml-1.5 text-[#171716] hover:text-[#C9342D] transition-colors lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo horizontal lockup */}
              <Logo variant="horizontal" size="md" />
            </div>

            {/* 2. Middle: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[12px] font-medium tracking-wider-editorial uppercase text-[#171716] px-4">
              <Link 
                href="/shop" 
                className={`link-underline transition-colors ${
                  pathname === "/shop" ? "font-semibold text-[#171716] after:!w-full" : "text-[#777168] hover:text-[#171716]"
                }`}
              >
                Collection
              </Link>
              <Link 
                href="/shop?gender=men" 
                className="link-underline text-[#777168] hover:text-[#171716] transition-colors"
              >
                Men
              </Link>
              <Link 
                href="/shop?gender=women" 
                className="link-underline text-[#777168] hover:text-[#171716] transition-colors"
              >
                Women
              </Link>
              <Link 
                href="/shop?category=outerwear" 
                className="link-underline text-[#777168] hover:text-[#171716] transition-colors"
              >
                Outerwear
              </Link>
              <Link 
                href="/shop?filter=new" 
                className="link-underline text-[#C9342D] font-medium hover:text-[#A82721] transition-colors"
              >
                New Arrivals
              </Link>
            </nav>

            {/* 3. Right: Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5 flex-shrink-0">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-[#171716] hover:text-[#C9342D] transition-colors flex items-center space-x-1.5"
                aria-label="Search collection"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xl:inline text-[11px] tracking-wider uppercase font-medium">Search</span>
              </button>

              <div className="hidden sm:block h-3.5 w-px bg-[#DDD8CF]" />

              {/* Wishlist Link */}
              <Link
                href="/shop?view=wishlist"
                className="p-1.5 text-[#171716] hover:text-[#C9342D] transition-colors relative"
                aria-label="View saved archive pieces"
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9342D] text-white text-[9px] flex items-center justify-center rounded-full font-mono font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-[#171716] hover:text-[#C9342D] transition-colors relative flex items-center space-x-2"
                aria-label="Open shopping bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#171716] text-[#F8F6F1] text-[9px] min-w-[17px] h-[17px] px-1 flex items-center justify-center font-mono font-medium">
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
          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#F8F6F1] h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-5 border-b border-[#DDD8CF]">
              <Logo variant="horizontal" size="sm" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#171716] hover:text-[#C9342D] transition-colors"
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
                className="w-full flex items-center justify-between py-2.5 px-3.5 bg-[#F0ECE4] border border-[#DDD8CF] text-xs text-[#777168] uppercase tracking-wider hover:border-[#171716] transition-colors"
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
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#171716] hover:text-[#C9342D] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>Full Collection</span>
                <ChevronRight className="w-4 h-4 text-[#777168]" />
              </Link>
              <Link 
                href="/shop?gender=men"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#171716] hover:text-[#C9342D] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>Men's Atelier</span>
                <ChevronRight className="w-4 h-4 text-[#777168]" />
              </Link>
              <Link 
                href="/shop?gender=women"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#171716] hover:text-[#C9342D] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>Women's Atelier</span>
                <ChevronRight className="w-4 h-4 text-[#777168]" />
              </Link>
              <Link 
                href="/shop?category=outerwear"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#171716] hover:text-[#C9342D] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>Outerwear & Coats</span>
                <ChevronRight className="w-4 h-4 text-[#777168]" />
              </Link>
              <Link 
                href="/shop?category=tailoring"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#171716] hover:text-[#C9342D] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>Tailoring & Slacks</span>
                <ChevronRight className="w-4 h-4 text-[#777168]" />
              </Link>
              <Link 
                href="/shop?category=knitwear"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#171716] hover:text-[#C9342D] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>Cashmere & Knits</span>
                <ChevronRight className="w-4 h-4 text-[#777168]" />
              </Link>
              <Link 
                href="/shop?filter=new"
                className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-[#C9342D] hover:text-[#A82721] transition-colors border-b border-[#DDD8CF]/50"
              >
                <span>New Arrivals (Archive 04)</span>
                <ChevronRight className="w-4 h-4 text-[#C9342D]" />
              </Link>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-[#DDD8CF] text-xs text-[#777168] space-y-3">
              <p className="tracking-wider uppercase text-[11px] font-semibold text-[#171716]">
                Atelier Locations
              </p>
              <p className="text-[11px] font-light">
                Waterfield Road, Mumbai • C-Scheme, Jaipur
              </p>
              <div className="flex items-center space-x-4 pt-2 text-[11px]">
                <span className="text-[#171716] font-medium">Currency: ₹ INR</span>
                <span>•</span>
                <span>Pan-India Express</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
