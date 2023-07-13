import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCH6XS5A7qDjGDe0vOQrxp9bbUmZLULxTw",
  authDomain: "parka-1d2a1.firebaseapp.com",
  projectId: "parka-1d2a1",
  storageBucket: "parka-1d2a1.appspot.com",
  messagingSenderId: "909808375393",
  appId: "1:909808375393:web:b0b17b373bef568d54fc20",
  measurementId: "G-6PR2SY7NK2",
});


//
export const storage = getStorage(firebaseApp);

// export const auth = getAuth(firebaseApp);
// export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(firebaseApp);
export const app = getApp();
