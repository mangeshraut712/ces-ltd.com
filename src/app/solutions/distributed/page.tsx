import Image from 'next/image';
import Link from 'next/link';

const OVERVIEW_PARAGRAPHS = [
  'CES serves clients across global deregulated markets by empowering them to capture the value of their resources.',
  'CES can help maximize the value of your distributed energy resources project across the various phases of project development. CES provides guidance based on years of experience navigating rule changes in ISO/RTOs restructured markets on behalf of DERs, as well as providing generation management services to a wide variety of clients.',
  'CES serves customers in a variety of areas in the DER space including demand response, EV charging, peak load management, and management of bidding for energy and capacity in major ISOs/RTOs in North America.',
];

const GRID_BOOST_SUMMARY_PARAGRAPHS = [
  'CES now provides a new service that takes optimization of in front of the meter and distributed storage and storage plus solar assets to the next level!',
];

const GRID_BOOST_ARTICLE_PARAGRAPHS = [
  'CES is proud to announce CES GridBOOST (Grid Bid/Offer Optimization & Scheduling Tool), a new market operations software enabled service for generation, storage, and hybrid resources.',
  'For over 20 years CES has been providing value-added consulting and market operations services to the rapidly evolving electric industry. Over the last decade CES has further established itself among the leaders of the advanced energy storage industry in North America by understanding the market rules that impact storage assets, and by directly implementing revenue optimization strategies on behalf of asset owning clients via our 24/7 market operations center.',
  'CES provided market operations for the first two commercial utility scale advanced energy storage projects to operate in a U.S. RTO/ISO market (one a battery project and the other a flywheel project) and at present operates 32 energy storage projects representing just over 300 MW of nameplate capacity and of various duration.',
  'Expanding upon our history of innovation and expansion of services, CES GridBOOST is designed initially with a California ISO (CAISO) focus, and leverages CES\' deep consulting and operational knowledge of the CAISO market. Expansion to serve ISO-NE and other RTO/ISO markets is actively in the works.',
  'The CES GridBOOST service optimizes revenue in the CAISO markets for grid-scale energy storage projects and will be able to optimize co-located and hybrid solar plus storage assets with later inclusion of additional asset types.',
  'CES has long been able to schedule any asset type and produce offer strategies, but with CES GridBOOST CES can now offer a more sophisticated and automated revenue maximization service.',
];

const GRID_BOOST_CONFIGURATION_POINTS = [
  'Market risk tolerance',
  'Power Purchase Agreement (PPA) terms',
  'Technology limitations such as storage depth of discharge limitations',
  'Other bid strategy considerations such as storage state of charge management',
  'Default, client development, or third party developed price forecasts',
];

const RESOURCE_TABLE_ROWS = [
  { label: 'Storage', value: '698' },
  { label: 'Demand', value: '2,035' },
  { label: 'Wind', value: '7,973' },
  { label: 'Hydro', value: '417' },
  { label: 'Solar', value: '11,149' },
  { label: 'Landfill Gas', value: '122' },
  { label: 'GeoThermal', value: '61' },
  { label: 'Fossil', value: '2,427' },
];

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Distributed Energy</h1>
          <p className="mx-auto mb-8 max-w-4xl text-xl text-green-100 md:text-2xl">
            Hosted solutions with notifications to end-use customers.
          </p>
          <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold">Key capabilities</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {['DER management', 'Grid integration', 'Real-time notifications', 'Aggregation services'].map(item => (
                <div key={item} className="flex items-center">
                  <span className="mr-3 h-2 w-2 rounded-full bg-green-300" />
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

function OverviewSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">Distributed Energy</h2>
        {OVERVIEW_PARAGRAPHS.map(text => (
          <p key={text.slice(0, 24)} className="text-lg text-slate-600">
            {text}
          </p>
        ))}
      </div>
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h3 className="mb-4 text-xl font-bold text-green-800">DER Project Development Phases</h3>
        <p className="text-green-700">
          CES offers these specific services to DER&apos;s as indicated in each of the following three general phases of DER project development.
        </p>
      </div>
      <Image
        src="/images/Distributed.png"
        alt="CES Distributed Energy Solutions"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}

function GridBoostSection() {
  return (
    <section className="space-y-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-blue-800">CES Announces GridBOOST</h3>
        {GRID_BOOST_SUMMARY_PARAGRAPHS.map(paragraph => (
          <p key={paragraph.slice(0, 24)} className="text-blue-700">
            {paragraph}
          </p>
        ))}
        <p className="text-blue-700">
          For more information specific to this new service, click here:{' '}
          <Link href="#" className="font-medium underline text-blue-600 transition hover:text-blue-800">
            Customized Energy Solutions Facilitates a More Distributed Future with CES | GridBOOST
          </Link>
        </p>
      </div>

      <article className="rounded bg-white/50 p-4">
        <p className="mb-2 text-xs text-blue-600">September 14, 2020 / News &amp; Updates</p>
        <p className="mb-3 text-sm font-medium text-blue-800">Customized Energy Solutions</p>
        <div className="space-y-3 text-sm text-blue-700">
          {GRID_BOOST_ARTICLE_PARAGRAPHS.slice(0, 5).map(paragraph => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p>
            The service considers market opportunities and limitations while allowing configuration of:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            {GRID_BOOST_CONFIGURATION_POINTS.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p>{GRID_BOOST_ARTICLE_PARAGRAPHS[5]}</p>
        </div>
      </article>
    </section>
  );
}

function ResourceTableSection() {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-4 text-xl font-bold text-slate-800">CES Q1 2024 Approximate Resources Under Market Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left text-slate-700">
              <th className="py-2 px-4 font-semibold">Resource Type</th>
              <th className="py-2 px-4 text-right font-semibold">Sum of MW</th>
            </tr>
          </thead>
          <tbody>
            {RESOURCE_TABLE_ROWS.map(row => (
              <tr key={row.label} className="border-b border-slate-200">
                <td className="py-2 px-4 text-slate-600">{row.label}</td>
                <td className="py-2 px-4 text-right text-slate-600">{row.value}</td>
              </tr>
            ))}
            <tr className="bg-slate-100 font-bold text-slate-800">
              <td className="py-3 px-4">Grand Total</td>
              <td className="py-3 px-4 text-right">24,882</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DistributedCallToAction() {
  return (
    <section className="rounded-lg bg-slate-900 p-8 text-center text-white">
      <h3 className="mb-4 text-2xl font-bold">Ready to Maximize Your DER Value?</h3>
      <p className="mx-auto mb-6 max-w-2xl text-slate-300">
        Discover how CES can help you navigate DER markets and optimize your distributed energy resources.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700"
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
        <div className="grid gap-12 lg:grid-cols-2">
          <OverviewSection />
          <div className="space-y-8">
            <GridBoostSection />
            <ResourceTableSection />
          </div>
        </div>
        <div className="mt-16">
          <DistributedCallToAction />
        </div>
      </div>
    </section>
  );
}

export default function DistributedSolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <MainContent />
    </div>
  );
}
