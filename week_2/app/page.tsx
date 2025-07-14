"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleSignout = async () => {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return null;

  return (
    <main className="p-6 flex justify-center items-center text-black flex-col mt-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Welcome to your Dashboard</h1>
      <p className="text-muted-foreground">Email: {user.email}</p>
      <p className="text-sm text-muted-foreground mt-1">userId: {user.uid}</p>
      <Button variant={"destructive"}
        onClick={handleSignout}
        className="mt-3 cursor-pointer">Logout</Button>
    </main>
  );
}
