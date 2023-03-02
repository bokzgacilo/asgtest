import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDODYUzw1YZe2V3QQV0LjYInjki39Ds8lo",
  authDomain: "asgtest-45c17.firebaseapp.com",
  databaseURL: "https://asgtest-45c17-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asgtest-45c17",
  storageBucket: "asgtest-45c17.appspot.com",
  messagingSenderId: "318562220333",
  appId: "1:318562220333:web:787480542e1c86ac623ba4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realtimedb = getDatabase();
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });

      alert("User registered")
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }

  alert("User is already register, redirecting to chat")
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  realtimedb
};