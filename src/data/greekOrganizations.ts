// Comprehensive list of Greek Letter Organizations organized by council

export interface GreekOrganization {
  name: string;
  greekLetters: string;
  founded: number;
  type: 'fraternity' | 'sorority';
  colors?: string;
}

export interface GreekCouncil {
  id: string;
  name: string;
  fullName: string;
  description: string;
  organizations: GreekOrganization[];
}

export const GREEK_COUNCILS: GreekCouncil[] = [
  {
    id: 'nphc',
    name: 'NPHC',
    fullName: 'National Pan-Hellenic Council',
    description: 'The Divine Nine - Historically African American fraternities and sororities',
    organizations: [
      { name: 'Alpha Phi Alpha Fraternity, Inc.', greekLetters: 'ΑΦΑ', founded: 1906, type: 'fraternity', colors: 'Black and Old Gold' },
      { name: 'Alpha Kappa Alpha Sorority, Inc.', greekLetters: 'ΑΚΑ', founded: 1908, type: 'sorority', colors: 'Salmon Pink and Apple Green' },
      { name: 'Kappa Alpha Psi Fraternity, Inc.', greekLetters: 'ΚΑΨ', founded: 1911, type: 'fraternity', colors: 'Crimson and Cream' },
      { name: 'Omega Psi Phi Fraternity, Inc.', greekLetters: 'ΩΨΦ', founded: 1911, type: 'fraternity', colors: 'Royal Purple and Old Gold' },
      { name: 'Delta Sigma Theta Sorority, Inc.', greekLetters: 'ΔΣΘ', founded: 1913, type: 'sorority', colors: 'Crimson and Cream' },
      { name: 'Phi Beta Sigma Fraternity, Inc.', greekLetters: 'ΦΒΣ', founded: 1914, type: 'fraternity', colors: 'Royal Blue and Pure White' },
      { name: 'Zeta Phi Beta Sorority, Inc.', greekLetters: 'ΖΦΒ', founded: 1920, type: 'sorority', colors: 'Royal Blue and Pure White' },
      { name: 'Sigma Gamma Rho Sorority, Inc.', greekLetters: 'ΣΓΡ', founded: 1922, type: 'sorority', colors: 'Royal Blue and Gold' },
      { name: 'Iota Phi Theta Fraternity, Inc.', greekLetters: 'ΙΦΘ', founded: 1963, type: 'fraternity', colors: 'Charcoal Brown and Gilded Gold' },
    ]
  },
  {
    id: 'npc',
    name: 'NPC',
    fullName: 'National Panhellenic Conference',
    description: '26 women\'s sororities representing over 4 million members',
    organizations: [
      { name: 'Alpha Chi Omega', greekLetters: 'ΑΧΩ', founded: 1885, type: 'sorority' },
      { name: 'Alpha Delta Pi', greekLetters: 'ΑΔΠ', founded: 1851, type: 'sorority' },
      { name: 'Alpha Epsilon Phi', greekLetters: 'ΑΕΦ', founded: 1909, type: 'sorority' },
      { name: 'Alpha Gamma Delta', greekLetters: 'ΑΓΔ', founded: 1904, type: 'sorority' },
      { name: 'Alpha Omicron Pi', greekLetters: 'ΑΟΠ', founded: 1897, type: 'sorority' },
      { name: 'Alpha Phi', greekLetters: 'ΑΦ', founded: 1872, type: 'sorority' },
      { name: 'Alpha Sigma Alpha', greekLetters: 'ΑΣΑ', founded: 1901, type: 'sorority' },
      { name: 'Alpha Sigma Tau', greekLetters: 'ΑΣΤ', founded: 1899, type: 'sorority' },
      { name: 'Alpha Xi Delta', greekLetters: 'ΑΞΔ', founded: 1893, type: 'sorority' },
      { name: 'Chi Omega', greekLetters: 'ΧΩ', founded: 1895, type: 'sorority' },
      { name: 'Delta Delta Delta', greekLetters: 'ΔΔΔ', founded: 1888, type: 'sorority' },
      { name: 'Delta Gamma', greekLetters: 'ΔΓ', founded: 1873, type: 'sorority' },
      { name: 'Delta Phi Epsilon', greekLetters: 'ΔΦΕ', founded: 1917, type: 'sorority' },
      { name: 'Delta Zeta', greekLetters: 'ΔΖ', founded: 1902, type: 'sorority' },
      { name: 'Gamma Phi Beta', greekLetters: 'ΓΦΒ', founded: 1874, type: 'sorority' },
      { name: 'Kappa Alpha Theta', greekLetters: 'ΚΑΘ', founded: 1870, type: 'sorority' },
      { name: 'Kappa Delta', greekLetters: 'ΚΔ', founded: 1897, type: 'sorority' },
      { name: 'Kappa Kappa Gamma', greekLetters: 'ΚΚΓ', founded: 1870, type: 'sorority' },
      { name: 'Phi Mu', greekLetters: 'ΦΜ', founded: 1852, type: 'sorority' },
      { name: 'Phi Sigma Sigma', greekLetters: 'ΦΣΣ', founded: 1913, type: 'sorority' },
      { name: 'Pi Beta Phi', greekLetters: 'ΠΒΦ', founded: 1867, type: 'sorority' },
      { name: 'Sigma Delta Tau', greekLetters: 'ΣΔΤ', founded: 1917, type: 'sorority' },
      { name: 'Sigma Kappa', greekLetters: 'ΣΚ', founded: 1874, type: 'sorority' },
      { name: 'Sigma Sigma Sigma', greekLetters: 'ΣΣΣ', founded: 1898, type: 'sorority' },
      { name: 'Theta Phi Alpha', greekLetters: 'ΘΦΑ', founded: 1912, type: 'sorority' },
      { name: 'Zeta Tau Alpha', greekLetters: 'ΖΤΑ', founded: 1898, type: 'sorority' },
    ]
  },
  {
    id: 'nic',
    name: 'NIC',
    fullName: 'North American Interfraternity Conference',
    description: '58 men\'s fraternities with chapters across North America',
    organizations: [
      { name: 'Acacia Fraternity', greekLetters: 'ΑΚΑΚΙΑ', founded: 1904, type: 'fraternity' },
      { name: 'Alpha Chi Rho', greekLetters: 'ΑΧΡ', founded: 1895, type: 'fraternity' },
      { name: 'Alpha Delta Phi', greekLetters: 'ΑΔΦ', founded: 1832, type: 'fraternity' },
      { name: 'Alpha Epsilon Pi', greekLetters: 'ΑΕΠ', founded: 1913, type: 'fraternity' },
      { name: 'Alpha Gamma Rho', greekLetters: 'ΑΓΡ', founded: 1904, type: 'fraternity' },
      { name: 'Alpha Kappa Lambda', greekLetters: 'ΑΚΛ', founded: 1914, type: 'fraternity' },
      { name: 'Alpha Sigma Phi', greekLetters: 'ΑΣΦ', founded: 1845, type: 'fraternity' },
      { name: 'Alpha Tau Omega', greekLetters: 'ΑΤΩ', founded: 1865, type: 'fraternity' },
      { name: 'Beta Theta Pi', greekLetters: 'ΒΘΠ', founded: 1839, type: 'fraternity' },
      { name: 'Chi Phi', greekLetters: 'ΧΦ', founded: 1824, type: 'fraternity' },
      { name: 'Chi Psi', greekLetters: 'ΧΨ', founded: 1841, type: 'fraternity' },
      { name: 'Delta Chi', greekLetters: 'ΔΧ', founded: 1890, type: 'fraternity' },
      { name: 'Delta Kappa Epsilon', greekLetters: 'ΔΚΕ', founded: 1844, type: 'fraternity' },
      { name: 'Delta Sigma Phi', greekLetters: 'ΔΣΦ', founded: 1899, type: 'fraternity' },
      { name: 'Delta Tau Delta', greekLetters: 'ΔΤΔ', founded: 1858, type: 'fraternity' },
      { name: 'Delta Upsilon', greekLetters: 'ΔΥ', founded: 1834, type: 'fraternity' },
      { name: 'FarmHouse Fraternity', greekLetters: 'FH', founded: 1905, type: 'fraternity' },
      { name: 'Kappa Alpha Order', greekLetters: 'ΚΑ', founded: 1865, type: 'fraternity' },
      { name: 'Kappa Delta Rho', greekLetters: 'ΚΔΡ', founded: 1905, type: 'fraternity' },
      { name: 'Kappa Sigma', greekLetters: 'ΚΣ', founded: 1869, type: 'fraternity' },
      { name: 'Lambda Chi Alpha', greekLetters: 'ΛΧΑ', founded: 1909, type: 'fraternity' },
      { name: 'Phi Delta Theta', greekLetters: 'ΦΔΘ', founded: 1848, type: 'fraternity' },
      { name: 'Phi Gamma Delta (FIJI)', greekLetters: 'ΦΓΔ', founded: 1848, type: 'fraternity' },
      { name: 'Phi Kappa Psi', greekLetters: 'ΦΚΨ', founded: 1852, type: 'fraternity' },
      { name: 'Phi Kappa Sigma', greekLetters: 'ΦΚΣ', founded: 1850, type: 'fraternity' },
      { name: 'Phi Kappa Tau', greekLetters: 'ΦΚΤ', founded: 1906, type: 'fraternity' },
      { name: 'Phi Kappa Theta', greekLetters: 'ΦΚΘ', founded: 1889, type: 'fraternity' },
      { name: 'Phi Sigma Kappa', greekLetters: 'ΦΣΚ', founded: 1873, type: 'fraternity' },
      { name: 'Pi Kappa Alpha', greekLetters: 'ΠΚΑ', founded: 1868, type: 'fraternity' },
      { name: 'Pi Kappa Phi', greekLetters: 'ΠΚΦ', founded: 1904, type: 'fraternity' },
      { name: 'Pi Lambda Phi', greekLetters: 'ΠΛΦ', founded: 1895, type: 'fraternity' },
      { name: 'Psi Upsilon', greekLetters: 'ΨΥ', founded: 1833, type: 'fraternity' },
      { name: 'Sigma Alpha Epsilon', greekLetters: 'ΣΑΕ', founded: 1856, type: 'fraternity' },
      { name: 'Sigma Alpha Mu', greekLetters: 'ΣΑΜ', founded: 1909, type: 'fraternity' },
      { name: 'Sigma Chi', greekLetters: 'ΣΧ', founded: 1855, type: 'fraternity' },
      { name: 'Sigma Nu', greekLetters: 'ΣΝ', founded: 1869, type: 'fraternity' },
      { name: 'Sigma Phi Epsilon', greekLetters: 'ΣΦΕ', founded: 1901, type: 'fraternity' },
      { name: 'Sigma Pi', greekLetters: 'ΣΠ', founded: 1897, type: 'fraternity' },
      { name: 'Sigma Tau Gamma', greekLetters: 'ΣΤΓ', founded: 1920, type: 'fraternity' },
      { name: 'Tau Kappa Epsilon', greekLetters: 'ΤΚΕ', founded: 1899, type: 'fraternity' },
      { name: 'Theta Chi', greekLetters: 'ΘΧ', founded: 1856, type: 'fraternity' },
      { name: 'Theta Delta Chi', greekLetters: 'ΘΔΧ', founded: 1847, type: 'fraternity' },
      { name: 'Theta Xi', greekLetters: 'ΘΞ', founded: 1864, type: 'fraternity' },
      { name: 'Zeta Beta Tau', greekLetters: 'ΖΒΤ', founded: 1898, type: 'fraternity' },
      { name: 'Zeta Psi', greekLetters: 'ΖΨ', founded: 1847, type: 'fraternity' },
    ]
  },
  {
    id: 'nalfo',
    name: 'NALFO',
    fullName: 'National Association of Latino Fraternal Organizations',
    description: 'Latino/a Greek letter organizations',
    organizations: [
      { name: 'Lambda Theta Alpha Latin Sorority, Inc.', greekLetters: 'ΛΘΑ', founded: 1975, type: 'sorority' },
      { name: 'Lambda Theta Phi Latin Fraternity, Inc.', greekLetters: 'ΛΘΦ', founded: 1975, type: 'fraternity' },
      { name: 'Lambda Upsilon Lambda Fraternity, Inc.', greekLetters: 'ΛΥΛ', founded: 1982, type: 'fraternity' },
      { name: 'Phi Iota Alpha Fraternity, Inc.', greekLetters: 'ΦΙΑ', founded: 1931, type: 'fraternity' },
      { name: 'Sigma Lambda Beta International Fraternity, Inc.', greekLetters: 'ΣΛΒ', founded: 1986, type: 'fraternity' },
      { name: 'Sigma Lambda Gamma National Sorority, Inc.', greekLetters: 'ΣΛΓ', founded: 1990, type: 'sorority' },
      { name: 'Kappa Delta Chi Sorority, Inc.', greekLetters: 'ΚΔΧ', founded: 1987, type: 'sorority' },
      { name: 'Lambda Sigma Upsilon Latino Fraternity, Inc.', greekLetters: 'ΛΣΥ', founded: 1979, type: 'fraternity' },
      { name: 'Omega Phi Beta Sorority, Inc.', greekLetters: 'ΩΦΒ', founded: 1989, type: 'sorority' },
      { name: 'Chi Upsilon Sigma National Latin Sorority, Inc.', greekLetters: 'ΧΥΣ', founded: 1980, type: 'sorority' },
      { name: 'Gamma Phi Omega International Sorority, Inc.', greekLetters: 'ΓΦΩ', founded: 1991, type: 'sorority' },
      { name: 'Lambda Pi Chi Sorority, Inc.', greekLetters: 'ΛΠΧ', founded: 1988, type: 'sorority' },
      { name: 'Lambda Pi Upsilon Sorority, Inc.', greekLetters: 'ΛΠΥ', founded: 1992, type: 'sorority' },
    ]
  },
  {
    id: 'napa',
    name: 'NAPA',
    fullName: 'National APIDA Panhellenic Association',
    description: 'Asian Pacific Islander Desi American Greek organizations',
    organizations: [
      { name: 'alpha Kappa Delta Phi', greekLetters: 'αΚΔΦ', founded: 1990, type: 'sorority' },
      { name: 'Delta Epsilon Psi', greekLetters: 'ΔΕΨ', founded: 1998, type: 'fraternity' },
      { name: 'Delta Phi Lambda', greekLetters: 'ΔΦΛ', founded: 1998, type: 'sorority' },
      { name: 'Kappa Phi Lambda', greekLetters: 'ΚΦΛ', founded: 1995, type: 'sorority' },
      { name: 'Lambda Phi Epsilon', greekLetters: 'ΛΦΕ', founded: 1981, type: 'fraternity' },
      { name: 'Pi Alpha Phi', greekLetters: 'ΠΑΦ', founded: 1929, type: 'fraternity' },
      { name: 'Pi Delta Psi', greekLetters: 'ΠΔΨ', founded: 1994, type: 'fraternity' },
      { name: 'Sigma Beta Rho', greekLetters: 'ΣΒΡ', founded: 1996, type: 'fraternity' },
      { name: 'Sigma Omicron Pi', greekLetters: 'ΣΟΠ', founded: 1930, type: 'sorority' },
      { name: 'Sigma Psi Zeta', greekLetters: 'ΣΨΖ', founded: 1994, type: 'sorority' },
      { name: 'Chi Sigma Tau', greekLetters: 'ΧΣΤ', founded: 1999, type: 'fraternity' },
      { name: 'Delta Kappa Delta', greekLetters: 'ΔΚΔ', founded: 1999, type: 'sorority' },
      { name: 'Sigma Sigma Rho', greekLetters: 'ΣΣΡ', founded: 1998, type: 'sorority' },
    ]
  },
  {
    id: 'nmgc',
    name: 'NMGC',
    fullName: 'National Multicultural Greek Council',
    description: 'Multicultural Greek organizations',
    organizations: [
      { name: 'Alpha Psi Lambda National Inc.', greekLetters: 'ΑΨΛ', founded: 1985, type: 'fraternity' },
      { name: 'Delta Xi Phi Multicultural Sorority, Inc.', greekLetters: 'ΔΞΦ', founded: 1994, type: 'sorority' },
      { name: 'Mu Sigma Upsilon Sorority, Inc.', greekLetters: 'ΜΣΥ', founded: 1981, type: 'sorority' },
      { name: 'Sigma Lambda Alpha Sorority, Inc.', greekLetters: 'ΣΛΑ', founded: 1992, type: 'sorority' },
      { name: 'Theta Nu Xi Multicultural Sorority, Inc.', greekLetters: 'ΘΝΞ', founded: 1997, type: 'sorority' },
      { name: 'Delta Xi Nu Multicultural Sorority, Inc.', greekLetters: 'ΔΞΝ', founded: 1997, type: 'sorority' },
      { name: 'Gamma Eta', greekLetters: 'ΓΗ', founded: 1995, type: 'fraternity' },
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    fullName: 'Professional Greek Organizations',
    description: 'Career and industry-focused Greek organizations',
    organizations: [
      { name: 'Alpha Kappa Psi', greekLetters: 'ΑΚΨ', founded: 1904, type: 'fraternity' },
      { name: 'Delta Sigma Pi', greekLetters: 'ΔΣΠ', founded: 1907, type: 'fraternity' },
      { name: 'Phi Delta Epsilon', greekLetters: 'ΦΔΕ', founded: 1904, type: 'fraternity' },
      { name: 'Phi Chi Medical Fraternity', greekLetters: 'ΦΧ', founded: 1889, type: 'fraternity' },
      { name: 'Alpha Omega', greekLetters: 'ΑΩ', founded: 1907, type: 'fraternity' },
      { name: 'Phi Alpha Delta Law Fraternity', greekLetters: 'ΦΑΔ', founded: 1902, type: 'fraternity' },
      { name: 'Kappa Psi Pharmaceutical Fraternity', greekLetters: 'ΚΨ', founded: 1879, type: 'fraternity' },
      { name: 'Alpha Phi Omega', greekLetters: 'ΑΦΩ', founded: 1925, type: 'fraternity' },
      { name: 'Sigma Alpha Iota', greekLetters: 'ΣΑΙ', founded: 1903, type: 'sorority' },
      { name: 'Phi Mu Alpha Sinfonia', greekLetters: 'ΦΜΑ', founded: 1898, type: 'fraternity' },
    ]
  },
  {
    id: 'honor',
    name: 'Honor',
    fullName: 'Honor Societies',
    description: 'Academic and honor Greek organizations',
    organizations: [
      { name: 'Phi Beta Kappa', greekLetters: 'ΦΒΚ', founded: 1776, type: 'fraternity' },
      { name: 'Phi Kappa Phi', greekLetters: 'ΦΚΦ', founded: 1897, type: 'fraternity' },
      { name: 'Golden Key International Honour Society', greekLetters: 'GK', founded: 1977, type: 'fraternity' },
      { name: 'Tau Beta Pi', greekLetters: 'ΤΒΠ', founded: 1885, type: 'fraternity' },
      { name: 'Alpha Lambda Delta', greekLetters: 'ΑΛΔ', founded: 1924, type: 'sorority' },
      { name: 'Mortar Board', greekLetters: 'MB', founded: 1918, type: 'sorority' },
      { name: 'Order of Omega', greekLetters: 'OΩ', founded: 1959, type: 'fraternity' },
      { name: 'Omicron Delta Kappa', greekLetters: 'ΟΔΚ', founded: 1914, type: 'fraternity' },
    ]
  },
  {
    id: 'other',
    name: 'Other',
    fullName: 'Other Greek Organizations',
    description: 'Local, regional, and independent Greek organizations',
    organizations: []
  }
];

// Helper function to get all organizations flat
export function getAllOrganizations(): (GreekOrganization & { council: string })[] {
  return GREEK_COUNCILS.flatMap(council => 
    council.organizations.map(org => ({
      ...org,
      council: council.id
    }))
  );
}

// Helper function to get organizations by council
export function getOrganizationsByCouncil(councilId: string): GreekOrganization[] {
  const council = GREEK_COUNCILS.find(c => c.id === councilId);
  return council?.organizations || [];
}

// Helper function to find organization by name
export function findOrganization(name: string): (GreekOrganization & { council: string }) | undefined {
  for (const council of GREEK_COUNCILS) {
    const org = council.organizations.find(o => o.name === name);
    if (org) {
      return { ...org, council: council.id };
    }
  }
  return undefined;
}

// Member status options
export const MEMBER_STATUSES = [
  { value: 'active', label: 'Active Member' },
  { value: 'alumni', label: 'Alumni/Graduate' },
  { value: 'associate', label: 'Associate Member' },
  { value: 'honorary', label: 'Honorary Member' },
  { value: 'interested', label: 'Interested (Not Yet Initiated)' },
];
