
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TrendingUp, Menu } from 'lucide-react'; // Added Menu icon for mobile
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Import Sheet components for mobile
import { Separator } from '@/components/ui/separator'; // Import Separator for mobile menu
import { usePathname } from 'next/navigation'; // Import usePathname for active state and mobile menu close

// Updated nav items based on YardTrades reference
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-6"> {/* Consistent height and padding */}
        {/* Logo/Brand Link */}
        <Link href="/" className="mr-4 flex items-center space-x-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm shrink-0"> {/* Added shrink-0 */}
           <TrendingUp className="h-6 w-6" />
           <span className="font-bold text-xl text-foreground hidden sm:inline-block"> {/* Hide text on very small screens */}
            YardTrades
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium ml-6"> {/* Added ml-6 for spacing */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                 'transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1 py-1', // Added padding
                 pathname === item.href ? 'text-primary font-semibold' : 'text-muted-foreground' // Active state
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login/Sign Up Buttons & Mobile Menu Trigger */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-3"> {/* Adjusted spacing */}
          {/* Login/Signup Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild><Link href="/login">Login</Link></Button>
            <Button size="sm" asChild><Link href="/signup">Sign Up</Link></Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0"> {/* Adjusted width and padding */}
                {/* Mobile Menu Header */}
                <div className="flex h-16 items-center border-b px-4">
                     <Link href="/" className="flex items-center gap-2 font-semibold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                       <TrendingUp className="h-6 w-6" />
                       <span className="text-lg text-foreground">Yard Trades</span>
                     </Link>
                 </div>
                 {/* Mobile Menu Navigation */}
                 <nav className="flex flex-col space-y-2 p-4">
                   {navItems.map((item) => (
                     <Button
                        key={item.name}
                        asChild
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className={cn(
                            'w-full justify-start text-base', // Larger text for mobile
                            pathname === item.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                     >
                       <Link href={item.href}>{item.name}</Link>
                     </Button>
                   ))}
                   <Separator className="my-4" /> {/* Separator */}
                   <Button variant="outline" className="w-full justify-center" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/login">Login</Link>
                   </Button>
                   <Button className="w-full justify-center" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/signup">Sign Up</Link>
                   </Button>
                 </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
