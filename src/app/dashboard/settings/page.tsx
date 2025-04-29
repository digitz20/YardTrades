
'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription, // Added FormDescription import
} from "@/components/ui/form";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch'; // Assuming you have Switch component

// Define Zod schema for profile settings form validation
const profileSettingsSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }).optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }), // Email might be read-only
  // Add other profile fields as needed, e.g., phone, address
  // username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).optional(),
});

// Define Zod schema for notification settings
const notificationSettingsSchema = z.object({
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    pushNotifications: z.boolean().default(true),
});


type ProfileSettingsInputs = z.infer<typeof profileSettingsSchema>;
type NotificationSettingsInputs = z.infer<typeof notificationSettingsSchema>;


// Mock user data (Replace with actual data fetching)
const currentUser = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/johndoe/100/100', // Placeholder
    notifications: {
        email: true,
        sms: false,
        push: true,
    }
};


export default function SettingsPage() {
   const { toast } = useToast();

   // Form for Profile Settings
   const profileForm = useForm<ProfileSettingsInputs>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email, // Set initial email
      // Set other default values
    },
  });

   // Form for Notification Settings
   const notificationForm = useForm<NotificationSettingsInputs>({
     resolver: zodResolver(notificationSettingsSchema),
     defaultValues: {
       emailNotifications: currentUser.notifications.email,
       smsNotifications: currentUser.notifications.sms,
       pushNotifications: currentUser.notifications.push,
     },
   });


   const onProfileSubmit: SubmitHandler<ProfileSettingsInputs> = async (data) => {
    console.log('Profile settings submitted:', data);
    // Simulate API call to update profile
    await new Promise(resolve => setTimeout(resolve, 1000));
     toast({
       title: "Profile Updated",
       description: "Your profile information has been saved.",
       variant: "default",
     });
   };

   const onNotificationSubmit: SubmitHandler<NotificationSettingsInputs> = async (data) => {
     console.log('Notification settings submitted:', data);
     // Simulate API call to update notification preferences
     await new Promise(resolve => setTimeout(resolve, 1000));
     toast({
       title: "Notifications Updated",
       description: "Your notification preferences have been saved.",
       variant: "default",
     });
   };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      {/* Profile Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal details and account information.</CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...profileForm}>
             <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                {/* Avatar Upload Placeholder */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                        <AvatarFallback>{currentUser.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="sm">Change Avatar</Button>
                    {/* Add file input logic here if implementing upload */}
                </div>

               <FormField
                 control={profileForm.control}
                 name="fullName"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Full Name</FormLabel>
                     <FormControl>
                       <Input placeholder="Your full name" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={profileForm.control}
                 name="email"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Email Address</FormLabel>
                     <FormControl>
                       {/* Email might be read-only depending on your auth setup */}
                       <Input type="email" placeholder="you@example.com" {...field} readOnly disabled />
                     </FormControl>
                      <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                {/* Add other profile fields here */}

             <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                {profileForm.formState.isSubmitting ? 'Saving...' : 'Save Profile Changes'}
             </Button>
             </form>
           </Form>
        </CardContent>
      </Card>

       <Separator />

       {/* Notification Settings Section */}
        <Card>
            <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how you receive updates and alerts from Yard Trades.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...notificationForm}>
                   <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                       <FormField
                           control={notificationForm.control}
                           name="emailNotifications"
                           render={({ field }) => (
                               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                   <div className="space-y-0.5">
                                       <FormLabel className="text-base">Email Notifications</FormLabel>
                                       <FormDescription>
                                           Receive important updates and reports via email.
                                       </FormDescription>
                                   </div>
                                   <FormControl>
                                       <Switch
                                           checked={field.value}
                                           onCheckedChange={field.onChange}
                                       />
                                   </FormControl>
                               </FormItem>
                           )}
                       />
                        <FormField
                           control={notificationForm.control}
                           name="smsNotifications"
                           render={({ field }) => (
                               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                   <div className="space-y-0.5">
                                       <FormLabel className="text-base">SMS Notifications</FormLabel>
                                       <FormDescription>
                                           Get critical alerts via text message (charges may apply).
                                       </FormDescription>
                                   </div>
                                   <FormControl>
                                       <Switch
                                           checked={field.value}
                                           onCheckedChange={field.onChange}
                                            // disabled // Example: Disable if SMS is not configured
                                       />
                                   </FormControl>
                               </FormItem>
                           )}
                       />
                        <FormField
                           control={notificationForm.control}
                           name="pushNotifications"
                           render={({ field }) => (
                               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                   <div className="space-y-0.5">
                                       <FormLabel className="text-base">Push Notifications</FormLabel>
                                       <FormDescription>
                                            Receive real-time updates directly on your device (App required).
                                       </FormDescription>
                                   </div>
                                   <FormControl>
                                       <Switch
                                           checked={field.value}
                                           onCheckedChange={field.onChange}
                                           disabled // Example: Disable if no app exists
                                       />
                                   </FormControl>
                               </FormItem>
                           )}
                       />

                       <Button type="submit" disabled={notificationForm.formState.isSubmitting}>
                            {notificationForm.formState.isSubmitting ? 'Saving...' : 'Save Notification Preferences'}
                       </Button>
                   </form>
                </Form>
            </CardContent>
        </Card>


         {/* Add other settings sections like Language, Theme, etc. as needed */}

    </div>
  );
}
