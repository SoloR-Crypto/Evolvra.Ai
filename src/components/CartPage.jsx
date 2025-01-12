
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../lib/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="section-heading mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Cart
        </motion.h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="mb-4">Your cart is empty</p>
            <Link to="/shop" className="luxury-button inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {cart.map((item) => (
              <motion.div 
                key={`${item.productId}-${item.variant}`}
                className="luxury-card p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl text-white">{item.name}</h3>
                    <p className="text-gray-400">Variant: {item.variant}</p>
                    <p className="text-primary-400">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-xl">${item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.productId, item.variant)}
                      className="text-red-400 hover:text-red-300 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="luxury-card p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl text-white">Total</h3>
                <p className="text-2xl text-white">${total.toFixed(2)}</p>
              </div>
              <button 
                className="luxury-button w-full mt-4"
                onClick={() => {
                  // Shopify checkout integration will go here
                  console.log('Proceeding to checkout');
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
