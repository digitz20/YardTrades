
'use client'; // Add 'use client' because we need hooks (useRouter)

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home, Menu } from 'lucide-react'; // Import icons
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Import Sheet components for mobile

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Get current path for title

  // Function to generate a user-friendly title from the pathname
  const getPageTitle = (path: string): string => {
    const segments = path.split('/').filter(Boolean); // Remove empty segments
    if (segments.length <= 1) return 'Dashboard'; // Default for /dashboard
    const lastSegment = segments[segments.length - 1];
    // Capitalize first letter and replace dashes with spaces
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-muted/40">
      {/* Sidebar Container for Desktop - Fixed width */}
       <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0"> {/* Fixed width sidebar */}
         <DashboardSidebar />
       </div>

       {/* Main Content Area - Adjusted margin for fixed sidebar */}
       <main className="flex flex-1 flex-col md:ml-64"> {/* Add left margin equal to sidebar width */}
         {/* Dashboard Top Bar */}
         <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
            {/* Mobile Sidebar Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                 <Button variant="outline" size="icon" className="shrink-0 md:hidden" aria-label="Toggle navigation menu">
                    <Menu className="h-5 w-5" />
                 </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0 w-64"> {/* Apply sidebar styles */}
                 {/* Re-render sidebar content inside sheet */}
                 <DashboardSidebar />
              </SheetContent>
           </Sheet>

            {/* Navigation and Title */}
            <div className="flex items-center gap-2 flex-1">
               <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:inline-flex" onClick={() => router.back()} aria-label="Go back">
                 <ArrowLeft className="h-4 w-4" />
               </Button>
               <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:inline-flex" onClick={() => router.forward()} aria-label="Go forward">
                 <ArrowRight className="h-4 w-4" />
               </Button>
                <h1 className="font-semibold text-lg ml-2 md:ml-0">{pageTitle}</h1> {/* Display dynamic page title */}
            </div>

            {/* Optional: User Menu/Actions on the right */}
            <div className="flex items-center gap-4 md:ml-auto">
                {/* Example: Back to main site button */}
               <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/')} aria-label="Back to Homepage">
                 <Home className="h-4 w-4" />
               </Button>
               {/* Add User Dropdown/Avatar here */}
            </div>
         </header>

         {/* Page Content */}
         <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto"> {/* Increased padding */}
            {children}
         </div>
       </main>
     </div>
  );
}
