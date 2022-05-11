import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQ17Ze2B-iQpg296bjJrofrqZhg6vPjNk",
  authDomain: "clone-31b93.firebaseapp.com",
  projectId: "clone-31b93",
  storageBucket: "clone-31b93.appspot.com",
  messagingSenderId: "67857125854",
  appId: "1:67857125854:web:511acfbebab106a4458d4f",
  measurementId: "G-SBS46T0BD7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
