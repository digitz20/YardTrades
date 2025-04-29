
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Bitcoin, CircleHelp, ShieldCheck, DollarSign, ArrowLeft, AlertTriangle } from 'lucide-react'; // Added AlertTriangle, removed Landmark
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


// Placeholder Crypto Data (Replace with your actual addresses if needed)
const cryptoOptions = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1qqku6e3qxyhlv5fvjaxazt0v5f5mf77lzt0ymm0', // Updated BTC Address
    icon: Bitcoin, // Use Lucide icon
    network: 'Bitcoin Network',
    note: 'Ensure you send BTC via the Bitcoin network.',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x328bEaba35Eb07C1D4C82b19cE36A7345ED52C54', // Updated ETH Address
    // Use a generic icon or create/import an SVG for ETH
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-8 w-8 text-primary fill-current"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/></svg>, // Basic ETH-like SVG
    network: 'Ethereum Network (ERC-20)',
    note: 'Send only ETH via the ERC-20 network.',
  },
  {
    name: 'Tether (ERC20)',
    symbol: 'USDT',
    address: '0x328bEaba35Eb07C1D4C82b19cE36A7345ED52C54', // Updated USDT ERC20 Address
    icon: DollarSign, // Using DollarSign for USDT
    network: 'Ethereum Network (ERC-20)',
    note: 'Send only USDT via the ERC-20 network.',
  },
   {
    name: 'Tether (TRC20)',
    symbol: 'USDT',
    address: 'THycvE5TKFTLv4nZsq8SJJCYhDmvysSLyk', // Updated USDT TRC20 Address
    icon: DollarSign, // Using DollarSign for USDT
    network: 'Tron Network (TRC-20)',
    note: 'Send only USDT via the TRC-20 network.',
  },
   {
    name: 'Litecoin',
    symbol: 'LTC',
    address: 'ltc1q7jl2al4caanc0k5zgsz3e399agfklk75nz46kf', // Updated LTC Address
    icon: CircleHelp, // Placeholder icon for LTC (consider finding a better one or using SVG)
    network: 'Litecoin Network',
    note: 'Ensure you send LTC via the Litecoin network.',
  },
];

export default function CryptoInvestPage() {
  const { toast } = useToast();

  const handleCopyAddress = (address: string, name: string) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        toast({
          title: "Address Copied!",
          description: `${name} address (${address.substring(0, 6)}...${address.substring(address.length - 4)}) copied successfully.`,
          variant: "default",
        });
      })
      .catch(err => {
        console.error('Failed to copy address: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy address automatically. Please copy it manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="bg-background text-foreground py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
           <div className="mb-6">
              <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard" aria-label="Go back to Dashboard">
                     <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                  </Link>
              </Button>
            </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Invest with Cryptocurrency</h1>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Deposit cryptocurrency directly using the wallet addresses below to fund your Yard Trades investment account. Please double-check the network and address before sending.
          </p>

          {/* Important Security Notice */}
          <Alert variant="destructive" className="mb-8 border-red-500/50 bg-red-900/10 text-red-400">
              <AlertTriangle className="h-5 w-5 text-red-500" /> {/* Use AlertTriangle */}
             <AlertTitle className="font-semibold text-red-400">Important Security Notice</AlertTitle>
             <AlertDescription className="text-red-300/90">
                Always double-check the wallet address and ensure you are sending funds on the **correct network** specified below. Sending cryptocurrency to the wrong address or network may result in the **permanent loss of your funds**. Yard Trades cannot recover funds sent incorrectly. Proceed with caution.
             </AlertDescription>
           </Alert>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cryptoOptions.map((crypto) => {
                const IconComponent = crypto.icon; // Get the icon component or function
                return (
                  <Card key={`${crypto.symbol}-${crypto.network}`} className="bg-card border border-border/50 shadow-sm overflow-hidden flex flex-col"> {/* Ensure card takes full height */}
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 pt-4 px-4 bg-muted/30 border-b border-border/40">
                      <div className="flex items-center gap-3">
                         <IconComponent /> {/* Render the icon */}
                        <div>
                           <CardTitle className="text-xl">{crypto.name}</CardTitle>
                           <CardDescription className="text-xs">{crypto.network}</CardDescription>
                        </div>
                      </div>
                       {/* Optional: QR Code (implement QR generation library if needed) */}
                       {/* <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">QR</div> */}
                    </CardHeader>
                    <CardContent className="p-4 flex-grow flex flex-col justify-between"> {/* Use flex-grow */}
                      <div>
                         <Label htmlFor={`${crypto.symbol}-${crypto.network}-address`} className="text-xs font-medium text-muted-foreground block mb-1">
                           Deposit Address ({crypto.symbol}):
                         </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`${crypto.symbol}-${crypto.network}-address`}
                            type="text"
                            value={crypto.address}
                            readOnly
                            className="flex-grow text-sm font-mono bg-muted/50 border-border/60 focus:ring-primary/50" // Added focus style
                            aria-label={`${crypto.name} deposit address`}
                          />
                           <TooltipProvider delayDuration={200}>
                             <Tooltip>
                               <TooltipTrigger asChild>
                                 <Button
                                   variant="outline"
                                   size="icon"
                                   onClick={() => handleCopyAddress(crypto.address, crypto.name)}
                                   aria-label={`Copy ${crypto.name} address`}
                                   className="shrink-0"
                                 >
                                   <Copy className="h-4 w-4" />
                                 </Button>
                               </TooltipTrigger>
                               <TooltipContent>
                                 <p>Copy Address</p>
                               </TooltipContent>
                             </Tooltip>
                           </TooltipProvider>
                        </div>
                         {crypto.note && (
                            <p className="text-xs text-muted-foreground mt-3 italic">{crypto.note}</p>
                         )}
                      </div>
                       {/* Add minimum deposit info if available */}
                       {/* <p className="text-xs text-muted-foreground mt-2">Minimum deposit: 0.001 {crypto.symbol}</p> */}
                    </CardContent>
                  </Card>
                )
            })}
          </div>

           {/* After Depositing Instructions */}
           <Card className="mt-10 bg-secondary/30 border border-border/40">
                <CardHeader>
                    <CardTitle>Important Steps After Depositing</CardTitle>
                    <CardDescription>Follow these steps once you have sent your cryptocurrency.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Allow sufficient time for network confirmations. This varies by cryptocurrency (Bitcoin can take longer than Ethereum or Tron).</li>
                        <li>Once confirmed on the blockchain, your deposit will be reviewed and credited to your Yard Trades account balance.</li>
                        <li>You can then proceed to the <Button variant="link" className="p-0 h-auto inline-block text-primary" asChild><Link href="/dashboard/portfolio">Portfolio page</Link></Button> to view your balance and allocate funds to an investment plan if desired.</li>
                        <li>If your deposit doesn't reflect within a reasonable timeframe (e.g., several hours), please <Button variant="link" className="p-0 h-auto inline-block text-primary" asChild><Link href="/contact">contact support</Link></Button> with your Transaction ID/Hash and deposit details.</li>
                    </ol>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
