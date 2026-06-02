import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { ShopProvider } from "./lib/store";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { MobileBottomNav } from "./components/layout/MobileBottomNav";
import { FloatingBg, WhatsAppButton } from "./components/layout/FloatingBg";
import { useEffect } from "react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Track from "./pages/Track";
import Wishlist from "./pages/Wishlist";
import Delivery from "./pages/Delivery";

import { AdminLayout } from "./admin/AdminLayout";
import {
  AdminDashboard, AdminOrders, AdminProducts, AdminCategories, AdminCustomers,
  AdminReviews, AdminCoupons, AdminBanners, AdminDelivery, AdminAnalytics,
  AdminNotifications, AdminSettings,
} from "./admin/pages";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

function Storefront({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white pb-28 lg:pb-0">
      <FloatingBg />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <ScrollTop />
        <Routes>
          {/* Admin (no storefront chrome) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="delivery" element={<AdminDelivery />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Storefront */}
          <Route path="/" element={<Storefront><Home /></Storefront>} />
          <Route path="/shop" element={<Storefront><Shop /></Storefront>} />
          <Route path="/product/:slug" element={<Storefront><ProductDetail /></Storefront>} />
          <Route path="/cart" element={<Storefront><Cart /></Storefront>} />
          <Route path="/checkout" element={<Storefront><Checkout /></Storefront>} />
          <Route path="/wishlist" element={<Storefront><Wishlist /></Storefront>} />
          <Route path="/track" element={<Storefront><Track /></Storefront>} />
          <Route path="/delivery" element={<Storefront><Delivery /></Storefront>} />
          <Route path="/account" element={<Storefront><Account /></Storefront>} />
          <Route path="/auth/:mode" element={<Storefront><Auth /></Storefront>} />
          <Route path="/auth" element={<Storefront><Auth /></Storefront>} />
          <Route path="*" element={<Storefront><Home /></Storefront>} />
        </Routes>
        <Toaster theme="dark" position="bottom-right" />
      </ShopProvider>
    </BrowserRouter>
  );
}
