import jsPDF from 'jspdf';

interface StudySection {
  title: string;
  content: string[];
  scriptures?: string[];
  discussionQuestions?: string[];
}

const studySections: StudySection[] = [
  {
    title: 'Jesus the Carpenter and the World of Guilds',
    content: [
      'The Gospels identify Jesus of Nazareth as a tekton (τέκτων), commonly translated as carpenter but more accurately understood as a skilled craftsman or builder. This was not casual labor—it implied formal training, apprenticeship, discipline, and accountability.',
      'In the ancient Mediterranean world, trades were typically organized through guild-like structures. These associations regulated training, protected reputation, and ensured quality. Apprentices lived and worked under authority for years before being recognized as masters.',
      'Silence, submission, testing, and communal living were part of the process. None of this contradicts the character of Jesus. Luke tells us that Jesus "grew in wisdom and stature, and in favor with God and man" (Luke 2:52). Growth implies formation, discipline, and process.'
    ],
    scriptures: ['Luke 2:52', 'Mark 6:3', 'Hebrews 5:8'],
    discussionQuestions: [
      'How does viewing Jesus as a trained craftsman change your understanding of his early life?',
      'What parallels exist between ancient apprenticeship and modern Greek new member education?',
      'Why might submission and testing be valuable parts of formation?'
    ]
  },
  {
    title: 'Paul the Tentmaker and Associational Life',
    content: [
      'The book of Acts introduces Paul the Apostle as a tentmaker (Acts 18:3). Like carpentry, tentmaking was a skilled trade commonly associated with guilds in Greco-Roman cities. These guilds were not inherently religious—they were economic and social associations that provided identity, protection, and mutual support.',
      'Paul did not reject association. He rejected idolatry. His critiques in 1 Corinthians and Colossians were directed at the worship of false gods, not the existence of structured communities, symbols, or oaths of integrity.',
      'In fact, Paul repeatedly used guild language—such as "body," "members," and "building"—to describe the Church itself (1 Corinthians 12; Ephesians 2:19–22).'
    ],
    scriptures: ['Acts 18:3', '1 Corinthians 12:12-27', 'Ephesians 2:19-22'],
    discussionQuestions: [
      'What is the difference between rejecting idolatry and rejecting association?',
      'How did Paul use organizational language to describe the Church?',
      'Can Christians participate in structured communities without compromising faith?'
    ]
  },
  {
    title: 'What the Word "Fraternity" Actually Means',
    content: [
      'The term fraternity is not rooted in pagan worship or secret religion. It is rooted in brotherhood. The English word fraternity comes from the Latin fraternitas, derived from frater, meaning brother.',
      'Long before modern Greek-letter organizations existed, fraternitas was used in Roman and early Christian contexts to describe bonds of mutual responsibility, shared identity, and communal obligation.',
      'The concept of brotherhood is deeply embedded in Greek thought and language. The New Testament repeatedly uses adelphoi (ἀδελφοί) to describe believers bound together not by blood, but by shared commitment and covenant. Paul addresses churches as "brothers" throughout his letters.',
      'When later European universities adopted the Latin term "fraternity," they were not inventing a new concept—they were borrowing an ancient one. A fraternity, by definition, is simply a structured brotherhood.'
    ],
    scriptures: ['Romans 12:10', '1 Thessalonians 4:9', 'Hebrews 13:1', '1 Peter 2:17'],
    discussionQuestions: [
      'How does understanding the etymology of "fraternity" change common perceptions?',
      'In what ways does the New Testament describe believers as a brotherhood?',
      'What distinguishes godly brotherhood from mere social association?'
    ]
  },
  {
    title: 'Rituals, Oaths, and Symbols Are Not Automatically Worship',
    content: [
      'A common objection raised against fraternities is the presence of rituals, symbols, oaths, or secret signs. Yet these elements existed across cultures long before Greek-letter organizations.',
      'Ancient guilds used ceremonies to mark advancement, symbols tied to their craft, and pledges related to ethical practice. These were instructional and communal, not acts of worship. Pagan cults, by contrast, centered their rituals on devotion to a deity, seeking favor, protection, or salvation.',
      'Scripture consistently draws this distinction. Paul writes, "An idol has no real existence" (1 Corinthians 8:4), and later adds, "Nothing is unclean in itself, but it is unclean for anyone who thinks it unclean" (Romans 14:14). The moral issue is not the object or symbol, but the heart and belief behind it.'
    ],
    scriptures: ['1 Corinthians 8:4-6', 'Romans 14:14', 'Romans 14:5', 'Colossians 2:16-17'],
    discussionQuestions: [
      'What distinguishes a ritual from an act of worship?',
      'How should Christians evaluate symbols and ceremonies?',
      'According to Paul, what makes something "unclean"?'
    ]
  },
  {
    title: 'Belief, Conscience, and Christian Liberty',
    content: [
      'Romans 14 provides one of the clearest frameworks for understanding this issue. Paul teaches that believers may hold different convictions on disputable matters, and that each person must be "fully convinced in his own mind" (Romans 14:5).',
      'Acting against conscience is sin. Acting with a clear conscience, in faith, is not. This principle explains why Scripture never issues a blanket condemnation of associations, guilds, or brotherhoods.',
      'Instead, it warns against idolatry, coercion of conscience, and misplaced devotion. The question is not whether there are rituals or symbols—but whether the heart is devoted to Christ alone.'
    ],
    scriptures: ['Romans 14:1-23', '1 Corinthians 10:23-33', 'Galatians 5:1', 'James 4:17'],
    discussionQuestions: [
      'How does Romans 14 apply to decisions about Greek life?',
      'What does it mean to be "fully convinced in your own mind"?',
      'How can Christians navigate disagreements on secondary matters?'
    ]
  },
  {
    title: 'Brotherhood, Formation, and the Way of Christ',
    content: [
      'Jesus did not reject disciplined brotherhood. He formed one. He called twelve men to live together, learn together, submit to instruction, and undergo testing. They shared meals, private teachings, symbolic actions, and even periods of misunderstanding and correction.',
      'The difference was not structure. The difference was lordship. Modern fraternities, including Black Greek-Letter Organizations, are voluntary, non-religious associations centered on leadership, service, and community.',
      'They do not promise salvation, spiritual power, or divine favor. When stripped of assumptions and examined honestly, they bear greater resemblance to ancient guilds than to pagan cults. The biblical question, then, is not "Is there ritual or structure?" but "Who is being worshiped?"'
    ],
    scriptures: ['Matthew 10:1-4', 'Mark 3:14', 'John 13:1-17', 'Acts 2:42-47'],
    discussionQuestions: [
      'How did Jesus form his disciples into a brotherhood?',
      'What elements of Jesus\'s discipleship model appear in Greek organizations?',
      'What is the ultimate test of whether an organization is spiritually problematic?'
    ]
  }
];

const scholarlyReferences = [
  'Meeks, Wayne A. The First Urban Christians. Yale University Press.',
  'Deissmann, Adolf. Light from the Ancient East. Baker Academic.',
  'Banks, Robert. Paul\'s Idea of Community. Hendrickson Publishers.',
  'Harland, Philip A. Associations, Synagogues, and Congregations. Fortress Press.',
  'Kloppenborg, John S. Voluntary Associations in the Graeco-Roman World. Routledge.'
];

export const generateBrotherhoodStudyGuidePDF = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 0;

  const addNewPageIfNeeded = (heightNeeded: number) => {
    if (yPos + heightNeeded > pageHeight - 20) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Cover Page
  doc.setFillColor(93, 64, 55); // Deep brown
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Jesus, Paul, and the', pageWidth / 2, 70, { align: 'center' });
  doc.text('Brotherhood Question', pageWidth / 2, 85, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('What Ancient Guilds and Fraternities Really Mean', pageWidth / 2, 105, { align: 'center' });

  // Decorative line
  doc.setDrawColor(255, 215, 0);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 40, 115, pageWidth / 2 + 40, 115);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.text('A Biblical Study Guide for Group Discussion', pageWidth / 2, 130, { align: 'center' });

  // Scripture quote
  doc.setFontSize(10);
  doc.text('"Love one another with brotherly affection."', pageWidth / 2, 160, { align: 'center' });
  doc.text('— Romans 12:10', pageWidth / 2, 168, { align: 'center' });

  // Footer on cover
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('PROOF Ministries | sacredgreeks.lovable.app', pageWidth / 2, pageHeight - 30, { align: 'center' });

  // Study Sessions
  studySections.forEach((section, sectionIndex) => {
    doc.addPage();
    yPos = margin;

    // Session Header
    doc.setFillColor(139, 69, 19);
    doc.rect(0, 0, pageWidth, 25, 'F');

    doc.setTextColor(255, 215, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`SESSION ${sectionIndex + 1}`, margin, 12);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(section.title, margin, 20);

    yPos = 35;

    // Content
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    section.content.forEach((paragraph) => {
      addNewPageIfNeeded(25);
      const lines = doc.splitTextToSize(paragraph, contentWidth);
      doc.text(lines, margin, yPos);
      yPos += lines.length * 5 + 6;
    });

    // Scripture References Box
    if (section.scriptures && section.scriptures.length > 0) {
      addNewPageIfNeeded(30);
      yPos += 5;
      
      doc.setFillColor(255, 248, 230);
      const scriptureBoxHeight = 8 + (section.scriptures.length * 5);
      doc.rect(margin, yPos, contentWidth, scriptureBoxHeight, 'F');
      doc.setDrawColor(205, 133, 63);
      doc.rect(margin, yPos, contentWidth, scriptureBoxHeight, 'S');

      doc.setTextColor(139, 69, 19);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('KEY SCRIPTURES', margin + 3, yPos + 6);

      doc.setTextColor(100, 60, 20);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      section.scriptures.forEach((scripture, i) => {
        doc.text(`• ${scripture}`, margin + 5, yPos + 12 + (i * 5));
      });

      yPos += scriptureBoxHeight + 8;
    }

    // Discussion Questions
    if (section.discussionQuestions && section.discussionQuestions.length > 0) {
      addNewPageIfNeeded(50);
      
      doc.setFillColor(240, 240, 255);
      const questionBoxHeight = 12 + (section.discussionQuestions.length * 12);
      doc.rect(margin, yPos, contentWidth, questionBoxHeight, 'F');
      doc.setDrawColor(100, 100, 180);
      doc.rect(margin, yPos, contentWidth, questionBoxHeight, 'S');

      doc.setTextColor(60, 60, 120);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('DISCUSSION QUESTIONS', margin + 3, yPos + 7);

      doc.setTextColor(40, 40, 80);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      section.discussionQuestions.forEach((question, i) => {
        const qLines = doc.splitTextToSize(`${i + 1}. ${question}`, contentWidth - 10);
        doc.text(qLines, margin + 5, yPos + 14 + (i * 12));
      });

      yPos += questionBoxHeight + 8;
    }

    // Notes Section with Lines
    addNewPageIfNeeded(45);
    yPos += 5;
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL NOTES & REFLECTIONS', margin, yPos);
    yPos += 6;

    doc.setDrawColor(200, 200, 200);
    for (let i = 0; i < 5; i++) {
      doc.line(margin, yPos + (i * 8), pageWidth - margin, yPos + (i * 8));
    }
  });

  // References Page
  doc.addPage();
  yPos = margin;

  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, 25, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SCHOLARLY REFERENCES', margin, 17);

  yPos = 35;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  scholarlyReferences.forEach((ref) => {
    doc.text(`• ${ref}`, margin, yPos);
    yPos += 8;
  });

  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('KEY SCRIPTURE PASSAGES', margin, yPos);
  yPos += 8;

  doc.setFont('helvetica', 'normal');
  const keyPassages = [
    'Acts 18:3 • Luke 2:52 • Romans 14 • 1 Corinthians 8',
    'Ephesians 2:19-22 • Galatians 2:9 • Matthew 10:1-4',
    'John 13:1-17 • Acts 2:42-47 • 1 Corinthians 12:12-27'
  ];
  keyPassages.forEach((passage) => {
    doc.text(`• ${passage}`, margin, yPos);
    yPos += 6;
  });

  // Conclusion Box
  yPos += 15;
  doc.setFillColor(93, 64, 55);
  doc.rect(margin, yPos, contentWidth, 35, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY TAKEAWAY', margin + 5, yPos + 10);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const conclusion = 'Scripture condemns idolatry. It does not condemn brotherhood. The biblical question is not "Is there ritual or structure?" but "Who is being worshiped?"';
  const conclusionLines = doc.splitTextToSize(conclusion, contentWidth - 10);
  doc.text(conclusionLines, margin + 5, yPos + 18);

  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text('PROOF Ministries | sacredgreeks.lovable.app | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 10, { align: 'center' });

  doc.save('jesus-paul-brotherhood-study-guide.pdf');
};
