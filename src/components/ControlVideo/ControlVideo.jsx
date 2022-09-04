import classnames from "classnames/bind";
import {
  BsPauseFill,
  BsPlayFill
} from "react-icons/bs";
import { FaVolumeMute } from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";
import styles from "./ControlVideo.module.scss";
const cx = classnames.bind(styles);

function ControlVideo({ volume, onClick, muted ,onPlay , isPlaying}) {
  return (
    <div className={cx(styles.videoControl)}>
      {isPlaying ? (
        <BsPauseFill
          onClick={onPlay}
          className={cx(styles.pause, styles.icon)}
        />
      ) : (
        <BsPlayFill
          onClick={onPlay}
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
  );
}

export default ControlVideo;
