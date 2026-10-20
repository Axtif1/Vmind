import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

export const metadata = {
  title: "V-MIND FASHION — Contemporary Atelier & Luxury Streetwear",
  description:
    "V-MIND FASHION: An art-directed contemporary clothing label synthesizing understated luxury with architectural silhouettes and premium natural textiles.",
  keywords: "V-MIND, V-MIND FASHION, luxury, streetwear, contemporary label, fashion India, overcoats, tailoring, minimalist fashion",
  icons: {
    icon: "/favicon.ico",
  },
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
      <body className="min-h-full flex flex-col bg-[#F8F6F1] text-[#171716] font-sans selection:bg-[#171716] selection:text-[#F8F6F1]">
        <CartProvider>
          <Suspense fallback={<div className="h-28 bg-[#F8F6F1]" />}>
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
