
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { FaLeaf, FaShoppingCart } from 'react-icons/fa';

const placeholderImage = "https://placehold.co/600x400/1f2937/e5e7eb?text=Product+Image";

const ProductCard = ({ product, loading }) => {
  const { addToCart } = useCart();
  const imageUrl = product?.images?.edges[0]?.node?.url || placeholderImage;
  const variant = product?.variants?.edges[0]?.node;
  const price = variant?.price;
  const available = variant?.availableForSale;

  const [showChoice, setShowChoice] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

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

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1000);
    setShowChoice(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowChoice(false);
  };

  const handleGoToCheckout = (e) => {
    e.preventDefault();
    window.location.href = '/checkout';
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
        className="luxury-card group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="relative group">
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => e.target.src = placeholderImage}
            />
            <div className="absolute hidden group-hover:block bg-black/80 p-2 rounded-lg z-50 -right-[250px] top-0">
              <img
                src={imageUrl}
                alt={product.title}
                className="w-[240px] h-[240px] object-cover rounded-lg"
                onError={(e) => e.target.src = placeholderImage}
              />
            </div>
          </div>
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Sold Out</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl text-white">
              {Number(price.amount) === 0 
                ? 'Free' 
                : `${Number(price.amount).toFixed(2)} ${price.currencyCode}`}
            </span>
            <AnimatePresence>
              <motion.button
                onClick={handleAddToCart}
                className={`luxury-button flex items-center space-x-2 ${!available ? 'opacity-50 cursor-not-allowed' : ''} ${addedAnimation ? 'bg-green-500' : ''}`}
                whileHover={available ? { scale: 1.05 } : {}}
                whileTap={available ? { scale: 0.95 } : {}}
                animate={addedAnimation ? {
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.3 }
                } : {}}
                disabled={!available}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaShoppingCart />
                <span>
                  {available
                    ? Number(price.amount) === 0 
                      ? 'Get for Free'
                      : 'Add to Cart'
                    : 'Sold Out'}
                </span>
              </motion.button>
            </AnimatePresence>
            {showChoice && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 bg-gray-800 rounded-lg shadow-xl p-4 z-50 w-64"
              >
                <p className="text-white mb-3">Item added to cart!</p>
                <div className="space-y-2">
                  <button 
                    onClick={handleContinueShopping}
                    className="w-full luxury-button py-2"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    onClick={handleGoToCheckout}
                    className="w-full luxury-button py-2 bg-primary-500"
                  >
                    Go to Checkout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          {available && (
            <div className="mt-4 flex items-center space-x-2 text-primary-400">
              <FaLeaf className="text-sm" />
              <span className="text-sm">In Stock</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
