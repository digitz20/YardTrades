
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react'; // Changed icon import

// Updated nav items based on YardTrades reference
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

export function Header() {
  // Basic active state simulation - replace with actual router logic if needed
  // For simplicity, we'll remove the active state styling for now
  // const [activeNav, setActiveNav] = React.useState('Home');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center"> {/* Increased height slightly */}
        {/* Logo Placeholder */}
        <Link href="/" className="mr-6 flex items-center space-x-2 text-primary">
           <TrendingUp className="h-6 w-6" /> {/* Changed icon */}
           <span className="font-bold text-xl text-foreground sm:inline-block">
            YardTrades
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-8 text-sm font-medium"> {/* Increased spacing */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              // onClick={() => setActiveNav(item.name)} // Removed active state for simplicity
              className={cn(
                'transition-colors hover:text-primary',
                'text-muted-foreground' // Default color for nav links
                // activeNav === item.name ? 'text-primary' : 'text-muted-foreground' // Removed active state styling
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login/Sign Up Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
             <Link href="/signup">Sign Up</Link>
          </Button>
          {/* Mobile Menu Trigger (Optional - Add later if needed) */}
          {/* <Button variant="outline" size="icon" className="md:hidden">...</Button> */}
        </div>
      </div>
       {/* Removed separator for a cleaner look like the reference */}
       {/* <Separator className="bg-border/40" /> */}
    </header>
  );
}
