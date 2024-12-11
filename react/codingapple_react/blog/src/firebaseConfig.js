import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvcS3L0rg8lbM4vwHcyyEHfA8IN6rluSw",
  authDomain: "react-blog-fbb8d.firebaseapp.com",
  projectId: "react-blog-fbb8d",
  storageBucket: "react-blog-fbb8d.firebasestorage.app",
  messagingSenderId: "382980347332",
  appId: "1:382980347332:web:ae83d8b04e2b638c074091",
  measurementId: "G-HTSCZ9P7WE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
