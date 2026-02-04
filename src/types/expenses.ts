export interface ExpenseCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  category_type: 'standard' | 'custom';
  user_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChapterExpense {
  id: string;
  user_id: string;
  submitted_by: string | null;
  category_id: string | null;
  amount: number;
  vendor_name: string | null;
  description: string | null;
  expense_date: string;
  receipt_url: string | null;
  receipt_data: ReceiptData | null;
  event_name: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  payment_method: string | null;
  is_reimbursement: boolean;
  reimbursement_paid: boolean;
  reimbursement_paid_at: string | null;
  created_at: string;
  updated_at: string;
  category?: ExpenseCategory;
}

export interface ChapterBudget {
  id: string;
  user_id: string;
  category_id: string;
  budget_amount: number;
  period_start: string;
  period_end: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  category?: ExpenseCategory;
}

export interface ReceiptData {
  vendor_name: string | null;
  amount: number | null;
  expense_date: string | null;
  items: { name: string; price: number }[];
  payment_method: string | null;
  tax_amount: number | null;
  subtotal: number | null;
  category_suggestion: string | null;
  raw_response?: string;
}

export interface ExpenseApprovalHistory {
  id: string;
  expense_id: string;
  action: string;
  action_by: string | null;
  notes: string | null;
  previous_status: string | null;
  new_status: string | null;
  created_at: string;
}

export interface BudgetSummary {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentUsed: number;
}

export interface ExpenseReport {
  period: string;
  totalExpenses: number;
  totalBudgeted: number;
  byCategory: BudgetSummary[];
  byEvent: { eventName: string; total: number; count: number }[];
  pendingApprovals: number;
  reimbursementsDue: number;
}
