import classnames from "classnames/bind";
import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import imgs from "../../assets";
import ControlVideo from "../../SearchLayout/ControlVideo/ControlVideo";
import styles from "./LayoutVideo.module.scss";
const cx = classnames.bind(styles);

function LayoutVideo({ onClick, data, volume, volumeChange, muted }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();
  const handlePlayVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

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
          muted={volume === 0 ? true : false}
          autoPlay
          src="https://v16-webapp.tiktok.com/384815b66bef7df0cc285e23aa25d2e0/63090c52/video/tos/useast2a/tos-useast2a-pve-0037-aiso/9057be79936b4f1cb5b865c7dfaae770/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1682&bt=841&cs=0&ds=3&ft=eXd.6Hk_Myq8ZDMR0he2NM4jml7Gb&mime_type=video_mp4&qs=0&rc=NTQ7PDM6NDk7aTM1ZmZpZkBpMzY2djY6Zmg1ZTMzZjgzM0AwYy8tMTI2NjUxNC01Yy0yYSNqLWMycjRfMl5gLS1kL2Nzcw%3D%3D&l=202208261208560102452441780B1234E2&btag=80000"
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
