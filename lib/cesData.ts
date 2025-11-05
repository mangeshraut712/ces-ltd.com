// CES Ltd. Legacy Data - Migrated from ces-ltd.com
// This file contains the core data structure for CES Nexus 3.0

export const companyInfo = {
  name: "Customized Energy Solutions Ltd.",
  shortName: "CES Ltd.",
  tagline: "ANALYZE. SIMPLIFY. IMPLEMENT.",
  founded: 1998,
  mission: "Customized Energy Solutions is committed to promoting economic development through the advancement of transparent, efficient, and nondiscriminatory energy markets. We focus on empowering our clients by sharing our understanding of the workings of the energy markets and related new technologies by supporting our clients' operations in those markets. Through all things, we desire to honor God and our clients through the quality of our services and solutions.",
  vision: "To have a world-wide presence wherever deregulated energy markets exist. To materially accelerate the commercial application of new energy technologies and free energy market structures. To represent the highest level of energy information technology and services available to clients world-wide.",
  awards: [
    {
      name: "INC. 5000",
      description: "Recognized for impressive and sustained growth",
      year: "Multiple Years"
    },
    {
      name: "Philadelphia Business Journal Top 100",
      description: "Hall of Fame for five or more consecutive years",
      category: "Top Companies in Philadelphia"
    }
  ]
};

export const globalOffices = [
  {
    country: "USA",
    location: "Philadelphia, PA (Headquarters)",
    phone: "215.875.9440",
    email: "info@ces-ltd.com",
    focus: ["Generation Owners", "Retail Providers", "Demand Response"],
    address: "USA Headquarters"
  },
  {
    country: "India",
    location: "Pune, Maharashtra",
    phone: "+91-020-27714000",
    email: "indiainfo@ces-ltd.com",
    focus: ["Emerging Technologies", "E-Mobility", "Energy Storage", "ET Subscriptions"],
    address: "India Office - Pune"
  },
  {
    country: "Japan",
    location: "Tokyo",
    phone: "03-4360-5051",
    email: "info@ces-ltd.com",
    focus: ["Generation Solutions", "Comprehensive Solutions"],
    localizedName: "包括的ソリューション",
    address: "Japan Office - Tokyo"
  },
  {
    country: "Vietnam",
    location: "Ho Chi Minh City",
    focus: ["Software Development", "Data Operations"],
    address: "Vietnam Office - HCMC"
  }
];

export const solutions = [
  {
    id: "gold",
    name: "GOLD - Generation Solutions",
    color: "#FFD700",
    icon: "⚡",
    description: "Comprehensive hosted generation market operations platforms for generation owners",
    target: "Generation Owners",
    features: [
      "Hosted market operations",
      "Real-time monitoring",
      "Settlement & billing",
      "Regulatory compliance"
    ],
    link: "/solutions/generation"
  },
  {
    id: "blue",
    name: "BLUE - Retail Solutions",
    color: "#2196F3",
    icon: "🏪",
    description: "Complete retail energy provider solutions for deregulated markets",
    target: "Retail Providers",
    features: [
      "Customer management",
      "Load forecasting",
      "Risk management",
      "Billing & settlements"
    ],
    link: "/solutions/retail"
  },
  {
    id: "green",
    name: "GREEN - Distributed Energy",
    color: "#4CAF50",
    icon: "🌱",
    description: "Distributed energy resources with real-time notifications and management",
    target: "DER Participants",
    features: [
      "DER management",
      "Grid integration",
      "Real-time notifications",
      "Aggregation services"
    ],
    link: "/solutions/distributed"
  },
  {
    id: "comets",
    name: "CoMETS - Emerging Technologies",
    color: "#9C27B0",
    icon: "🚀",
    description: "Comprehensive Market & Emerging Technology Services platform",
    target: "Emerging Tech Participants",
    features: [
      "Energy storage",
      "E-mobility",
      "Hydrogen",
      "Market intelligence"
    ],
    link: "/solutions/emerging"
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
    description: "Comprehensive solutions in a dynamic energy environment",
    icon: "⚡",
    link: "/emerging-technologies/"
  },
  {
    name: "Retail Providers",
    description: "Comprehensive solutions in a dynamic energy environment",
    icon: "🏪",
    link: "/power-generation-solutions/"
  },
  {
    name: "Demand Response Providers",
    description: "Comprehensive solutions in a dynamic energy environment",
    icon: "📊",
    link: "/retail-energy-solutions/"
  },
  {
    name: "Emerging Technology Participants",
    description: "Comprehensive solutions in a dynamic energy environment",
    icon: "🚀",
    link: "/load-management-solutions-old/"
  }
];

// Sample experts data (top leadership and key personnel)
export const keyExperts = [
  {
    id: "stephen-fernands",
    name: "Stephen Fernands",
    position: "President",
    image: "/experts/stephen-fernands.jpg",
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

// CES Nexus 3.0 Enhancement Data
export const nexus3Features = {
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
