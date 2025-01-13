
import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-heading mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="luxury-card p-8"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white h-32"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button className="luxury-button w-full py-3">Send Message</button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="luxury-card p-6">
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-primary-400 text-2xl" />
                <div>
                  <h3 className="text-white font-semibold">Email Us</h3>
                  <p className="text-gray-400">support@evolvra.ai</p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-6">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-primary-400 text-2xl" />
                <div>
                  <h3 className="text-white font-semibold">Call Us</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-6">
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-primary-400 text-2xl" />
                <div>
                  <h3 className="text-white font-semibold">Visit Us</h3>
                  <p className="text-gray-400">123 Health Street, Wellness City, 12345</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
