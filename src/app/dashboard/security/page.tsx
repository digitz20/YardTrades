'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ShieldCheck, KeyRound, ListChecks, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from '@/components/ui/separator';

// Define Zod schema for password change form validation
const passwordChangeSchema = z.object({
  currentPassword: z.string().min(6, { message: 'Current password is required.' }),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"], // path of error
});

type PasswordChangeInputs = z.infer<typeof passwordChangeSchema>;

// Mock security data (Replace with actual data fetching)
const securityStatus = {
    twoFactorEnabled: true,
    lastLogin: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
    loginLocation: 'New York, USA (Approx.)' // Example
};

export default function SecurityPage() {
   const { toast } = useToast();

   // Form for Password Change
   const passwordForm = useForm<PasswordChangeInputs>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

   const onPasswordSubmit: SubmitHandler<PasswordChangeInputs> = async (data) => {
    console.log('Password change submitted:', data);
    // Simulate API call to change password
    // **IMPORTANT**: Verify currentPassword on the backend!
    await new Promise(resolve => setTimeout(resolve, 1500));

     // Simulate success/failure based on mock logic (e.g., current password check)
     if (data.currentPassword === 'password123') { // Replace 'password123' with actual check result
       toast({
         title: "Password Changed",
         description: "Your password has been updated successfully.",
         variant: "default",
       });
       passwordForm.reset();
     } else {
        toast({
            title: "Password Change Failed",
            description: "Incorrect current password.",
            variant: "destructive",
        });
         passwordForm.resetField("currentPassword"); // Only reset current password field on failure
         passwordForm.resetField("newPassword");
         passwordForm.resetField("confirmPassword");
     }
   };

   // Handler for 2FA toggle (replace with actual API call)
    const handle2FAToggle = async (enabled: boolean) => {
        console.log('2FA Toggled:', enabled);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        toast({
            title: `Two-Factor Authentication ${enabled ? 'Enabled' : 'Disabled'}`,
            description: `Your 2FA setting has been updated.`,
            variant: "default",
        });
        // Update state if needed (e.g., refetch securityStatus)
    }


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>

      {/* Change Password Section */}
      <Card>
        <CardHeader>
           <CardTitle className="flex items-center gap-2"><KeyRound className="h-5 w-5" /> Change Password</CardTitle>
           <CardDescription>Update your account password regularly for better security.</CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...passwordForm}>
             <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
               <FormField
                 control={passwordForm.control}
                 name="currentPassword"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Current Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="Enter your current password" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={passwordForm.control}
                 name="newPassword"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>New Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="Enter your new password" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                <FormField
                 control={passwordForm.control}
                 name="confirmPassword"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Confirm New Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="Confirm your new password" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                <Button type="submit" disabled={passwordForm.formState.isSubmitting} className="mt-2">
                  {passwordForm.formState.isSubmitting ? 'Updating Password...' : 'Update Password'}
                </Button>
             </form>
           </Form>
        </CardContent>
      </Card>

      <Separator />

      {/* Two-Factor Authentication Section */}
       <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
         </CardHeader>
         <CardContent>
             <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                        Requires an authenticator app (e.g., Google Authenticator, Authy) for login verification.
                    </p>
                </div>
                 {/* Using controlled Switch from state */}
                 <Switch
                   checked={securityStatus.twoFactorEnabled} // Use state value
                   onCheckedChange={handle2FAToggle}
                   aria-readonly // Use aria-readonly if the switch state is derived solely from fetched data
                 />
            </div>
             {/* Add instructions or setup button if 2FA is disabled */}
             {!securityStatus.twoFactorEnabled && (
                <Button variant="outline" className="mt-4">Set Up 2FA</Button>
             )}
         </CardContent>
       </Card>

       <Separator />

        {/* Login History / Active Sessions Section */}
       <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Account Activity</CardTitle>
            <CardDescription>Review recent login activity on your account.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Login:</span>
                <span>{securityStatus.lastLogin.toLocaleString()} from {securityStatus.loginLocation}</span>
            </div>
             {/* Placeholder for a list of recent logins or active sessions */}
            <div className="border rounded-lg p-4">
                 <p className="text-sm font-medium mb-2">Recent Logins:</p>
                 {/* Example Login Entry */}
                <div className="flex justify-between items-center text-xs text-muted-foreground py-1 border-b last:border-b-0">
                    <span>{securityStatus.lastLogin.toLocaleDateString()} {securityStatus.lastLogin.toLocaleTimeString()}</span>
                    <span>{securityStatus.loginLocation}</span>
                    <span>Successful</span>
                 </div>
                {/* Add more entries here */}
                 <Button variant="link" size="sm" className="p-0 h-auto mt-3">View Full Login History</Button>
             </div>
            {/* <Button variant="outline">Manage Active Sessions</Button> */}
         </CardContent>
       </Card>


    </div>
  );
}
