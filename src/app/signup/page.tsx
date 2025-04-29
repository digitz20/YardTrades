
'use client';

import React from 'react';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react'; // Changed icon import
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define Zod schema for sign-up form validation
const signupFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});


type SignupFormInputs = z.infer<typeof signupFormSchema>;

export default function SignupPage() {
   const { toast } = useToast();

   const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

   const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    console.log('Signup attempt:', data);
    // Simulate API call for signup
    await new Promise(resolve => setTimeout(resolve, 1500));

     // Example: Simulate successful signup
     toast({
       title: "Account Created!",
       description: "Welcome to Yard Trades! Please check your email for verification.",
       variant: "default",
     });
     // Redirect user (e.g., to login or dashboard after verification)
     console.log("Redirecting after signup..."); // Placeholder
     form.reset();
     // router.push('/login'); // Example redirect
   };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16)-1px)] py-12 bg-gradient-to-br from-background via-secondary/20 to-background">
      <Card className="w-full max-w-md mx-4 bg-card border border-border/60 shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="mb-4 inline-flex items-center justify-center space-x-2 text-primary">
            <TrendingUp className="h-8 w-8" /> {/* Changed icon */}
          </Link>
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join Yard Trades and start your investment journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"> {/* Slightly reduced spacing */}
               <FormField
                 control={form.control}
                 name="fullName"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Full Name</FormLabel>
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
                     <FormLabel>Email Address</FormLabel>
                     <FormControl>
                       <Input type="email" placeholder="you@example.com" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={form.control}
                 name="password"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="••••••••" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                <FormField
                 control={form.control}
                 name="confirmPassword"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Confirm Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="••••••••" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border/50 p-4 shadow-sm">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I agree to the{' '}
                           <Button variant="link" className="p-0 h-auto text-primary" asChild>
                             <Link href="/terms" target="_blank">Terms and Conditions</Link>
                           </Button>
                        </FormLabel>
                         <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />


               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting ? 'Creating Account...' : 'Sign Up'}
               </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
          Already have an account?{' '}
          <Button variant="link" className="p-0 h-auto ml-1 text-primary" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
