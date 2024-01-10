// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApP1ttZUHroK9A9-xQvP9Ue6Z61HfO-MQ",
  authDomain: "fipezo.firebaseapp.com",
  projectId: "fipezo",
  storageBucket: "fipezo.appspot.com",
  messagingSenderId: "534873725876",
  appId: "1:534873725876:web:2be873122c15715b8670e1",
  measurementId: "G-CT555QHFEJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
