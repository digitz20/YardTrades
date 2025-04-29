
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, BarChart, CheckCircle, Clock } from 'lucide-react'; // Added Clock, CheckCircle
import { Progress } from '@/components/ui/progress'; // Import Progress
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns'; // Import date-fns format function

// Mock Data (Replace with actual data fetching logic)
// Use fixed dates to avoid hydration issues
const portfolioData = {
  totalValue: 12345.67,
  totalInvested: 10000.00,
  overallProfit: 2345.67,
  holdings: [
    { id: 'inv001', plan: 'Gold Plan', invested: 5000, currentValue: 5800, profit: 800, startDate: new Date(2024, 5, 1), endDate: new Date(2024, 5, 4), progress: 100, status: 'Completed' }, // June 1 - June 4, 2024
    { id: 'inv002', plan: 'Silver Plan', invested: 3000, currentValue: 3450, profit: 450, startDate: new Date(2024, 6, 10), endDate: new Date(2024, 6, 12), progress: 75, status: 'Active' }, // July 10 - July 12, 2024
    { id: 'inv004', plan: 'Gold Plan', invested: 1500, currentValue: 1545.67, profit: 45.67, startDate: new Date(2024, 6, 20), endDate: new Date(2024, 6, 23), progress: 30, status: 'Active' }, // July 20 - July 23, 2024
  ],
  availableBalance: 3895.67, // Example available balance (Total Value - Active Investments Current Value)
};

// Helper function to format dates using date-fns
const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    // Add error handling for invalid dates
    if (isNaN(d.getTime())) {
        console.warn("Invalid date received for formatting:", date);
        return '-';
    }
    return format(d, 'PP'); // 'PP' is for localized date, e.g., Jul 15, 2024
}

// Helper function to get status badge variant
const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (status.toLowerCase()) {
    case 'active': return 'default'; // Blue/Primary
    case 'completed': return 'secondary'; // Greyish
    case 'pending': return 'outline'; // Outline style
    case 'failed': return 'destructive'; // Red
    default: return 'secondary';
  }
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8"> {/* Use gap for consistent spacing */}
      {/* Removed redundant title */}

      {/* Portfolio Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2"> {/* Added pt-2 */}
            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">Total assets including active investments</p> {/* Added mt-1 */}
          </CardContent>
        </Card>
         <Card className="hover:shadow-md transition-shadow">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Total Invested Capital</CardTitle>
             <BarChart className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent className="pt-2"> {/* Added pt-2 */}
             <div className="text-2xl font-bold">${portfolioData.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground mt-1">Sum of initial investments</p> {/* Added mt-1 */}
           </CardContent>
         </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Profit/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2"> {/* Added pt-2 */}
            <div className={`text-2xl font-bold ${portfolioData.overallProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioData.overallProfit >= 0 ? '+' : ''}${portfolioData.overallProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
             <p className="text-xs text-muted-foreground mt-1">Total returns generated across all plans</p> {/* Added mt-1 */}
          </CardContent>
        </Card>
      </div>

      {/* Available Balance & Action Card */}
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
            <CardTitle>Available Balance</CardTitle>
             <CardDescription>Funds available for withdrawal or new investments.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-3xl font-bold text-primary">${portfolioData.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="flex gap-3 flex-wrap"> {/* Added flex-wrap */}
                <Button asChild><Link href="/crypto-invest">Deposit Funds</Link></Button>
                {/* Removed link to non-existent withdraw page */}
                {/* <Button variant="outline" asChild><Link href="/dashboard/withdraw">Withdraw Funds</Link></Button> */}
                <Button variant="outline" onClick={() => alert('Withdraw functionality placeholder')}>Withdraw Funds</Button>
            </div>
        </CardContent>
      </Card>

      {/* Holdings Table */}
      <Card className="overflow-hidden"> {/* Added overflow-hidden */}
        <CardHeader>
          <CardTitle>Your Investment Holdings</CardTitle>
          <CardDescription>Detailed view of your active and completed investment plans.</CardDescription>
        </CardHeader>
        <CardContent className="p-0"> {/* Removed padding for full-width table */}
           <div className="overflow-x-auto"> {/* Responsive table */}
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="pl-6 py-3">Plan</TableHead> {/* Added py-3 */}
                    <TableHead className="py-3">Start Date</TableHead>
                    <TableHead className="py-3">End Date</TableHead>
                    <TableHead className="text-right py-3">Invested</TableHead>
                    <TableHead className="text-right py-3">Current Value</TableHead>
                    <TableHead className="text-right py-3">Profit/Loss</TableHead>
                    <TableHead className="text-center py-3">Progress</TableHead>
                    <TableHead className="text-center pr-6 py-3">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioData.holdings.length > 0 ? (
                    portfolioData.holdings.map((holding) => (
                      <TableRow key={holding.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium pl-6 py-4">{holding.plan}</TableCell> {/* Added py-4 */}
                        <TableCell className="text-muted-foreground py-4">{formatDate(holding.startDate)}</TableCell>
                        <TableCell className="text-muted-foreground py-4">{formatDate(holding.endDate)}</TableCell>
                        <TableCell className="text-right py-4">${holding.invested.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold py-4">${holding.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className={`text-right font-medium py-4 ${holding.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {holding.profit >= 0 ? '+' : ''}${holding.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-center py-4">
                             <div className="flex items-center justify-center gap-2">
                                 <Progress value={holding.progress} className="h-1.5 w-16" aria-label={`${holding.plan} progress`}/>
                                 <span className="text-xs text-muted-foreground">{holding.progress}%</span>
                             </div>
                        </TableCell>
                        <TableCell className="text-center pr-6 py-4">
                          <Badge variant={getStatusVariant(holding.status)} className="capitalize">
                             {holding.status === 'Active' && <Clock className="mr-1 h-3 w-3" />}
                             {holding.status === 'Completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {holding.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        You have no active or completed investments yet.
                         <Button variant="link" asChild className="ml-2"><Link href="/crypto-invest">Start Investing</Link></Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

    