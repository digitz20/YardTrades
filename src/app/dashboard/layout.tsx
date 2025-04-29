
import React from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar'; // Assuming you create this component
import { Header } from '@/components/header'; // Keep header for consistency, or remove if dashboard has its own top bar
import { Footer } from '@/components/footer'; // Keep footer, or remove if not needed in dashboard

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
       {/* Optional: Keep Header/Footer or replace with Dashboard specific ones */}
       {/* <Header /> */}
       <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 bg-muted/40">
          {children}
        </main>
      </div>
       {/* <Footer /> */}
    </div>
  );
}
