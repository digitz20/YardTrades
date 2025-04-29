
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { TrendingUp, Loader2 } from 'lucide-react'; // Added Loader2
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from '@/components/ui/separator'; // Import Separator

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
   const router = useRouter(); // Initialize useRouter

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

   const { handleSubmit, formState: { isSubmitting } } = form; // Destructure isSubmitting

   const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    console.log('Signup attempt:', data);
    // Simulate API call for signup
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

     // **IMPORTANT**: Replace with actual signup logic
     // This is a placeholder for demonstration.
     // In a real app, send data to your backend, create the user,
     // handle potential errors (e.g., email already exists),
     // and potentially send a verification email.
     const signupSuccessful = true; // Simulate success

     if (signupSuccessful) {
         toast({
           title: "Account Created!",
           description: "Welcome to Yard Trades! Redirecting to login...", // Updated message
           variant: "default",
         });
         // Redirect user to the login page after successful signup
         router.push('/login');
     } else {
         toast({
           title: "Signup Failed",
           description: "Could not create account. Please try again.", // Example error
           variant: "destructive",
         });
     }
   };


  return (
     // Adjusted min-height calculation if header/footer height changes
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 bg-gradient-to-br from-background via-secondary/10 to-background">
      <Card className="w-full max-w-md bg-card border border-border/60 shadow-xl overflow-hidden"> {/* Added overflow-hidden */}
        <CardHeader className="text-center bg-muted/30 p-6 border-b border-border/50"> {/* Styled header */}
          <Link href="/" className="mb-4 inline-flex items-center justify-center space-x-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
            <TrendingUp className="h-8 w-8" />
          </Link>
          <CardTitle className="text-2xl font-bold text-foreground">Create Your Account</CardTitle>
          <CardDescription>Join Yard Trades and start your investment journey.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
             {/* Use handleSubmit directly */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
               <FormField
                 control={form.control}
                 name="fullName"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Full Name</FormLabel>
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
                     <FormLabel>Email Address</FormLabel>
                     <FormControl>
                       <Input type="email" placeholder="you@example.com" {...field} required />
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
                       <Input type="password" placeholder="Minimum 8 characters" {...field} required />
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
                       <Input type="password" placeholder="Re-enter your password" {...field} required />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2"> {/* Added padding top */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          aria-labelledby="terms-label" // Improve accessibility
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label htmlFor="terms" id="terms-label" className="text-sm font-normal text-muted-foreground">
                          I agree to the{' '}
                           <Button variant="link" className="p-0 h-auto text-primary hover:underline" asChild><Link href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</Link></Button>
                        </Label>
                         <FormMessage /> {/* Display error message directly below */}
                      </div>
                    </FormItem>
                  )}
                />


               <Button type="submit" className="w-full" disabled={isSubmitting}>
                 {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                    </>
                 ) : 'Sign Up'}
               </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 text-center text-sm text-muted-foreground justify-center border-t border-border/50"> {/* Styled footer */}
          Already have an account?{' '}
          <Button variant="link" className="p-0 h-auto ml-1 text-primary" asChild><Link href="/login">Log In</Link></Button>
        </CardFooter>
      </Card>
    </div>
  );
}
