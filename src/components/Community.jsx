import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLeaf, FaDna, FaBrain, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const communities = [
    {
      id: 1,
      rank: 3,
      category: 'Biohacking',
      image: '/biohacking-1.jpg',
      title: 'Ancient Wisdom Unlocked',
      description: 'Join the elite community of biohackers discovering hidden protocols for optimal human performance ⚡',
      privacy: 'Private',
      members: '4.3k',
      price: '$29/month',
      icon: '🧬',
      slug: 'ancient-wisdom-unlocked'
    },
    {
      id: 2,
      rank: 8,
      category: 'Hidden Datasets',
      image: '/dataset-1.jpg',
      title: 'Truth Seekers Hub',
      description: 'Access classified health data and forbidden knowledge suppressed by big pharma 🔓',
      privacy: 'Private',
      members: '2.1k',
      price: '$19/month',
      icon: '📊',
      slug: 'truth-seekers-hub'
    },
    {
      id: 3,
      rank: 12,
      category: 'Mind Control',
      image: '/mindcontrol-1.jpg',
      title: 'Neural Freedom Protocol',
      description: 'Break free from societal programming and reclaim your cognitive sovereignty 🧠',
      privacy: 'Private',
      members: '1.5k',
      price: '$24/month',
      icon: '🧠',
      slug: 'neural-freedom-protocol'
    }
  ];

  const categories = [
    { name: 'All', icon: <FaLeaf /> },
    { name: 'Biohacking', icon: <FaDna /> },
    { name: 'Ancient Wisdom', icon: <FaLeaf /> },
    { name: 'Health Freedom', icon: <FaLeaf /> },
    { name: 'Hidden Datasets', icon: <FaSearch /> },
    { name: 'Mind Control', icon: <FaBrain /> },
    { name: 'Science', icon: <FaDna /> }
  ];

  const filteredCommunities = communities.filter(community => 
    (selectedCategory === 'All' || community.category === selectedCategory) &&
    (community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     community.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.h1 
            className="hero-title text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Communities
          </motion.h1>
          <p className="text-gray-400 text-lg">
            {filteredCommunities.length} results for "{searchQuery || 'all'}"
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search communities..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Categories - Desktop */}
          <div className="hidden md:flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-sm ${
                  selectedCategory === category.name
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Categories - Mobile Dropdown */}
          <select
            className="md:hidden w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Link 
              to={`/community/${community.slug}`} 
              key={community.id}
              className="block"
            >
              <motion.div
                className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900">
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                    #{community.rank} in {community.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{community.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{community.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6 flex-grow">{community.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <FaLock className="text-xs" />
                      <span>{community.privacy}</span>
                      <span>•</span>
                      <span>{community.members} Members</span>
                    </div>
                    <span className="text-primary-400">{community.price}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
