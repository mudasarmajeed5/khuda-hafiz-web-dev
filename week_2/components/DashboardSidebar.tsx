"use client"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "./ui/button";

export function ResizableHandleDemo() {
    const handleSignout = async () => {
        await signOut(auth);
    }
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border min-h-[calc(100vh-40px)]"
        >
            <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center">
                    <Button onClick={handleSignout} className="font-semibold">Logout</Button>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center">
                    <span className="font-semibold">Content</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
