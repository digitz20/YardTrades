
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { TrendingUp, Loader2 } from 'lucide-react'; // Added Loader2
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox


// Define Zod schema for login form validation
const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional().default(false), // Optional remember me
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = form; // Destructure isSubmitting

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log('Login attempt:', data);
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // **IMPORTANT**: Replace with actual authentication logic
    // This is a placeholder for demonstration.
    // In a real app, you would send credentials to your backend,
    // verify them, and handle success/failure based on the response.
    const loginSuccessful = true; // Simulate successful login

    if (loginSuccessful) {
        toast({
          title: "Login Successful!",
          description: "Redirecting to your dashboard...",
          variant: "default",
        });
        // Redirect user to the dashboard upon successful login
        router.push('/dashboard');
    } else {
         toast({
           title: "Login Failed",
           description: "Invalid email or password. Please try again.",
           variant: "destructive",
         });
         // Optionally clear password field on failure
         form.resetField("password");
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
          <CardTitle className="text-2xl font-bold text-foreground">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your Yard Trades account.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
           <Form {...form}>
             {/* Use handleSubmit directly */}
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      <div className="flex justify-between items-center">
                         <FormLabel>Password</FormLabel>
                         <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary hover:underline" asChild>
                            <Link href="/forgot-password">Forgot Password?</Link>
                         </Button>
                     </div>
                     <FormControl>
                       <Input type="password" placeholder="••••••••" {...field} required />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="remember-me"
                        />
                      </FormControl>
                      <FormLabel htmlFor="remember-me" className="text-sm font-normal text-muted-foreground">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
               <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                      <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                      </>
                  ) : 'Sign In'}
               </Button>
             </form>
           </Form>
        </CardContent>
         <CardFooter className="bg-muted/30 p-4 text-center text-sm text-muted-foreground justify-center border-t border-border/50"> {/* Styled footer */}
            Don&apos;t have an account?{' '}
           <Button variant="link" className="p-0 h-auto ml-1 text-primary" asChild><Link href="/signup">Sign Up</Link></Button>
         </CardFooter>
      </Card>
    </div>
  );
}
