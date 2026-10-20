"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1A1A18] text-[#FCFBF8] border-t border-[#2A2926] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2C2A26]">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] font-normal uppercase block">
              VÉNDÔME
            </span>
            <p className="text-xs tracking-[0.2em] uppercase text-[#B5A38A] font-light">
              Atelier Contemporain • Paris & New York
            </p>
            <p className="text-xs sm:text-sm text-[#A8A49B] font-light leading-relaxed max-w-md pt-2">
              Synthesizing understated architectural tailoring with relaxed contemporary streetwear. 
              Engineered with heritage virgin wools, organic heavyweight cottons, and artisanal European craftsmanship.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold tracking-widest-editorial uppercase text-[#FCFBF8] mb-2">
                Join The Private Ledger
              </h3>
              <p className="text-xs text-[#A8A49B] font-light max-w-lg mb-6 leading-relaxed">
                Receive confidential notifications regarding seasonal capsule drops, private salon appointments, and archival reproductions. Never marketing spam.
              </p>
            </div>

            {isSubscribed ? (
              <div className="bg-[#242421] border border-[#747C69] p-4 flex items-center space-x-3 text-xs tracking-wider uppercase text-[#B5A38A]">
                <CheckCircle2 className="w-4 h-4 text-[#747C69] flex-shrink-0" />
                <span>You have been registered to receive private archive release invitations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  required
                  className="bg-[#242421] border border-[#3E3C36] px-4 py-3 text-xs text-[#FCFBF8] placeholder-[#78746B] tracking-wider focus:outline-none focus:border-[#B5A38A] transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#FCFBF8] text-[#1A1A18] hover:bg-[#B5A38A] hover:text-[#1A1A18] px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#2C2A26] text-xs">
          
          {/* Column 1: Collections */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#B5A38A] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A49B]">
              <li>
                <Link href="/shop?collection=archive-04" className="hover:text-white transition-colors">
                  Archive 04: Silk & Concrete
                </Link>
              </li>
              <li>
                <Link href="/shop?category=outerwear" className="hover:text-white transition-colors">
                  The Monolith Overcoats
                </Link>
              </li>
              <li>
                <Link href="/shop?category=knitwear" className="hover:text-white transition-colors">
                  Mongolian Royal Cashmere
                </Link>
              </li>
              <li>
                <Link href="/shop?category=streetwear" className="hover:text-white transition-colors">
                  Okayama Selvedge Denim
                </Link>
              </li>
              <li>
                <Link href="/shop?category=footwear" className="hover:text-white transition-colors">
                  Goodyear-Welted Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Concierge */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#B5A38A] mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A49B]">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Worldwide Shipping & Duties
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Complimentary 30-Day Returns
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Archival Garment Care & Repair
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Bespoke Sizing Consultations
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Track Consignment
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Houses */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#B5A38A] mb-4">
              Salons & Boutiques
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A49B]">
              <li>
                <p className="text-white font-normal">Paris — 1er Arrondissement</p>
                <p className="text-[11px] text-[#736E64]">28 Rue Saint-Honoré</p>
              </li>
              <li className="pt-1">
                <p className="text-white font-normal">New York — Soho</p>
                <p className="text-[11px] text-[#736E64]">74 Mercer Street</p>
              </li>
              <li className="pt-1">
                <p className="text-white font-normal">Tokyo — Minami-Aoyama</p>
                <p className="text-[11px] text-[#736E64]">5-7-22 Minato-ku</p>
              </li>
            </ul>
          </div>

          {/* Column 4: Governance */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#B5A38A] mb-4">
              House Standards
            </h4>
            <ul className="space-y-2.5 font-light text-[#A8A49B]">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Traceable Fiber Manifesto
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Fair Artisan Living Wage
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Terms of Private Sale
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Privacy & Data Safeguards
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Certificate of Authenticity
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#78746B] space-y-4 md:space-y-0">
          <p className="font-light tracking-wider">
            © 2026 VÉNDÔME ATELIER S.A. ALL RIGHTS RESERVED. 
          </p>
          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <span>CURRENCY: USD ($)</span>
            <span>•</span>
            <span>ENGLISH (INTERNATIONAL)</span>
            <span>•</span>
            <span className="text-[#A8A49B]">FRONTEND PROTOTYPE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
