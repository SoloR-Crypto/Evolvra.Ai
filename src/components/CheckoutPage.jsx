
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../lib/CartContext';
import { FaTrash } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cart, removeFromCart, checkout } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price.amount * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
          
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.variantId} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-gray-400">Quantity: {item.quantity}</p>
                        <p className="text-primary-400">${(item.price.amount * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-gray-700 pt-8">
                <div className="flex justify-between items-center text-white mb-8">
                  <span className="text-xl">Total:</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={checkout}
                  className="w-full luxury-button py-4 text-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
