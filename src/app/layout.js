import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

export const metadata = {
  title: "VÉNDÔME — Contemporary Atelier & Luxury Streetwear",
  description:
    "An art-directed contemporary fashion house synthesizing understated luxury with architectural silhouettes and premium natural textiles.",
  keywords: "fashion, luxury, streetwear, contemporary label, overcoats, tailoring, minimalist fashion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFBF8] text-[#1A1A18] font-sans selection:bg-[#242421] selection:text-[#FCFBF8]">
        <CartProvider>
          <Suspense fallback={<div className="h-28 bg-[#FCFBF8]" />}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
        </CartProvider>
      </body>
    </html>
  );
}
