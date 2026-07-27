import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  type Auth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const missingConfig = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingConfig.length) {
  throw new Error(`Missing Firebase environment variables: ${missingConfig.join(', ')}`);
}

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase v12 manages the platform-appropriate Auth instance internally.
const auth: Auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

export { auth, firebaseApp, firestore };
