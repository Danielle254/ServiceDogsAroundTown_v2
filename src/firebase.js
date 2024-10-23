import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';

const firebaseKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "service-dogs-around-town-v2.firebaseapp.com",
  projectId: "service-dogs-around-town-v2",
  storageBucket: "service-dogs-around-town-v2.appspot.com",
  messagingSenderId: "390257393926",
  appId: "1:390257393926:web:f9679142d12fe1b65a1e87",
  measurementId: "G-DSM0L1BVZF"
};


const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const entriesCollection = collection(database, "entries");