import className from "classnames/bind";
import { useState } from "react";
import { useContext } from "react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import addDocument from "../../firebase/addDocument";
import Button from "../Button/Button";
import { AuthContext } from "../Provider/AuthProvider";
import styles from "./Upload.module.scss";

const cx = className.bind(styles);
function Upload() {
  const user = useContext(AuthContext);
  const [video, setVideo] = useState([]);
  
  const handleUploadVideo = () => {
    addDocument("videos", {
      ...user,
      video: URL.createObjectURL(video[0]),
      music: "music",
      desc: "desc",
      comments: "comments",
      like: "like",
      share: "share",
    });
  };
  return (
    <div className={cx("container", styles.upload)}>
      <div className={cx(styles.uploadHeader)}>
        <h1 className={cx(styles.title)}>Tải video lên</h1>
        <h2 className={cx(styles.desc)}>Đăng video vào tài khoản của bạn</h2>
      </div>
      <div className={cx(styles.uploadContent)}>
        <input
          onChange={(e) => setVideo(e.target.files)}
          id="upload"
          type="file"
          style={{ display: "none" }}
        />
        {video.length > 0 ? (
          <video controls src={URL.createObjectURL(video[0])} className={cx(styles.video)}></video>
        ) : (
          <label htmlFor="upload" className={cx(styles.uploadLayout)}>
            <BsFillCloudArrowUpFill className={cx(styles.uploadIcon)} />
            <h3 className={cx(styles.layoutTitle)}>Chọn video để tải lên</h3>
            <p className={cx(styles.uploadDesc)}>Hoặc kéo và thả tập tin</p>
            <p className={cx(styles.uploadDesc)}>
              MP4 hoặc WebM Độ phân giải 720x1280 trở lên Tối đa 10 phút Ít hơn
              2 GB
            </p>
            <label htmlFor="upload" className={cx(styles.uploadBtn)}>
              Chọn tập tin
            </label>
          </label>
        )}

        <div className={cx(styles.inpWrap)}>
          <div className={cx(styles.inpItem)}>
            <p className={cx(styles.inpDesc)}>Mô tả video</p>
            <input className={cx(styles.inp)} type="text" />
          </div>
          <Button onClick={handleUploadVideo} smallBtn primary>
            upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
