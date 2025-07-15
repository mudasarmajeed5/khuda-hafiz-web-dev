"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ResizableHandleDemo } from "../components/DashboardSidebar";
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  

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
    <div className="min-w-screen min-h-screen">
      <div className="py-2 flex justify-between shadow-md shadow-gray-200 px-4">
        <div>Hello, <span className="font-bold">Youre signed in as {user.email}</span></div>
        <div className="font-semibold underline hover:underline-offset-4 cursor-pointer">Team: Khuda Hafiz</div>
      </div>
      <ResizableHandleDemo />
    </div>
  );
}
