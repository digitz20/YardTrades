
import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/footer'; // Import Footer
import { Header } from '@/components/header'; // Import Header

export const metadata: Metadata = {
  title: 'YardTrades - Secure & Profitable Investments', // Updated Title
  description: 'Invest with confidence. YardTrades offers secure, high-yield investment plans tailored for your financial growth. Start building your future today.', // Updated Description
  // Consider adding Open Graph and Twitter card metadata for better social sharing
  // openGraph: {
  //   title: 'YardTrades - Secure & Profitable Investments',
  //   description: 'Invest with confidence and achieve your financial goals.',
  //   url: 'https://your-domain.com', // Replace with your actual domain
  //   siteName: 'YardTrades',
  //   images: [
  //     {
  //       url: 'https://your-domain.com/og-image.png', // Replace with your OG image URL
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'YardTrades - Secure & Profitable Investments',
  //   description: 'Invest with confidence and achieve your financial goals.',
  //   // site: '@yourtwitterhandle', // Replace with your Twitter handle
  //   // creator: '@creatorhandle', // Replace if applicable
  //   images: ['https://your-domain.com/twitter-image.png'], // Replace with your Twitter image URL
  // },
  // icons: { // Add favicon links
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png', // Example sizes
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply dark theme by default via globals.css @layer base html directive
    <html lang="en" suppressHydrationWarning className="dark">{/* Ensure dark class is on html and no whitespace follows */}
      {/* Removed whitespace here */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col"
        )}
      >
        <Header /> {/* Header remains at the top */}
        <main className="flex-grow"> {/* Use main tag for semantic content */}
          {children}
        </main>
        <Footer /> {/* Footer remains at the bottom */}
        <Toaster /> {/* Toaster for notifications */}
      </body>
    </html>
  );
}
