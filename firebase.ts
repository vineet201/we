import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHdrOAa85ljlzdHBAYdIXiaaWBz0UFz1w",
  authDomain: "fcmsetu.firebaseapp.com",
  projectId: "fcmsetu",
  storageBucket: "fcmsetu.firebasestorage.app",
  messagingSenderId: "348329848854",
  appId: "1:348329848854:web:7e91b82f4b4592d87d4537",
  measurementId: "G-2MWX8L7RZ3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
