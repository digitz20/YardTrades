
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CandlestickChart, // Consider changing icon if 'Investment' means plan selection
  Settings,
  ShieldCheck,
  LogOut,
  TrendingUp,
  Home, // Added Home icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar

// Define navigation items
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Wallet },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowLeftRight },
  { name: 'Investment', href: '/dashboard/investment', icon: CandlestickChart }, // This links to crypto-invest page now
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Security', href: '/dashboard/security', icon: ShieldCheck },
];

// Mock user data (replace with actual authentication context/state)
const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/user_avatar/40/40', // Placeholder
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add actual logout logic here (e.g., clearing tokens, API calls)
    console.log('Logging out...');
    // Redirect to homepage after logout
    router.push('/');
  };

  // Determine if the current item is active or a parent of the active item
  const isActive = (href: string) => {
    // Exact match or if the current path starts with the href (for nested routes)
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  return (
    // The parent Sheet component in layout handles visibility on mobile
    // This component structure remains the same for both desktop and mobile Sheet display
    <aside className="flex h-full flex-col border-r bg-background"> {/* Changed hidden md:flex */}
      {/* Header Section */}
       <div className="flex h-14 items-center border-b px-4 lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
          <TrendingUp className="h-6 w-6" />
          <span className="text-lg text-foreground">Yard Trades</span>
        </Link>
        {/* Optional: Add a button here for desktop collapse if needed */}
      </div>

       {/* Navigation Section */}
       <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 lg:px-4">
        {navItems.map((item) => (
          <Button
            key={item.name}
            asChild
            variant={isActive(item.href) ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start',
              isActive(item.href)
                ? 'text-primary font-semibold' // Active state styling
                : 'text-muted-foreground' // Default state styling
            )}
           ><Link href={item.href}>
              <item.icon className="mr-3 h-4 w-4" /> {/* Slightly larger margin */}
              {item.name}
            </Link></Button>
        ))}
      </nav>

       {/* Footer Section */}
       <div className="mt-auto border-t p-4 space-y-4">
           {/* User Info */}
           <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                   <AvatarImage src={user.avatarUrl} alt={user.name} />
                   <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium leading-none text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
           </div>

           <Separator />

           {/* Bottom Actions */}
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => router.push('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Site
          </Button>
           <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
          </Button>
       </div>
    </aside>
  );
}
