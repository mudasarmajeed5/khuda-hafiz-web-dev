"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { toast } from "sonner";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn(email, password);
            toast.success("Login Successfull");
            router.push('/')
            return result;
        } catch (err) {
            const error = err as Error;
            toast.error(error.message)
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm mx-auto mt-24 p-6 rounded-lg border bg-background shadow"
            >
                <h2 className="text-xl font-semibold mb-6 text-center">Login to your account</h2>

                <div className="relative mb-3">
                    <Mail className="absolute text-muted-foreground left-2 top-2" size={18} />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                        required
                    />
                </div>

                <div className="relative mb-4">

                    <Lock className="absolute text-muted-foreground left-2 top-2" size={18} />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9"
                        required
                    />
                </div>

                <Button type="submit" className="w-full mb-3">
                    Login
                </Button>

                <p className="text-sm text-muted-foreground text-center mb-4">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>

        </>);
};

export default Login;
