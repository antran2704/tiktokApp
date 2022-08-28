import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Provider/AppProvider";
import Video from "../../Video/Video";
import styles from "./Following.module.scss";

const cx = classnames.bind(styles);
function Following() {
  const [listVideoFollowing, setListVideoFollowing] = useState([]);
  const { currentUser,newFollow, listVideos } = useContext(AppContext);
  console.log(listVideoFollowing);

  useEffect(() => {
    if (currentUser?.uid) {
      const listIdFollowing = newFollow.map((item) => {
        return item.uid
      });
      const videosFollow = listVideos.filter(video => {
        return listIdFollowing.includes(video.uid)
      })
      
      setListVideoFollowing([...videosFollow]);
    }
  }, [currentUser.uid]);
  return (
    <div className={cx(styles.Following)}>
      {listVideoFollowing.length > 0 ?
      <Video data = {listVideoFollowing}/>
      :
      <h1>Bạn chưa follow ai cả!!!</h1>
      }
    </div>
  );
}

export default Following;
