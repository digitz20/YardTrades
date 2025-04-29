
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react'; // Import Loader2 for loading state
// Placeholder for authentication hook/state - replace with actual implementation
// import { useAuth } from '@/hooks/use-auth';

export default function InvestmentPageRedirect() {
  const router = useRouter();
  // Placeholder for authentication check - replace with actual logic
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true; // Simulate logged-in state since this is a dashboard route

  // Redirect based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      // If logged in, redirect to the crypto selection page
      router.replace('/crypto-invest'); // Use replace to avoid adding to history stack
    } else {
      // If not logged in (hypothetical for dashboard routes), redirect to homepage
      router.replace('/');
    }
  }, [router, isAuthenticated]);

  // Render a loading or redirecting message while the redirect happens
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
       <h1 className="text-2xl font-bold tracking-tight">Redirecting...</h1>
       <Card className="max-w-md text-center">
           <CardHeader>
                <CardTitle>Checking Investment Options</CardTitle>
                <CardDescription>Please wait while we direct you to the appropriate page.</CardDescription>
            </CardHeader>
           <CardContent>
               <p className="text-sm text-muted-foreground mb-4">
                   {isAuthenticated
                     ? 'Taking you to the cryptocurrency selection page.'
                     : 'Redirecting to homepage.'}
               </p>
                {isAuthenticated ? (
                  <Button variant="outline" asChild>
                     <Link href="/crypto-invest">Go to Crypto Investment Page</Link>
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                     <Link href="/">Go to Homepage</Link>
                  </Button>
                )}
           </CardContent>
        </Card>
    </div>
  );
}
