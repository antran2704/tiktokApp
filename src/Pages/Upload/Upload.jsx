import className from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import addDocument from "../../firebase/addDocument";
import Button from "../../components/Button/Button";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./Upload.module.scss";

const cx = className.bind(styles);
function Upload() {
  const { user } = useContext(AuthContext);
  const { currentUser } = useContext(AppContext);
  const [video, setVideo] = useState([]);
  const inpMusicRef = useRef();
  const inpDescRef = useRef();

  const handleUploadVideo = () => {
    const { name, nickName, photoURL, uid } = currentUser;
    const desc = inpDescRef.current.value;
    const music = inpMusicRef.current.value;

    addDocument("videos", {
      name,
      nickName,
      photoURL,
      uid,
      video: URL.createObjectURL(video[0]),
      music: music,
      desc: desc,
      comments: [],
      likes: 0,
      shares: 0,
    });
  };

  useEffect(() => {
    if (!user.uid) {
      window.location.pathname = "/";
    }
  }, []);
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
          <video
            controls
            src={URL.createObjectURL(video[0])}
            className={cx(styles.video)}
          ></video>
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
            <input maxLength = {150} ref={inpDescRef} className={cx(styles.inp)} type="text" />
          </div>
          <div className={cx(styles.inpItem)}>
            <p className={cx(styles.inpDesc)}>Âm thanh video</p>
            <input maxLength = {150} ref={inpMusicRef} className={cx(styles.inp)} type="text" />
          </div>
          <Button
            onClick={handleUploadVideo}
            fitContentBtn
            borderRadius
            smallBtn
            primary
          >
            upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
