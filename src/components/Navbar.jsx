
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ['Shop', 'Protocols', 'Research', 'Community', 'About', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 nav-gradient nav-glass ${
        isScrolled ? 'py-4' : 'py-6'
      } transition-all duration-500`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Navigation - Hidden on Mobile */}
          <div className="hidden md:flex space-x-8">
            {menuItems.slice(0, 3).map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to={`/${item.toLowerCase()}`}
                  className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary-400 to-primary-300 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-primary-400/20 to-primary-300/20 p-3 rounded-full">
                <FaLeaf className="w-6 h-6 md:w-8 md:h-8 text-primary-400" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-bold text-white tracking-wider">
                  EVOLVRA
                </span>
                <span className="text-xs md:text-sm text-primary-400 tracking-widest">NATURAL HEALTH</span>
              </div>
            </motion.div>
          </Link>

          {/* Right Navigation - Hidden on Mobile */}
          <div className="hidden md:flex space-x-8">
            {menuItems.slice(3).map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to={`/${item.toLowerCase()}`}
                  className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary-400 to-primary-300 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden mt-6"
            >
              <div className="glass-card rounded-xl border border-gray-700/30 p-4">
                <div className="flex flex-col space-y-3">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="relative group"
                    >
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg bg-gray-800/30 backdrop-blur-sm hover:bg-primary-500/10 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg font-medium">{item}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
