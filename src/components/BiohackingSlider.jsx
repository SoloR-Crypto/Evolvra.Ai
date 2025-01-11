import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

const solutions = [
  {
    title: 'Golden Turmeric Elixir',
    description: 'Ancient wisdom meets modern science. Enhanced with black pepper for 2000% better absorption.',
    icon: '🌟'
  },
  {
    title: 'Liver Detox Formula',
    description: 'Premium blend of milk thistle, dandelion root, and activated charcoal.',
    icon: '🌿'
  },
  {
    title: 'Immune Boost Blend',
    description: 'Powerful combination of elderberry, echinacea, and organic zinc.',
    icon: '💪'
  },
  {
    title: 'Brain Focus Enhancement',
    description: 'Natural nootropics featuring lion\'s mane, bacopa, and rhodiola.',
    icon: '🧠'
  },
  {
    title: 'Gut Health Solution',
    description: 'Premium probiotics with prebiotics and digestive enzymes.',
    icon: '🌱'
  }
];

const BiohackingSlider = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="hero-title text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Premium Biohacking Solutions
        </motion.h2>
        
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[...solutions, ...solutions].map((solution, index) => (
              <motion.div
                key={index}
                className="flex-none w-[320px] bg-gray-800/40 backdrop-blur-md rounded-xl p-8 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{solution.icon}</span>
                  <FaLeaf className="text-primary-500 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
                <p className="text-gray-300 text-sm">{solution.description}</p>
                <button className="mt-4 text-primary-400 hover:text-primary-300 flex items-center text-sm font-medium">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiohackingSlider;
