
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { FaLeaf, FaShoppingCart, FaStar } from 'react-icons/fa';

const placeholderImage = "https://placehold.co/600x400/1f2937/e5e7eb?text=Product+Image";

const ProductCard = ({ product, loading, showGiftBanner = true }) => {
  const { addToCart } = useCart();
  const imageUrl = product?.images?.edges[0]?.node?.url || placeholderImage;
  const variant = product?.variants?.edges[0]?.node;
  const price = variant?.price;
  const available = variant?.availableForSale;
  const originalPrice = variant?.compareAtPrice?.amount;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!available) return;
    
    await addToCart({
      variantId: variant.id,
      title: product.title,
      price: {
        amount: Number(price.amount),
        currencyCode: price.currencyCode
      },
      quantity: 1,
      image: imageUrl
    });
  };

  if (loading) {
    return (
      <motion.div 
        className="luxury-card group animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-48 bg-gray-700 rounded-t-xl"/>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"/>
          <div className="h-4 bg-gray-700 rounded w-full"/>
          <div className="h-4 bg-gray-700 rounded w-full"/>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-700 rounded w-1/4"/>
            <div className="h-10 bg-gray-700 rounded w-1/3"/>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        className="luxury-card group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-64 object-contain bg-blue-50 p-4"
            onError={(e) => e.target.src = placeholderImage}
          />
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Sold Out</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="text-xs text-blue-900 uppercase font-semibold mb-2">
            {product.productType || "For All"}
          </div>
          
          <h3 className="text-xl font-bold text-blue-900 mb-2">{product.title}</h3>
          
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          {showGiftBanner && (
            <div className="bg-green-50 text-green-800 px-4 py-2 rounded-lg flex items-center mb-4">
              <span className="text-sm">🎁 FREE Gift With Subscription</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-blue-900">
                ${Number(price.amount).toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-gray-500 line-through">
                  ${Number(originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(e);
            }}
            className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            disabled={!available}
          >
            Shop Now
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
