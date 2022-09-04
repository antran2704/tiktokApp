import { db } from "../firebase/firebaseConfig";


const addFollow = (idCurrentUser,listFollow,isFollowing,data) => {
    const followingRef = db.collection("users").doc(idCurrentUser);
    let deleteFollowed;
    if (isFollowing) {
      deleteFollowed = listFollow.filter((item) => {
        if (item.uid !== data.uid) {
          return item;
        }
        return [];
      });
      followingRef.update({ following: deleteFollowed });
    } else {
      if (!listFollow.includes(data.id)) {
        followingRef.update({
          following: [...listFollow, data],
        });
      }
    }
}

export default addFollow