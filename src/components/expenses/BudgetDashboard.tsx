import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PieChart, DollarSign, TrendingUp, TrendingDown, Settings, Plus, 
  Calendar, Target, AlertTriangle
} from 'lucide-react';
import { useExpenses } from '@/hooks/use-expenses';
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

type PeriodType = 'month' | 'quarter' | 'year' | 'custom';

export function BudgetDashboard() {
  const { categories, budgets, expenses, saveBudget, getBudgetSummary, loading } = useExpenses();
  const [periodType, setPeriodType] = useState<PeriodType>('month');
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [budgetAmount, setBudgetAmount] = useState('');

  // Calculate period dates
  const { periodStart, periodEnd } = useMemo(() => {
    const now = new Date();
    switch (periodType) {
      case 'month':
        const [year, month] = selectedMonth.split('-').map(Number);
        const monthDate = new Date(year, month - 1);
        return {
          periodStart: format(startOfMonth(monthDate), 'yyyy-MM-dd'),
          periodEnd: format(endOfMonth(monthDate), 'yyyy-MM-dd')
        };
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        const qStart = new Date(now.getFullYear(), quarter * 3, 1);
        const qEnd = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        return {
          periodStart: format(qStart, 'yyyy-MM-dd'),
          periodEnd: format(qEnd, 'yyyy-MM-dd')
        };
      case 'year':
        return {
          periodStart: format(startOfYear(now), 'yyyy-MM-dd'),
          periodEnd: format(endOfYear(now), 'yyyy-MM-dd')
        };
      default:
        return {
          periodStart: format(startOfMonth(now), 'yyyy-MM-dd'),
          periodEnd: format(endOfMonth(now), 'yyyy-MM-dd')
        };
    }
  }, [periodType, selectedMonth]);

  // Get budget summary for the period
  const summary = useMemo(() => {
    return getBudgetSummary(periodStart, periodEnd);
  }, [getBudgetSummary, periodStart, periodEnd]);

  // Calculate totals
  const totals = useMemo(() => {
    const totalBudgeted = summary.reduce((sum, s) => sum + s.budgeted, 0);
    const totalSpent = summary.reduce((sum, s) => sum + s.spent, 0);
    return {
      budgeted: totalBudgeted,
      spent: totalSpent,
      remaining: totalBudgeted - totalSpent,
      percentUsed: totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0
    };
  }, [summary]);

  // Pie chart data
  const pieData = summary.map(s => ({
    name: s.categoryName,
    value: s.spent,
    color: s.categoryColor
  })).filter(d => d.value > 0);

  // Bar chart data
  const barData = summary.map(s => ({
    name: s.categoryName.split(' ')[0], // Short name
    budgeted: s.budgeted,
    spent: s.spent,
    fill: s.categoryColor
  }));

  const handleSaveBudget = async () => {
    if (!editingCategory || !budgetAmount) return;
    
    await saveBudget({
      category_id: editingCategory,
      budget_amount: parseFloat(budgetAmount),
      period_start: periodStart,
      period_end: periodEnd
    });
    
    setShowBudgetDialog(false);
    setEditingCategory(null);
    setBudgetAmount('');
  };

  const overBudgetCategories = summary.filter(s => s.percentUsed > 100);

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Budget Dashboard
          </h2>
          <p className="text-sm text-slate-400">
            Track spending against your chapter budget
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={periodType} onValueChange={(v) => setPeriodType(v as PeriodType)}>
            <SelectTrigger className="w-[120px] bg-slate-800/50 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {periodType === 'month' && (
            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-[160px] bg-slate-800/50 border-slate-600"
            />
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700"
        >
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Target className="h-4 w-4" />
            <span className="text-sm">Total Budget</span>
          </div>
          <p className="text-2xl font-bold text-white">${totals.budgeted.toFixed(2)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700"
        >
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-white">${totals.spent.toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-1">
            {totals.percentUsed.toFixed(1)}% of budget
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-br rounded-xl p-4 border ${
            totals.remaining >= 0 
              ? 'from-emerald-900/30 to-slate-900 border-emerald-700/30' 
              : 'from-red-900/30 to-slate-900 border-red-700/30'
          }`}
        >
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            {totals.remaining >= 0 ? (
              <TrendingDown className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm">Remaining</span>
          </div>
          <p className={`text-2xl font-bold ${totals.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${Math.abs(totals.remaining).toFixed(2)}
            {totals.remaining < 0 && ' over'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700"
        >
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Period</span>
          </div>
          <p className="text-sm font-medium text-white">
            {format(new Date(periodStart), 'MMM d')} - {format(new Date(periodEnd), 'MMM d, yyyy')}
          </p>
        </motion.div>
      </div>

      {/* Over Budget Warning */}
      {overBudgetCategories.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Over Budget Alert</span>
          </div>
          <p className="text-sm text-slate-300">
            {overBudgetCategories.map(c => c.categoryName).join(', ')} {overBudgetCategories.length === 1 ? 'is' : 'are'} over budget.
          </p>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category Pie */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-slate-400">
                No spending data for this period
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budget vs Actual Bar */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Budget vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            {barData.length > 0 ? (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                    />
                    <Bar dataKey="budgeted" name="Budgeted" fill="#64748b" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="spent" name="Spent" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-slate-400">
                Set budgets to see comparison
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Budget List */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Category Budgets</CardTitle>
            <CardDescription>Set and manage budgets by category</CardDescription>
          </div>
          <Dialog open={showBudgetDialog} onOpenChange={setShowBudgetDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Set Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Category Budget</DialogTitle>
                <DialogDescription>
                  Set budget for {format(new Date(periodStart), 'MMMM yyyy')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={editingCategory || ''} onValueChange={setEditingCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: cat.color }}
                            />
                            {cat.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-7"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveBudget} className="w-full">
                  Save Budget
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.length === 0 ? (
              <p className="text-center text-slate-400 py-8">
                No budgets or expenses for this period. Click "Set Budget" to get started.
              </p>
            ) : (
              summary.map((item, idx) => (
                <motion.div
                  key={item.categoryId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.categoryColor }}
                      />
                      <span className="font-medium text-white">{item.categoryName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white">${item.spent.toFixed(2)}</span>
                      <span className="text-slate-400"> / ${item.budgeted.toFixed(2)}</span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(item.percentUsed, 100)} 
                    className="h-2"
                    style={{
                      ['--progress-background' as any]: item.percentUsed > 100 ? '#ef4444' : item.categoryColor
                    }}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={item.percentUsed > 100 ? 'text-red-400' : 'text-slate-400'}>
                      {item.percentUsed.toFixed(1)}% used
                    </span>
                    <span className={item.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      ${Math.abs(item.remaining).toFixed(2)} {item.remaining >= 0 ? 'remaining' : 'over'}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
