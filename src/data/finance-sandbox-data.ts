// Finance Sandbox - Mock chapter data for hands-on practice

export interface MockExpense {
  id: string;
  vendor_name: string;
  amount: number;
  expense_date: string;
  category: string;
  category_color: string;
  description: string;
  event_name: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  submitted_by: string;
  payment_method: string;
  is_reimbursement: boolean;
}

export interface MockBudget {
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface MockMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface PracticeScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'receipt' | 'approval' | 'budget' | 'report';
  task: string;
  hints: string[];
  successCriteria: string[];
  mockData: {
    receipts?: MockExpense[];
    budgets?: MockBudget[];
  };
}

export const MOCK_MEMBERS: MockMember[] = [
  { id: '1', name: 'Jordan Williams', role: 'Treasurer', email: 'jordan.w@chapter.org' },
  { id: '2', name: 'Taylor Johnson', role: 'President', email: 'taylor.j@chapter.org' },
  { id: '3', name: 'Morgan Davis', role: 'Social Chair', email: 'morgan.d@chapter.org' },
  { id: '4', name: 'Casey Brown', role: 'Membership Chair', email: 'casey.b@chapter.org' },
  { id: '5', name: 'Alex Martinez', role: 'Secretary', email: 'alex.m@chapter.org' },
  { id: '6', name: 'Riley Thompson', role: 'Chaplain', email: 'riley.t@chapter.org' },
];

export const MOCK_EXPENSES: MockExpense[] = [
  {
    id: 'exp-001',
    vendor_name: 'Campus Catering',
    amount: 450.00,
    expense_date: '2024-02-15',
    category: 'Socials & Formals',
    category_color: '#FF69B4',
    description: 'Food for Spring Mixer event',
    event_name: 'Spring Mixer 2024',
    status: 'pending',
    submitted_by: 'Morgan Davis',
    payment_method: 'credit',
    is_reimbursement: false
  },
  {
    id: 'exp-002',
    vendor_name: 'Office Depot',
    amount: 87.50,
    expense_date: '2024-02-12',
    category: 'Operations & Supplies',
    category_color: '#4169E1',
    description: 'Office supplies for chapter room',
    event_name: null,
    status: 'approved',
    submitted_by: 'Alex Martinez',
    payment_method: 'debit',
    is_reimbursement: true
  },
  {
    id: 'exp-003',
    vendor_name: 'Marriott Conference Center',
    amount: 1250.00,
    expense_date: '2024-02-10',
    category: 'Travel & Conferences',
    category_color: '#228B22',
    description: 'Regional conference hotel deposit',
    event_name: 'Regional Leadership Conference',
    status: 'pending',
    submitted_by: 'Taylor Johnson',
    payment_method: 'credit',
    is_reimbursement: false
  },
  {
    id: 'exp-004',
    vendor_name: 'Local Food Bank',
    amount: 200.00,
    expense_date: '2024-02-08',
    category: 'Philanthropy & Service',
    category_color: '#9932CC',
    description: 'Donation for community service day',
    event_name: 'Community Service Day',
    status: 'approved',
    submitted_by: 'Casey Brown',
    payment_method: 'check',
    is_reimbursement: false
  },
  {
    id: 'exp-005',
    vendor_name: 'Party City',
    amount: 156.75,
    expense_date: '2024-02-05',
    category: 'Socials & Formals',
    category_color: '#FF69B4',
    description: 'Decorations for founder\'s day celebration',
    event_name: 'Founder\'s Day 2024',
    status: 'pending',
    submitted_by: 'Morgan Davis',
    payment_method: 'cash',
    is_reimbursement: true
  },
  {
    id: 'exp-006',
    vendor_name: 'National Org Headquarters',
    amount: 500.00,
    expense_date: '2024-02-01',
    category: 'Dues & National Fees',
    category_color: '#FFD700',
    description: 'Quarterly chapter dues payment',
    event_name: null,
    status: 'approved',
    submitted_by: 'Jordan Williams',
    payment_method: 'check',
    is_reimbursement: false
  },
  {
    id: 'exp-007',
    vendor_name: 'Southwest Airlines',
    amount: 380.00,
    expense_date: '2024-01-28',
    category: 'Travel & Conferences',
    category_color: '#228B22',
    description: 'Flight for president to national meeting',
    event_name: 'National Presidents Meeting',
    status: 'reimbursed',
    submitted_by: 'Taylor Johnson',
    payment_method: 'credit',
    is_reimbursement: true
  }
];

export const MOCK_BUDGETS: MockBudget[] = [
  { category: 'Socials & Formals', allocated: 2500, spent: 606.75, color: '#FF69B4' },
  { category: 'Philanthropy & Service', allocated: 1000, spent: 200, color: '#9932CC' },
  { category: 'Travel & Conferences', allocated: 3000, spent: 1630, color: '#228B22' },
  { category: 'Operations & Supplies', allocated: 500, spent: 87.50, color: '#4169E1' },
  { category: 'Dues & National Fees', allocated: 2000, spent: 500, color: '#FFD700' },
  { category: 'Recruitment', allocated: 800, spent: 0, color: '#FF6347' },
  { category: 'Scholarships', allocated: 1500, spent: 0, color: '#20B2AA' },
];

export const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    id: 'scenario-001',
    title: 'Process a Reimbursement Request',
    description: 'Morgan Davis paid out of pocket for party decorations. Process their reimbursement request.',
    difficulty: 'beginner',
    category: 'approval',
    task: 'Review the pending expense from Morgan Davis for $156.75 and approve the reimbursement.',
    hints: [
      'Check if the expense has proper documentation',
      'Verify the amount is within budget for the category',
      'Confirm the event is legitimate chapter activity'
    ],
    successCriteria: [
      'Verify receipt exists',
      'Check budget availability',
      'Approve the expense',
      'Mark for reimbursement payment'
    ],
    mockData: {
      receipts: MOCK_EXPENSES.filter(e => e.id === 'exp-005')
    }
  },
  {
    id: 'scenario-002',
    title: 'Handle a Budget Overrun Warning',
    description: 'The Socials budget is approaching its limit mid-semester. Analyze and create a plan.',
    difficulty: 'intermediate',
    category: 'budget',
    task: 'Review the Socials & Formals budget status and determine if adjustments are needed for upcoming events.',
    hints: [
      'Calculate remaining budget vs. planned events',
      'Identify if reallocation from other categories is possible',
      'Consider fundraising options'
    ],
    successCriteria: [
      'Calculate accurate remaining budget',
      'Project costs for remaining events',
      'Propose reallocation or reduction plan',
      'Document recommendation for E-Board'
    ],
    mockData: {
      budgets: MOCK_BUDGETS,
      receipts: MOCK_EXPENSES.filter(e => e.category === 'Socials & Formals')
    }
  },
  {
    id: 'scenario-003',
    title: 'Generate Monthly Financial Report',
    description: 'Prepare the February financial summary for the chapter meeting.',
    difficulty: 'beginner',
    category: 'report',
    task: 'Create a report showing all expenses, budget vs. actual, and pending items for the month.',
    hints: [
      'Include all expenses from the period',
      'Show category breakdown with percentages',
      'Highlight any pending approvals',
      'Note reimbursements owed'
    ],
    successCriteria: [
      'List all expenses for period',
      'Calculate budget utilization',
      'Identify outstanding items',
      'Format for chapter presentation'
    ],
    mockData: {
      receipts: MOCK_EXPENSES,
      budgets: MOCK_BUDGETS
    }
  },
  {
    id: 'scenario-004',
    title: 'Receipt Discrepancy Investigation',
    description: 'A submitted receipt amount doesn\'t match the expense claim. Investigate and resolve.',
    difficulty: 'advanced',
    category: 'receipt',
    task: 'The catering receipt shows $425 but the expense claim is for $450. Determine the correct amount and appropriate action.',
    hints: [
      'Contact the submitter for clarification',
      'Check if gratuity or taxes explain the difference',
      'Document your findings',
      'Apply proper adjustment procedure'
    ],
    successCriteria: [
      'Identify the discrepancy',
      'Document investigation steps',
      'Determine correct amount',
      'Process appropriate adjustment'
    ],
    mockData: {
      receipts: [{
        ...MOCK_EXPENSES[0],
        description: 'Food for Spring Mixer (receipt shows $425, gratuity $25 added at event)'
      }]
    }
  },
  {
    id: 'scenario-005',
    title: 'Process Conference Travel Package',
    description: 'Approve a multi-component travel expense for the regional conference.',
    difficulty: 'intermediate',
    category: 'approval',
    task: 'Review and approve the hotel, flight, and meal expenses for attendees traveling to the Regional Leadership Conference.',
    hints: [
      'Verify all receipts are present',
      'Check per diem compliance for meals',
      'Ensure travel was pre-approved',
      'Confirm attendees were authorized'
    ],
    successCriteria: [
      'Verify all documentation',
      'Check policy compliance',
      'Calculate total package cost',
      'Process all components together'
    ],
    mockData: {
      receipts: MOCK_EXPENSES.filter(e => e.category === 'Travel & Conferences')
    }
  },
  {
    id: 'scenario-006',
    title: 'End-of-Semester Audit Preparation',
    description: 'Prepare all records for the annual financial audit review.',
    difficulty: 'advanced',
    category: 'report',
    task: 'Compile all expense documentation, reconcile accounts, and prepare the audit summary for review.',
    hints: [
      'Ensure all expenses have receipts attached',
      'Verify bank statements match records',
      'Note any discrepancies or corrections',
      'Prepare explanations for unusual items'
    ],
    successCriteria: [
      'Complete receipt documentation (100%)',
      'Reconcile all bank transactions',
      'Prepare variance explanations',
      'Generate audit-ready summary report'
    ],
    mockData: {
      receipts: MOCK_EXPENSES,
      budgets: MOCK_BUDGETS
    }
  }
];

export const GUIDED_WORKFLOWS = [
  {
    id: 'workflow-001',
    title: 'Processing Your First Expense',
    description: 'Learn the complete process of adding an expense to the tracker',
    steps: [
      { step: 1, title: 'Upload Receipt', instruction: 'Click the scanner tab and upload your receipt image' },
      { step: 2, title: 'Review AI Results', instruction: 'Check the AI-extracted data for accuracy' },
      { step: 3, title: 'Select Category', instruction: 'Choose the appropriate budget category' },
      { step: 4, title: 'Add Event Details', instruction: 'Link to event if applicable' },
      { step: 5, title: 'Submit', instruction: 'Submit for approval if you\'re not the Treasurer' }
    ]
  },
  {
    id: 'workflow-002',
    title: 'Approving Expenses as Treasurer',
    description: 'Learn how to review and approve expense submissions',
    steps: [
      { step: 1, title: 'Review Pending', instruction: 'Go to Expense Tracker and filter for pending items' },
      { step: 2, title: 'Verify Receipt', instruction: 'Click to view the attached receipt image' },
      { step: 3, title: 'Check Budget', instruction: 'Verify the category has available funds' },
      { step: 4, title: 'Approve/Reject', instruction: 'Click Approve or Reject with reason' },
      { step: 5, title: 'Process Reimbursement', instruction: 'For reimbursements, mark as paid when completed' }
    ]
  },
  {
    id: 'workflow-003',
    title: 'Generating a Chapter Meeting Report',
    description: 'Create financial reports for chapter presentations',
    steps: [
      { step: 1, title: 'Go to Reports', instruction: 'Navigate to the Reports tab' },
      { step: 2, title: 'Select Period', instruction: 'Choose the date range for your report' },
      { step: 3, title: 'Choose Report Type', instruction: 'Select Budget Summary for meetings' },
      { step: 4, title: 'Review Data', instruction: 'Check all numbers are accurate' },
      { step: 5, title: 'Export', instruction: 'Download as PDF or print directly' }
    ]
  }
];
