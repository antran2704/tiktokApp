import { db } from "../firebase/firebaseConfig";


const likeVideo = (idCurrentUser,listLikeVideos,isLiked,data) => {
    const followingRef = db.collection("videos").doc(data.id);
    const userRef = db.collection("users").doc(idCurrentUser);
    if (isLiked) {
      followingRef.update({
        likes: data.likes - 1,
      });
      const newLikedVideo = listLikeVideos.filter((item) => {
        return item !== data.id;
      });
      userRef.update({
        liked: [...newLikedVideo],
      });
    } else {
      followingRef.update({
        likes: data.likes + 1,
      });
      if (!listLikeVideos.includes(data.id)) {
        userRef.update({
          liked: [...listLikeVideos, data.id],
        });
      }
    }
}

export default likeVideo