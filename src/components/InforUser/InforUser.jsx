/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import addFollow from "../../helpers/addFollow";
import useViewport from "../../hooks/useViewport";
import { AppContext } from "../../providers/AppProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { getInforUser } from "../../redux/actions";
import Button from "../Button/Button";
import styles from "./InforUser.module.scss";
const cx = classnames.bind(styles);

function InforUser({ data, loading, children, height }) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow } = useContext(AppContext);
  const dispatch = useDispatch();
  const width = useViewport();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollowed = () => {
    setIsFollowing(false);
    if (newFollow && newFollow.length > 0) {
      newFollow.map((item) => {
        if (data && data.uid === item.uid) {
          setIsFollowing(true);
        }
        return [];
      });
    }
  };

  const handleGetInforUser = (data) => {
    dispatch(getInforUser(data));
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
          <div className={cx(styles.img, "loading")}></div>
          <div className={cx(styles.infor)}>
            <div
              className={cx(styles.inforLink, "loading card-title shorter-m")}
            ></div>
            <p className={cx(styles.desc, "loading card-title")}></p>
            {children}
          </div>
        </>
      ) : (
        <>
          {width > 600 && (
            <img
              className={cx(styles.img)}
              src={data.photoURL || data.img}
              alt=""
            />
          )}
          <div
            className={cx(styles.inforUserWrap)}
            style={{ height: `${height}` }}
          >
            <div className={cx(styles.inforUser)}>
              <div className={cx(styles.infor)}>
                <Link
                  onClick={() => {
                    handleGetInforUser(data);
                  }}
                  to= {`/user/${data.uid}`}
                  className={cx(styles.inforLink)}
                >
                  {width <= 600 && (
                    <img
                      className={cx(styles.img)}
                      src={data.photoURL || data.img}
                      alt=""
                    />
                  )}
                  <strong className={cx(styles.inforNickName)}>
                    {data.nickName}
                  </strong>
                  {!loading && data.uid !== currentUser.uid && width <= 600 && (
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
                  {width > 600 && (
                    <p className={cx(styles.inforName)}>{data.name}</p>
                  )}
                </Link>
                <p className={cx(styles.desc)}>{data.desc}</p>
                <a href="#" className={cx(styles.inforMusic)}>
                  <BsMusicNoteBeamed className={cx(styles.inforIcon)} />
                  <strong className={cx(styles.inforMusicName)}>
                    {data.music}
                  </strong>
                </a>
              </div>
              {children}
            </div>
            {!loading && data.uid !== currentUser.uid && width > 600 && (
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
