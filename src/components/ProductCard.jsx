
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

  const [showModal, setShowModal] = useState(false);
  const [showAddedEffect, setShowAddedEffect] = useState(false);
  const navigate = useNavigate();

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

    setShowAddedEffect(true);
    setTimeout(() => setShowAddedEffect(false), 1000);
    setShowModal(true);
  };

  const handleContinueShopping = () => {
    setShowModal(false);
  };

  const handleGoToCheckout = () => {
    setShowModal(false);
    navigate('/checkout');
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
        className="luxury-card group cursor-pointer w-full md:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => e.target.src = placeholderImage}
          />
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Sold Out</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <Link 
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="block hover:text-primary-400 transition-colors duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
          </Link>
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
                className={`luxury-button flex items-center space-x-2 ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={available ? { scale: 1.05 } : {}}
                whileTap={available ? { scale: 0.95 } : {}}
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
          </div>
          {available && (
            <div className="mt-4 flex items-center space-x-2 text-primary-400">
              <FaLeaf className="text-sm" />
              <span className="text-sm">In Stock</span>
            </div>
          )}
        </div>
        {showAddedEffect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Added!
          </motion.div>
        )}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleContinueShopping}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-sm mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Item Added to Cart!</h3>
              <div className="flex gap-4">
                <button
                  onClick={handleContinueShopping}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleGoToCheckout}
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Go to Checkout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
};

export default ProductCard;
