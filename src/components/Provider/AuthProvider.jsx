import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [user,setUser] = useState({})
    useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged((user) => {
          if (user) {
            const { displayName, photoURL, email, uid } = user;
            console.log({ displayName, photoURL, email, uid });
            setUser({displayName, photoURL, email, uid})
            return;
          }
          setUser({})
        });
    
        return () => {
          unsubcribed();
        };
      },[window.location.pathname]);
    return ( 
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
     );
}

export default AuthProvider;