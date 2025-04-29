
"use client";

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, MapPin, Phone } from 'lucide-react'; // Changed icon import
import { Input } from './ui/input'; // Import Input
import { Button } from './ui/button'; // Import Button

export function Footer() {
  return (
    <footer className="bg-secondary/50 text-muted-foreground border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <Link href="/" className="mb-4 flex items-center space-x-2 text-primary">
              <TrendingUp className="h-7 w-7" /> {/* Changed icon */}
              <span className="font-bold text-xl text-foreground">
                YardTrades
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              YardTrades provides secure and profitable investment solutions. Join us to grow your capital with expert guidance and transparent processes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#plans" className="hover:text-primary transition-colors">Investment Plans</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
               <li><Link href="/login" className="hover:text-primary transition-colors">Login</Link></li>
               <li><Link href="/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Investment Lane, Finance City, FC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:support@yardtrades.example.com" className="hover:text-primary transition-colors">support@yardtrades.example.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
             {/* Optional: Add Social Media Icons here */}
          </div>

           {/* Newsletter Signup */}
           <div>
             <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
             <p className="text-sm mb-3">Stay updated with our latest news and offers.</p>
             <form className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-grow" aria-label="Newsletter email input" />
                 <Button type="submit">
                    Subscribe
                </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs border-t border-border/40 pt-8">
          <p>&copy; {new Date().getFullYear()} YardTrades. All Rights Reserved.</p>
          {/* Optional: Add links to Privacy Policy, Terms of Service */}
          <p className="mt-1 space-x-2">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
