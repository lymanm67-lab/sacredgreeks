import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, Users, Shield, BookOpen, Compass, Heart, Award, ArrowRight, AlertTriangle, Calendar, Building2, GraduationCap, Star } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Organization {
  name: string;
  greekLetters: string;
  founded: string;
  foundedLocation: string;
  colors: string;
  motto?: string;
  symbol?: string;
  nickname?: string;
}

const GreekLife = () => {
  const divineNine: Organization[] = [
    {
      name: "Alpha Phi Alpha Fraternity, Inc.",
      greekLetters: "ΑΦΑ",
      founded: "December 4, 1906",
      foundedLocation: "Cornell University",
      colors: "Black and Old Gold",
      motto: "First of All, Servants of All, We Shall Transcend All",
      symbol: "Sphinx",
      nickname: "Alphas, Ice Cold"
    },
    {
      name: "Alpha Kappa Alpha Sorority, Inc.",
      greekLetters: "ΑΚΑ",
      founded: "January 15, 1908",
      foundedLocation: "Howard University",
      colors: "Salmon Pink and Apple Green",
      motto: "By Culture and By Merit",
      symbol: "Ivy Leaf",
      nickname: "AKAs, Pretty Girls"
    },
    {
      name: "Kappa Alpha Psi Fraternity, Inc.",
      greekLetters: "ΚΑΨ",
      founded: "January 5, 1911",
      foundedLocation: "Indiana University",
      colors: "Crimson and Cream",
      motto: "Achievement in Every Field of Human Endeavor",
      symbol: "Diamond",
      nickname: "Kappas, Nupes"
    },
    {
      name: "Omega Psi Phi Fraternity, Inc.",
      greekLetters: "ΩΨΦ",
      founded: "November 17, 1911",
      foundedLocation: "Howard University",
      colors: "Royal Purple and Old Gold",
      motto: "Friendship is Essential to the Soul",
      symbol: "Lamp",
      nickname: "Ques, Omega Men"
    },
    {
      name: "Delta Sigma Theta Sorority, Inc.",
      greekLetters: "ΔΣΘ",
      founded: "January 13, 1913",
      foundedLocation: "Howard University",
      colors: "Crimson and Cream",
      motto: "Intelligence is the Torch of Wisdom",
      symbol: "Pyramid, Elephant",
      nickname: "Deltas"
    },
    {
      name: "Phi Beta Sigma Fraternity, Inc.",
      greekLetters: "ΦΒΣ",
      founded: "January 9, 1914",
      foundedLocation: "Howard University",
      colors: "Royal Blue and Pure White",
      motto: "Culture for Service and Service for Humanity",
      symbol: "Dove, Crescent Moon",
      nickname: "Sigmas"
    },
    {
      name: "Zeta Phi Beta Sorority, Inc.",
      greekLetters: "ΖΦΒ",
      founded: "January 16, 1920",
      foundedLocation: "Howard University",
      colors: "Royal Blue and White",
      motto: "A community-conscious, action-oriented organization",
      symbol: "Dove, White Rose",
      nickname: "Zetas"
    },
    {
      name: "Sigma Gamma Rho Sorority, Inc.",
      greekLetters: "ΣΓΡ",
      founded: "November 12, 1922",
      foundedLocation: "Butler University",
      colors: "Royal Blue and Gold",
      motto: "Greater Service, Greater Progress",
      symbol: "Poodle",
      nickname: "SGRhos, Pretty Poodles"
    },
    {
      name: "Iota Phi Theta Fraternity, Inc.",
      greekLetters: "ΙΦΘ",
      founded: "September 19, 1963",
      foundedLocation: "Morgan State University",
      colors: "Charcoal Brown and Gilded Gold",
      motto: "Building a Tradition, Not Resting Upon One",
      symbol: "Centaur",
      nickname: "Iotas"
    }
  ];

  const npcSororities: Organization[] = [
    { name: "Alpha Chi Omega", greekLetters: "ΑΧΩ", founded: "October 15, 1885", foundedLocation: "DePauw University", colors: "Scarlet Red and Olive Green" },
    { name: "Alpha Delta Pi", greekLetters: "ΑΔΠ", founded: "May 15, 1851", foundedLocation: "Wesleyan Female College", colors: "Azure Blue and White" },
    { name: "Alpha Epsilon Phi", greekLetters: "ΑΕΦ", founded: "October 24, 1909", foundedLocation: "Barnard College", colors: "Green and White" },
    { name: "Alpha Gamma Delta", greekLetters: "ΑΓΔ", founded: "May 30, 1904", foundedLocation: "Syracuse University", colors: "Red, Buff, and Green" },
    { name: "Alpha Omicron Pi", greekLetters: "ΑΟΠ", founded: "January 2, 1897", foundedLocation: "Barnard College", colors: "Cardinal Red" },
    { name: "Alpha Phi", greekLetters: "ΑΦ", founded: "October 10, 1872", foundedLocation: "Syracuse University", colors: "Bordeaux and Silver" },
    { name: "Alpha Sigma Alpha", greekLetters: "ΑΣΑ", founded: "November 15, 1901", foundedLocation: "Longwood University", colors: "Crimson and Pearl White" },
    { name: "Alpha Sigma Tau", greekLetters: "ΑΣΤ", founded: "November 4, 1899", foundedLocation: "Eastern Michigan University", colors: "Emerald Green and Gold" },
    { name: "Alpha Xi Delta", greekLetters: "ΑΞΔ", founded: "April 17, 1893", foundedLocation: "Lombard College", colors: "Double Blue and Gold" },
    { name: "Chi Omega", greekLetters: "ΧΩ", founded: "April 5, 1895", foundedLocation: "University of Arkansas", colors: "Cardinal and Straw" },
    { name: "Delta Delta Delta", greekLetters: "ΔΔΔ", founded: "November 27, 1888", foundedLocation: "Boston University", colors: "Silver, Gold, and Cerulean Blue" },
    { name: "Delta Gamma", greekLetters: "ΔΓ", founded: "December 25, 1873", foundedLocation: "Lewis School", colors: "Bronze, Pink, and Blue" },
    { name: "Delta Zeta", greekLetters: "ΔΖ", founded: "October 24, 1902", foundedLocation: "Miami University", colors: "Rose and Green" },
    { name: "Gamma Phi Beta", greekLetters: "ΓΦΒ", founded: "November 11, 1874", foundedLocation: "Syracuse University", colors: "Brown and Mode" },
    { name: "Kappa Alpha Theta", greekLetters: "ΚΑΘ", founded: "January 27, 1870", foundedLocation: "DePauw University", colors: "Black and Gold" },
    { name: "Kappa Delta", greekLetters: "ΚΔ", founded: "October 23, 1897", foundedLocation: "Longwood University", colors: "Olive Green and Pearl White" },
    { name: "Kappa Kappa Gamma", greekLetters: "ΚΚΓ", founded: "October 13, 1870", foundedLocation: "Monmouth College", colors: "Dark Blue and Light Blue" },
    { name: "Phi Mu", greekLetters: "ΦΜ", founded: "January 4, 1852", foundedLocation: "Wesleyan College", colors: "Rose and White" },
    { name: "Phi Sigma Sigma", greekLetters: "ΦΣΣ", founded: "November 26, 1913", foundedLocation: "Hunter College", colors: "King Blue and Gold" },
    { name: "Pi Beta Phi", greekLetters: "ΠΒΦ", founded: "April 28, 1867", foundedLocation: "Monmouth College", colors: "Wine and Silver Blue" },
    { name: "Sigma Delta Tau", greekLetters: "ΣΔΤ", founded: "March 25, 1917", foundedLocation: "Cornell University", colors: "Café au Lait and Blue" },
    { name: "Sigma Kappa", greekLetters: "ΣΚ", founded: "November 9, 1874", foundedLocation: "Colby College", colors: "Maroon and Lavender" },
    { name: "Sigma Sigma Sigma", greekLetters: "ΣΣΣ", founded: "April 20, 1898", foundedLocation: "Longwood University", colors: "Royal Purple and White" },
    { name: "Theta Phi Alpha", greekLetters: "ΘΦΑ", founded: "August 30, 1912", foundedLocation: "University of Michigan", colors: "Silver, Gold, and Blue" },
    { name: "Zeta Tau Alpha", greekLetters: "ΖΤΑ", founded: "October 15, 1898", foundedLocation: "Longwood University", colors: "Turquoise Blue and Steel Grey" },
  ];

  const ifcFraternities: Organization[] = [
    { name: "Alpha Tau Omega", greekLetters: "ΑΤΩ", founded: "September 11, 1865", foundedLocation: "Virginia Military Institute", colors: "Azure Blue and Old Gold" },
    { name: "Beta Theta Pi", greekLetters: "ΒΘΠ", founded: "August 8, 1839", foundedLocation: "Miami University", colors: "Pink and Blue" },
    { name: "Delta Chi", greekLetters: "ΔΧ", founded: "October 13, 1890", foundedLocation: "Cornell University", colors: "Red and Buff" },
    { name: "Delta Tau Delta", greekLetters: "ΔΤΔ", founded: "1858", foundedLocation: "Bethany College", colors: "Purple, White, and Gold" },
    { name: "Delta Upsilon", greekLetters: "ΔΥ", founded: "November 4, 1834", foundedLocation: "Williams College", colors: "Old Gold and Sapphire Blue" },
    { name: "Kappa Alpha Order", greekLetters: "ΚΑ", founded: "December 21, 1865", foundedLocation: "Washington and Lee University", colors: "Crimson and Old Gold" },
    { name: "Kappa Sigma", greekLetters: "ΚΣ", founded: "December 10, 1869", foundedLocation: "University of Virginia", colors: "Scarlet, White, and Green" },
    { name: "Lambda Chi Alpha", greekLetters: "ΛΧΑ", founded: "November 2, 1909", foundedLocation: "Boston University", colors: "Purple, Green, and Gold" },
    { name: "Phi Delta Theta", greekLetters: "ΦΔΘ", founded: "December 26, 1848", foundedLocation: "Miami University", colors: "Azure Blue and Argent White" },
    { name: "Phi Gamma Delta (FIJI)", greekLetters: "ΦΓΔ", founded: "April 22, 1848", foundedLocation: "Jefferson College", colors: "Royal Purple" },
    { name: "Phi Kappa Psi", greekLetters: "ΦΚΨ", founded: "February 19, 1852", foundedLocation: "Jefferson College", colors: "Cardinal Red and Hunter Green" },
    { name: "Phi Kappa Tau", greekLetters: "ΦΚΤ", founded: "March 17, 1906", foundedLocation: "Miami University", colors: "Harvard Red and Old Gold" },
    { name: "Pi Kappa Alpha", greekLetters: "ΠΚΑ", founded: "March 1, 1868", foundedLocation: "University of Virginia", colors: "Garnet and Old Gold" },
    { name: "Pi Kappa Phi", greekLetters: "ΠΚΦ", founded: "December 10, 1904", foundedLocation: "College of Charleston", colors: "Gold and White" },
    { name: "Sigma Alpha Epsilon", greekLetters: "ΣΑΕ", founded: "March 9, 1856", foundedLocation: "University of Alabama", colors: "Royal Purple and Old Gold" },
    { name: "Sigma Chi", greekLetters: "ΣΧ", founded: "June 28, 1855", foundedLocation: "Miami University", colors: "Blue and Old Gold" },
    { name: "Sigma Nu", greekLetters: "ΣΝ", founded: "January 1, 1869", foundedLocation: "Virginia Military Institute", colors: "Black, White, and Gold" },
    { name: "Sigma Phi Epsilon", greekLetters: "ΣΦΕ", founded: "November 1, 1901", foundedLocation: "University of Richmond", colors: "Purple and Red" },
    { name: "Tau Kappa Epsilon", greekLetters: "ΤΚΕ", founded: "January 10, 1899", foundedLocation: "Illinois Wesleyan University", colors: "Cherry and Grey" },
    { name: "Theta Chi", greekLetters: "ΘΧ", founded: "April 10, 1856", foundedLocation: "Norwich University", colors: "Military Red and White" },
  ];

  const professionalServiceOrgs: Organization[] = [
    {
      name: "Alpha Phi Omega",
      greekLetters: "ΑΦΩ",
      founded: "December 16, 1925",
      foundedLocation: "Lafayette College",
      colors: "Blue and Gold",
      motto: "Be a Leader, Be a Friend, Be of Service",
      symbol: "Torch",
      nickname: "Largest Co-Ed Service Fraternity"
    },
    {
      name: "Phi Mu Alpha Sinfonia",
      greekLetters: "ΦΜΑ",
      founded: "October 6, 1898",
      foundedLocation: "New England Conservatory",
      colors: "Red and Black",
      motto: "For the development of the best and truest fraternal spirit",
      symbol: "Sinfonian Seal",
      nickname: "Music Fraternity"
    },
    {
      name: "Kappa Kappa Psi",
      greekLetters: "ΚΚΨ",
      founded: "November 27, 1919",
      foundedLocation: "Oklahoma A&M",
      colors: "Blue and White",
      motto: "Strive for the Highest",
      symbol: "Lyre",
      nickname: "Band Fraternity"
    },
    {
      name: "Tau Beta Sigma",
      greekLetters: "ΤΒΣ",
      founded: "March 26, 1946",
      foundedLocation: "Texas Tech University",
      colors: "Blue and White",
      motto: "For Greater Bands",
      symbol: "Lyre",
      nickname: "Band Sorority"
    },
    {
      name: "Sigma Alpha Iota",
      greekLetters: "ΣΑΙ",
      founded: "June 12, 1903",
      foundedLocation: "University School of Music",
      colors: "Crimson and White",
      motto: "Vita brevis, ars longa (Life is short, art is long)",
      symbol: "Pansy, Red Rose",
      nickname: "Women's Music Fraternity"
    },
    {
      name: "Gamma Sigma Sigma",
      greekLetters: "ΓΣΣ",
      founded: "October 12, 1952",
      foundedLocation: "SUNY Albany",
      colors: "Maroon and White",
      motto: "Unity in Service",
      symbol: "Sailboat",
      nickname: "Service Sorority"
    },
    {
      name: "Delta Sigma Pi",
      greekLetters: "ΔΣΠ",
      founded: "November 7, 1907",
      foundedLocation: "New York University",
      colors: "Purple and Gold",
      motto: "Through Commerce, Civilization",
      nickname: "Professional Business Fraternity"
    },
    {
      name: "Phi Delta Epsilon",
      greekLetters: "ΦΔΕ",
      founded: "October 13, 1904",
      foundedLocation: "Cornell University",
      colors: "Green and White",
      motto: "Facta Non Verba (Deeds Not Words)",
      nickname: "Medical Fraternity"
    },
    {
      name: "Alpha Omega Alpha",
      greekLetters: "ΑΩΑ",
      founded: "August 25, 1902",
      foundedLocation: "University of Illinois",
      colors: "Green and White",
      motto: "Be Worthy to Serve the Suffering",
      nickname: "Medical Honor Society"
    },
    {
      name: "Phi Alpha Delta",
      greekLetters: "ΦΑΔ",
      founded: "November 5, 1902",
      foundedLocation: "University of Southern California",
      colors: "Gold and Purple",
      motto: "Service to the Student, the School, the Profession, and the Community",
      nickname: "Law Fraternity"
    },
    {
      name: "Delta Theta Phi",
      greekLetters: "ΔΘΦ",
      founded: "November 27, 1900",
      foundedLocation: "Baldwin-Wallace University",
      colors: "Green and White",
      motto: "Lawyers for a Better World",
      nickname: "Law Fraternity"
    },
    {
      name: "Alpha Kappa Psi",
      greekLetters: "ΑΚΨ",
      founded: "October 5, 1904",
      foundedLocation: "New York University",
      colors: "Navy Blue and Gold",
      motto: "Shaping People, Shaping Business",
      nickname: "Professional Business Fraternity"
    },
  ];

  const leadershipHonorSocieties: Organization[] = [
    {
      name: "Sigma Alpha Pi (NSLS)",
      greekLetters: "ΣΑΠ",
      founded: "2001",
      foundedLocation: "City University of New York",
      colors: "Blue and Gold",
      motto: "Building Leaders Who Make a Better World",
      symbol: "Torch of Leadership",
      nickname: "The National Society of Leadership and Success"
    },
    {
      name: "Phi Beta Kappa",
      greekLetters: "ΦΒΚ",
      founded: "December 5, 1776",
      foundedLocation: "College of William & Mary",
      colors: "Pink and Blue",
      motto: "Love of learning is the guide of life"
    },
    {
      name: "Tau Beta Pi",
      greekLetters: "ΤΒΠ",
      founded: "1885",
      foundedLocation: "Lehigh University",
      colors: "Seal Brown and White",
      motto: "Integrity and Excellence in Engineering",
      nickname: "Engineering Honor Society"
    },
    {
      name: "Beta Gamma Sigma",
      greekLetters: "ΒΓΣ",
      founded: "1913",
      foundedLocation: "University of Wisconsin-Madison",
      colors: "Blue and Gold",
      motto: "Honor and Integrity in Business",
      nickname: "Business Honor Society"
    },
    {
      name: "Psi Chi",
      greekLetters: "ΨΧ",
      founded: "1929",
      foundedLocation: "Ninth International Congress of Psychology",
      colors: "Blue and Gold",
      motto: "Eye to the future, hand to the past",
      nickname: "Psychology Honor Society"
    },
    {
      name: "Phi Kappa Phi",
      greekLetters: "ΦΚΦ",
      founded: "1897",
      foundedLocation: "University of Maine",
      colors: "Gold and White",
      motto: "Let the love of learning rule humanity"
    },
    {
      name: "Alpha Lambda Delta",
      greekLetters: "ΑΛΔ",
      founded: "1924",
      foundedLocation: "University of Illinois",
      colors: "Red, Gold, and White",
      motto: "Scholarship, Leadership, Service"
    },
    {
      name: "Omicron Delta Kappa",
      greekLetters: "ΟΔΚ",
      founded: "December 3, 1914",
      foundedLocation: "Washington and Lee University",
      colors: "Sky Blue, White, and Black",
      motto: "Leadership in worthwhile activities"
    },
    {
      name: "Alpha Epsilon Delta",
      greekLetters: "ΑΕΔ",
      founded: "1926",
      foundedLocation: "University of Alabama",
      colors: "Red and Violet",
      motto: "Pre-Health Honor Society",
      nickname: "Pre-Med Honor Society"
    },
    {
      name: "Sigma Tau Delta",
      greekLetters: "ΣΤΔ",
      founded: "1924",
      foundedLocation: "Dakota Wesleyan University",
      colors: "Red and Black",
      motto: "English Honor Society",
      nickname: "International English Honor Society"
    },
    {
      name: "Golden Key International Honour Society",
      greekLetters: "GK",
      founded: "1977",
      foundedLocation: "Georgia State University",
      colors: "Black and Gold",
      motto: "Academics, Leadership, Service",
      nickname: "Top 15% Academic Honor Society"
    },
    {
      name: "Mortar Board",
      greekLetters: "MB",
      founded: "1918",
      foundedLocation: "Ohio State University",
      colors: "Silver and Black",
      motto: "Premier Senior Honor Society",
      nickname: "Senior Honor Society"
    },
  ];

  const multiculturalGreeks: Organization[] = [
    // NALFO - Latino Organizations
    {
      name: "Lambda Theta Alpha",
      greekLetters: "ΛΘΑ",
      founded: "December 1975",
      foundedLocation: "Kean University",
      colors: "Burgundy and Gray",
      motto: "Latinas Leading Through Diversity",
      nickname: "First Latina Sorority"
    },
    {
      name: "Lambda Theta Phi",
      greekLetters: "ΛΘΦ",
      founded: "December 1, 1975",
      foundedLocation: "Kean University",
      colors: "Brown and White",
      motto: "Chivalry Above Self",
      nickname: "First Latino Fraternity"
    },
    {
      name: "Sigma Lambda Beta",
      greekLetters: "ΣΛΒ",
      founded: "April 4, 1986",
      foundedLocation: "University of Iowa",
      colors: "Royal Purple and Pure White",
      motto: "Opportunity for Wisdom, Wisdom for Culture"
    },
    {
      name: "Sigma Lambda Gamma",
      greekLetters: "ΣΛΓ",
      founded: "April 9, 1990",
      foundedLocation: "University of Iowa",
      colors: "Shocking Pink and Majestic Purple",
      motto: "Culture is Pride and Pride is Success"
    },
    {
      name: "Lambda Upsilon Lambda",
      greekLetters: "ΛΥΛ",
      founded: "February 19, 1982",
      foundedLocation: "Cornell University",
      colors: "Purple and Black",
      motto: "La Unidad Para Siempre",
      nickname: "LUL"
    },
    {
      name: "Phi Iota Alpha",
      greekLetters: "ΦΙΑ",
      founded: "December 26, 1931",
      foundedLocation: "Rensselaer Polytechnic Institute",
      colors: "Blue and Gold",
      motto: "Semper Parati Semper Juncti",
      nickname: "Oldest Latino Fraternity"
    },
    {
      name: "Lambda Alpha Upsilon",
      greekLetters: "ΛΑΥ",
      founded: "December 10, 1982",
      foundedLocation: "University at Buffalo",
      colors: "Powder Blue, Black, and Gold",
      motto: "Once a Lambda Man, Always a Lambda Man"
    },
    {
      name: "Chi Upsilon Sigma",
      greekLetters: "ΧΥΣ",
      founded: "April 29, 1980",
      foundedLocation: "Rutgers University",
      colors: "Red, Black, and White",
      motto: "Corazones Unidos Siempre"
    },
    {
      name: "Kappa Delta Chi",
      greekLetters: "ΚΔΧ",
      founded: "April 6, 1987",
      foundedLocation: "Texas Tech University",
      colors: "Orange and White",
      motto: "Hermandad, Unidad, Liderazgo"
    },
    {
      name: "Gamma Phi Omega",
      greekLetters: "ΓΦΩ",
      founded: "February 5, 1991",
      foundedLocation: "Indiana University",
      colors: "Purple, Pink, and White",
      motto: "Achieving Through Unity"
    },
    // NAPA - Asian Organizations
    {
      name: "Lambda Phi Epsilon",
      greekLetters: "ΛΦΕ",
      founded: "February 25, 1981",
      foundedLocation: "UCLA",
      colors: "Royal Blue and White",
      motto: "To Be a Leader Among Men",
      nickname: "Largest Asian-Interest Fraternity"
    },
    {
      name: "alpha Kappa Delta Phi",
      greekLetters: "αΚΔΦ",
      founded: "February 7, 1990",
      foundedLocation: "UC Berkeley",
      colors: "Violet and White",
      motto: "Timeless Friendship Through Sisterhood",
      nickname: "Largest Asian-Interest Sorority"
    },
    {
      name: "Kappa Phi Lambda",
      greekLetters: "ΚΦΛ",
      founded: "March 9, 1995",
      foundedLocation: "Binghamton University",
      colors: "Red and Crème",
      motto: "Sisterhood, Service, Cultural Diversity"
    },
    {
      name: "Pi Delta Psi",
      greekLetters: "ΠΔΨ",
      founded: "February 20, 1994",
      foundedLocation: "Binghamton University",
      colors: "Navy and Silver",
      motto: "Strength in Brotherhood, Excellence in Diversity"
    },
    {
      name: "Chi Sigma Tau",
      greekLetters: "ΧΣΤ",
      founded: "1999",
      foundedLocation: "SUNY Plattsburgh",
      colors: "Royal Blue and White",
      motto: "Cultura, Servicio, Trabajo"
    },
    {
      name: "Psi Sigma Phi",
      greekLetters: "ΨΣΦ",
      founded: "1990",
      foundedLocation: "Troy State University",
      colors: "Blue, White, and Gold",
      motto: "Promoting Asian-American Awareness"
    },
    {
      name: "Sigma Psi Zeta",
      greekLetters: "ΣΨΖ",
      founded: "March 23, 1994",
      foundedLocation: "University at Albany",
      colors: "Royal Blue and White",
      motto: "Empowering Womyn for Over 30 Years"
    },
    {
      name: "Delta Kappa Delta",
      greekLetters: "ΔΚΔ",
      founded: "1998",
      foundedLocation: "University of Texas at Dallas",
      colors: "White and Blue",
      motto: "Asian-Interest Sorority"
    },
    {
      name: "Omega Phi Alpha",
      greekLetters: "ΩΦΑ",
      founded: "March 3, 1990",
      foundedLocation: "University of Pittsburgh",
      colors: "Navy Blue and White",
      motto: "Asian-American Fraternity"
    },
    // South Asian Organizations
    {
      name: "Delta Epsilon Psi",
      greekLetters: "ΔΕΨ",
      founded: "November 3, 1998",
      foundedLocation: "University of Texas at Austin",
      colors: "Purple and Gold",
      motto: "Brotherhood Through Diversity",
      nickname: "First South Asian Fraternity in Texas"
    },
    {
      name: "Sigma Sigma Rho",
      greekLetters: "ΣΣΡ",
      founded: "September 24, 1998",
      foundedLocation: "The College of New Jersey",
      colors: "Purple and White",
      motto: "Shaping Young Women Into Leaders",
      nickname: "South Asian Sorority"
    },
    {
      name: "Delta Phi Omega",
      greekLetters: "ΔΦΩ",
      founded: "November 1998",
      foundedLocation: "University of Texas at Dallas",
      colors: "Maroon and White",
      motto: "Dare Pursue Own",
      nickname: "First South Asian Sorority"
    },
    {
      name: "Sigma Beta Rho",
      greekLetters: "ΣΒΡ",
      founded: "May 15, 1996",
      foundedLocation: "University of Pennsylvania",
      colors: "Royal Blue and Chocolate Brown",
      motto: "Friendship, Brotherhood, and Scholarship"
    },
    {
      name: "Kappa Phi Gamma",
      greekLetters: "ΚΦΓ",
      founded: "August 1998",
      foundedLocation: "University of Pennsylvania",
      colors: "Fuchsia and Black",
      motto: "First South Asian Interest Sorority"
    },
    {
      name: "Beta Chi Theta",
      greekLetters: "ΒΧΘ",
      founded: "February 11, 1999",
      foundedLocation: "UCLA",
      colors: "Crimson and Gold",
      motto: "Brotherhood, Courage, Honor"
    },
    {
      name: "Delta Sigma Iota",
      greekLetters: "ΔΣΙ",
      founded: "October 11, 2000",
      foundedLocation: "Texas A&M University",
      colors: "Blue, Gold, and White",
      motto: "Dedication, Service, Integrity"
    },
    {
      name: "Sigma Alpha Epsilon Pi",
      greekLetters: "ΣΑΕΠ",
      founded: "1998",
      foundedLocation: "UCLA",
      colors: "Pink and Black",
      motto: "Jewish Sisterhood with South Asian chapters"
    },
  ];

  const jewishGreeks: Organization[] = [
    {
      name: "Alpha Epsilon Pi",
      greekLetters: "ΑΕΠ",
      founded: "November 7, 1913",
      foundedLocation: "New York University",
      colors: "Blue and Gold",
      motto: "Developing Leadership for the Jewish Community",
      symbol: "Lion of Judah",
      nickname: "AEPi"
    },
    {
      name: "Zeta Beta Tau",
      greekLetters: "ΖΒΤ",
      founded: "December 29, 1898",
      foundedLocation: "City College of New York",
      colors: "Blue and White",
      motto: "A Tradition of Brotherhood",
      nickname: "ZBT"
    },
    {
      name: "Sigma Alpha Mu",
      greekLetters: "ΣΑΜ",
      founded: "November 26, 1909",
      foundedLocation: "City College of New York",
      colors: "Purple and White",
      motto: "Upon the Highest Principles of Judaism",
      nickname: "Sammy"
    },
    {
      name: "Tau Epsilon Phi",
      greekLetters: "ΤΕΦ",
      founded: "October 19, 1910",
      foundedLocation: "Columbia University",
      colors: "Lavender and White",
      motto: "Friendship, Chivalry, Service",
      nickname: "TEP"
    },
    {
      name: "Alpha Epsilon Phi",
      greekLetters: "ΑΕΦ",
      founded: "October 24, 1909",
      foundedLocation: "Barnard College",
      colors: "Green and White",
      motto: "Multa Corda, Una Causa (Many Hearts, One Purpose)",
      nickname: "AEPhi - Jewish Sorority"
    },
    {
      name: "Sigma Delta Tau",
      greekLetters: "ΣΔΤ",
      founded: "March 25, 1917",
      foundedLocation: "Cornell University",
      colors: "Café au Lait and Blue",
      motto: "Friendship, Service, Sincerity",
      nickname: "SDT - Jewish Sorority"
    },
    {
      name: "Delta Phi Epsilon",
      greekLetters: "ΔΦΕ",
      founded: "March 17, 1917",
      foundedLocation: "New York University",
      colors: "Royal Purple and Pure Gold",
      motto: "Esse Quam Videri (To Be Rather Than to Seem)",
      nickname: "DPhiE - Jewish Sorority"
    },
  ];

  const socialFellowships: Organization[] = [
    {
      name: "Groove Phi Groove Social Fellowship, Inc.",
      greekLetters: "GΦG",
      founded: "January 12, 1962",
      foundedLocation: "Morgan State University",
      colors: "Black and White",
      motto: "Ladies First, Scholarship Always",
      symbol: "Omega Cane",
      nickname: "The Fellowship, G-Phi-G"
    },
    {
      name: "Swing Phi Swing Social Fellowship, Inc.",
      greekLetters: "SΦS",
      founded: "March 13, 1969",
      foundedLocation: "Winston-Salem State University",
      colors: "Red, White, and Black",
      motto: "Sisterhood, Scholarship, and Service",
      symbol: "Rose",
      nickname: "Swings"
    },
    {
      name: "Malik Fraternity, Inc.",
      greekLetters: "MALIK",
      founded: "1977",
      foundedLocation: "City University of New York",
      colors: "Black and Gold",
      motto: "Men Acquiring Leadership, Intelligence, and Knowledge",
      nickname: "First Hip-Hop Fraternity"
    },
    {
      name: "Kappa Kappa Psi (Social)",
      greekLetters: "ΚΚΨ",
      founded: "May 9, 1994",
      foundedLocation: "Texas Southern University",
      colors: "Black, Old Gold, and Crimson",
      motto: "Brothers in Unity",
      nickname: "Not affiliated with band fraternity"
    },
  ];

  const masonicFraternal: Organization[] = [
    {
      name: "Freemasonry (Blue Lodge)",
      greekLetters: "F&AM",
      founded: "1717",
      foundedLocation: "London, England",
      colors: "Blue and Gold",
      motto: "Brotherly Love, Relief, and Truth",
      symbol: "Square and Compass",
      nickname: "The Craft"
    },
    {
      name: "Prince Hall Freemasonry",
      greekLetters: "PHAF&AM",
      founded: "1784",
      foundedLocation: "Boston, Massachusetts",
      colors: "Blue and Gold",
      motto: "Brotherly Love, Relief, and Truth",
      symbol: "Square and Compass",
      nickname: "Prince Hall Masons"
    },
    {
      name: "Order of the Eastern Star",
      greekLetters: "OES",
      founded: "1850",
      foundedLocation: "United States",
      colors: "Blue, Yellow, White, Green, Red",
      motto: "Fairest Among Thousands, Altogether Lovely",
      symbol: "Five-Pointed Star",
      nickname: "Eastern Star"
    },
    {
      name: "Shriners International",
      greekLetters: "AAONMS",
      founded: "1870",
      foundedLocation: "New York City",
      colors: "Red and Gold",
      motto: "Shriners Having Fun and Helping Kids",
      symbol: "Crescent, Scimitar, Star",
      nickname: "Shriners"
    },
    {
      name: "AEAONMS (Prince Hall Shriners)",
      greekLetters: "AEAONMS",
      founded: "1893",
      foundedLocation: "Chicago, Illinois",
      colors: "Red and Gold",
      motto: "We Never Sleep",
      symbol: "Crescent and Star",
      nickname: "Prince Hall Shriners"
    },
    {
      name: "Knights of Pythias",
      greekLetters: "K of P",
      founded: "February 19, 1864",
      foundedLocation: "Washington, D.C.",
      colors: "Blue, Yellow, and Red",
      motto: "Friendship, Charity, and Benevolence",
      symbol: "Shield, Sword, Helmet",
      nickname: "First fraternity chartered by Congress"
    },
    {
      name: "Improved Benevolent Protective Order of Elks of the World",
      greekLetters: "IBPOEW",
      founded: "1898",
      foundedLocation: "Cincinnati, Ohio",
      colors: "Purple and White",
      motto: "The Best People on Earth",
      symbol: "Elk",
      nickname: "Black Elks"
    },
    {
      name: "Daughters of Isis",
      greekLetters: "DOI",
      founded: "1910",
      foundedLocation: "United States",
      colors: "Green and Gold",
      motto: "Charity, Truth, and Love",
      symbol: "Sphinx, Pyramid",
      nickname: "Shriners Auxiliary"
    },
  ];

  const christianGreeks: Organization[] = [
    {
      name: "Beta Upsilon Chi",
      greekLetters: "BYX",
      founded: "1985",
      foundedLocation: "University of Texas at Austin",
      colors: "Royal Blue and White",
      motto: "Brothers Under Christ",
      symbol: "Cross and Greek Letters",
      nickname: "BYX"
    },
    {
      name: "Sigma Phi Lambda",
      greekLetters: "ΣΦΛ",
      founded: "October 2, 1988",
      foundedLocation: "Texas A&M University",
      colors: "Purple and Gold",
      motto: "Sisters for the Lord",
      symbol: "Cross and Lamb",
      nickname: "SFL - Christian Sorority"
    },
    {
      name: "Alpha Gamma Omega",
      greekLetters: "ΑΓΩ",
      founded: "1927",
      foundedLocation: "UCLA",
      colors: "Purple and Gold",
      motto: "Brotherhood in Christ",
      symbol: "The Alpha and Omega",
      nickname: "AGO"
    },
    {
      name: "Kappa Phi",
      greekLetters: "ΚΦ",
      founded: "1916",
      foundedLocation: "University of Kansas",
      colors: "Red and White",
      motto: "Christian Women in Service",
      symbol: "Cross",
      nickname: "Christian Women's Sorority"
    },
    {
      name: "Chi Alpha Omega",
      greekLetters: "ΧΑΩ",
      founded: "2000",
      foundedLocation: "San Diego State University",
      colors: "Navy Blue and Silver",
      motto: "Serving Christ Through Brotherhood",
      nickname: "Chi Alpha"
    },
    {
      name: "Theta Alpha",
      greekLetters: "ΘΑ",
      founded: "1935",
      foundedLocation: "United States",
      colors: "Royal Blue and White",
      motto: "God First",
      symbol: "Cross",
      nickname: "Nazarene Sorority"
    },
    {
      name: "Phi Gamma Chi",
      greekLetters: "ΦΓΧ",
      founded: "1999",
      foundedLocation: "University of Florida",
      colors: "Black and Gold",
      motto: "Faith, Growth, Christ",
      nickname: "Christian Fraternity"
    },
    {
      name: "Alpha Chi Rho (Christian Heritage)",
      greekLetters: "ΑΧΡ",
      founded: "1895",
      foundedLocation: "Trinity College",
      colors: "Garnet and White",
      motto: "We Dare Maintain",
      symbol: "Chi Rho",
      nickname: "Crows - Episcopal roots"
    },
  ];

  const lgbtqGreeks: Organization[] = [
    {
      name: "Delta Lambda Phi",
      greekLetters: "ΔΛΦ",
      founded: "October 1, 1986",
      foundedLocation: "Washington, D.C.",
      colors: "Purple, Red, and Green",
      motto: "Philanthropy, Scholarship, and Social Responsibility",
      symbol: "Triangle",
      nickname: "DLP"
    },
    {
      name: "Gamma Rho Lambda",
      greekLetters: "ΓΡΛ",
      founded: "November 2003",
      foundedLocation: "Arizona State University",
      colors: "Navy Blue, Yellow, and White",
      motto: "Unity Through Diversity",
      symbol: "Lambda",
      nickname: "GRL - LGBTQ+ Sorority"
    },
    {
      name: "Sigma Phi Beta",
      greekLetters: "ΣΦΒ",
      founded: "April 10, 2003",
      foundedLocation: "Rutgers University",
      colors: "Purple and Silver",
      motto: "Be True to Yourself",
      symbol: "Lambda Phoenix",
      nickname: "SigPhiBeta"
    },
    {
      name: "Lambda Delta Lambda",
      greekLetters: "ΛΔΛ",
      founded: "1988",
      foundedLocation: "University of Vermont",
      colors: "Purple and White",
      motto: "Challenging Homophobia Through Education",
      nickname: "Lesbian/Bisexual Sorority"
    },
    {
      name: "Alpha Lambda Zeta",
      greekLetters: "ΑΛΖ",
      founded: "2006",
      foundedLocation: "Wayne State University",
      colors: "Blue and White",
      motto: "Brotherhood Beyond Labels",
      nickname: "Gay/Bisexual Fraternity"
    },
  ];

  const filipinoGreeks: Organization[] = [
    {
      name: "Kappa Psi Epsilon",
      greekLetters: "ΚΨΕ",
      founded: "1994",
      foundedLocation: "University of California, Berkeley",
      colors: "Maroon and Silver",
      motto: "Strength Through Unity",
      nickname: "Filipino-American Sorority"
    },
    {
      name: "Lambda Theta Delta",
      greekLetters: "ΛΘΔ",
      founded: "1993",
      foundedLocation: "University of Washington",
      colors: "Royal Blue and White",
      motto: "Leading Through Diversity",
      nickname: "Filipino-Interest Sorority"
    },
    {
      name: "Pi Alpha Phi",
      greekLetters: "ΠΑΦ",
      founded: "1929",
      foundedLocation: "University of California, Berkeley",
      colors: "Blue and Gold",
      motto: "First Asian-American Fraternity",
      nickname: "Includes Filipino heritage"
    },
    {
      name: "Gamma Zeta Alpha",
      greekLetters: "ΓΖΑ",
      founded: "1987",
      foundedLocation: "California State University, Chico",
      colors: "Red, Green, and White",
      motto: "Filipino-Interest Fraternity"
    },
    {
      name: "Chi Rho Omicron",
      greekLetters: "ΧΡΟ",
      founded: "1997",
      foundedLocation: "UCLA",
      colors: "Red, White, and Blue",
      motto: "Filipino-American Fraternity"
    },
    {
      name: "Kappa Malong Malong",
      greekLetters: "ΚΜΜ",
      founded: "2002",
      foundedLocation: "University of California, San Diego",
      colors: "Maroon and Gold",
      motto: "Filipino-Interest Sorority"
    },
    {
      name: "Pilipino American Collegiate Endeavor (PACE) Greeks",
      greekLetters: "PACE",
      founded: "Various",
      foundedLocation: "California",
      colors: "Varies",
      motto: "Filipino Heritage Organizations",
      nickname: "Various Filipino Organizations"
    },
  ];

  const militaryGreeks: Organization[] = [
    {
      name: "Sigma Alpha Epsilon Pi (Military Chapter)",
      greekLetters: "ΣΑΕΠ",
      founded: "1856",
      foundedLocation: "University of Alabama",
      colors: "Royal Purple and Old Gold",
      motto: "True Gentlemen - Military Heritage",
      nickname: "Many military chapters"
    },
    {
      name: "Phi Delta Theta (Military Heritage)",
      greekLetters: "ΦΔΘ",
      founded: "1848",
      foundedLocation: "Miami University",
      colors: "Azure and Argent",
      motto: "Founded by soldiers",
      nickname: "Strong military tradition"
    },
    {
      name: "Alpha Tau Omega",
      greekLetters: "ΑΤΩ",
      founded: "September 11, 1865",
      foundedLocation: "Virginia Military Institute",
      colors: "Azure and Gold",
      motto: "Founded by Civil War veterans",
      nickname: "First fraternity founded after Civil War"
    },
    {
      name: "Sigma Nu",
      greekLetters: "ΣΝ",
      founded: "January 1, 1869",
      foundedLocation: "Virginia Military Institute",
      colors: "Black, White, and Gold",
      motto: "Love, Honor, Truth",
      nickname: "VMI Military Heritage"
    },
    {
      name: "Alpha Phi Delta (Military Service)",
      greekLetters: "ΑΦΔ",
      founded: "1914",
      foundedLocation: "Syracuse University",
      colors: "Green and White",
      motto: "Strong veteran membership"
    },
    {
      name: "Omega Delta Sigma",
      greekLetters: "ΩΔΣ",
      founded: "2010",
      foundedLocation: "Texas A&M University",
      colors: "Green and Gold",
      motto: "First Veteran-Only Fraternity",
      nickname: "For student veterans"
    },
    {
      name: "Delta Sigma Mu",
      greekLetters: "ΔΣΜ",
      founded: "2012",
      foundedLocation: "University of Central Florida",
      colors: "Red, White, and Blue",
      motto: "Veteran Fraternity",
      nickname: "Student veteran brotherhood"
    },
    {
      name: "Omega Delta Phi (Military Heritage)",
      greekLetters: "ΩΔΦ",
      founded: "1987",
      foundedLocation: "Texas Tech University",
      colors: "Royal Blue, Kelly Green, and White",
      motto: "Supports military members"
    },
  ];

  const middleEasternGreeks: Organization[] = [
    {
      name: "Alpha Epsilon Omega",
      greekLetters: "ΑΕΩ",
      founded: "1994",
      foundedLocation: "Rutgers University",
      colors: "Red, White, and Green",
      motto: "Arab-American Brotherhood",
      nickname: "First Arab-American Fraternity"
    },
    {
      name: "Gamma Eta",
      greekLetters: "ΓΗ",
      founded: "1998",
      foundedLocation: "UCLA",
      colors: "Green and White",
      motto: "Persian Heritage",
      nickname: "Persian-American Fraternity"
    },
    {
      name: "Sigma Alpha Epsilon Pi",
      greekLetters: "ΣΑΕΠ",
      founded: "1998",
      foundedLocation: "UCLA",
      colors: "Pink and Black",
      motto: "Jewish Sorority with Middle Eastern chapters"
    },
    {
      name: "Alpha Omega Epsilon (Armenian)",
      greekLetters: "ΑΩΕ",
      founded: "1983",
      foundedLocation: "Marquette University",
      colors: "Red, Blue, and Orange",
      motto: "Armenian Heritage Sorority",
      nickname: "Engineering Sorority with Armenian chapters"
    },
    {
      name: "Alpha Gamma Kappa",
      greekLetters: "ΑΓΚ",
      founded: "1989",
      foundedLocation: "California State University, Fresno",
      colors: "Red, Blue, and Orange",
      motto: "Armenian Fraternity",
      nickname: "Armenian Heritage"
    },
    {
      name: "Lambda Sigma Upsilon",
      greekLetters: "ΛΣΥ",
      founded: "April 5, 1979",
      foundedLocation: "Rutgers University",
      colors: "Brown and Gold",
      motto: "Latino Unity and Solidarity",
      nickname: "Includes Middle Eastern members"
    },
    {
      name: "Tau Kappa Epsilon (Middle East Chapters)",
      greekLetters: "ΤΚΕ",
      founded: "1899",
      foundedLocation: "Illinois Wesleyan University",
      colors: "Cherry and Gray",
      motto: "Better Men for a Better World",
      nickname: "Large Middle Eastern membership"
    },
    {
      name: "Persian-American Civic Action Network Greeks",
      greekLetters: "PACAN",
      founded: "2005",
      foundedLocation: "Various",
      colors: "Green, White, and Red",
      motto: "Persian Pride Through Service"
    },
  ];

  const africanGreeks: Organization[] = [
    {
      name: "Omega Psi Phi (African Diaspora)",
      greekLetters: "ΩΨΦ",
      founded: "November 17, 1911",
      foundedLocation: "Howard University",
      colors: "Royal Purple and Old Gold",
      motto: "Friendship Is Essential to the Soul",
      nickname: "Strong African connections"
    },
    {
      name: "Lambda Pi Chi",
      greekLetters: "ΛΠΧ",
      founded: "1988",
      foundedLocation: "Cornell University",
      colors: "Black and Purple",
      motto: "Latinas Poderosas, Caribbean and Latin heritage",
      nickname: "Caribbean Heritage Sorority"
    },
    {
      name: "Lambda Upsilon Lambda",
      greekLetters: "ΛΥΛ",
      founded: "February 19, 1982",
      foundedLocation: "Cornell University",
      colors: "Purple and Black",
      motto: "La Unidad Para Siempre",
      nickname: "Afro-Latino membership"
    },
    {
      name: "Mu Sigma Upsilon",
      greekLetters: "ΜΣΥ",
      founded: "November 20, 1981",
      foundedLocation: "Rutgers University",
      colors: "Purple and White",
      motto: "Mujeres Seeking Unity",
      nickname: "Caribbean and Latina Sorority"
    },
    {
      name: "Sigma Iota Alpha",
      greekLetters: "ΣΙΑ",
      founded: "September 29, 1990",
      foundedLocation: "SUNY Albany",
      colors: "Red and Black",
      motto: "Semper Unum et Inseparabilis",
      nickname: "Caribbean and Latina Sorority"
    },
    {
      name: "Phi Beta Sigma (Caribbean Chapters)",
      greekLetters: "ΦΒΣ",
      founded: "January 9, 1914",
      foundedLocation: "Howard University",
      colors: "Royal Blue and Pure White",
      motto: "Culture for Service and Service for Humanity",
      nickname: "Strong Caribbean presence"
    },
    {
      name: "Alpha Kappa Alpha (African Diaspora)",
      greekLetters: "ΑΚΑ",
      founded: "January 15, 1908",
      foundedLocation: "Howard University",
      colors: "Salmon Pink and Apple Green",
      motto: "By Culture and By Merit",
      nickname: "International African diaspora chapters"
    },
    {
      name: "Caribbean Students Association Greeks",
      greekLetters: "CSA",
      founded: "Various",
      foundedLocation: "Various campuses",
      colors: "Various",
      motto: "Celebrating Caribbean Heritage",
      nickname: "Pan-Caribbean Organizations"
    },
    {
      name: "African Students Association Greeks",
      greekLetters: "ASA",
      founded: "Various",
      foundedLocation: "Various campuses",
      colors: "Various",
      motto: "Celebrating African Heritage",
      nickname: "Pan-African Organizations"
    },
  ];

  const nativeAmericanGreeks: Organization[] = [
    {
      name: "Alpha Pi Omega",
      greekLetters: "ΑΠΩ",
      founded: "September 1, 1994",
      foundedLocation: "University of North Carolina at Chapel Hill",
      colors: "Red and White",
      motto: "Wisdom Through Service",
      nickname: "First Native American Sorority"
    },
    {
      name: "Phi Sigma Nu",
      greekLetters: "ΦΣΝ",
      founded: "December 5, 1996",
      foundedLocation: "University of Oklahoma",
      colors: "Black, Red, and White",
      motto: "Pride, Strength, and Nobility",
      nickname: "First Native American Fraternity"
    },
    {
      name: "Sigma Omicron Epsilon",
      greekLetters: "ΣΟΕ",
      founded: "2003",
      foundedLocation: "New Mexico State University",
      colors: "Turquoise and Silver",
      motto: "Native Pride Through Brotherhood"
    },
    {
      name: "Gamma Delta Pi",
      greekLetters: "ΓΔΠ",
      founded: "1999",
      foundedLocation: "Northern Arizona University",
      colors: "Turquoise, Gold, and Black",
      motto: "Native Sisterhood"
    },
  ];

  const hbcuGreeks: Organization[] = [
    {
      name: "Sigma Pi Phi (The Boulé)",
      greekLetters: "ΣΠΦ",
      founded: "May 15, 1904",
      foundedLocation: "Philadelphia, Pennsylvania",
      colors: "Royal Blue and White",
      motto: "The First Black Greek-Letter Organization",
      symbol: "Sphinx",
      nickname: "The Boulé - Oldest Black Greek Org"
    },
    {
      name: "Chi Eta Phi",
      greekLetters: "ΧΗΦ",
      founded: "October 16, 1932",
      foundedLocation: "Washington, D.C.",
      colors: "Red and White",
      motto: "Service for Humanity",
      nickname: "Black Nursing Sorority"
    },
    {
      name: "Chi Delta Mu",
      greekLetters: "ΧΔΜ",
      founded: "1913",
      foundedLocation: "Howard University",
      colors: "Blue and Gold",
      motto: "First Black Medical Fraternity",
      nickname: "Physicians Fraternity"
    },
    {
      name: "Phi Delta Epsilon (Black Chapter)",
      greekLetters: "ΦΔΕ",
      founded: "1913",
      foundedLocation: "Various HBCUs",
      colors: "Green and White",
      motto: "Medical Excellence"
    },
    {
      name: "Alpha Phi Chi",
      greekLetters: "ΑΦΧ",
      founded: "1963",
      foundedLocation: "Howard University",
      colors: "Gold and White",
      motto: "Service Through Sisterhood",
      nickname: "HBCU Sorority"
    },
    {
      name: "Eta Phi Beta",
      greekLetters: "ΗΦΒ",
      founded: "1942",
      foundedLocation: "Detroit, Michigan",
      colors: "Pink and Green",
      motto: "First Business and Professional Sorority",
      nickname: "Business Sorority"
    },
    {
      name: "Gamma Phi Delta",
      greekLetters: "ΓΦΔ",
      founded: "1943",
      foundedLocation: "Detroit, Michigan",
      colors: "Black and Gold",
      motto: "Service and Education",
      nickname: "Black Sorority"
    },
    {
      name: "Tau Gamma Delta",
      greekLetters: "ΤΓΔ",
      founded: "1942",
      foundedLocation: "Chicago, Illinois",
      colors: "Blue and White",
      motto: "Teachers Sorority"
    },
  ];

  const councils = [
    {
      id: "nphc",
      name: "NPHC",
      fullName: "National Pan-Hellenic Council",
      description: "Nine historically Black Greek Letter Organizations founded between 1906-1963",
      founded: "May 10, 1930",
      organizations: divineNine
    },
    {
      id: "npc",
      name: "NPC",
      fullName: "National Panhellenic Conference",
      description: "26 national and international women's sororities",
      founded: "May 24, 1902",
      organizations: npcSororities
    },
    {
      id: "ifc",
      name: "IFC",
      fullName: "North American Interfraternity Conference",
      description: "Men's fraternities across North America",
      founded: "November 27, 1909",
      organizations: ifcFraternities
    },
    {
      id: "cbo",
      name: "CBOs",
      fullName: "Culturally Based Organizations",
      description: "Latino, Asian, South Asian, Native American, and culturally-focused Greek organizations (NALFO, NAPA)",
      founded: "Various",
      organizations: multiculturalGreeks
    },
    {
      id: "native",
      name: "Native American",
      fullName: "Native American Greek Organizations",
      description: "Fraternities and sororities celebrating Indigenous heritage and culture",
      founded: "Various",
      organizations: nativeAmericanGreeks
    },
    {
      id: "hbcu",
      name: "HBCU Greeks",
      fullName: "HBCU & Black Greek Organizations",
      description: "Additional historically Black Greek organizations beyond the NPHC",
      founded: "Various",
      organizations: hbcuGreeks
    },
    {
      id: "professional",
      name: "Professional & Service",
      fullName: "Professional & Service Organizations",
      description: "Service, music, band, business, law, and medical Greek organizations",
      founded: "Various",
      organizations: professionalServiceOrgs
    },
    {
      id: "honor",
      name: "Leadership & Honor",
      fullName: "Leadership & Honor Societies",
      description: "Sigma Alpha Pi (NSLS), Phi Beta Kappa, and academic honor societies recognizing achievement",
      founded: "Various",
      organizations: leadershipHonorSocieties
    },
    {
      id: "jewish",
      name: "Jewish",
      fullName: "Jewish Greek Organizations",
      description: "Alpha Epsilon Pi, Zeta Beta Tau, and Jewish fraternities and sororities",
      founded: "Various",
      organizations: jewishGreeks
    },
    {
      id: "social",
      name: "Social Fellowships",
      fullName: "Social Fellowships",
      description: "Groove Phi Groove, Swing Phi Swing, and other social fellowship organizations",
      founded: "Various",
      organizations: socialFellowships
    },
    {
      id: "masonic",
      name: "Masonic & Fraternal",
      fullName: "Masonic & Fraternal Orders",
      description: "Freemasonry, Shriners, Eastern Star, and fraternal orders with Greek traditions",
      founded: "Various",
      organizations: masonicFraternal
    },
    {
      id: "christian",
      name: "Christian",
      fullName: "Christian Fraternities & Sororities",
      description: "Faith-based Greek organizations centered on Christian brotherhood and sisterhood",
      founded: "Various",
      organizations: christianGreeks
    },
    {
      id: "lgbtq",
      name: "LGBTQ+",
      fullName: "LGBTQ+ Greek Organizations",
      description: "Organizations providing community and belonging for LGBTQ+ students",
      founded: "Various",
      organizations: lgbtqGreeks
    },
    {
      id: "filipino",
      name: "Filipino",
      fullName: "Filipino Greek Organizations",
      description: "Fraternities and sororities celebrating Filipino heritage and culture",
      founded: "Various",
      organizations: filipinoGreeks
    },
    {
      id: "military",
      name: "Military",
      fullName: "Military & Veteran Greek Organizations",
      description: "Fraternities and sororities for service members, veterans, and military families",
      founded: "Various",
      organizations: militaryGreeks
    },
    {
      id: "middleeast",
      name: "Middle Eastern",
      fullName: "Middle Eastern Greek Organizations",
      description: "Armenian, Persian, Arab, and other Middle Eastern heritage fraternities and sororities",
      founded: "Various",
      organizations: middleEasternGreeks
    },
    {
      id: "african",
      name: "African",
      fullName: "African & Caribbean Greek Organizations",
      description: "Organizations celebrating African and Caribbean heritage and diaspora culture",
      founded: "Various",
      organizations: africanGreeks
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Symbol & Ritual Guide",
      description: "Biblical analysis of common Greek symbols and rituals",
      link: "/symbol-guide"
    },
    {
      icon: Shield,
      title: "Anti-Hazing Resources",
      description: "Biblical guidance and practical resources against hazing",
      link: "/anti-hazing"
    },
    {
      icon: Compass,
      title: "Seals & Imagery Guide",
      description: "Greek and Roman deities on government and university seals",
      link: "/symbol-guide?tab=seals"
    },
    {
      icon: Heart,
      title: "Myth Buster",
      description: "Addressing common misconceptions about Greeks and faith",
      link: "/myth-buster"
    }
  ];

  // Generate org ID from name for detail page linking
  const getOrgId = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const OrganizationCard = ({ org }: { org: Organization }) => {
    const orgId = getOrgId(org.name);
    
    return (
      <Link 
        to={`/organization/${orgId}`}
        className="block p-4 rounded-lg border border-border bg-card hover:shadow-md hover:border-sacred/30 transition-all group"
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-sm group-hover:text-sacred transition-colors">{org.name}</h4>
            <span className="text-xl font-bold text-sacred">{org.greekLetters}</span>
          </div>
          {org.nickname && (
            <Badge variant="secondary" className="text-xs">{org.nickname}</Badge>
          )}
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{org.founded}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-3 h-3" />
            <span>{org.foundedLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-3 h-3" />
            <span>{org.colors}</span>
          </div>
          {org.symbol && (
            <div className="flex items-center gap-2">
              <Compass className="w-3 h-3" />
              <span>Symbol: {org.symbol}</span>
            </div>
          )}
        </div>
        {org.motto && (
          <p className="mt-2 text-xs italic text-muted-foreground border-t pt-2">
            "{org.motto}"
          </p>
        )}
        <div className="mt-2 flex items-center gap-1 text-xs text-sacred opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </Link>
    );
  };

  return (
    <>
      <SEOHead 
        title="Greek Life Organizations Guide | Sacred Greeks"
        description="Comprehensive guide to Greek Letter Organizations including the Divine Nine, NPC sororities, and IFC fraternities. Biblical perspectives for Christians in Greek life."
      />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Greek Life</h1>
            <div className="w-16" />
          </div>
        </header>

        <main className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
          {/* Hero */}
          <div className="text-center space-y-4">
            <Badge className="bg-sacred/10 text-sacred border-sacred/20">
              <GraduationCap className="w-3 h-3 mr-1" />
              Understanding Greek Organizations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Greek Life Through a Biblical Lens
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the history, traditions, and biblical perspectives for Christians in Greek Letter Organizations.
            </p>
          </div>

          {/* Anti-Hazing Alert */}
          <Link 
            to="/anti-hazing" 
            className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-amber-700 dark:text-amber-300">
                Anti-Hazing Resources & Prevention
              </span>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
                Biblical guidance and practical resources for a hazing-free Greek experience
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Councils Tabs */}
          <Tabs defaultValue="nphc" className="space-y-6">
            <TabsList className="flex flex-wrap justify-center gap-1">
              <TabsTrigger value="nphc" className="text-xs px-2 py-1">NPHC</TabsTrigger>
              <TabsTrigger value="npc" className="text-xs px-2 py-1">NPC</TabsTrigger>
              <TabsTrigger value="ifc" className="text-xs px-2 py-1">IFC</TabsTrigger>
              <TabsTrigger value="cbo" className="text-xs px-2 py-1">CBOs</TabsTrigger>
              <TabsTrigger value="native" className="text-xs px-2 py-1">Native American</TabsTrigger>
              <TabsTrigger value="hbcu" className="text-xs px-2 py-1">HBCU Greeks</TabsTrigger>
              <TabsTrigger value="jewish" className="text-xs px-2 py-1">Jewish</TabsTrigger>
              <TabsTrigger value="professional" className="text-xs px-2 py-1">Professional</TabsTrigger>
              <TabsTrigger value="honor" className="text-xs px-2 py-1">Leadership</TabsTrigger>
              <TabsTrigger value="social" className="text-xs px-2 py-1">Social</TabsTrigger>
              <TabsTrigger value="masonic" className="text-xs px-2 py-1">Masonic</TabsTrigger>
              <TabsTrigger value="christian" className="text-xs px-2 py-1">Christian</TabsTrigger>
              <TabsTrigger value="lgbtq" className="text-xs px-2 py-1">LGBTQ+</TabsTrigger>
              <TabsTrigger value="filipino" className="text-xs px-2 py-1">Filipino</TabsTrigger>
              <TabsTrigger value="military" className="text-xs px-2 py-1">Military</TabsTrigger>
              <TabsTrigger value="middleeast" className="text-xs px-2 py-1">Middle Eastern</TabsTrigger>
              <TabsTrigger value="african" className="text-xs px-2 py-1">African</TabsTrigger>
            </TabsList>

            {councils.map((council) => (
              <TabsContent key={council.id} value={council.id} className="space-y-6">
                <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sacred/10">
                        <Award className="w-6 h-6 text-sacred" />
                      </div>
                      <div>
                        <CardTitle>{council.fullName}</CardTitle>
                        <CardDescription>{council.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>Founded: {council.founded}</span>
                    </div>
                    
                    {council.id === "nphc" && (
                      <div className="mb-4 p-4 rounded-lg bg-muted/50 space-y-3">
                        <p className="text-sm text-muted-foreground">
                          The Divine Nine organizations emerged during a time when African Americans faced significant barriers to education and social advancement. These organizations have shaped African American history through their commitment to scholarship, service, sisterhood, and brotherhood, providing safe spaces for intellectual discourse, leadership development, and community service.
                        </p>
                        <p className="text-sm text-muted-foreground italic border-t border-border pt-3">
                          <strong>Note:</strong> Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection. Many universities, government institutions, and civic organizations display Greek and Roman mythology openly—from Athena on university seals to Apollo on government buildings. Consistency in critique matters.
                        </p>
                      </div>
                    )}

                    {council.id === "christian" && (
                      <div className="mb-4 p-4 rounded-lg bg-sacred/10 border border-sacred/20">
                        <p className="text-sm text-muted-foreground">
                          Christian Greek organizations provide fellowship opportunities for students who want their faith to be central to their Greek experience. These organizations integrate Bible study, worship, and Christian service into traditional Greek life structure.
                        </p>
                      </div>
                    )}

                    {council.id === "lgbtq" && (
                      <div className="mb-4 p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-start gap-3">
                          <Heart className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              While perspectives on these organizations may vary, we recognize that all people deserve to be treated with dignity and respect. Every individual has the right to exist peacefully, free from harassment or harm.
                            </p>
                            <p className="text-sm text-muted-foreground italic">
                              "So in everything, do to others what you would have them do to you." — Matthew 7:12
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {council.organizations.map((org, index) => (
                        <OrganizationCard key={index} org={org} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Greek Life Resources</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-lg bg-sacred/10">
                        <resource.icon className="w-6 h-6 text-sacred" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-sacred">
                        <Link to={resource.link}>
                          Explore <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sacred Greeks Mission */}
          <Card className="bg-gradient-to-br from-sacred/10 to-sacred/5 border-sacred/20">
            <CardContent className="p-8 text-center space-y-4">
              <Users className="w-12 h-12 text-sacred mx-auto" />
              <h3 className="text-2xl font-bold">The Sacred Greeks Mission</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're not about changing Greek organizations—we're about transforming hearts and intentions. Living sacred lives within your letters, shining God's light from the inside out.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-sacred hover:bg-sacred/90">
                  <Link to="/sacred-greeks">Take the Assessment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/meet-dr-lyman">Meet Dr. Lyman</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default GreekLife;