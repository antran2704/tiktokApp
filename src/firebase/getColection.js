import { db } from "./firebaseConfig";

export const getDocuments = async (collection) => {
  try {
    let collectionRef = db.collection(collection);
    const documents = await collectionRef.get().then((res) => {
      return res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
    });
    return documents;
  } catch (error) {
    console.log("error get document");
  }
};
