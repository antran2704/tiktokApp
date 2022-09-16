/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import video1 from "../../assets/videos/tải xuống.mp4";
import Button from "../../components/Button/Button";
import addFollow from "../../helpers/addFollow";
import useViewport from "../../hooks/useViewport";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./User.module.scss";

const cx = className.bind(styles);
function User({ data }) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow, listVideos } = useContext(AppContext);
  const widthScreen = useViewport();
  const [isFollowing, setIsFollowing] = useState(false);
  const [listVideo, setListVideo] = useState([]);
  const width = widthScreen < 600 ? 30 : widthScreen < 900 ? 60 : 100;
  const handleAddFollow = () => {
    if (currentUser.uid) {
      if (isFollowing) {
        addFollow(currentUser.id, newFollow, isFollowing, data);
        setIsFollowing(false);
      } else {
        addFollow(currentUser.id, newFollow, isFollowing, data);
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
        if (data && data.uid === item.uid) {
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
  }, [newFollow, data]);

  useEffect(() => {
    const result = listVideos.filter((video) => {
      return video.uid === data.uid;
    });
    setListVideo(result);
  }, [data]);
  return (
    <div className={cx(styles.layout, "padding", "p-top")}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.inforWrap)}>
          <img
            style={{ width: `${width}px`, height: `${width}px` }}
            className={cx(styles.img)}
            src={
              data.photoURL ||
              "https://lh3.googleusercontent.com/a/AItbvmkBU0Y6wr7WHMnQcKtpZ7tpo1VkWpwB7M_66BlN=s96-c"
            }
            alt=""
          />
          <div className={cx(styles.infor)}>
            <h3 className={cx(styles.inforNickName)}>
              {data.nickName}
              {data.tick && (
                <div className={cx(styles.check)}>
                  <FontAwesomeIcon
                    className={cx(styles.checkIcon)}
                    icon={faCircleCheck}
                  />
                </div>
              )}
            </h3>
            <p className={cx(styles.inforName)}>{data.name}</p>
            {data.uid !== currentUser.uid && (
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
        </div>
        <div className={cx(styles.inforDesc)}>
          <span>
            <strong>{data.following.length}</strong>
            Followings
          </span>
          <span>
            <strong>{data.liked.length}</strong>
            Followers
          </span>
        </div>
      </div>
      <div className={cx(styles.line)}></div>
      <div
        className={cx(styles.body)}
        style={{
          gridTemplateColumns: `repeat(${widthScreen < 900 ? 3 : 4}, auto)`,
        }}
      >
        {listVideo.map((item, index) => (
          <div key={index} className={cx(styles.video)}>
            <video
              onMouseOver={handlePlayVideo}
              onMouseOut={handleStopVideo}
              muted
              src={video1}
            ></video>
            <p className={cx(styles.videoDesc)}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
