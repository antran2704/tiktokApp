import firebase,{ db } from "./firebaseConfig"


const addDocument = (collection,data) => {
    const query = db.collection(collection)
    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export default addDocument;