import Link from 'next/link';

const innovationStories = [
  {
    title: 'AI-Driven Energy Optimization: How CES Transformed Grid Management',
    description: 'Discover how CES implemented machine learning algorithms to optimize energy distribution across multiple ISOs, resulting in 15% efficiency improvements.',
    category: 'Technology Innovation',
    date: 'November 2024',
    impact: '15% efficiency improvement',
    image: '/images/innovation/ai-optimization.jpg'
  },
  {
    title: 'Blockchain for Energy Trading: CES Pioneers Decentralized Markets',
    description: 'CES developed a blockchain-based platform for peer-to-peer energy trading, enabling microgrids to participate directly in wholesale markets.',
    category: 'Digital Transformation',
    date: 'October 2024',
    impact: 'New market participation model',
    image: '/images/innovation/blockchain-trading.jpg'
  },
  {
    title: 'Hydrogen Storage Breakthrough: CES Advances Clean Energy Storage',
    description: 'Our research team developed innovative hydrogen storage solutions that maintain 98% efficiency over extended periods.',
    category: 'Clean Energy',
    date: 'September 2024',
    impact: '98% storage efficiency',
    image: '/images/innovation/hydrogen-storage.jpg'
  },
  {
    title: 'IoT-Enabled Demand Response: Real-Time Energy Management',
    description: 'CES deployed an IoT network covering 50,000+ endpoints, enabling real-time demand response across multiple utility territories.',
    category: 'Smart Grid',
    date: 'August 2024',
    impact: '50,000+ connected devices',
    image: '/images/innovation/iot-demand.jpg'
  },
  {
    title: 'Predictive Analytics for Asset Management',
    description: 'Using advanced machine learning, CES predicts equipment failures 60 days in advance, reducing maintenance costs by 40%.',
    category: 'Predictive Maintenance',
    date: 'July 2024',
    impact: '40% cost reduction',
    image: '/images/innovation/predictive-analytics.jpg'
  },
  {
    title: 'Virtual Power Plants: CES Orchestrates Distributed Energy Resources',
    description: 'CES successfully aggregated 500MW of distributed solar, storage, and demand response assets into a single virtual power plant.',
    category: 'DER Integration',
    date: 'June 2024',
    impact: '500MW aggregated capacity',
    image: '/images/innovation/virtual-power-plant.jpg'
  }
];

const innovationCategories = [
  'All',
  'Technology Innovation',
  'Digital Transformation',
  'Clean Energy',
  'Smart Grid',
  'Predictive Maintenance',
  'DER Integration'
];

export default function InnovationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Innovation Stories
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-4xl mx-auto">
              Discover how CES is pioneering the future of energy through cutting-edge technology, strategic partnerships, and groundbreaking solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">AI & Machine Learning</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Clean Energy</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Digital Transformation</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Smart Grid Technology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">CES Innovation Portfolio</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From AI-driven optimization to blockchain-based trading platforms, explore the technologies shaping the future of energy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {innovationStories.map((story, index) => (
              <article key={index} className="bg-slate-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-sm font-medium">{story.category}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {story.category}
                    </span>
                    <span className="text-xs text-slate-500">{story.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {story.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      {story.impact}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Learn More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Innovation by Category</h2>
            <p className="text-lg text-slate-600">
              Explore CES innovations across different technology domains
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI & Machine Learning</h3>
              <p className="text-slate-600 text-sm mb-4">
                Advanced algorithms for energy optimization, predictive maintenance, and automated decision-making.
              </p>
              <span className="text-blue-600 font-medium text-sm">6 active projects →</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Clean Energy Storage</h3>
              <p className="text-slate-600 text-sm mb-4">
                Breakthrough solutions for hydrogen, battery, and thermal energy storage technologies.
              </p>
              <span className="text-blue-600 font-medium text-sm">4 active projects →</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Grid Technology</h3>
              <p className="text-slate-600 text-sm mb-4">
                IoT-enabled infrastructure for real-time monitoring, control, and optimization of energy systems.
              </p>
              <span className="text-blue-600 font-medium text-sm">8 active projects →</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Blockchain & Digital Assets</h3>
              <p className="text-slate-600 text-sm mb-4">
                Decentralized platforms for energy trading, carbon credits, and digital asset management.
              </p>
              <span className="text-blue-600 font-medium text-sm">3 active projects →</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Predictive Analytics</h3>
              <p className="text-slate-600 text-sm mb-4">
                Data-driven insights for asset performance, market forecasting, and risk management.
              </p>
              <span className="text-blue-600 font-medium text-sm">5 active projects →</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Virtual Power Plants</h3>
              <p className="text-slate-600 text-sm mb-4">
                Orchestration platforms for aggregating distributed energy resources into grid-scale assets.
              </p>
              <span className="text-blue-600 font-medium text-sm">7 active projects →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Impact */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Innovation Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              CES innovations are transforming the energy industry, delivering measurable results for clients worldwide.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$2.4B+</div>
              <p className="text-blue-100">Client savings through CES innovations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500MW+</div>
              <p className="text-blue-100">Aggregated distributed energy resources</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-blue-100">Energy storage system efficiency</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">60 days</div>
              <p className="text-blue-100">Predictive maintenance lead time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Partner with CES Innovation</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your energy operations with cutting-edge technology? Let's discuss how CES innovations can drive your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start a Conversation
            </Link>
            <Link
              href="/news"
              className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              View Latest News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
