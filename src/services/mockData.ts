// Mock data for demo purposes
export const mockCompanies = [
  {
    id: '1',
    ownerId: '1',
    companyName: 'Tech Innovations Ltd',
    address: '123 Tech Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400001',
    website: 'https://techinnovations.com',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
    industry: 'Technology',
    foundedDate: '2015-06-15',
    description: 'Leading provider of innovative technology solutions',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techinnovations',
      twitter: 'https://twitter.com/techinnovations'
    },
    mlResults: {
      pros: [
        { metric: 'Revenue Growth', value: '+15.3%', year: '2024' },
        { metric: 'Net Profit', value: '+22.1%', year: '2024' },
        { metric: 'EPS Growth', value: '+18.5%', year: '2024' }
      ],
      cons: [
        { metric: 'Debt to Equity', value: '+8.2%', year: '2024' },
        { metric: 'Operating Margin', value: '-3.1%', year: '2024' }
      ]
    }
  },
  {
    id: '2',
    ownerId: '2',
    companyName: 'Green Energy Solutions',
    address: '456 Eco Lane',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560001',
    website: 'https://greenenergy.com',
    logoUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200',
    industry: 'Renewable Energy',
    foundedDate: '2018-03-20',
    description: 'Pioneering sustainable energy solutions',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/greenenergy',
    },
    mlResults: {
      pros: [
        { metric: 'Revenue Growth', value: '+28.5%', year: '2024' },
        { metric: 'Asset Turnover', value: '+12.3%', year: '2024' },
        { metric: 'Cash Flow', value: '+19.7%', year: '2024' }
      ],
      cons: [
        { metric: 'Current Ratio', value: '-5.4%', year: '2024' }
      ]
    }
  },
  {
    id: '3',
    ownerId: '3',
    companyName: 'Healthcare Plus',
    address: '789 Medical Center',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    industry: 'Healthcare',
    foundedDate: '2010-01-10',
    description: 'Comprehensive healthcare services',
    mlResults: {
      pros: [
        { metric: 'Net Profit', value: '+11.2%', year: '2024' },
        { metric: 'Return on Equity', value: '+14.8%', year: '2024' }
      ],
      cons: [
        { metric: 'Inventory Turnover', value: '-9.3%', year: '2024' },
        { metric: 'Quick Ratio', value: '-6.1%', year: '2024' },
        { metric: 'Operating Cash Flow', value: '-4.5%', year: '2024' }
      ]
    }
  }
];

export const mockAnalytics = {
  topProsCompanies: [
    { name: 'Green Energy Solutions', prosCount: 3 },
    { name: 'Tech Innovations Ltd', prosCount: 3 },
    { name: 'Healthcare Plus', prosCount: 2 },
  ],
  topConsCompanies: [
    { name: 'Healthcare Plus', consCount: 3 },
    { name: 'Tech Innovations Ltd', consCount: 2 },
    { name: 'Green Energy Solutions', consCount: 1 },
  ],
  prosVsCons: [
    { company: 'Tech Innovations', pros: 3, cons: 2 },
    { company: 'Green Energy', pros: 3, cons: 1 },
    { company: 'Healthcare Plus', pros: 2, cons: 3 },
  ],
  sectorDistribution: [
    { name: 'Technology', value: 35 },
    { name: 'Renewable Energy', value: 25 },
    { name: 'Healthcare', value: 20 },
    { name: 'Finance', value: 12 },
    { name: 'Manufacturing', value: 8 },
  ]
};
