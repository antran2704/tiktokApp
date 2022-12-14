/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getDocuments } from "../firebase/getColection";
import useFireStore from "../hooks/useFireStore";
import useGetStore from "../hooks/useGetStore";
import { getAllUsers } from "../redux/actions";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

function AppProvider({ children }) {
  const dispatch = useDispatch()
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [listCurrentUsers, setListCurrentUsers] = useState([]);
  const [allUser,setAllUser] = useState([])
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

  const getAllUser = async(collection) => {
      try {
        const result = await getDocuments(collection)
        setAllUser(result)
        dispatch(getAllUsers(result))
      } catch (error) {
        console.log("error in get all user")
      }
  }

  const getListUsers = async () => {
    const currentListUsers = await getDocuments("users", {
      fieldName: "uid",
      operator: "!=",
      compareValue: user.uid,
    });
    setListCurrentUsers(currentListUsers);
    dispatch(getAllUsers(currentListUsers))
  };

  useEffect(() => {
    if (user.uid) {
      getListUsers();
    } else {
      getAllUser("users")
    }
  }, [user]);

  useEffect(() => {
    if (getCurrentUser.length > 0) {
      setCurrentUser(getCurrentUser[0]);
      setNewFollow(getCurrentUser[0].following);
      setLikedVideos(getCurrentUser[0].liked);
    }
  }, [getCurrentUser, getCurrentUser[0]]);

  return (
    <AppContext.Provider
      value={{
        allUser,
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