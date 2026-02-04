import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { 
  ExpenseCategory, 
  ChapterExpense, 
  ChapterBudget, 
  ReceiptData,
  BudgetSummary,
  ExpenseReport
} from '@/types/expenses';

type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'reimbursed';

export function useExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<ChapterExpense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [budgets, setBudgets] = useState<ChapterBudget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('expense_categories')
        .select('*')
        .eq('is_active', true)
        .order('category_type', { ascending: false })
        .order('name');
      
      if (error) throw error;
      setCategories((data || []).map(cat => ({
        ...cat,
        category_type: cat.category_type as 'standard' | 'custom'
      })) as ExpenseCategory[]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chapter_expenses')
        .select(`
          *,
          category:expense_categories(*)
        `)
        .eq('user_id', user.id)
        .order('expense_date', { ascending: false });
      
      if (error) throw error;
      
      const mappedExpenses = (data || []).map(exp => ({
        ...exp,
        status: exp.status as ExpenseStatus,
        receipt_data: exp.receipt_data as unknown as ReceiptData | null,
        category: exp.category ? {
          ...exp.category,
          category_type: exp.category.category_type as 'standard' | 'custom'
        } : undefined
      })) as ChapterExpense[];
      
      setExpenses(mappedExpenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses');
    }
  };

  // Fetch budgets
  const fetchBudgets = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chapter_budgets')
        .select(`
          *,
          category:expense_categories(*)
        `)
        .eq('user_id', user.id)
        .order('period_start', { ascending: false });
      
      if (error) throw error;
      
      const mappedBudgets = (data || []).map(b => ({
        ...b,
        category: b.category ? {
          ...b.category,
          category_type: b.category.category_type as 'standard' | 'custom'
        } : undefined
      })) as ChapterBudget[];
      
      setBudgets(mappedBudgets);
    } catch (err) {
      console.error('Error fetching budgets:', err);
      setError('Failed to load budgets');
    }
  };

  // Add expense
  const addExpense = async (expense: {
    category_id: string;
    amount: number;
    vendor_name?: string | null;
    description?: string | null;
    expense_date: string;
    receipt_url?: string | null;
    receipt_data?: ReceiptData | null;
    event_name?: string | null;
    payment_method?: string | null;
    is_reimbursement?: boolean;
  }) => {
    if (!user) return null;
    
    try {
      const insertData = {
        user_id: user.id,
        submitted_by: user.id,
        category_id: expense.category_id,
        amount: expense.amount,
        vendor_name: expense.vendor_name || null,
        description: expense.description || null,
        expense_date: expense.expense_date,
        receipt_url: expense.receipt_url || null,
        receipt_data: expense.receipt_data as any,
        event_name: expense.event_name || null,
        status: 'pending' as const,
        payment_method: expense.payment_method || null,
        is_reimbursement: expense.is_reimbursement || false
      };

      const { data, error } = await supabase
        .from('chapter_expenses')
        .insert(insertData)
        .select(`
          *,
          category:expense_categories(*)
        `)
        .single();
      
      if (error) throw error;
      
      const mappedExpense = {
        ...data,
        status: data.status as ExpenseStatus,
        receipt_data: data.receipt_data as unknown as ReceiptData | null,
        category: data.category ? {
          ...data.category,
          category_type: data.category.category_type as 'standard' | 'custom'
        } : undefined
      } as ChapterExpense;
      
      setExpenses(prev => [mappedExpense, ...prev]);
      toast.success('Expense added successfully');
      return data;
    } catch (err) {
      console.error('Error adding expense:', err);
      toast.error('Failed to add expense');
      return null;
    }
  };

  // Update expense
  const updateExpense = async (id: string, updates: { status?: ExpenseStatus; approved_at?: string; rejection_reason?: string }) => {
    try {
      const { data, error } = await supabase
        .from('chapter_expenses')
        .update(updates as any)
        .eq('id', id)
        .select(`
          *,
          category:expense_categories(*)
        `)
        .single();
      
      if (error) throw error;
      
      const mappedExpense = {
        ...data,
        status: data.status as ExpenseStatus,
        receipt_data: data.receipt_data as unknown as ReceiptData | null,
        category: data.category ? {
          ...data.category,
          category_type: data.category.category_type as 'standard' | 'custom'
        } : undefined
      } as ChapterExpense;
      
      setExpenses(prev => prev.map(e => e.id === id ? mappedExpense : e));
      toast.success('Expense updated');
      return data;
    } catch (err) {
      console.error('Error updating expense:', err);
      toast.error('Failed to update expense');
      return null;
    }
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('chapter_expenses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setExpenses(prev => prev.filter(e => e.id !== id));
      toast.success('Expense deleted');
      return true;
    } catch (err) {
      console.error('Error deleting expense:', err);
      toast.error('Failed to delete expense');
      return false;
    }
  };

  // Upload receipt
  const uploadReceipt = async (file: File): Promise<string | null> => {
    if (!user) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('chapter-receipts')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('chapter-receipts')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (err) {
      console.error('Error uploading receipt:', err);
      toast.error('Failed to upload receipt');
      return null;
    }
  };

  // Parse receipt with AI
  const parseReceipt = async (imageBase64: string): Promise<ReceiptData | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('parse-receipt', {
        body: { imageBase64 }
      });
      
      if (error) throw error;
      
      if (data.success) {
        return data.data as ReceiptData;
      }
      
      throw new Error(data.error || 'Failed to parse receipt');
    } catch (err) {
      console.error('Error parsing receipt:', err);
      toast.error('Failed to parse receipt');
      return null;
    }
  };

  // Add/Update budget
  const saveBudget = async (budget: { category_id: string; budget_amount: number; period_start: string; period_end: string; notes?: string }) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('chapter_budgets')
        .upsert({
          user_id: user.id,
          category_id: budget.category_id,
          budget_amount: budget.budget_amount,
          period_start: budget.period_start,
          period_end: budget.period_end,
          notes: budget.notes || null
        }, {
          onConflict: 'user_id,category_id,period_start'
        })
        .select(`
          *,
          category:expense_categories(*)
        `)
        .single();
      
      if (error) throw error;
      
      await fetchBudgets();
      toast.success('Budget saved');
      return data;
    } catch (err) {
      console.error('Error saving budget:', err);
      toast.error('Failed to save budget');
      return null;
    }
  };

  // Add custom category
  const addCategory = async (name: string, description: string, icon: string, color: string) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('expense_categories')
        .insert({
          name,
          description,
          icon,
          color,
          category_type: 'custom',
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setCategories(prev => [...prev, data as ExpenseCategory]);
      toast.success('Category added');
      return data;
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Failed to add category');
      return null;
    }
  };

  // Get budget summary
  const getBudgetSummary = (periodStart: string, periodEnd: string): BudgetSummary[] => {
    const periodExpenses = expenses.filter(e => {
      const date = new Date(e.expense_date);
      return date >= new Date(periodStart) && date <= new Date(periodEnd);
    });

    return categories.map(cat => {
      const catExpenses = periodExpenses.filter(e => e.category_id === cat.id);
      const spent = catExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
      const budget = budgets.find(b => 
        b.category_id === cat.id && 
        b.period_start === periodStart
      );
      const budgeted = budget ? Number(budget.budget_amount) : 0;
      
      return {
        categoryId: cat.id,
        categoryName: cat.name,
        categoryIcon: cat.icon,
        categoryColor: cat.color,
        budgeted,
        spent,
        remaining: budgeted - spent,
        percentUsed: budgeted > 0 ? (spent / budgeted) * 100 : 0
      };
    }).filter(s => s.budgeted > 0 || s.spent > 0);
  };

  // Generate expense report
  const generateReport = (periodStart: string, periodEnd: string): ExpenseReport => {
    const periodExpenses = expenses.filter(e => {
      const date = new Date(e.expense_date);
      return date >= new Date(periodStart) && date <= new Date(periodEnd);
    });

    const byCategory = getBudgetSummary(periodStart, periodEnd);
    
    // Group by event
    const eventMap = new Map<string, { total: number; count: number }>();
    periodExpenses.forEach(e => {
      const eventName = e.event_name || 'General';
      const existing = eventMap.get(eventName) || { total: 0, count: 0 };
      eventMap.set(eventName, {
        total: existing.total + Number(e.amount),
        count: existing.count + 1
      });
    });

    const byEvent = Array.from(eventMap.entries())
      .map(([eventName, data]) => ({ eventName, ...data }))
      .sort((a, b) => b.total - a.total);

    return {
      period: `${periodStart} to ${periodEnd}`,
      totalExpenses: periodExpenses.reduce((sum, e) => sum + Number(e.amount), 0),
      totalBudgeted: byCategory.reduce((sum, c) => sum + c.budgeted, 0),
      byCategory,
      byEvent,
      pendingApprovals: periodExpenses.filter(e => e.status === 'pending').length,
      reimbursementsDue: periodExpenses.filter(e => e.is_reimbursement && !e.reimbursement_paid).length
    };
  };

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchExpenses(), fetchBudgets()]);
      setLoading(false);
    };
    
    if (user) {
      loadData();
    }
  }, [user]);

  return {
    expenses,
    categories,
    budgets,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    uploadReceipt,
    parseReceipt,
    saveBudget,
    addCategory,
    getBudgetSummary,
    generateReport,
    refetch: () => {
      fetchExpenses();
      fetchBudgets();
    }
  };
}
