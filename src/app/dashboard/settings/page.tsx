
'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
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
  FormDescription,
} from "@/components/ui/form";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Mail, MessageSquare, Smartphone, Loader2, Upload } from 'lucide-react'; // Added icons
import { cn } from '@/lib/utils'; // Import cn

// Define Zod schema for profile settings form validation
const profileSettingsSchema = z.object({
  fullName: z.string()
             .min(3, { message: 'Full name must be at least 3 characters.' })
             .max(50, { message: 'Full name cannot exceed 50 characters.' })
             .optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }), // Email usually read-only after signup
  // Add other potential profile fields
  // username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).optional(),
  // phone: z.string().optional(), // Add validation if needed
});

// Define Zod schema for notification settings
const notificationSettingsSchema = z.object({
    emailNotifications: z.boolean().default(true).describe('Receive account summaries and important updates via email.'),
    marketingEmails: z.boolean().default(true).describe('Receive promotional offers and news from Yard Trades.'),
    pushNotifications: z.boolean().default(false).describe('Get real-time alerts on your mobile device (requires app installation).'),
    // smsNotifications: z.boolean().default(false), // Example: SMS notifications might be separate
});


type ProfileSettingsInputs = z.infer<typeof profileSettingsSchema>;
type NotificationSettingsInputs = z.infer<typeof notificationSettingsSchema>;


// Mock user data (Replace with actual data fetching and state management)
const currentUser = {
    id: 'user123',
    fullName: 'Johnathan Doe', // Changed name slightly
    email: 'john.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/j_doe/100/100', // Placeholder
    // Initial notification settings (fetch from backend)
    notifications: {
        email: true,
        marketing: true,
        push: false,
        // sms: false,
    }
};


export default function SettingsPage() {
   const { toast } = useToast();

   // Form for Profile Settings
   const profileForm = useForm<ProfileSettingsInputs>({
    resolver: zodResolver(profileSettingsSchema),
    // Fetch initial values from user data
    defaultValues: {
      fullName: currentUser.fullName || '',
      email: currentUser.email,
    },
  });

   // Form for Notification Settings
   const notificationForm = useForm<NotificationSettingsInputs>({
     resolver: zodResolver(notificationSettingsSchema),
     // Fetch initial values from user data
     defaultValues: {
       emailNotifications: currentUser.notifications.email,
       marketingEmails: currentUser.notifications.marketing,
       pushNotifications: currentUser.notifications.push,
       // smsNotifications: currentUser.notifications.sms,
     },
   });

   const { handleSubmit: handleProfileSubmit, formState: { isSubmitting: isProfileSubmitting } } = profileForm;
   const { handleSubmit: handleNotificationSubmit, formState: { isSubmitting: isNotificationSubmitting } } = notificationForm;


   const onProfileSubmit: SubmitHandler<ProfileSettingsInputs> = async (data) => {
    console.log('Profile settings submitted:', data);
    // **IMPORTANT**: Replace with actual API call to update profile
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay
    const updateSuccessful = true; // Simulate success

     if (updateSuccessful) {
         toast({
           title: "Profile Updated",
           description: "Your profile information has been saved successfully.",
           variant: "default",
         });
         // Optionally update local user state if needed
     } else {
           toast({
           title: "Update Failed",
           description: "Could not update your profile. Please try again.",
           variant: "destructive",
         });
     }
   };

   const onNotificationSubmit: SubmitHandler<NotificationSettingsInputs> = async (data) => {
     console.log('Notification settings submitted:', data);
      // **IMPORTANT**: Replace with actual API call to update notification preferences
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
     const updateSuccessful = true; // Simulate success

     if (updateSuccessful) {
         toast({
           title: "Notifications Updated",
           description: "Your notification preferences have been saved.",
           variant: "default",
         });
         // Optionally update local user state
     } else {
         toast({
           title: "Update Failed",
           description: "Could not update notification preferences. Please try again.",
           variant: "destructive",
         });
     }
   };

   // Placeholder for avatar upload logic
   const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Avatar file selected:', file.name);
            // Add actual upload logic here (e.g., upload to storage, update user profile URL)
            toast({ title: "Avatar Upload", description: "Uploading..." });
            // Simulate upload
            setTimeout(() => {
                toast({ title: "Avatar Updated", description: "Your new avatar is set." });
                // Update avatar preview if necessary (state management)
            }, 2000);
        }
    };


  return (
    <div className="space-y-8">
       {/* Removed redundant title */}
      {/* <h1 className="text-3xl font-bold tracking-tight">Settings</h1> */}

      {/* Profile Settings Section */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl"><User className="h-5 w-5 text-primary" /> Profile Information</CardTitle>
          <CardDescription>Manage your personal details and account information.</CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...profileForm}>
             {/* Use handleProfileSubmit */}
             <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                {/* Avatar Section */}
                <FormItem className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                         {/* Simple fallback with initials */}
                        <AvatarFallback>{currentUser.fullName?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                    </Avatar>
                     <div className="flex flex-col gap-2">
                        <Label htmlFor="avatar-upload" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer")}>
                           <Upload className="mr-2 h-4 w-4"/> Change Avatar
                        </Label>
                        <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <p className="text-xs text-muted-foreground">Recommended: Square image, under 2MB.</p>
                    </div>
                </FormItem>

                <Separator/>

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
                       {/* Email is often read-only after signup */}
                       <Input type="email" placeholder="you@example.com" {...field} readOnly disabled className="cursor-not-allowed bg-muted/50" />
                     </FormControl>
                      <FormDescription className="text-xs">Email address cannot be changed.</FormDescription>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                {/* Add other profile fields here if needed (e.g., Phone) */}

             <Button type="submit" disabled={isProfileSubmitting}>
                {isProfileSubmitting ? (
                   <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                   'Save Profile Changes'
                )}
             </Button>
             </form>
           </Form>
        </CardContent>
      </Card>

       <Separator />

       {/* Notification Settings Section */}
        <Card className="border border-border/60 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Bell className="h-5 w-5 text-primary" /> Notification Preferences</CardTitle>
                <CardDescription>Control how you receive updates, alerts, and news from Yard Trades.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...notificationForm}>
                    {/* Use handleNotificationSubmit */}
                   <form onSubmit={handleNotificationSubmit(onNotificationSubmit)} className="space-y-6">
                       <FormField
                           control={notificationForm.control}
                           name="emailNotifications"
                           render={({ field }) => (
                               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/30">
                                   <div className="space-y-0.5">
                                       <FormLabel htmlFor="email-notifications" className="text-base font-medium flex items-center gap-2">
                                          <Mail className="h-4 w-4" /> Email Notifications
                                       </FormLabel>
                                       <FormDescription className="text-xs pl-6">
                                           {notificationSettingsSchema.shape.emailNotifications.description}
                                       </FormDescription>
                                   </div>
                                   <FormControl>
                                       <Switch
                                           id="email-notifications"
                                           checked={field.value}
                                           onCheckedChange={field.onChange}
                                           aria-label="Toggle Email Notifications"
                                       />
                                   </FormControl>
                               </FormItem>
                           )}
                       />
                        <FormField
                           control={notificationForm.control}
                           name="marketingEmails"
                           render={({ field }) => (
                               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/30">
                                   <div className="space-y-0.5">
                                       <FormLabel htmlFor="marketing-emails" className="text-base font-medium flex items-center gap-2">
                                           <MessageSquare className="h-4 w-4" /> Marketing Emails
                                       </FormLabel>
                                       <FormDescription className="text-xs pl-6">
                                           {notificationSettingsSchema.shape.marketingEmails.description}
                                       </FormDescription>
                                   </div>
                                   <FormControl>
                                       <Switch
                                           id="marketing-emails"
                                           checked={field.value}
                                           onCheckedChange={field.onChange}
                                           aria-label="Toggle Marketing Emails"
                                       />
                                   </FormControl>
                               </FormItem>
                           )}
                       />
                        <FormField
                           control={notificationForm.control}
                           name="pushNotifications"
                           render={({ field }) => (
                               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/30">
                                   <div className="space-y-0.5">
                                       <FormLabel htmlFor="push-notifications" className="text-base font-medium flex items-center gap-2">
                                            <Smartphone className="h-4 w-4" /> Push Notifications
                                       </FormLabel>
                                       <FormDescription className="text-xs pl-6">
                                            {notificationSettingsSchema.shape.pushNotifications.description}
                                       </FormDescription>
                                   </div>
                                   <FormControl>
                                       <Switch
                                           id="push-notifications"
                                           checked={field.value}
                                           onCheckedChange={field.onChange}
                                           disabled // Example: Disable if no mobile app integration exists
                                           aria-label="Toggle Push Notifications"
                                       />
                                   </FormControl>
                               </FormItem>
                           )}
                       />

                       <Button type="submit" disabled={isNotificationSubmitting}>
                            {isNotificationSubmitting ? (
                                <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                            ) : (
                                'Save Notification Preferences'
                            )}
                       </Button>
                   </form>
                </Form>
            </CardContent>
        </Card>


         {/* Add other settings sections like Language, Theme, API Keys etc. as needed */}
          {/* Example:
           <Separator />
           <Card>...</Card>
          */}

    </div>
  );
}

