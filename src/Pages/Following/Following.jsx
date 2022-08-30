import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../providers/AppProvider";
import Video from "../../components/Video/Video";
import styles from "./Following.module.scss";

const cx = classnames.bind(styles);
function Following() {
  const { currentUser,newFollow, listVideos } = useContext(AppContext);
  const [listVideoFollowing, setListVideoFollowing] = useState([]);

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
  }, [currentUser]);
  return (
    <div className={cx(styles.Following)}>
      {listVideoFollowing.length > 0 ?
      <Video data = {listVideoFollowing}/>
      : currentUser?.uid ? 
      <h1>Bạn chưa follow ai cả!!!</h1>
      :
      <h1>Đăng nhập đã bạn ơi!!!</h1>
      }
    </div>
  );
}

export default Following;
