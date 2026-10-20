"use client";

import React, { useState, useEffect } from "react";
import { X, Ruler, Check } from "lucide-react";

export default function SizeGuideModal({ isOpen, onClose, category = "outerwear" }) {
  const [unit, setUnit] = useState("in"); // "in" or "cm"
  const [activeTab, setActiveTab] = useState("tops"); // "tops" or "bottoms" or "shoes"

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const topsData = [
    { size: "36 (XS)", eu: "44", chestIn: "34 - 36", chestCm: "86 - 91", shoulderIn: "17.5", shoulderCm: "44.5", sleeveIn: "33.0", sleeveCm: "84" },
    { size: "38 (S)", eu: "46", chestIn: "36 - 38", chestCm: "91 - 96", shoulderIn: "18.0", shoulderCm: "45.7", sleeveIn: "33.5", sleeveCm: "85" },
    { size: "40 (M)", eu: "48", chestIn: "38 - 40", chestCm: "96 - 101", shoulderIn: "18.5", shoulderCm: "47.0", sleeveIn: "34.0", sleeveCm: "86.5" },
    { size: "42 (L)", eu: "50", chestIn: "40 - 42", chestCm: "101 - 106", shoulderIn: "19.0", shoulderCm: "48.2", sleeveIn: "34.5", sleeveCm: "87.5" },
    { size: "44 (XL)", eu: "52", chestIn: "42 - 45", chestCm: "106 - 114", shoulderIn: "19.7", shoulderCm: "50.0", sleeveIn: "35.2", sleeveCm: "89.5" },
  ];

  const bottomsData = [
    { waist: "28", eu: "44", waistIn: "28 - 29", waistCm: "71 - 74", hipIn: "36 - 37", hipCm: "91 - 94", inseamIn: "32", inseamCm: "81" },
    { waist: "30", eu: "46", waistIn: "30 - 31", waistCm: "76 - 79", hipIn: "38 - 39", hipCm: "96 - 99", inseamIn: "32", inseamCm: "81" },
    { waist: "32", eu: "48", waistIn: "32 - 33", waistCm: "81 - 84", hipIn: "40 - 41", hipCm: "101 - 104", inseamIn: "33", inseamCm: "84" },
    { waist: "34", eu: "50", waistIn: "34 - 35", waistCm: "86 - 89", hipIn: "42 - 43", hipCm: "106 - 109", inseamIn: "33", inseamCm: "84" },
    { waist: "36", eu: "52", waistIn: "36 - 37", waistCm: "91 - 94", hipIn: "44 - 45", hipCm: "111 - 114", inseamIn: "34", inseamCm: "86" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FCFBF8] border border-[#E8E3D9] shadow-2xl z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8E3D9]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
              Atelier Measurement Protocol
            </span>
            <h3 className="font-serif text-2xl uppercase tracking-wider text-[#1A1A18] mt-1">
              Garment Sizing Guide
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#1A1A18] hover:opacity-60 transition-opacity"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Tabs & Unit Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-[#EDE8DE]">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab("tops")}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium transition-colors ${
                activeTab === "tops"
                  ? "bg-[#1A1A18] text-[#FCFBF8]"
                  : "bg-[#F5F2EC] text-[#545149] hover:bg-[#EAE4D7]"
              }`}
            >
              Coats & Tops
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bottoms")}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium transition-colors ${
                activeTab === "bottoms"
                  ? "bg-[#1A1A18] text-[#FCFBF8]"
                  : "bg-[#F5F2EC] text-[#545149] hover:bg-[#EAE4D7]"
              }`}
            >
              Trousers & Slacks
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center space-x-1 bg-[#F5F2EC] p-1 border border-[#E8E3D9] text-xs">
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-colors ${
                unit === "in" ? "bg-[#1A1A18] text-white" : "text-[#736E64] hover:text-black"
              }`}
            >
              INCHES (IN)
            </button>
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`px-2.5 py-1 text-[11px] font-mono tracking-wider transition-colors ${
                unit === "cm" ? "bg-[#1A1A18] text-white" : "text-[#736E64] hover:text-black"
              }`}
            >
              METRIC (CM)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="py-4 overflow-x-auto">
          {activeTab === "tops" ? (
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1A1A18] text-[#1A1A18] font-sans font-semibold tracking-wider uppercase text-[11px]">
                  <th className="py-2.5">Standard</th>
                  <th className="py-2.5">EU</th>
                  <th className="py-2.5">Chest ({unit})</th>
                  <th className="py-2.5">Shoulder ({unit})</th>
                  <th className="py-2.5">Sleeve ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8DE] text-[#42403B]">
                {topsData.map((row) => (
                  <tr key={row.size} className="hover:bg-[#F9F7F2]">
                    <td className="py-3 font-semibold text-[#1A1A18]">{row.size}</td>
                    <td className="py-3">{row.eu}</td>
                    <td className="py-3">{unit === "in" ? row.chestIn : row.chestCm}</td>
                    <td className="py-3">{unit === "in" ? row.shoulderIn : row.shoulderCm}</td>
                    <td className="py-3">{unit === "in" ? row.sleeveIn : row.sleeveCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1A1A18] text-[#1A1A18] font-sans font-semibold tracking-wider uppercase text-[11px]">
                  <th className="py-2.5">Waist Size</th>
                  <th className="py-2.5">EU</th>
                  <th className="py-2.5">Natural Waist ({unit})</th>
                  <th className="py-2.5">Seat / Hip ({unit})</th>
                  <th className="py-2.5">Inseam ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8DE] text-[#42403B]">
                {bottomsData.map((row) => (
                  <tr key={row.waist} className="hover:bg-[#F9F7F2]">
                    <td className="py-3 font-semibold text-[#1A1A18]">{row.waist}</td>
                    <td className="py-3">{row.eu}</td>
                    <td className="py-3">{unit === "in" ? row.waistIn : row.waistCm}</td>
                    <td className="py-3">{unit === "in" ? row.hipIn : row.hipCm}</td>
                    <td className="py-3">{unit === "in" ? row.inseamIn : row.inseamCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Measuring Advice Note */}
        <div className="mt-4 p-4 bg-[#F5F2EC] border border-[#E8E3D9] text-xs text-[#636058] space-y-2">
          <p className="font-semibold text-[#1A1A18] uppercase tracking-wider text-[11px] flex items-center">
            <Ruler className="w-3.5 h-3.5 mr-1.5 text-[#B5A38A]" />
            Atelier Fit Recommendations
          </p>
          <p className="leading-relaxed font-light">
            Our overcoats and blazers are intentionally designed with sculptural dropped shoulders. If you prefer a tailored, traditional fit, we recommend selecting one size down. 
            All trousers feature an internal curtain waistband with 4cm of additional inlay allowing effortless bespoke alterations by your local tailor.
          </p>
        </div>

      </div>
    </div>
  );
}
