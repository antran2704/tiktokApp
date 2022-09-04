import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import firebase from "../../firebase/firebaseConfig";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const data = [
  {
    icon: BsFacebook,
    title: "Tiếp tục với facebook",
    provider: facebookProvider,
  },
  {
    icon: FcGoogle,
    title: "Tiếp tục với Google",
    provider: googleProvider,
  },
];

export default data;
