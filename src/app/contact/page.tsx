
'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react'; // Added Send and Loader2
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from '@/components/ui/separator'; // Import Separator

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50, { message: 'Name cannot exceed 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }).max(100, { message: 'Subject cannot exceed 100 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(1000, { message: 'Message cannot exceed 1000 characters.' }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = form; // Destructure isSubmitting

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log('Form Submitted:', data);
    // **IMPORTANT**: Replace with actual form submission logic (e.g., API call)
    // This is a placeholder simulation.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // Simulate success for demonstration
    const submissionSuccessful = true;

    if (submissionSuccessful) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting Yard Trades. We'll get back to you as soon as possible.",
          variant: "default", // Use 'success' variant if you have one defined
        });
        form.reset(); // Reset form fields after successful submission
    } else {
         toast({
           title: "Submission Failed",
           description: "Could not send your message. Please try again later or use another contact method.",
           variant: "destructive",
         });
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-secondary/20 via-background to-background py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re here to help. Reach out with any questions, inquiries, or support requests, and our dedicated team will respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form Card */}
            <Card className="bg-card border border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" /> Send Us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll be in touch.</CardDescription>
              </CardHeader>
              <Separator className="mb-6" />
              <CardContent>
                 <Form {...form}>
                   {/* Use handleSubmit directly */}
                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                       control={form.control}
                       name="name"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Your Name</FormLabel>
                           <FormControl>
                             <Input placeholder="John Doe" {...field} required />
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
                             <Input type="email" placeholder="john.doe@example.com" {...field} required />
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
                             <Input placeholder="e.g., Inquiry about Gold Plan" {...field} required />
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
                             <Textarea placeholder="Please provide details here..." {...field} rows={5} required />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <Button type="submit" className="w-full" disabled={isSubmitting}>
                       {isSubmitting ? (
                            <>
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                            </>
                       ) : (
                           <>
                               <Send className="mr-2 h-4 w-4" /> Send Message
                           </>
                       )}
                     </Button>
                   </form>
                 </Form>
              </CardContent>
            </Card>

            {/* Contact Details and Map */}
            <div className="space-y-10">
               {/* Contact Details */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">Get in Touch Directly</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Prefer to reach out through other channels? Find our direct contact information below. We are available during standard business hours.
                    </p>
                     <ul className="space-y-5">
                       <li className="flex items-start gap-4 group">
                         <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                           <MapPin className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="font-medium text-foreground mb-0.5">Office Address</h4>
                            <p className="text-sm text-muted-foreground">114, Lombard street, United Kingdom</p>
                         </div>
                       </li>
                       <li className="flex items-start gap-4 group">
                         <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                           <Mail className="h-5 w-5" />
                         </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-0.5">Email Us</h4>
                            <a href="mailto:yardtrades200@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">yardtrades200@gmail.com</a>
                         </div>
                       </li>
                       <li className="flex items-start gap-4 group">
                          <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                           <Phone className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="font-medium text-foreground mb-0.5">Call Us</h4>
                            <a href="tel:+14326767323" className="text-sm text-muted-foreground hover:text-primary transition-colors">+1(432) 676-7323</a>
                         </div>
                       </li>
                     </ul>
                </div>

              {/* Map Placeholder */}
               <div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Location</h3>
                     <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border/50 shadow-inner">
                       {/* Placeholder for an embedded map (e.g., Google Maps iframe) */}
                       {/* Replace with actual map embed code */}
                       <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.727590690707!2d-0.09039868423024197!3d51.51188797963604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760358159d4cab%3A0x2728f8e599851334!2sLombard%20St%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1678886412345!5m2!1sen!2sus" // Example embed URL for Lombard Street, London
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Yard Trades Location Map">
                        </iframe>
                     </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
