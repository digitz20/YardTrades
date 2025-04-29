
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, TrendingUp, Activity, BarChart } from 'lucide-react'; // Changed Users to BarChart
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress'; // Import Progress
import { Badge } from '@/components/ui/badge'; // Import Badge

// Mock Data (Replace with actual data fetching logic using state/hooks)
const summaryData = {
  totalBalance: 12345.67,
  totalProfit: 1500.00,
  activeInvestmentValue: 8450.00, // Changed from count to value
  recentActivity: { type: 'Deposit', amount: 500, currency: 'USDT', time: '2 hours ago' },
};

// Example recent transactions (replace with real data)
const recentTransactions = [
    { id: 'txn005', type: 'Profit Payout', method: 'Silver Plan', amount: 120, date: new Date(Date.now() - 3600 * 1000 * 1), status: 'Completed' },
    { id: 'txn004', type: 'Deposit', method: 'Crypto (ETH)', amount: 500, date: new Date(Date.now() - 3600 * 1000 * 5), status: 'Completed' },
    { id: 'txn003', type: 'Withdrawal', method: 'Bank Transfer', amount: -250, date: new Date(Date.now() - 3600 * 1000 * 24 * 2), status: 'Completed' },
];

// Example active investments (replace with real data)
const activeInvestments = [
    { id: 'inv001', plan: 'Gold Plan', invested: 5000, currentValue: 5800, progress: 70 },
    { id: 'inv004', plan: 'Silver Plan', invested: 3000, currentValue: 3450, progress: 45 },
]

export default function DashboardPage() {
  const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.invested, 0);
  const accountValue = summaryData.totalBalance + summaryData.activeInvestmentValue; // Example calculation

  return (
    <div className="space-y-6">
      {/* Removed the redundant title here as it's in the layout header */}
      {/* <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1> */}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryData.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">${summaryData.activeInvestmentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Current value of ongoing plans</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lifetime Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+${summaryData.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Total earnings since joining</p>
          </CardContent>
        </Card>
         <Card className="hover:shadow-md transition-shadow">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
             <Activity className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-lg font-semibold truncate">{summaryData.recentActivity.type} +${summaryData.recentActivity.amount} {summaryData.recentActivity.currency}</div>
             <p className="text-xs text-muted-foreground">{summaryData.recentActivity.time}</p>
           </CardContent>
         </Card>
      </div>

      {/* Quick Actions & Active Investments */}
      <div className="grid gap-6 md:grid-cols-2">
         {/* Quick Actions */}
         <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                 <CardDescription>Start a new investment or manage your existing portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                 {/* Link now directs to crypto selection page */}
                 <Button asChild className="flex-1"><Link href="/crypto-invest">New Investment / Deposit</Link></Button>
                 <Button variant="outline" asChild className="flex-1"><Link href="/dashboard/portfolio">View Portfolio</Link></Button>
            </CardContent>
         </Card>

        {/* Active Investments Summary */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Active Investment Plans</CardTitle>
            <CardDescription>Overview of your ongoing investments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeInvestments.length > 0 ? (
              activeInvestments.map((investment) => (
                <div key={investment.id} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{investment.plan}</span>
                    <span className="text-muted-foreground">${investment.currentValue.toLocaleString()} / ${investment.invested.toLocaleString()}</span>
                  </div>
                  <Progress value={investment.progress} aria-label={`${investment.plan} progress`} className="h-2"/>
                   <p className="text-xs text-muted-foreground text-right">{investment.progress}% complete</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No active investments.</p>
            )}
             <Button variant="link" className="p-0 h-auto mt-2 text-sm" asChild><Link href="/dashboard/portfolio">View All Details</Link></Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activities.</CardDescription>
          </CardHeader>
          <CardContent>
              {recentTransactions.length > 0 ? (
                  <ul className="space-y-3">
                      {recentTransactions.map((txn) => (
                          <li key={txn.id} className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
                              <div className="flex items-center gap-3">
                                   <span className={`font-medium ${txn.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {txn.type}
                                   </span>
                                   <span className="text-muted-foreground text-xs">({txn.method})</span>
                              </div>
                              <div className="text-right">
                                 <span className={`font-semibold ${txn.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                     {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString()}
                                 </span>
                                  <p className="text-xs text-muted-foreground">
                                       {txn.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                       {' - '}
                                       {txn.date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                   </p>
                               </div>
                               {/* <Badge variant={txn.status === 'Completed' ? 'default' : 'secondary'} className="hidden sm:inline-flex">{txn.status}</Badge> */}
                           </li>
                       ))}
                   </ul>
               ) : (
                   <p className="text-sm text-muted-foreground text-center py-4">No recent transactions to display.</p>
               )}
              <Button variant="link" className="p-0 h-auto mt-4 text-sm" asChild><Link href="/dashboard/transactions">View All Transactions</Link></Button>
          </CardContent>
      </Card>


      {/* Placeholder for Charts or other data visualizations */}
       {/* <Card>
         <CardHeader>
           <CardTitle>Portfolio Performance</CardTitle>
         </CardHeader>
         <CardContent>
           {/* Use ShadCN charts here if needed */}
           {/* <div className="h-64 bg-muted rounded flex items-center justify-center text-muted-foreground">
             Chart Placeholder
           </div>
         </CardContent>
       </Card> */}
    </div>
  );
}
