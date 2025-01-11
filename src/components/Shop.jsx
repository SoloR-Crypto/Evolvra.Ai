import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaDna, FaBrain, FaFlask, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    { name: 'All', icon: <FaLeaf /> },
    { name: 'Nootropics', icon: <FaBrain /> },
    { name: 'Supplements', icon: <FaDna /> },
    { name: 'Elixirs', icon: <FaFlask /> },
    { name: 'Sacred Herbs', icon: <FaLeaf /> },
    { name: 'Ceremonial Tools', icon: <FaFlask /> }
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
      icon: '🧠',
      stock: 15,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Quantum Cell Regeneration",
      category: "Supplements",
      price: 299.99,
      subscription: 269.99,
      description: "Revolutionary cellular optimization complex.",
      image: "/quantum-cell.jpg",
      icon: '⚡',
      stock: 22,
      rating: 4.5,
      reviews: 87
    },
    {
      id: 3,
      name: "Golden Immortality Elixir",
      category: "Elixirs",
      price: 159.99,
      subscription: 139.99,
      description: "Ancient wisdom meets modern biohacking excellence.",
      image: "/golden-elixir.jpg",
      icon: '✨',
      stock: 7,
      rating: 4.9,
      reviews: 321
    },
    {
      id: 4,
      name: "Sacred Blue Lotus",
      category: "Sacred Herbs",
      price: 89.99,
      subscription: 79.99,
      description: "Pure, organic Egyptian blue lotus flowers. Ancient ceremonial grade.",
      image: "/blue-lotus.jpg",
      icon: '🌺',
      stock: 35,
      rating: 4.7,
      reviews: 156
    },
    {
      id: 5,
      name: "Wild Harvested Mugwort",
      category: "Sacred Herbs",
      price: 49.99,
      subscription: 44.99,
      description: "Premium dream herb, sustainably wildcrafted from pristine locations.",
      image: "/mugwort.jpg",
      icon: '🌿',
      stock: 18,
      rating: 4.6,
      reviews: 92
    },
    {
      id: 6,
      name: "Ceremonial Brass Mortar",
      category: "Ceremonial Tools",
      price: 129.99,
      subscription: null,
      description: "Sacred geometry-engraved brass mortar and pestle for herb preparation.",
      image: "/mortar.jpg",
      icon: '🏺',
      stock: 10,
      rating: 4.2,
      reviews: 55
    },
    {
      id: 7,
      name: "Crystal Elixir Vessel",
      category: "Ceremonial Tools",
      price: 199.99,
      subscription: null,
      description: "Amethyst-infused glass vessel for potion crafting and storage.",
      image: "/vessel.jpg",
      icon: '🔮',
      stock: 5,
      rating: 4.9,
      reviews: 111
    },
    {
      id: 8,
      name: "Sacred Turmeric Root",
      category: "Sacred Herbs",
      price: 29.99,
      subscription: 24.99,
      description: "100% organic, high-curcumin Indian turmeric root powder. Ancient healing wisdom.",
      image: "/turmeric.jpg",
      icon: '🌾',
      stock: 40,
      rating: 4.4,
      reviews: 185
    },
    {
      id: 9,
      name: "Black Pepper Supreme",
      category: "Sacred Herbs",
      price: 19.99,
      subscription: 16.99,
      description: "Premium black pepper, essential for turmeric absorption enhancement.",
      image: "/blackpepper.jpg",
      icon: '🌶️',
      stock: 60,
      rating: 4.3,
      reviews: 210
    },
    {
      id: 10,
      name: "Cayenne Fire Blend",
      category: "Sacred Herbs",
      price: 24.99,
      subscription: 21.99,
      description: "Wild-harvested cayenne pepper, high capsaicin content for circulation.",
      image: "/cayenne.jpg",
      icon: '🔥',
      stock: 28,
      rating: 4.1,
      reviews: 78
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const searchedProducts = searchQuery
    ? filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  const addToCart = (productId) => {
    setCartCount(prev => prev + 1);
    // Shopify cart integration would go here
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Search and Cart */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="premium-heading text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Arsenal
          </motion.h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-primary-500"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <FaShoppingCart className="text-2xl text-white cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
          {searchedProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
                className="luxury-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 group-hover:scale-105 transition-transform duration-500">
                    {/* Product image would go here */}
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full text-sm text-white">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{product.icon}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white ml-1">{product.rating}</span>
                      <span className="text-gray-400 text-sm ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl text-white">${product.price}</span>
                      {product.subscription && (
                        <span className="text-sm text-primary-400 ml-2">
                          ${product.subscription} /mo
                        </span>
                      )}
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id);
                      }}
                      className="luxury-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Link>
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