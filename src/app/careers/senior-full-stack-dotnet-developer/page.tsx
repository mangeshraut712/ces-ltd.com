import Link from 'next/link';

const relatedJobs = [
  {
    title: 'Infrastructure Services Technical Lead / Developer',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time'
  },
  {
    title: 'Senior Windows Server Administrator',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time'
  },
  {
    title: 'Data Operations Analyst – Retail Market Services - HCMC',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time'
  }
];

export default function SeniorFullStackDeveloperPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/careers"
              className="text-blue-200 hover:text-white transition-colors"
            >
              ← Back to Careers
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Senior Full-Stack .Net Developer
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-100">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ho Chi Minh City, Vietnam
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Full-time
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Description */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Company Description</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  Customized Energy Solutions (CES), a privately-held company, is a leading service provider of market intelligence and operational support services to companies participating in the retail and wholesale electric and natural gas markets. Utilizing deep know-how developed since the inception of the deregulated energy markets, CES provides accurate & timely analysis on regulatory changes, market opportunities, and operational efficiencies for electricity and natural gas commodities.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  CES is also a third-party asset manager of more than 13,000 MWs of renewable and conventional generation resources across all ISOs in the United States, Ontario, Canada and Guam. CES empowers clients to achieve their goals by helping them navigate the evolving energy markets, complex market rules, and new energy technologies.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Customized Energy Solutions Ltd. has been recognized regionally and nationally for its impressive and sustained growth, including INC. 500 | 5000 and The Philadelphia Business Journal as a Top 100 Companies in Philadelphia, Hall of Fame for five or more consecutive years. It was ranked as one of the "Best Places to Work" by the Philadelphia Business Journal.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Our team of associates at CES is highly motivated, innovative, and passionate about providing excellent Services to our clients. We look for individuals interested in growing with our company, and working in an exciting, open and collegial work environment. Our main office is in Philadelphia, with satellite offices in various U.S. states, Canada, Japan, India and Vietnam.
                </p>
              </div>
            </section>

            {/* Job Description */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Job Description</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  We have an immediate need for a Senior Full Stack Software Developer specializing in Microsoft stack technologies (.NET, .NET Core, C#, SQL Server). This role will help drive the design and build of systems in support of CES's Retail Services business line, which is the largest and fastest growing in the company.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Success in this role requires a candidate with a large-scale enterprise software engineering mindset and ability to write elegant, scalable, and reliable code following architectural best practices. You have a curiosity and enthusiasm for the Energy industry, an eagerness to investigate and resolve issues, and a passion to refactor code and build systems the right way. You are a creative thinker and strong problem solver with an aptitude for picking up new technologies. You will be excited to mentor junior developers, and willing to collaborate and learn from other senior technologists in the company.
                </p>
              </div>
            </section>

            {/* Responsibilities */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Responsibilities</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Build web-based, N-tier software products in a complex end-to-end ecosystem
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Write clean, testable, scalable, and reliable code
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Create and maintain queries, procedures, functions, and other relational database artifacts
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Create and maintain business objects, libraries, and other middle-tier artifacts
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Create and maintain user interface code and other improvements related to the user experience
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Work closely with business analysts and other developers to collaboratively build software
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Work closely with architects to ensure software design aligns with standards and best practices
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Work closely with quality assurance testers to support testing and validation activities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Work closely with project managers and delivery leadership to estimate delivery effort
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Work closely with product owners and technology leadership to ensure software build and delivery priorities are aligned with tactical and strategic goals
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Assist IT Operations / Production Support engineers in the triage, analysis, and remediation of production issues
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Follow the latest technology trends and suggest ideas for improvement
                </li>
              </ul>
            </section>

            {/* Qualifications */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Qualifications</h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Required</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Relevant work experience in a custom software development environment building and supporting large transactional systems
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Over 10 years of full-stack development on client-facing, web-based, multi-tier applications
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Up-to-date experience utilizing .NET, .NET Core, C#
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience in database development working with transactional data models
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Proficiency writing SQL queries for Microsoft SQL Server (Transact-SQL)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Good command of various application development design patterns
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Database development experience working with transactional and dimensional data models
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with Git-based distributed source control tools, such as BitBucket or Github
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Strong analytical and quantitative skills
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Excellent verbal and written skills to communicate in a clear and effective manner in the English language
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Ability to work both independently and collaboratively
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Ability to work well in a deadline-driven team environment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Ability to think "outside the box" by developing and implementing improvements to processes and tools
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferred</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Technical degree in computer science, information systems, engineering, or equivalent
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience in performing development or analysis activities within one or more US electric power wholesale markets (PJM, NYISO, ISONE, MISO, CAISO, ERCOT, SPP) or other non-US equivalent
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with Atlassian SDLC tools, particularly Jira
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with both Agile/Scrum and Waterfall system development life cycle methodologies
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with DevOps and Continuous Integration/Deployment concepts
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with Dev Express or Telerik Web Controls
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with ORM, especially EF 6.0 and EF Core
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience building ETL integrations using SQL Server Integration Services (SSIS)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience developing reports and dashboards using SQL Server Reporting Services (SSRS)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Proficient with MS SQL Server 2019
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience in JavaScript, plus one or several of the JS frameworks (particularly Angular)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with parallel / multi-threaded / multi-instanced programming / processes
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with REST-based API development with XML/JSON
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with Windows Services and IIS Management
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Good command of WCF, Web Services, REST, and SOA
                  </li>
                </ul>
              </div>
            </section>

            {/* Additional Information */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Information</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  At Customized Energy Solutions, we offer a competitive salary based on experience, along with performance-based bonuses, health coverage, and tuition reimbursement to support your growth.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We look for colleagues who can work independently, collaborate effectively, and embrace continuous learning and knowledge-sharing. Together, we foster a supportive environment where teams grow, innovate, and build sustainable solutions for the future.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Customized Energy Solutions provides equal employment opportunities to all applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or status as a protected veteran.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Now Card */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
              <p className="mb-6 text-blue-100">
                Join our team and help shape the future of energy markets.
              </p>
              <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Apply Now
              </button>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Location:</span>
                  <span className="text-slate-900 font-medium">Ho Chi Minh City, Vietnam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Employment Type:</span>
                  <span className="text-slate-900 font-medium">Full-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Experience Level:</span>
                  <span className="text-slate-900 font-medium">Senior</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Department:</span>
                  <span className="text-slate-900 font-medium">Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Posted:</span>
                  <span className="text-slate-900 font-medium">Recently</span>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Other Jobs at CES</h3>
              <div className="space-y-4">
                {relatedJobs.map((job, index) => (
                  <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-slate-900 mb-1">{job.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">{job.location}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/careers"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                View all jobs →
              </Link>
            </div>

            {/* Share Job */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Share This Job</h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  LinkedIn
                </button>
                <button className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
