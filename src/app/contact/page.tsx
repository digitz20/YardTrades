
'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Ensure Textarea component exists
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Import useToast
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast(); // Initialize useToast

  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log('Form Submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      variant: "default", // Use default variant (can be customized)
    });
    form.reset(); // Reset form after successful submission
  };

  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="bg-secondary/30 py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Reach out to us with any questions or inquiries, and our team will respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form Card */}
            <Card className="bg-card border border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                       control={form.control}
                       name="name"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Your Name</FormLabel>
                           <FormControl>
                             <Input placeholder="John Doe" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Your Email</FormLabel>
                           <FormControl>
                             <Input type="email" placeholder="john.doe@example.com" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                      <FormField
                       control={form.control}
                       name="subject"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Subject</FormLabel>
                           <FormControl>
                             <Input placeholder="Inquiry about investment plans" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="message"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Your Message</FormLabel>
                           <FormControl>
                             <Textarea placeholder="Enter your message here..." {...field} rows={5} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                       {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                     </Button>
                   </form>
                 </Form>
              </CardContent>
            </Card>

            {/* Contact Details and Map */}
            <div className="space-y-8">
               {/* Contact Details */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">Get in Touch Directly</h3>
                    <p className="text-muted-foreground mb-6">
                        Prefer to reach out through other channels? Find our contact information below.
                    </p>
                     <ul className="space-y-4">
                       <li className="flex items-start gap-4">
                         <div className="p-3 bg-primary/10 rounded-full text-primary">
                           <MapPin className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="font-medium text-foreground">Address</h4>
                            <p className="text-sm text-muted-foreground">114, Lombard street, Canary Wharf, United Kingdom</p> {/* Updated Address */}
                         </div>
                       </li>
                       <li className="flex items-start gap-4">
                         <div className="p-3 bg-primary/10 rounded-full text-primary">
                           <Mail className="h-5 w-5" />
                         </div>
                          <div>
                            <h4 className="font-medium text-foreground">Email</h4>
                            <a href="mailto:yardtrades200@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">yardtrades200@gmail.com</a> {/* Updated Email */}
                         </div>
                       </li>
                       <li className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-full text-primary">
                           <Phone className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="font-medium text-foreground">Phone</h4>
                            <a href="tel:+14326767323" className="text-sm text-muted-foreground hover:text-primary transition-colors">+1(432) 676-7323</a> {/* Updated Phone */}
                         </div>
                       </li>
                     </ul>
                </div>

              {/* Map Placeholder */}
               <div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Location</h3>
                     <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border/50">
                       {/* Placeholder for an embedded map (e.g., Google Maps iframe) */}
                       {/* Replace with actual map embed code */}
                       <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                         Map Placeholder (Embed Google Maps Here)
                       </div>
                       {/* Example Google Maps Embed (replace src):
                       <iframe
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
                         width="100%"
                         height="100%"
                         style={{ border:0 }}
                         allowFullScreen={true}
                         loading="lazy"
                         referrerPolicy="no-referrer-when-downgrade">
                       </iframe>
                       */}
                     </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

