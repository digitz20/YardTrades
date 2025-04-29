
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, Filter, Download } from 'lucide-react'; // Added Filter, Download
import { format } from 'date-fns'; // Import date-fns format function
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For potential filtering
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // For filtering/sorting

// Mock Data (Replace with actual data fetching logic, potentially with pagination)
// Use fixed dates to avoid hydration issues
const allTransactionsData = [
  { id: 'txn001', type: 'Deposit', method: 'Crypto (BTC)', amount: 1000.00, date: new Date(2024, 6, 15, 10, 30), status: 'Completed' }, // July 15, 2024, 10:30 AM
  { id: 'txn002', type: 'Investment', method: 'Gold Plan', amount: -500.00, date: new Date(2024, 6, 16, 9, 0), status: 'Active' }, // July 16, 2024, 9:00 AM
  { id: 'txn003', type: 'Withdrawal', method: 'Bank Transfer', amount: -250.00, date: new Date(2024, 6, 18, 14, 0), status: 'Completed' }, // July 18, 2024, 2:00 PM
  { id: 'txn004', type: 'Deposit', method: 'Crypto (ETH)', amount: 500.00, date: new Date(2024, 6, 20, 11, 15), status: 'Pending' }, // July 20, 2024, 11:15 AM
  { id: 'txn005', type: 'Profit Payout', method: 'Silver Plan', amount: 120.50, date: new Date(2024, 6, 22, 16, 45), status: 'Completed' }, // July 22, 2024, 4:45 PM
  { id: 'txn006', type: 'Investment', method: 'Starter Plan', amount: -100.00, date: new Date(2024, 5, 10, 8, 0), status: 'Completed' }, // June 10, 2024, 8:00 AM
  { id: 'txn007', type: 'Deposit', method: 'Card Deposit', amount: 200.00, date: new Date(2024, 5, 5, 12, 0), status: 'Failed' }, // June 5, 2024, 12:00 PM
  { id: 'txn008', type: 'Withdrawal', method: 'Crypto (BTC)', amount: -150.75, date: new Date(2024, 4, 28, 10, 0), status: 'Completed' }, // May 28, 2024, 10:00 AM
];

// Helper to get status badge variant
const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (status.toLowerCase()) {
    case 'completed': return 'default'; // Using ShadCN default (often blue/primary based) - consider adding a 'success' variant
    case 'pending': return 'secondary'; // Greyish
    case 'active': return 'outline'; // Outline style
    case 'failed': return 'destructive'; // Red
    default: return 'secondary';
  }
};

// Helper to get type icon and color
const getTypeDetails = (type: string) => {
   switch (type.toLowerCase()) {
    case 'deposit': return { icon: ArrowDownLeft, color: 'text-green-500' }; // Green for incoming
    case 'withdrawal': return { icon: ArrowUpRight, color: 'text-red-500' }; // Red for outgoing
    case 'investment': return { icon: CircleDollarSign, color: 'text-blue-500' }; // Blue for investment placement
    case 'profit payout': return { icon: CircleDollarSign, color: 'text-yellow-500' }; // Yellow/Gold for earnings
    default: return { icon: CircleDollarSign, color: 'text-muted-foreground' };
  }
}

export default function TransactionsPage() {
    // State for filtering (example)
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    // In a real app, you'd fetch data based on filters or filter client-side if data set is small

    const filteredTransactions = allTransactionsData.filter(txn => {
        const typeMatch = filterType === 'all' || txn.type.toLowerCase() === filterType.toLowerCase();
        const statusMatch = filterStatus === 'all' || txn.status.toLowerCase() === filterStatus.toLowerCase();
        return typeMatch && statusMatch;
    });

    // Placeholder for CSV export function
    const handleExport = () => {
        alert("CSV Export functionality placeholder");
        // Implement CSV generation logic here (e.g., using a library like papaparse)
    }

  return (
    <div className="flex flex-col gap-6 md:gap-8"> {/* Use gap for consistent spacing */}
      {/* Removed redundant title */}

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <div>
               <CardTitle>Transaction History</CardTitle>
               <CardDescription>View all your deposits, withdrawals, investments, and earnings.</CardDescription>
             </div>
             <div className="flex flex-wrap items-center gap-2">
                 {/* Filtering Options */}
                 <Select value={filterType} onValueChange={setFilterType}>
                     <SelectTrigger className="w-[150px] h-9 text-xs">
                         <SelectValue placeholder="Filter by Type" />
                     </SelectTrigger>
                     <SelectContent>
                         <SelectItem value="all">All Types</SelectItem>
                         <SelectItem value="Deposit">Deposits</SelectItem>
                         <SelectItem value="Withdrawal">Withdrawals</SelectItem>
                         <SelectItem value="Investment">Investments</SelectItem>
                         <SelectItem value="Profit Payout">Profit Payouts</SelectItem>
                     </SelectContent>
                 </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                     <SelectTrigger className="w-[150px] h-9 text-xs">
                         <SelectValue placeholder="Filter by Status" />
                     </SelectTrigger>
                     <SelectContent>
                         <SelectItem value="all">All Statuses</SelectItem>
                         <SelectItem value="Completed">Completed</SelectItem>
                         <SelectItem value="Pending">Pending</SelectItem>
                         <SelectItem value="Active">Active</SelectItem>
                         <SelectItem value="Failed">Failed</SelectItem>
                     </SelectContent>
                 </Select>
                 {/* <Button variant="outline" size="sm" className="h-9">
                     <Filter className="mr-2 h-4 w-4" /> Filter
                 </Button> */}
                 <Button variant="outline" size="sm" className="h-9" onClick={handleExport}>
                     <Download className="mr-2 h-4 w-4" /> Export CSV
                 </Button>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="pl-6 py-3 w-[150px]">Type</TableHead> {/* Added py-3 */}
                    <TableHead className="py-3">Details / Method</TableHead>
                    <TableHead className="text-right py-3">Amount (USD)</TableHead>
                    <TableHead className="py-3 w-[180px]">Date</TableHead>
                    <TableHead className="text-center pr-6 py-3 w-[120px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((txn) => {
                       const { icon: Icon, color } = getTypeDetails(txn.type);
                       const isPositive = txn.type.toLowerCase() === 'deposit' || txn.type.toLowerCase() === 'profit payout';
                       const amountColor = isPositive ? 'text-green-500' : (txn.type.toLowerCase() === 'withdrawal' || txn.type.toLowerCase() === 'investment' ? 'text-red-500' : 'text-foreground');

                       return (
                          <TableRow key={txn.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="font-medium pl-6 py-4"> {/* Added py-4 */}
                              <div className={`flex items-center gap-2 ${color}`}>
                                 <Icon className={`h-4 w-4`} />
                                 <span>{txn.type}</span>
                               </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground py-4">{txn.method}</TableCell>
                            <TableCell className={`text-right font-semibold py-4 ${amountColor}`}>
                              {isPositive ? '+' : ''}
                              ${txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                             {/* Use date-fns format for consistent date/time */}
                            <TableCell className="text-muted-foreground py-4">{format(txn.date, 'PPp')}</TableCell> {/* 'PPp' includes date and time */}
                            <TableCell className="text-center pr-6 py-4">
                              <Badge variant={getStatusVariant(txn.status)} className="capitalize text-xs">
                                {txn.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                       )
                     })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No transactions match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </div>
        </CardContent>
        {/* Add Pagination Controls here if implementing pagination */}
        {/* <CardFooter className="flex justify-end border-t pt-4">
            <Button variant="outline" size="sm">Previous</Button>
            <span className="mx-4 text-sm text-muted-foreground">Page 1 of 10</span>
            <Button variant="outline" size="sm">Next</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

    