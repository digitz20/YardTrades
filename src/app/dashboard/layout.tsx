
'use client'; // Add 'use client' because we need hooks (useRouter)

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { DashboardSidebar } from '@/components/dashboard-sidebar';
// import { Header } from '@/components/header'; // Header likely not needed in dashboard layout
// import { Footer } from '@/components/footer'; // Footer likely not needed in dashboard layout
import { Button } from '@/components/ui/button'; // Import Button
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Import icons

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
       {/* Optional: Keep Header/Footer or replace with Dashboard specific ones */}
       {/* <Header /> */}
       <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col bg-muted/40"> {/* Use flex-col */}
           {/* Dashboard Top Bar for Navigation */}
           <div className="flex items-center justify-start gap-2 border-b bg-background p-2 px-4 sticky top-0 z-10">
              <Button variant="outline" size="icon" onClick={() => router.back()} aria-label="Go back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => router.forward()} aria-label="Go forward">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
           {/* Main Content Area */}
           <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto"> {/* Add overflow for scrolling */}
              {children}
           </div>
        </main>
      </div>
       {/* <Footer /> */}
    </div>
  );
}
