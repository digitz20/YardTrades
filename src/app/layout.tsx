
import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/footer'; // Import Footer
import { Header } from '@/components/header'; // Import Header

export const metadata: Metadata = {
  title: 'YardTrades - Secure & Profitable Investments', // Updated Title
  description: 'Invest with confidence. YardTrades offers secure, high-yield investment plans tailored for your financial growth. Start building your future today.', // Updated Description
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
          "min-h-screen bg-background font-sans antialiased flex flex-col" // Added flex flex-col
        )}
      >
        <Header /> {/* Add Header */}
        <div className="flex-grow"> {/* Added flex-grow wrapper */}
          {children}
        </div>
        <Footer /> {/* Add Footer */}
        <Toaster />
      </body>
    </html>
  );
}
