import Image from 'next/image';
import Link from 'next/link';

export default function GenerationSolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Generation Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-4xl mx-auto">
              Comprehensive hosted software and generation service solutions, CES | GOLD.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4">Key capabilities</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3"></span>
                  Hosted market operations
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3"></span>
                  Real-time monitoring
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3"></span>
                  Settlement & billing
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mr-3"></span>
                  Regulatory compliance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CES GOLD Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">CES GOLD</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-amber-700 mb-6">
                  Advancing the growth of power generation with hosted software solutions, expertise, and service since 1998.
                </p>
                <div className="bg-white/50 rounded p-4">
                  <h3 className="text-xl font-bold text-amber-800 mb-4">WHY CES?</h3>
                  <ul className="text-amber-700 space-y-2">
                    <li>• Our 24 hour performance-guaranteed Market Operations Center provides backup and customized procedures</li>
                    <li>• Hosted solutions for monitoring and control</li>
                    <li>• Price-risk management strategy and execution. Optimization of assets.</li>
                    <li>• ISO curtailment management</li>
                    <li>• Expertise & service for market entry, interconnection assistance, REC compliance, and regulatory monitoring</li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/General.png"
                  alt="CES Generation Solutions"
                  width={500}
                  height={350}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Business Lines */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Business Lines</h2>

            {/* Power Generation Management */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Power Generation Management</h3>
              <p className="text-slate-600 mb-4">
                Market Entry & Emerging Technology | 24 Hour Real-Time Market Services | Telemetry Services | Forward and Ancillary Service Market Services | Settlement Services and Reporting | Market Intelligent Reporting | Renewable Resource Management | Managed Portfolio Services
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Features and Benefits</h4>
                <p className="text-blue-700 mb-3">
                  Comprehensive market coverage, including: CAISO, MISO, SPP, ISO-NE, NYISO, ERCOT, PJM, CENACE (Mexico) and AESO/IESO (Canada).
                </p>
                <p className="text-blue-700 mb-3">
                  CES | MarketIQ services tailored to client needs including succinct, informative reports. Schedule a one-on-one call to review stakeholder activity for timely analysis and discussion.
                </p>
                <p className="text-blue-700">
                  Get access to subject-matter experts on all covered topics including: resource adequacy, capacity, demand response, financial transmission rights, intermittent resources, system planning, ancillary services, and settlements.
                </p>
              </div>
            </div>

            {/* Market Entry & Emerging Technology */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Market Entry & Emerging Technology</h3>
              <p className="text-green-700 mb-4">
                CES | GOLD CES | Consulting - CES assists clients to enter and capture opportunities in ever more complex ISO/RTO markets with both standard and emerging technology resources. The growth of intermittent renewable resources onto the grid is creating unique opportunities for flexible generation and the addition of flexible storage resources. The world of energy is on the edge of a new technological revolution.
              </p>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">Features and Benefits</h4>
                <p className="text-green-700 mb-3">
                  CES offers guidance and analysis in understanding the power markets, developing a business plan, performing feasibility analysis, and understanding the value proposition of integrating current and next-generation technologies.
                </p>
                <p className="text-green-700 mb-3">
                  We assist organizations with every aspect of energy storage, renewable energy, and Smart Grid, as well as with other technologies, including compressed air energy storage (CAES), advanced batteries, flywheels, photovoltaics (PV), wind, pumped hydro, biomass, biogas/landfill gas, electric vehicles, and thermal storage.
                </p>
                <p className="text-green-700">
                  Our experts can assist you in securing partners and venture capital, evaluating environmental attributes such as RECs and carbon offsets, and understanding and complying with federal, state, ISO/RTO, and utility regulations.
                </p>
              </div>
              <p className="text-green-700">
                CES&rsquo;s cross-market analysts will assist with selecting interconnection locations for new projects, as well as providing expert guidance through the ISO/RTO Interconnection Processes and market participation registration and testing processes.
              </p>
            </div>

            {/* 24 Hour Real-Time Market Services */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">24 Hour Real-Time Market Services</h3>
              <p className="text-purple-700 mb-4">
                HOSTED SOFTWARE AND SERVICES SOLUTIONS - Our 24 hour Market Operations Center (&ldquo;MOC&rdquo;) and Operations Control Center (&ldquo;OCC&rdquo;) provides options to customers that need a full service scheduling coordinator or a more specific asset monitoring service. Our services include: Real Time Markets, Operations Strategy, RT Dispatch, Curtailment Management, Outage Coordination, Wind Turbine Monitoring, Wind Generation Forecasting, Optimization Strategies, and Solar Monitoring.
              </p>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-purple-800 mb-2">Features and Benefits</h4>
                <p className="text-purple-700 mb-3">
                  CES&rsquo;s 24 hour MOC is fully staffed with ISO/RTO-certified, experienced employees. We offer an uptime performance guarantee of 99.9% over a calendar year. The MOC performs day-ahead offering, real-time generation scheduling, curtailment management, reserve and regulation offering and monitoring, and daily meter verification. Our experts have extensive experience with traditional and non-traditional assets, such as storage and renewable intermittent assets. Our systems have more than 3 TB of market data, growing by over 100GB per year.
                </p>
                <p className="text-purple-700 mb-3">
                  CES&rsquo;s 24 hour OCC - We can monitor plant status through our in-house Siemens Generation Management System, communicate plant status changes to RTOs and O&amp;M contractors, advise your generation sites on dispatch to maximize revenue and minimize risk, and pass telemetry information to ISO. Our customized service adapts to your site-specific requirements.
                </p>
                <p className="text-purple-700">
                  In the event of a complete distribution system outage, we have you covered, with two separate power feeds coming from separate distribution feeders and on-site generation feeds. Serving over 514 generation assets and 28,201 MWs in PJM, MISO, SPP, ERCOT, NYISO, NEPOOL, CAISO, and IESO.
                </p>
              </div>
            </div>

            {/* Telemetry Services */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">Telemetry Services</h3>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-indigo-800 mb-2">Features and Benefits</h4>
                <p className="text-indigo-700 mb-3">
                  CES | SecureNet is a scalable, flexible, integrated voice and data communication solution. By creating an encrypted Internet connection to transmit all data, CES | SecureNet allows for secure point-to-point VoIP communications and provides a low-cost alternative to MPLS and other private networks—without sacrificing quality, speed, or security.
                </p>
                <p className="text-indigo-700 mb-3">
                  Get the CES advantage with real-time voltage monitoring, real-time or day-ahead locational marginal pricing information, and dispatch instructions with wholesale market operations (ISO/RTOs).
                </p>
                <p className="text-indigo-700 mb-3">
                  CES | SecureNet also feeds information into CES&rsquo;s 24 hour operations centers and dispatch systems as well as the CES | GOLD data management system.
                </p>
                <p className="text-indigo-700">
                  CES | SecureNet makes use of bidirectional telemetry to provide usage data and other information, including: kilowatts and kilowatt hours, vars, breaker and alarm status, dispatch signals, frequency and voltage regulation, synchronous reserves. More than 60 installations and growing. Available for MISO, PJM, ERCOT, CAISO, ISO-NE, NYISO, and SPP.
                </p>
              </div>
            </div>

            {/* Forward and Ancillary Service Market Services */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Forward and Ancillary Service Market Services</h3>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-red-800 mb-2">Features and Benefits</h4>
                <p className="text-red-700 mb-3">
                  Operating reserve savings: Reduce operating reserve costs by monitoring output vs. dispatch instructions and real-time management of unit parameters.
                </p>
                <p className="text-red-700 mb-3">
                  Fuel management: CES offers management of daily gas purchases and pipeline capacity and handles selling of excess fuel.
                </p>
                <p className="text-red-700 mb-3">
                  Hedging strategy development and execution: Our market experts analyze and evaluate bilateral contracts to minimize risk and maximize project revenue, as well as providing day-to-day management of executed hedges.
                </p>
                <p className="text-red-700">
                  Spin and regulation market optimization: CES offers Ancillary Services Market Optimization and Dispatch and will assist you in developing strategies for Synchronized Reserve, Regulation, and Non-Synchronized Reserve. Implement strategy with hourly offers and automated dispatch based on clearing results. Serving over 95 generation assets and 5,900 MWs in PJM, MISO, SPP, ERCOT, NYISO, NEPOOL, CAISO, and IESO.
                </p>
              </div>
            </div>

            {/* Settlement Services and Reporting */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">Settlement Services and Reporting</h3>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-teal-800 mb-2">Features and Benefits</h4>
                <p className="text-teal-700 mb-3">
                  CES offers full settlement analysis of your ISO/RTO statements and invoices, using both market and internal data to pinpoint areas where you might be leaving money on the table. We&rsquo;ll also provide you with potential disputes and business actions that can reduce your costs and increase revenues.
                </p>
                <p className="text-teal-700 mb-3">
                  Settlement service provides the following: preliminary billing statements, verification of ISO statements, issue resolution if statements or invoices are incorrect, feedback on generation offer and participation strategy, and additional reports and information.
                </p>
                <p className="text-teal-700 mb-3">
                  Data is provided via CES | GOLD, our hosted solution that offers easy-to-use access to your company&rsquo;s entire market interaction history, including market reporting, load forecasting, client-specific reports, and more. View trends, access tabular data, export reports, and drill down into the specifics for a detailed picture of your daily operations.
                </p>
                <p className="text-teal-700">
                  More than 5,900 MWs of generation and 1,600 MWs of demand response actively supported.
                </p>
              </div>
            </div>

            {/* Market Intelligence Reporting */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Market Intelligence Reporting</h3>
              <div className="grid lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <Image
                    src="/images/MIR.png"
                    alt="Market Intelligence Reporting"
                    width={400}
                    height={250}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <p className="text-orange-700 mb-4">
                    CES | MarketIQ keeps you ahead of the game on ISO rules changes, freeing you from the labor-intensive process of attending multiple meetings and analyzing ISO trends and activities. CES | MarketIQ provides you the tools you need to compete in a dynamic environment, ensuring you have the most up-to-date ISO data and analysis to avoid errors in generation planning, basis risk management or compliance due to regulatory changes.
                  </p>
                  <p className="text-orange-700 font-medium">Market Intelligence</p>
                </div>
              </div>
              <div className="bg-white/50 rounded p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Features and Benefits</h4>
                <p className="text-orange-700 mb-3">
                  Comprehensive market coverage, including: CAISO, MISO, SPP, ISO-NE, NYISO, ERCOT, PJM, Mexico, and IESO (Ontario).
                </p>
                <p className="text-orange-700 mb-3">
                  CES | MarketIQ services tailored to client needs including succinct, informative reports. Schedule a one-on-one call to review stakeholder activity for timely analysis and discussion.
                </p>
                <p className="text-orange-700">
                  Get access to subject-matter experts on all covered topics including: resource adequacy, capacity, demand response, financial transmission rights, intermittent resources, system planning, ancillary services, and settlements.
                </p>
              </div>
            </div>

            {/* Renewable Resource Management */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-cyan-800 mb-4">Renewable Resource Management</h3>
              <p className="text-cyan-700 mb-4">
                Maximize market opportunities associated with renewable energy generation resources with CES&rsquo;s comprehensive suite of services tailored to renewable and alternative energy technologies.
              </p>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-cyan-800 mb-2">Features and Benefits</h4>
                <p className="text-cyan-700 mb-3">
                  CES&rsquo;s experts offer market and financial analyses addressing development, investment, and operation. Financial modeling and market forecasting keep you ahead of the game. Make better decisions with our economic project modeling, technology assessment, site selection, interconnection, and feasibility analysis.
                </p>
                <p className="text-cyan-700 mb-3">
                  Entering the renewable energy markets? CES provides development, implementation support, and ongoing project analysis. We&rsquo;ll optimize new and existing assets and market opportunities, and take care of project registration and certification.
                </p>
                <p className="text-cyan-700">
                  Call on CES to handle your renewable power and attribute management, including REC sales management (identifying counterparties, negotiation, contract development), settlement, and compliance, and developing your supply portfolio, pricing analyses, and risk mitigation strategies.
                </p>
              </div>
            </div>

            {/* Managed Portfolio Services */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-pink-800 mb-4">MANAGED PORTFOLIO SERVICES</h3>
              <p className="text-pink-700 mb-4">Hosted Software Solutions - RISK MANAGEMENT, FINANCIAL PLANNING & ANALYSIS</p>
              <p className="text-pink-700 mb-4">
                CES&rsquo;s industry experts provide you with a clear, precise, and actionable view of your financial positioning and energy market exposure through market-leading Risk Management and FP&amp;A services
              </p>
              <div className="bg-white/50 rounded p-4 mb-4">
                <h4 className="font-semibold text-pink-800 mb-2">FEATURES & BENEFITS</h4>
                <ul className="text-pink-700 space-y-1 mb-4">
                  <li>• Historical cash and accrual margin analysis</li>
                  <li>• Forward cash and accrual margin forecasting</li>
                  <li>• Hedge strategy/risk management</li>
                  <li>• Position tracking and reporting</li>
                  <li>• Wholesale load to metered usage reconciliation</li>
                  <li>• Revenue to cash reconciliation</li>
                  <li>• Collateral tracking and forecasting</li>
                  <li>• Market-to-market analysis</li>
                </ul>
                <p className="text-pink-700 font-medium mb-2">Sign up for a Demonstration</p>
              </div>
              <div className="bg-white/50 rounded p-4">
                <h4 className="font-semibold text-pink-800 mb-2">WHY CES</h4>
                <ul className="text-pink-700 space-y-1">
                  <li>• Comprehensive portfolio management service offering</li>
                  <li>• Requisite knowledge, experience, and platform to provide tools that facilitate strategic decision-making</li>
                  <li>• Ability to combine all energy market activity into a clear financial picture</li>
                  <li>• On demand market analysis and intelligence</li>
                  <li>• Fundamental understanding of the inter-relationship between wholesale and retail</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-slate-900 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Generation Operations?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Contact our experts to learn how CES | GOLD can transform your power generation capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Contact Our Team
              </Link>
              <Link
                href="/#solutions"
                className="border border-slate-600 text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              >
                Back to Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
