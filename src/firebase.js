import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD27-4GsbKndjTp43DMFTdeFSpwZNcXge8",
    authDomain: "react-chat-app-88741.firebaseapp.com",
    projectId: "react-chat-app-88741",
    storageBucket: "react-chat-app-88741.appspot.com",
    messagingSenderId: "431682177336",
    appId: "1:431682177336:web:1404099974faf2a39f99cd"
  };

  initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getFirestore();

  export { auth, provider, db };