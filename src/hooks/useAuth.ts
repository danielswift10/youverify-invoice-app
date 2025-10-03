import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, db } from "../pages/auth/store/firebase";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  provider?: string;
}

interface IUseAuth {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  getInitials: () => string;
}

export const useAuth = (): IUseAuth => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDocRef = doc(db, "Users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data() as UserData);
          } else {
            setUserData({
              firstName: currentUser.displayName?.split(" ")[0] || "",
              lastName:
                currentUser.displayName?.split(" ").slice(1).join(" ") || "",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || undefined,
              createdAt:
                currentUser.metadata.creationTime || new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({
            firstName: currentUser.displayName?.split(" ")[0] || "",
            lastName:
              currentUser.displayName?.split(" ").slice(1).join(" ") || "",
            email: currentUser.email || "",
            photoURL: currentUser.photoURL || undefined,
            createdAt:
              currentUser.metadata.creationTime || new Date().toISOString(),
          });
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getInitials = (): string => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    if (user?.displayName) {
      const names = user.displayName.split(" ");
      return names.length > 1
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : names[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    logout,
    getInitials,
  };
};
