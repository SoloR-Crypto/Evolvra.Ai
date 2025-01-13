
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../lib/CartContext';
import { FaTrash, FaMinus, FaPlus, FaLock, FaCreditCard, FaPaypal } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, checkout } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price.amount * item.quantity), 0);
  const shipping = total > 200 ? 0 : 15.00;

  useEffect(() => {
    // Initialize Shopify elements
    const shopifyScript = document.createElement('script');
    shopifyScript.src = 'https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.8645d252f07ec25fdbc6.js';
    document.head.appendChild(shopifyScript);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="premium-heading text-3xl mb-8">Checkout</h1>
              
              {cart.length === 0 ? (
                <div className="luxury-card p-8 text-center">
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.variantId}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="luxury-card p-6"
                    >
                      <div className="flex items-center space-x-6">
                        <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-medium">{item.title}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.variantId, Math.max(0, item.quantity - 1))}
                                className="p-1 hover:text-primary-400 text-gray-400"
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="text-white w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="p-1 hover:text-primary-400 text-gray-400"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                            <span className="text-primary-400 font-medium">
                              ${(item.price.amount * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.variantId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="luxury-card p-6">
              <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                <button className="w-full luxury-button py-3 flex items-center justify-center space-x-2">
                  <FaCreditCard />
                  <span>Credit Card</span>
                </button>
                <button className="w-full luxury-button py-3 flex items-center justify-center space-x-2 bg-blue-500">
                  <FaPaypal />
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            <div className="luxury-card p-6">
              <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">First Name</label>
                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Address</label>
                  <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">City</label>
                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">State</label>
                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">ZIP</label>
                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span>${(total + shipping).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={checkout}
                    className="w-full luxury-button py-4 flex items-center justify-center space-x-2"
                    disabled={cart.length === 0}
                  >
                    <FaLock size={14} />
                    <span>Complete Purchase</span>
                  </button>
                  <p className="text-gray-400 text-sm text-center mt-4">
                    Free shipping on orders over $200
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
