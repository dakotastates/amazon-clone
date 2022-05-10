// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ17Ze2B-iQpg296bjJrofrqZhg6vPjNk",
  authDomain: "clone-31b93.firebaseapp.com",
  projectId: "clone-31b93",
  storageBucket: "clone-31b93.appspot.com",
  messagingSenderId: "67857125854",
  appId: "1:67857125854:web:511acfbebab106a4458d4f",
  measurementId: "G-SBS46T0BD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
