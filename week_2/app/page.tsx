"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ResizableHandleDemo } from "../components/DashboardSidebar";
import { ModeToggle } from "@/components/ModeToggle";
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
    <div className="h-[100vh-80px)]">
      <div className="p-2 flex justify-between items-center shadow-md shadow-gray-200 dark:shadow-gray-900">
        <div>Hello, <span className="font-bold">{user.email?.split("@")[0]}</span></div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">khudahafiz.co</span>
          <ModeToggle/>
        </div>
      </div>
      <ResizableHandleDemo />
    </div>
  );
}
