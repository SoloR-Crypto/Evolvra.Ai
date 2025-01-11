import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.h1 
          className="gradient-text text-6xl md:text-7xl lg:text-8xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          RECLAIM YOUR SOVEREIGNTY
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join the Revolution Against Misinformation, Mind Control, and Nutritional Oppression. Say no to processed foods and synthetic supplements.
        </motion.p>
        <motion.button
          className="luxury-button text-lg group relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
          Join the Revolution
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
