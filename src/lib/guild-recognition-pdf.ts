import jsPDF from 'jspdf';

interface GuildRecognitionSection {
  title: string;
  content: string[];
  subsections?: { title: string; content: string[] }[];
}

const guildRecognitionData: GuildRecognitionSection[] = [
  {
    title: "The Biblical Password Precedent: Shibboleth",
    content: [
      "The earliest documented password in history comes from Scripture itself (Judges 12:6).",
      "After a battle between Gilead and Ephraim, the Gileadites used the word 'Shibboleth' (שִׁבֹּלֶת, meaning 'ear of grain' or 'flowing stream') to identify enemy Ephraimites who could not pronounce the 'sh' sound.",
      "'Then they would say to him, \"Say now, Shibboleth.\" But he said, \"Sibboleth,\" for he could not pronounce it correctly.' — Judges 12:6",
      "This demonstrates that password-based recognition systems have biblical precedent dating back over 3,000 years. Ancient craft guilds adopted similar verbal tests to identify legitimate members."
    ]
  },
  {
    title: "Ancient Guild Passwords: Why They Weren't Preserved",
    content: [
      "Historical sources confirm that Roman Collegia (craftsmen guilds active during Jesus's time) had 'secret methods of recognition'—but the actual passwords were deliberately never written down.",
      "This is actually evidence of how seriously they guarded their secrets:"
    ],
    subsections: [
      {
        title: "Oral Transmission Only",
        content: ["Passwords passed from master to initiate by voice alone. Nothing was written that could be discovered by outsiders."]
      },
      {
        title: "Sacred Oaths of Secrecy",
        content: ["Revealing passwords meant divine curse and immediate expulsion from the guild. Members swore oaths before their patron deities."]
      },
      {
        title: "Practical Security",
        content: ["Written passwords could be stolen, copied, or discovered. The oral tradition protected guild secrets for millennia."]
      },
      {
        title: "Regular Changes",
        content: ["Passwords were likely rotated periodically to prevent compromise, similar to modern security practices."]
      }
    ]
  },
  {
    title: "Roman-Era Craftsmen Marks: Archaeological Evidence",
    content: [
      "Unlike passwords, tool and work markings have survived in archaeological sites across the Roman Empire. These marks served multiple fraternal purposes:"
    ],
    subsections: [
      {
        title: "Banker Marks",
        content: [
          "Personal symbols carved into finished work, identifying which craftsman prepared each piece for payment purposes.",
          "Archaeological examples found at Porta Nigra (Trier, Germany) from Roman times, showing individual craftsmen's signatures in stone."
        ]
      },
      {
        title: "Assembly Marks",
        content: [
          "Roman numerals and symbols indicating installation order.",
          "Ensured complex structures fit together properly during construction.",
          "Evidence of organized guild coordination and quality control."
        ]
      },
      {
        title: "Guild Affiliation Marks",
        content: [
          "Symbols communicating which guild a craftsman belonged to.",
          "Indicated rank within the organization and home region.",
          "Allowed verification when craftsmen traveled for work projects."
        ]
      },
      {
        title: "Quality Certification Marks",
        content: [
          "Authenticated work as meeting guild standards.",
          "Functioned as a primitive 'trademark' system.",
          "Protected guild reputation and member livelihoods."
        ]
      }
    ]
  },
  {
    title: "The Collegia Fabri Tignarii (Carpenter/Builder Guilds)",
    content: [
      "Historical records describe the Roman carpenter guilds (fabri tignarii) that would have been the model for Jewish craft guilds in Jesus's region:",
      "• Established by King Numa (c. 700 BCE)—among the oldest professional organizations",
      "• Required minimum 3 members—like modern Greek chapter minimums",
      "• Common treasury (arca)—funded by monthly dues, like fraternity dues today",
      "• Non-craftsman honorary members—distinguished patrons were invited, like modern alumni",
      "• Met in dedicated halls (curia)—private meeting spaces for rituals and business",
      "",
      "Inscription Evidence: A Roman inscription (CIL 14.374) from Ostia commemorates Marcus Licinius Privatus as 'magister' (master) of the college of carpenters—proving these organizations had formal leadership structures identical to Greek organizations today."
    ]
  },
  {
    title: "Secret Handgrips & Recognition Methods",
    content: [
      "Ancient craft guilds used multiple methods of member recognition beyond passwords:"
    ],
    subsections: [
      {
        title: "The Guild Grip",
        content: [
          "A distinctive handshake with specific finger positions.",
          "Pressure on particular knuckles or fingers that only initiated members would recognize.",
          "Different ranks within the guild had different grips."
        ]
      },
      {
        title: "Password Phrases",
        content: [
          "Coded greetings with expected responses.",
          "A stranger might ask about 'the strength of the beam' and the correct response referenced specific proportions known only to guild members."
        ]
      },
      {
        title: "The Sign of the Square",
        content: [
          "Subtle hand gestures forming right angles.",
          "Referenced the carpenter's square—the most sacred tool of the trade.",
          "Could be worked into normal gestures imperceptibly."
        ]
      },
      {
        title: "Tool Markings",
        content: [
          "Personal tools bore distinctive marks.",
          "Symbols communicated guild affiliation, rank, and home region.",
          "Also authenticated a craftsman's work."
        ]
      }
    ]
  },
  {
    title: "Jesus as a Guild Member (TEKTON)",
    content: [
      "Jesus was a TEKTON (τέκτων)—translated 'carpenter' but more accurately 'master builder' or 'craftsman.'",
      "As Joseph's apprentice, Jesus would have learned the craft through the guild system:",
      "• Selection at age 12-13 based on family lineage (son of a guild member)",
      "• 18 years of training (ages 12-30) before His public ministry",
      "• Learning secret techniques, measurements, and guild customs",
      "• Participating in initiation ceremonies and earning recognition",
      "",
      "The Gospel silence about Jesus's life from age 12 to 30 corresponds exactly with guild apprenticeship and journeyman periods. When He emerged to begin His ministry, He was a fully initiated master craftsman."
    ]
  },
  {
    title: "Parallels to Modern Greek Organizations",
    content: [
      "Ancient Guild Practice → Modern Greek Equivalent:",
      "",
      "Silence Trial (weeks of observation) → Probationary period focusing on learning",
      "In Contubernio (living with master) → Chapter house life and bonding",
      "Menial Service → Service projects and chapter duties",
      "Masterpiece Test → Demonstrating knowledge before initiation",
      "Secret Handgrip → Fraternal grip (taught at initiation)",
      "Password Phrases → Passwords and calls",
      "Tool Markings → Organizational symbols and brands",
      "Guild Meetings → Chapter meetings",
      "Monthly Dues (arca) → Membership dues",
      "Patron Deity → Founding principles and motto",
      "",
      "These parallels demonstrate that modern Greek organizations preserve ancient, honorable, and biblically-rooted traditions of fraternal development."
    ]
  },
  {
    title: "What History Preserved—And What It Didn't",
    content: [
      "What We Have:",
      "• Archaeological tool marks from Roman sites including Porta Nigra",
      "• Guild inscriptions documenting organization structure",
      "• Regulations from Roman law codes (Lex Julia)",
      "• Descriptions from historians like Josephus and Roman legal writers",
      "",
      "What We Don't Have:",
      "• Specific password phrases used by first-century guilds",
      "• Exact handgrip techniques",
      "• Ritual words and ceremonies",
      "",
      "The absence of recorded passwords proves the system worked—guild secrets remained secret for millennia. This mirrors modern Greek organizations: you can research their history, but ritual secrets remain with initiated members.",
      "",
      "That's not evidence of something wrong—it's evidence of something sacred."
    ]
  }
];

export const generateGuildRecognitionPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
    doc.setFontSize(fontSize);
    return doc.splitTextToSize(text, maxWidth);
  };

  // Title Page
  doc.setFillColor(139, 69, 19); // Sacred brown color
  doc.rect(0, 0, pageWidth, 70, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ANCIENT GUILD', pageWidth / 2, 25, { align: 'center' });
  doc.text('RECOGNITION SYSTEMS', pageWidth / 2, 38, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Passwords, Marks & Biblical Precedents', pageWidth / 2, 55, { align: 'center' });

  yPosition = 90;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  
  const introText = 'A comprehensive study of ancient craft guild recognition methods, archaeological evidence of craftsmen marks, and their parallels to modern Greek fraternal organizations. Includes the biblical precedent of Shibboleth and evidence from Roman-era carpenter guilds.';
  const introLines = wrapText(introText, contentWidth, 12);
  introLines.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.text('Sacred Greeks Ministry', margin, yPosition);
  yPosition += 5;
  doc.text('www.sacredgreeks.com', margin, yPosition);
  
  yPosition += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(139, 69, 19);
  doc.text('Contents:', margin, yPosition);
  yPosition += 10;

  // Table of Contents
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  guildRecognitionData.forEach((section, index) => {
    doc.text(`${index + 1}. ${section.title}`, margin + 5, yPosition);
    yPosition += 5;
  });

  // Add sections
  guildRecognitionData.forEach((section, sectionIndex) => {
    doc.addPage();
    yPosition = margin;

    // Section Header
    doc.setFillColor(139, 69, 19);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    
    const headerLines = wrapText(`${sectionIndex + 1}. ${section.title}`, pageWidth - 20, 14);
    let headerY = 13;
    headerLines.forEach(line => {
      doc.text(line, pageWidth / 2, headerY, { align: 'center' });
      headerY += 6;
    });

    yPosition = 35;
    doc.setTextColor(0, 0, 0);

    // Main content
    section.content.forEach(paragraph => {
      if (paragraph === '') {
        yPosition += 5;
        return;
      }
      
      addNewPageIfNeeded(20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Check if it's a quote (starts with quote or contains Bible reference)
      if (paragraph.includes('—') && (paragraph.includes('Judges') || paragraph.includes('Matthew') || paragraph.includes('Acts'))) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
      }
      // Check if it's a bullet point
      else if (paragraph.startsWith('•')) {
        doc.setFont('helvetica', 'normal');
      }
      
      const lines = wrapText(paragraph, contentWidth - 5, 10);
      lines.forEach(line => {
        addNewPageIfNeeded(6);
        doc.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      
      doc.setTextColor(0, 0, 0);
      yPosition += 2;
    });

    // Subsections
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        addNewPageIfNeeded(30);
        yPosition += 5;
        
        // Subsection title
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(139, 69, 19);
        doc.text(subsection.title, margin, yPosition);
        yPosition += 6;
        
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        
        subsection.content.forEach(paragraph => {
          addNewPageIfNeeded(15);
          const lines = wrapText(paragraph, contentWidth - 10, 10);
          lines.forEach(line => {
            addNewPageIfNeeded(5);
            doc.text(line, margin + 10, yPosition);
            yPosition += 5;
          });
          yPosition += 2;
        });
      });
    }
  });

  // Final page
  doc.addPage();
  yPosition = pageHeight / 2 - 40;
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 69, 19);
  doc.text('Sacred Greeks Ministry', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Revealing the biblical roots of fraternal traditions.', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.setFontSize(11);
  doc.text('www.sacredgreeks.com', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('For more resources, visit our website or order "Sacred, Not Sinful"', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 25;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const closingQuote = '"They devoted themselves to the apostles\' teaching and to koinonia" — Acts 2:42';
  doc.text(closingQuote, pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 25;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });

  return doc;
};

export const downloadGuildRecognitionPDF = () => {
  const doc = generateGuildRecognitionPDF();
  doc.save('Ancient-Guild-Recognition-Systems.pdf');
};
