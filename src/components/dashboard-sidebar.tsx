
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CandlestickChart,
  Settings,
  ShieldCheck,
  LogOut,
  TrendingUp, // Changed icon import
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Wallet },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowLeftRight },
  { name: 'Investment', href: '/dashboard/investment', icon: CandlestickChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Security', href: '/dashboard/security', icon: ShieldCheck },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleLogout = () => {
    // Add any actual logout logic here (e.g., clearing tokens, API calls)
    console.log('Logging out...');
    router.push('/'); // Redirect to homepage
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background p-4">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-2 mb-6 px-2">
         <Link href="/dashboard" className="flex items-center space-x-2 text-primary">
           <TrendingUp className="h-6 w-6" /> {/* Changed icon */}
           <span className="font-bold text-lg text-foreground">
             Yard Trades
           </span>
         </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.name}
            asChild // Use Button asChild to wrap Link
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start',
              pathname === item.href
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            )}
           ><Link href={item.href}> {/* Link is the direct child */}
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link></Button>
        ))}
      </nav>

      {/* Footer Section */}
      <Separator className="my-4" />
      <div className="mt-auto space-y-1">
         {/* Logout Button */}
         <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout} // Add onClick handler
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </div>
    </aside>
  );
}
