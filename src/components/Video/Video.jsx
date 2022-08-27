import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import LayoutComments from "../LayoutComments/LayoutComments";
import styles from "./Video.module.scss";
import VideoInfor from "./VideoInfor/VideoInfor";
const cx = classnames.bind(styles);
function Video({data}) {
  const [volume, setVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLayoutComment,setShowLayoutComment] = useState(false)
  const [isStopAllVideos,setIsStopAllVideos] = useState(false)
  const [dataComment,setDataComment] = useState({})
  const handleShowLayoutComment = (data) => {
      setDataComment(data)
      setIsStopAllVideos(!isStopAllVideos)
      setShowLayoutComment(!showLayoutComment)
  }

  const handleVolumeChange = (value) => {
    setVolume(value * 100);
  };

  const handleVolumeMuted = () => {
    if (volume !== 0) {
      setVolume(0);
    }
    if (volume === 0) {
      setVolume(100);
    }
  };

  useEffect(() => {
    if(data) {
      setIsLoading(false)
    }
  }, [data]);

  return (
    <div className={cx(styles.video)}>
      {isLoading ? (
        <VideoInfor loading={isLoading} />
      ) : (
        <>
          {data &&
            data.map((item, index) => (
              <VideoInfor
                key={index}
                data={item}
                volume={volume}
                isStopAllVideos = {isStopAllVideos}
                onClick={handleVolumeChange}
                handle = {handleShowLayoutComment}
                muted={handleVolumeMuted}
              />
            ))}
        </>
      )}
      <LayoutComments data = {dataComment}  volume={volume} volumeChange={handleVolumeChange} muted={handleVolumeMuted} show = {showLayoutComment} onClick = {handleShowLayoutComment}/>
    </div>
  );
}

export default Video;
