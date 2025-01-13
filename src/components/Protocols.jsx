
import React from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaDna, FaBrain, FaLeaf } from 'react-icons/fa';

const Protocols = () => {
  const protocols = [
    {
      title: "Cellular Regeneration",
      icon: <FaDna className="w-6 h-6" />,
      description: "Advanced protocols for optimizing cellular health and longevity through natural compounds.",
      duration: "12 weeks"
    },
    {
      title: "Neural Enhancement",
      icon: <FaBrain className="w-6 h-6" />,
      description: "Cognitive optimization protocols combining ancient nootropics with modern neuroscience.",
      duration: "8 weeks"
    },
    {
      title: "Vital Force Restoration",
      icon: <FaLeaf className="w-6 h-6" />,
      description: "Holistic protocols for rebuilding vital energy using time-tested natural methods.",
      duration: "10 weeks"
    },
    {
      title: "Quantum Healing",
      icon: <FaFlask className="w-6 h-6" />,
      description: "Advanced energy healing protocols integrating quantum physics principles.",
      duration: "6 weeks"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="section-heading text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Advanced Protocols
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {protocols.map((protocol, index) => (
            <motion.div
              key={index}
              className="luxury-card group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary-500/20 rounded-lg">
                    {protocol.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{protocol.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{protocol.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-400">{protocol.duration}</span>
                  <button className="luxury-button">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Protocols;
