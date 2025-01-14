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
      className="bg-white rounded-lg p-4 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${product.handle}`} className="flex-grow">
        <div className="relative mb-4">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-64 object-contain rounded-lg"
          />
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
              <span className="text-white font-bold text-lg">Sold Out</span>
            </div>
          )}
        </div>

        <div className="space-y-2 flex-grow">
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-sm" />
            ))}
          </div>
          <p className="text-sm text-gray-600">FOR {product.productType || 'ALL'}</p>
          <h3 className="text-navy-900 font-bold text-lg leading-tight">{product.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-2xl font-bold text-emerald-700">
              ${Number(price?.amount || 0).toFixed(2)}
            </span>
            <span className="text-gray-500 line-through text-sm">
              ${oldPrice.toFixed(2)}
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
        className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors duration-200"
      >
        Shop Now
      </button>
    </motion.div>
  );
};

export default ProductCard;