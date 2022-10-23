// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZ2H6sXV7KLF6MdOCaIwxSV3UQcSGcmpk",
  authDomain: "chat-app-820d1.firebaseapp.com",
  projectId: "chat-app-820d1",
  storageBucket: "chat-app-820d1.appspot.com",
  messagingSenderId: "967273698273",
  appId: "1:967273698273:web:f86f7fdecce2c2935af8a0",
  measurementId: "G-7HJ7CH6SBX",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app, "gs://chat-app-820d1.appspot.com/");
export { auth, db, storage };
export default app;
