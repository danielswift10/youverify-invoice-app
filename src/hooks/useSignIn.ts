/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../pages/auth/store/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { ISignIn } from "../pages/auth/types";

interface IUseSignIn {
  signInUser: (data: ISignIn) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isSigningIn: boolean;
  isSigningInWithGoogle: boolean;
  error: string | null;
  clearError: () => void;
}

export const useSignIn = (): IUseSignIn => {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const signInUser = async (data: ISignIn) => {
    setIsSigningIn(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast.success("Signed in successfully!");
      navigate("/invoice");
    } catch (err: any) {
      let errorMessage = "An error occurred during sign in. Please try again.";

      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsSigningIn(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsSigningInWithGoogle(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        try {
          await setDoc(userDocRef, {
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            provider: "google",
          });
        } catch (firestoreError) {
          console.error("⚠️ Firestore error (non-critical):", firestoreError);
        }
      }

      toast.success("Signed in successfully!");
      navigate("/invoice");
    } catch (err: any) {
      console.error("❌ Google sign in error:", err);

      let errorMessage = "Failed to sign in with Google. Please try again.";

      switch (err.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Sign in cancelled.";
          break;
        case "auth/popup-blocked":
          errorMessage = "Pop-up blocked. Please allow pop-ups and try again.";
          break;
        case "auth/cancelled-popup-request":
          setIsSigningInWithGoogle(false);
          return;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage =
            "An account already exists with this email using a different sign-in method.";
          break;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsSigningInWithGoogle(false);
    }
  };

  return {
    signInUser,
    signInWithGoogle,
    isSigningIn,
    isSigningInWithGoogle,
    error,
    clearError,
  };
};
