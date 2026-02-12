import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFyAZxUuhVv2ZgX8jdPoUJLAWtwGZeU9Y",
    authDomain: "madballers-1357e.firebaseapp.com",
    projectId: "madballers-1357e",
    storageBucket: "madballers-1357e.firebasestorage.app",
    messagingSenderId: "89604681169",
    appId: "1:89604681169:web:95a620719f97d53c79c4f0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);