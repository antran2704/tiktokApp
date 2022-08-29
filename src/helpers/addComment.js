import { db } from "../firebase/firebaseConfig";


const addComment = (idVideo,currentUser,data) => {
    const VideoRef = db.collection("videos").doc(idVideo);
    VideoRef.update({ comments: [...data.comments,currentUser] });
}

export default addComment