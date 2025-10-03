import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const env = import.meta.env as Record<string, unknown>;

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = env;

function ensure(name: string, value: unknown): string {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return String(value);
}

const firebaseConfig = {
  apiKey: ensure("VITE_API_KEY", VITE_API_KEY),
  authDomain: ensure("VITE_AUTH_DOMAIN", VITE_AUTH_DOMAIN),
  projectId: ensure("VITE_PROJECT_ID", VITE_PROJECT_ID),
  storageBucket: ensure("VITE_STORAGE_BUCKET", VITE_STORAGE_BUCKET),
  messagingSenderId: ensure(
    "VITE_MESSAGING_SENDER_ID",
    VITE_MESSAGING_SENDER_ID
  ),
  appId: ensure("VITE_APP_ID", VITE_APP_ID),
  measurementId: (VITE_MEASUREMENT_ID as string) ?? undefined,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
