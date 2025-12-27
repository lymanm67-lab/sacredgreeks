// Comprehensive Divine Nine (NPHC) organizational data with official information

export interface DivineNineOrganization {
  id: string;
  name: string;
  greekLetters: string;
  nickname: string;
  founded: {
    date: string;
    location: string;
    school: string;
  };
  type: 'fraternity' | 'sorority';
  colors: {
    primary: string;
    secondary: string;
  };
  motto: string;
  symbol: string;
  flower: string;
  mascot?: string;
  call?: string;
  founders: number;
  headquarters: string;
  website: string;
  constitutionalPartner?: string;
  principalAims: string[];
  publicServicePrograms: string[];
}

export const DIVINE_NINE_ORGANIZATIONS: DivineNineOrganization[] = [
  {
    id: 'alpha-phi-alpha',
    name: 'Alpha Phi Alpha Fraternity, Inc.',
    greekLetters: 'ΑΦΑ',
    nickname: 'Alphas',
    founded: {
      date: 'December 4, 1906',
      location: 'Ithaca, New York',
      school: 'Cornell University'
    },
    type: 'fraternity',
    colors: {
      primary: 'Black',
      secondary: 'Old Gold'
    },
    motto: 'First of All, Servants of All, We Shall Transcend All',
    symbol: 'Sphinx',
    flower: 'Yellow Rose',
    mascot: 'Gorilla (unofficial)',
    call: '06',
    founders: 7,
    headquarters: 'Baltimore, Maryland',
    website: 'https://apa1906.net',
    principalAims: [
      'Manly deeds',
      'Scholarship',
      'Love for all mankind'
    ],
    publicServicePrograms: [
      'Go-to-High-School, Go-to-College',
      'A Voteless People is a Hopeless People',
      'Project Alpha',
      'Brother\'s Keeper'
    ]
  },
  {
    id: 'alpha-kappa-alpha',
    name: 'Alpha Kappa Alpha Sorority, Inc.',
    greekLetters: 'ΑΚΑ',
    nickname: 'AKAs',
    founded: {
      date: 'January 15, 1908',
      location: 'Washington, D.C.',
      school: 'Howard University'
    },
    type: 'sorority',
    colors: {
      primary: 'Salmon Pink',
      secondary: 'Apple Green'
    },
    motto: 'By Culture and By Merit',
    symbol: 'Ivy Leaf',
    flower: 'Pink Tea Rose',
    mascot: 'none',
    call: '20 Pearls / Skee-Wee',
    founders: 20,
    headquarters: 'Chicago, Illinois',
    website: 'https://aka1908.com',
    principalAims: [
      'Cultivate and encourage high scholastic and ethical standards',
      'Promote unity and friendship among college women',
      'Study and help alleviate problems concerning girls and women',
      'Maintain a progressive interest in college life',
      'Be of service to all mankind'
    ],
    publicServicePrograms: [
      'ASCEND (Afrikan American Success Through Excellence and Determination)',
      'AKA-HBCU Endowment',
      'Think HBCU',
      'The Arts!'
    ]
  },
  {
    id: 'kappa-alpha-psi',
    name: 'Kappa Alpha Psi Fraternity, Inc.',
    greekLetters: 'ΚΑΨ',
    nickname: 'Kappas / Nupes',
    founded: {
      date: 'January 5, 1911',
      location: 'Bloomington, Indiana',
      school: 'Indiana University'
    },
    type: 'fraternity',
    colors: {
      primary: 'Crimson',
      secondary: 'Cream'
    },
    motto: 'Achievement in Every Field of Human Endeavor',
    symbol: 'Diamond',
    flower: 'Red Carnation',
    mascot: 'none',
    call: 'Yo / Shimmy',
    founders: 10,
    headquarters: 'Philadelphia, Pennsylvania',
    website: 'https://kappaalphapsi1911.com',
    principalAims: [
      'Achievement',
      'Uniting college men of culture, patriotism, and honor',
      'Encouraging honorable achievement in every field of human endeavor'
    ],
    publicServicePrograms: [
      'Guide Right Program',
      'Kappa League',
      'St. Jude Partnership'
    ]
  },
  {
    id: 'omega-psi-phi',
    name: 'Omega Psi Phi Fraternity, Inc.',
    greekLetters: 'ΩΨΦ',
    nickname: 'Ques / Omega Men',
    founded: {
      date: 'November 17, 1911',
      location: 'Washington, D.C.',
      school: 'Howard University'
    },
    type: 'fraternity',
    colors: {
      primary: 'Royal Purple',
      secondary: 'Old Gold'
    },
    motto: 'Friendship is Essential to the Soul',
    symbol: 'Lamp',
    flower: 'none',
    mascot: 'Bulldog (unofficial)',
    call: 'Roo / Que Dog',
    founders: 4,
    headquarters: 'Decatur, Georgia',
    website: 'https://oppf.org',
    principalAims: [
      'Manhood',
      'Scholarship',
      'Perseverance',
      'Uplift'
    ],
    publicServicePrograms: [
      'Achievement Week',
      'Social Action Program',
      'Scholarship Program',
      'Talent Hunt Program'
    ]
  },
  {
    id: 'delta-sigma-theta',
    name: 'Delta Sigma Theta Sorority, Inc.',
    greekLetters: 'ΔΣΘ',
    nickname: 'Deltas',
    founded: {
      date: 'January 13, 1913',
      location: 'Washington, D.C.',
      school: 'Howard University'
    },
    type: 'sorority',
    colors: {
      primary: 'Crimson',
      secondary: 'Cream'
    },
    motto: 'Intelligence is the Torch of Wisdom',
    symbol: 'Fortitude',
    flower: 'African Violet',
    mascot: 'none',
    call: 'OO-OOP',
    founders: 22,
    headquarters: 'Washington, D.C.',
    website: 'https://deltasigmatheta.org',
    principalAims: [
      'Sisterhood',
      'Scholarship',
      'Service',
      'Social action'
    ],
    publicServicePrograms: [
      'Delta Academy',
      'Delta GEMS',
      'EMBODI (Empowering Males to Build Opportunities for Developing Independence)',
      'Dr. Betty Shabazz Delta Academy'
    ]
  },
  {
    id: 'phi-beta-sigma',
    name: 'Phi Beta Sigma Fraternity, Inc.',
    greekLetters: 'ΦΒΣ',
    nickname: 'Sigmas',
    founded: {
      date: 'January 9, 1914',
      location: 'Washington, D.C.',
      school: 'Howard University'
    },
    type: 'fraternity',
    colors: {
      primary: 'Royal Blue',
      secondary: 'Pure White'
    },
    motto: 'Culture for Service and Service for Humanity',
    symbol: 'Dove',
    flower: 'White Carnation',
    mascot: 'none',
    call: 'Blue Phi',
    founders: 3,
    headquarters: 'Washington, D.C.',
    website: 'https://phibetasigma1914.org',
    constitutionalPartner: 'Zeta Phi Beta Sorority, Inc.',
    principalAims: [
      'Brotherhood',
      'Scholarship',
      'Service'
    ],
    publicServicePrograms: [
      'Bigger and Better Business',
      'Social Action',
      'Education',
      'Sigma Beta Club'
    ]
  },
  {
    id: 'zeta-phi-beta',
    name: 'Zeta Phi Beta Sorority, Inc.',
    greekLetters: 'ΖΦΒ',
    nickname: 'Zetas',
    founded: {
      date: 'January 16, 1920',
      location: 'Washington, D.C.',
      school: 'Howard University'
    },
    type: 'sorority',
    colors: {
      primary: 'Royal Blue',
      secondary: 'Pure White'
    },
    motto: 'A Community Conscious, Action Oriented Organization',
    symbol: 'Dove',
    flower: 'White Rose',
    mascot: 'none',
    call: 'Z-Phi / Ee-I-Kee',
    founders: 5,
    headquarters: 'Washington, D.C.',
    website: 'https://zphib1920.org',
    constitutionalPartner: 'Phi Beta Sigma Fraternity, Inc.',
    principalAims: [
      'Scholarship',
      'Service',
      'Sisterhood',
      'Finer Womanhood'
    ],
    publicServicePrograms: [
      'Z-HOPE (Zetas Helping Other People Excel)',
      'Stork\'s Nest',
      'Youth Affiliates (Archonettes, Amicettes, Pearlettes)'
    ]
  },
  {
    id: 'sigma-gamma-rho',
    name: 'Sigma Gamma Rho Sorority, Inc.',
    greekLetters: 'ΣΓΡ',
    nickname: 'SGRhos / Poodles',
    founded: {
      date: 'November 12, 1922',
      location: 'Indianapolis, Indiana',
      school: 'Butler University'
    },
    type: 'sorority',
    colors: {
      primary: 'Royal Blue',
      secondary: 'Gold'
    },
    motto: 'Greater Service, Greater Progress',
    symbol: 'Poodle',
    flower: 'Yellow Tea Rose',
    mascot: 'Poodle',
    call: 'Ee-Yip',
    founders: 7,
    headquarters: 'Cary, North Carolina',
    website: 'https://sgrho1922.org',
    principalAims: [
      'Sisterhood',
      'Scholarship',
      'Service',
      'Community service'
    ],
    publicServicePrograms: [
      'Youth Symposium',
      'Operation BigBookBag',
      'Philo affiliates',
      'Project Reassurance/Mwanamugimu'
    ]
  },
  {
    id: 'iota-phi-theta',
    name: 'Iota Phi Theta Fraternity, Inc.',
    greekLetters: 'ΙΦΘ',
    nickname: 'Iotas',
    founded: {
      date: 'September 19, 1963',
      location: 'Baltimore, Maryland',
      school: 'Morgan State University'
    },
    type: 'fraternity',
    colors: {
      primary: 'Charcoal Brown',
      secondary: 'Gilded Gold'
    },
    motto: 'Building a Tradition, Not Resting Upon One',
    symbol: 'Centaur',
    flower: 'Yellow Rose',
    mascot: 'Centaur',
    call: 'Theta / Owt',
    founders: 12,
    headquarters: 'Baltimore, Maryland',
    website: 'https://iotaphitheta.org',
    principalAims: [
      'Scholarship',
      'Leadership',
      'Citizenship',
      'Fidelity',
      'Brotherhood'
    ],
    publicServicePrograms: [
      'NAACP Afro-Academic, Cultural, Technological and Scientific Olympics (ACT-SO)',
      'Iota Youth Alliance',
      'National Iota Foundation'
    ]
  }
];

// NPHC Council Information
export const NPHC_INFO = {
  name: 'National Pan-Hellenic Council',
  abbreviation: 'NPHC',
  founded: 'May 10, 1930',
  location: 'Howard University, Washington, D.C.',
  headquarters: 'Indianapolis, Indiana',
  website: 'https://nphchq.com',
  description: 'The National Pan-Hellenic Council, Incorporated (NPHC) is the coordinating council for the nine historically African American Greek-lettered fraternities and sororities. Also known as the "Divine Nine," these organizations have a combined membership of over 2.5 million.',
  mission: 'The purpose shall be to foster cooperative actions of its members in dealing with matters of mutual concern. The Council shall not assume the administrative functions of its member organizations.',
  memberOrganizations: 9,
  totalMembership: 'Over 2.5 million'
};

// Helper functions
export function getDivineNineOrganization(id: string): DivineNineOrganization | undefined {
  return DIVINE_NINE_ORGANIZATIONS.find(org => org.id === id);
}

export function getDivineNineFraternities(): DivineNineOrganization[] {
  return DIVINE_NINE_ORGANIZATIONS.filter(org => org.type === 'fraternity');
}

export function getDivineNineSororities(): DivineNineOrganization[] {
  return DIVINE_NINE_ORGANIZATIONS.filter(org => org.type === 'sorority');
}

export function getOrganizationByGreekLetters(letters: string): DivineNineOrganization | undefined {
  return DIVINE_NINE_ORGANIZATIONS.find(org => org.greekLetters === letters);
}

// Timeline order (by founding date)
export function getDivineNineByFoundingOrder(): DivineNineOrganization[] {
  return [...DIVINE_NINE_ORGANIZATIONS].sort((a, b) => {
    const dateA = new Date(a.founded.date);
    const dateB = new Date(b.founded.date);
    return dateA.getTime() - dateB.getTime();
  });
}
