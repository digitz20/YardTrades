
"use client";

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, MapPin, Phone, Twitter, Facebook, Linkedin } from 'lucide-react'; // Added social icons
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator'; // Import Separator

export function Footer() {
  return (
    <footer className="bg-card text-muted-foreground border-t border-border/60 pt-16 pb-8"> {/* Changed background to card */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
              <TrendingUp className="h-7 w-7" />
              <span className="font-bold text-xl text-foreground">
                YardTrades
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              YardTrades provides secure and profitable investment solutions. Join us to grow your capital with expert guidance and transparent processes.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                   <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                     <Twitter className="h-5 w-5" />
                   </Link>
                 </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                   <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                     <Facebook className="h-5 w-5" />
                   </Link>
                 </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                   <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                     <Linkedin className="h-5 w-5" />
                   </Link>
                 </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors duration-200">Services</Link></li>
              <li><Link href="/#plans" className="hover:text-primary transition-colors duration-200">Investment Plans</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors duration-200">Contact Us</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors duration-200">Login</Link></li>
              <li><Link href="/signup" className="hover:text-primary transition-colors duration-200">Sign Up</Link></li>
              {/* Add FAQ or Blog links if applicable */}
              {/* <li><Link href="/faq" className="hover:text-primary transition-colors duration-200">FAQ</Link></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                {/* Ensure this text matches exactly what's expected */}
                <span>114, Lombard street, United Kingdom</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:yardtrades200@gmail.com" className="hover:text-primary transition-colors duration-200">yardtrades200@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+14326767323" className="hover:text-primary transition-colors duration-200">+1(432) 676-7323</a>
              </li>
            </ul>
          </div>

           {/* Newsletter Signup */}
           <div>
             <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
             <p className="text-sm mb-3">Stay updated with our latest news, market insights, and special offers.</p>
             <form className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-grow bg-background border-border/70 focus:border-primary" aria-label="Newsletter email input" required />
                 <Button type="submit" variant="secondary" className="shrink-0">
                    Subscribe
                </Button>
            </form>
            <p className="text-xs mt-2 text-muted-foreground/80">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" /> {/* Use Separator */}

        {/* Copyright and Bottom Links */}
        <div className="text-center text-xs">
          <p>&copy; {new Date().getFullYear()} YardTrades. All Rights Reserved.</p>
          <div className="mt-2 space-x-3">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
            <span className="text-muted-foreground/50">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200">Terms of Service</Link>
             {/* Add Sitemap link if applicable */}
             {/* <span className="text-muted-foreground/50">|</span>
            <Link href="/sitemap.xml" className="hover:text-primary transition-colors duration-200">Sitemap</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
