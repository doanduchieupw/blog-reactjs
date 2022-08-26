import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD1v5MhR1Xit_ariJ-eHQHQw0i7I2kbv98",
  authDomain: "blog-reactjs-db.firebaseapp.com",
  projectId: "blog-reactjs-db",
  storageBucket: "blog-reactjs-db.appspot.com",
  messagingSenderId: "450917569338",
  appId: "1:450917569338:web:fa6b41ed4ba84cd8a03603",
  measurementId: "G-3QK50QT8FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
