-- Create expense category enum
CREATE TYPE expense_category_type AS ENUM ('standard', 'custom');

-- Create expense status enum
CREATE TYPE expense_status AS ENUM ('pending', 'approved', 'rejected', 'reimbursed');

-- Create expense categories table
CREATE TABLE public.expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'receipt',
  color TEXT DEFAULT '#6366f1',
  category_type expense_category_type DEFAULT 'standard',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create chapter budgets table
CREATE TABLE public.chapter_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.expense_categories(id) ON DELETE CASCADE NOT NULL,
  budget_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, category_id, period_start)
);

-- Create chapter expenses table (main tracking table)
CREATE TABLE public.chapter_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.expense_categories(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  vendor_name TEXT,
  description TEXT,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  receipt_url TEXT,
  receipt_data JSONB DEFAULT '{}',
  event_name TEXT,
  status expense_status DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  payment_method TEXT,
  is_reimbursement BOOLEAN DEFAULT false,
  reimbursement_paid BOOLEAN DEFAULT false,
  reimbursement_paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create expense approval history table
CREATE TABLE public.expense_approval_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id UUID REFERENCES public.chapter_expenses(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  action_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  previous_status expense_status,
  new_status expense_status,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_approval_history ENABLE ROW LEVEL SECURITY;

-- RLS for expense_categories: Users can see standard categories and their own custom ones
CREATE POLICY "Users can view standard and own custom categories"
ON public.expense_categories FOR SELECT
TO authenticated
USING (category_type = 'standard' OR user_id = auth.uid());

CREATE POLICY "Users can create custom categories"
ON public.expense_categories FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() AND category_type = 'custom');

CREATE POLICY "Users can update own custom categories"
ON public.expense_categories FOR UPDATE
TO authenticated
USING (user_id = auth.uid() AND category_type = 'custom');

CREATE POLICY "Users can delete own custom categories"
ON public.expense_categories FOR DELETE
TO authenticated
USING (user_id = auth.uid() AND category_type = 'custom');

-- RLS for chapter_budgets
CREATE POLICY "Users can manage their own budgets"
ON public.chapter_budgets FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- RLS for chapter_expenses: Users can see their own expenses
CREATE POLICY "Users can view their own expenses"
ON public.chapter_expenses FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR submitted_by = auth.uid());

CREATE POLICY "Users can create expenses"
ON public.chapter_expenses FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own expenses"
ON public.chapter_expenses FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own pending expenses"
ON public.chapter_expenses FOR DELETE
TO authenticated
USING (user_id = auth.uid() AND status = 'pending');

-- RLS for expense_approval_history
CREATE POLICY "Users can view history for their expenses"
ON public.expense_approval_history FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.chapter_expenses 
    WHERE id = expense_id AND (user_id = auth.uid() OR submitted_by = auth.uid())
  )
);

CREATE POLICY "Users can create approval history"
ON public.expense_approval_history FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chapter_expenses 
    WHERE id = expense_id AND user_id = auth.uid()
  )
);

-- Create updated_at triggers
CREATE TRIGGER update_expense_categories_updated_at
  BEFORE UPDATE ON public.expense_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_chapter_budgets_updated_at
  BEFORE UPDATE ON public.chapter_budgets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_chapter_expenses_updated_at
  BEFORE UPDATE ON public.chapter_expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert standard D9 expense categories
INSERT INTO public.expense_categories (name, description, icon, color, category_type) VALUES
('Socials & Formals', 'Chapter socials, mixers, formals, and probates', 'party-popper', '#ec4899', 'standard'),
('Philanthropy', 'Community service events and charitable donations', 'heart-handshake', '#10b981', 'standard'),
('Travel & Conferences', 'Regional/national conferences, conventions, travel expenses', 'plane', '#3b82f6', 'standard'),
('Operations', 'Chapter supplies, meeting expenses, administrative costs', 'settings', '#6366f1', 'standard'),
('Dues & Fees', 'National/regional dues, registration fees, insurance', 'credit-card', '#f59e0b', 'standard'),
('Recruitment', 'Recruitment events, rush activities, promotional materials', 'users', '#8b5cf6', 'standard'),
('Brotherhood/Sisterhood', 'Bonding events, retreats, team building activities', 'users-round', '#06b6d4', 'standard'),
('Merchandise', 'Paraphernalia, apparel, chapter merchandise', 'shirt', '#84cc16', 'standard'),
('Housing', 'Chapter house expenses, maintenance, utilities', 'home', '#f97316', 'standard'),
('Scholarships', 'Member scholarships, academic awards, educational support', 'graduation-cap', '#14b8a6', 'standard'),
('Miscellaneous', 'Other chapter expenses not covered by other categories', 'folder', '#64748b', 'standard');

-- Create storage bucket for receipts
INSERT INTO storage.buckets (id, name, public) VALUES ('chapter-receipts', 'chapter-receipts', false);

-- Storage policies for receipts bucket
CREATE POLICY "Users can upload their own receipts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'chapter-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own receipts"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'chapter-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own receipts"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'chapter-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);