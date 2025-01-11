import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
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
          className="revolution-button bg-primary-500 text-white font-bold py-3 px-8 rounded-lg text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join the Revolution
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
