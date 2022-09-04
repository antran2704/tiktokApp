/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { AuthContext } from "../providers/AuthProvider";

function useFireStore(collection, condition) {
  const { user } = useContext(AuthContext);
  const [documents, setDocments] = useState({});
  useEffect(() => {
    if(user?.uid) {
      let collectionRef = db.collection(collection);
    if (!condition) {
      setDocments([]);
      return;
    }
    collectionRef = collectionRef.where(
      condition.fieldName,
      condition.operator,
      condition.compareValue
    );
    collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocments(documents)
    });
    }
  },[collection,condition]);

  return documents;
}

export default useFireStore;
