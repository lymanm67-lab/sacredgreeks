import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Search, Filter, Download, Eye, Trash2, Check, X, 
  Clock, DollarSign, Receipt, Calendar, Building2 
} from 'lucide-react';
import { useExpenses } from '@/hooks/use-expenses';
import { format } from 'date-fns';
import type { ChapterExpense } from '@/types/expenses';
import { motion, AnimatePresence } from 'framer-motion';

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  reimbursed: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
};

const statusIcons = {
  pending: Clock,
  approved: Check,
  rejected: X,
  reimbursed: DollarSign
};

export function ExpenseTracker() {
  const { expenses, categories, loading, deleteExpense, updateExpense } = useExpenses();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedExpense, setSelectedExpense] = useState<ChapterExpense | null>(null);

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.vendor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.event_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || expense.category_id === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate totals
  const totals = {
    all: filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0),
    pending: filteredExpenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + Number(e.amount), 0),
    approved: filteredExpenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + Number(e.amount), 0)
  };

  const handleApprove = async (expense: ChapterExpense) => {
    await updateExpense(expense.id, { 
      status: 'approved',
      approved_at: new Date().toISOString()
    });
  };

  const handleReject = async (expense: ChapterExpense, reason: string) => {
    await updateExpense(expense.id, { 
      status: 'rejected',
      rejection_reason: reason
    });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Vendor', 'Category', 'Amount', 'Status', 'Event', 'Payment Method'];
    const rows = filteredExpenses.map(e => [
      e.expense_date,
      e.vendor_name || '',
      e.category?.name || '',
      e.amount,
      e.status,
      e.event_name || '',
      e.payment_method || ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Receipt className="h-5 w-5 text-primary" />
              Expense Tracker
            </CardTitle>
            <CardDescription>
              View and manage all chapter expenses
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-slate-400">Total Expenses</p>
            <p className="text-2xl font-bold text-white">${totals.all.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-1">{filteredExpenses.length} transactions</p>
          </div>
          <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
            <p className="text-sm text-amber-400">Pending Approval</p>
            <p className="text-2xl font-bold text-amber-300">${totals.pending.toFixed(2)}</p>
            <p className="text-xs text-amber-500/70 mt-1">
              {filteredExpenses.filter(e => e.status === 'pending').length} items
            </p>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
            <p className="text-sm text-emerald-400">Approved</p>
            <p className="text-2xl font-bold text-emerald-300">${totals.approved.toFixed(2)}</p>
            <p className="text-xs text-emerald-500/70 mt-1">
              {filteredExpenses.filter(e => e.status === 'approved').length} items
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by vendor, description, or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-slate-800/50 border-slate-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="reimbursed">Reimbursed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-600">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
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

        {/* Expenses Table */}
        <div className="rounded-lg border border-slate-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800/50 hover:bg-slate-800/50">
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400">Vendor</TableHead>
                <TableHead className="text-slate-400">Category</TableHead>
                <TableHead className="text-slate-400">Event</TableHead>
                <TableHead className="text-slate-400 text-right">Amount</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                        Loading expenses...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                      No expenses found. Add your first expense using the Receipt Scanner.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense, index) => {
                    const StatusIcon = statusIcons[expense.status];
                    return (
                      <motion.tr
                        key={expense.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-slate-700 hover:bg-slate-800/30"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-slate-500" />
                            {format(new Date(expense.expense_date), 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-3 w-3 text-slate-500" />
                            {expense.vendor_name || '-'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {expense.category && (
                            <Badge 
                              variant="outline"
                              style={{ 
                                borderColor: expense.category.color,
                                color: expense.category.color
                              }}
                            >
                              {expense.category.name}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {expense.event_name || '-'}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-white">
                          ${Number(expense.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[expense.status]}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setSelectedExpense(expense)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Expense Details</DialogTitle>
                                  <DialogDescription>
                                    {expense.vendor_name} - {format(new Date(expense.expense_date), 'MMMM d, yyyy')}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Amount</p>
                                      <p className="text-xl font-bold">${Number(expense.amount).toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Status</p>
                                      <Badge className={statusColors[expense.status]}>
                                        {expense.status}
                                      </Badge>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Category</p>
                                      <p>{expense.category?.name || '-'}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Payment Method</p>
                                      <p className="capitalize">{expense.payment_method || '-'}</p>
                                    </div>
                                  </div>
                                  {expense.description && (
                                    <div>
                                      <p className="text-sm text-muted-foreground">Description</p>
                                      <p>{expense.description}</p>
                                    </div>
                                  )}
                                  {expense.receipt_url && (
                                    <div>
                                      <p className="text-sm text-muted-foreground mb-2">Receipt</p>
                                      <img 
                                        src={expense.receipt_url} 
                                        alt="Receipt" 
                                        className="max-h-48 rounded-lg"
                                      />
                                    </div>
                                  )}
                                  {expense.status === 'pending' && (
                                    <div className="flex gap-2 pt-4">
                                      <Button 
                                        onClick={() => handleApprove(expense)}
                                        className="flex-1"
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button 
                                        variant="destructive"
                                        onClick={() => handleReject(expense, 'Rejected by treasurer')}
                                        className="flex-1"
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {expense.status === 'pending' && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Expense?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete this expense record. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteExpense(expense.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
