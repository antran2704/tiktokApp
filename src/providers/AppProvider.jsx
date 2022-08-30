import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDocuments } from "../firebase/getColection";
import useFireStore from "../hooks/useFireStore";
import useGetStore from "../hooks/useGetStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

function AppProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [listCurrentUsers, setListCurrentUsers] = useState([]);
  const [newFollow, setNewFollow] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  
  const listVideos = useGetStore("videos");
  const currentUserCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "==",
      compareValue: user.uid,
    };
  }, [user]);

  const getCurrentUser = useFireStore("users", currentUserCondition);

  const getListUsers = async () => {
    const currentListUsers = await getDocuments("users", {
      fieldName: "uid",
      operator: "!=",
      compareValue: user.uid,
    });
    setListCurrentUsers(currentListUsers);
  };

  useEffect(() => {
    if (user.uid) {
      getListUsers();
    }
  }, [user]);

  useEffect(() => {
    if (getCurrentUser.length > 0) {
      setCurrentUser(getCurrentUser[0]);
      setNewFollow(getCurrentUser[0].following);
      setLikedVideos(getCurrentUser[0].liked);
    }
  }, [getCurrentUser,getCurrentUser[0]]);

  return (
    <AppContext.Provider
      value={{
        listVideos,
        currentUser,
        listCurrentUsers,
        newFollow,
        likedVideos,
        setLikedVideos,
        setNewFollow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
