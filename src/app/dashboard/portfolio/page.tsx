
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, BarChart } from 'lucide-react';

// Mock Data (Replace with actual data fetching)
const portfolioData = {
  totalValue: 12345.67,
  totalInvested: 10000.00,
  overallProfit: 2345.67,
  holdings: [
    { id: 'inv001', plan: 'Gold Plan', invested: 5000, currentValue: 5800, profit: 800, status: 'Active' },
    { id: 'inv002', plan: 'Silver Plan', invested: 3000, currentValue: 3450, profit: 450, status: 'Active' },
    { id: 'inv003', plan: 'Starter Plan', invested: 500, currentValue: 550, profit: 50, status: 'Completed' },
    { id: 'inv004', plan: 'Gold Plan', invested: 1500, currentValue: 1545.67, profit: 45.67, status: 'Active' },
  ],
};

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>

      {/* Portfolio Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current market value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.totalInvested.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">Initial capital deployed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Profit/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioData.overallProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioData.overallProfit >= 0 ? '+' : ''}${portfolioData.overallProfit.toLocaleString()}
            </div>
             <p className="text-xs text-muted-foreground">Total returns generated</p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
          <CardDescription>Detailed view of your active and completed investments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Invested</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">Profit/Loss</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioData.holdings.length > 0 ? (
                portfolioData.holdings.map((holding) => (
                  <TableRow key={holding.id}>
                    <TableCell className="font-medium">{holding.plan}</TableCell>
                    <TableCell className="text-right">${holding.invested.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${holding.currentValue.toLocaleString()}</TableCell>
                    <TableCell className={`text-right font-medium ${holding.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.profit >= 0 ? '+' : ''}${holding.profit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={holding.status === 'Active' ? 'default' : 'secondary'}>
                        {holding.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    You have no investments yet.
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
