import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
export async function handleResetasync(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "If email exists, a reset link is sent." }
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}
