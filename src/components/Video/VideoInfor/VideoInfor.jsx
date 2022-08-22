import styles from "./VideoInfor.module.scss";
import classnames from "classnames/bind";
import { BsMusicNoteBeamed } from "react-icons/bs";
import Button from "../../Button/Button";
import VideoContent from "../VideoContent/VideoContent";
import { useState } from "react";
const cx = classnames.bind(styles);

function VideoInfor({ data, volume, onClick, muted, loading }) {
  const [followed, setFollowed] = useState(false);

  const handleFollow = () => {
    setFollowed(!followed);
  };

  return (
    <div className={cx(styles.item)}>
      <div className={cx(styles.inforWrap)}>
        {loading ? (
          <div className={cx(styles.img, loading && "loading")}></div>
        ) : (
          <div className={cx(styles.img, loading && "loading")}>
            <img src={data.photoURL} alt="" />
          </div>
        )}
        <div className={cx(styles.inforUserWrap)}>
          <div className={cx(styles.inforUser)}>
            <div className={cx(styles.infor)}>
              {loading ? (
                <div
                  className={cx(
                    styles.inforLink,
                    "loading card-title shorter-m"
                  )}
                ></div>
              ) : (
                <a href="#" className={cx(styles.inforLink)}>
                  <strong className={cx(styles.inforNickName)}>
                    {data.displayName}
                  </strong>
                  <p className={cx(styles.inforName)}>{data.displayName}</p>
                </a>
              )}
              {loading ? (
                <p className={cx(styles.desc, "loading card-title")}></p>
              ) : (
                <p className={cx(styles.desc)}>Tích cóp mãi mới đủ 😶</p>
              )}
              {!loading && (
                <a href="#" className={cx(styles.inforMusic)}>
                  <BsMusicNoteBeamed className={cx(styles.inforIcon)} />
                  <strong className={cx(styles.inforMusicName)}>
                    quay len anh em oi
                  </strong>
                </a>
              )}
            </div>
            {!loading && (
              <Button
                onClick={handleFollow}
                smallBtn={followed && true}
                followedBtn={followed && true}
                followBtn={!followed && true}
                borderRadius
              >
                {followed ? "Đang Follow" : "Follow"}
              </Button>
            )}
          </div>
          {loading ? (
            <VideoContent loading/>
          ) : (
            <VideoContent
              volume={volume}
              onClick={onClick}
              muted={muted}
              data={data}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoInfor;
