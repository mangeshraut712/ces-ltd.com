import Link from 'next/link';

const jobOpenings = [
  {
    title: 'Senior Market & Operations Analyst – Western Region',
    location: 'Western Region',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Market Operations'
  },
  {
    title: 'Scheduling Coordinator / Optimization Analyst',
    location: 'Philadelphia, PA',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Operations'
  },
  {
    title: 'Director of Emerging Technologies',
    location: 'Philadelphia, PA',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Technology'
  },
  {
    title: 'Vice President of Sales and Marketing',
    location: 'Philadelphia, PA',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Sales & Marketing'
  },
  {
    title: 'Senior Analyst – Retail Market Services (Energy Sector)',
    location: 'Philadelphia, PA',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Retail Services'
  },
  {
    title: 'Business Development Associate – Power and Generation Management Services',
    location: 'Philadelphia, PA',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Business Development'
  },
  {
    title: 'Market Analyst – Consulting Services Team – Pune',
    location: 'Pune, India',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Consulting'
  },
  {
    title: 'Data Operations Analyst – Retail Market Services – HCMC',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'Data Operations'
  },
  {
    title: 'Junior Network Administrator',
    location: 'Philadelphia, PA, USA',
    type: 'Full-time',
    posted: 'October 23, 2024',
    department: 'IT Infrastructure',
    expired: true
  }
];

const additionalJobs = [
  {
    title: 'Server & Application Services Administrator',
    location: 'Philadelphia, PA',
    level: 'Associate'
  },
  {
    title: 'Infrastructure Services Technical Lead / Developer',
    location: 'Ho Chi Minh City, Vietnam',
    level: 'Associate'
  },
  {
    title: 'Program Associate, Energy Access and Livelihoods',
    location: 'Aizawl, India',
    level: 'Not Applicable'
  },
  {
    title: 'Director – Energy Optimization & Analytics Strategy',
    location: 'Philadelphia, PA',
    level: 'Associate'
  },
  {
    title: 'Analyst - Congestion Management Services v2',
    location: 'Philadelphia, PA',
    level: 'Associate'
  },
  {
    title: 'Key Account Director',
    location: 'Philadelphia, PA',
    level: 'Associate'
  },
  {
    title: 'Senior Full-Stack .Net Developer',
    location: 'Ho Chi Minh City, Vietnam',
    level: 'Associate'
  },
  {
    title: 'Analyst - Congestion Management Services',
    location: 'Philadelphia, PA',
    level: 'Director'
  },
  {
    title: 'Director - Optimization Analytics',
    location: 'Pune, India',
    level: 'Director'
  },
  {
    title: 'Director - Optimization Analytics',
    location: 'Philadelphia, PA',
    level: 'Director'
  },
  {
    title: 'Senior Marketing Manager',
    location: 'Philadelphia, PA',
    level: 'Mid-Senior Level'
  },
  {
    title: 'Marketing Manager',
    location: 'Philadelphia, PA',
    level: 'Director'
  },
  {
    title: 'Director of Business Development',
    location: 'Philadelphia, PA',
    level: 'Director'
  },
  {
    title: 'Senior Windows Server Administrator',
    location: 'Ho Chi Minh City, Vietnam',
    level: 'Associate'
  },
  {
    title: 'Renewable Compliance Analyst',
    location: 'Philadelphia, PA',
    level: 'Associate'
  },
  {
    title: 'Lead Consultant',
    location: 'Carmel, IN',
    level: 'Mid-Senior Level'
  },
  {
    title: 'Program Associate – Rural Electrification and Livelihoods',
    location: 'Tuensang, India',
    level: 'Mid-Senior Level'
  },
  {
    title: 'Technical Writer_Contractor',
    location: 'Philadelphia, PA',
    level: 'Not Applicable'
  },
  {
    title: 'Data Operations Analyst – Retail Market Services - HCMC',
    location: 'Ho Chi Minh City, Vietnam',
    level: 'Associate'
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Shape the future of energy markets with Customized Energy Solutions
            </p>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              As one of the fastest growing INC 500 companies, we offer opportunities for significant professional growth in an exciting and dynamic work environment.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join CES Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Join CES?</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Work in a fun and fast-paced industry with highly motivated, innovative, and passionate associates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">International Experience</h3>
              <p className="text-slate-600">Work with associates around the world and gain global perspectives.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast-Paced Industry</h3>
              <p className="text-slate-600">Be part of the dynamic and rapidly evolving energy sector.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Collaborative Team</h3>
              <p className="text-slate-600">Work alongside highly motivated and innovative professionals.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Professional Growth</h3>
              <p className="text-slate-600">Focus on both team success and personal development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  To have a world-wide presence wherever deregulated electricity or natural gas markets exist
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  To materially accelerate the commercial application of new energy technologies and free energy market structures
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  To represent the highest level of energy information technology and services available to clients world-wide
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed">
                Customized Energy Solutions is committed to promoting economic development through the advancement of transparent, efficient, and nondiscriminatory wholesale and retail electricity and natural gas energy markets. We focus on empowering our clients by sharing our understanding of the workings of the energy markets and related new technologies and supporting our clients' operations in those markets. Through all things, we desire to honor God and our clients through the quality of our services and solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Awards & Recognition</h2>
            <p className="text-lg text-slate-600">
              Recognized regionally and nationally for sustained growth and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">INC 500 | 5000</h3>
              <p className="text-slate-600">Recognized for impressive and sustained growth</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Philadelphia Business Journal</h3>
              <p className="text-slate-600">Top 100 Companies in Philadelphia, Hall of Fame</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Best Places to Work</h3>
              <p className="text-slate-600">2013 Philadelphia Business Journal recognition</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Stevie Award</h3>
              <p className="text-slate-600">Bronze in Energy Industry Innovation of the Year (2022)</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">INC Fastest Growing</h3>
              <p className="text-slate-600">Ranked 15th fastest growing energy company in 2008</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Regional Excellence</h3>
              <p className="text-slate-600">Five or more consecutive years of recognition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Current Openings</h2>
            <p className="text-lg text-slate-600">
              Join our growing team and help shape the future of energy markets
            </p>
          </div>

          {/* Featured Jobs */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Featured Positions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job, index) => (
                <div key={index} className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${job.expired ? 'opacity-60' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-slate-900">{job.title}</h4>
                    {job.expired && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Expired
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-medium">Location:</span> {job.location}</p>
                    <p><span className="font-medium">Type:</span> {job.type}</p>
                    <p><span className="font-medium">Department:</span> {job.department}</p>
                    <p><span className="font-medium">Posted:</span> {job.posted}</p>
                  </div>
                  {!job.expired && (
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Jobs */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">All Open Positions</h3>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {additionalJobs.map((job, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{job.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{job.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {job.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Work */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Remote Work Options Available</h2>
          <p className="text-xl text-blue-100 mb-8">
            Many of our positions offer flexible remote work arrangements
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Contact Us About Opportunities
          </Link>
        </div>
      </section>
    </div>
  );
}
