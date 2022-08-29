import Tippy from "@tippyjs/react";
import classnames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import addComment from "../../../helpers/addComment";
import likeVideo from "../../../helpers/likeVideo";
import InforUser from "../../InforUser/InforUser";
import { AppContext } from "../../Provider/AppProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import VideoAction from "../../Video/VideoAction/VideoAction";
import CommentAccout from "../CommentAccout/CommentAcount";
import firebase from "../../../firebase/firebaseConfig"
import icons from "./index";
import styles from "./LayoutContent.module.scss";
const cx = classnames.bind(styles);

function LayoutContent({ data, loading }) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, likedVideos } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const inpRef = useRef();
  const handleAddComments = () => {
    const commentValue = inpRef.current.value;
    const { name, nickName, photoURL, uid, tick } = currentUser;
    const createdAt = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(Date.now());
    addComment(
      data.id,
      { name, nickName, photoURL, uid, tick, comment: commentValue , createdAt: createdAt},
      data
    );
    inpRef.current.value = "";
  };

  const hanldeLiked = () => {
    if (currentUser.uid) {
      if (isLiked) {
        likeVideo(currentUser.id, likedVideos, isLiked, data);
        setIsLiked(!isLiked);
      } else {
        likeVideo(currentUser.id, likedVideos, isLiked, data);
        setIsLiked(!isLiked);
      }
    } else {
      handleShowModal();
    }
  };

  useEffect(() => {
    if (data && likedVideos.includes(data.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedVideos]);

  return (
    <div className={cx(styles.contentWrap)}>
      <div className={cx(styles.header)}>
        <InforUser data={data} loading={loading} />
        <div className={cx(styles.actions)}>
          <VideoAction
            Icon={BsFillHeartFill}
            onClick={hanldeLiked}
            liked={isLiked}
            number={data.likes}
            data={data}
            small
            row
          />
          <div className={cx(styles.social)}>
            {icons.map((icon, index) => (
              <Tippy key={index} content={icon.title}>
                <a href="#">
                  <icon.icon
                    style={{ backgroundColor: `${icon.backgroundColor}` }}
                    className={cx(styles.icon)}
                  />
                </a>
              </Tippy>
            ))}
          </div>
        </div>
        <div className={cx(styles.linkVideo)}>
          <p className={cx(styles.desc)}>
            https://www.tiktok.com/@meowmeow_2204/video/7133402560525946158?is_from_webapp=1&sender_device=pc&web_id=7117324751291647490
          </p>
          <button className={cx(styles.copyBtn)}>Copy link</button>
        </div>
      </div>
      <div className={cx(styles.body)}>
        {data.comments.length > 0 &&
          data.comments.map((comment, index) => (
            <CommentAccout key={index} data={comment} />
          ))}
      </div>
      <div className={cx(styles.bottom)}>
        <input
          ref={inpRef}
          maxLength={150}
          placeholder="Add comment..."
          className={cx(styles.inp)}
          type="text"
        />
        <button onClick={handleAddComments} className={cx(styles.postBtn)}>
          Post
        </button>
      </div>
    </div>
  );
}

export default LayoutContent;
