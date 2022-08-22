import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Provider/AppProvider";
import styles from "./Video.module.scss";
import VideoInfor from "./VideoInfor/VideoInfor";
const cx = classnames.bind(styles);
function Video() {
  const { listVideos } = useContext(AppContext);
  const [volume, setVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  const handleVolumeChange = (value) => {
    console.log(value);
    setVolume(value * 100);
  };

  const handleVolumeMuted = () => {
    if (volume != 0) {
      setVolume(0);
    }
    if (volume === 0) {
      setVolume(100);
    }
  };

  useEffect(() => {
    if(listVideos) {
      setIsLoading(false)
    }
  }, [listVideos]);

  return (
    <div className={cx(styles.video)}>
      {isLoading ? (
        <VideoInfor loading={isLoading} />
      ) : (
        <>
          {listVideos &&
            listVideos.map((item, index) => (
              <VideoInfor
                key={index}
                data={item}
                volume={volume}
                onClick={handleVolumeChange}
                muted={handleVolumeMuted}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default Video;
