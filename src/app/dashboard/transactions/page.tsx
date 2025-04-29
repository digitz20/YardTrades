'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight, CircleDollarSign } from 'lucide-react';
import { format } from 'date-fns'; // For date formatting

// Mock Data (Replace with actual data fetching)
const transactionsData = [
  { id: 'txn001', type: 'Deposit', method: 'Crypto (BTC)', amount: 1000, date: new Date(2024, 6, 15, 10, 30), status: 'Completed' },
  { id: 'txn002', type: 'Investment', method: 'Gold Plan', amount: 500, date: new Date(2024, 6, 16, 9, 0), status: 'Active' },
  { id: 'txn003', type: 'Withdrawal', method: 'Bank Transfer', amount: 250, date: new Date(2024, 6, 18, 14, 0), status: 'Completed' },
  { id: 'txn004', type: 'Deposit', method: 'Crypto (ETH)', amount: 500, date: new Date(2024, 6, 20, 11, 15), status: 'Pending' },
  { id: 'txn005', type: 'Profit Payout', method: 'Silver Plan', amount: 120, date: new Date(2024, 6, 22, 16, 45), status: 'Completed' },
];

// Helper to get status badge variant
const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (status.toLowerCase()) {
    case 'completed': return 'default'; // Or success variant if you add one
    case 'pending': return 'secondary';
    case 'active': return 'outline'; // Or info variant
    case 'failed': return 'destructive';
    default: return 'secondary';
  }
};

// Helper to get type icon and color
const getTypeDetails = (type: string) => {
   switch (type.toLowerCase()) {
    case 'deposit': return { icon: ArrowDownLeft, color: 'text-green-600' };
    case 'withdrawal': return { icon: ArrowUpRight, color: 'text-red-600' };
    case 'investment': return { icon: CircleDollarSign, color: 'text-blue-600' };
     case 'profit payout': return { icon: CircleDollarSign, color: 'text-yellow-600' };
    default: return { icon: CircleDollarSign, color: 'text-muted-foreground' };
  }
}

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your deposits, withdrawals, and investment activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Method / Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.length > 0 ? (
                transactionsData.map((txn) => {
                   const { icon: Icon, color } = getTypeDetails(txn.type);
                   return (
                      <TableRow key={txn.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                             <Icon className={`h-4 w-4 ${color}`} />
                             <span className={color}>{txn.type}</span>
                           </div>
                        </TableCell>
                        <TableCell>{txn.method}</TableCell>
                        <TableCell className={`text-right font-medium ${txn.type === 'Withdrawal' ? 'text-red-600' : ''}`}>
                          {txn.type === 'Deposit' || txn.type === 'Profit Payout' ? '+' : ''}
                          {txn.type === 'Withdrawal' || txn.type === 'Investment' ? '-' : ''}
                          ${txn.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{format(txn.date, 'PPp')}</TableCell> {/* Format date */}
                        <TableCell className="text-center">
                          <Badge variant={getStatusVariant(txn.status)}>
                            {txn.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                   )
                 })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
