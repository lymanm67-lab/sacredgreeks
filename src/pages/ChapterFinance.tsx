import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt, PieChart, FileText, Wallet, TrendingUp, 
  Calculator, Sparkles, ArrowLeft, GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReceiptScanner } from '@/components/expenses/ReceiptScanner';
import { ExpenseTracker } from '@/components/expenses/ExpenseTracker';
import { BudgetDashboard } from '@/components/expenses/BudgetDashboard';
import { ExpenseReports } from '@/components/expenses/ExpenseReports';
import { FinanceSandbox } from '@/components/expenses/FinanceSandbox';
import { useExpenses } from '@/hooks/use-expenses';
import { useAuth } from '@/contexts/AuthContext';

export default function ChapterFinance() {
  const { user } = useAuth();
  const { expenses, loading } = useExpenses();
  const [activeTab, setActiveTab] = useState('scanner');

  // Calculate quick stats
  const pendingCount = expenses.filter(e => e.status === 'pending').length;
  const thisMonthTotal = expenses
    .filter(e => {
      const expDate = new Date(e.expense_date);
      const now = new Date();
      return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access the Chapter Finance Hub
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-600/10 pointer-events-none" />
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-white">Chapter Finance Hub</h1>
              </div>
              <p className="text-slate-400 max-w-xl">
                Scan receipts, track expenses, manage budgets, and generate reports for chapter meetings. 
                Powered by AI for automatic receipt parsing.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-700">
                <p className="text-xs text-slate-400">This Month</p>
                <p className="text-xl font-bold text-white">${thisMonthTotal.toFixed(2)}</p>
              </div>
              {pendingCount > 0 && (
                <div className="bg-amber-500/10 rounded-lg px-4 py-2 border border-amber-500/20">
                  <p className="text-xs text-amber-400">Pending</p>
                  <p className="text-xl font-bold text-amber-300">{pendingCount}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700 p-1 flex flex-wrap">
            <TabsTrigger 
              value="scanner" 
              className="flex items-center gap-2 data-[state=active]:bg-primary"
            >
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Receipt Scanner</span>
              <span className="sm:hidden">Scan</span>
              <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="tracker" 
              className="flex items-center gap-2 data-[state=active]:bg-primary"
            >
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Expense Tracker</span>
              <span className="sm:hidden">Expenses</span>
              {pendingCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-amber-500/20 text-amber-400 text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="budget" 
              className="flex items-center gap-2 data-[state=active]:bg-primary"
            >
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Budget Dashboard</span>
              <span className="sm:hidden">Budget</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="flex items-center gap-2 data-[state=active]:bg-primary"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
              <span className="sm:hidden">Reports</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sandbox" 
              className="flex items-center gap-2 data-[state=active]:bg-primary"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Practice</span>
              <span className="sm:hidden">Practice</span>
              <Badge variant="secondary" className="ml-1 bg-purple-500/20 text-purple-400 text-xs">
                Sandbox
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="mt-6">
            <ReceiptScanner onExpenseAdded={() => setActiveTab('tracker')} />
          </TabsContent>

          <TabsContent value="tracker" className="mt-6">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="budget" className="mt-6">
            <BudgetDashboard />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ExpenseReports />
          </TabsContent>

          <TabsContent value="sandbox" className="mt-6">
            <FinanceSandbox />
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-purple-600/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Chapter Finance Tips</h3>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Upload receipts immediately after purchases to avoid losing them</li>
                    <li>• Set category budgets at the start of each semester</li>
                    <li>• Generate reports before chapter meetings for financial updates</li>
                    <li>• Mark reimbursements to track who needs to be paid back</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
