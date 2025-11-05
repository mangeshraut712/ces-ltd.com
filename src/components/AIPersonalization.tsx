'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfile {
  id: string;
  name: string;
  role: 'client' | 'investor' | 'partner' | 'general';
  interests: string[];
  location: string;
  industry: string;
}

interface Recommendation {
  id: string;
  type: 'project' | 'service' | 'news' | 'event';
  title: string;
  description: string;
  relevance: number;
  image: string;
  action: string;
}

const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Energy Executive',
  role: 'client',
  interests: ['renewable energy', 'sustainable construction', 'IoT', 'carbon reduction'],
  location: 'Europe',
  industry: 'Energy & Construction',
};

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'project',
    title: 'North Sea Offshore Wind Farm',
    description: 'Based on your interest in renewable energy, this 500MW offshore project matches your location and industry focus.',
    relevance: 95,
    image: '/api/placeholder/300/200',
    action: 'View Project Details',
  },
  {
    id: '2',
    type: 'service',
    title: 'AI-Predictive Maintenance',
    description: 'Our new IoT-based predictive maintenance service can reduce downtime by 40% for your operations.',
    relevance: 88,
    image: '/api/placeholder/300/200',
    action: 'Explore Service',
  },
  {
    id: '3',
    type: 'news',
    title: 'EU Green Deal Updates',
    description: 'Latest developments in European sustainable energy policies that may impact your business.',
    relevance: 82,
    image: '/api/placeholder/300/200',
    action: 'Read Article',
  },
  {
    id: '4',
    type: 'event',
    title: 'CES Ltd. VR Summit 2025',
    description: 'Join our virtual summit on emerging technologies in energy and construction.',
    relevance: 75,
    image: '/api/placeholder/300/200',
    action: 'Register Now',
  },
];

export default function AIPersonalization() {
  const [userProfile] = useState<UserProfile>(mockUserProfile);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate AI analysis
  const analyzeUserBehavior = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate personalized updates
    const updatedRecommendations = recommendations.map(rec => ({
      ...rec,
      relevance: Math.min(100, rec.relevance + Math.floor(Math.random() * 10)),
    })).sort((a, b) => b.relevance - a.relevance);

    setRecommendations(updatedRecommendations);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    // Initial analysis on component mount
    const performInitialAnalysis = async () => {
      await analyzeUserBehavior();
    };
    performInitialAnalysis();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-green-400';
    if (relevance >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRelevanceBg = (relevance: number) => {
    if (relevance >= 90) return 'bg-green-500/20 border-green-500/30';
    if (relevance >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="w-full bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">AI-Personalized Dashboard</h3>
            <p className="text-gray-300">Content tailored specifically for {userProfile.name}</p>
          </div>

          <div className="flex items-center space-x-4">
            {isAnalyzing ? (
              <div className="flex items-center space-x-2 text-blue-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-sm">Analyzing...</span>
              </div>
            ) : (
              <motion.button
                onClick={analyzeUserBehavior}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Refresh AI Analysis
              </motion.button>
            )}
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h4 className="text-white font-semibold mb-4">Your Profile Insights</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{userProfile.interests.length}</div>
              <div className="text-gray-300 text-sm">Key Interests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{userProfile.location}</div>
              <div className="text-gray-300 text-sm">Location Focus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white capitalize">{userProfile.role}</div>
              <div className="text-gray-300 text-sm">User Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{recommendations.length}</div>
              <div className="text-gray-300 text-sm">Personalized Items</div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-white font-medium mb-2">Interests Detected:</h5>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border cursor-pointer hover:bg-white/20 transition-all ${getRelevanceBg(rec.relevance)}`}
              onClick={() => setSelectedRecommendation(rec)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-lg font-bold">{rec.type.toUpperCase()}</div>
                  <div className={`text-sm ${getRelevanceColor(rec.relevance)}`}>
                    {rec.relevance}% Match
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h5 className="text-white font-semibold mb-2">{rec.title}</h5>
                <p className="text-gray-300 text-sm mb-3">{rec.description}</p>

                <div className="flex justify-between items-center">
                  <motion.button
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {rec.action}
                  </motion.button>

                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getRelevanceColor(rec.relevance).replace('text-', 'bg-')}`}></div>
                    <span className={`text-xs ${getRelevanceColor(rec.relevance)}`}>
                      {rec.relevance}% relevant
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-4">AI Insights & Predictions</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h5 className="text-white font-medium mb-2">Market Trend</h5>
              <p className="text-gray-300 text-sm">
                Based on your profile, renewable energy investments are predicted to grow 25% in Europe next quarter.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h5 className="text-white font-medium mb-2">Opportunity Alert</h5>
              <p className="text-gray-300 text-sm">
                New IoT partnership opportunity matches your interest in smart construction technologies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h5 className="text-white font-medium mb-2">Priority Action</h5>
              <p className="text-gray-300 text-sm">
                Schedule a VR meeting with our experts to discuss your upcoming wind farm project.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Recommendation Modal */}
        <AnimatePresence>
          {selectedRecommendation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedRecommendation(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="text-2xl font-bold text-white mb-4">{selectedRecommendation.title}</h4>

                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedRecommendation.relevance >= 90 ? 'bg-green-500/20 text-green-300' :
                    selectedRecommendation.relevance >= 70 ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {selectedRecommendation.relevance}% AI Match
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{selectedRecommendation.description}</p>

                <div className="flex space-x-4">
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedRecommendation.action}
                  </motion.button>
                  <button
                    onClick={() => setSelectedRecommendation(null)}
                    className="bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}