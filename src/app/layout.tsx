import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'NovaxTrades Clone', // Updated Title
  description: 'Crypto Trading Information Dashboard', // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply dark theme by default via globals.css @layer base html directive
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
          // Removed Inter font variable application as it wasn't strictly necessary for the new design
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
