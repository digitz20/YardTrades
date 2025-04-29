
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock Data (Replace with actual data fetching)
const summaryData = {
  totalBalance: 12345.67,
  totalProfit: 1500.00,
  activeInvestments: 3,
  recentActivity: 'Withdrawal processed',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryData.totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+${summaryData.totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Since joining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.activeInvestments}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{summaryData.recentActivity}</div>
            <p className="text-xs text-muted-foreground">Moments ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions or other sections */}
      <div className="grid gap-4 md:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                 <CardDescription>Start a new investment or manage your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                 <Button asChild>
                    <Link href="/dashboard/investment">New Investment</Link>
                 </Button>
                 <Button variant="outline" asChild>
                    <Link href="/dashboard/portfolio">View Portfolio</Link>
                </Button>
            </CardContent>
         </Card>

         <Card>
             <CardHeader>
                 <CardTitle>Recent Transactions</CardTitle>
                 <CardDescription>Latest deposits and withdrawals.</CardDescription>
             </CardHeader>
             <CardContent>
                 {/* Placeholder for recent transactions list */}
                 <p className="text-sm text-muted-foreground">No recent transactions to display.</p>
                 <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <Link href="/dashboard/transactions">View All Transactions</Link>
                 </Button>
             </CardContent>
         </Card>
      </div>

      {/* Placeholder for Charts or other data visualizations */}
       {/* <Card>
         <CardHeader>
           <CardTitle>Performance Chart</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="h-64 bg-muted rounded flex items-center justify-center">
             Chart Placeholder
           </div>
         </CardContent>
       </Card> */}
    </div>
  );
}
