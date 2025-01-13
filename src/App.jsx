
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Shop from './components/Shop';
import Footer from './components/Footer';
import Community from './components/Community';
import CommunityPage from './components/CommunityPage';
import ProductPage from './components/ProductPage';
import { CartProvider } from './lib/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
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
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
