"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react'; // Using Activity as a placeholder logo icon

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Trading Plans', href: '#' },
  { name: 'Sign Up', href: '#' },
];

export function Header() {
  // Basic active state simulation - in a real app, use router path
  const [activeNav, setActiveNav] = React.useState('Home');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo Placeholder */}
        <Link href="/" className="mr-6 flex items-center space-x-2 text-primary">
           <Activity className="h-6 w-6" />
           <span className="font-bold text-foreground sm:inline-block">
            NovaxTrades
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveNav(item.name)}
              className={cn(
                'transition-colors hover:text-primary',
                activeNav === item.name ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button size="sm">Login</Button>
          {/* Mobile Menu Trigger (Optional - Add later if needed) */}
          {/* <Button variant="outline" size="icon" className="md:hidden">...</Button> */}
        </div>
      </div>
       <Separator className="bg-border/40" />
    </header>
  );
}
