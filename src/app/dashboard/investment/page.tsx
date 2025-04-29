
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle, DollarSign, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock investment plan data (similar to homepage, but maybe with more details for selection)
const investmentPlans = [
  {
    id: 'starter',
    title: 'Starter Plan',
    minDeposit: 100,
    maxDeposit: 999,
    duration: '24 Hours',
    roi: '10%',
    features: ['Instant Withdrawal', '24/7 Support'],
  },
  {
    id: 'silver',
    title: 'Silver Plan',
    minDeposit: 1000,
    maxDeposit: 4999,
    duration: '48 Hours',
    roi: '25%',
    features: ['Instant Withdrawal', '24/7 Support', 'Dedicated Manager'],
  },
  {
    id: 'gold',
    title: 'Gold Plan',
    minDeposit: 5000,
    maxDeposit: 100000,
    duration: '72 Hours',
    roi: '60%',
    features: ['Instant Withdrawal', '24/7 Support', 'Dedicated Manager', 'Premium Signals'],
  },
];

export default function InvestmentPage() {
  const { toast } = useToast();
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlan = investmentPlans.find(plan => plan.id === selectedPlanId);
  const amountNumber = parseFloat(amount);
  const isAmountValid = selectedPlan && !isNaN(amountNumber) && amountNumber >= selectedPlan.minDeposit && amountNumber <= selectedPlan.maxDeposit;
  const canInvest = selectedPlan && isAmountValid && !isProcessing;

  const handleInvest = async () => {
    if (!canInvest) return;

    setIsProcessing(true);
    console.log(`Investing ${amount} in ${selectedPlan?.title}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Investment Successful!",
      description: `You have invested $${amount} in the ${selectedPlan?.title}.`,
      variant: "default",
    });

    // Reset form
    setSelectedPlanId(undefined);
    setAmount('');
    setIsProcessing(false);
    // Optionally redirect or update user balance display
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Make an Investment</h1>
      <p className="text-muted-foreground">Choose an investment plan and enter the amount you wish to invest.</p>

      {/* Plan Selection and Investment Form Card */}
       <Card className="max-w-2xl mx-auto">
         <CardHeader>
           <CardTitle>Select Plan & Amount</CardTitle>
           <CardDescription>Choose from our available plans and specify your investment amount.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Plan Selection Dropdown */}
           <div className="space-y-2">
             <Label htmlFor="investment-plan">Investment Plan</Label>
             <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
               <SelectTrigger id="investment-plan" className="w-full">
                 <SelectValue placeholder="Select a plan" />
               </SelectTrigger>
               <SelectContent>
                 {investmentPlans.map((plan) => (
                   <SelectItem key={plan.id} value={plan.id}>
                     {plan.title} (Min: ${plan.minDeposit}, Max: ${plan.maxDeposit}, ROI: {plan.roi})
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>

            {/* Display Selected Plan Details */}
           {selectedPlan && (
             <Card className="bg-muted/50 p-4">
               <p className="text-sm font-medium mb-1">{selectedPlan.title} Details:</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Min Deposit: ${selectedPlan.minDeposit.toLocaleString()}</li>
                  <li>Max Deposit: ${selectedPlan.maxDeposit.toLocaleString()}</li>
                   <li>Duration: {selectedPlan.duration}</li>
                   <li>Return on Investment: {selectedPlan.roi}</li>
                   {selectedPlan.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
                </ul>
             </Card>
           )}

           {/* Investment Amount Input */}
           {selectedPlan && (
              <div className="space-y-2">
                <Label htmlFor="investment-amount">Amount to Invest ($)</Label>
                 <Input
                   id="investment-amount"
                   type="number"
                   placeholder={`Enter amount between ${selectedPlan.minDeposit} and ${selectedPlan.maxDeposit}`}
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   min={selectedPlan.minDeposit}
                   max={selectedPlan.maxDeposit}
                   step="0.01" // Allow decimals if needed
                   className={!isAmountValid && amount !== '' ? 'border-red-500' : ''}
                 />
                 {!isAmountValid && amount !== '' && (
                   <p className="text-xs text-red-600">
                     Please enter an amount between ${selectedPlan.minDeposit} and ${selectedPlan.maxDeposit}.
                   </p>
                 )}
               </div>
            )}
         </CardContent>
         <CardFooter>
           <Button onClick={handleInvest} disabled={!canInvest} className="w-full">
             {isProcessing ? 'Processing Investment...' : 'Invest Now'}
           </Button>
         </CardFooter>
       </Card>


       {/* Investment Plans Overview (Read-only) - Optional */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Available Investment Plans</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {investmentPlans.map((plan) => (
             <Card key={plan.id} className="bg-card border border-border/50 shadow-sm flex flex-col">
               <CardHeader className="bg-muted/30 p-4">
                 <CardTitle className="text-xl font-semibold text-primary">{plan.title}</CardTitle>
                 <CardDescription>Min: ${plan.minDeposit} | Max: ${plan.maxDeposit}</CardDescription>
               </CardHeader>
               <CardContent className="p-4 flex-grow">
                 <div className="text-3xl font-bold mb-3">{plan.roi} <span className="text-base font-normal text-muted-foreground">ROI</span></div>
                 <p className="text-muted-foreground mb-4 text-sm flex items-center"><Clock className="h-4 w-4 mr-1.5" /> Duration: {plan.duration}</p>
                 <ul className="space-y-1.5 text-sm">
                   {plan.features.map((feature, fIndex) => (
                     <li key={fIndex} className="flex items-center gap-2">
                       <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
               </CardContent>
                {/* Footer can show a 'Learn More' or 'Select' button if needed, but selection is done above */}
                {/* <CardFooter className="p-4">
                    <Button variant="outline" className="w-full" onClick={() => setSelectedPlanId(plan.id)}>
                        Select Plan
                    </Button>
                 </CardFooter> */}
             </Card>
           ))}
         </div>
      </div>
    </div>
  );
}
