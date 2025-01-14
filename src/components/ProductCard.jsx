import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { FaLeaf, FaShoppingCart, FaStar, FaGift } from 'react-icons/fa';

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
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-64 object-cover transform transition-transform duration-700 hover:scale-110"
            onError={(e) => e.target.src = placeholderImage}
          />
          {showGiftBanner && (
            <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
              <FaGift className="text-white" />
              FREE Gift with Subscription
            </div>
          )}
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg tracking-wider">Sold Out</span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="text-sm text-primary-400 uppercase tracking-wider font-medium">
            {product.productType || "Premium Product"}
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {product.title}
          </h3>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 w-4 h-4" />
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 font-light">
            {product.description}
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-white tracking-tight">
                ${Number(price?.amount || 0).toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${Number(originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(e);
              }}
              className="shop-button flex items-center justify-center gap-2"
              disabled={!available}
            >
              <FaShoppingCart className="text-lg" />
              <span>Shop Now</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;