import { createContext } from "react";
import { useState } from "react";
import useGetStore from "../hooks/useGetStore";

export const AppContext = createContext()

function AppProvider({children}) {

    const listVideos = useGetStore("videos")
    console.log(listVideos)
    return ( 
        <AppContext.Provider value={{listVideos}}>{children}</AppContext.Provider>
     );
}

export default AppProvider;