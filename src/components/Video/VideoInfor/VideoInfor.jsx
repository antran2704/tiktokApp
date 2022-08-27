import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { db } from "../../../firebase/firebaseConfig";
import addFollow from "../../../helpers/addFollow";
import Button from "../../Button/Button";
import { AppContext } from "../../Provider/AppProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import VideoContent from "../VideoContent/VideoContent";
import styles from "./VideoInfor.module.scss";
const cx = classnames.bind(styles);

function VideoInfor({ data, volume, onClick, muted, loading , handle, isStopAllVideos}) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow} = useContext(AppContext);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowed = () => {
    setIsFollowing(false);
    if (newFollow && newFollow.length > 0) {
      newFollow.map((item) => {
        if (data && data.uid === item.uid) {
          setIsFollowing(true);
        }
      });
    }
  };

  const handleAddFollow = () => {
    if (currentUser.uid) {
      if(isFollowing) {
        addFollow(currentUser.id,newFollow,isFollowing,data)
        setIsFollowing(false);
      } else {
        addFollow(currentUser.id,newFollow,isFollowing,data)
        setIsFollowing(true);
      }
      // const followingRef = db.collection("users").doc(currentUser.id);
      // let deleteFollowed;
      // if (isFollowing) {
      //   deleteFollowed = newFollow.filter((item) => {
      //     if (item.uid !== data.uid) {
      //       return item;
      //     }
      //   });
      //   followingRef.update({ following: deleteFollowed });
      //   setIsFollowing(false);
      // } else {
      //   const followingRef = db.collection("users").doc(currentUser.id);
      //   if (!newFollow.includes(data.id)) {
      //     followingRef.update({
      //       following: [...newFollow, data],
      //     });
      //   }
      //   setIsFollowing(true);
      // }
    } else {
      handleShowModal();
    }
  };

  useEffect(() => {
    if (newFollow && newFollow.length >= 0) {
      handleFollowed();
    }
  }, [newFollow]);

  return (
    <div className={cx(styles.item)}>
      <div className={cx(styles.inforWrap)}>
        {loading ? (
          <div className={cx(styles.img, loading && "loading")}></div>
        ) : (
          <div className={cx(styles.img, loading && "loading")}>
            <img src={data.photoURL || data.img} alt="" />
          </div>
        )}
        <div className={cx(styles.inforUserWrap)}>
          <div className={cx(styles.inforUser)}>
            <div className={cx(styles.infor)}>
              {loading ? (
                <div
                  className={cx(
                    styles.inforLink,
                    "loading card-title shorter-m"
                  )}
                ></div>
              ) : (
                <a href="#" className={cx(styles.inforLink)}>
                  <strong className={cx(styles.inforNickName)}>
                    {data.nickName}
                  </strong>
                  <p className={cx(styles.inforName)}>{data.name}</p>
                </a>
              )}
              {loading ? (
                <p className={cx(styles.desc, "loading card-title")}></p>
              ) : (
                <p className={cx(styles.desc)}>{data.desc}</p>
              )}
              {!loading && (
                <a href="#" className={cx(styles.inforMusic)}>
                  <BsMusicNoteBeamed className={cx(styles.inforIcon)} />
                  <strong className={cx(styles.inforMusicName)}>
                    {data.music}
                  </strong>
                </a>
              )}
            </div>
            {!loading && data.uid !== currentUser.uid && (
              <Button
                onClick={handleAddFollow}
                followedBtn={isFollowing && true}
                followBtn={!isFollowing && true}
                data={data}
                borderRadius
              >
                {isFollowing ? "Đang Follow" : "Follow"}
              </Button>
            )}
          </div>
          {loading ? (
            <VideoContent loading />
          ) : (
            <VideoContent
              volume={volume}
              onClick={onClick}
              muted={muted}
              data={data}
              handle = {handle}
              isStopAllVideos = {isStopAllVideos}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoInfor;
