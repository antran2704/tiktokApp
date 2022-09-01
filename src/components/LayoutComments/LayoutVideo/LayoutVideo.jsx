import classnames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import imgs from "../../../assets/index";
import useViewport from "../../../hooks/useViewport";
import ControlVideo from "../../SearchLayout/ControlVideo/ControlVideo";
import styles from "./LayoutVideo.module.scss";
const cx = classnames.bind(styles);

function LayoutVideo({ onClick, data, volume, volumeChange, muted, show }) {
  const videoRef = useRef();
  const width = useViewport()
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if(show && width > 900) {
      videoRef.current.play();
      videoRef.current.currentTime = 0
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [show]);

  return (
    <div className={cx(styles.layout)}>
      <div className={cx(styles.layoutHeader)}>
        <CgClose onClick={onClick} className={cx(styles.closeBtn)} />
        <div className={cx(styles.logo)}>
          <img src={imgs.tiktokIcon} alt="" />
        </div>
      </div>
      <div className={cx(styles.layoutBody)}>
        <video
          onClick={handlePlayVideo}
          ref={videoRef}
          loop
          muted={volume === 0 ? true : false}
          src={data.video}
        ></video>
        <ControlVideo
          onPlay={handlePlayVideo}
          isPlaying={isPlaying}
          data={data}
          volume={volume}
          onClick={volumeChange}
          muted={muted}
        />
      </div>
    </div>
  );
}

export default LayoutVideo;
