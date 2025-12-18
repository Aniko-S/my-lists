import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth" // bejelentkezéshez
import {getFirestore} from "firebase/firestore"   // db-hez

// firebase oldalról másolva - ez minden projektnél más
const firebaseConfig = {
  apiKey: "AIzaSyDlKjbLij2mv9oDlyQ9fs1ZnoQjM4-YUQw",
  authDomain: "my-lists-c70b4.firebaseapp.com",
  projectId: "my-lists-c70b4",
  storageBucket: "my-lists-c70b4.firebasestorage.app",
  messagingSenderId: "10860193092",
  appId: "1:10860193092:web:18feb907c848e364b86311"
};

const app = initializeApp(firebaseConfig);

// bejelenzkezéshez
export const auth = getAuth(app)    
export const googleProvider = new GoogleAuthProvider()

// db-hez
export const db = getFirestore(app)