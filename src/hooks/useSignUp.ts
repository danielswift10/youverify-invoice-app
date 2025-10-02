/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import type { ISignUp } from "../(auth)/types";
import { auth, db } from "../(auth)/store/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

interface IUseSignUp {
  registerUser: (data: ISignUp) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useSignUp = (): IUseSignUp => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const registerUser = async (data: ISignUp) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", userCredential.user.uid), {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          createdAt: new Date().toISOString(),
        });
      }

      toast.success("User registered successfully");
      navigate("/invoice");
    } catch (err: any) {
      console.error("Error signing up:", err);

      let errorMessage = "An error occurred during sign up. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already registered. Please sign in instead.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters long.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
    clearError,
  };
};
