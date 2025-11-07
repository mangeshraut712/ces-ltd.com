// CES Ltd. Legacy Data - Migrated from ces-ltd.com
// This file contains the core data structure for the CES digital platform

export const companyInfo = {
  name: "Customized Energy Solutions Ltd.",
  shortName: "CES Ltd.",
  tagline: "ANALYZE. SIMPLIFY. IMPLEMENT.",
  founded: 1998,
  about: [
    "Customized Energy Solutions is one of the fastest growing energy consulting and services companies, operating in North America for the past 16 years. We partner with more than 400 clients across the global electricity value chain, delivering market optimization, operational support, and transformational technologies.",
    "CES launched India operations as Customized Energy Solutions India Pvt. Ltd in 2010 to support commercial and industrial customers with market participation, cost optimization, and emerging technology adoption. We pioneered innovative services such as demand response for the Indian market and continue to explore energy storage, microgrids, and smart grid maturity models for consumers worldwide.",
    "Unlike traditional consulting firms, CES supports clients from feasibility through implementation and ongoing optimization. Our teams enhance communications and metering, integrate renewables and emerging technologies, and actively manage distributed resources through our 24×7 operations centers across the globe.",
  ],
  mission: "Customized Energy Solutions is committed to promoting economic development through the advancement of transparent, efficient, and nondiscriminatory wholesale and retail electricity and natural gas markets. We empower clients with deep market expertise and emerging technology insight, supporting their day-to-day operations while honoring both our clients and our values through high-quality services and solutions.",
  vision: "To maintain a worldwide presence wherever deregulated electricity or natural gas markets exist; to accelerate the commercial application of new energy technologies and open market structures; and to represent the highest level of energy information technology and services available to clients globally.",
  awards: [
    {
      name: "INC. 500 | 5000",
      description: "National recognition for sustained growth and innovation",
      year: "Multiple Years"
    },
    {
      name: "Philadelphia Business Journal Top 100",
      description: "Top 100 Companies in Philadelphia, Hall of Fame for five or more consecutive years",
      category: "Regional Excellence"
    },
    {
      name: "Innovative Energy Service Award",
      description: "CII’s 2012 national award recognizing the first pilot demand response program for TATA Power",
      category: "India Operations"
    }
  ],
  socialLinks: [
    { label: "Email", url: "mailto:info@ces-ltd.com", icon: "mail" },
    { label: "Twitter", url: "https://twitter.com/CustomizedES", icon: "twitter" },
    { label: "Facebook", url: "https://www.facebook.com/customizedenergysolutions", icon: "facebook" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/customized-energy-solutions/", icon: "linkedin" },
    { label: "Instagram", url: "https://www.instagram.com/customized_energy_solutions/", icon: "instagram" },
    { label: "YouTube", url: "https://www.youtube.com/@customizedenergysolutionsltd", icon: "youtube" }
  ]
};

export const globalOffices = [
  {
    country: "USA",
    location: "CORPORATE HEADQUARTERS\n1528 Walnut Street, 22nd Floor\nPhiladelphia, PA 19102",
    phone: "215.875.9440",
    email: "info@ces-ltd.com",
    focus: ["Generation Owners", "Retail Providers", "Demand Response"],
    address: "Corporate Headquarters"
  },
  {
    country: "India",
    location: "HEADQUARTERS\nA-501, G-O Square\nAundh-Hinjewadi Link Road\nWakad, Pune 411057, India",
    phone: "+91-020-27714000",
    email: "indiainfo@ces-ltd.com",
    focus: ["Emerging Technologies", "E-Mobility", "Energy Storage", "ET Subscriptions"],
    address: "India Headquarters"
  },
  {
    country: "Japan",
    location: "HEADQUARTERS\n6F. Daiwa Shibuya Square,\n16-28, Nanpeidai-cho,\nShibuya-ku, Tokyo 150-0036",
    phone: "03-4360-5051",
    email: "info@ces-ltd.com",
    focus: ["Generation Solutions", "Comprehensive Solutions"],
    localizedName: "包括的ソリューション",
    address: "Japan Headquarters"
  },
  {
    country: "Vietnam",
    location: "HEADQUARTERS\nWeWork ETown Central, No.11\nDoan Van Bo Street,\nWard 13, District 4, HCMC",
    focus: ["Software Development", "Data Operations"],
    address: "Vietnam Headquarters"
  },
  {
    country: "USA",
    location: "REGIONAL OFFICE\nBoston, Massachusetts",
    focus: ["Market Operations", "Consulting Services"],
    address: "Boston Regional Office"
  },
  {
    country: "USA",
    location: "REGIONAL OFFICE\n101 Parkshore Drive\nFolsom, CA 95630",
    focus: ["Western Market Operations", "Renewable Integration"],
    address: "California Regional Office"
  },
  {
    country: "USA",
    location: "REGIONAL OFFICE\nHouston, Texas",
    focus: ["Energy Trading", "Market Intelligence"],
    address: "Texas Regional Office"
  },
  {
    country: "USA",
    location: "REGIONAL OFFICE\nCarmel, Indiana",
    focus: ["Midwest Operations", "Grid Services"],
    address: "Indiana Regional Office"
  },
  {
    country: "Canada",
    location: "REGIONAL OFFICE\nToronto, Ontario",
    phone: "+1-647-477-9050",
    email: "canadainfo@ces-ltd.com",
    focus: ["Wholesale Market Operations", "Asset Management", "Regulatory Advisory"],
    address: "Canada Regional Office"
  },
  {
    country: "UAE",
    location: "Middle East – MENA FZ LLC\nHeadquarters\nSD2-141\nSecond Floor Lab Complex\nDubai Science Park, UAE 500767",
    focus: ["Middle East Operations", "GCC Market Intelligence", "Energy Transition"],
    address: "Middle East Headquarters"
  },
  {
    country: "Netherlands",
    location: "Europe\nHeadquarters\nParkstraat 83\n2514 JG Den Haag, Netherlands",
    focus: ["European Energy Markets", "Regulatory Compliance", "Cross-border Trading"],
    address: "Europe Headquarters"
  }
];

export const solutions = [
  {
    id: "gold",
    name: "Generation Solutions",
    color: "#FFD700",
    icon: "⚡",
    description: "Comprehensive hosted software and generation service solutions, CES | GOLD.",
    target: "Generation Owners",
    features: [
      "Hosted market operations",
      "Real-time monitoring",
      "Settlement & billing",
      "Regulatory compliance"
    ],
    link: "/solutions/generation",
    subtitle: "Explore solution details → page Power Generation Solution",
    content: "A portfolio of hosted software and service solutions is offered with CES | Gold. Advancing the growth of efficient power generation with hosted software solutions, expertise, and service has been a CES mission since 1998. Our exclusive hosted software solutions allow you instant access to all of your data and customized reports. CES|GOLD CES's 24-hour Market Operations Center is fully staffed with regional grid operator-certified personnel who perform forward market offers, real-time generation offers, scheduling and monitoring, curtailment management, and reserve and regulation offers and monitoring.",
    image: "/images/General.png",
    keyCapabilities: [
      "Hosted market operations",
      "Real-time monitoring",
      "Settlement & billing",
      "Regulatory compliance"
    ]
  },
  {
    id: "blue",
    name: "Retail Solutions",
    color: "#2196F3",
    icon: "🏪",
    description: "Comprehensive end-to-end hosted solutions, CES | BLUE.",
    target: "Retail Providers",
    features: [
      "Customer management",
      "Load forecasting",
      "Risk management",
      "Billing & settlements"
    ],
    link: "/solutions/retail",
    subtitle: "Click here to learn more Retail Energy Services: Solutions for Power & Gas",
    content: "CES advances the growth of energy retailers by providing an end-to-end comprehensive offering of hosted solutions, expertise, and unparalleled service via our CES | BLUE, CES | GREEN, CES | MarketIQ services. CES|BLUE CES|GREEN CES offers a series of hosted platforms developed and serviced by a team of industry experts specializing in competitive energy market entry and operations, state and regional grid registration, renewable compliance and market intelligence. We combine efforts to make your day-to-day operations run more smoothly and your business grow more quickly. Learn more about retail energy management."
  },
  {
    id: "green",
    name: "Distributed Energy",
    color: "#4CAF50",
    icon: "🌱",
    description: "Hosted solutions with notifications to end-use customers.",
    target: "DER Participants",
    features: [
      "DER management",
      "Grid integration",
      "Real-time notifications",
      "Aggregation services"
    ],
    link: "/solutions/distributed",
    subtitle: "Click here to learn more Distributed Energy",
    content: "CES serves clients across global deregulated markets by empowering them to capture the value of their resources. CES can help maximize the value of your distributed energy resources project across the various phases of project development. CES provides guidance based on years of experience navigating rule changes in ISO/RTOs restructured markets on behalf of DERs, as well as providing generation management services to a wide variety of clients. CES serves customers in a variety of areas in the DER space including demand response, EV charging, peak load management, and management of bidding for energy and capacity in major ISOs/RTOs in North America. CES offers these specific services to DER's as indicated in each of the following three general phases of DER project development: CES Announces GridBOOST CES now provides a new service that takes optimization of in front of the meter and distributed storage and storage plus solar assets to the next level!"
  },
  {
    id: "comets",
    name: "Emerging Technologies",
    color: "#9C27B0",
    icon: "🚀",
    description: "Proactive, forward thinking that can help you for the future.",
    target: "Emerging Tech Participants",
    features: [
      "Energy storage",
      "E-mobility",
      "Hydrogen",
      "Market intelligence"
    ],
    link: "/solutions/emerging",
    subtitle: "Click here to learn more Emerging Technologies",
    content: "CES's Emerging Technologies group provides a range of products and consulting services to help project developers, investors, technology companies and other clients understand the value proposition of new energy storage based technologies. Consulting Services We provide a wide spectrum to consulting services to help clients understand and navigate complex energy market rules, identify key drivers and opportunities for energy storage, forecast project revenues and optimize investments. Market Advisory Services Financial Modeling Due Diligence, Risk and Investment Advisory CES MARKET OVERVIEW REPORTS Market OverviewInformative reports focusing on energy storage in regional energy markets that provide insights on market characteristics, participation opportunities, key drivers, revenue opportunities, price trends, policy developments. Learn more here. CoMETS Market OperationsOur proprietary modeling suite CoMETS enable performance evaluation of advanced storage technologies, optimizes dispatch and provides financial model useful to project developers, financiers and investors. Learn more here. Featured Publications download pdfContracted ESS Co-Located with Solar PV in CAISO download pdfESS Deployed with Solar PV in US Mountain West download pdfOptimal Sizing of ESS Co-Located with Solar PV download pdfProject Development Analytics download pdfStrategic Consulting for Fleet Management and DER Services download pdfTechnical and Commercial Due Diligence"
  }
];

export const businessLines = [
  {
    id: "powergreen",
    name: "PowerGreen",
    category: "Demand Management",
    description: "Advanced demand response and load management solutions",
    adoptionRate: 65,
    year: 2024
  },
  {
    id: "renewables",
    name: "Renewables Management",
    category: "Renewable Energy",
    description: "Comprehensive renewable energy project management and optimization",
    adoptionRate: 95,
    year: 2025
  },
  {
    id: "market-iq",
    name: "Market IQ",
    category: "Market Intelligence",
    description: "Real-time market intelligence and analytics platform",
    adoptionRate: 110,
    year: 2026,
    forecast: true
  },
  {
    id: "demand-response",
    name: "Demand Response",
    category: "Grid Services",
    description: "Demand response programs and grid flexibility services",
    adoptionRate: 82,
    year: 2025,
    projected: true
  },
  {
    id: "congestion",
    name: "Congestion Management",
    category: "Grid Optimization",
    description: "Advanced congestion management and FTR/CRR services"
  },
  {
    id: "natural-gas",
    name: "Natural Gas Management",
    category: "Fuel Management",
    description: "Natural gas procurement and hedging services"
  },
  {
    id: "et-subscriptions",
    name: "ET Subscriptions",
    category: "Research & Reports",
    description: "Emerging Technologies market research and insights (India-focused)",
    region: "India"
  }
];

export const serviceCategories = [
  {
    name: "Generation Owners",
    description: "24/7 market operations, ISO registration, and revenue optimization for utility-scale and IPP fleets across PJM, MISO, ERCOT, IESO, and CAISO.",
    icon: "⚡",
    link: "/solutions/generation"
  },
  {
    name: "Retail Providers",
    description: "Full retail lifecycle support—from load forecasting and hedging to billing operations, EDI, compliance, and customer acquisition playbooks.",
    icon: "🏪",
    link: "/solutions/retail"
  },
  {
    name: "Demand Response Providers",
    description: "Program design, asset registration, dispatch operations, and settlement analytics that keep C&I portfolios compliant with FERC 745 and ISO telemetry rules.",
    icon: "📊",
    link: "/solutions/distributed"
  },
  {
    name: "Emerging Technology Participants",
    description: "Energy storage, EV, and microgrid roadmaps that cover interconnection, market qualification, project finance modeling, and performance monitoring.",
    icon: "🚀",
    link: "/solutions/emerging"
  }
];

export const industryShowcase = [
  {
    name: "Independent Power Producers & Utilities",
    icon: "⚡",
    description:
      "Multi-market asset management for thermal, renewable, and storage fleets backed by CES | GOLD operations centers.",
    highlights: [
      "Bid optimization, outage coordination, and telemetry oversight across PJM, MISO, ERCOT, IESO, and CAISO",
      "Fuel, emissions, and regulatory reporting workflows tailored to utility compliance",
      "OEM-agnostic SCADA performance analytics with 24/7 dispatch support"
    ]
  },
  {
    name: "Retail & C&I Energy Providers",
    icon: "🏪",
    description:
      "Mass market and large C&I programs powered by CES | BLUE forecasting, hedging, billing, and UX orchestration.",
    highlights: [
      "Load forecasting, hedging, and structured product design for competitive markets",
      "EDI automation, billing QA, and settlement audits for multi-state portfolios",
      "Customer acquisition playbooks plus regulatory watch for rate case readiness"
    ]
  },
  {
    name: "Demand Response & Grid Services",
    icon: "📊",
    description:
      "Program design, enrollment, dispatch, and measurement & verification for aggregators and utilities.",
    highlights: [
      "Launch kits for PJM, ISO-NE, NYISO, and provincial DR programs",
      "Telemetry, dispatch, and performance settlement runbooks aligned with FERC 745",
      "C&I portfolio analytics with emissions accounting and capacity planning"
    ]
  },
  {
    name: "Storage, EV & Microgrid Innovators",
    icon: "🚀",
    description:
      "Market-entry and long-term optimization services for energy storage, EV fleets, and hybrid microgrids via CES | EMERGE.",
    highlights: [
      "Interconnection, market qualification, and revenue stacking models",
      "Hybrid resource control, SOC optimization, and warranty compliance monitoring",
      "Finance and O&M dashboards for investors, OEMs, and project operators"
    ]
  }
];

// Sample experts data (top leadership and key personnel)
export const keyExperts = [
  {
    id: "stephen-fernands",
    name: "Stephen Fernands",
    position: "President",
    image: "/images/stephen-fernands.png",
    bio: "Leading CES Ltd. with vision for global energy market transformation"
  },
  {
    id: "alan-ackerman",
    name: "Alan Ackerman",
    position: "Director of Regulatory Affairs - NYISO",
    image: "/experts/alan-ackerman.png",
    bio: "Expert in NYISO regulatory affairs and market operations"
  },
  {
    id: "gustav-beerel",
    name: "Gustav H. Beerel, MBA, Ph.D.",
    position: "Vice President Retail Services & Market Development",
    image: "/experts/gustav-beerel.png",
    bio: "Leading retail services and market development initiatives"
  },
  {
    id: "barbara-clemenhagen",
    name: "Barbara Clemenhagen",
    position: "Vice President, Market Intelligence",
    image: "/experts/barbara-clemenhagen.jpg",
    bio: "Directing market intelligence operations and analysis"
  },
  {
    id: "ann-yu",
    name: "Ann Yu",
    position: "Vice President - Emerging Technologies",
    image: "/experts/ann-yu.jpg",
    bio: "Leading emerging technologies division including energy storage and e-mobility"
  },
  {
    id: "vinayak-walimbe",
    name: "Vinayak Walimbe",
    position: "Managing Director - CES, India",
    image: "/experts/vinayak-walimbe.png",
    bio: "Managing CES India operations and emerging technologies initiatives"
  }
];

export const newsItems = [
  {
    id: "news-1",
    date: "2025-10-16",
    title: "When Every Day Counts: CES Delivers $60M in Savings",
    category: "News & Updates",
    type: "success-story",
    description: "Major retail energy provider achieves unprecedented savings through CES market intelligence and optimization services",
    link: "/news/60m-savings"
  },
  {
    id: "news-2",
    date: "2025-10-14",
    title: "Spotlight on Excellence: Alan Ackerman Leadership Profile",
    category: "Team Spotlight",
    type: "profile",
    description: "Highlighting the contributions of our Director of Regulatory Affairs",
    link: "/news/alan-ackerman-spotlight"
  },
  {
    id: "news-3",
    date: "2025-09-20",
    title: "FERC Order 2023: CES Whitepaper Release",
    category: "Research & Analysis",
    type: "whitepaper",
    description: "Comprehensive analysis of FERC Order 2023 implications for energy storage and grid modernization",
    link: "/news/ferc-order-2023",
    nftAvailable: true
  },
  {
    id: "news-4",
    date: "2025-10-10",
    title: "Career Opportunity: Senior Analyst - Western Region",
    category: "Careers",
    type: "job-posting",
    description: "Join our growing team in the Western US market operations",
    link: "/careers/senior-analyst-west"
  },
  {
    id: "news-5",
    date: "2025-10-08",
    title: "Now Hiring: Market Analyst - Pune, India",
    category: "Careers",
    type: "job-posting",
    description: "Emerging technologies analyst position in our growing India operations",
    link: "/careers/analyst-pune"
  }
];

export const careerLocations = [
  {
    region: "USA",
    openings: 12,
    focus: ["Market Analysis", "Software Development", "Consulting"]
  },
  {
    region: "India",
    openings: 25,
    focus: ["Emerging Technologies", "Software Development", "Data Science"]
  },
  {
    region: "Japan",
    openings: 3,
    focus: ["Business Development", "Technical Support"]
  },
  {
    region: "Vietnam",
    openings: 8,
    focus: ["Software Engineering", "QA Testing", "Data Operations"]
  }
];

export const socialMedia = {
  twitter: "@CustomizedES",
  facebook: "CustomizedEnergySolutions",
  linkedin: "customized-energy-solutions",
  instagram: "customized_energy_solutions",
  youtube: "CustomizedEnergySolutions"
};

// CES platform enhancement data
export const platformEnhancements = {
  ai: {
    enabled: true,
    models: ["Grok-5", "Llama 4"],
    capabilities: [
      "Predictive analytics",
      "Real-time market intelligence",
      "Multilingual support (50+ languages)",
      "Personalized recommendations"
    ]
  },
  blockchain: {
    enabled: true,
    networks: ["Polygon zkEVM", "Ethereum L3"],
    features: [
      "NFT certifications",
      "Tokenized whitepapers",
      "Decentralized voting",
      "Smart contracts for proposals"
    ]
  },
  vr: {
    enabled: true,
    platforms: ["WebXR 2.0", "Meta Horizon"],
    experiences: [
      "Heritage walkthrough (1998-2025)",
      "Virtual energy summit rooms",
      "3D facility tours",
      "Interactive training academy"
    ]
  },
  iot: {
    enabled: true,
    protocols: ["MQTT", "Matter 1.2"],
    integrations: ["AWS IoT Core", "Real-time sensor dashboards"]
  }
};
