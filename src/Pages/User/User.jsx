/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./User.module.scss";
import className from "classnames/bind";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../providers/AppProvider";
import addFollow from "../../helpers/addFollow";
import { AuthContext } from "../../providers/AuthProvider";
import { useSelector } from "react-redux";
import useViewport from "../../hooks/useViewport";

const cx = className.bind(styles);
function User() {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow, listVideos } = useContext(AppContext);
  const { inforUser } = useSelector((state) => state);
  const widthScreen = useViewport()
  const [isFollowing, setIsFollowing] = useState(false);
  const [listVideo, setListVideo] = useState([]);
  const width = widthScreen < 600 ? 30 : widthScreen < 900 ? 60 : 100;
  const handleAddFollow = () => {
    if (currentUser.uid) {
      if (isFollowing) {
        addFollow(currentUser.id, newFollow, isFollowing, inforUser);
        setIsFollowing(false);
      } else {
        addFollow(currentUser.id, newFollow, isFollowing, inforUser);
        setIsFollowing(true);
      }
    } else {
      handleShowModal();
    }
  };

  const handleFollowed = () => {
    setIsFollowing(false);
    if (newFollow && newFollow.length > 0) {
      newFollow.map((item) => {
        if (inforUser && inforUser.uid === item.uid) {
          setIsFollowing(true);
        }
        return [];
      });
    }
  };

  const handlePlayVideo = (e) => {
    e.target.play();
  };
  const handleStopVideo = (e) => {
    e.target.pause();
    e.target.currentTime = 0;
  };

  useEffect(() => {
    if (newFollow && newFollow.length >= 0) {
      handleFollowed();
    }
  }, [newFollow, inforUser]);

  useEffect(() => {
    const result = listVideos.filter((video) => {
      return video.uid === inforUser.uid;
    });
    setListVideo(result);
  }, [inforUser]);
  return (
    <div className={cx(styles.layout, "padding", "p-top")}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.inforWrap)}>
          <img
            style={{ width: `${width}px`, height: `${width}px` }}
            className={cx(styles.img)}
            src={
              inforUser.photoURL ||
              "https://lh3.googleusercontent.com/a/AItbvmkBU0Y6wr7WHMnQcKtpZ7tpo1VkWpwB7M_66BlN=s96-c"
            }
            alt=""
          />
          <div className={cx(styles.infor)}>
            <h3 className={cx(styles.inforNickName)}>{inforUser.nickName}</h3>
            <p className={cx(styles.inforName)}>{inforUser.name}</p>
          </div>
          {inforUser.uid !== currentUser.uid && (
            <Button
              onClick={handleAddFollow}
              followedBtn={isFollowing && true}
              followBtn={!isFollowing && true}
              data={inforUser}
              borderRadius
            >
              {isFollowing ? "Đang Follow" : "Follow"}
            </Button>
          )}
        </div>
        <div className={cx(styles.inforDesc)}>
          <span>
            <strong>2</strong>
            Followings
          </span>
          <span>
            <strong>2</strong>
            Followers
          </span>
        </div>
      </div>
      <div className={cx(styles.line)}></div>
      <div className={cx(styles.body)} style = {{gridTemplateColumns: `repeat(${widthScreen < 900 ? 3 : 4}, auto)`}}>
        {listVideo.map((item, index) => (
          <div key={index} className={cx(styles.video)}>
            <video
              onMouseOver={handlePlayVideo}
              onMouseOut={handleStopVideo}
              muted
              src="https://v16-webapp.tiktok.com/5db26b7e0b9c2f1b29c024c689c374db/6323aa29/video/tos/useast2a/tos-useast2a-pve-0037-aiso/b1e6248d22ef48eba661974fe6f04140/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1608&bt=804&cs=0&ds=3&ft=eXd.6Hk_Myq8Z.G-phe2NuyQml7Gb&mime_type=video_mp4&qs=0&rc=NzpmOzs5OGg2ZWVlNmQ5NUBpM3FnaGg6ZnI3ZTMzZjgzM0AuLmAuMzZhNi8xMl9eNmFgYSNiYS0ycjRfXmdgLS1kL2Nzcw%3D%3D&l=20220915164134010245013038141FA42A&btag=80000"
            ></video>
            <p className={cx(styles.videoDesc)}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
