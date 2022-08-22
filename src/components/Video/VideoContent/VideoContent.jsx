import classnames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import {
  BsFillChatDotsFill,
  BsFillHeartFill, BsPauseFill, BsPlayFill
} from "react-icons/bs";
import { FaShare, FaVolumeMute } from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import VideoAction from "../VideoAction/VideoAction";
import styles from "./VideoContent.module.scss";

const cx = classnames.bind(styles);

function VideoContent({ data, volume, onClick, muted, loading }) {
  const videoRef = useRef();
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(true);
  const hanldeLiked = () => {
    setLiked(!liked);
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
  const isVisibile =  useElementOnScreen(options, videoRef);
  useEffect(() => {
    if(!loading) {
      if (isVisibile) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisibile,loading]);
  return (
    <>
      {loading ? (
        <div className={cx(styles.videoLoading,"loading")}></div>
      ) : (
        <div className={cx(styles.video)}>
          <div className={cx(styles.videoContent)}>
            <video
              onClick={handlePlayVideo}
              autoPlay={playing}
              muted={volume == 0 ? true : false}
              ref={videoRef}
              loop
              src={data.video}
            ></video>
            <div className={cx(styles.videoControl)}>
              {playing ? (
                <BsPauseFill
                  onClick={handlePlayVideo}
                  className={cx(styles.pause, styles.icon)}
                />
              ) : (
                <BsPlayFill
                  onClick={handlePlayVideo}
                  className={cx(styles.play, styles.icon)}
                />
              )}
              <div className={cx(styles.controlVolume)}>
                <div className={cx(styles.volumeWrap)}>
                  <input
                    className={cx(styles.volume)}
                    value={volume / 100}
                    type="range"
                    onChange={(e) => onClick(e.target.value)}
                    max={1}
                    min={0}
                    step={0.1}
                  />
                  <div className={cx(styles.volumeProgress)}>
                    <div
                      style={{ width: `${volume}%` }}
                      className={cx(styles.progress)}
                    ></div>
                  </div>
                </div>
                {volume === 0 ? (
                  <FaVolumeMute
                    onClick={muted}
                    className={cx(styles.volumeIcon, styles.icon)}
                  />
                ) : (
                  <FiVolume2
                    onClick={muted}
                    className={cx(styles.volumeIcon, styles.icon)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={cx(styles.videoAction)}>
            <VideoAction
              Icon={BsFillHeartFill}
              onClick={hanldeLiked}
              liked={liked}
              number={"632.1k"}
            />
            <VideoAction Icon={BsFillChatDotsFill} number={"500"} />
            <VideoAction Icon={FaShare} number={"200"} />
          </div>
        </div>
      )}
    </>
  );
}

export default VideoContent;
