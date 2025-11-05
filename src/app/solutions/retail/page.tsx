import Image from 'next/image';
import Link from 'next/link';

const HERO_CAPABILITIES = ['Customer management', 'Load forecasting', 'Risk management', 'Billing & settlements'];

const CES_BLUE_FEATURE_PARAGRAPHS = [
  "CES's innovative, comprehensive performance-guaranteed hosted software offers data management (EDI), billing, and forecasting/scheduling services, at unit costs that decrease as you grow. Get started with no up-front payments and rapid initial setup time, in all U.S. retail markets!",
  'Become more competitive with timely, accurate, fixed cost-to-serve pricing. CES can help you accelerate market entry, reduce bill-to-cash cycle time, and assure accurate wholesale settlements.',
  'Our team of specialized experts has been serving power and gas retailers in market entry, state and regional grid operator registration, renewable compliance, and market intelligence since 1998.',
];

const CES_BLUE_WHY_POINTS = [
  'Comprehensive performance-guaranteed hosted software solutions rapid set up, with no up-front costs: CES | BLUE, CES | GREEN, CES | MarketIQ',
  'Manage utility data accurately',
  'Track actual cost-to-serve',
  'Reduce cost-to-serve by minimizing errors',
  'Improve billing-to-cash flow cycle',
];

const MARKET_ENTRY_FEATURES = [
  'Business plan reviews by expert specialists to evaluate market size and composition, sales and marketing, potential customers, risk analysis and risk management planning, regulatory compliance, cost analysis, market and product pricing.',
  'Data process reviews help you optimize processes including certifications and licensing, marketing and contracting requirements, access to electric utility customer information, customer enrollment and data interchange with utility, load forecasting and scheduling requirements, and customer invoicing.',
  "Training and Setup: CES experts handle registration and permits as well as market participant (EDI) testing. We'll even provide training for your staff on market operations and rules.",
];

const SALES_PRICING_FEATURES = [
  'Cost-of-service pricing: Daily, market-based, full-requirements pricing, risk-adjusted by user is available in most de-regulated retail markets. We break prices down into 31 components. With CES there are no hidden margins, no bias, no delays—easy to understand and track.',
  'Track sales and commissions with application program interface (API) links to major customer service management (CSM) tools. We offer financial/accounting packages to keep you fully updated on rate information, commission information, customer account information, and pending additions and drops.',
  'User-friendly customer service hosted software with the up-to-date customer information you need to acquire customers and retain them with high-quality service.',
];

const ENROLLMENT_FEATURES = [
  'Robust SQL database driven by a hosted solution fits your work flow. CES | BLUE makes it easy to track and observe growth and problem areas, and catches utility file and operator errors.',
  'Quickly track new enrollments, account changes and drops, and utilize batch processing and API. CES | BLUE offers you user-friendly account access and provides you with tax reporting and product management.',
  'Reports: Account & customer information, enrollment missing responses, enrollment overview, accounts enrolled but not billing, remittance report, enrollment rejections report, active accounts report, drop totals report, dropped accounts report, enrollment counts report, historical usage for pricing report, usage data report.',
  'Exchange and process EDI documents with trading partners using state-of-the-art transport technologies with business rule updates.',
];

const BILLING_FEATURES = [
  'Bill-ready billing: Flexible products and pricing options are available across utility bill cycles. Delivery of all invoice charges transmitted to the utility is completed within 2 business days of receipt of valid usage data. Any bill errors are resolved quickly within 1 business day.',
  'Rate-ready, premium, and dual billing services.',
  'Monthly usage data, invoicing, utility remittance processing, unbilled reporting and customizable reporting—all in one hosted solution. Business continuity assurance through full back-ups and disaster recovery.',
];

const FORECASTING_FEATURES = [
  'Use the one-stop CES | BLUE hosted platform to access forecasting, scheduling, settlement validation, load and usage information.',
  'Short-term load forecasting based on applicable weather forecasts for next 7 days, every business day. Long-term load forecasting conducted monthly, based on normal weather and duration of customer contract.',
  'Load schedules based on short-term forecast and client scheduling strategies, submitted in accordance with utility and regional grid operator procedures.',
];

const CES_GREEN_FEATURES = [
  'Consulting and Strategic Planning: CES provides electricity rate and load management consulting to all CES | PowerGREEN users. Our expertise in regulatory markets and strategic planning gives PowerGREEN customers the edge in controlling energy costs.',
  'Load Control and Energy Monitoring: CES | PowerGREEN gives customers access to their real time consumption data and enables them to set prioritization for load shedding actions. Our reporting functions help customers visualize their savings instantly.',
  'Demand Charge Reduction allows customers to manage their coincident peaks and facility peaks, putting them in control of their energy spend.',
  'Dynamic Pricing Optimization: CES | PowerGREEN allows users to automatically manage pricing fluctuations to their advantage. Pricing thresholds are set by the customer and strategies run automatically.',
  'Demand Response Revenue is simplified with automated load shedding strategies enabled for customers participating in demand response programs including emergency, economic and ancillary services.',
];

const CES_GREEN_WHY_POINTS = [
  'CES provides real-time intelligent load controls',
  'Expertise in Regulatory Markets and ISO Operations',
  'Our Market Operations Center provides 24/7 Support Coverage',
  'Full service Demand Response provider with proven track record',
];

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Retail Solutions</h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl text-blue-100 md:text-2xl">
            Comprehensive end-to-end hosted solutions, CES | BLUE.
          </p>
          <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold">Key capabilities</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {HERO_CAPABILITIES.map(item => (
                <div key={item} className="flex items-center">
                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CesBlueSection() {
  return (
    <section className="mb-16 rounded-lg border border-blue-200 bg-blue-50 p-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-blue-800">CES BLUE</h2>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-lg text-blue-700">
            Your Partner in Growth - CES has been advancing the growth of power and gas retailers with hosted software solutions,
            expertise, and service since 1998.
          </p>
          <div className="space-y-4 rounded bg-white/50 p-4">
            <h3 className="text-xl font-bold text-blue-800">Features &amp; Benefits</h3>
            {CES_BLUE_FEATURE_PARAGRAPHS.map(paragraph => (
              <p key={paragraph.slice(0, 24)} className="text-blue-700">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-2 rounded bg-white/50 p-4">
            <h3 className="text-lg font-bold text-blue-800">Why CES?</h3>
            <ul className="space-y-1 text-blue-700">
              {CES_BLUE_WHY_POINTS.map(point => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
        </div>
        <Image
          src="/images/Retail.png"
          alt="CES Retail Solutions"
          width={500}
          height={350}
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}

function RetailEnergyHeader() {
  return (
    <section className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-slate-800">Retail Energy Services</h3>
      <p className="text-slate-600">
        CES | BLUE / MARKET ENTRY / SALES &amp; PRICING CUSTOMER ENROLLMENT &amp; DATA SERVICE CUSTOMER USAGE &amp; BILLING /
        FORECASTING, SCHEDULING &amp; SETTLEMENTS
      </p>
    </section>
  );
}

function MarketEntrySection() {
  return (
    <section className="mb-8 rounded-lg border border-green-200 bg-green-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-green-800">Market Entry</h3>
      <p className="mb-4 text-green-700">
        Retail Market Entry, Registration, and Data Transfer - Rapid market entry and execution provides clients a crucial and
        competitive advantage in fast-moving markets.
      </p>
      <div className="mb-4 space-y-3 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-green-800">Features &amp; Benefits</h4>
        {MARKET_ENTRY_FEATURES.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-green-700">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="text-green-700">
        Transfer data to CES | BLUE quickly and easily, including all customer accounts, billing parameters, and historical data.
      </p>
    </section>
  );
}

function SalesPricingSection() {
  return (
    <section className="mb-8 rounded-lg border border-purple-200 bg-purple-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-purple-800">Sales &amp; Pricing</h3>
      <p className="mb-4 text-purple-700">
        Hosted Software Solutions - Cost-effective and disciplined customer acquisition and renewals are facilitated and effectively
        managed with CES|BLUE.
      </p>
      <p className="mb-4 font-medium text-purple-700">CONTRACT MANAGEMENT MADE EASY WITH CES | BLUE</p>
      <div className="space-y-3 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-purple-800">Features &amp; Benefits</h4>
        {SALES_PRICING_FEATURES.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-purple-700">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function EnrollmentSection() {
  return (
    <section className="mb-8 rounded-lg border border-indigo-200 bg-indigo-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-indigo-800">Customer Enrollment &amp; Data Service</h3>
      <p className="mb-4 text-indigo-700">
        Hosted Software Solutions - High-performance, user-friendly transaction management to reduce errors and keep cost-to-serve
        down is now available.
      </p>
      <div className="space-y-3 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-indigo-800">FEATURES &amp; BENEFITS</h4>
        {ENROLLMENT_FEATURES.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-indigo-700">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function UsageBillingSection() {
  return (
    <section className="mb-8 rounded-lg border border-red-200 bg-red-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-red-800">Customer Usage &amp; Billing</h3>
      <p className="mb-4 text-red-700">
        Hosted Software Solutions - Compress billing-to-cash cycle in all markets without errors—all under one easy-to-use hosted
        solution.
      </p>
      <p className="mb-4 font-medium text-red-700">ONE-STOP USAGE &amp; BILLING IN CES | BLUE</p>
      <div className="space-y-3 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-red-800">FEATURES &amp; BENEFITS</h4>
        {BILLING_FEATURES.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-red-700">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function ForecastingSection() {
  return (
    <section className="mb-8 rounded-lg border border-teal-200 bg-teal-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-teal-800">FORECASTING, SCHEDULING &amp; SETTLEMENTS</h3>
      <div className="space-y-3 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-teal-800">FEATURES &amp; BENEFITS</h4>
        {FORECASTING_FEATURES.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-teal-700">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function CesGreenSection() {
  return (
    <section className="rounded-lg border border-green-200 bg-green-50 p-8">
      <h3 className="mb-4 text-2xl font-bold text-green-800">CES GREEN</h3>
      <p className="mb-4 text-green-700">
        Load Management - Hosted Software Solutions - CES | PowerGREEN is advanced demand management software that lets
        energy-intensive businesses effortlessly reduce electricity costs.
      </p>
      <div className="mb-4 space-y-3 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-green-800">Features &amp; Benefits</h4>
        {CES_GREEN_FEATURES.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-green-700">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="space-y-2 rounded bg-white/50 p-4">
        <h4 className="font-semibold text-green-800">Why CES?</h4>
        <ul className="space-y-1 text-green-700">
          {CES_GREEN_WHY_POINTS.map(point => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BusinessLinesSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Business Lines</h2>
      <RetailEnergyHeader />
      <MarketEntrySection />
      <SalesPricingSection />
      <EnrollmentSection />
      <UsageBillingSection />
      <ForecastingSection />
      <CesGreenSection />
    </section>
  );
}

function RetailCallToAction() {
  return (
    <section className="rounded-lg bg-slate-900 p-8 text-center text-white">
      <h3 className="mb-4 text-2xl font-bold">Ready to Transform Your Retail Operations?</h3>
      <p className="mx-auto mb-6 max-w-2xl text-slate-300">
        Discover how CES | BLUE can streamline your energy retail business and drive growth.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Contact Our Team
        </Link>
        <Link
          href="/#solutions"
          className="rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-300 transition-colors hover:bg-slate-700"
        >
          Back to Solutions
        </Link>
      </div>
    </section>
  );
}

function MainContent() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CesBlueSection />
        <BusinessLinesSection />
        <RetailCallToAction />
      </div>
    </section>
  );
}

export default function RetailSolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <MainContent />
    </div>
  );
}
