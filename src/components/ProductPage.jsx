
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaLeaf } from 'react-icons/fa';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - would be fetched from Shopify
  const product = {
    id: 1,
    name: "Neural Enhancement Elite",
    category: "Nootropics",
    price: 199.99,
    subscription: 179.99,
    description: "Advanced cognitive enhancement formula with premium nootropics.",
    images: ["/neural-elite.jpg", "/neural-elite-2.jpg", "/neural-elite-3.jpg"],
    icon: '🧠',
    stock: 15,
    rating: 4.8,
    reviews: 124,
    details: [
      "Enhanced cognitive function",
      "Improved mental clarity",
      "Increased focus and concentration",
      "Premium grade ingredients",
      "Third-party tested"
    ]
  };

  const addToCart = () => {
    // Shopify cart integration would go here
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden bg-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-4xl">{product.icon}</span>
              <span className="text-primary-400">{product.category}</span>
            </div>
            <h1 className="text-4xl font-bold text-white">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'} />
                ))}
              </div>
              <span className="text-white">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} reviews)</span>
            </div>
            <p className="text-gray-300 text-lg">{product.description}</p>
            
            <div className="space-y-4 border-t border-gray-800 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price</span>
                <span className="text-3xl text-white">${product.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Subscription</span>
                <span className="text-3xl text-primary-400">${product.subscription}/mo</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-700 rounded-lg">
                <button 
                  className="px-4 py-2 text-gray-400 hover:text-white"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 text-white">{quantity}</span>
                <button 
                  className="px-4 py-2 text-gray-400 hover:text-white"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <motion.button
                className="flex-1 luxury-button"
                onClick={addToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart className="inline-block mr-2" />
                Add to Cart
              </motion.button>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <FaLeaf className="text-primary-500 mr-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
