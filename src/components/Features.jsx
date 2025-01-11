import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaLock, FaDna, FaBrain } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Natural Sovereignty",
      description: "Break free from processed foods and synthetic supplements with pure, organic solutions."
    },
    {
      icon: <FaLock />,
      title: "Hidden Knowledge",
      description: "Access exclusive datasets and ancient wisdom for optimal health and performance."
    },
    {
      icon: <FaDna />,
      title: "Biohacking Excellence",
      description: "Cutting-edge protocols optimized for maximum biological potential."
    },
    {
      icon: <FaBrain />,
      title: "Mental Liberation",
      description: "Reclaim your cognitive freedom with natural nootropics and mindfulness practices."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="luxury-card flex flex-col items-center text-center p-8 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
