
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Target, Heart, Users, Briefcase, Clock } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const teamMembers = [ // Placeholder data
  { name: 'Alice Johnson', role: 'CEO & Founder', image: 'https://picsum.photos/seed/alice/200/200' },
  { name: 'Bob Williams', role: 'Chief Investment Officer', image: 'https://picsum.photos/seed/bob/200/200' },
  { name: 'Charlie Brown', role: 'Head of Financial Planning', image: 'https://picsum.photos/seed/charlie/200/200' },
   { name: 'Diana Davis', role: 'Client Relations Manager', image: 'https://picsum.photos/seed/diana/200/200' },
];

const historyMilestones = [
    { year: 2018, event: 'Yard Trades Founded', description: 'Established with a vision to democratize profitable investments.' },
    { year: 2019, event: 'Reached 1,000 Clients', description: 'Expanded client base rapidly through trust and performance.' },
    { year: 2021, event: 'Introduced New Investment Plans', description: 'Diversified offerings to cater to a wider range of investors.' },
    { year: 2023, event: 'Launched Enhanced Security Protocols', description: 'Implemented state-of-the-art security measures.' },
    { year: 2024, event: 'Expanded Globally', description: 'Opened services to international clients, fostering global growth.' },
];


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="bg-primary/10 py-16 md:py-24 text-center relative overflow-hidden">
         {/* Optional subtle background pattern */}
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Yard Trades</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn about our mission, values, and the dedicated team working to secure your financial future through strategic investments.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="bg-card border border-border/50 shadow-sm text-center">
              <CardHeader className="items-center">
                 <div className="p-3 bg-secondary rounded-full mb-3 inline-block">
                   <Target className="h-6 w-6 text-primary" />
                 </div>
                <CardTitle className="text-xl font-semibold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  To empower individuals and businesses to achieve financial prosperity through accessible, transparent, and profitable investment opportunities.
                </p>
              </CardContent>
            </Card>
             {/* Vision */}
             <Card className="bg-card border border-border/50 shadow-sm text-center">
               <CardHeader className="items-center">
                  <div className="p-3 bg-secondary rounded-full mb-3 inline-block">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                 <CardTitle className="text-xl font-semibold">Our Vision</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-muted-foreground text-sm">
                   To be the leading global platform for secure and high-yield investments, recognized for our integrity, innovation, and client success.
                 </p>
               </CardContent>
             </Card>
             {/* Values */}
             <Card className="bg-card border border-border/50 shadow-sm text-center">
               <CardHeader className="items-center">
                  <div className="p-3 bg-secondary rounded-full mb-3 inline-block">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                 <CardTitle className="text-xl font-semibold">Our Values</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-muted-foreground text-sm">
                   Integrity, Transparency, Client Focus, Innovation, Excellence. These principles guide every decision we make.
                 </p>
               </CardContent>
             </Card>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-4">The Yard Trades Story</h2>
               <p className="text-muted-foreground mb-4">
                 Founded on the principle that everyone deserves access to sound financial growth, Yard Trades started as a small initiative focused on transparent investment strategies. We recognized the need for a platform that combines expertise with robust security and a genuine commitment to client success.
               </p>
                <p className="text-muted-foreground mb-6">
                 Over the years, we've grown into a trusted name in the investment world, continually innovating and adapting to market dynamics while staying true to our core values. Our journey is defined by the success stories of our clients and our unwavering dedication to their financial well-being.
               </p>
                 <Button variant="outline" asChild><Link href="/services">Explore Our Services</Link></Button>
             </div>
             <div className="relative h-80 md:h-96">
                 <Image
                   src="https://picsum.photos/seed/story/800/600" // Placeholder image
                   alt="Yard Trades office or abstract growth concept"
                   layout="fill"
                   objectFit="cover"
                   className="rounded-lg shadow-xl"
                 />
             </div>
           </div>
         </div>
       </section>


       {/* Company History / Timeline */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Journey</h2>
                <div className="relative max-w-4xl mx-auto">
                     {/* Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 hidden md:block"></div>

                    {historyMilestones.map((milestone, index) => (
                        <div key={index} className={`mb-8 flex md:justify-between items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'}`}>
                             {/* Spacer for alignment on desktop */}
                            <div className="hidden md:block w-5/12"></div>
                             {/* Dot on timeline */}
                            <div className="z-10 hidden md:block">
                                <div className="w-6 h-6 bg-primary rounded-full shadow-md flex items-center justify-center">
                                     <Clock className="w-3 h-3 text-primary-foreground" />
                                 </div>
                            </div>
                             {/* Content Card */}
                            <div className="w-full md:w-5/12">
                                <Card className={`bg-card border border-border/50 shadow-md ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-semibold text-primary">{milestone.year}</CardTitle>
                                        <p className="text-md font-medium text-foreground">{milestone.event}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


      {/* Meet the Team Section (Placeholder) */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-card border-0 shadow-lg text-center overflow-hidden">
                 <div className="relative h-48 w-full">
                    <Image
                        src={member.image}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                    />
                 </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg text-foreground">{member.name}</h4>
                  <p className="text-primary text-sm">{member.role}</p>
                  {/* Optional: Add social links or short bio */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Call to Action */}
        <section className="py-16 md:py-24 bg-background">
           <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Yard Trades Family</h2>
               <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                   Become part of a growing community of successful investors. Let our team guide you towards achieving your financial aspirations.
               </p>
               <Button size="lg" asChild><Link href="/signup">Get Started</Link></Button>
           </div>
       </section>
    </div>
  );
}
