"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { Home, User, Mail, Settings, LogOut, BookIcon, LucideIcon } from "lucide-react";
const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
import Weather from "./WeatherWidget";
import dynamic from "next/dynamic";
type navItemsProp =  {
    label: string;
    icon: LucideIcon;
}[]
const navItems:navItemsProp = [
        {
            label: "Home",
            icon: Home,
        },
        {
            label: "Profile",
            icon: User,
        },
        {
            label: "Messages",
            icon: Mail,
        },
        {
            label: "Bookings",
            icon: BookIcon,
        },
        {
            label: "Settings",
            icon: Settings,
        },
    ];
export function ResizableHandleDemo() {
    const handleSignout = async () => {
        await signOut(auth);
    };

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border min-h-[calc(100vh-40px)]"
        >
            <ResizablePanel defaultSize={20}>
                <div className="flex min-h-[calc(100vh-40px)] border flex-col justify-between w-full px-4 py-6">
                    <div className="flex flex-col gap-3 w-full">
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                variant="ghost"
                                className="justify-start gap-3 w-full text-base"
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="secondary"
                        onClick={handleSignout}
                        className="justify-start gap-3 w-full text-base"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Button>
                </div>

            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={75}>
                <div className="p-4">
                    <ChatBot />
                    <Weather />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
