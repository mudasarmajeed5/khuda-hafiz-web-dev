"use client";

import { useState } from "react";
import { signUp, signUpWithGoogle } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password is not matching")
            return;
        }
        try {
            const user = await signUp(email, password);
            if (user) {
                router.push("/login")
            }
        } catch (err) {
            const error = err as Error;
            toast.error(error.message)
        }
    };
    const handleGoogleSignup = async () => {
        try {
            const user = await signUpWithGoogle();
            if (user) {
                router.push("/")
                toast.success("Signup Successfull");
            }
        } catch (err) {
            const error = err as Error;
            toast.error(error.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto mt-24 p-6 rounded-lg border bg-background shadow"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2>
            <div className="relative">
                <Mail className="absolute text-muted-foreground left-2 top-2" size={18} />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3 pl-8"
                    required
                />
            </div>
            <div className="relative">
                <Lock className="absolute text-muted-foreground left-2 top-2" size={18} />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 pl-8"
                    required
                />
            </div>
            <div className="relative">
                <Lock className="absolute text-muted-foreground left-2 top-2" size={18} />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-3 pl-8"
                    required
                />
            </div>

            <Button type="submit" className="w-full hover:cursor-pointer mb-2">
                Sign Up
            </Button>
            <Button variant={"outline"} onClick={handleGoogleSignup} className="w-full hover:cursor-pointer">
                Sign Up with Google
            </Button>
            <div className="text-muted-foreground text-xs my-2">Have an account ? <Link href={"/login"} className="font-bold">login</Link></div>
            <div className="text-xs text-muted-foreground  mb-2">
                Before signup view our
                <Link href="/terms" className="hover:underline"> terms</Link> &
                <Link href="/privacy" className="hover:underline"> privacy</Link>
            </div>
        </form>
    );
};

export default SignUp;
