"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "@/data/products";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Pre-populate with 2 realistic items for immediate live demonstration if localStorage is empty
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(["prod-01", "prod-05"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage or pre-fill with demonstration luxury item
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vmind_cart") || localStorage.getItem("vendome_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Sync item price with current catalog to prevent stale USD cached prices
        const refreshed = parsed.map((item) => {
          const match = PRODUCTS.find((p) => p.id === item.id);
          return match ? { ...item, price: match.price } : item;
        });
        setCart(refreshed);
      } else {
        // High-end demo default item so the user experiences cart immediately
        const demoProduct = PRODUCTS[0];
        setCart([
          {
            id: demoProduct.id,
            slug: demoProduct.slug,
            name: demoProduct.name,
            subtitle: demoProduct.subtitle,
            price: demoProduct.price,
            primaryImage: demoProduct.primaryImage,
            selectedSize: "48 (M)",
            selectedColor: demoProduct.colors[0].name,
            quantity: 1,
          },
        ]);
      }
      
      const savedWishlist = localStorage.getItem("vmind_wishlist") || localStorage.getItem("vendome_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("vmind_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("vmind_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, isInitialized]);

  // Toast notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 3800);
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0].name;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            subtitle: product.subtitle,
            price: product.price,
            primaryImage: product.primaryImage,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    showNotification(`Added ${product.name} to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
      )
    );
    showNotification("Item removed from your bag", "info");
  };

  const updateQuantity = (id, selectedSize, selectedColor, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showNotification("Removed piece from saved archive", "info");
        return prev.filter((id) => id !== productId);
      } else {
        showNotification("Piece saved to your personal archive", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        wishlist,
        toggleWishlist,
        isInWishlist,
        notification,
        showNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
