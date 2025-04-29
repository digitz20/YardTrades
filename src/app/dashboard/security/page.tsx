
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
import { ShieldCheck, KeyRound, History, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'; // Added icons
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Import Alert components

// Define Zod schema for password change form validation
const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required.' }), // Min 1 to ensure it's not empty
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"], // path of error
});

type PasswordChangeInputs = z.infer<typeof passwordChangeSchema>;

// Mock security data (Replace with actual data fetching and state management)
const securityStatus = {
    twoFactorEnabled: true,
    // Example login history - fetch real data
    loginHistory: [
        { id: 1, date: new Date(Date.now() - 3600 * 1000 * 2), location: 'New York, USA', device: 'Chrome on Windows', status: 'Successful' },
        { id: 2, date: new Date(Date.now() - 3600 * 1000 * 24), location: 'London, UK', device: 'Safari on macOS', status: 'Successful' },
        { id: 3, date: new Date(Date.now() - 3600 * 1000 * 26), location: 'Unknown (VPN?)', device: 'Firefox on Linux', status: 'Failed Attempt' },
    ]
};

export default function SecurityPage() {
   const { toast } = useToast();
   // State for 2FA (replace with actual state management)
   const [is2FAEnabled, setIs2FAEnabled] = React.useState(securityStatus.twoFactorEnabled);
   const [isUpdating2FA, setIsUpdating2FA] = React.useState(false);


   // Form for Password Change
   const passwordForm = useForm<PasswordChangeInputs>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

    const { handleSubmit: handlePasswordSubmit, formState: { isSubmitting: isPasswordSubmitting }, reset: resetPasswordForm } = passwordForm;

   const onPasswordSubmit: SubmitHandler<PasswordChangeInputs> = async (data) => {
    console.log('Password change submitted:', data);
    // Simulate API call to change password
    // **IMPORTANT**: Verify currentPassword on the backend!
    await new Promise(resolve => setTimeout(resolve, 1500));

     // Simulate success/failure based on mock logic (e.g., current password check)
     const changeSuccessful = data.currentPassword === 'password123'; // Replace with actual backend check result

     if (changeSuccessful) {
       toast({
         title: "Password Changed Successfully",
         description: "Your account password has been updated.",
         variant: "default", // Use 'success' variant if defined
       });
       resetPasswordForm(); // Reset all fields on success
     } else {
        toast({
            title: "Password Change Failed",
            description: "The current password you entered is incorrect. Please try again.",
            variant: "destructive",
        });
         // Only reset password fields on failure, keep current for retry? Depends on UX preference.
         // passwordForm.resetField("currentPassword"); // Optionally clear current password
         passwordForm.resetField("newPassword");
         passwordForm.resetField("confirmPassword");
     }
   };

   // Handler for 2FA toggle (replace with actual API call and state update)
    const handle2FAToggle = async (enabled: boolean) => {
        setIsUpdating2FA(true);
        console.log('Attempting to toggle 2FA:', enabled);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const updateSuccessful = true; // Simulate API success

        if (updateSuccessful) {
            setIs2FAEnabled(enabled); // Update local state
            toast({
                title: `Two-Factor Authentication ${enabled ? 'Enabled' : 'Disabled'}`,
                description: `Your 2FA setting has been updated successfully.`,
                variant: "default",
            });
        } else {
             toast({
                title: "Update Failed",
                description: `Could not ${enabled ? 'enable' : 'disable'} 2FA. Please try again.`,
                variant: "destructive",
            });
        }
        setIsUpdating2FA(false);
    }


  return (
    <div className="flex flex-col gap-8"> {/* Use gap for consistent spacing */}
       {/* Removed redundant title */}

       {/* Security Overview Alert */}
       <Alert variant={is2FAEnabled ? "default" : "destructive"} className={is2FAEnabled ? "border-green-500/50 bg-green-900/10" : ""}>
            {is2FAEnabled ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertCircle className="h-5 w-5 text-red-500" />}
            <AlertTitle className={is2FAEnabled ? "text-green-400" : ""}>
                {is2FAEnabled ? "Account Security Enhanced" : "Action Recommended"}
            </AlertTitle>
            <AlertDescription className={is2FAEnabled ? "text-green-300/90" : ""}>
                {is2FAEnabled
                    ? "Two-Factor Authentication is currently active, adding an extra layer of security to your account."
                    : "Two-Factor Authentication is currently disabled. Enable it for significantly improved account security."}
            </AlertDescription>
        </Alert>


      {/* Change Password Section */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader>
           <CardTitle className="flex items-center gap-2 text-xl"><KeyRound className="h-5 w-5 text-primary" /> Change Password</CardTitle>
           <CardDescription>Update your account password regularly for better security. Choose a strong, unique password.</CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...passwordForm}>
             {/* Use handlePasswordSubmit */}
             <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6 max-w-md"> {/* Adjusted space-y */}
               <FormField
                 control={passwordForm.control}
                 name="currentPassword"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Current Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="Enter your current password" {...field} required />
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
                       <Input type="password" placeholder="Minimum 8 characters" {...field} required />
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
                       <Input type="password" placeholder="Re-enter new password" {...field} required />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                <div className="pt-2"> {/* Added padding top for button */}
                    <Button type="submit" disabled={isPasswordSubmitting}>
                      {isPasswordSubmitting ? (
                         <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating Password...</>
                      ) : (
                         'Update Password'
                      )}
                    </Button>
                </div>
             </form>
           </Form>
        </CardContent>
      </Card>

       {/* Separator handled by parent gap */}

      {/* Two-Factor Authentication Section */}
       <Card className="border border-border/60 shadow-sm">
         <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="h-5 w-5 text-primary" /> Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription>Add an extra layer of security using an authenticator app (e.g., Google Authenticator, Authy).</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4"> {/* Added space-y */}
             <div className="flex items-center justify-between space-x-4 rounded-lg border p-4 bg-muted/30">
                <div className="space-y-1"> {/* Reduced space-y */}
                    <Label htmlFor="two-factor-switch" className="text-base font-medium">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                        Secure your account by requiring a verification code upon login.
                    </p>
                </div>
                 {/* Using controlled Switch from state */}
                 <Switch
                   id="two-factor-switch"
                   checked={is2FAEnabled}
                   onCheckedChange={handle2FAToggle}
                   disabled={isUpdating2FA}
                   aria-label="Toggle Two-Factor Authentication"
                 />
                 {isUpdating2FA && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground ml-2" />}
            </div>
             {/* Add instructions or setup button if 2FA is disabled */}
             {!is2FAEnabled && !isUpdating2FA && (
                 <div className="mt-4 p-4 border border-dashed rounded-md bg-secondary/50">
                     <p className="text-sm text-muted-foreground mb-3">To enable 2FA, you'll need an authenticator app installed on your mobile device.</p>
                    <Button variant="default" onClick={() => alert('2FA Setup Flow Placeholder')}>Set Up 2FA Now</Button>
                    {/* Replace alert with actual setup modal/page */}
                 </div>
             )}
         </CardContent>
       </Card>

       {/* Separator handled by parent gap */}

        {/* Login History / Account Activity Section */}
       <Card className="border border-border/60 shadow-sm">
         <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><History className="h-5 w-5 text-primary" /> Account Login History</CardTitle>
            <CardDescription>Review recent login activity on your account. Contact support if you see any suspicious activity.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            {/* Placeholder for a list/table of recent logins */}
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                        <tr className="border-b">
                            <th className="text-left font-medium p-3">Date & Time</th>
                            <th className="text-left font-medium p-3 hidden md:table-cell">Location (Approx.)</th>
                            <th className="text-left font-medium p-3 hidden sm:table-cell">Device</th>
                            <th className="text-center font-medium p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {securityStatus.loginHistory.map((login) => (
                            <tr key={login.id} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                                <td className="p-3 text-muted-foreground">{login.date.toLocaleString()}</td>
                                <td className="p-3 text-muted-foreground hidden md:table-cell">{login.location}</td>
                                <td className="p-3 text-muted-foreground hidden sm:table-cell">{login.device}</td>
                                <td className="p-3 text-center">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${login.status === 'Successful' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                                        {login.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
            {/* <Button variant="outline" size="sm" className="mt-4">View Full Login History</Button> */}
            {/* Consider adding "Manage Active Sessions" if applicable */}
            {/* <Button variant="outline" size="sm" className="mt-4">Manage Active Sessions</Button> */}
         </CardContent>
       </Card>


    </div>
  );
}
