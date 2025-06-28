import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQH_qTuvLk9H7yc_f3ScAxV_wXEADSlbk",
  authDomain: "tickmark-346bb.firebaseapp.com",
  projectId: "tickmark-346bb",
  storageBucket: "tickmark-346bb.appspot.com",
  messagingSenderId: "330822445220",
  appId: "1:330822445220:web:5382a239b873b1fccdde31",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
