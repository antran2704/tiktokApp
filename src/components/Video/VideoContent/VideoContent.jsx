import classnames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { BsFillChatDotsFill, BsFillHeartFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import likeVideo from "../../../helpers/likeVideo";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import { AppContext } from "../../Provider/AppProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import ControlVideo from "../../SearchLayout/ControlVideo/ControlVideo";
import VideoAction from "../VideoAction/VideoAction";
import styles from "./VideoContent.module.scss";

const cx = classnames.bind(styles);

function VideoContent({
  data,
  volume,
  onClick,
  muted,
  loading,
  handle,
  isStopAllVideos,
}) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, likedVideos} = useContext(AppContext);
  const videoRef = useRef();
  const [isLiked, setIsLiked] = useState(false);
  const [playing, setPlaying] = useState(true);
  
  const hanldeLiked = () => {
    if (currentUser.uid) {
      if(isLiked) {
        likeVideo(currentUser.id,likedVideos,isLiked,data)
        setIsLiked(!isLiked);
      } else {
        likeVideo(currentUser.id,likedVideos,isLiked,data)
        setIsLiked(!isLiked);
      }
    } else {
      handleShowModal();
    }
  };

  const handleComments = (data) => {
    if (currentUser.uid) {
      handle(data);
    } else {
      handleShowModal();
    }
  };

  const handlePlayVideo = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(!playing);
    } else {
      videoRef.current.play();
      setPlaying(!playing);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);
  useEffect(() => {
    if (!loading) {
      if (isVisibile && !isStopAllVideos) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisibile, loading, isStopAllVideos]);

  useEffect(() => {
    if (data && likedVideos.includes(data.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedVideos, isStopAllVideos]);

  return (
    <>
      {loading ? (
        <div className={cx(styles.videoLoading, "loading")}></div>
      ) : (
        <div className={cx(styles.video)}>
          <div className={cx(styles.videoContent)}>
            <video
              onClick={handlePlayVideo}
              autoPlay={playing}
              muted={volume === 0 ? true : false}
              ref={videoRef}
              loop
              src={
                data
                  ? data.video
                  : "https://v16-webapp.tiktok.com/384815b66bef7df0cc285e23aa25d2e0/63090c52/video/tos/useast2a/tos-useast2a-pve-0037-aiso/9057be79936b4f1cb5b865c7dfaae770/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1682&bt=841&cs=0&ds=3&ft=eXd.6Hk_Myq8ZDMR0he2NM4jml7Gb&mime_type=video_mp4&qs=0&rc=NTQ7PDM6NDk7aTM1ZmZpZkBpMzY2djY6Zmg1ZTMzZjgzM0AwYy8tMTI2NjUxNC01Yy0yYSNqLWMycjRfMl5gLS1kL2Nzcw%3D%3D&l=202208261208560102452441780B1234E2&btag=80000"
              }
            ></video>
            <ControlVideo volume={volume} onClick={onClick} muted={muted} onPlay = {handlePlayVideo} isPlaying = {playing}/>
          </div>
          <div className={cx(styles.videoAction)}>
            <VideoAction
              Icon={BsFillHeartFill}
              onClick={hanldeLiked}
              liked={isLiked}
              number={data.likes}
              data={data}
            />
            <VideoAction
              onClick={() => {
                handleComments(data);
              }}
              Icon={BsFillChatDotsFill}
              number={data.comments}
            />
            <VideoAction Icon={FaShare} number={data.shares} />
          </div>
        </div>
      )}
    </>
  );
}

export default VideoContent;
