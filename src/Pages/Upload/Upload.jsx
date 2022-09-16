/* eslint-disable react-hooks/exhaustive-deps */
import className from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import addDocument from "../../firebase/addDocument";
import useViewport from "../../hooks/useViewport";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./Upload.module.scss";
const cx = className.bind(styles);
function Upload() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { currentUser } = useContext(AppContext);
  const width = useViewport();
  const [video, setVideo] = useState([]);
  const inpMusicRef = useRef();
  const inpDescRef = useRef();
  const handleUploadVideo = async () => {
    const { name, nickName, photoURL, uid } = currentUser;
    const desc = inpDescRef.current.value;
    const music = inpMusicRef.current.value;
    try {
      await addDocument("videos", {
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

      navigate("/");
    } catch (error) {
      console.log("upload video error");
    }
  };

  useEffect(() => {
    if (!user.uid) {
      window.location.pathname = "/";
    }
  }, []);
  return (
    <div className={cx("container", styles.upload)}>
      <div className={cx(styles.uploadHeader)}>
        <h1 className={cx(styles.title)}>{t("upload.title")}</h1>
        <h2 className={cx(styles.desc)}>{t("upload.descTitle")}</h2>
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
            <h3 className={cx(styles.layoutTitle)}>
              {t("upload.layoutTitle")}
            </h3>
            <p className={cx(styles.uploadDesc)}>{t("upload.drag")}</p>
            <p className={cx(styles.uploadDesc)}>
              {t("upload.descUploadVideo")}
            </p>
            <label htmlFor="upload" className={cx(styles.uploadBtn)}>
                {t("upload.btnUpload")}
            </label>
          </label>
        )}

        <div className={cx(styles.inpWrap)}>
          <div className={cx(styles.inpItem)}>
            <p className={cx(styles.inpDesc)}>{t("upload.caption")}</p>
            <input
              maxLength={150}
              ref={inpDescRef}
              className={cx(styles.inp)}
              type="text"
            />
          </div>
          <div className={cx(styles.inpItem)}>
            <p className={cx(styles.inpDesc)}>{t("upload.music")}</p>
            <input
              maxLength={150}
              ref={inpMusicRef}
              className={cx(styles.inp)}
              type="text"
            />
          </div>
          <Button
            onClick={handleUploadVideo}
            fitContentBtn={width < 900 ? false : true}
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
