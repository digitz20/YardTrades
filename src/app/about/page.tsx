
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { Zap, Target, Heart, Users, Briefcase, Clock, Building, TrendingUp, ShieldCheck, CheckCircle } from 'lucide-react'; // Added CheckCircle
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator'; // Import Separator

const teamMembers = [
  // Using different seeds for potentially more face-like results, still placeholders
  { name: 'Alice Johnson', role: 'CEO & Founder', image: 'https://picsum.photos/seed/face_alice/300/300' },
  { name: 'Bob Williams', role: 'Chief Investment Officer', image: 'https://picsum.photos/seed/face_bob/300/300' },
  { name: 'Charlie Brown', role: 'Head of Financial Planning', image: 'https://picsum.photos/seed/man_office_chart/300/300' }, // Updated placeholder URL
  { name: 'Diana Davis', role: 'Client Relations Manager', image: 'https://picsum.photos/seed/face_diana/300/300' },
];

// Use static years for milestones
const historyMilestones = [
    { year: 2018, event: 'Yard Trades Founded', description: 'Established with a vision to democratize profitable investments through transparency and technology.' },
    { year: 2019, event: 'Reached 1,000 Clients', description: 'Expanded client base rapidly through trust, performance, and strong referrals.' },
    { year: 2021, event: 'Introduced New Investment Plans', description: 'Diversified offerings with Silver and Gold plans to cater to a wider range of investor needs.' },
    { year: 2023, event: 'Launched Enhanced Security Protocols', description: 'Implemented state-of-the-art multi-factor authentication and encryption measures.' },
    { year: 2024, event: 'Expanded Globally', description: 'Opened services to international clients, fostering global growth and diversification opportunities.' },
];


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-background py-16 md:py-24 text-center relative overflow-hidden">
         {/* Optional subtle background pattern */}
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(hsl(var(--primary-foreground))_1px,transparent_1px)] [background-size:16px_16px]"></div>
         {/* Floating icons */}
         <Zap className="absolute top-1/4 left-10 h-16 w-16 text-primary/20 opacity-30 animate-pulse duration-3000" />
         <Target className="absolute bottom-1/4 right-10 h-20 w-20 text-primary/20 opacity-30 animate-bounce delay-500" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About Yard Trades</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our mission, values, and the dedicated team committed to securing your financial future through strategic, transparent investments.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="bg-card border border-border/50 shadow-md text-center transform transition-transform hover:-translate-y-1 duration-300">
              <CardHeader className="items-center pt-6 pb-4">
                 <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block border border-primary/20">
                   <Target className="h-7 w-7 text-primary" />
                 </div>
                <CardTitle className="text-xl font-semibold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To empower individuals and businesses globally to achieve financial prosperity through accessible, transparent, and highly profitable investment opportunities, backed by expertise and integrity.
                </p>
              </CardContent>
            </Card>
             {/* Vision */}
             <Card className="bg-card border border-border/50 shadow-md text-center transform transition-transform hover:-translate-y-1 duration-300">
               <CardHeader className="items-center pt-6 pb-4">
                  <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block border border-primary/20">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                 <CardTitle className="text-xl font-semibold">Our Vision</CardTitle>
               </CardHeader>
               <CardContent className="px-6 pb-6">
                 <p className="text-muted-foreground text-sm leading-relaxed">
                   To be the most trusted and innovative global platform for secure, high-yield investments, recognized for our unwavering commitment to client success, ethical practices, and technological advancement.
                 </p>
               </CardContent>
             </Card>
             {/* Values */}
             <Card className="bg-card border border-border/50 shadow-md text-center transform transition-transform hover:-translate-y-1 duration-300">
               <CardHeader className="items-center pt-6 pb-4">
                  <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block border border-primary/20">
                    <Heart className="h-7 w-7 text-primary" />
                  </div>
                 <CardTitle className="text-xl font-semibold">Our Core Values</CardTitle>
               </CardHeader>
               <CardContent className="px-6 pb-6">
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-none text-left pl-4">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0"/>Integrity</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0"/>Transparency</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0"/>Client Focus</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0"/>Innovation</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0"/>Excellence</li>
                  </ul>
               </CardContent>
             </Card>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">The Yard Trades Story</h2>
               <p className="text-muted-foreground mb-4 leading-relaxed">
                 Founded on the principle that everyone deserves access to sound financial growth, Yard Trades started as a small initiative focused on transparent and effective investment strategies. We recognized a gap in the market for a platform that combines deep financial expertise with robust security and a genuine, unwavering commitment to client success.
               </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                 Over the years, through dedication and consistent results, we've grown into a trusted name in the investment world. We continuously innovate and adapt to the dynamic global markets while remaining steadfastly true to our core values. Our journey is defined not just by market performance, but by the success stories of our clients and our unwavering dedication to their long-term financial well-being.
               </p>
                <Button variant="outline" asChild className="hover:bg-primary/5 transition-colors"><Link href="/services">Explore Our Services</Link></Button>
             </div>
             <div className="relative h-80 md:h-96 group">
                 <Image
                   src="https://picsum.photos/seed/about_story/800/600" // Placeholder image
                   alt="Abstract concept of growth and strategy"
                   fill // Use fill instead of layout
                   objectFit="cover"
                   className="rounded-lg shadow-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                   data-ai-hint="growth strategy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
             </div>
           </div>
         </div>
       </section>


       {/* Company History / Timeline */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Journey: Milestones</h2>
                <div className="relative max-w-4xl mx-auto before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border before:md:mx-auto before:md:left-1/2 before:md:-translate-x-1/2">
                    {historyMilestones.map((milestone, index) => (
                         <div key={index} className="relative pl-8 sm:pl-32 py-6 group md:pl-0">
                           {/* Timeline Dot */}
                           <div className={`absolute left-5 md:left-1/2 transform md:-translate-x-1/2 -translate-y-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <div className={`w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shadow-md`}>
                                   <Clock className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                           {/* Content Card */}
                           <div className={`relative ${index % 2 === 0 ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10' } md:w-1/2`}>
                                <Card className={`bg-card border border-border/50 shadow-md group-hover:shadow-primary/10 transition-shadow`}>
                                    <CardHeader className="pb-3 pt-4 px-4">
                                        <CardTitle className="text-lg font-semibold text-primary">{milestone.year}</CardTitle>
                                        <p className="text-md font-medium text-foreground">{milestone.event}</p>
                                    </CardHeader>
                                    <CardContent className="pb-4 px-4">
                                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


      {/* Meet the Team Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-card border-0 shadow-lg text-center overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                 <div className="relative h-56 w-full group">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill // Use fill instead of layout
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={member.name === 'Charlie Brown' ? "man office laptop chart" : "person face"} // Add hint for Charlie Brown
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
                 </div>
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg text-foreground mb-1">{member.name}</h4>
                  <p className="text-primary text-sm">{member.role}</p>
                  {/* Optional: Add social links or short bio */}
                   {/* <div className="flex justify-center space-x-3 mt-3">
                       <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-4 w-4"/></Link>
                       <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-4 w-4"/></Link>
                   </div> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Call to Action */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
           <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Join the Yard Trades Family</h2>
               <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                   Ready to grow your wealth? Become part of a thriving community of successful investors. Let our expert team guide you towards achieving your financial aspirations with confidence.
               </p>
               <Button size="lg" asChild className="hover:scale-105 transition-transform shadow-lg"><Link href="/signup">Get Started Today</Link></Button>
           </div>
       </section>
    </div>
  );
}
