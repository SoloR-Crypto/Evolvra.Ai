
import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaDna, FaUsers, FaGlobe } from 'react-icons/fa';

const About = () => {
  const mission = [
    {
      icon: <FaLeaf className="w-6 h-6" />,
      title: "Natural Wisdom",
      description: "Preserving and advancing ancient healing knowledge for modern times."
    },
    {
      icon: <FaDna className="w-6 h-6" />,
      title: "Scientific Innovation",
      description: "Bridging traditional wisdom with cutting-edge scientific research."
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Community Empowerment",
      description: "Building a global community of health sovereignty advocates."
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Global Impact",
      description: "Transforming global health paradigms through natural solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-heading mb-6">Our Mission</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Empowering individuals to reclaim their health sovereignty through the marriage of ancient wisdom and modern science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mission.map((item, index) => (
            <motion.div
              key={index}
              className="luxury-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 flex items-start space-x-4">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Movement</h2>
          <p className="text-gray-400 mb-6">
            Be part of a revolutionary approach to health and wellness. Together, we're building a future where natural healing meets scientific innovation.
          </p>
          <button className="luxury-button">
            Connect With Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
