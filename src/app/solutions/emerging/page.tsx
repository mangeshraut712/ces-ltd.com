import Image from 'next/image';
import Link from 'next/link';

const HERO_CAPABILITIES = ['Energy storage', 'E-mobility', 'Hydrogen', 'Market intelligence'];

const CONSULTING_PARAGRAPHS = [
  'CES\'s Emerging Technologies group provides a range of products and consulting services to help project developers, investors, technology companies and other clients understand the value proposition of new energy storage based technologies.',
  'We provide a wide spectrum of consulting services to help clients understand and navigate complex energy market rules, identify key drivers and opportunities for energy storage, forecast project revenues and optimize investments.',
];

const MARKET_ADVISORY_POINTS = ['Financial Modeling', 'Due Diligence, Risk and Investment Advisory'];

const MARKET_IQ_FEATURES = [
  'Comprehensive market coverage, including: CAISO, MISO, SPP, ISO-NE, NYISO, ERCOT, PJM, Mexico, and IESO (Ontario).',
  'CES | MarketIQ services tailored to client needs including succinct, informative reports. Schedule a one-on-one call to review stakeholder activity for timely analysis and discussion.',
  'Get access to subject-matter experts on all covered topics including: resource adequacy, capacity, demand response, financial transmission rights, intermittent resources, system planning, ancillary services, and settlements.',
];

const MARKET_IQ_BENEFITS = [
  'CES | MarketIQ provides emailed reporting and analysis of nearly all ISO rules, initiatives, and stakeholder meetings',
  'Hosted portal with all reports, including historical files',
  'CES\'s unparalleled team of experts, many of whom have led ISO committees',
];

const REGULATORY_LEFT_COLUMN = [
  'CES assists clients to understand regulatory outcomes and capture opportunities and mitigate risks in ever more complex regulatory environments. Through CES Consulting our experts assist clients in managing research, evaluating applications, summarizing interventions, decisions and orders and providing strategic analysis in regulatory proceedings.',
  'CES offers guidance and analysis in understanding the regulatory environment, summarizing critical points in proceedings, performing regulatory and procedural analysis, and working with our clients to understand the critical decision points that impact your bottom line.',
  'We assist organizations with every aspect of the regulatory proceeding whether written filings or oral testimony. Our team understands procedural matters as well as the subject matter – whether it is a rate case, rulemaking, complaint or application.',
];

const REGULATORY_RIGHT_COLUMN = [
  'Our experts can assist you in securing legal counsel or expert witnesses, if needed, and we can help you to comply with federal, state, ISO/RTO, and utility regulations.',
  'CES\'s cross-market analysts will provide expert guidance, advice and analysis of the ISO/ RTO, State and Federal procedural rules and requirements and the process to change or appeal rules, clarify or appeal findings or decisions and related policy/procedural matters.',
];

const REGULATORY_DELIVERABLES = [
  'Regulatory Support and Consulting for the specified market',
  'Periodic, timely reports based on key meetings/hearings/proceedings and other meetings of special client interest',
  'Monthly executive summary of key topics',
  'Monthly update conference call at option of client',
  'Ability to contact our regulatory consultants and SMEs at will about the content of the reports as well as questions about proceedings or specific topics',
  'Special near-real time alerts when time-sensitive or market-moving intelligence is received',
];

const REGULATORY_BENEFITS = [
  'Providing subject matter expertise and stakeholder-related intelligence to Clients for a fraction of the costs of adding additional regulatory staff',
  'Providing access to the information and in-depth analysis that can confer a competitive advantage and ensure Client\'s success in the markets',
  'Providing access to the intelligence that competitors have',
  'Allowing performance of regular business activities vs. attending stakeholder meetings',
  'Allow focusing on participating in stakeholder discussions rather than documenting them',
];

const COMETS_MODELS = [
  {
    title: 'Wholesale Model',
    description: 'CoMETS Wholesale Model offers the ability to model Stand-Alone and Hybrid Asset Configurations',
    features: [
      'Mixed Integer Linear Programming (MILP)',
      'Hourly Market Price Forecasts',
      'Hourly Dispatch Simulations',
      'Renewables Integration',
      'Optimal Sizing',
      'Integration Utility Contracts',
      'Capital Structuring',
      'Project Finance Model',
    ],
    images: [
      { src: '/images/wholesome.png', alt: 'CoMETS Wholesale Model' },
      { src: '/images/bids.png', alt: 'Utility Contract Bids' },
    ],
  },
  {
    title: 'Behind the Meter Model',
    description:
      'The model optimizes dispatch of behind the meter energy storage and distributed energy resources (DERs) to manage demand charges, time-of-use energy shifting, self-consumption of renewable energy, demand response and wholesale energy market participation.',
    images: [
      { src: '/images/BTM.png', alt: 'Behind the Meter Model' },
      { src: '/images/BTM-2.png', alt: 'CoMETS Behind the Meter' },
    ],
  },
  {
    title: 'Microgrid Model',
    description:
      'For dispatch simulation of microgrid layouts with a variety of generators such as solar, wind, and diesel coupled with battery energy storage systems. The model provides insights into technical aspects such as grid interactivity, islanding operations, and commercial aspects like levelized cost of energy.',
    images: [
      { src: '/images/MM.png', alt: 'Microgrid Model' },
      { src: '/images/MM-2.png', alt: 'CoMETS Microgrid' },
    ],
  },
];

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Emerging Technologies</h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl text-purple-100 md:text-2xl">
            Proactive, forward thinking that can help you for the future.
          </p>
          <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold">Key capabilities</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {HERO_CAPABILITIES.map(item => (
                <div key={item} className="flex items-center">
                  <span className="mr-3 h-2 w-2 rounded-full bg-purple-300" />
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

function BrochureDownload() {
  return (
    <div className="mb-12 text-center">
      <Link
        href="/files/CES Brochure May 2022.pdf"
        download
        className="inline-flex items-center rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        Download Brochure
      </Link>
    </div>
  );
}

function ConsultingSection() {
  return (
    <section className="mb-16 space-y-12">
      <div className="mx-auto max-w-4xl text-center">
        {CONSULTING_PARAGRAPHS.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="mb-6 text-lg text-slate-600 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Consulting Services</h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-slate-800">Market Advisory Services</h3>
              <ul className="space-y-2 text-slate-600">
                {MARKET_ADVISORY_POINTS.map(point => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-blue-800">CES MARKET OVERVIEW REPORTS</h3>
              <p className="mb-4 text-blue-700">
                <strong>Market Overview</strong> - Informative reports focusing on energy storage in regional energy markets that
                provide insights on market characteristics, participation opportunities, key drivers, revenue opportunities, price
                trends, policy developments.
              </p>
              <Link href="#" className="font-medium underline text-blue-600 transition hover:text-blue-800">
                Learn more here.
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">CES MarketIQ</h2>
          <p className="text-lg text-slate-600">
            CES | MarketIQ keeps you ahead of the game on ISO rules changes, freeing you from the labor-intensive process of
            attending multiple meetings and analyzing ISO trends and activities. CES | MarketIQ provides you the tools you need to
            compete in a dynamic environment, ensuring you have the most up-to-date ISO data and analysis to avoid errors in
            generation planning, basis risk management or compliance due to regulatory changes.
          </p>
          <div className="space-y-6 rounded-lg border border-green-200 bg-green-50 p-6">
            <div className="space-y-2 text-green-700">
              <h3 className="text-xl font-bold text-green-800">MARKET INTELLIGENCE REPORTING</h3>
              <p className="font-semibold">Market Intelligence</p>
              <p className="font-semibold">Features and Benefits</p>
              <ul className="space-y-2">
                {MARKET_IQ_FEATURES.map(point => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <p className="font-semibold">Why CES?</p>
              <ul className="space-y-2">
                {MARKET_IQ_BENEFITS.map(point => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegulatorySection() {
  return (
    <section className="mb-16 rounded-lg border border-slate-200 bg-slate-50 p-8">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">Regulatory and Strategic Consulting</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 text-lg text-slate-600">
          {REGULATORY_LEFT_COLUMN.map(paragraph => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="space-y-6 text-lg text-slate-600">
          {REGULATORY_RIGHT_COLUMN.map(paragraph => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-bold text-blue-800">General Terms and Rates</h3>
            <div className="space-y-4 text-sm text-blue-700">
              <div>
                <h4 className="mb-2 font-semibold">Deliverables</h4>
                <ul className="space-y-1">
                  {REGULATORY_DELIVERABLES.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Key Benefits</h4>
                <ul className="space-y-1">
                  {REGULATORY_BENEFITS.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoMetsSection() {
  return (
    <section className="mb-16 space-y-12">
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">CoMETS</h2>
        <p className="mx-auto max-w-4xl text-lg text-slate-600">
          Market Operations - Our proprietary modeling suite CoMETS enable performance evaluation of advanced storage technologies,
          optimizes dispatch and provides financial model useful to project developers, financiers and investors.
        </p>
        <Link href="#" className="font-medium underline text-purple-600 transition hover:text-purple-800">
          Learn more here.
        </Link>
        <Link
          href="/files/CoMETS.pdf"
          download
          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Download Brochure
        </Link>
        <p className="mx-auto max-w-4xl text-lg text-slate-600">
          Comprehensive Market Evaluation Tools for Storage (CoMETS) is our proprietary suite of web based models that offer dispatch
          modeling, revenue analysis, optimal value stacking and full financial modeling of energy storage projects for in-front of
          the meter, behind the retail meter and microgrid layouts.
        </p>
      </div>

      <div className="space-y-12">
        {COMETS_MODELS.map(model => (
          <div key={model.title} className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">{model.title}</h3>
              <p className="text-slate-600">{model.description}</p>
              {model.features && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="mb-2 font-medium text-yellow-800">SALIENT FEATURES</p>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    {model.features.map(feature => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {model.images.map(image => (
                <Image
                  key={image.alt}
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="mx-auto rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8 text-center">
        <h3 className="text-2xl font-bold text-slate-900">CoMETS Markets Coverage</h3>
        <p className="mx-auto max-w-4xl text-lg text-slate-600">
          CoMETS offers revenue analysis from participation in Energy, Capacity, and Ancillary Services Markets within all organized
          North American Independent System Operator and Regional Transmission Organization wholesale markets.
        </p>
        <Image
          src="/images/MC.webp"
          alt="CoMETS Market Coverage"
          width={800}
          height={400}
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}

function EmergingCallToAction() {
  return (
    <section className="rounded-lg bg-slate-900 p-8 text-center text-white">
      <h3 className="mb-4 text-2xl font-bold">Ready to Explore Emerging Technologies?</h3>
      <p className="mx-auto mb-6 max-w-2xl text-slate-300">
        Discover how CES&apos;s emerging technologies solutions can help you navigate the future of energy.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-lg bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
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
        <BrochureDownload />
        <ConsultingSection />
        <RegulatorySection />
        <CoMetsSection />
        <EmergingCallToAction />
      </div>
    </section>
  );
}

export default function EmergingTechnologiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <MainContent />
    </div>
  );
}
