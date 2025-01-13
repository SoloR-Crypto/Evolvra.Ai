
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Shop from './components/Shop';
import Footer from './components/Footer';
import Community from './components/Community';
import CommunityPage from './components/CommunityPage';
import ProductPage from './components/ProductPage';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './lib/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Shop />
            </>
          } />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:slug" element={<CommunityPage />} />
          <Route path="/products/:handle" element={<ProductPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
