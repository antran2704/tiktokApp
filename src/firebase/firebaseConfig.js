import firebase from "firebase/compat/app"
import "firebase/compat/analytics"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
  authDomain: "tiktok-app-e426e.firebaseapp.com",
  projectId: "tiktok-app-e426e",
  storageBucket: "tiktok-app-e426e.appspot.com",
  messagingSenderId: "764220515332",
  appId: `${process.env.REACT_APP_FIREBASE_ID}`,
  measurementId: "G-0H4EY946X4",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

// auth.useEmulator("http://localhost:9099")
// if(window.location.hostname === "localhost") {
//   db.useEmulator("localhost",8080)
// }

export {db, auth };
export default firebase;
