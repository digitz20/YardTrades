
'use client';

import React from 'react';
import Link from 'next/link'; // Added import for Link
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Bitcoin, CircleHelp, ShieldCheck } from 'lucide-react'; // Import ShieldCheck
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


// Placeholder Crypto Data (Replace with your actual addresses)
const cryptoOptions = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', // Example BTC Address
    icon: Bitcoin, // Use Lucide icon
    network: 'Bitcoin Network',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x1234567890abcdef1234567890abcdef12345678', // Example ETH Address
    icon: Bitcoin, // Replace with appropriate icon if available, using Bitcoin as fallback
    network: 'Ethereum Network (ERC-20)',
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    address: 'TRC20_ADDRESS_GOES_HERE_EXAMPLE_TETHER', // Example USDT TRC20 Address
    icon: CircleHelp, // Placeholder icon
    network: 'Tron Network (TRC-20)',
  },
  // Add more cryptocurrencies as needed
];

export default function CryptoInvestPage() {
  const { toast } = useToast();

  const handleCopyAddress = (address: string, name: string) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        toast({
          title: "Address Copied!",
          description: `${name} address copied to clipboard.`,
          variant: "default",
        });
      })
      .catch(err => {
        console.error('Failed to copy address: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy address. Please try again manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Invest with Cryptocurrency</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Deposit cryptocurrency directly to our wallet addresses below to fund your Yard Trades investment account. Ensure you select the correct network.
          </p>

          {/* Important Notice */}
          <Alert variant="destructive" className="mb-8">
              <ShieldCheck className="h-4 w-4" /> {/* Use imported ShieldCheck */}
             <AlertTitle>Important Security Notice</AlertTitle>
             <AlertDescription>
                Always double-check the wallet address and ensure you are sending funds on the correct network. Sending to the wrong address or network may result in permanent loss of funds. Yard Trades is not responsible for funds sent incorrectly.
             </AlertDescription>
           </Alert>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cryptoOptions.map((crypto) => (
              <Card key={crypto.symbol} className="bg-card border border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div className="flex items-center gap-3">
                     <crypto.icon className="h-8 w-8 text-primary" />
                    <div>
                       <CardTitle className="text-xl">{crypto.name} ({crypto.symbol})</CardTitle>
                       <CardDescription className="text-xs">{crypto.network}</CardDescription>
                    </div>
                  </div>
                   {/* Optional: QR Code placeholder */}
                   {/* <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">QR</div> */}
                </CardHeader>
                <CardContent>
                   <Label htmlFor={`${crypto.symbol}-address`} className="text-xs font-medium text-muted-foreground block mb-1">
                     Deposit Address:
                   </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`${crypto.symbol}-address`}
                      type="text"
                      value={crypto.address}
                      readOnly
                      className="flex-grow text-sm font-mono bg-muted/50"
                      aria-label={`${crypto.name} deposit address`}
                    />
                     <TooltipProvider>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <Button
                             variant="outline"
                             size="icon"
                             onClick={() => handleCopyAddress(crypto.address, crypto.name)}
                             aria-label={`Copy ${crypto.name} address`}
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
                   {/* Add any specific instructions or minimum deposit info here */}
                   {/* <p className="text-xs text-muted-foreground mt-2">Minimum deposit: 0.001 {crypto.symbol}</p> */}
                </CardContent>
              </Card>
            ))}
          </div>

           <Card className="mt-8 bg-secondary/30">
                <CardHeader>
                    <CardTitle>After Depositing</CardTitle>
                    <CardDescription>Important steps after you send your crypto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>1. Please allow sufficient time for blockchain confirmations (this can vary depending on the network).</p>
                    <p>2. Once confirmed, your deposit will be credited to your Yard Trades account balance.</p>
                    <p>3. You can then proceed to the <Button variant="link" className="p-0 h-auto inline-block" asChild><Link href="/dashboard/investment">Investment page</Link></Button> in your dashboard to allocate the funds to a plan.</p>
                    <p>4. If your deposit doesn't reflect after a reasonable time, please <Button variant="link" className="p-0 h-auto inline-block" asChild><Link href="/contact">contact support</Link></Button> with your transaction details (Transaction ID/Hash).</p>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}

