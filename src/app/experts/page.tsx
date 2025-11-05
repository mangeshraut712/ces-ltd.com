'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface ExpertModalProps {
  expert: Expert | null;
  onClose: () => void;
}

function ExpertModal({ expert, onClose }: ExpertModalProps) {
  if (!expert) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{expert.name}</h2>
              <p className="text-lg text-blue-600 mt-1">{expert.role}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
              {expert.initials}
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{expert.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const expertProfiles = [
  {
    name: 'Ajinkya S. Kamat',
    role: 'Innovation Fellow, India Energy Storage Alliance',
    bio: 'Dr. Ajinkya S. Kamat joined Customized Energy Solutions in July 2022. His work focuses on green hydrogen and supporting policymakers, R&D institutions, and industries in developing public-private partnerships in clean energy R&D and innovation. Before joining CES, Ajinkya gained seven years of postdoctoral research experience at Harvard University, USA, Massachusetts Institute of Technology, USA, and Indian Institute of Technology Delhi, India. During this time, he also consulted in clean energy domain in the USA. Ajinkya\'s postdoctoral work has analyzed technology innovation policy issues and techno-economic modelling related to transnational industrial R&D and clean energy technologies including LED lighting, photovoltaics, networked geothermal, and green hydrogen. He has authored several articles in peer-reviewed journals and public media, and his work has also been cited in reputed news media. Ajinkya obtained his PhD in Physics from the University of Virginia, USA, M.Sc. in Physics from Indian Institute of Technology Bombay, India, and B.Sc. in Physics from the University of Mumbai, India with the top rank in the University.',
    initials: 'ASK'
  },
  {
    name: 'Akansha Mishra',
    role: 'SQL Server Developer',
    bio: 'Akansha joined CES in May 2018 as a SQL Server Developer. She has a background in development and testing of ETL processes, business intelligence and data warehousing. Akansha completed her Bachelors in Computer Science Engineering from UPTU University, India.',
    initials: 'AM'
  },
  {
    name: 'Alex Bykovsky',
    role: 'Senior Programmer Analyst',
    bio: 'Alexander joined CES in September 2013. He is working on several internet applications with the main focus on CES | GREEN. Alexander has a background in desktop and web programming. He worked for software, banking and engineering businesses. For the past 16 years, Alexander had developed many successful web portals and tools for the companies he worked for – Thomson Financial, Lehman Brothers, Panasonic Avionics and others. In 2001 Alexander, alongside his partner, started a company developing and selling AJAX web frameworks and tools. The company was created several years before technology was accepted and implemented by Microsoft.',
    initials: 'AB'
  },
  {
    name: 'Alex Hoatson',
    role: 'Scheduling Coordinator',
    bio: 'Alex joined CES in 2016 as a System Operator on the 24 hour renewable generation monitoring desk. His responsibilities include the monitoring of wind turbines at 8 different sites located in the United States, communicating with wind park technicians at each site, as well as curtailing, remote resetting, and reporting on the condition and performance of the sites he oversees. He obtained a Bachelor\'s Degree in Arts Administration from Marywood University and worked as a commodity futures trader before joining CES, while maintaining an active music career as a guitarist.',
    initials: 'AH'
  },
  {
    name: 'Alex Zhuravel',
    role: 'Database Administrator',
    bio: 'Alex joined Customized Energy Solutions in March 2019. He works for the Infrastructure Team as a database administrator. Alex has over 10 years of database administration experience. Prior to joining CES he worked as a programmer/analyst. Alex graduated from Temple University with BS in electrical engineering and MS from New Jersey Institute of Technology in computer and Information Sciences.',
    initials: 'AZ'
  },
  {
    name: 'Barbara Clemenhagen',
    role: 'Vice President, Market Intelligence',
    bio: 'Regulatory advocacy and market design, energy markets, strategic initiatives',
    initials: 'BC'
  },
  {
    name: 'Charlie Howland',
    role: 'Legal Counsel',
    bio: 'Environmental and energy law, EPA regulatory experience, grid-edge energy projects',
    initials: 'CH'
  },
  {
    name: 'Chip Minto',
    role: 'Vice President – Sales & Marketing',
    bio: 'Sales strategy, business development, client engagement, marketing initiatives',
    initials: 'CM'
  },
  {
    name: 'Chris Maher',
    role: 'Vice President of Infrastructure & Security',
    bio: 'IT infrastructure design, system integration, security consulting',
    initials: 'CM'
  },
  {
    name: 'Erik Paulson',
    role: 'Vice President – Wholesale Market Services',
    bio: 'Wholesale electricity markets, asset scheduling, electricity procurement',
    initials: 'EP'
  },
  {
    name: 'Gustav H. Beerel',
    role: 'Vice President Retail Services & Market Development',
    bio: 'Retail energy platforms, business development, market expansion',
    initials: 'GHB'
  },
  {
    name: 'Jim Sloan',
    role: 'Vice President, Technology Solutions',
    bio: 'Technology strategy, software development, system architecture',
    initials: 'JS'
  },
  {
    name: 'Vinayak Walimbe',
    role: 'Managing Director - CES, India',
    bio: 'Energy storage analysis, renewable integration, financial modeling',
    initials: 'VW'
  },
  {
    name: 'William Schofield',
    role: 'Vice President of Future-Grid Services',
    bio: 'Distributed resources, demand response, grid integration, microgrids',
    initials: 'WS'
  },
];

const positionHierarchy = [
  'President',
  'Vice President',
  'Director',
  'Manager',
  'Senior Analyst',
  'Analyst',
  'Software Engineer',
  'System Operator',
  'Technology',
  'Consultant',
  'Controller',
  'Assistant'
];

interface Expert {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

interface ExpertCardProps {
  expert: Expert;
  onReadMore: (expert: Expert) => void;
}

function ExpertCard({ expert, onReadMore }: ExpertCardProps & { onReadMore: (expert: Expert) => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
          {expert.initials}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">{expert.name}</p>
          <p className="text-sm text-slate-600">{expert.role}</p>
        </div>
      </div>
      <button
        onClick={() => onReadMore(expert)}
        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Read More →
      </button>
    </div>
  );
}

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPosition: string;
  setFilterPosition: (position: string) => void;
  sortBy: 'name' | 'position';
  setSortBy: (sort: 'name' | 'position') => void;
  positionHierarchy: string[];
}

function FilterControls({
  searchTerm,
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  sortBy,
  setSortBy,
  positionHierarchy
}: FilterControlsProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All positions</option>
          {positionHierarchy.map(position => (
            <option key={position} value={position.toLowerCase()}>
              {position}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setSortBy('name')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            sortBy === 'name'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortBy('position')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            sortBy === 'position'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          Sort by position
        </button>
      </div>
    </div>
  );
}

interface ExpertsGridProps {
  experts: Expert[];
  searchTerm: string;
  filterPosition: string;
  onClearFilters: () => void;
  onReadMore: (expert: Expert) => void;
}

function ExpertsGrid({ experts, searchTerm, filterPosition, onClearFilters, onReadMore }: ExpertsGridProps) {
  return (
    <div className="mt-10">
      <ExpertsGridHeader experts={experts} searchTerm={searchTerm} filterPosition={filterPosition} onClearFilters={onClearFilters} />
      <ExpertsGridContent experts={experts} onReadMore={onReadMore} />
    </div>
  );
}

function ExpertsGridHeader({ experts, searchTerm, filterPosition, onClearFilters }: { experts: Expert[]; searchTerm: string; filterPosition: string; onClearFilters: () => void }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-xl font-semibold text-slate-900">
        {experts.length} Expert{experts.length !== 1 ? 's' : ''} Found
      </h3>
      {(searchTerm || filterPosition) && (
        <button
          onClick={onClearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All
        </button>
      )}
    </div>
  );
}

function ExpertsGridContent({ experts, onReadMore }: { experts: Expert[]; onReadMore: (expert: Expert) => void }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {experts.map(expert => (
        <ExpertCard key={expert.name} expert={expert} onReadMore={onReadMore} />
      ))}
    </div>
  );
}

function ExpertsHeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connect with the Team
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Meet our cross-disciplinary leaders bringing market operations, regulatory insight, and emerging technology expertise to every engagement.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExpertsContent({
  searchTerm,
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  sortBy,
  setSortBy,
  filteredAndSortedExperts,
  handleClearFilters,
  setSelectedExpert
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPosition: string;
  setFilterPosition: (position: string) => void;
  sortBy: 'name' | 'position';
  setSortBy: (sort: 'name' | 'position') => void;
  filteredAndSortedExperts: Expert[];
  handleClearFilters: () => void;
  setSelectedExpert: (expert: Expert | null) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPosition={filterPosition}
        setFilterPosition={setFilterPosition}
        sortBy={sortBy}
        setSortBy={setSortBy}
        positionHierarchy={positionHierarchy}
      />

      <ExpertsGrid
        experts={filteredAndSortedExperts}
        searchTerm={searchTerm}
        filterPosition={filterPosition}
        onClearFilters={handleClearFilters}
        onReadMore={setSelectedExpert}
      />

      {filteredAndSortedExperts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No experts found matching your criteria.</p>
        </div>
      )}

      <ExpertsContactCTA />
    </div>
  );
}

function ExpertsContactCTA() {
  return (
    <section className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
        Reach out to discuss how our expertise can support your energy initiatives.
      </p>
      <Link
        href="/#contact"
        className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        Get in Touch →
      </Link>
    </section>
  );
}

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'position'>('name');
  const [filterPosition, setFilterPosition] = useState<string>('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const filteredAndSortedExperts = useMemo(() => {
    const filtered = expertProfiles.filter(expert => {
      const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expert.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !filterPosition || expert.role.toLowerCase().includes(filterPosition.toLowerCase());
      return matchesSearch && matchesPosition;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        const aIndex = positionHierarchy.findIndex(pos => a.role.toLowerCase().includes(pos.toLowerCase()));
        const bIndex = positionHierarchy.findIndex(pos => b.role.toLowerCase().includes(pos.toLowerCase()));
        return aIndex - bIndex;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, filterPosition]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterPosition('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ExpertsHeroSection />
      <ExpertsContent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPosition={filterPosition}
        setFilterPosition={setFilterPosition}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredAndSortedExperts={filteredAndSortedExperts}
        handleClearFilters={handleClearFilters}
        setSelectedExpert={setSelectedExpert}
      />
      <ExpertModal expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
    </div>
  );
}
