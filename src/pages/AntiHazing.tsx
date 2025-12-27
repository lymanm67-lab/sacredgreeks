import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Shield, 
  Phone, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Scale,
  Users,
  Hand,
  Heart,
  LifeBuoy,
  ExternalLink,
  GraduationCap,
  Building,
  Headphones,
  Flame,
  FileText,
  Download,
  ChevronsDownUp,
  ChevronsUpDown
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area, ReferenceLine } from "recharts";
import { RenouncedSupportSection } from "@/components/RenouncedSupportSection";
import { ListenButton } from "@/components/ListenButton";

const RESOURCES_ACCORDION_STORAGE_KEY = 'antihazing-resources-accordion-state';
const ALTERNATIVES_ACCORDION_STORAGE_KEY = 'antihazing-alternatives-accordion-state';

const AntiHazing = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [resourcesAccordionValues, setResourcesAccordionValues] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(RESOURCES_ACCORDION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [alternativesAccordionValues, setAlternativesAccordionValues] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ALTERNATIVES_ACCORDION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(RESOURCES_ACCORDION_STORAGE_KEY, JSON.stringify(resourcesAccordionValues));
  }, [resourcesAccordionValues]);

  useEffect(() => {
    localStorage.setItem(ALTERNATIVES_ACCORDION_STORAGE_KEY, JSON.stringify(alternativesAccordionValues));
  }, [alternativesAccordionValues]);

  const handleDownloadPDF = async () => {
    toast.info("Generating PDF...");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 0);
      doc.text("Alternative Activities Guide", 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("Building Brotherhood & Sisterhood Without Hazing", 20, 30);
      
      let yPos = 45;
      
      // Categories
      const categories = [
        { title: "Team Building & Bonding", items: ["Escape Room Challenges", "Ropes Course & Adventure Programs", "Cooking Competitions", "Intramural Sports Leagues", "Road Trip Retreats"] },
        { title: "Academic Excellence", items: ["Study Partnerships", "Guest Speaker Series", "Academic Competitions", "Library Lock-ins", "Research Symposiums"] },
        { title: "Community Service", items: ["Habitat for Humanity Builds", "Mentoring Programs", "Food Bank Service Days", "Health Screenings & Fairs", "Environmental Cleanups"] },
        { title: "Professional Development", items: ["Resume & Interview Workshops", "Networking Mixers", "Corporate Site Visits", "Personal Branding Sessions", "Graduate School Preparation"] },
        { title: "Cultural & Heritage Education", items: ["Founders Day Celebrations", "Historical Site Pilgrimages", "Documentary Screenings", "Museum Visits", "Elder Member Storytelling"] },
        { title: "Wellness & Self-Care", items: ["Mental Health Workshops", "Fitness Challenges", "Meditation & Mindfulness", "Financial Literacy", "Spa & Self-Care Nights"] }
      ];
      
      for (const category of categories) {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(category.title, 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        for (const item of category.items) {
          doc.text(`• ${item}`, 25, yPos);
          yPos += 6;
        }
        yPos += 8;
      }
      
      // Footer
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Key Principles for Success", 20, 20);
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("1. Focus on shared positive experiences that build genuine bonds", 20, 35);
      doc.text("2. Replace fear-based rituals with achievement-based milestones", 20, 45);
      doc.text("3. Involve alumni mentors in meaningful ways", 20, 55);
      doc.text("4. Celebrate academic and service accomplishments publicly", 20, 65);
      doc.text("5. Create traditions that future members will be proud to continue", 20, 75);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("National Hazing Hotline: 1-888-NOT-HAZE (1-888-668-4293)", 20, 100);
      doc.text("Resources: StopHazing.org | HazingPrevention.org", 20, 110);
      
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Generated by Sacred Greeks - Building safer Greek life through meaningful alternatives", 20, 280);
      
      doc.save("Alternative-Activities-Guide.pdf");
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleDownloadCurriculumPDF = async () => {
    toast.info("Generating Intake Curriculum PDF...");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let yPos = 20;

      const addPage = () => {
        doc.addPage();
        yPos = 20;
      };

      const checkPageBreak = (needed: number) => {
        if (yPos + needed > 270) {
          addPage();
        }
      };

      // Cover Page
      doc.setFontSize(28);
      doc.setTextColor(0, 0, 0);
      doc.text("New Member Intake", 105, 80, { align: "center" });
      doc.text("Curriculum Template", 105, 95, { align: "center" });
      
      doc.setFontSize(14);
      doc.setTextColor(80, 80, 80);
      doc.text("Building Brotherhood & Sisterhood Through", 105, 120, { align: "center" });
      doc.text("Positive, Meaningful Experiences", 105, 130, { align: "center" });
      
      doc.setFontSize(12);
      doc.text("A Hazing-Free Approach to New Member Education", 105, 160, { align: "center" });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Chapter: _______________________________", 105, 200, { align: "center" });
      doc.text("Term/Year: _______________________________", 105, 215, { align: "center" });
      doc.text("New Member Educator: _______________________________", 105, 230, { align: "center" });

      // Page 2 - Introduction
      addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Introduction & Philosophy", 20, yPos);
      yPos += 15;
      
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const intro = [
        "This curriculum provides a comprehensive framework for new member education that builds",
        "genuine bonds through shared positive experiences rather than hazing. Every activity is",
        "designed to develop leadership, foster brotherhood/sisterhood, and prepare members for",
        "a lifetime of service to the organization and community.",
        "",
        "Core Principles:",
        "1. Dignity and respect for all members at all times",
        "2. Education through meaningful experiences, not humiliation",
        "3. Leadership development through real responsibility",
        "4. Service to community as a cornerstone of membership",
        "5. Academic excellence as a non-negotiable standard"
      ];
      intro.forEach(line => {
        doc.text(line, 20, yPos);
        yPos += 6;
      });

      // Page 3 - Week-by-Week Schedule
      addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("8-Week Intake Schedule", 20, yPos);
      yPos += 15;

      const weeklySchedule = [
        {
          week: "Week 1: Welcome & Orientation",
          activities: [
            "Ice breaker activities and team introductions",
            "Organization history and values presentation",
            "Meet the chapter officers and advisors",
            "Review of anti-hazing policies and member rights",
            "Assign Big Brother/Sister mentors"
          ]
        },
        {
          week: "Week 2: Leadership Foundations",
          activities: [
            "Robert's Rules of Order workshop",
            "Parliamentary procedure practice session",
            "Chapter meeting observation and participation",
            "Leadership styles assessment",
            "Goal setting for the intake process"
          ]
        },
        {
          week: "Week 3: Academic Excellence",
          activities: [
            "Study partnerships established",
            "Academic resource orientation",
            "GPA goal setting and action plans",
            "Library lock-in study session",
            "Guest speaker: Successful alumni in academics"
          ]
        },
        {
          week: "Week 4: Community Service",
          activities: [
            "Plan and organize a service project",
            "Voter registration drive participation",
            "Food bank or homeless shelter service",
            "Reflection on service and organizational values",
            "Document service hours and impact"
          ]
        },
        {
          week: "Week 5: Professional Development",
          activities: [
            "Resume workshop with alumni",
            "Mock interview practice",
            "LinkedIn profile optimization",
            "Networking mixer with professionals",
            "Corporate site visit or virtual tour"
          ]
        },
        {
          week: "Week 6: Cultural Heritage",
          activities: [
            "Deep dive into founders and organizational history",
            "Documentary screening and discussion",
            "Elder member storytelling session",
            "Museum visit or historical site pilgrimage",
            "Prepare presentation on assigned founder"
          ]
        },
        {
          week: "Week 7: Team Building & Bonding",
          activities: [
            "Escape room challenge",
            "Knowledge bowl competition",
            "Card game tournament (Spades night)",
            "Cooking competition for charity",
            "Road trip or retreat planning"
          ]
        },
        {
          week: "Week 8: Celebration & Transition",
          activities: [
            "Final presentations on organizational knowledge",
            "Service project completion celebration",
            "Recognition ceremony preparation",
            "Wellness and self-care day",
            "Welcome ceremony and pinning"
          ]
        }
      ];

      weeklySchedule.forEach((week, index) => {
        checkPageBreak(50);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(week.week, 20, yPos);
        yPos += 8;
        
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        week.activities.forEach(activity => {
          checkPageBreak(8);
          doc.text(`  [ ] ${activity}`, 25, yPos);
          yPos += 6;
        });
        yPos += 6;
      });

      // Leadership Challenges Page
      addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Leadership Challenge Assignments", 20, yPos);
      yPos += 15;

      const challenges = [
        { title: "Plan & Lead a Chapter Meeting", desc: "Create agenda, facilitate discussion, manage time" },
        { title: "Organize a Community Service Project", desc: "Plan logistics, recruit volunteers, execute event" },
        { title: "Event Planning Challenge", desc: "Budget, venue selection, marketing, execution" },
        { title: "Committee Leadership", desc: "Chair a committee for 2+ weeks alongside active member" },
        { title: "Professional Presentation", desc: "Research and present on founder or chapter history" },
        { title: "Robert's Rules Certification", desc: "Pass quiz, demonstrate motions in mock meeting" },
        { title: "Budget Proposal", desc: "Create and present a chapter budget or event plan" }
      ];

      challenges.forEach(challenge => {
        checkPageBreak(18);
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`[ ] ${challenge.title}`, 20, yPos);
        yPos += 6;
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`    ${challenge.desc}`, 20, yPos);
        yPos += 10;
      });

      // Community Service Checklist
      addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Community Service Requirements", 20, yPos);
      yPos += 15;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Minimum 20 service hours required. Check off completed activities:", 20, yPos);
      yPos += 12;

      const serviceActivities = [
        "Habitat for Humanity Build Day",
        "Food Bank/Soup Kitchen Service",
        "Homeless Sleep-Out Event",
        "Blood/Plasma Drive Organization",
        "Voter Registration Drive",
        "Get Out the Vote Campaign",
        "Mentoring Program Participation",
        "Back-to-School Supply Drive",
        "Environmental Cleanup",
        "Health Fair/Screening Support",
        "Clothing/Coat Drive",
        "Civic Engagement Workshop",
        "Town Hall/Candidate Forum"
      ];

      serviceActivities.forEach(activity => {
        checkPageBreak(8);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`[ ] ${activity}  Hours: _____`, 25, yPos);
        yPos += 8;
      });

      yPos += 10;
      doc.setFontSize(11);
      doc.text("Total Service Hours: _______", 20, yPos);

      // Wellness & Support Page
      addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Wellness & Member Support", 20, yPos);
      yPos += 15;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const wellness = [
        "Mental Health Resources:",
        "  • Campus Counseling Center: _______________",
        "  • Crisis Hotline: 988 (Suicide & Crisis Lifeline)",
        "  • National Hazing Hotline: 1-888-NOT-HAZE",
        "",
        "Wellness Activities (check when completed):",
        "  [ ] Mental health workshop attendance",
        "  [ ] Fitness challenge participation",
        "  [ ] Meditation/mindfulness session",
        "  [ ] Financial literacy workshop",
        "  [ ] Self-care day participation",
        "",
        "Member Rights:",
        "  • You have the right to be treated with dignity and respect",
        "  • You have the right to say NO to any activity",
        "  • You have the right to report concerns without retaliation",
        "  • You have the right to a safe and supportive environment"
      ];

      wellness.forEach(line => {
        doc.text(line, 20, yPos);
        yPos += 7;
      });

      // Sign-off Page
      addPage();
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Completion Sign-Off", 20, yPos);
      yPos += 20;

      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      const signoffs = [
        "New Member Name: _______________________________________",
        "",
        "I have completed all requirements of this intake curriculum and",
        "confirm that I was treated with dignity and respect throughout",
        "the process. I did not experience or witness any hazing activities.",
        "",
        "New Member Signature: _________________________ Date: _______",
        "",
        "",
        "Big Brother/Sister: _________________________ Date: _______",
        "",
        "New Member Educator: _________________________ Date: _______",
        "",
        "Chapter President: _________________________ Date: _______",
        "",
        "Chapter Advisor: _________________________ Date: _______"
      ];

      signoffs.forEach(line => {
        doc.text(line, 20, yPos);
        yPos += 10;
      });

      // Footer on all pages
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Sacred Greeks - New Member Intake Curriculum Template", 105, 285, { align: "center" });
        doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: "right" });
      }

      doc.save("New-Member-Intake-Curriculum.pdf");
      toast.success("Curriculum PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const stats = [
    {
      icon: AlertTriangle,
      value: "350+",
      label: "Documented Deaths",
      sublabel: "Since 1838 (Greek founding)",
      color: "text-destructive"
    },
    {
      icon: Activity,
      value: "2590+",
      label: "Documented Injuries",
      sublabel: "Reported cases only",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      value: "55%",
      label: "Students Experience Hazing",
      sublabel: "Allan & Madden Study",
      color: "text-primary"
    },
    {
      icon: Calendar,
      value: "186",
      label: "Years of Greek Life",
      sublabel: "First fraternity: 1838",
      color: "text-muted-foreground"
    }
  ];

  const preventionStrategies = [
    {
      icon: BookOpen,
      title: "Education & Awareness",
      description: "Implement comprehensive hazing prevention education programs",
      items: [
        "Mandatory anti-hazing training for all members",
        "New member education on their rights",
        "Bystander intervention training",
        "Annual refresher courses for active members",
        "Parent and family education programs"
      ]
    },
    {
      icon: Scale,
      title: "Clear Policies & Accountability",
      description: "Establish and enforce zero-tolerance hazing policies",
      items: [
        "Written anti-hazing policies in bylaws",
        "Clear reporting procedures",
        "Anonymous reporting hotlines",
        "Swift and consistent enforcement",
        "Regular policy reviews and updates"
      ]
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Train leaders to create positive organizational cultures",
      items: [
        "Leadership ethics training",
        "Mentorship programs for officers",
        "Conflict resolution skills",
        "Positive culture building workshops",
        "Alumni mentor partnerships"
      ]
    },
    {
      icon: Hand,
      title: "Bystander Intervention",
      description: "Empower members to speak up and intervene",
      items: [
        "Green Dot or Step UP! training",
        "Practice intervention scenarios",
        "Create support networks for reporters",
        "Celebrate those who speak up",
        "Remove fear of retaliation"
      ]
    },
    {
      icon: Heart,
      title: "Positive Alternatives",
      description: "Replace hazing traditions with meaningful experiences",
      items: [
        "Community service projects",
        "Academic support programs",
        "Team-building retreats",
        "Professional development events",
        "Cultural appreciation activities"
      ]
    },
    {
      icon: LifeBuoy,
      title: "Support Systems",
      description: "Create resources for those affected by hazing",
      items: [
        "Counseling services access",
        "Peer support groups",
        "Confidential reporting options",
        "Recovery and healing programs",
        "Family support resources"
      ]
    }
  ];

  const bgloDeathStatistics = [
    {
      organization: "Alpha Phi Alpha",
      council: "NPHC",
      hazingDeaths: 2,
      pledgingDeaths: 0,
      injuries: 15,
      notes: null
    },
    {
      organization: "Kappa Alpha Psi",
      council: "NPHC",
      hazingDeaths: 8,
      pledgingDeaths: 0,
      injuries: 45,
      notes: "Highest documented hazing deaths among NPHC organizations"
    },
    {
      organization: "Omega Psi Phi",
      council: "NPHC",
      hazingDeaths: 5,
      pledgingDeaths: 1,
      injuries: 38,
      notes: "One additional death occurred during pledging but was not officially determined to be caused by hazing"
    },
    {
      organization: "Phi Beta Sigma",
      council: "NPHC",
      hazingDeaths: 2,
      pledgingDeaths: 0,
      injuries: 12,
      notes: null
    },
    {
      organization: "Iota Phi Theta",
      council: "NPHC",
      hazingDeaths: 0,
      pledgingDeaths: 0,
      injuries: 3,
      notes: null
    },
    {
      organization: "Alpha Kappa Alpha",
      council: "NPHC",
      hazingDeaths: 1,
      pledgingDeaths: 1,
      injuries: 8,
      notes: "One additional death occurred during pledging but was not officially determined to be caused by hazing"
    },
    {
      organization: "Delta Sigma Theta",
      council: "NPHC",
      hazingDeaths: 1,
      pledgingDeaths: 0,
      injuries: 10,
      notes: null
    },
    {
      organization: "Zeta Phi Beta",
      council: "NPHC",
      hazingDeaths: 0,
      pledgingDeaths: 1,
      injuries: 5,
      notes: "One death occurred during pledging but was not reported as hazing"
    },
    {
      organization: "Sigma Gamma Rho",
      council: "NPHC",
      hazingDeaths: 0,
      pledgingDeaths: 0,
      injuries: 2,
      notes: null
    }
  ];

  const councilStatistics = [
    {
      council: "NPHC (National Pan-Hellenic Council)",
      organizations: 9,
      hazingDeaths: 19,
      pledgingDeaths: 3,
      injuries: 138,
      notes: "Historically Black Greek Letter Organizations (Divine Nine)"
    },
    {
      council: "IFC (Interfraternity Council)",
      organizations: 70,
      hazingDeaths: 215,
      pledgingDeaths: 45,
      injuries: 1450,
      notes: "Predominantly White fraternities - largest council by membership"
    },
    {
      council: "NPC (National Panhellenic Conference)",
      organizations: 26,
      hazingDeaths: 12,
      pledgingDeaths: 8,
      injuries: 380,
      notes: "Women's sororities - historically lower death rates"
    },
    {
      council: "NAPA (National APIA Panhellenic Association)",
      organizations: 18,
      hazingDeaths: 6,
      pledgingDeaths: 3,
      injuries: 65,
      notes: "Asian Pacific Islander Desi American fraternities and sororities"
    },
    {
      council: "NALFO (National Association of Latino Fraternal Organizations)",
      organizations: 23,
      hazingDeaths: 5,
      pledgingDeaths: 2,
      injuries: 48,
      notes: "Latino/Latina fraternities and sororities"
    },
    {
      council: "MGC (Multicultural Greek Council)",
      organizations: 50,
      hazingDeaths: 8,
      pledgingDeaths: 4,
      injuries: 85,
      notes: "Culturally-based and multicultural organizations"
    },
    {
      council: "Other/Local Organizations",
      organizations: 200,
      hazingDeaths: 18,
      pledgingDeaths: 7,
      injuries: 420,
      notes: "Local fraternities, honor societies, and unaffiliated organizations"
    }
  ];

  const memorialVictims = [
    // 2025
    {
      name: "Caleb Wilson",
      age: 18,
      year: 2025,
      organization: "Omega Psi Phi (NPHC)",
      school: "Southern University and A&M College",
      cause: "Died during fraternity pledging activities; three students charged with hazing",
      legislation: "Caleb Wilson Act (Proposed - Louisiana 2025)"
    },
    // 2024
    {
      name: "Sawyer Updike",
      age: 18,
      year: 2024,
      organization: "Sigma Chi (IFC)",
      school: "University of Texas at Austin",
      cause: "Suicide allegedly caused by hazing",
      legislation: null
    },
    {
      name: "Won Jang",
      age: 20,
      year: 2024,
      organization: "Beta Alpha Omega (IFC)",
      school: "Dartmouth College",
      cause: "Drowning after attending fraternity party",
      legislation: null
    },
    // 2021-2023
    {
      name: "Adam Oakes",
      age: 19,
      year: 2021,
      organization: "Delta Chi (IFC)",
      school: "Virginia Commonwealth University",
      cause: "Alcohol poisoning during 'Big Brother Night'",
      legislation: "Adam's Law (Virginia)"
    },
    {
      name: "Stone Foltz",
      age: 20,
      year: 2021,
      organization: "Pi Kappa Alpha (IFC)",
      school: "Bowling Green State University",
      cause: "Fatal alcohol poisoning during initiation",
      legislation: "Collin's Law (Ohio)"
    },
    {
      name: "Danny Santulli",
      age: 19,
      year: 2021,
      organization: "Sigma Alpha Epsilon (IFC)",
      school: "University of Missouri",
      cause: "Severe brain damage from alcohol poisoning (survived but severely disabled)",
      legislation: null
    },
    // 2019-2020
    {
      name: "Sam Martinez",
      age: 19,
      year: 2019,
      organization: "Phi Gamma Delta (IFC)",
      school: "Washington State University",
      cause: "Alcohol poisoning during pledge event",
      legislation: "Sam's Law (Washington)"
    },
    {
      name: "Noah Domingo",
      age: 19,
      year: 2019,
      organization: "Sigma Alpha Epsilon (IFC)",
      school: "University of California, Irvine",
      cause: "Alcohol-related Big Brother Night death",
      legislation: null
    },
    {
      name: "Marlon Jackson",
      age: 23,
      year: 2019,
      organization: "Kappa Alpha Psi (NPHC)",
      school: "Delaware State University",
      cause: "Sleep deprivation led to fatal auto accident",
      legislation: null
    },
    // 2018
    {
      name: "Collin Wiant",
      age: 18,
      year: 2018,
      organization: "Sigma Pi (IFC)",
      school: "Ohio University",
      cause: "Asphyxiation from nitrous oxide during hazing",
      legislation: "Collin's Law (Ohio)"
    },
    {
      name: "Joseph Little",
      age: 20,
      year: 2018,
      organization: "Phi Gamma Delta (IFC)",
      school: "Texas A&M University",
      cause: "Collapsed during pledging activities",
      legislation: null
    },
    {
      name: "Tyler Hilliard",
      age: 20,
      year: 2018,
      organization: "Alpha Phi Alpha (NPHC)",
      school: "University of California, Riverside",
      cause: "Collapsed after alleged hazing",
      legislation: null
    },
    {
      name: "Alexander Beletsis",
      age: 20,
      year: 2018,
      organization: "Theta Chi (IFC)",
      school: "University of California, Santa Cruz",
      cause: "Alcohol-related fatal fall",
      legislation: null
    },
    {
      name: "Nicky Cumberland",
      age: 20,
      year: 2018,
      organization: "Texas Cowboys Spirit Group",
      school: "University of Texas",
      cause: "Sleep deprivation contributed to fatal accident",
      legislation: null
    },
    {
      name: "Marco Lee Shemwell",
      age: 4,
      year: 2018,
      organization: "Alpha Tau Omega (IFC) - Bystander",
      school: "University of Kentucky",
      cause: "Hit by car driven by intoxicated pledge",
      legislation: null
    },
    // 2017
    {
      name: "Max Gruver",
      age: 18,
      year: 2017,
      organization: "Phi Delta Theta (IFC)",
      school: "Louisiana State University",
      cause: "Acute alcohol intoxication during hazing",
      legislation: "Max Gruver Act (Louisiana)"
    },
    {
      name: "Timothy Piazza",
      age: 19,
      year: 2017,
      organization: "Beta Theta Pi (IFC)",
      school: "Penn State University",
      cause: "Traumatic brain injury from falls during hazing",
      legislation: "Timothy J. Piazza Antihazing Law (Pennsylvania)"
    },
    {
      name: "Andrew Coffey",
      age: 20,
      year: 2017,
      organization: "Pi Kappa Phi (IFC)",
      school: "Florida State University",
      cause: "Acute alcohol poisoning during pledge night",
      legislation: null
    },
    {
      name: "Matthew Ellis",
      age: 20,
      year: 2017,
      organization: "Phi Kappa Psi (IFC)",
      school: "Texas State University",
      cause: "Alcohol bottle exchange ritual",
      legislation: null
    },
    {
      name: "Harrison Carter Cole",
      age: 18,
      year: 2017,
      organization: "Alpha Chi Sigma",
      school: "Hampden-Sydney College",
      cause: "Alcohol-related death at fraternity event",
      legislation: null
    },
    {
      name: "Jordan Hankins",
      age: 19,
      year: 2017,
      organization: "Alpha Kappa Alpha (NPHC)",
      school: "Northwestern University",
      cause: "Suicide allegedly caused by hazing",
      legislation: null
    },
    {
      name: "Alasdair Russell",
      age: 21,
      year: 2017,
      organization: "Phi Kappa Psi (IFC)",
      school: "University of Southern California",
      cause: "Suicide after head injury from hazing",
      legislation: null
    },
    // 2016
    {
      name: "Rustam Nizamutdinov",
      age: 25,
      year: 2016,
      organization: "Kappa Sigma (IFC) - Bystander",
      school: "University of Louisiana, Lafayette",
      cause: "Hit by sleep-deprived pledge driver",
      legislation: null
    },
    // 2014-2015
    {
      name: "Tucker Hipps",
      age: 19,
      year: 2014,
      organization: "Sigma Phi Epsilon (IFC)",
      school: "Clemson University",
      cause: "Fell from bridge during early morning hazing run",
      legislation: "Tucker Hipps Transparency Act (South Carolina)"
    },
    {
      name: "Nolan Burch",
      age: 18,
      year: 2014,
      organization: "Kappa Sigma (IFC)",
      school: "West Virginia University",
      cause: "Alcohol poisoning during 'Big Brother' event",
      legislation: null
    },
    {
      name: "Jack Culolias",
      age: 21,
      year: 2014,
      organization: "Sigma Alpha Epsilon (IFC)",
      school: "Arizona State University",
      cause: "Drowning after alcohol-fueled hazing",
      legislation: null
    },
    // 2013
    {
      name: "Tim Deng",
      age: 19,
      year: 2013,
      organization: "Pi Delta Psi (NAPA)",
      school: "Baruch College, CUNY",
      cause: "Blunt force trauma during 'Glass Ceiling' hazing ritual",
      legislation: null
    },
    {
      name: "Marvell Edmondson",
      age: 19,
      year: 2013,
      organization: "Men of Honor",
      school: "Virginia State University",
      cause: "Drowning during initiation",
      legislation: null
    },
    {
      name: "Jauwan M. Holmes",
      age: 19,
      year: 2013,
      organization: "Men of Honor",
      school: "Virginia State University",
      cause: "Drowning during initiation",
      legislation: null
    },
    {
      name: "Peter Tran",
      age: 20,
      year: 2013,
      organization: "Lambda Phi Epsilon (NAPA)",
      school: "San Francisco State University",
      cause: "Alcohol overdose during hazing",
      legislation: null
    },
    // 2012
    {
      name: "Robert Champion",
      age: 26,
      year: 2011,
      organization: "Florida A&M Marching 100",
      school: "Florida A&M University",
      cause: "Blunt force trauma during band hazing ritual 'Crossing Bus C'",
      legislation: "Robert Champion Anti-Hazing Act (Florida)"
    },
    {
      name: "David Bogenberger",
      age: 19,
      year: 2012,
      organization: "Pi Kappa Alpha (IFC)",
      school: "Northern Illinois University",
      cause: "Alcohol overdose during 'Mom and Dad's Night' hazing",
      legislation: null
    },
    {
      name: "Philip Dhanens",
      age: 22,
      year: 2012,
      organization: "Theta Chi (IFC)",
      school: "Fresno State University",
      cause: "Alcohol-related hazing death",
      legislation: null
    },
    {
      name: "William Torrance",
      age: 19,
      year: 2012,
      organization: "Delta Gamma Iota",
      school: "Vincennes University",
      cause: "Heart attack from alcohol intoxication on Bid Night",
      legislation: null
    },
    {
      name: "Everett Glenn",
      age: 19,
      year: 2012,
      organization: "Kappa Delta Rho (IFC)",
      school: "Lafayette College",
      cause: "Alcohol-related death at banned fraternity",
      legislation: null
    },
    {
      name: "Robert Eugene Tipton Jr.",
      age: 20,
      year: 2012,
      organization: "Delta Sigma Phi (IFC)",
      school: "High Point University",
      cause: "Concussion leading to aspiration during hazing",
      legislation: null
    },
    // 2010-2011
    {
      name: "George Desdunes",
      age: 19,
      year: 2010,
      organization: "Sigma Alpha Epsilon (IFC)",
      school: "Cornell University",
      cause: "Alcohol poisoning and hypothermia during kidnapping ritual",
      legislation: null
    },
    // 2008-2009
    {
      name: "Carson Starkey",
      age: 18,
      year: 2008,
      organization: "Sigma Alpha Epsilon (IFC)",
      school: "Texas Tech University",
      cause: "Alcohol poisoning during Big Brother Night",
      legislation: null
    },
    {
      name: "Harrison Kowiak",
      age: 19,
      year: 2008,
      organization: "Theta Chi (IFC)",
      school: "Lenoir-Rhyne University",
      cause: "Traumatic brain injury from hazing assault",
      legislation: null
    },
    // 2005-2007
    {
      name: "Matthew Carrington",
      age: 21,
      year: 2005,
      organization: "Chi Tau (Local)",
      school: "Chico State University",
      cause: "Water intoxication during hazing",
      legislation: "Matt's Law (California)"
    },
    {
      name: "Benjamin Klein",
      age: 19,
      year: 2002,
      organization: "Zeta Beta Tau (IFC)",
      school: "Alfred University",
      cause: "Suicide after being beaten for reporting hazing",
      legislation: null
    },
    // 2002-2004
    {
      name: "Kristin High",
      age: 22,
      year: 2002,
      organization: "Alpha Kappa Alpha (NPHC)",
      school: "California State University, Los Angeles",
      cause: "Drowning during underground pledging activity",
      legislation: null
    },
    {
      name: "Kenitha Saafir",
      age: 24,
      year: 2002,
      organization: "Alpha Kappa Alpha (NPHC)",
      school: "California State University, Los Angeles",
      cause: "Drowning during underground pledging",
      legislation: null
    },
    {
      name: "Daniel Reardon",
      age: 19,
      year: 2002,
      organization: "Phi Sigma Kappa (IFC)",
      school: "University of Maryland",
      cause: "Alcohol drinking ritual on Bid Night",
      legislation: null
    },
    // 2001
    {
      name: "Chad Meredith",
      age: 18,
      year: 2001,
      organization: "Kappa Sigma (IFC)",
      school: "University of Miami",
      cause: "Drowning during pledge activity",
      legislation: "Chad Meredith Act (Florida)"
    },
    {
      name: "Joseph T. Green",
      age: 20,
      year: 2001,
      organization: "Omega Psi Phi (NPHC)",
      school: "Tennessee State University",
      cause: "Died during exercise session hazing",
      legislation: null
    },
    {
      name: "Seth Korona",
      age: 18,
      year: 2001,
      organization: "Theta Chi (IFC)",
      school: "Indiana University",
      cause: "Head injury after consuming alcohol during keg stand",
      legislation: null
    },
    // 2000
    {
      name: "Adrian Heideman",
      age: 19,
      year: 2000,
      organization: "Pi Kappa Phi (IFC)",
      school: "Chico State University",
      cause: "Encouraged to drink during hazing",
      legislation: null
    },
    {
      name: "Terry Ryan Stirling",
      age: 19,
      year: 2000,
      organization: "Alpha Tau Omega (IFC)",
      school: "Old Dominion University",
      cause: "Alcohol poisoning during Big Brother/Little Brother bottle exchange",
      legislation: null
    },
    {
      name: "Ben Folsom Grantham III",
      age: 19,
      year: 2000,
      organization: "Alpha Tau Omega (IFC)",
      school: "University of Georgia",
      cause: "Died during pledge sneak/kidnapping ritual",
      legislation: null
    },
    // 1990s
    {
      name: "Michael Davis",
      age: 22,
      year: 1994,
      organization: "Kappa Alpha Psi (NPHC)",
      school: "Southeast Missouri State University",
      cause: "Cardiac arrest from severe beating during hazing",
      legislation: null
    },
    // Historical
    {
      name: "John Butler Groves",
      age: 19,
      year: 1838,
      organization: "Class Hazing",
      school: "Franklin Seminary (Kentucky)",
      cause: "First documented hazing death in US history",
      legislation: null
    }
  ];

  // Chart data for visualizations
  const chartData = councilStatistics.map(council => ({
    name: council.council.split(" ")[0],
    fullName: council.council,
    deaths: council.hazingDeaths + council.pledgingDeaths,
    hazingDeaths: council.hazingDeaths,
    pledgingDeaths: council.pledgingDeaths,
    injuries: council.injuries
  }));

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899'];

  // Timeline data by decade with deaths and key legislation
  const timelineData = [
    { 
      decade: "1830s", 
      deaths: 1,
      legislation: [],
      keyEvent: "First documented hazing death (1838)"
    },
    { 
      decade: "1840s-1900s", 
      deaths: 12,
      legislation: [],
      keyEvent: "Greek system expansion begins"
    },
    { 
      decade: "1910s", 
      deaths: 8,
      legislation: [],
      keyEvent: "Early fraternity growth period"
    },
    { 
      decade: "1920s", 
      deaths: 15,
      legislation: [],
      keyEvent: "Post-WWI campus culture shift"
    },
    { 
      decade: "1930s", 
      deaths: 10,
      legislation: [],
      keyEvent: "Great Depression era"
    },
    { 
      decade: "1940s", 
      deaths: 7,
      legislation: [],
      keyEvent: "WWII disrupts Greek life"
    },
    { 
      decade: "1950s", 
      deaths: 14,
      legislation: [],
      keyEvent: "Post-war Greek expansion"
    },
    { 
      decade: "1960s", 
      deaths: 18,
      legislation: [],
      keyEvent: "Civil rights era changes"
    },
    { 
      decade: "1970s", 
      deaths: 22,
      legislation: ["New York (1980) - First comprehensive state hazing law"],
      keyEvent: "Rising awareness of hazing dangers"
    },
    { 
      decade: "1980s", 
      deaths: 28,
      legislation: ["Texas (1989)", "Florida (1989)"],
      keyEvent: "Multiple high-profile deaths spark reform"
    },
    { 
      decade: "1990s", 
      deaths: 35,
      legislation: ["California (1994)", "Illinois (1995)", "Missouri (1996)"],
      keyEvent: "Michael Davis death leads to renewed focus"
    },
    { 
      decade: "2000s", 
      deaths: 45,
      legislation: ["Chad Meredith Act FL (2001)", "Matt's Law CA (2005)"],
      keyEvent: "Internet era increases reporting"
    },
    { 
      decade: "2010s", 
      deaths: 68,
      legislation: ["Robert Champion Act FL (2012)", "Tucker Hipps Act SC (2015)", "Max Gruver Act LA (2018)", "Timothy Piazza Law PA (2018)"],
      keyEvent: "Landmark legislation after high-profile deaths"
    },
    { 
      decade: "2020s", 
      deaths: 32,
      legislation: ["Adam's Law VA (2021)", "Collin's Law OH (2021)", "Sam's Law WA (2022)"],
      keyEvent: "Continued legislative response"
    }
  ];

  const legislativeMilestones = [
    { year: 1838, event: "First documented hazing death", type: "death", description: "John Butler Groves dies at Franklin Seminary" },
    { year: 1980, event: "New York passes first state law", type: "law", description: "First comprehensive anti-hazing statute" },
    { year: 1989, event: "Texas & Florida pass laws", type: "law", description: "Multiple states follow New York's lead" },
    { year: 1994, event: "Michael Davis death", type: "death", description: "Kappa Alpha Psi death leads to reform" },
    { year: 2002, event: "Chad Meredith Act", type: "law", description: "Florida strengthens penalties" },
    { year: 2005, event: "Matt's Law (California)", type: "law", description: "Felony charges for hazing deaths" },
    { year: 2011, event: "Robert Champion death", type: "death", description: "FAMU band hazing sparks national attention" },
    { year: 2014, event: "Tucker Hipps death", type: "death", description: "Clemson death leads to transparency law" },
    { year: 2017, event: "Tim Piazza & Max Gruver", type: "death", description: "Two deaths lead to major reforms" },
    { year: 2018, event: "Landmark legislation", type: "law", description: "PA, LA, OH pass comprehensive laws" },
    { year: 2021, event: "Adam Oakes & Stone Foltz", type: "death", description: "Deaths lead to more state laws" },
    { year: 2025, event: "Caleb Wilson death", type: "death", description: "Southern University pledging death" }
  ];

  const sourceCitations = [
    {
      id: 1,
      source: "StopHazing.org",
      title: "Hazing Deaths Database",
      year: "2024",
      url: "https://stophazing.org/hazing-deaths-database/"
    },
    {
      id: 2,
      source: "Allan, E.J. & Madden, M.",
      title: "Hazing in View: College Students at Risk",
      year: "2008",
      url: "https://www.stophazing.org/research/"
    },
    {
      id: 3,
      source: "Hank Nuwer Hazing Clearinghouse",
      title: "Hazing Deaths Since 1837",
      year: "2024",
      url: "https://www.hanknuwer.com/"
    },
    {
      id: 4,
      source: "National Study of Student Hazing",
      title: "University of Maine Study",
      year: "2008",
      url: null
    },
    {
      id: 5,
      source: "Inside Higher Ed & Chronicle of Higher Education",
      title: "Greek Life Incident Reports",
      year: "2015-2024",
      url: null
    },
    {
      id: 6,
      source: "Court Records & News Reports",
      title: "Verified incident documentation",
      year: "Various",
      url: null
    }
  ];

  const stateHazingLaws = [
    { abbrev: "AL", name: "Alabama", lawType: "misdemeanor", description: "Hazing is a Class C misdemeanor; Class A if injury occurs", penalty: "Up to 3 months jail, $500 fine", namedAfter: null },
    { abbrev: "AK", name: "Alaska", lawType: "none", description: "No specific anti-hazing statute", penalty: null, namedAfter: null },
    { abbrev: "AZ", name: "Arizona", lawType: "misdemeanor", description: "Class 1 misdemeanor; aggravated hazing is Class 6 felony", penalty: "Up to 6 months jail", namedAfter: null },
    { abbrev: "AR", name: "Arkansas", lawType: "misdemeanor", description: "Class B misdemeanor", penalty: "Up to 90 days jail, $1,000 fine", namedAfter: null },
    { abbrev: "CA", name: "California", lawType: "felony", description: "Hazing causing death or serious injury can be felony; Matt's Law enhanced penalties", penalty: "Up to 1 year jail or prison", namedAfter: "Matt Carrington Act" },
    { abbrev: "CO", name: "Colorado", lawType: "misdemeanor", description: "Class 3 misdemeanor; Class 1 if serious injury", penalty: "Up to 6 months jail", namedAfter: null },
    { abbrev: "CT", name: "Connecticut", lawType: "misdemeanor", description: "Class A misdemeanor", penalty: "Up to 1 year jail, $2,000 fine", namedAfter: null },
    { abbrev: "DE", name: "Delaware", lawType: "misdemeanor", description: "Class B misdemeanor; Class A if injury", penalty: "Up to 6 months jail", namedAfter: null },
    { abbrev: "FL", name: "Florida", lawType: "felony", description: "Third-degree felony if serious bodily injury or death results", penalty: "Up to 5 years prison", namedAfter: "Chad Meredith Act / Robert Champion Act" },
    { abbrev: "GA", name: "Georgia", lawType: "felony", description: "Misdemeanor; felony if serious injury or death", penalty: "Up to 5 years prison for felony", namedAfter: null },
    { abbrev: "HI", name: "Hawaii", lawType: "none", description: "No specific anti-hazing statute", penalty: null, namedAfter: null },
    { abbrev: "ID", name: "Idaho", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 6 months jail, $1,000 fine", namedAfter: null },
    { abbrev: "IL", name: "Illinois", lawType: "felony", description: "Class A misdemeanor; Class 4 felony if great bodily harm or death", penalty: "Up to 3 years prison", namedAfter: null },
    { abbrev: "IN", name: "Indiana", lawType: "felony", description: "Class B misdemeanor; Level 6 felony if serious injury; Level 5 if death", penalty: "Up to 6 years prison", namedAfter: null },
    { abbrev: "IA", name: "Iowa", lawType: "misdemeanor", description: "Simple misdemeanor", penalty: "30 days jail, $625 fine", namedAfter: null },
    { abbrev: "KS", name: "Kansas", lawType: "misdemeanor", description: "Class B nonperson misdemeanor", penalty: "Up to 6 months jail", namedAfter: null },
    { abbrev: "KY", name: "Kentucky", lawType: "misdemeanor", description: "Class B misdemeanor; Class A if physical injury", penalty: "Up to 12 months jail", namedAfter: null },
    { abbrev: "LA", name: "Louisiana", lawType: "felony", description: "Misdemeanor; felony if serious bodily injury or death. Strengthened by Max Gruver Act", penalty: "Up to 5 years prison, $10,000 fine", namedAfter: "Max Gruver Act" },
    { abbrev: "ME", name: "Maine", lawType: "misdemeanor", description: "Class D crime (misdemeanor); Class C if aggravated", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "MD", name: "Maryland", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 6 months jail, $500 fine", namedAfter: null },
    { abbrev: "MA", name: "Massachusetts", lawType: "felony", description: "Felony if serious injury results", penalty: "Up to 3 years prison, $3,000 fine", namedAfter: null },
    { abbrev: "MI", name: "Michigan", lawType: "felony", description: "Misdemeanor; felony if serious impairment or death", penalty: "Up to 15 years prison for death", namedAfter: null },
    { abbrev: "MN", name: "Minnesota", lawType: "none", description: "No specific anti-hazing statute (civil remedies available)", penalty: null, namedAfter: null },
    { abbrev: "MS", name: "Mississippi", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 6 months jail, $2,000 fine", namedAfter: null },
    { abbrev: "MO", name: "Missouri", lawType: "misdemeanor", description: "Class A misdemeanor", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "MT", name: "Montana", lawType: "none", description: "No specific anti-hazing statute", penalty: null, namedAfter: null },
    { abbrev: "NE", name: "Nebraska", lawType: "misdemeanor", description: "Class II misdemeanor; Class I if injury", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "NV", name: "Nevada", lawType: "misdemeanor", description: "Misdemeanor; gross misdemeanor if substantial harm", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "NH", name: "New Hampshire", lawType: "misdemeanor", description: "Class B misdemeanor", penalty: "Fine only, no jail", namedAfter: null },
    { abbrev: "NJ", name: "New Jersey", lawType: "felony", description: "Disorderly persons offense; crime of 4th degree if serious injury; 3rd degree if death", penalty: "Up to 5 years prison", namedAfter: null },
    { abbrev: "NM", name: "New Mexico", lawType: "misdemeanor", description: "Petty misdemeanor; misdemeanor if injury", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "NY", name: "New York", lawType: "felony", description: "Class A misdemeanor; Class E felony if serious injury; Class D if death", penalty: "Up to 7 years prison", namedAfter: null },
    { abbrev: "NC", name: "North Carolina", lawType: "misdemeanor", description: "Class 2 misdemeanor; Class 1 if serious injury", penalty: "Up to 120 days jail", namedAfter: null },
    { abbrev: "ND", name: "North Dakota", lawType: "misdemeanor", description: "Class B misdemeanor; Class A if substantial harm", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "OH", name: "Ohio", lawType: "felony", description: "Collin's Law: 2nd degree misdemeanor to 3rd degree felony based on harm", penalty: "Up to 5 years prison", namedAfter: "Collin's Law (Collin Wiant)" },
    { abbrev: "OK", name: "Oklahoma", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 90 days jail, $500 fine", namedAfter: null },
    { abbrev: "OR", name: "Oregon", lawType: "misdemeanor", description: "Class C misdemeanor; Class A if serious injury", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "PA", name: "Pennsylvania", lawType: "felony", description: "Timothy Piazza Act: 3rd degree misdemeanor to 3rd degree felony", penalty: "Up to 7 years prison", namedAfter: "Timothy J. Piazza Antihazing Law" },
    { abbrev: "RI", name: "Rhode Island", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 1 year jail, $1,000 fine", namedAfter: null },
    { abbrev: "SC", name: "South Carolina", lawType: "misdemeanor", description: "Misdemeanor; Tucker Hipps Transparency Act requires reporting", penalty: "Up to 1 year jail, $500 fine", namedAfter: "Tucker Hipps Transparency Act" },
    { abbrev: "SD", name: "South Dakota", lawType: "none", description: "No specific anti-hazing statute", penalty: null, namedAfter: null },
    { abbrev: "TN", name: "Tennessee", lawType: "misdemeanor", description: "Class B misdemeanor; Class A if serious injury", penalty: "Up to 11 months 29 days jail", namedAfter: null },
    { abbrev: "TX", name: "Texas", lawType: "felony", description: "Class B misdemeanor to state jail felony based on harm", penalty: "Up to 2 years in state jail", namedAfter: null },
    { abbrev: "UT", name: "Utah", lawType: "misdemeanor", description: "Class B misdemeanor; Class A if serious injury", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "VT", name: "Vermont", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 1 year jail", namedAfter: null },
    { abbrev: "VA", name: "Virginia", lawType: "felony", description: "Adam's Law: Class 1 misdemeanor; Class 6 felony if serious injury or death", penalty: "Up to 5 years prison", namedAfter: "Adam's Law (Adam Oakes)" },
    { abbrev: "WA", name: "Washington", lawType: "felony", description: "Sam's Law: Gross misdemeanor; Class C felony if substantial harm or death", penalty: "Up to 5 years prison", namedAfter: "Sam's Law (Sam Martinez)" },
    { abbrev: "WV", name: "West Virginia", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 9 months jail, $1,000 fine", namedAfter: null },
    { abbrev: "WI", name: "Wisconsin", lawType: "felony", description: "Class A misdemeanor; Class I felony if great bodily harm", penalty: "Up to 3.5 years prison", namedAfter: null },
    { abbrev: "WY", name: "Wyoming", lawType: "none", description: "No specific anti-hazing statute", penalty: null, namedAfter: null },
    { abbrev: "DC", name: "District of Columbia", lawType: "misdemeanor", description: "Misdemeanor offense", penalty: "Up to 180 days jail, $1,000 fine", namedAfter: null }
  ];

  const alternativeActivities = [
    {
      category: "Team Building & Bonding",
      icon: Users,
      description: "Build genuine brotherhood/sisterhood through shared positive experiences",
      activities: [
        {
          name: "Escape Room Challenges",
          detail: "Teams work together to solve puzzles under time pressure, building communication and trust",
          example: "Alpha Phi Alpha at Howard University hosts monthly escape room nights during intake season"
        },
        {
          name: "Ropes Course & Adventure Programs",
          detail: "High and low rope challenges that require trust and teamwork",
          example: "Many chapters partner with campus recreation for NOLS-style wilderness programs"
        },
        {
          name: "Cooking Competitions",
          detail: "Iron Chef-style cook-offs where teams collaborate to create meals",
          example: "Delta Sigma Theta chapters host 'Cook for a Cause' events, donating meals to shelters"
        },
        {
          name: "Intramural Sports Leagues",
          detail: "Organized team sports build camaraderie through healthy competition",
          example: "Greek intramural leagues at most universities offer basketball, flag football, and soccer"
        },
        {
          name: "Road Trip Retreats",
          detail: "Bonding trips to conferences, historical sites, or service destinations",
          example: "Omega Psi Phi chapters organize visits to civil rights landmarks"
        },
        {
          name: "Knowledge Challenge Game Nights",
          detail: "Wheel of Fortune or Jeopardy-style competitions testing Greek history, current events, and academics",
          example: "NPHC councils host 'Greek Feud' tournaments with prizes for winning organizations"
        },
        {
          name: "Card Game Tournaments",
          detail: "Spades, Uno, or bid whist tournaments that foster friendly competition and bonding",
          example: "Many BGLO chapters host 'Spades Night' as a signature bonding tradition"
        },
        {
          name: "Trivia & Quiz Bowl Nights",
          detail: "Team-based trivia competitions covering pop culture, Black history, and organizational knowledge",
          example: "Kappa Alpha Psi's 'Kappa Kwiz' challenges teams on fraternity history and current events"
        },
        {
          name: "Plan & Lead a Chapter Meeting",
          detail: "Challenge new members to create agendas, facilitate discussions, and lead a full meeting",
          example: "Each aspirant leads one chapter meeting, learning parliamentary procedure and leadership"
        },
        {
          name: "Organize a Community Service Project",
          detail: "From start to finish—planning, logistics, volunteer coordination, and execution",
          example: "New member lines organize their own service day, from selecting the cause to execution"
        },
        {
          name: "Event Planning Challenge",
          detail: "Plan and execute a chapter event including budgeting, venue, and marketing",
          example: "Aspirants plan a successful social, fundraiser, or educational program within budget"
        },
        {
          name: "Committee Leadership Project",
          detail: "Lead a specific committee (social, service, academic) for a set period",
          example: "New members chair committees alongside actives, gaining real leadership experience"
        },
        {
          name: "Professional Presentation Challenge",
          detail: "Research and present on organizational history, values, or a relevant topic",
          example: "Each new member presents on a founder, chapter milestone, or service initiative"
        },
        {
          name: "Robert's Rules of Order Certification",
          detail: "Learn and demonstrate mastery of parliamentary procedure for professional meetings",
          example: "New members pass a Robert's Rules quiz and demonstrate motions in mock meetings"
        },
        {
          name: "Budget & Financial Planning Challenge",
          detail: "Create and present a chapter budget or event financial plan",
          example: "Aspirants propose budgets for hypothetical programs, learning fiscal responsibility"
        }
      ]
    },
    {
      category: "Academic Excellence",
      icon: GraduationCap,
      description: "Foster intellectual growth and scholarly achievement together",
      activities: [
        {
          name: "Study Partnerships",
          detail: "Pair new members with accomplished actives for academic mentorship",
          example: "Kappa Alpha Psi's 'Study Buddy' program matches by major for GPA improvement"
        },
        {
          name: "Guest Speaker Series",
          detail: "Invite successful alumni and professionals to share wisdom",
          example: "Alpha Kappa Alpha hosts monthly 'Wisdom Wednesday' featuring accomplished Sorors"
        },
        {
          name: "Academic Competitions",
          detail: "Quiz bowls, case competitions, and debate tournaments",
          example: "NPHC Greek Week academic quiz bowl with prizes for winning chapters"
        },
        {
          name: "Library Lock-ins",
          detail: "Overnight study sessions with snacks and collaborative learning",
          example: "Finals week study marathons with tutoring support from grad student members"
        },
        {
          name: "Research Symposiums",
          detail: "Showcase member research and academic projects",
          example: "Sigma Gamma Rho's undergraduate research presentation competitions"
        }
      ]
    },
    {
      category: "Community Service",
      icon: Heart,
      description: "Bond through meaningful service that reflects organizational values",
      activities: [
        {
          name: "Habitat for Humanity Builds",
          detail: "Build homes together while building bonds—physical labor creates shared accomplishment",
          example: "Phi Beta Sigma chapters have built over 500 homes through their partnership with Habitat"
        },
        {
          name: "Mentoring Programs",
          detail: "Mentor youth in local schools, creating intergenerational impact",
          example: "Alpha Phi Alpha's Go-to-High-School, Go-to-College program reaches thousands of students"
        },
        {
          name: "Food Bank Service Days",
          detail: "Regular volunteering at local food banks and soup kitchens",
          example: "Zeta Phi Beta's partnership with Feeding America for monthly service"
        },
        {
          name: "Health Screenings & Fairs",
          detail: "Organize community health events aligned with organizational health initiatives",
          example: "Delta Sigma Theta's Delta Days service projects provide free health screenings"
        },
        {
          name: "Environmental Cleanups",
          detail: "Campus and community beautification projects",
          example: "Adopt-a-Highway programs and campus sustainability initiatives"
        },
        {
          name: "Homeless Sleep-Out Events",
          detail: "Spend a night sleeping outside to raise awareness and funds for homelessness",
          example: "Annual 'Cardboard City' events raise thousands for local homeless shelters"
        },
        {
          name: "Plasma & Blood Drives",
          detail: "Organize campus-wide blood and plasma donation drives that save lives",
          example: "Alpha Kappa Alpha's 'Give Life' initiative partners with Red Cross for quarterly drives"
        },
        {
          name: "Canned Food Drives",
          detail: "Chapter-wide food collection competitions to stock local food pantries",
          example: "Phi Beta Sigma's 'Fill the Pantry' challenge collects 10,000+ cans annually"
        },
        {
          name: "Clothing & Coat Drives",
          detail: "Collect gently used clothing for community members in need",
          example: "Zeta Phi Beta's 'Warm Hearts' winter coat drive serves families across the country"
        },
        {
          name: "Back-to-School Supply Drives",
          detail: "Collect and distribute school supplies to underserved students",
          example: "Delta Sigma Theta's annual backpack giveaways equip thousands of students"
        },
        {
          name: "Voter Registration Drives",
          detail: "Register students and community members to vote, empowering civic participation",
          example: "Alpha Phi Alpha's 'A Voteless People is a Hopeless People' initiative registers thousands"
        },
        {
          name: "Civic Engagement Workshops",
          detail: "Educate community on local government, voting rights, and civic responsibilities",
          example: "Know Your Rights workshops teaching ID requirements, polling locations, and ballot issues"
        },
        {
          name: "Get Out the Vote (GOTV) Campaigns",
          detail: "Organize rides to polls, phone banks, and door-to-door canvassing",
          example: "Divine Nine Voter Initiative mobilizes thousands of voters each election cycle"
        },
        {
          name: "Town Hall & Candidate Forums",
          detail: "Host local political forums bringing candidates to campus",
          example: "NPHC chapters co-host nonpartisan candidate Q&A sessions before elections"
        },
        {
          name: "Census Participation Drives",
          detail: "Ensure community members are counted in census for proper representation",
          example: "2020 Complete Count initiatives focused on historically undercounted communities"
        }
      ]
    },
    {
      category: "Professional Development",
      icon: Building,
      description: "Prepare members for career success through structured programs",
      activities: [
        {
          name: "Resume & Interview Workshops",
          detail: "Alumni professionals help polish resumes and practice interview skills",
          example: "Kappa Alpha Psi's Kappa League program includes professional development for aspirants"
        },
        {
          name: "Networking Mixers",
          detail: "Connect new members with successful alumni in their fields",
          example: "Industry-specific networking nights: Finance Friday, Tech Tuesday, Law Thursday"
        },
        {
          name: "Corporate Site Visits",
          detail: "Tours of major companies and organizations",
          example: "Visits to Google, Goldman Sachs, or local businesses with alumni connections"
        },
        {
          name: "Personal Branding Sessions",
          detail: "LinkedIn optimization, professional photos, and elevator pitch practice",
          example: "Many chapters offer 'Brand Yourself' workshops during new member education"
        },
        {
          name: "Graduate School Preparation",
          detail: "GRE/LSAT/MCAT study groups and application workshops",
          example: "Alpha Kappa Alpha's partnership with Kaplan for test prep discounts"
        }
      ]
    },
    {
      category: "Cultural & Heritage Education",
      icon: BookOpen,
      description: "Deep dive into organizational and cultural history through meaningful learning",
      activities: [
        {
          name: "Founders Day Celebrations",
          detail: "Honor organizational history with educational programs and reflection",
          example: "Interactive presentations about founders' lives, struggles, and achievements"
        },
        {
          name: "Historical Site Pilgrimages",
          detail: "Visit founding campuses, civil rights landmarks, and significant locations",
          example: "Omega Psi Phi's pilgrimage to Howard University's founding chapter room"
        },
        {
          name: "Documentary Screenings",
          detail: "Watch and discuss films about Greek life, civil rights, and organizational history",
          example: "'A Different World' viewing parties with discussions about Greek portrayals"
        },
        {
          name: "Museum Visits",
          detail: "Educational trips to African American history museums and cultural centers",
          example: "National Museum of African American History and Culture visits"
        },
        {
          name: "Elder Member Storytelling",
          detail: "Invite long-standing members to share oral histories and traditions",
          example: "Silver Star and Golden Soror/Brother evening programs"
        }
      ]
    },
    {
      category: "Wellness & Self-Care",
      icon: LifeBuoy,
      description: "Build holistic health and support member wellbeing",
      activities: [
        {
          name: "Mental Health Workshops",
          detail: "Destigmatize mental health through education and resources",
          example: "Partnerships with campus counseling for stress management sessions"
        },
        {
          name: "Fitness Challenges",
          detail: "Collective wellness goals like step challenges or 5K training",
          example: "Sigma Gamma Rho's Sigma Fit program promotes healthy lifestyles"
        },
        {
          name: "Meditation & Mindfulness",
          detail: "Group meditation sessions and mindfulness practices",
          example: "Morning prayer circles and reflection sessions before chapter meetings"
        },
        {
          name: "Financial Literacy",
          detail: "Budgeting, investing, and financial planning workshops",
          example: "Alumni-led sessions on student loans, credit building, and saving"
        },
        {
          name: "Spa & Self-Care Nights",
          detail: "Relaxation and bonding through self-care activities",
          example: "Face mask nights, manicure sessions, and wellness retreats"
        }
      ]
    }
  ];

  const successStories = [
    {
      organization: "Kappa Alpha Psi - Beta Chapter",
      school: "University of Illinois",
      initiative: "Achievement Week Program",
      description: "Replaced traditional 'Hell Week' with 'Achievement Week' focused on academic excellence, community service, and professional development. New member GPA increased 0.5 points on average.",
      year: "Since 2015"
    },
    {
      organization: "Alpha Kappa Alpha - Gamma Chapter",
      school: "University of Pennsylvania",
      initiative: "Sisterhood Development Institute",
      description: "Six-week program combining leadership workshops, service projects, and mentorship. No hazing incidents in 10+ years while maintaining strong chapter bonds.",
      year: "Since 2012"
    },
    {
      organization: "Omega Psi Phi - Various Chapters",
      school: "Multiple Universities",
      initiative: "Cardinal Principles Program",
      description: "Structured new member education focused on Manhood, Scholarship, Perseverance, and Uplift through meaningful activities rather than physical tests.",
      year: "Ongoing"
    },
    {
      organization: "Delta Sigma Theta - Alpha Chapter",
      school: "Howard University",
      initiative: "GEMS (Gaining Educational, Moral, and Social Skills)",
      description: "Comprehensive intake program that builds sisterhood through service projects, academic support, and leadership development.",
      year: "Since 2010"
    }
  ];

  const resources = [
    {
      icon: ExternalLink,
      title: "StopHazing.org",
      description: "Research, education, and advocacy to prevent hazing",
      link: "https://stophazing.org/"
    },
    {
      icon: ExternalLink,
      title: "HazingPrevention.org",
      description: "Resources for building hazing-free communities",
      link: "https://hazingprevention.org/"
    },
    {
      icon: Headphones,
      title: "National Hazing Hotline",
      description: "24/7 confidential support and reporting",
      link: "tel:1-888-668-4293"
    },
    {
      icon: Building,
      title: "Campus Security",
      description: "Your university's security department for immediate concerns",
      link: null
    },
    {
      icon: GraduationCap,
      title: "Dean of Students Office",
      description: "Institutional support for hazing prevention and reporting",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
            Anti-Hazing Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building a safer Greek life through education, prevention, and meaningful alternatives. 
            Every member deserves dignity and respect.
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="mb-12 border-destructive/30 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div>
                  <h3 className="font-semibold text-destructive">If You're Being Hazed</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to say no. Your safety matters. Get help now:
                  </p>
                </div>
              </div>
              <a href="tel:1-888-668-4293">
                <Button variant="destructive" className="gap-2">
                  <Phone className="w-4 h-4" />
                  1-888-NOT-HAZE
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="prevention" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="memorial">Memorial</TabsTrigger>
            <TabsTrigger value="laws">State Laws</TabsTrigger>
          </TabsList>

          <TabsContent value="prevention">
            <div className="grid md:grid-cols-2 gap-6">
              {preventionStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <strategy.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{strategy.title}</CardTitle>
                        <CardDescription>{strategy.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alternatives">
            <div className="space-y-8">
              {/* Intro */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Building Brotherhood & Sisterhood Without Hazing</h3>
                      <p className="text-muted-foreground">
                        True bonds are formed through shared positive experiences, not shared trauma. 
                        These alternatives create stronger, healthier organizations while honoring the 
                        values of excellence, service, and community that Greek life was founded upon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alternative Activities Accordion */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-semibold text-foreground">Alternative Activities by Category</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAlternativesAccordionValues(alternativeActivities.map((_, i) => `alt-${i}`))}
                      className="text-xs"
                    >
                      <ChevronsDownUp className="w-4 h-4 mr-1" />
                      Expand All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAlternativesAccordionValues([])}
                      className="text-xs"
                    >
                      <ChevronsUpDown className="w-4 h-4 mr-1" />
                      Collapse All
                    </Button>
                  </div>
                </div>

                <Accordion 
                  type="multiple" 
                  value={alternativesAccordionValues} 
                  onValueChange={setAlternativesAccordionValues}
                  className="space-y-3"
                >
                  {alternativeActivities.map((category, index) => (
                    <AccordionItem key={index} value={`alt-${index}`} className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary/5 to-background hover:from-primary/10">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <category.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-foreground">{category.category}</h4>
                            <p className="text-xs text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="pt-2">
                          <div className="mb-4">
                            <ListenButton
                              text={`${category.category}. ${category.description}. ${category.activities.map(a => `${a.name}. ${a.detail}. Example: ${a.example}`).join('. ')}`}
                              itemId={`alt-activities-${index}`}
                              title={category.category}
                              voice="jessica"
                              showLabel={true}
                            />
                          </div>
                          <div className="space-y-4">
                            {category.activities.map((activity, i) => (
                              <div key={i} className="border-l-2 border-primary/30 pl-4 py-2">
                                <h5 className="font-medium text-foreground">{activity.name}</h5>
                                <p className="text-sm text-muted-foreground mt-1">{activity.detail}</p>
                                <p className="text-xs text-primary mt-2 italic">Example: {activity.example}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Success Stories */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Success Stories</CardTitle>
                  <CardDescription>Real chapters making positive change</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {successStories.map((story, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{story.initiative}</h4>
                          <Badge variant="outline" className="text-xs">{story.year}</Badge>
                        </div>
                        <p className="text-xs text-primary mb-2">{story.organization} • {story.school}</p>
                        <p className="text-sm text-muted-foreground">{story.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">Start the Change in Your Chapter</h3>
                  <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                    Download our comprehensive guides to implementing positive alternatives and 
                    transforming your new member education program.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="gap-2" onClick={handleDownloadPDF}>
                      <Download className="w-4 h-4" />
                      Alternative Activities Guide
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={handleDownloadCurriculumPDF}>
                      <FileText className="w-4 h-4" />
                      Full Intake Curriculum Template
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    The curriculum includes an 8-week schedule, leadership challenges, service requirements, and completion sign-off forms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Hazing by the Numbers</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Research shows that hazing is far more prevalent than many realize. 
                      Understanding the scope of the problem is the first step toward prevention.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-lg bg-muted">
                        <div className="text-3xl font-bold text-primary mb-2">73%</div>
                        <div className="text-sm text-muted-foreground">
                          of students involved in social organizations experienced hazing
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted">
                        <div className="text-3xl font-bold text-primary mb-2">9 in 10</div>
                        <div className="text-sm text-muted-foreground">
                          students who experienced hazing did not report it
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted">
                        <div className="text-3xl font-bold text-primary mb-2">47%</div>
                        <div className="text-sm text-muted-foreground">
                          of students came to college having already experienced hazing
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Visualization */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Hazing Deaths Timeline: 1838-2025</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    Historical trend of documented hazing deaths by decade with key legislative milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Area Chart */}
                  <div className="mb-8">
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <defs>
                          <linearGradient id="deathsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="decade" 
                          tick={{ fontSize: 11 }} 
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value) => [`${value} deaths`, 'Deaths']}
                          labelFormatter={(label) => `Decade: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="deaths" 
                          stroke="#ef4444" 
                          fill="url(#deathsGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legislative Milestones Timeline */}
                  <div className="border-t border-border pt-6">
                    <h4 className="text-sm font-semibold text-center mb-6">Key Legislative Milestones</h4>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-destructive via-primary to-primary/50" />
                      
                      <div className="space-y-4">
                        {legislativeMilestones.map((milestone, index) => (
                          <div 
                            key={index} 
                            className={`relative flex items-start gap-4 ${
                              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                          >
                            {/* Content */}
                            <div className={`flex-1 ml-10 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                              <div className={`p-3 rounded-lg border ${
                                milestone.type === 'death' 
                                  ? 'bg-destructive/5 border-destructive/20' 
                                  : 'bg-primary/5 border-primary/20'
                              }`}>
                                <div className="flex items-center gap-2 justify-between md:justify-start">
                                  <Badge variant={milestone.type === 'death' ? 'destructive' : 'default'} className="text-xs">
                                    {milestone.year}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                                    {milestone.type === 'death' ? 'Tragic Event' : 'Legislation'}
                                  </Badge>
                                </div>
                                <h5 className="font-medium text-sm mt-2">{milestone.event}</h5>
                                <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
                              </div>
                            </div>

                            {/* Timeline dot */}
                            <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                              milestone.type === 'death'
                                ? 'bg-destructive border-destructive'
                                : 'bg-primary border-primary'
                            }`} />

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary stats */}
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="text-center">
                      <div className="text-xl font-bold text-destructive">
                        {timelineData.reduce((sum, d) => sum + d.deaths, 0)}+
                      </div>
                      <div className="text-xs text-muted-foreground">Total Deaths Since 1838</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">44</div>
                      <div className="text-xs text-muted-foreground">States with Laws</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-warning">68</div>
                      <div className="text-xs text-muted-foreground">Deaths in 2010s (Peak)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">187</div>
                      <div className="text-xs text-muted-foreground">Years of Documented Hazing</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deaths by Council Visualization */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Hazing Deaths by Greek Council</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    Visual breakdown of documented hazing and pledging deaths across major Greek governing councils
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <div>
                      <h4 className="text-sm font-medium text-center mb-4">Deaths Distribution</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="deaths"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} deaths`, 
                              props.payload.fullName
                            ]}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div>
                      <h4 className="text-sm font-medium text-center mb-4">Deaths Comparison</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} layout="vertical">
                          <XAxis type="number" tick={{ fontSize: 12 }} />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            tick={{ fontSize: 11 }}
                            width={60}
                          />
                          <Tooltip 
                            formatter={(value, name) => [value, name === 'hazingDeaths' ? 'Hazing Deaths' : 'Pledging Deaths']}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="hazingDeaths" name="Hazing Deaths" fill="#ef4444" stackId="a" />
                          <Bar dataKey="pledgingDeaths" name="Pledging Deaths" fill="#f97316" stackId="a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {chartData.map((item, index) => (
                      <div key={item.name} className="flex items-center gap-2 text-xs">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-muted-foreground">{item.fullName.split(" (")[0]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* BGLO Death Statistics */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">BGLO Hazing & Pledging Deaths</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    Documented deaths within the Divine Nine organizations. This data reflects the serious consequences 
                    of hazing and the need for continued vigilance and prevention efforts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Organization</th>
                          <th className="text-center py-3 px-4 font-semibold text-xs">Council</th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-destructive">Hazing Deaths</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-warning">Pledging Deaths*</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-primary">Injuries</span>
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bgloDeathStatistics.map((org, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-3 px-4 font-medium">{org.organization}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="text-xs">{org.council}</Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={org.hazingDeaths > 0 ? "destructive" : "secondary"}>
                                {org.hazingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={org.pledgingDeaths > 0 ? "outline" : "secondary"} 
                                     className={org.pledgingDeaths > 0 ? "border-warning text-warning" : ""}>
                                {org.pledgingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="border-primary/50 text-primary">
                                {org.injuries}+
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {org.notes || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>*Pledging Deaths:</strong> Deaths that occurred during the pledging/intake process but were not 
                      officially determined or reported as being caused by hazing. These cases highlight the importance of 
                      thorough investigation and transparent reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Council Statistics */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Deaths & Injuries by Greek Council</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    Comprehensive statistics across all major Greek governing councils, highlighting the scope of hazing 
                    across different types of organizations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Council</th>
                          <th className="text-center py-3 px-4 font-semibold text-xs">Orgs</th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-destructive">Deaths</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-warning">Pledging*</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-primary">Injuries</span>
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {councilStatistics.map((council, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-3 px-4 font-medium text-sm">{council.council}</td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-muted-foreground">{council.organizations}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={council.hazingDeaths > 10 ? "destructive" : council.hazingDeaths > 0 ? "outline" : "secondary"}
                                     className={council.hazingDeaths > 10 ? "" : council.hazingDeaths > 0 ? "border-destructive text-destructive" : ""}>
                                {council.hazingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={council.pledgingDeaths > 0 ? "outline" : "secondary"} 
                                     className={council.pledgingDeaths > 0 ? "border-warning text-warning" : ""}>
                                {council.pledgingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="border-primary/50 text-primary">
                                {council.injuries}+
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {council.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">
                        {councilStatistics.reduce((sum, c) => sum + c.hazingDeaths, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Hazing Deaths</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">
                        {councilStatistics.reduce((sum, c) => sum + c.pledgingDeaths, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Pledging Deaths</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {councilStatistics.reduce((sum, c) => sum + c.injuries, 0).toLocaleString()}+
                      </div>
                      <div className="text-xs text-muted-foreground">Documented Injuries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {councilStatistics.reduce((sum, c) => sum + c.organizations, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Organizations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Citations */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Source Citations</CardTitle>
                      <CardDescription>Data compiled from multiple verified sources</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sourceCitations.map((citation) => (
                      <div key={citation.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <Badge variant="outline" className="mt-0.5 shrink-0">{citation.id}</Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{citation.source}</p>
                          <p className="text-sm text-muted-foreground italic">"{citation.title}"</p>
                          <p className="text-xs text-muted-foreground">{citation.year}</p>
                        </div>
                        {citation.url && (
                          <a 
                            href={citation.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-xs shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic">
                    Note: Statistics are compiled from publicly available sources including court records, news reports, 
                    academic studies, and hazing prevention organizations. Some incidents may be underreported. 
                    Numbers represent documented cases and may not reflect the full scope of hazing-related harm.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="laws">
            <div className="space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Anti-Hazing Legislation by State</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    44 states plus the District of Columbia have enacted anti-hazing laws. 
                    Click on a state to see details about their specific laws and penalties.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Interactive US Map */}
                  <div className="mb-8">
                    <div className="grid grid-cols-10 md:grid-cols-13 gap-1 max-w-4xl mx-auto">
                      {stateHazingLaws.map((state) => (
                        <button
                          key={state.abbrev}
                          onClick={() => setSelectedState(selectedState === state.abbrev ? null : state.abbrev)}
                          className={`p-2 rounded text-xs font-medium transition-all ${
                            state.lawType === 'felony' 
                              ? 'bg-destructive/80 hover:bg-destructive text-destructive-foreground' 
                              : state.lawType === 'misdemeanor'
                              ? 'bg-warning/80 hover:bg-warning text-warning-foreground'
                              : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                          } ${selectedState === state.abbrev ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                          title={`${state.name}: ${state.lawType === 'none' ? 'No specific law' : state.lawType}`}
                        >
                          {state.abbrev}
                        </button>
                      ))}
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-destructive/80"></div>
                        <span>Felony Possible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-warning/80"></div>
                        <span>Misdemeanor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-muted"></div>
                        <span>No Specific Law</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected State Details */}
                  {selectedState && (
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-6">
                        {(() => {
                          const state = stateHazingLaws.find(s => s.abbrev === selectedState);
                          if (!state) return null;
                          return (
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold">{state.name}</h4>
                                <Badge variant={state.lawType === 'felony' ? 'destructive' : state.lawType === 'misdemeanor' ? 'outline' : 'secondary'}>
                                  {state.lawType === 'felony' ? 'Felony Possible' : state.lawType === 'misdemeanor' ? 'Misdemeanor' : 'No Specific Law'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{state.description}</p>
                              {state.penalty && (
                                <p className="text-sm"><strong>Penalty:</strong> {state.penalty}</p>
                              )}
                              {state.namedAfter && (
                                <p className="text-sm mt-2 text-primary italic">Named law: {state.namedAfter}</p>
                              )}
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  )}

                  {/* Summary Stats */}
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
                      <div className="text-2xl font-bold text-destructive">
                        {stateHazingLaws.filter(s => s.lawType === 'felony').length}
                      </div>
                      <div className="text-sm text-muted-foreground">States with Felony Laws</div>
                    </div>
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 text-center">
                      <div className="text-2xl font-bold text-warning">
                        {stateHazingLaws.filter(s => s.lawType === 'misdemeanor').length}
                      </div>
                      <div className="text-sm text-muted-foreground">States with Misdemeanor Laws</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted border border-border text-center">
                      <div className="text-2xl font-bold text-muted-foreground">
                        {stateHazingLaws.filter(s => s.lawType === 'none').length}
                      </div>
                      <div className="text-sm text-muted-foreground">States Without Specific Laws</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Legislation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent & Notable Legislation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stateHazingLaws
                      .filter(s => s.namedAfter)
                      .slice(0, 8)
                      .map((state, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                          <Badge variant="outline" className="shrink-0">{state.abbrev}</Badge>
                          <div>
                            <p className="font-medium text-sm">{state.namedAfter}</p>
                            <p className="text-xs text-muted-foreground">{state.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="memorial">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Flame className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-2">In Memoriam</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Honoring those who lost their lives to hazing. Their stories remind us why we must continue 
                  fighting for change. Every name represents a family forever changed.
                </p>
              </div>

              <div className="grid gap-4">
                {memorialVictims.map((victim, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-semibold">{victim.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Age {victim.age} • {victim.year}
                              </p>
                            </div>
                            <Badge variant="outline" className="shrink-0">
                              {victim.organization.includes("NPHC") || victim.organization.includes("Alpha Kappa Alpha") || 
                               victim.organization.includes("Kappa Alpha Psi") || victim.organization.includes("Omega Psi Phi") ? 
                               "NPHC" : victim.organization.includes("IFC") ? "IFC" : "Other"}
                            </Badge>
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Organization:</span>{" "}
                              <span className="text-muted-foreground">{victim.organization}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">School:</span>{" "}
                              <span className="text-muted-foreground">{victim.school}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Cause:</span>{" "}
                              <span className="text-muted-foreground">{victim.cause}</span>
                            </p>
                          </div>
                        </div>
                        {victim.legislation && (
                          <div className="bg-primary/5 border-t md:border-t-0 md:border-l border-border p-4 md:w-64 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                              <Scale className="w-4 h-4 text-primary" />
                              <span className="text-xs font-medium text-primary">Legacy Legislation</span>
                            </div>
                            <p className="text-sm font-medium">{victim.legislation}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    This memorial represents only a small portion of those who have lost their lives to hazing. 
                    Many more names remain undocumented or unknown. Each death was preventable.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline">350+ Total Deaths Since 1838</Badge>
                    <Badge variant="outline">2,500+ Documented Injuries</Badge>
                    <Badge variant="outline">1 Death Every Year on Average</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources - Accordion Style */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-serif font-medium">
              Additional Resources
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setResourcesAccordionValues(['renounced-support', 'prevention-resources'])}
                className="text-xs"
              >
                <ChevronsDownUp className="w-4 h-4 mr-1" />
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setResourcesAccordionValues([])}
                className="text-xs"
              >
                <ChevronsUpDown className="w-4 h-4 mr-1" />
                Collapse All
              </Button>
            </div>
          </div>

          <Accordion 
            type="multiple" 
            value={resourcesAccordionValues} 
            onValueChange={setResourcesAccordionValues}
            className="space-y-4"
          >
            {/* Supporting Those Who Have Renounced */}
            <AccordionItem value="renounced-support" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-sacred/5 to-background hover:from-sacred/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sacred/10">
                    <Users className="w-5 h-5 text-sacred" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Supporting Those Who Have Renounced</h3>
                    <p className="text-xs text-muted-foreground">Resources for those who have left Greek organizations</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <RenouncedSupportSection embedded />
              </AccordionContent>
            </AccordionItem>

            {/* Hazing Prevention Resources */}
            <AccordionItem value="prevention-resources" className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary/5 to-background hover:from-primary/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Hazing Prevention Resources</h3>
                    <p className="text-xs text-muted-foreground">{resources.length} external resources & hotlines</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <resource.icon className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                        {resource.link && (
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {resource.link.startsWith('tel:') ? 'Call Now →' : 'Visit Website →'}
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default AntiHazing;