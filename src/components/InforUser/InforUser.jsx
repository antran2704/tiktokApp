import classnames from "classnames/bind";
import styles from "./InforUser.module.scss";
import { useContext, useEffect, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import addFollow from "../../helpers/addFollow";
import Button from "../Button/Button";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
const cx = classnames.bind(styles);

function InforUser({ data, loading, children }) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow } = useContext(AppContext);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowed = () => {
    setIsFollowing(false);
    if (newFollow && newFollow.length > 0) {
      newFollow.map((item) => {
        if (data && data.uid === item.uid) {
          setIsFollowing(true);
        }
      });
    }
  };

  const handleAddFollow = () => {
    if (currentUser.uid) {
      if (isFollowing) {
        addFollow(currentUser.id, newFollow, isFollowing, data);
        setIsFollowing(false);
      } else {
        addFollow(currentUser.id, newFollow, isFollowing, data);
        setIsFollowing(true);
      }
    } else {
      handleShowModal();
    }
  };

  useEffect(() => {
    if (newFollow && newFollow.length >= 0) {
      handleFollowed();
    }
  }, [newFollow]);

  return (
    <div className={cx(styles.inforWrap)}>
      {loading ? (
        <>
          <div className={cx(styles.img, loading && "loading")}></div>
          <div className={cx(styles.inforUser)}>
            <div className={cx(styles.infor)}>
              <div
                className={cx(styles.inforLink, "loading card-title shorter-m")}
              ></div>
              <p className={cx(styles.desc, "loading card-title")}></p>
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <img className={cx(styles.img)} src={data.photoURL || data.img} alt="" />
          <div className={cx(styles.inforUser)}>
            <div className={cx(styles.infor)}>
              <a href="#" className={cx(styles.inforLink)}>
                <strong className={cx(styles.inforNickName)}>
                  {data.nickName}
                </strong>
                <p className={cx(styles.inforName)}>{data.name}</p>
              </a>
              <p className={cx(styles.desc)}>{data.desc}</p>
              <a href="#" className={cx(styles.inforMusic)}>
                <BsMusicNoteBeamed className={cx(styles.inforIcon)} />
                <strong className={cx(styles.inforMusicName)}>
                  {data.music}
                </strong>
              </a>
              {children}
            </div>
            {!loading && data.uid !== currentUser.uid && (
              <Button
                onClick={handleAddFollow}
                followedBtn={isFollowing && true}
                followBtn={!isFollowing && true}
                data={data}
                borderRadius
              >
                {isFollowing ? "Đang Follow" : "Follow"}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default InforUser;
