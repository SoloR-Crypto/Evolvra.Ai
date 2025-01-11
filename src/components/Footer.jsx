import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTwitter, FaInstagram, FaTelegram, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-primary-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-primary-500 text-2xl" />
              <span className="text-xl font-bold text-white">EVOLVRA</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm text-center md:text-left">
              Empowering natural health sovereignty through ancient wisdom and modern science.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Protocols', 'Research', 'Community', 'About'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-primary-400 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {[FaTwitter, FaInstagram, FaTelegram, FaDiscord].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                >
                  <Icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Evolvra.ai - Reclaim Your Health Sovereignty
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
