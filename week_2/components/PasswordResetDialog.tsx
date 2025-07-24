"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleResetasync } from "@/app/login/handleReset";
export const ResetPasswordDialog = () => {
    const [email, setEmail] = useState("");

    const handleReset = async () => {
        const response = await handleResetasync(email);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="text-gray-600 text-xs -mt-1 mb-2 p-0 h-auto">
                    Forgot Password? Reset
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogTitle>Reset Password</DialogTitle>
                <div className="space-y-4 mt-2">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleReset} className="w-full">
                        Send Reset Email
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
