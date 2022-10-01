import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCXbuwlA_AO19DwLWZi9AW_901Td87ZT94",
  authDomain: "my-react-blog-8dc71.firebaseapp.com",
  projectId: "my-react-blog-8dc71",
  storageBucket: "my-react-blog-8dc71.appspot.com",
  messagingSenderId: "661237252865",
  appId: "1:661237252865:web:1c4e10905fb82c6e9e9100",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const functions = getFunctions(app);

//const addAdmin = httpsCallable(functions, "addAdminRole");

export { db, auth, functions };
