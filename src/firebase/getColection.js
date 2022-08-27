import { db } from "./firebaseConfig";

export const getDocuments = async (collection, condition) => {
  try {
    let collectionRef = db.collection(collection);
    if (condition) {
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
      const documents = await collectionRef.get().then((res) => {
        return res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
      });
      return documents;
    } else {
      const documents = await collectionRef.get().then((res) => {
        return res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
      });
      return documents;
    }
  } catch (error) {
    console.log("error get document");
  }
};
