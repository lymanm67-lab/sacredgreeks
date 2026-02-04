import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, Camera, Receipt, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useExpenses } from '@/hooks/use-expenses';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReceiptData, ExpenseCategory } from '@/types/expenses';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ReceiptScannerProps {
  onExpenseAdded?: () => void;
}

export function ReceiptScanner({ onExpenseAdded }: ReceiptScannerProps) {
  const { categories, addExpense, uploadReceipt, parseReceipt } = useExpenses();
  const [scanning, setScanning] = useState(false);
  const [parsedData, setParsedData] = useState<ReceiptData | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [vendorName, setVendorName] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isReimbursement, setIsReimbursement] = useState(false);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Parse receipt
    setScanning(true);
    try {
      const base64Reader = new FileReader();
      base64Reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const data = await parseReceipt(base64);
        
        if (data) {
          setParsedData(data);
          // Auto-fill form
          if (data.vendor_name) setVendorName(data.vendor_name);
          if (data.amount) setAmount(data.amount.toString());
          if (data.expense_date) setExpenseDate(data.expense_date);
          if (data.payment_method) setPaymentMethod(data.payment_method);
          
          // Match category suggestion
          if (data.category_suggestion) {
            const matchedCat = categories.find(c => 
              c.name.toLowerCase() === data.category_suggestion?.toLowerCase()
            );
            if (matchedCat) setCategoryId(matchedCat.id);
          }
          
          toast.success('Receipt scanned successfully!');
        }
      };
      base64Reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error scanning receipt:', error);
      toast.error('Failed to scan receipt');
    } finally {
      setScanning(false);
    }
  }, [categories, parseReceipt]);

  const handleSubmit = async () => {
    if (!amount || !categoryId) {
      toast.error('Please fill in required fields');
      return;
    }

    setSaving(true);
    try {
      // Upload receipt image if we have one
      let receiptUrl = null;
      if (previewImage && fileInputRef.current?.files?.[0]) {
        receiptUrl = await uploadReceipt(fileInputRef.current.files[0]);
      }

      await addExpense({
        vendor_name: vendorName || null,
        amount: parseFloat(amount),
        expense_date: expenseDate,
        category_id: categoryId,
        description: description || null,
        event_name: eventName || null,
        payment_method: paymentMethod || null,
        is_reimbursement: isReimbursement,
        receipt_url: receiptUrl,
        receipt_data: parsedData as any
      });

      // Reset form
      setVendorName('');
      setAmount('');
      setExpenseDate(format(new Date(), 'yyyy-MM-dd'));
      setCategoryId('');
      setDescription('');
      setEventName('');
      setPaymentMethod('');
      setIsReimbursement(false);
      setPreviewImage(null);
      setParsedData(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      onExpenseAdded?.();
    } catch (error) {
      console.error('Error saving expense:', error);
    } finally {
      setSaving(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === categoryId);

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Receipt className="h-5 w-5 text-primary" />
          Receipt Scanner
        </CardTitle>
        <CardDescription>
          Upload a receipt or invoice to automatically extract expense details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
            ${previewImage ? 'border-primary/50 bg-primary/5' : 'border-slate-600 hover:border-primary/50 hover:bg-slate-800/50'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          
          <AnimatePresence mode="wait">
            {scanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-slate-300">AI is reading your receipt...</span>
                </div>
              </motion.div>
            ) : previewImage ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <img 
                  src={previewImage} 
                  alt="Receipt preview" 
                  className="max-h-48 mx-auto rounded-lg shadow-lg"
                />
                {parsedData && (
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Receipt scanned successfully</span>
                  </div>
                )}
                <p className="text-xs text-slate-400">Click to upload a different receipt</p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <div className="p-4 rounded-full bg-slate-700/50">
                  <Upload className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Drop receipt here or click to upload</p>
                  <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, PDF</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Camera className="h-3 w-3" />
                  <span>On mobile? Take a photo directly</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Parsed Data Display */}
        {parsedData && parsedData.items && parsedData.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-lg p-4 space-y-2"
          >
            <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Detected Items
            </h4>
            <div className="space-y-1">
              {parsedData.items.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-400 truncate">{item.name}</span>
                  <span className="text-slate-300">${item.price?.toFixed(2) || '0.00'}</span>
                </div>
              ))}
              {parsedData.items.length > 5 && (
                <p className="text-xs text-slate-500">+{parsedData.items.length - 5} more items</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor/Store Name</Label>
            <Input
              id="vendor"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              placeholder="e.g., Office Depot"
              className="bg-slate-800/50 border-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-7 bg-slate-800/50 border-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Expense Date</Label>
            <Input
              id="date"
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="bg-slate-800/50 border-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
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
            <Label htmlFor="event">Event Name (Optional)</Label>
            <Input
              id="event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., Spring Formal 2024"
              className="bg-slate-800/50 border-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="debit">Debit Card</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="venmo">Venmo</SelectItem>
                <SelectItem value="zelle">Zelle</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description/Notes</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details..."
            className="bg-slate-800/50 border-slate-600 min-h-[80px]"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="reimbursement"
            checked={isReimbursement}
            onChange={(e) => setIsReimbursement(e.target.checked)}
            className="rounded border-slate-600"
          />
          <Label htmlFor="reimbursement" className="cursor-pointer">
            This is a reimbursement request (I paid out of pocket)
          </Label>
        </div>

        {/* Category Badge */}
        {selectedCategory && (
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              style={{ 
                borderColor: selectedCategory.color,
                color: selectedCategory.color
              }}
            >
              {selectedCategory.name}
            </Badge>
            {parsedData?.category_suggestion && (
              <span className="text-xs text-slate-500">
                AI suggested: {parsedData.category_suggestion}
              </span>
            )}
          </div>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={saving || !amount || !categoryId}
          className="w-full"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Add Expense
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
