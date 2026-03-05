import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Vercel বা Environment Variables থেকে ডাটাগুলো লোড করা হচ্ছে
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// অ্যাপটি একবারের বেশি যেন ইনিশিয়ালাইজ না হয় (Next.js এর জন্য জরুরি)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ডেটাবেস এবং অথেন্টিকেশন এক্সপোর্ট
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
