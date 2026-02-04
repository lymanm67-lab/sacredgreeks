import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, Download, Printer, Calendar, DollarSign, 
  TrendingUp, Users, ClipboardList, PieChart
} from 'lucide-react';
import { useExpenses } from '@/hooks/use-expenses';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import type { ExpenseReport } from '@/types/expenses';

export function ExpenseReports() {
  const { generateReport, expenses, categories } = useExpenses();
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const reportRef = useRef<HTMLDivElement>(null);

  // Calculate period
  const { periodStart, periodEnd } = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const monthDate = new Date(year, month - 1);
    return {
      periodStart: format(startOfMonth(monthDate), 'yyyy-MM-dd'),
      periodEnd: format(endOfMonth(monthDate), 'yyyy-MM-dd')
    };
  }, [selectedMonth]);

  // Generate report
  const report = useMemo(() => {
    return generateReport(periodStart, periodEnd);
  }, [generateReport, periodStart, periodEnd]);

  // Previous month comparison
  const previousReport = useMemo(() => {
    const prevMonth = subMonths(new Date(selectedMonth + '-01'), 1);
    const prevStart = format(startOfMonth(prevMonth), 'yyyy-MM-dd');
    const prevEnd = format(endOfMonth(prevMonth), 'yyyy-MM-dd');
    return generateReport(prevStart, prevEnd);
  }, [generateReport, selectedMonth]);

  const spendingChange = previousReport.totalExpenses > 0 
    ? ((report.totalExpenses - previousReport.totalExpenses) / previousReport.totalExpenses) * 100
    : 0;

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Primary color
    doc.text('Chapter Financial Report', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(format(new Date(periodStart), 'MMMM yyyy'), pageWidth / 2, 28, { align: 'center' });
    
    // Summary
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Summary', 14, 45);
    
    doc.setFontSize(10);
    let y = 55;
    doc.text(`Total Expenses: $${report.totalExpenses.toFixed(2)}`, 14, y);
    y += 7;
    doc.text(`Total Budgeted: $${report.totalBudgeted.toFixed(2)}`, 14, y);
    y += 7;
    doc.text(`Budget Utilization: ${report.totalBudgeted > 0 ? ((report.totalExpenses / report.totalBudgeted) * 100).toFixed(1) : 0}%`, 14, y);
    y += 7;
    doc.text(`Pending Approvals: ${report.pendingApprovals}`, 14, y);
    y += 7;
    doc.text(`Reimbursements Due: ${report.reimbursementsDue}`, 14, y);
    
    // Category breakdown
    y += 15;
    doc.setFontSize(14);
    doc.text('Spending by Category', 14, y);
    y += 10;
    
    doc.setFontSize(10);
    report.byCategory.forEach((cat) => {
      doc.text(`${cat.categoryName}: $${cat.spent.toFixed(2)} / $${cat.budgeted.toFixed(2)} (${cat.percentUsed.toFixed(1)}%)`, 14, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    
    // Event breakdown
    y += 10;
    doc.setFontSize(14);
    doc.text('Spending by Event', 14, y);
    y += 10;
    
    doc.setFontSize(10);
    report.byEvent.forEach((event) => {
      doc.text(`${event.eventName}: $${event.total.toFixed(2)} (${event.count} transactions)`, 14, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated on ${format(new Date(), 'MMMM d, yyyy')} | Sacred Greeks Finance Hub`, pageWidth / 2, 285, { align: 'center' });
    
    doc.save(`chapter-finance-report-${selectedMonth}.pdf`);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Category', 'Budgeted', 'Spent', 'Remaining', '% Used'];
    const rows = report.byCategory.map(cat => [
      cat.categoryName,
      cat.budgeted.toFixed(2),
      cat.spent.toFixed(2),
      cat.remaining.toFixed(2),
      cat.percentUsed.toFixed(1)
    ]);
    
    const csvContent = [
      [`Chapter Financial Report - ${format(new Date(periodStart), 'MMMM yyyy')}`],
      [],
      ['Summary'],
      [`Total Expenses,$${report.totalExpenses.toFixed(2)}`],
      [`Total Budgeted,$${report.totalBudgeted.toFixed(2)}`],
      [`Pending Approvals,${report.pendingApprovals}`],
      [],
      headers,
      ...rows
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chapter-finance-report-${selectedMonth}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Financial Reports
          </h2>
          <p className="text-sm text-slate-400">
            Generate reports for chapter meetings and audits
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-[160px] bg-slate-800/50 border-slate-600"
          />
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button size="sm" onClick={exportToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            PDF Report
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Expenses</p>
                  <p className="text-xl font-bold text-white">${report.totalExpenses.toFixed(2)}</p>
                </div>
              </div>
              {spendingChange !== 0 && (
                <div className={`mt-2 text-xs flex items-center gap-1 ${spendingChange > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  <TrendingUp className={`h-3 w-3 ${spendingChange < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(spendingChange).toFixed(1)}% vs last month
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <PieChart className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Budget Used</p>
                  <p className="text-xl font-bold text-white">
                    {report.totalBudgeted > 0 ? ((report.totalExpenses / report.totalBudgeted) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-slate-900 border-amber-700/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <ClipboardList className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Pending Approvals</p>
                  <p className="text-xl font-bold text-amber-300">{report.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-700/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Reimbursements Due</p>
                  <p className="text-xl font-bold text-purple-300">{report.reimbursementsDue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Budget Summary by Category</CardTitle>
            <CardDescription>
              {format(new Date(periodStart), 'MMMM d')} - {format(new Date(periodEnd), 'MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-slate-800/50">
                  <TableHead className="text-slate-400">Category</TableHead>
                  <TableHead className="text-slate-400 text-right">Budgeted</TableHead>
                  <TableHead className="text-slate-400 text-right">Spent</TableHead>
                  <TableHead className="text-slate-400 text-right">Remaining</TableHead>
                  <TableHead className="text-slate-400 text-right">% Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.byCategory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                      No budget data for this period
                    </TableCell>
                  </TableRow>
                ) : (
                  report.byCategory.map((cat) => (
                    <TableRow key={cat.categoryId} className="hover:bg-slate-800/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: cat.categoryColor }}
                          />
                          <span className="font-medium text-white">{cat.categoryName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-slate-300">
                        ${cat.budgeted.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-white font-medium">
                        ${cat.spent.toFixed(2)}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${cat.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ${Math.abs(cat.remaining).toFixed(2)}
                        {cat.remaining < 0 && ' over'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="outline"
                          className={cat.percentUsed > 100 
                            ? 'border-red-500/30 text-red-400' 
                            : cat.percentUsed > 80 
                              ? 'border-amber-500/30 text-amber-400'
                              : 'border-emerald-500/30 text-emerald-400'
                          }
                        >
                          {cat.percentUsed.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {report.byCategory.length > 0 && (
                  <TableRow className="bg-slate-800/50 font-bold">
                    <TableCell className="text-white">TOTAL</TableCell>
                    <TableCell className="text-right text-slate-300">
                      ${report.totalBudgeted.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-white">
                      ${report.totalExpenses.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-right ${(report.totalBudgeted - report.totalExpenses) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      ${Math.abs(report.totalBudgeted - report.totalExpenses).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-white">
                      {report.totalBudgeted > 0 ? ((report.totalExpenses / report.totalBudgeted) * 100).toFixed(1) : 0}%
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Event Cost Analysis */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Event Cost Analysis</CardTitle>
            <CardDescription>Spending breakdown by event/activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-slate-800/50">
                  <TableHead className="text-slate-400">Event</TableHead>
                  <TableHead className="text-slate-400 text-right">Transactions</TableHead>
                  <TableHead className="text-slate-400 text-right">Total Spent</TableHead>
                  <TableHead className="text-slate-400 text-right">Avg per Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.byEvent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-400">
                      No event data for this period
                    </TableCell>
                  </TableRow>
                ) : (
                  report.byEvent.map((event, idx) => (
                    <motion.tr
                      key={event.eventName}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-slate-700 hover:bg-slate-800/30"
                    >
                      <TableCell className="font-medium text-white">
                        {event.eventName}
                      </TableCell>
                      <TableCell className="text-right text-slate-300">
                        {event.count}
                      </TableCell>
                      <TableCell className="text-right text-white font-medium">
                        ${event.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-slate-300">
                        ${(event.total / event.count).toFixed(2)}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
