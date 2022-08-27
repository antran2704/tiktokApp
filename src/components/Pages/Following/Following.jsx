import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Provider/AppProvider";
import Video from "../../Video/Video";
import styles from "./Following.module.scss";

const cx = classnames.bind(styles);
function Following() {
  const [listVideoFollowing, setListVideoFollowing] = useState([]);
  const { currentUser, listVideos } = useContext(AppContext);
  console.log(listVideoFollowing);

  useEffect(() => {
    if (currentUser?.uid) {
      const listIdFollowing = currentUser.following.map((item) => {
        return item.uid
      });
      const videosFollow = listVideos.filter(video => {
        return listIdFollowing.includes(video.uid)
      })
      console.log(listIdFollowing)
      console.log(videosFollow)
      setListVideoFollowing([...videosFollow]);
    }
  }, [currentUser.uid]);
  return (
    <div className={cx(styles.Following)}>
      <Video data = {listVideoFollowing}/>
    </div>
  );
}

export default Following;
