
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFileAlt, FaChartLine, FaMicroscope } from 'react-icons/fa';

const Research = () => {
  const research = [
    {
      title: "Longevity Studies",
      icon: <FaChartLine className="w-6 h-6" />,
      category: "Clinical Research",
      status: "Ongoing",
      abstract: "Investigating the effects of natural compounds on telomere length and cellular aging markers."
    },
    {
      title: "Consciousness Expansion",
      icon: <FaMicroscope className="w-6 h-6" />,
      category: "Neuroscience",
      status: "Published",
      abstract: "Mapping neural patterns during altered states induced by traditional plant medicines."
    },
    {
      title: "Quantum Biology",
      icon: <FaSearch className="w-6 h-6" />,
      category: "Theoretical Research",
      status: "Peer Review",
      abstract: "Exploring quantum effects in biological systems and their implications for healing."
    },
    {
      title: "Ancient Wisdom Validation",
      icon: <FaFileAlt className="w-6 h-6" />,
      category: "Historical Analysis",
      status: "Completed",
      abstract: "Scientific validation of ancient healing practices through modern research methods."
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
          Research & Studies
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {research.map((study, index) => (
            <motion.div
              key={index}
              className="luxury-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary-500/20 rounded-lg">
                      {study.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{study.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    study.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                    study.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {study.status}
                  </span>
                </div>
                <p className="text-primary-400 text-sm mb-2">{study.category}</p>
                <p className="text-gray-400">{study.abstract}</p>
                <button className="luxury-button mt-4">
                  View Full Study
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research;
