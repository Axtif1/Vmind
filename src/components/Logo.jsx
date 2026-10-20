"use client";

import React from "react";
import Link from "next/link";

/**
 * Reusable Logo Component for V-MIND FASHION
 * Features refined horizontal lockup (emblem on left, brand name horizontally beside it)
 * 
 * Variants:
 * - "horizontal": Horizontal lockup with dark text & emblem (for light backgrounds)
 * - "horizontal-white": Horizontal lockup with white text & emblem (for dark backgrounds)
 * - "dark": Vertical stacked master logo for light backgrounds
 * - "white": Vertical stacked master logo for dark backgrounds
 * - "emblem": Emblem mark alone
 * - "badge": Original dark card lockup
 */
export default function Logo({ 
  variant = "horizontal", 
  size = "md", 
  showLink = true,
  className = "" 
}) {
  const isHorizontal = variant === "horizontal" || variant === "horizontal-white";
  const isWhite = variant === "white" || variant === "horizontal-white" || variant === "emblem-white";

  // Size definitions for horizontal lockup
  const emblemSizes = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-9 md:h-10",
    lg: "h-10 sm:h-12",
    xl: "h-12 sm:h-14",
  };

  const textSizes = {
    sm: "text-[12px] sm:text-[13px] tracking-[0.18em]",
    md: "text-[14px] sm:text-[15px] md:text-[16px] tracking-[0.22em]",
    lg: "text-[17px] sm:text-[19px] tracking-[0.24em]",
    xl: "text-[21px] sm:text-[24px] tracking-[0.26em]",
  };

  // Size definitions for stacked logo images
  const stackedSizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-20 w-auto",
  };

  let content;

  if (isHorizontal) {
    const emblemSrc = isWhite ? "/brand/vmind_emblem_white.png" : "/brand/vmind_emblem_dark.png";
    const textColor = isWhite ? "text-[#F8F6F1]" : "text-[#171716]";

    content = (
      <div className={`relative inline-flex items-center select-none group ${className}`}>
        <img
          src={emblemSrc}
          alt="V-MIND FASHION Emblem"
          className={`${emblemSizes[size] || "h-9"} w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
          loading="eager"
        />
        <div className="flex flex-col justify-center ml-2.5 sm:ml-3">
          <span className={`font-serif uppercase font-medium leading-none ${textColor} ${textSizes[size] || "text-[15px]"} whitespace-nowrap`}>
            V-MIND FASHION
          </span>
        </div>
      </div>
    );
  } else {
    let src = "/brand/vmind_logo_dark.png";
    if (variant === "white") src = "/brand/vmind_logo_white.png";
    else if (variant === "badge") src = "/brand/vmind_logo_badge.png";
    else if (variant === "emblem") src = "/brand/vmind_emblem_dark.png";
    else if (variant === "emblem-white") src = "/brand/vmind_emblem_white.png";

    content = (
      <div className={`relative flex items-center select-none ${className}`}>
        <img
          src={src}
          alt="V-MIND FASHION"
          className={`${stackedSizeClasses[size] || "h-12 w-auto"} object-contain transition-transform duration-300 hover:scale-[1.02]`}
          loading="eager"
        />
      </div>
    );
  }

  if (!showLink) {
    return content;
  }

  return (
    <Link 
      href="/" 
      className="inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9342D] transition-opacity hover:opacity-90"
      aria-label="V-MIND FASHION Home"
    >
      {content}
    </Link>
  );
}
