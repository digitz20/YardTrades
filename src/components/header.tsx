
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Removed Separator as it wasn't used according to the reference design
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react'; // Keeping the TrendingUp icon as per previous request

// Updated nav items based on YardTrades reference
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

export function Header() {
  // Basic active state simulation can be added using usePathname hook if needed
  // const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center"> {/* Use max-w-screen-2xl for wider screens */}
        {/* Logo/Brand Link */}
        <Link href="/" className="mr-6 flex items-center space-x-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
           <TrendingUp className="h-6 w-6" />
           <span className="font-bold text-xl text-foreground sm:inline-block">
            YardTrades
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium"> {/* Slightly adjusted spacing */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              // Example of active state using pathname (uncomment if usePathname is imported)
              // className={cn(
              //   'transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1',
              //   pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              // )}
              className={cn(
                 'transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1',
                 'text-muted-foreground' // Default state
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login/Sign Up Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-3"> {/* Adjusted spacing */}
          <Button variant="outline" size="sm" asChild><Link href="/login">Login</Link></Button>
          <Button size="sm" asChild><Link href="/signup">Sign Up</Link></Button>
          {/* Mobile Menu Trigger (Consider adding Sheet component for mobile) */}
          {/*
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-primary">{item.name}</Link>
                ))}
                <Separator />
                <Button variant="outline" asChild><Link href="/login">Login</Link></Button>
                <Button asChild><Link href="/signup">Sign Up</Link></Button>
              </nav>
            </SheetContent>
          </Sheet>
          */}
        </div>
      </div>
    </header>
  );
}
