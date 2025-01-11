
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaDna, FaBrain, FaFlask } from 'react-icons/fa';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: <FaLeaf /> },
    { name: 'Nootropics', icon: <FaBrain /> },
    { name: 'Supplements', icon: <FaDna /> },
    { name: 'Elixirs', icon: <FaFlask /> }
  ];

  const products = [
    {
      id: 1,
      name: "Neural Enhancement Elite",
      category: "Nootropics",
      price: 199.99,
      subscription: 179.99,
      description: "Advanced cognitive enhancement formula with premium nootropics.",
      image: "/neural-elite.jpg",
      icon: '🧠'
    },
    {
      id: 2,
      name: "Quantum Cell Regeneration",
      category: "Supplements",
      price: 299.99,
      subscription: 269.99,
      description: "Revolutionary cellular optimization complex.",
      image: "/quantum-cell.jpg",
      icon: '⚡'
    },
    {
      id: 3,
      name: "Golden Immortality Elixir",
      category: "Elixirs",
      price: 159.99,
      subscription: 139.99,
      description: "Ancient wisdom meets modern biohacking excellence.",
      image: "/golden-elixir.jpg",
      icon: '✨'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="premium-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Biohacking Arsenal
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Unlock your highest potential with our curated collection of premium supplements and nootropics.
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
                activeCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="luxury-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl">{product.icon}</span>
                  <span className="premium-text text-lg">{product.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                <p className="text-gray-400 mb-6">{product.description}</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">One-time purchase</span>
                    <span className="text-2xl text-white">${product.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subscription</span>
                    <span className="text-2xl premium-text">${product.subscription}</span>
                  </div>
                  <button className="w-full luxury-button mt-6">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="mt-24">
          <h2 className="premium-heading text-center mb-12">Elite Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sovereign",
                price: "99",
                features: ["Basic Protocol Access", "Community Support", "Monthly Supplies"]
              },
              {
                name: "Illuminated",
                price: "199",
                features: ["Advanced Protocols", "Priority Support", "Bi-weekly Supplies", "Expert Consultations"]
              },
              {
                name: "Transcendent",
                price: "399",
                features: ["All Protocols", "24/7 VIP Support", "Weekly Supplies", "Personal Biohacking Coach"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="luxury-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <FaLeaf className="text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full luxury-button">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
