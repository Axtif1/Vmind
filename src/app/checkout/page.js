"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  AlertCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Logo from "@/components/Logo";
import { formatPrice } from "@/utils/currency";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    firstName: "Arjun",
    lastName: "Mehta",
    email: "arjun.mehta@atelier-vmind.com",
    phone: "+91 98201 54321",
    address: "14 Colaba Causeway, Fort",
    apartment: "Apartment 5B, Heritage Court",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India",
  });

  const [shippingMethod, setShippingMethod] = useState("express"); // "express" or "white-glove"
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "cod"
  
  // Card demonstration inputs
  const [cardData, setCardData] = useState({
    cardNumber: "•••• •••• •••• 4242",
    cardExp: "12/28",
    cardCvc: "894",
    cardName: "ALEXANDER VANCE",
  });

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // Processing & Confirmation modal states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const shippingCost = shippingMethod === "white-glove" ? 350 : (cartSubtotal >= 1999 ? 0 : 199);
  const orderTotal = Math.max(0, cartSubtotal - appliedDiscount + shippingCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "VMIND" || code === "ATELIER" || code === "ARCHIVE10") {
      setAppliedDiscount(500);
      setPromoMessage("V-MIND Atelier courtesy voucher of ₹500 applied.");
    } else {
      setPromoMessage("Invalid archive voucher. Try 'VMIND' or 'ATELIER'.");
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder = {
        orderId: `VMD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }),
        items: [...cart],
        subtotal: cartSubtotal,
        discount: appliedDiscount,
        shippingCost,
        total: orderTotal,
        paymentMethod: paymentMethod === "card" ? "Prepaid Credit/Debit Card (Demonstration)" : "Cash on Delivery (Pay Upon Inspection)",
        recipient: formData,
      };
      setOrderConfirmation(generatedOrder);
      clearCart();
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#8E8A80] mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <Link href="/cart" className="hover:text-black transition-colors">Bag</Link>
        <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
        <span className="text-[#1A1A18] font-medium">Demonstration Checkout</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#E8E3D9] pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A38A] block">
            House Concierge Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl uppercase tracking-wider text-[#1A1A18] mt-1">
            Checkout Prototype
          </h1>
        </div>

        {/* Prototype Warning Pill */}
        <div className="inline-flex items-center space-x-2 bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-1.5 text-[11px] font-mono text-[#545149]">
          <Lock className="w-3.5 h-3.5 text-[#747C69]" />
          <span>FRONTEND DEMO ONLY • NO REAL CHARGES</span>
        </div>
      </div>

      {/* Main Grid: Form (Left 7 cols) & Summary (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-10">
          
          <form onSubmit={handleSubmitOrder} className="space-y-10">
            
            {/* Step 1: Client Information */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#E8E3D9]">
                <span className="w-6 h-6 rounded-full bg-[#1A1A18] text-[#FCFBF8] text-xs font-mono flex items-center justify-center font-medium">
                  1
                </span>
                <h2 className="font-serif text-xl uppercase tracking-wide text-[#1A1A18]">
                  Recipient & Atelier Dispatch
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    Email for Dispatch Passport
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    Apartment / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#F5F2EC] border border-[#D9D3C7] px-3.5 py-2.5 focus:outline-none focus:border-[#1A1A18] transition-colors cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Japan">Japan</option>
                    <option value="Germany">Germany</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Step 2: Shipping Method */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#E8E3D9]">
                <span className="w-6 h-6 rounded-full bg-[#1A1A18] text-[#FCFBF8] text-xs font-mono flex items-center justify-center font-medium">
                  2
                </span>
                <h2 className="font-serif text-xl uppercase tracking-wide text-[#1A1A18]">
                  Courier Delivery Option
                </h2>
              </div>

              <div className="space-y-3">
                <label className={`block p-4 border transition-all cursor-pointer ${
                  shippingMethod === "express" ? "border-[#1A1A18] bg-[#FAF7F2]" : "border-[#E2DDD2] bg-[#FCFBF8]"
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="accent-[#1A1A18]"
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A18] uppercase tracking-wider">
                          Standard Pan-India Express Courier
                        </p>
                        <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                          Direct delivery across India via BlueDart / DHL Express (2-3 business days)
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#1A1A18]">
                      {cartSubtotal >= 1999 ? "COMPLIMENTARY" : formatPrice(199)}
                    </span>
                  </div>
                </label>

                <label className={`block p-4 border transition-all cursor-pointer ${
                  shippingMethod === "white-glove" ? "border-[#1A1A18] bg-[#FAF7F2]" : "border-[#E2DDD2] bg-[#FCFBF8]"
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "white-glove"}
                        onChange={() => setShippingMethod("white-glove")}
                        className="accent-[#1A1A18]"
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A18] uppercase tracking-wider">
                          White-Glove Atelier Hand Courier
                        </p>
                        <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                          Hand-delivered in structured garment trunk with bespoke hanging fitting service
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#1A1A18]">+{formatPrice(350)}</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Step 3: Payment Method (Prepaid vs Cash on Delivery) */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#E8E3D9]">
                <span className="w-6 h-6 rounded-full bg-[#1A1A18] text-[#FCFBF8] text-xs font-mono flex items-center justify-center font-medium">
                  3
                </span>
                <h2 className="font-serif text-xl uppercase tracking-wide text-[#1A1A18]">
                  Payment Preference (Demonstration Prototype)
                </h2>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border text-left transition-all flex items-start space-x-3 ${
                    paymentMethod === "card" 
                      ? "border-[#1A1A18] bg-[#FAF7F2]" 
                      : "border-[#E2DDD2] bg-[#FCFBF8] hover:bg-[#F9F7F2]"
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#1A1A18] mt-0.5" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-[#1A1A18]">
                      Prepaid Card
                    </p>
                    <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                      Visa, Mastercard, Amex
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border text-left transition-all flex items-start space-x-3 ${
                    paymentMethod === "cod" 
                      ? "border-[#1A1A18] bg-[#FAF7F2]" 
                      : "border-[#E2DDD2] bg-[#FCFBF8] hover:bg-[#F9F7F2]"
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#1A1A18] mt-0.5" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-[#1A1A18]">
                      Cash On Delivery
                    </p>
                    <p className="text-[11px] text-[#736E64] font-light mt-0.5">
                      Pay Upon Inspection
                    </p>
                  </div>
                </button>
              </div>

              {/* Payment Details Box */}
              {paymentMethod === "card" ? (
                <div className="p-5 bg-[#F5F2EC] border border-[#D9D3C7] space-y-4 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#736E64] uppercase font-mono border-b border-[#E2DDD2] pb-2">
                    <span>Simulated Encrypted Payment Gateway</span>
                    <Lock className="w-3.5 h-3.5 text-[#67705B]" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                        Card Number (Demo Mockup)
                      </label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full bg-[#FCFBF8] border border-[#D9D3C7] px-3.5 py-2 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardData.cardExp}
                          onChange={(e) => setCardData({ ...cardData, cardExp: e.target.value })}
                          className="w-full bg-[#FCFBF8] border border-[#D9D3C7] px-3.5 py-2 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[#545149] font-medium mb-1 text-[11px]">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardData.cardCvc}
                          onChange={(e) => setCardData({ ...cardData, cardCvc: e.target.value })}
                          className="w-full bg-[#FCFBF8] border border-[#D9D3C7] px-3.5 py-2 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-[#F5F2EC] border border-[#D9D3C7] text-xs text-[#545149] space-y-2">
                  <p className="font-semibold text-[#1A1A18] uppercase tracking-wider text-[11px] flex items-center">
                    <Banknote className="w-4 h-4 mr-1.5 text-[#B5A38A]" />
                    Cash on Delivery Terms
                  </p>
                  <p className="font-light leading-relaxed">
                    Our white-glove courier will present the garment in unsealed archival garment packaging for your hands-on inspection. 
                    You may pay via cash or portable chip terminal directly upon physical approval.
                  </p>
                </div>
              )}

            </section>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322D] py-4 px-6 text-xs font-semibold tracking-widest-editorial uppercase transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
              >
                <span>
                  {isSubmitting 
                    ? "Confirming Reservation With Atelier..." 
                    : `Confirm Demonstration Order • ${formatPrice(orderTotal)}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#F5F2EC] border border-[#E8E3D9] p-6 sm:p-8 space-y-6 sticky top-28">
            
            <h3 className="font-serif text-xl uppercase tracking-wider text-[#1A1A18] pb-3 border-b border-[#E2DDD2]">
              Order Summary ({cart.length} Pieces)
            </h3>

            {/* Items Mini List */}
            <div className="divide-y divide-[#E2DDD2] max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="py-3 flex space-x-3 items-center">
                  <div className="w-12 h-16 bg-[#EDE8DE] flex-shrink-0 overflow-hidden">
                    <img src={item.primaryImage} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-medium text-[#1A1A18] uppercase truncate line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-[#736E64] font-mono">
                      {item.selectedSize} • {item.selectedColor} • Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#1A1A18]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <label className="block text-[11px] uppercase tracking-wider text-[#545149] font-medium mb-1.5">
                Archival Courtesy Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="TRY 'ATELIER'"
                  className="bg-[#FCFBF8] border border-[#D9D3C7] px-3 py-2 text-xs uppercase tracking-wider flex-1 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322D] px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] mt-1 font-mono ${
                  appliedDiscount > 0 ? "text-[#67705B]" : "text-[#8A353D]"
                }`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-[#E2DDD2] pt-4">
              <div className="flex justify-between text-[#636058]">
                <span>Pieces Subtotal</span>
                <span className="font-mono text-[#1A1A18]">{formatPrice(cartSubtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#67705B]">
                  <span>V-MIND Courtesy Credit</span>
                  <span className="font-mono">-{formatPrice(appliedDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#636058]">
                <span>Express Courier Dispatch</span>
                <span className="font-mono text-[#1A1A18]">
                  {shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between text-[#636058]">
                <span>GST & Customs Duties</span>
                <span className="font-mono text-[#67705B]">Included</span>
              </div>

              <div className="pt-4 border-t border-[#E2DDD2] flex justify-between text-base font-semibold text-[#1A1A18]">
                <span className="uppercase tracking-wider">Total</span>
                <span className="font-mono">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center justify-center space-x-2 pt-2 text-[10px] text-[#736E64] uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-[#747C69]" />
              <span>Full Archive Authenticity Certificate Included</span>
            </div>

          </div>
        </div>

      </div>

      {/* Order Confirmation Modal (Demonstration Finish) */}
      {orderConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" />

          <div className="relative w-full max-w-xl bg-[#FCFBF8] border border-[#E8E3D9] shadow-2xl z-10 p-6 sm:p-10 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#F5F2EC] border border-[#747C69] rounded-full flex items-center justify-center mx-auto text-[#747C69]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5A38A] block">
                Atelier Consignment Logged
              </span>
              <h2 className="font-serif text-3xl uppercase tracking-wide text-[#1A1A18]">
                Reservation Confirmed
              </h2>
              <p className="text-xs font-mono text-[#57554F]">
                Order Reference: <strong className="text-[#1A1A18]">{orderConfirmation.orderId}</strong>
              </p>
            </div>

            {/* Prototype Notice Box */}
            <div className="bg-[#F5F2EC] border-l-4 border-[#747C69] p-4 text-xs text-[#524F48] space-y-1">
              <p className="font-semibold uppercase tracking-wider text-[#1A1A18] text-[11px] flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-[#747C69]" />
                Demonstration Prototype Notice
              </p>
              <p className="font-light leading-relaxed">
                This website is a frontend design and interaction prototype. 
                No real financial transaction took place, no card was charged, and no real physical order was transmitted.
              </p>
            </div>

            {/* Summary Details */}
            <div className="border border-[#E8E3D9] p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#736E64]">Recipient:</span>
                <span className="text-[#1A1A18]">{orderConfirmation.recipient.firstName} {orderConfirmation.recipient.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#736E64]">Destination:</span>
                <span className="text-[#1A1A18]">{orderConfirmation.recipient.city}, {orderConfirmation.recipient.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#736E64]">Payment Preference:</span>
                <span className="text-[#1A1A18]">{orderConfirmation.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EDE8DE] font-semibold text-sm">
                <span>Total Amount:</span>
                <span>{formatPrice(orderConfirmation.total)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="flex-1 bg-[#1A1A18] text-[#FCFBF8] hover:bg-[#34322D] py-3.5 px-4 text-xs font-semibold tracking-widest uppercase transition-colors text-center"
              >
                Return To Atelier Catalog
              </Link>
              <Link
                href="/"
                className="py-3.5 px-4 border border-[#D9D3C7] text-xs font-semibold tracking-widest uppercase text-[#1A1A18] hover:bg-[#F5F2EC] transition-colors text-center"
              >
                Atelier Home
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
