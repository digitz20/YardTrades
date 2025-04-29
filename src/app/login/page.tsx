
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
import { Briefcase } from 'lucide-react'; // Logo icon
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


// Define Zod schema for login form validation
const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log('Login attempt:', data);
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example: Check credentials (replace with actual auth logic)
    // For demo purposes, let's assume any login is successful
    // In a real app, verify credentials against a backend/database
    // if (data.email === 'user@example.com' && data.password === 'password') {
        toast({
          title: "Login Successful!",
          description: "Redirecting to your dashboard...",
          variant: "default",
        });
        // Redirect user to the dashboard
        router.push('/dashboard'); // Redirect to dashboard
         console.log("Redirecting to dashboard...");
         // Keep form reset if needed, though redirect might make it less necessary
         // form.reset();
    // } else {
    //      toast({
    //        title: "Login Failed",
    //        description: "Invalid email or password. Please try again.",
    //        variant: "destructive",
    //      });
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16)-1px)] py-12 bg-gradient-to-br from-background via-secondary/20 to-background"> {/* Adjust min-height based on header height */}
       <Card className="w-full max-w-md mx-4 bg-card border border-border/60 shadow-xl">
        <CardHeader className="text-center">
           <Link href="/" className="mb-4 inline-flex items-center justify-center space-x-2 text-primary">
              <Briefcase className="h-8 w-8" />
           </Link>
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your Yard Trades account.</CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <div className="flex justify-between items-center">
                         <FormLabel>Password</FormLabel>
                         <Link href="/forgot-password" // Add forgot password link if needed
                            className="text-xs text-primary hover:underline">
                            Forgot Password?
                        </Link>
                     </div>
                     <FormControl>
                       <Input type="password" placeholder="••••••••" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                {/* Optional: Remember Me Checkbox */}
                {/* <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
                 </div> */}
               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
               </Button>
             </form>
           </Form>
        </CardContent>
         <CardFooter className="text-center text-sm text-muted-foreground justify-center">
            Don't have an account?{' '}
           <Button variant="link" className="p-0 h-auto ml-1 text-primary" asChild>
               <Link href="/signup">Sign Up</Link>
            </Button>
         </CardFooter>
      </Card>
    </div>
  );
}
