
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaLeaf } from 'react-icons/fa';

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('default');

  // Mock product data - replace with your actual product data
  const product = {
    id: parseInt(id),
    name: "Sacred Turmeric Root",
    price: 29.99,
    description: "100% organic, high-curcumin Indian turmeric root powder. Ancient healing wisdom.",
    images: ["/turmeric.jpg", "/turmeric-2.jpg", "/turmeric-3.jpg"],
    variants: ["100g", "250g", "500g"],
    stock: 10
  };

  const addToCart = () => {
    // Here you'll integrate with your chosen backend
    const cartItem = {
      productId: product.id,
      quantity,
      variant: selectedVariant,
      price: product.price,
      name: product.name
    };
    
    console.log('Adding to cart:', cartItem);
    // Implement your cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-w-1 aspect-h-1">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 2}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-white">{product.name}</h1>
            <p className="text-2xl text-primary-400">${product.price}</p>
            <p className="text-gray-300">{product.description}</p>

            {/* Variants */}
            <div className="space-y-2">
              <label className="text-white font-medium">Size</label>
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    className={`py-2 px-4 rounded-lg font-medium ${
                      selectedVariant === variant
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-white font-medium">Quantity</label>
              <div className="flex items-center space-x-3">
                <button 
                  className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-white">{quantity}</span>
                <button 
                  className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className="w-full luxury-button flex items-center justify-center space-x-2"
              onClick={addToCart}
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>

            {/* Additional Info */}
            <div className="border-t border-gray-800 pt-6 mt-6">
              <div className="flex items-center space-x-2 text-primary-400">
                <FaLeaf />
                <span>100% Organic & Pure</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
