'use client';

import Link from 'next/link';
import { useState } from 'react';

const newsCategories = [
  'All',
  'News & Updates',
  'Press Releases',
  'CES Videos',
  'CES White Papers',
  'Byline Articles',
  'CES PowerTalk',
  'Events',
  'Media'
];

const newsItems = [
  // News & Updates
  {
    title: 'When Every Day Counts: How CES Saved a Top-Five Retailer $60 Million',
    category: 'News & Updates',
    date: 'October 14, 2025',
    type: 'article'
  },
  {
    title: 'Meet Alan Ackerman: Leading Market Intelligence Through Change and Innovation',
    category: 'News & Updates',
    date: 'September 19, 2025',
    type: 'article'
  },
  {
    title: 'Employee Spotlight: Rob Abraham – Bridging Innovation and Client Success',
    category: 'News & Updates',
    date: 'April 15, 2024',
    type: 'article'
  },
  {
    title: 'American Public Power Association (APPA) Podcast with CES',
    category: 'News & Updates',
    date: 'February 29, 2024',
    type: 'article'
  },
  {
    title: '2024 PJM Outlook: Tough choices loom on capacity market, plant retirements, transmission planning',
    category: 'News & Updates',
    date: 'January 24, 2024',
    type: 'article'
  },

  // Press Releases
  {
    title: 'Customized Energy Solutions and Sonoma Clean Power forge strategic partnership for Energy Storage Optimization Services',
    category: 'Press Releases',
    date: 'December 21, 2023',
    type: 'press-release'
  },
  {
    title: 'Customized Energy Solutions Partners with Peninsula Clean Energy for Innovative Energy Management Service in the California ISO Market',
    category: 'Press Releases',
    date: 'July 18, 2023',
    type: 'press-release'
  },
  {
    title: 'Evolution of Products, Services, Market Expertise Highlights Customized Energy Solutions\' 25th Anniversary',
    category: 'Press Releases',
    date: 'June 1, 2023',
    type: 'press-release'
  },
  {
    title: 'Industry leaders driving green energy and clean transportation commemorate World Energy Storage Day 2022',
    category: 'Press Releases',
    date: 'May 24, 2022',
    type: 'press-release'
  },
  {
    title: 'CES\' Bidding and Scheduling Optimization Platform Drives Increased Revenue of Solar-Plus-Storage Site for Kearsarge',
    category: 'Press Releases',
    date: 'April 28, 2022',
    type: 'press-release'
  },
  {
    title: 'Customized Energy Solutions Honored in 2022 American Business Awards for Innovative Frequency Regulation Project',
    category: 'Press Releases',
    date: 'February 9, 2022',
    type: 'press-release'
  },
  {
    title: 'CES Builds New & Improved Market Operations Center to Meet Rapidly Growing Demand',
    category: 'Press Releases',
    date: 'December 2, 2021',
    type: 'press-release'
  },
  {
    title: 'CES\' Michael Berlinski Awarded 2021 Phil Symons Energy Storage Award by ESA',
    category: 'Press Releases',
    date: 'August 18, 2021',
    type: 'press-release'
  },
  {
    title: 'Customized Energy Solutions and Sustainable Energy Advantage Launch Massachusetts Clean Peak Market Outlook Subscription Service',
    category: 'Press Releases',
    date: 'Press Release',
    type: 'press-release'
  },

  // CES Videos
  {
    title: 'CES PowerTalk – Episode 4',
    category: 'CES Videos',
    date: 'July 18, 2023',
    type: 'video'
  },
  {
    title: 'CES\'s 25th Anniversary',
    category: 'CES Videos',
    date: 'June 5, 2023',
    type: 'video'
  },
  {
    title: 'CES Industry Update – Episode 3',
    category: 'CES Videos',
    date: 'March 3, 2023',
    type: 'video'
  },
  {
    title: '2023 Customized Energy Solutions Industry Outlook',
    category: 'CES Videos',
    date: 'February 6, 2023',
    type: 'video'
  },
  {
    title: 'CES Industry Update – Episode 2',
    category: 'CES Videos',
    date: 'January 10, 2023',
    type: 'video'
  },
  {
    title: 'CES GridBOOST',
    category: 'CES Videos',
    date: 'December 16, 2022',
    type: 'video'
  },
  {
    title: 'CES Market Operations Center',
    category: 'CES Videos',
    date: 'November 30, 2022',
    type: 'video'
  },
  {
    title: 'CES Industry Update – Episode 1',
    category: 'CES Videos',
    date: 'October 30, 2024',
    type: 'video'
  },

  // CES White Papers
  {
    title: 'FERC Order 2023: Navigating the Complex Landscape for Energy Storage',
    category: 'CES White Papers',
    date: 'October 12, 2023',
    type: 'white-paper'
  },
  {
    title: 'Why NYSERDA\'s Index Storage Credit Offers New Opportunity for Storage Development',
    category: 'CES White Papers',
    date: 'July 1, 2023',
    type: 'white-paper'
  },
  {
    title: 'Canada\'s Hydrogen Pathway',
    category: 'CES White Papers',
    date: 'July 1, 2023',
    type: 'white-paper'
  },
  {
    title: 'ITC in Canada',
    category: 'CES White Papers',
    date: 'March 2, 2023',
    type: 'white-paper'
  },
  {
    title: '"Economic and Reliability Benefits of Gas-Storage Hybrid Resources in Organized Energy Markets" White Paper',
    category: 'CES White Papers',
    date: 'September 20, 2016',
    type: 'white-paper'
  },

  // Byline Articles
  {
    title: 'Modern Casting: How Fritz Winter Used Energy Demand Management to Curb Energy Costs – Matt Lollini',
    category: 'Byline Articles',
    date: 'June 19, 2023',
    type: 'article'
  },
  {
    title: 'How the Inflation Reduction Act is changing the energy storage supply chain by Vinayak Walimbe',
    category: 'Byline Articles',
    date: 'December 15, 2022',
    type: 'article'
  },

  // CES PowerTalk
  {
    title: 'CES PowerTalk – Episode 2',
    category: 'CES PowerTalk',
    date: 'October 18, 2021',
    type: 'podcast'
  },
  {
    title: 'CES PowerTalk – Episode 1',
    category: 'CES PowerTalk',
    date: 'CES PowerTalk',
    type: 'podcast'
  },

  // Events
  {
    title: 'CES to sponsor Corporate Renewables Conference',
    category: 'Events',
    date: 'September 13, 2016',
    type: 'event'
  },
  {
    title: 'Jacquie DeRosa to present at ESNA 2016',
    category: 'Events',
    date: 'August 3, 2016',
    type: 'event'
  },
  {
    title: 'CES announces Founding Sponsorship of this year\'s EMC Conference',
    category: 'Events',
    date: 'July 28, 2016',
    type: 'event'
  },
  {
    title: 'Jacquie DeRosa to speak at PlugVolt Battery Seminar',
    category: 'Events',
    date: 'December 3, 2015',
    type: 'event'
  },
  {
    title: 'Energy Storage India 3rd International Conference & Exhibition on Energy Storage & Microgrids in India',
    category: 'Events',
    date: 'March 17, 2015',
    type: 'event'
  },
  {
    title: 'Energy Storage India',
    category: 'Events',
    date: 'January 28, 2015',
    type: 'event'
  },
  {
    title: 'CES to sponsor WCEE Woman of the Year Reception & Dinner Gala',
    category: 'Events',
    date: 'September 16, 2014',
    type: 'event'
  },
  {
    title: 'Energy Storage North America – Optional Workshops – Valuing Energy Storage Services in U.S. Wholesale Markets',
    category: 'Events',
    date: 'January 30, 2014',
    type: 'event'
  },

  // Media
  {
    title: 'CES Is Attending Energy Marketing Conferences In New York City',
    category: 'Media',
    date: 'August 14, 2019',
    type: 'media'
  },
  {
    title: 'Stephen Fernands – Energy Thought Summit 2019 Profile',
    category: 'Media',
    date: 'July 8, 2019',
    type: 'media'
  },
  {
    title: 'India – Post Budget Reactions',
    category: 'Media',
    date: 'November 17, 2017',
    type: 'media'
  },
  {
    title: 'Dan Fuller, Director of Strategic Planning discusses Demand Response in the November issue of IEEE Smart Grid Newsletter',
    category: 'Media',
    date: 'October 26, 2017',
    type: 'media'
  },
  {
    title: 'Andrea Calo discusses the Coordination Rules in the Mexico Natural Gas Markets',
    category: 'Media',
    date: 'September 11, 2017',
    type: 'media'
  },
  {
    title: 'Washington State University to Lead $30M International Partnership with India',
    category: 'Media',
    date: 'December 1, 2016',
    type: 'media'
  },
  {
    title: 'Jacquie DeRosa discusses State of Charge Report on new podcast',
    category: 'Media',
    date: 'June 29, 2016',
    type: 'media'
  },
  {
    title: '2016 Energy Executive Forum – Synchronizing the Gaps',
    category: 'Media',
    date: 'April 5, 2016',
    type: 'media'
  },
  {
    title: 'Energy Storage India 2013 Episode on Bloomberg TV India',
    category: 'Media',
    date: 'April 5, 2016',
    type: 'media'
  },
  {
    title: 'Energy Storage Conference 2015',
    category: 'Media',
    date: 'October 16, 2025',
    type: 'media'
  }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'News & Updates': 'bg-blue-100 text-blue-800',
      'Press Releases': 'bg-green-100 text-green-800',
      'CES Videos': 'bg-red-100 text-red-800',
      'CES White Papers': 'bg-purple-100 text-purple-800',
      'Byline Articles': 'bg-yellow-100 text-yellow-800',
      'CES PowerTalk': 'bg-pink-100 text-pink-800',
      'Events': 'bg-indigo-100 text-indigo-800',
      'Media': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'podcast':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'white-paper':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'event':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              News & Media
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              AI-curated highlights, announcements, and event spotlights from across CES global teams.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Innovation Stories CTA */}
        <section className="mb-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Innovation Stories</h2>
          <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
            Discover how CES is driving innovation in energy markets through cutting-edge technology and strategic partnerships.
          </p>
          <Link
            href="/innovation"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Explore Innovation Stories →
          </Link>
        </section>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {newsCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item, index) => (
            <article key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{item.date}</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No news items found matching your criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, insights, and updates from Customized Energy Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
