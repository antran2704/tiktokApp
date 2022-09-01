import firebase from "firebase/compat/app"
import "firebase/compat/analytics"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_FfQg9Qs5d-2L9Q6VUgvzmv6Xkh-2NfI",
  authDomain: "tiktok-app-e426e.firebaseapp.com",
  projectId: "tiktok-app-e426e",
  storageBucket: "tiktok-app-e426e.appspot.com",
  messagingSenderId: "764220515332",
  appId: "1:764220515332:web:20c247aae5398467904151",
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
