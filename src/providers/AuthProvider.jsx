import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleLogOut = () => {
    auth.signOut();
    window.location.pathname = "/";
  };

  useEffect(() => {
    if (user) {
      setShowModal(false);
    }
  }, [user]);


  useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;
        setUser({ displayName, photoURL, email, uid });
        return;
      }
      setUser({});
    });

    return () => {
      unsubcribed();
    };
  }, [window.location.pathname]);
  return (
    <AuthContext.Provider
      value={{ user, showModal, setUser,  handleLogOut,handleShowModal }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
