import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product, loading }) => {
  const { addToCart } = useCart();
  const imageUrl = product?.images?.edges[0]?.node?.url;
  const variant = product?.variants?.edges[0]?.node;
  const price = variant?.price;
  const available = variant?.availableForSale;

  if (loading) {
    return (
      <motion.div 
        className="bg-white rounded-lg p-4 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-48 bg-gray-200 rounded-lg mb-4"/>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"/>
          <div className="h-4 bg-gray-200 rounded w-1/2"/>
          <div className="h-10 bg-gray-200 rounded"/>
        </div>
      </motion.div>
    );
  }

  const oldPrice = price?.amount ? Number(price.amount) * 1.2 : 0;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${product.handle}`}>
        <div className="relative p-6">
          <img
            src={imageUrl || "https://placehold.co/600x400/1f2937/e5e7eb?text=Product+Image"}
            alt={product.title}
            className="w-full h-64 object-contain mb-4"
          />
          <div className="text-xs text-navy-600 mb-2">FOR {product.productType || 'ALL'}</div>
          <h3 className="text-navy-900 font-bold text-xl mb-2">{product.title}</h3>
          <div className="flex items-center space-x-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-sm" />
            ))}
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-2xl font-bold text-emerald-700">
              ${Number(price?.amount || 0).toFixed(2)}
            </span>
            <span className="text-gray-500 line-through text-sm">
              ${oldPrice.toFixed(2)}
            </span>
          </div>
          <div className="bg-emerald-600 text-white rounded-lg p-3 w-full text-center mb-4 transform -rotate-2">
            <p className="text-sm font-bold flex items-center justify-center gap-2">
              <span className="text-lg">🎁</span> FREE Gift With Subscription
            </p>
          </div>
          <button
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors duration-200"
            onClick={() => {if (available) addToCart({variantId: variant.id, title: product.title, price: {amount: Number(price.amount), currencyCode: price.currencyCode}, quantity: 1, image: imageUrl})}}
          >
            Shop Now
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;