// E-Board Training Course Content - Position-specific training modules

export interface TrainingModule {
  id: string;
  position: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sessionId: number; // For gamification tracking (70-89 range)
  points: number;
  sections: TrainingSection[];
  quiz: QuizQuestion[];
  resources: Resource[];
  scenarios: Scenario[];
  workflows: Workflow[];
}

export interface TrainingSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Resource {
  title: string;
  type: 'template' | 'checklist' | 'guide' | 'form';
  description: string;
  downloadable: boolean;
}

export interface Scenario {
  title: string;
  situation: string;
  challenge: string;
  bestPractice: string;
  outcome: string;
}

export interface Workflow {
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  action: string;
  tip?: string;
}

export const EBOARD_MODULES: TrainingModule[] = [
  {
    id: 'president',
    position: 'President',
    title: 'Chapter Leadership Excellence',
    description: 'Master the art of leading your chapter with vision, integrity, and servant leadership.',
    icon: 'Crown',
    color: '#FFD700',
    sessionId: 70,
    points: 30,
    sections: [
      {
        title: 'Servant Leadership Foundation',
        content: 'As chapter president, you are called to serve, not to be served. Jesus modeled this in John 13:14-15 when He washed the disciples\' feet. Your role is to elevate every member while maintaining the chapter\'s mission and values.',
        keyPoints: [
          'Lead by example in all chapter activities',
          'Prioritize the development of your executive board',
          'Maintain open communication with all stakeholders',
          'Balance national org requirements with local needs'
        ]
      },
      {
        title: 'Meeting Facilitation',
        content: 'Effective chapter meetings are the heartbeat of organizational success. Plan agendas in advance, ensure all voices are heard, and keep discussions productive and time-bounded.',
        keyPoints: [
          'Distribute agenda 48 hours before meetings',
          'Use parliamentary procedure appropriately',
          'Address conflicts privately, not publicly',
          'End with clear action items and owners'
        ]
      },
      {
        title: 'National Organization Relations',
        content: 'You are the primary liaison between your chapter and the national organization. Maintain compliance, submit reports on time, and represent your chapter with professionalism at all regional and national events.',
        keyPoints: [
          'Know your organization\'s constitution thoroughly',
          'Build relationships with regional representatives',
          'Stay current on policy changes',
          'Advocate for your chapter\'s needs constructively'
        ]
      }
    ],
    quiz: [
      {
        id: 'pres-1',
        question: 'What is the biblical model for chapter leadership?',
        options: ['Authoritative rule', 'Servant leadership', 'Democratic consensus', 'Laissez-faire management'],
        correctIndex: 1,
        explanation: 'Jesus modeled servant leadership in John 13, teaching that the greatest among us must be servants of all.'
      },
      {
        id: 'pres-2',
        question: 'When should chapter meeting agendas be distributed?',
        options: ['At the start of the meeting', '24 hours before', '48 hours before', '1 week before'],
        correctIndex: 2,
        explanation: 'Distributing agendas 48 hours in advance gives members time to prepare and submit additional items.'
      },
      {
        id: 'pres-3',
        question: 'How should conflicts between members be addressed?',
        options: ['In the general chapter meeting', 'Privately between parties', 'Through social media', 'Ignored until they resolve'],
        correctIndex: 1,
        explanation: 'Matthew 18:15 teaches us to address conflicts privately first, preserving dignity and relationships.'
      }
    ],
    resources: [
      { title: 'Meeting Agenda Template', type: 'template', description: 'Professional agenda format for chapter meetings', downloadable: true },
      { title: 'Officer Transition Checklist', type: 'checklist', description: 'Ensure smooth leadership transitions', downloadable: true },
      { title: 'Conflict Resolution Guide', type: 'guide', description: 'Biblical approach to member conflicts', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Divided Chapter',
        situation: 'Your chapter has split into two factions over a controversial decision about event programming.',
        challenge: 'Both groups are threatening to disengage if their preference isn\'t chosen.',
        bestPractice: 'Call separate listening sessions with each group, then facilitate a joint meeting focused on shared values and compromise.',
        outcome: 'By acknowledging both perspectives and finding middle ground, you unite the chapter around a modified plan everyone can support.'
      },
      {
        title: 'National Non-Compliance',
        situation: 'You discover the previous administration failed to submit required reports, putting your chapter at risk.',
        challenge: 'The deadline has passed and penalties may apply.',
        bestPractice: 'Immediately contact your regional representative, acknowledge the oversight, present a remediation plan, and implement systems to prevent future issues.',
        outcome: 'Proactive communication often results in grace periods and demonstrates responsible leadership.'
      }
    ],
    workflows: [
      {
        title: 'Monthly Chapter Meeting Preparation',
        description: 'Step-by-step process to run effective chapter meetings',
        steps: [
          { step: 1, title: 'Collect Reports', action: 'Request officer reports 5 days before meeting', tip: 'Use a shared document for real-time updates' },
          { step: 2, title: 'Draft Agenda', action: 'Compile reports into structured agenda 3 days before', tip: 'Include time estimates for each item' },
          { step: 3, title: 'Distribute', action: 'Send agenda to all members 48 hours before', tip: 'Request additional business items with deadline' },
          { step: 4, title: 'Prepare Space', action: 'Arrive early to set up room and materials', tip: 'Test AV equipment before members arrive' },
          { step: 5, title: 'Facilitate', action: 'Keep discussions on track and time-bounded', tip: 'Table lengthy items for committee follow-up' },
          { step: 6, title: 'Document', action: 'Ensure Secretary captures minutes and action items', tip: 'Review minutes before distribution' }
        ]
      }
    ]
  },
  {
    id: 'vice-president',
    position: 'Vice President',
    title: 'Chapter Operations & Support',
    description: 'Support the President and ensure operational excellence across all chapter activities.',
    icon: 'Shield',
    color: '#C0C0C0',
    sessionId: 71,
    points: 25,
    sections: [
      {
        title: 'Supporting Executive Leadership',
        content: 'Your role is to strengthen the President\'s effectiveness while preparing yourself for future leadership. Be ready to step in at any moment while developing your own leadership voice.',
        keyPoints: [
          'Maintain regular check-ins with the President',
          'Shadow decision-making processes',
          'Build independent relationships with committee chairs',
          'Document institutional knowledge'
        ]
      },
      {
        title: 'Committee Oversight',
        content: 'As VP, you typically oversee standing committees. Ensure chairs are empowered, meetings are productive, and committees align with chapter goals.',
        keyPoints: [
          'Meet monthly with each committee chair',
          'Help resolve inter-committee conflicts',
          'Track committee progress against goals',
          'Report committee status at E-Board meetings'
        ]
      },
      {
        title: 'Event Coordination',
        content: 'You may lead major event planning efforts. Coordinate logistics, delegate effectively, and ensure events reflect chapter values.',
        keyPoints: [
          'Create detailed event timelines',
          'Establish clear budget parameters early',
          'Conduct post-event debriefs',
          'Document lessons learned for future events'
        ]
      }
    ],
    quiz: [
      {
        id: 'vp-1',
        question: 'What is the VP\'s primary relationship with committee chairs?',
        options: ['Micromanaging their work', 'Empowering and supporting them', 'Ignoring them unless problems arise', 'Competing with them'],
        correctIndex: 1,
        explanation: 'Effective VPs empower committee chairs to succeed while providing guidance and removing obstacles.'
      },
      {
        id: 'vp-2',
        question: 'How often should you meet with each committee chair?',
        options: ['Weekly', 'Monthly', 'Quarterly', 'Only when issues arise'],
        correctIndex: 1,
        explanation: 'Monthly check-ins maintain connection without micromanaging, allowing issues to surface early.'
      }
    ],
    resources: [
      { title: 'Committee Chair Guide', type: 'guide', description: 'How to support and empower committee leaders', downloadable: true },
      { title: 'Event Planning Template', type: 'template', description: 'Comprehensive event coordination checklist', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Absent President',
        situation: 'Your President is dealing with a family emergency and will be unavailable for 3 weeks during a critical planning period.',
        challenge: 'Major decisions need to be made and the chapter is looking for leadership.',
        bestPractice: 'Step up confidently while keeping the President informed. Make necessary decisions within your authority and defer major policy changes until their return.',
        outcome: 'The chapter continues to function smoothly, and your leadership readiness is demonstrated.'
      }
    ],
    workflows: [
      {
        title: 'Committee Performance Review',
        description: 'Quarterly assessment of committee effectiveness',
        steps: [
          { step: 1, title: 'Schedule Reviews', action: 'Set quarterly meetings with each chair', tip: 'Same time each quarter builds routine' },
          { step: 2, title: 'Review Goals', action: 'Assess progress against annual committee goals', tip: 'Celebrate wins before addressing gaps' },
          { step: 3, title: 'Identify Barriers', action: 'Ask what\'s preventing success', tip: 'Listen more than you speak' },
          { step: 4, title: 'Plan Support', action: 'Determine how you can help remove obstacles', tip: 'Follow through on commitments' },
          { step: 5, title: 'Report to E-Board', action: 'Summarize committee health at next E-Board meeting', tip: 'Focus on trends, not just status' }
        ]
      }
    ]
  },
  {
    id: 'treasurer',
    position: 'Treasurer',
    title: 'Financial Stewardship & Accountability',
    description: 'Manage chapter finances with integrity, transparency, and biblical stewardship principles.',
    icon: 'DollarSign',
    color: '#228B22',
    sessionId: 72,
    points: 35,
    sections: [
      {
        title: 'Biblical Financial Stewardship',
        content: 'As Treasurer, you are entrusted with the chapter\'s financial resources. Luke 16:10-12 reminds us that faithfulness in small things qualifies us for greater responsibilities. Every dollar must be accounted for with integrity.',
        keyPoints: [
          'Maintain accurate, real-time financial records',
          'Never commingle personal and chapter funds',
          'Establish and follow approval workflows',
          'Report finances transparently at every meeting'
        ]
      },
      {
        title: 'Budget Development & Management',
        content: 'Create annual budgets that align with chapter goals, monitor spending against allocations, and adjust as needed throughout the year.',
        keyPoints: [
          'Involve stakeholders in budget planning',
          'Build contingency funds for emergencies',
          'Track actual vs. budgeted spending monthly',
          'Present variance reports to the E-Board'
        ]
      },
      {
        title: 'Dues Collection & Member Accounts',
        content: 'Implement fair, consistent dues collection while showing grace to members facing financial hardship. Document all payment plans and maintain confidentiality.',
        keyPoints: [
          'Send dues notices well in advance',
          'Offer multiple payment options',
          'Create confidential hardship policies',
          'Document all financial agreements'
        ]
      },
      {
        title: 'Audit Preparation & Compliance',
        content: 'Maintain records that can withstand internal and external audits. Proper documentation protects you, the chapter, and demonstrates professionalism to national organizations.',
        keyPoints: [
          'Keep receipts for all expenditures',
          'Reconcile accounts monthly',
          'Maintain backup documentation',
          'Prepare for annual audits proactively'
        ]
      }
    ],
    quiz: [
      {
        id: 'treas-1',
        question: 'What does Luke 16:10-12 teach about financial stewardship?',
        options: ['Money is evil', 'Faithfulness in small things qualifies us for greater responsibility', 'Only large donations matter', 'Financial records are optional'],
        correctIndex: 1,
        explanation: 'This passage teaches that how we handle small responsibilities determines our readiness for greater ones.'
      },
      {
        id: 'treas-2',
        question: 'How often should accounts be reconciled?',
        options: ['Annually', 'Quarterly', 'Monthly', 'Only when audited'],
        correctIndex: 2,
        explanation: 'Monthly reconciliation catches errors early and maintains accurate financial records.'
      },
      {
        id: 'treas-3',
        question: 'What should you do when a member cannot pay dues?',
        options: ['Immediately suspend them', 'Create a confidential payment plan', 'Announce it at chapter meeting', 'Ignore the situation'],
        correctIndex: 1,
        explanation: 'Confidential payment plans show grace while maintaining fiscal responsibility.'
      }
    ],
    resources: [
      { title: 'Annual Budget Template', type: 'template', description: 'Comprehensive chapter budget planning spreadsheet', downloadable: true },
      { title: 'Expense Approval Form', type: 'form', description: 'Standard form for requesting expense approval', downloadable: true },
      { title: 'Audit Preparation Checklist', type: 'checklist', description: 'Everything needed for audit readiness', downloadable: true },
      { title: 'Payment Plan Agreement', type: 'form', description: 'Confidential dues payment arrangement template', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Missing Receipts',
        situation: 'A committee chair submitted $500 in expenses but lost the original receipts.',
        challenge: 'You need to reimburse them but lack proper documentation.',
        bestPractice: 'Request bank/credit card statements, detailed written descriptions of each expense, and create an exception report. Implement a policy requiring photos of receipts at point of purchase.',
        outcome: 'The reimbursement proceeds with alternative documentation, and new procedures prevent future issues.'
      },
      {
        title: 'Budget Overrun Alert',
        situation: 'Halfway through the year, the social committee has spent 80% of their annual budget.',
        challenge: 'Major events are still planned but funds are running low.',
        bestPractice: 'Meet with the social chair immediately. Review remaining commitments, identify potential cost reductions, and present options to E-Board: scale back future events, reallocate funds from other areas, or fundraise.',
        outcome: 'Proactive management prevents a crisis and teaches budget awareness.'
      }
    ],
    workflows: [
      {
        title: 'Monthly Financial Close',
        description: 'End-of-month financial reconciliation process',
        steps: [
          { step: 1, title: 'Collect Statements', action: 'Download bank and payment processor statements', tip: 'Do this on the 1st of each month' },
          { step: 2, title: 'Reconcile Transactions', action: 'Match all transactions to receipts and approvals', tip: 'Flag any unmatched items immediately' },
          { step: 3, title: 'Categorize Expenses', action: 'Assign each expense to budget categories', tip: 'Use consistent category names' },
          { step: 4, title: 'Calculate Variances', action: 'Compare actual vs. budget for each category', tip: 'Investigate variances over 10%' },
          { step: 5, title: 'Prepare Report', action: 'Generate monthly financial summary', tip: 'Include charts for visual clarity' },
          { step: 6, title: 'Present to E-Board', action: 'Review report at next E-Board meeting', tip: 'Highlight concerns and recommendations' }
        ]
      }
    ]
  },
  {
    id: 'secretary',
    position: 'Secretary',
    title: 'Records & Communications Excellence',
    description: 'Maintain accurate records and facilitate effective chapter communications.',
    icon: 'FileText',
    color: '#4169E1',
    sessionId: 73,
    points: 25,
    sections: [
      {
        title: 'Meeting Minutes & Documentation',
        content: 'Accurate meeting minutes preserve institutional memory and provide legal protection. Document discussions, decisions, and action items with precision and objectivity.',
        keyPoints: [
          'Record attendance at every meeting',
          'Capture motions, seconds, and vote counts',
          'Document action items with owners and deadlines',
          'Distribute minutes within 48 hours'
        ]
      },
      {
        title: 'Roster & Member Records',
        content: 'Maintain accurate member rosters including contact information, initiation dates, and status. This data supports national reporting and chapter communication.',
        keyPoints: [
          'Update roster at least quarterly',
          'Verify contact information annually',
          'Track member status changes promptly',
          'Maintain data privacy and security'
        ]
      },
      {
        title: 'Chapter Communications',
        content: 'You are the hub of chapter communications. Ensure messages are clear, timely, and reach all intended recipients through appropriate channels.',
        keyPoints: [
          'Establish consistent communication cadence',
          'Use multiple channels for important announcements',
          'Confirm receipt of critical information',
          'Archive all official communications'
        ]
      }
    ],
    quiz: [
      {
        id: 'sec-1',
        question: 'When should meeting minutes be distributed?',
        options: ['Within 1 week', 'Within 48 hours', 'At the next meeting', 'Only if requested'],
        correctIndex: 1,
        explanation: 'Quick distribution keeps information fresh and allows prompt correction of any errors.'
      },
      {
        id: 'sec-2',
        question: 'What must be recorded for every motion?',
        options: ['Just the outcome', 'The person who made it and the outcome', 'Motion, second, discussion summary, and vote count', 'Nothing, just general discussion'],
        correctIndex: 2,
        explanation: 'Complete motion records provide legal protection and historical documentation.'
      }
    ],
    resources: [
      { title: 'Meeting Minutes Template', type: 'template', description: 'Professional format for recording chapter meetings', downloadable: true },
      { title: 'Roster Management Guide', type: 'guide', description: 'Best practices for maintaining member records', downloadable: true },
      { title: 'Communication Calendar Template', type: 'template', description: 'Plan your chapter communications schedule', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Disputed Decision',
        situation: 'A member claims a vote outcome was different from what you recorded.',
        challenge: 'They want the decision reversed based on their recollection.',
        bestPractice: 'Refer to your minutes which include the motion, second, vote count, and any discussion. If there\'s genuine ambiguity, the matter can be revisited at the next meeting.',
        outcome: 'Accurate minutes resolve disputes and demonstrate why thorough documentation matters.'
      }
    ],
    workflows: [
      {
        title: 'Chapter Meeting Minutes Process',
        description: 'Complete workflow for meeting documentation',
        steps: [
          { step: 1, title: 'Prepare Template', action: 'Set up minutes template before meeting', tip: 'Include standing agenda items' },
          { step: 2, title: 'Record Attendance', action: 'Document who is present, absent, excused', tip: 'Use sign-in sheet as backup' },
          { step: 3, title: 'Capture Discussion', action: 'Note key points of discussion, not verbatim', tip: 'Focus on decisions and rationale' },
          { step: 4, title: 'Document Motions', action: 'Record maker, second, vote outcome', tip: 'Get names spelled correctly' },
          { step: 5, title: 'List Action Items', action: 'Capture all commitments with owners', tip: 'Verify understanding before moving on' },
          { step: 6, title: 'Review & Send', action: 'Proofread and distribute within 48 hours', tip: 'Request corrections by specific deadline' }
        ]
      }
    ]
  },
  {
    id: 'chaplain',
    position: 'Chaplain',
    title: 'Spiritual Leadership & Member Care',
    description: 'Guide the spiritual life of the chapter and provide pastoral care to members.',
    icon: 'Heart',
    color: '#9932CC',
    sessionId: 74,
    points: 30,
    sections: [
      {
        title: 'Spiritual Foundation',
        content: 'As Chaplain, you are the spiritual anchor of your chapter. Your role is to integrate faith into chapter life while respecting diverse spiritual backgrounds and expressions.',
        keyPoints: [
          'Model spiritual disciplines personally',
          'Open and close meetings with appropriate prayer',
          'Connect chapter values to spiritual principles',
          'Create space for spiritual growth'
        ]
      },
      {
        title: 'Ritual & Ceremony',
        content: 'Rituals carry deep meaning in Greek life. Understand the theological implications of your organization\'s traditions and help members engage meaningfully with ceremonies.',
        keyPoints: [
          'Study your organization\'s ritual history',
          'Prepare members for ceremonies spiritually',
          'Create reverent ceremony environments',
          'Help members process ritual experiences'
        ]
      },
      {
        title: 'Member Care & Crisis Support',
        content: 'You may be the first to know when a member is struggling. Provide pastoral care while knowing your limits and connecting members to professional resources when needed.',
        keyPoints: [
          'Maintain confidentiality in pastoral conversations',
          'Know campus mental health resources',
          'Follow up consistently with struggling members',
          'Partner with campus ministry for support'
        ]
      }
    ],
    quiz: [
      {
        id: 'chap-1',
        question: 'What is the Chaplain\'s primary role?',
        options: ['Preaching at every meeting', 'Integrating faith into chapter life', 'Converting all members', 'Only leading prayers'],
        correctIndex: 1,
        explanation: 'The Chaplain weaves spiritual principles into the fabric of chapter operations and culture.'
      },
      {
        id: 'chap-2',
        question: 'When a member shares they\'re having suicidal thoughts, what should you do?',
        options: ['Pray with them and that\'s enough', 'Keep it confidential no matter what', 'Connect them to professional resources immediately', 'Tell the whole chapter so they can support'],
        correctIndex: 2,
        explanation: 'Crisis situations require professional intervention. Connect to campus counseling or crisis services immediately.'
      }
    ],
    resources: [
      { title: 'Prayer & Meditation Guide', type: 'guide', description: 'Resources for leading chapter devotions', downloadable: true },
      { title: 'Crisis Response Protocol', type: 'guide', description: 'Steps for supporting members in crisis', downloadable: true },
      { title: 'Ritual Preparation Checklist', type: 'checklist', description: 'Ensuring meaningful ceremony experiences', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Grieving Member',
        situation: 'A member just lost their grandmother and is struggling to cope while also managing chapter responsibilities.',
        challenge: 'They don\'t want to burden others but clearly need support.',
        bestPractice: 'Reach out personally, offer to help coordinate their chapter duties, connect them with campus grief counseling, and organize meals or care packages from the chapter.',
        outcome: 'The member feels supported and the chapter demonstrates authentic brotherhood/sisterhood.'
      }
    ],
    workflows: [
      {
        title: 'New Member Spiritual Onboarding',
        description: 'Introducing new members to chapter spiritual life',
        steps: [
          { step: 1, title: 'Welcome Meeting', action: 'Meet individually with each new member', tip: 'Learn their spiritual background' },
          { step: 2, title: 'Share Resources', action: 'Provide devotional materials and campus ministry info', tip: 'Don\'t overwhelm with too much' },
          { step: 3, title: 'Explain Traditions', action: 'Walk through ritual meanings and expectations', tip: 'Address concerns openly' },
          { step: 4, title: 'Assign Big/Little', action: 'Ensure spiritual mentorship in pairings', tip: 'Consider compatibility' },
          { step: 5, title: 'Follow Up', action: 'Check in after first month', tip: 'Ask about their experience' }
        ]
      }
    ]
  },
  {
    id: 'membership',
    position: 'Membership Chair',
    title: 'Recruitment & Retention Excellence',
    description: 'Lead recruitment efforts and ensure member engagement and retention.',
    icon: 'Users',
    color: '#FF6347',
    sessionId: 75,
    points: 30,
    sections: [
      {
        title: 'Values-Based Recruitment',
        content: 'Recruitment is about finding individuals who align with chapter values, not just filling numbers. Quality over quantity builds lasting chapters.',
        keyPoints: [
          'Define clear membership criteria aligned with values',
          'Train all members on recruitment messaging',
          'Create welcoming, authentic recruitment events',
          'Screen for character, not just credentials'
        ]
      },
      {
        title: 'MIP Compliance & Safety',
        content: 'Member Intake Process must follow all national and campus policies. Hazing has no place in our tradition. Create positive, meaningful experiences that build brotherhood/sisterhood.',
        keyPoints: [
          'Know national MIP requirements thoroughly',
          'Train all members on anti-hazing policies',
          'Report and address any hazing concerns immediately',
          'Create positive new member experiences'
        ]
      },
      {
        title: 'Member Retention',
        content: 'Getting members is only half the job. Keeping them engaged requires ongoing attention to their experience, growth, and connection to chapter purpose.',
        keyPoints: [
          'Conduct regular member satisfaction surveys',
          'Create meaningful involvement opportunities',
          'Address disengagement early',
          'Celebrate member achievements'
        ]
      }
    ],
    quiz: [
      {
        id: 'mem-1',
        question: 'What should drive recruitment decisions?',
        options: ['GPA requirements only', 'Values alignment and character', 'Social media following', 'Athletic ability'],
        correctIndex: 1,
        explanation: 'Values-based recruitment builds chapters with shared purpose and lasting commitment.'
      },
      {
        id: 'mem-2',
        question: 'What is the ONLY appropriate response to hazing concerns?',
        options: ['Ignore if it\'s minor', 'Handle it internally', 'Report immediately and stop the activity', 'Wait to see if it continues'],
        correctIndex: 2,
        explanation: 'All hazing must be reported and stopped immediately. There is no acceptable level of hazing.'
      }
    ],
    resources: [
      { title: 'Recruitment Event Planning Guide', type: 'guide', description: 'Creating effective recruitment programs', downloadable: true },
      { title: 'Anti-Hazing Policy Reference', type: 'guide', description: 'Understanding and preventing hazing', downloadable: true },
      { title: 'Member Satisfaction Survey', type: 'template', description: 'Assess and improve member experience', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Hazing Rumor',
        situation: 'You hear a rumor that a member is subjecting new members to unauthorized activities.',
        challenge: 'It\'s just a rumor, and addressing it could create conflict.',
        bestPractice: 'Take all concerns seriously. Investigate immediately, document what you learn, report to appropriate leadership, and remind all members of policies. If confirmed, follow reporting requirements.',
        outcome: 'Swift action protects new members and demonstrates zero tolerance for misconduct.'
      }
    ],
    workflows: [
      {
        title: 'Recruitment Season Planning',
        description: 'Comprehensive approach to successful recruitment',
        steps: [
          { step: 1, title: 'Set Goals', action: 'Determine recruitment targets with E-Board', tip: 'Quality over quantity' },
          { step: 2, title: 'Train Chapter', action: 'Conduct recruitment training for all members', tip: 'Everyone is a recruiter' },
          { step: 3, title: 'Plan Events', action: 'Create diverse recruitment event schedule', tip: 'Include both social and service events' },
          { step: 4, title: 'Execute Events', action: 'Host events with intentional hospitality', tip: 'Collect contact info systematically' },
          { step: 5, title: 'Follow Up', action: 'Personal outreach to all interested candidates', tip: 'Respond within 24 hours' },
          { step: 6, title: 'Select', action: 'Values-based selection process', tip: 'Use consistent criteria' }
        ]
      }
    ]
  },
  {
    id: 'social',
    position: 'Social Chair',
    title: 'Event Programming & Brotherhood/Sisterhood',
    description: 'Create meaningful social experiences that build authentic relationships.',
    icon: 'PartyPopper',
    color: '#FF69B4',
    sessionId: 76,
    points: 25,
    sections: [
      {
        title: 'Purposeful Programming',
        content: 'Every event should serve a purpose beyond entertainment. Build brotherhood/sisterhood, develop skills, serve community, or celebrate achievements. Ask "why" before planning "what."',
        keyPoints: [
          'Align events with chapter goals',
          'Balance social with service and development',
          'Create inclusive programming for all members',
          'Evaluate events against purpose, not just attendance'
        ]
      },
      {
        title: 'Risk Management & Safety',
        content: 'Social events carry inherent risks. Plan proactively for safety, follow campus and national policies, and never compromise member well-being for entertainment.',
        keyPoints: [
          'Complete risk management training',
          'Follow all alcohol and event policies',
          'Have emergency plans for every event',
          'Never pressure attendance at any event'
        ]
      },
      {
        title: 'Budget & Logistics',
        content: 'Great events require great planning. Work closely with the Treasurer on budgets, document all expenses, and create systems for efficient event execution.',
        keyPoints: [
          'Create detailed event budgets upfront',
          'Track all expenses with receipts',
          'Coordinate logistics well in advance',
          'Debrief after events for improvement'
        ]
      }
    ],
    quiz: [
      {
        id: 'soc-1',
        question: 'What question should you ask before planning any event?',
        options: ['How much will it cost?', 'Who will attend?', 'Why are we doing this?', 'Where will it be?'],
        correctIndex: 2,
        explanation: 'Purpose drives programming. Know why before deciding what, where, and how.'
      },
      {
        id: 'soc-2',
        question: 'What is the relationship between Social Chair and Treasurer?',
        options: ['Independent - no coordination needed', 'Collaborative - work together on event budgets', 'Adversarial - competing for resources', 'Treasurer approves all social decisions'],
        correctIndex: 1,
        explanation: 'Close collaboration ensures events are both impactful and financially responsible.'
      }
    ],
    resources: [
      { title: 'Event Planning Checklist', type: 'checklist', description: 'Complete event execution guide', downloadable: true },
      { title: 'Risk Management Assessment', type: 'form', description: 'Event safety planning form', downloadable: true },
      { title: 'Event Budget Template', type: 'template', description: 'Track event costs effectively', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Last-Minute Venue Cancel',
        situation: 'Your venue cancels 48 hours before a major event.',
        challenge: 'Members have already planned around this event and expectations are high.',
        bestPractice: 'Immediately contact backup venues, communicate transparently with members about the situation, pivot to an alternative plan, and document the experience to prevent future issues.',
        outcome: 'Crisis management skills shine, and the event still happens even if modified.'
      }
    ],
    workflows: [
      {
        title: 'Major Event Execution',
        description: 'From concept to completion for signature events',
        steps: [
          { step: 1, title: 'Concept', action: 'Define purpose and vision for event', tip: 'Get E-Board alignment early' },
          { step: 2, title: 'Budget', action: 'Create detailed budget with Treasurer', tip: 'Include contingency funds' },
          { step: 3, title: 'Logistics', action: 'Secure venue, vendors, supplies', tip: 'Get contracts in writing' },
          { step: 4, title: 'Promotion', action: 'Market event to target audience', tip: 'Start 2-3 weeks early' },
          { step: 5, title: 'Execute', action: 'Run event according to plan', tip: 'Have backup plans ready' },
          { step: 6, title: 'Debrief', action: 'Evaluate success and document learnings', tip: 'Celebrate wins, learn from gaps' }
        ]
      }
    ]
  },
  {
    id: 'historian',
    position: 'Historian',
    title: 'Legacy Preservation & Storytelling',
    description: 'Document chapter history and preserve the legacy for future generations.',
    icon: 'Camera',
    color: '#8B4513',
    sessionId: 77,
    points: 20,
    sections: [
      {
        title: 'Documentation & Archives',
        content: 'Every chapter is part of a larger story. Your role is to capture and preserve moments, achievements, and memories for future generations.',
        keyPoints: [
          'Photograph all chapter events',
          'Maintain organized digital archives',
          'Collect member testimonials and stories',
          'Preserve historical documents safely'
        ]
      },
      {
        title: 'Social Media & Branding',
        content: 'You may manage chapter social media presence. Represent the chapter professionally while engaging authentically with your audience.',
        keyPoints: [
          'Maintain consistent brand standards',
          'Post regularly with quality content',
          'Respond appropriately to engagement',
          'Protect member privacy in posts'
        ]
      },
      {
        title: 'Milestone Celebrations',
        content: 'Help the chapter celebrate anniversaries, achievements, and member milestones. These moments strengthen identity and belonging.',
        keyPoints: [
          'Track chapter anniversary dates',
          'Coordinate founder\'s day celebrations',
          'Document member achievements',
          'Create yearbooks or memory books'
        ]
      }
    ],
    quiz: [
      {
        id: 'hist-1',
        question: 'What is the Historian\'s primary responsibility?',
        options: ['Social media only', 'Preserving chapter legacy', 'Party photography', 'Writing chapter history books'],
        correctIndex: 1,
        explanation: 'Historians capture and preserve the chapter story for future generations.'
      }
    ],
    resources: [
      { title: 'Photo Archive Guidelines', type: 'guide', description: 'Organizing and storing chapter photos', downloadable: true },
      { title: 'Social Media Content Calendar', type: 'template', description: 'Plan your chapter\'s social presence', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Missing History',
        situation: 'You discover the chapter has no records from 5 years ago due to poor transitions.',
        challenge: 'Important history and context are missing.',
        bestPractice: 'Reach out to alumni from that period, conduct oral history interviews, gather any photos or documents they saved, and establish systems to prevent future gaps.',
        outcome: 'Lost history is partially recovered and future documentation is secured.'
      }
    ],
    workflows: [
      {
        title: 'Event Documentation',
        description: 'Capturing chapter events for posterity',
        steps: [
          { step: 1, title: 'Prepare', action: 'Charge equipment, clear storage', tip: 'Bring backup battery' },
          { step: 2, title: 'Capture', action: 'Take variety of shots - candid and posed', tip: 'Get group photos early' },
          { step: 3, title: 'Curate', action: 'Select best photos from each event', tip: 'Quality over quantity' },
          { step: 4, title: 'Archive', action: 'Upload to chapter archive with tags', tip: 'Include date, event, people' },
          { step: 5, title: 'Share', action: 'Post approved content to social media', tip: 'Get consent for tagged photos' }
        ]
      }
    ]
  },
  {
    id: 'sergeant',
    position: 'Sergeant-at-Arms',
    title: 'Meeting Order & Member Accountability',
    description: 'Maintain order at meetings and support member accountability.',
    icon: 'Gavel',
    color: '#2F4F4F',
    sessionId: 78,
    points: 20,
    sections: [
      {
        title: 'Meeting Order & Protocol',
        content: 'You ensure meetings run smoothly by managing the physical environment, controlling access, and supporting the presiding officer in maintaining order.',
        keyPoints: [
          'Arrive early to prepare meeting space',
          'Manage attendance and late arrivals',
          'Support order during discussions',
          'Handle disruptions professionally'
        ]
      },
      {
        title: 'Member Accountability',
        content: 'You may track attendance, fines, or other accountability measures. Apply policies fairly and consistently while showing grace when appropriate.',
        keyPoints: [
          'Maintain accurate attendance records',
          'Apply policies consistently to all members',
          'Handle appeals fairly',
          'Partner with Treasurer on financial matters'
        ]
      },
      {
        title: 'Event Security',
        content: 'At events, you ensure safety through crowd management, access control, and emergency preparedness.',
        keyPoints: [
          'Know event capacity limits',
          'Control access points at events',
          'Have emergency response plans ready',
          'Coordinate with venue security when needed'
        ]
      }
    ],
    quiz: [
      {
        id: 'sgt-1',
        question: 'How should attendance policies be applied?',
        options: ['Strictly for some, loosely for others', 'Consistently and fairly to all members', 'Only when convenient', 'Never - attendance is optional'],
        correctIndex: 1,
        explanation: 'Fair and consistent application builds trust and respect for chapter policies.'
      }
    ],
    resources: [
      { title: 'Attendance Tracking Template', type: 'template', description: 'Track and report member attendance', downloadable: true },
      { title: 'Event Security Checklist', type: 'checklist', description: 'Safety protocols for chapter events', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Repeat Offender',
        situation: 'A popular member consistently misses meetings but their friends want them excused.',
        challenge: 'Applying policy may create social tension.',
        bestPractice: 'Apply the policy fairly regardless of popularity. Have a private conversation with the member to understand barriers and find solutions, but maintain accountability.',
        outcome: 'Consistent enforcement demonstrates that rules apply equally to everyone.'
      }
    ],
    workflows: [
      {
        title: 'Chapter Meeting Setup',
        description: 'Preparing for successful chapter meetings',
        steps: [
          { step: 1, title: 'Arrive Early', action: 'Get to venue 30 minutes before', tip: 'Check room reservation' },
          { step: 2, title: 'Setup Space', action: 'Arrange seating, AV, materials', tip: 'Consider accessibility' },
          { step: 3, title: 'Prepare Attendance', action: 'Have sign-in sheet ready', tip: 'Include time for late arrivals' },
          { step: 4, title: 'Greet Members', action: 'Welcome arriving members', tip: 'Note attendance as they enter' },
          { step: 5, title: 'Support Meeting', action: 'Manage disruptions, late arrivals', tip: 'Minimize interruptions' },
          { step: 6, title: 'Close Out', action: 'Ensure room is restored, report attendance', tip: 'Thank members for attendance' }
        ]
      }
    ]
  },
  {
    id: 'parliamentarian',
    position: 'Parliamentarian',
    title: 'Constitutional Governance & Procedure',
    description: 'Ensure proper parliamentary procedure and constitutional compliance.',
    icon: 'Scale',
    color: '#483D8B',
    sessionId: 79,
    points: 25,
    sections: [
      {
        title: 'Parliamentary Procedure',
        content: 'Robert\'s Rules of Order governs most chapter meetings. Understand how motions work, when procedure matters, and how to facilitate fair discussion.',
        keyPoints: [
          'Know Robert\'s Rules fundamentals',
          'Advise on proper motion procedures',
          'Help manage complex discussions',
          'Train members on meeting participation'
        ]
      },
      {
        title: 'Constitutional Knowledge',
        content: 'Know your chapter bylaws and national constitution thoroughly. You are the go-to resource for questions about rules and policies.',
        keyPoints: [
          'Read and understand all governing documents',
          'Track amendments and policy changes',
          'Advise on constitutional questions',
          'Lead bylaw review and revision processes'
        ]
      },
      {
        title: 'Judicial Functions',
        content: 'You may participate in judicial processes for member conduct. Ensure fairness, due process, and appropriate procedures in all disciplinary matters.',
        keyPoints: [
          'Know disciplinary procedures thoroughly',
          'Ensure accused members receive due process',
          'Maintain confidentiality in judicial matters',
          'Document proceedings accurately'
        ]
      }
    ],
    quiz: [
      {
        id: 'parl-1',
        question: 'What governs most chapter meetings?',
        options: ['Common sense', 'Robert\'s Rules of Order', 'Majority rule only', 'President\'s preference'],
        correctIndex: 1,
        explanation: 'Robert\'s Rules provides the standard framework for conducting meetings fairly.'
      },
      {
        id: 'parl-2',
        question: 'What is "due process" in disciplinary matters?',
        options: ['Immediate punishment', 'Fair procedures that protect member rights', 'Majority vote to punish', 'President\'s decision'],
        correctIndex: 1,
        explanation: 'Due process ensures fairness through proper notice, hearing, and appeal rights.'
      }
    ],
    resources: [
      { title: 'Robert\'s Rules Quick Reference', type: 'guide', description: 'Essential parliamentary procedures', downloadable: true },
      { title: 'Bylaw Amendment Process', type: 'guide', description: 'How to properly modify chapter bylaws', downloadable: true },
      { title: 'Judicial Process Guide', type: 'guide', description: 'Fair procedures for conduct matters', downloadable: true }
    ],
    scenarios: [
      {
        title: 'The Improper Motion',
        situation: 'A member makes a motion that conflicts with chapter bylaws.',
        challenge: 'The motion has support and people want to vote.',
        bestPractice: 'Politely point out the conflict, explain why the motion cannot proceed as stated, and suggest how it might be modified to comply with bylaws.',
        outcome: 'Proper procedure is followed and members learn about governance.'
      }
    ],
    workflows: [
      {
        title: 'Bylaw Amendment Process',
        description: 'Proper procedure for changing chapter bylaws',
        steps: [
          { step: 1, title: 'Propose', action: 'Amendment proposed in writing', tip: 'Include exact language change' },
          { step: 2, title: 'Review', action: 'Check for conflicts with national policies', tip: 'Consult regional advisor if needed' },
          { step: 3, title: 'Notice', action: 'Notify members per bylaw requirements', tip: 'Usually 1-2 weeks advance notice' },
          { step: 4, title: 'Discuss', action: 'Present and debate at chapter meeting', tip: 'Allow full discussion' },
          { step: 5, title: 'Vote', action: 'Take vote per required threshold', tip: 'Usually 2/3 majority needed' },
          { step: 6, title: 'Record', action: 'Update bylaws and distribute', tip: 'Note effective date' }
        ]
      }
    ]
  }
];

export const getModuleByPosition = (position: string): TrainingModule | undefined => {
  return EBOARD_MODULES.find(m => m.id === position.toLowerCase().replace(/[\s-]/g, ''));
};

export const getTotalEBoardPoints = (): number => {
  return EBOARD_MODULES.reduce((sum, m) => sum + m.points, 0);
};
