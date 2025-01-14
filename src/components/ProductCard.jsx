import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { FaStar } from 'react-icons/fa';

const placeholderImage = "https://placehold.co/600x400/1f2937/e5e7eb?text=Product+Image";

const ProductCard = ({ product, loading }) => {
  const { addToCart } = useCart();
  const imageUrl = product?.images?.edges[0]?.node?.url || placeholderImage;
  const variant = product?.variants?.edges[0]?.node;
  const price = variant?.price;
  const available = variant?.availableForSale;
  const originalPrice = price ? Number(price.amount) * 1.2 : 0;

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

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

  const oldPrice = Number(price?.amount || 0) * 1.2;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${product.handle}`} className="flex-grow">
        <div className="relative bg-sky-100 p-6">
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-sm font-medium text-navy-900">
            FOR {product.productType || 'ALL'}
          </div>
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-64 object-contain"
          />
        </div>

        <div className="p-6 space-y-4 flex-grow">
          <h3 className="text-navy-900 font-bold text-xl leading-tight">{product.title}</h3>
          
          <div className="flex items-center space-x-1">
            {renderStars()}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

          <div className="bg-green-50 rounded-lg p-3 flex items-center space-x-2">
            <span className="text-green-800 text-sm">🎁 FREE Gift With Subscription</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">From</span>
              <span className="text-2xl font-bold text-navy-900">
                ${Number(price?.amount || 0).toFixed(2)}
              </span>
            </div>
            <span className="text-gray-500 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          </div>

          <div className="bg-green-100 rounded-lg p-2 mt-2">
            <p className="text-emerald-700 text-sm flex items-center">
              🎁 FREE Gift With Subscription
            </p>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={!available}
        className="w-full bg-green-700 text-white py-4 font-bold text-lg hover:bg-green-800 transition-colors duration-200"
      >
        Shop Now
      </button>
    </motion.div>
  );
};

export default ProductCard;