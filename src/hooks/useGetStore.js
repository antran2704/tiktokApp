import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

function useGetStore(collection) {
  const [documents, setDocuments] = useState();

  useEffect(() => {
    db.collection(collection).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(data)
    });
  },[collection]);

  return documents;
}

export default useGetStore;
