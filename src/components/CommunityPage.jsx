import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendar, FaTrophy, FaInfoCircle } from 'react-icons/fa';

const CommunityPage = () => {
  const { slug } = useParams();

  // Mock data - replace with actual data fetching
  const communityData = {
    'ancient-wisdom-unlocked': {
      title: 'Ancient Wisdom Unlocked',
      description: 'Join the elite community of biohackers discovering hidden protocols for optimal human performance ⚡',
      members: '4.3k',
      price: '$29/month',
      category: 'Biohacking',
      icon: '🧬'
    },
    'truth-seekers-hub': {
      title: 'Truth Seekers Hub',
      description: 'Access classified health data and forbidden knowledge suppressed by big pharma 🔓',
      members: '2.1k',
      price: '$19/month',
      category: 'Hidden Datasets',
      icon: '📊'
    },
    'neural-freedom-protocol': {
      title: 'Neural Freedom Protocol',
      description: 'Break free from societal programming and reclaim your cognitive sovereignty 🧠',
      members: '1.5k',
      price: '$24/month',
      category: 'Mind Control',
      icon: '🧠'
    }
  };

  const community = communityData[slug];

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-center">
        <h1 className="text-white text-2xl">Community not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="bg-gray-800/40 rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl">{community.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-white">{community.title}</h1>
              <p className="text-gray-400">{community.category}</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg mb-6">{community.description}</p>
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <FaUsers />
              <span>{community.members} Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendar />
              <span>Created Sep 2023</span>
            </div>
            <div className="text-primary-400">{community.price}</div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-2 mb-8 md:flex md:space-x-4 md:gap-0">
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {['Community', 'Classroom', 'Calendar'].map((item) => (
              <button
                key={item}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  item === 'Community'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {['Members', 'Leaderboards', 'About'].map((item) => (
              <button
                key={item}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/40"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/40 rounded-xl p-6 mb-6">
              <textarea
                placeholder="Write something..."
                className="w-full bg-gray-900/50 rounded-lg p-4 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-primary-500"
                rows="3"
              />
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {[1, 2, 3].map((post) => (
                <motion.div
                  key={post}
                  className="bg-gray-800/40 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />
                    <div>
                      <h3 className="text-white font-medium">Community Member</h3>
                      <p className="text-gray-400 text-sm">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Sample post content. Replace with actual community posts.
                  </p>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <button className="hover:text-white">Like</button>
                    <button className="hover:text-white">Comment</button>
                    <button className="hover:text-white">Share</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              className="bg-gray-800/40 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-white font-semibold mb-4 flex items-center">
                <FaInfoCircle className="mr-2" />
                About Community
              </h2>
              <p className="text-gray-300 mb-4">{community.description}</p>
              <button className="w-full bg-primary-500 text-white rounded-lg py-2 font-medium hover:bg-primary-600 transition-colors">
                Join Community
              </button>
            </motion.div>

            <motion.div
              className="bg-gray-800/40 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-white font-semibold mb-4 flex items-center">
                <FaTrophy className="mr-2" />
                Top Contributors
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((member) => (
                  <div key={member} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full" />
                    <div className="flex-1">
                      <h3 className="text-white">Member Name</h3>
                      <p className="text-gray-400 text-sm">1,234 points</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
