import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"

const googleProvider = new GoogleAuthProvider();
export const signUp = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        throw new Error((error as Error).message)
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        throw new Error((error as Error).message)
    }
};

export const signUpWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        return result.user;
    } catch (error) {
        throw new Error((error as Error).message)
    }
}