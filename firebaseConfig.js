import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAL-tCDGkNUGkrN4aOz7D-7UceNi5QjZ9s",
  authDomain: "chat-application-beb34.firebaseapp.com",
  projectId: "chat-application-beb34",
  storageBucket: "chat-application-beb34.appspot.com",
  messagingSenderId: "389647357741",
  appId: "1:389647357741:web:b07472f9b3d638041265a4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
