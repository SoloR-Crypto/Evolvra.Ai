import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './lib/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import BiohackingSlider from './components/BiohackingSlider'
import Footer from './components/Footer'
import Community from './components/Community'
import CommunityPage from './components/CommunityPage'
import Shop from './components/Shop'
import ProductPage from './components/ProductPage'

const App = () => {
  return (
    <Router>
      <CartProvider>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <BiohackingSlider />
            </>
          } />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:slug" element={<CommunityPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
    </Router>
  )
}

export default App
