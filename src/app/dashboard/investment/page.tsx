
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react'; // Import Loader2 for loading state

export default function InvestmentPageRedirect() {
  const router = useRouter();

  // Redirect to the crypto investment page immediately on component mount
  useEffect(() => {
    router.replace('/crypto-invest'); // Use replace to avoid adding to history stack
  }, [router]);

  // Render a loading or redirecting message while the redirect happens
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
       <h1 className="text-2xl font-bold tracking-tight">Redirecting to Investment Options...</h1>
       <Card className="max-w-md text-center">
           <CardHeader>
                <CardTitle>Choosing Your Investment</CardTitle>
                <CardDescription>We are taking you to the page where you can select your cryptocurrency for investment.</CardDescription>
            </CardHeader>
           <CardContent>
               <p className="text-sm text-muted-foreground mb-4">
                    Investment plans are initiated by depositing cryptocurrency. Please select your preferred crypto on the next page.
               </p>
                <Button variant="outline" asChild>
                   <Link href="/crypto-invest">Go to Crypto Investment Page</Link>
                </Button>
           </CardContent>
        </Card>
    </div>
  );
}
