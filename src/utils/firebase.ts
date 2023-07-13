import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCH6XS5A7qDjGDe0vOQrxp9bbUmZLULxTw",
  authDomain: "parka-1d2a1.firebaseapp.com",
  projectId: "parka-1d2a1",
  storageBucket: "parka-1d2a1.appspot.com",
  messagingSenderId: "909808375393",
  appId: "1:909808375393:web:b0b17b373bef568d54fc20",
  measurementId: "G-6PR2SY7NK2",
};

initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
