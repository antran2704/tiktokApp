import classnames from "classnames/bind";

import InforUser from "../../InforUser/InforUser";

import VideoContent from "../VideoContent/VideoContent";
import styles from "./VideoInfor.module.scss";
const cx = classnames.bind(styles);

function VideoInfor({
  data,
  volume,
  onClick,
  muted,
  loading,
  handleStopAllVideo,
  isStopAllVideos,
}) {
  return (
    <div className={cx(styles.item)}>
      <div className={cx(styles.itemWrap)}>
        <InforUser data={data} loading={loading}>
          {loading ? (
            <VideoContent loading />
          ) : (
            <VideoContent
              volume={volume}
              onClick={onClick}
              muted={muted}
              data={data}
              handleStopAllVideo={handleStopAllVideo}
              isStopAllVideos={isStopAllVideos}
            />
          )}
        </InforUser>
      </div>
    </div>
  );
}

export default VideoInfor;
