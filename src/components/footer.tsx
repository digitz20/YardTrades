"use client";

import React from 'react';
import Link from 'next/link';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react'; // Icons for footer

export function Footer() {
  return (
    <footer className="bg-secondary/50 text-muted-foreground border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <Link href="/" className="mb-4 flex items-center space-x-2 text-primary">
              <Briefcase className="h-7 w-7" />
              <span className="font-bold text-xl text-foreground">
                Yard Trades
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Yard Trades provides secure and profitable investment solutions. Join us to grow your capital with expert guidance and transparent processes.
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

           {/* Newsletter Signup (Placeholder) */}
           <div>
             <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
             <p className="text-sm mb-3">Stay updated with our latest news and offers.</p>
             {/* Basic placeholder - implement actual form logic if needed */}
             <form className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Enter your email" className="flex-grow h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                 <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Subscribe
                </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs border-t border-border/40 pt-8">
          <p>&copy; {new Date().getFullYear()} Yard Trades. All Rights Reserved.</p>
          {/* Optional: Add links to Privacy Policy, Terms of Service */}
          {/* <p className="mt-1">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link> | <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
