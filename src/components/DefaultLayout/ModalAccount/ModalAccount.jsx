/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import addFollow from "../../../helpers/addFollow";
import { AppContext } from "../../../providers/AppProvider";
import { AuthContext } from "../../../providers/AuthProvider";
import Button from "../../Button/Button";
import styles from "./ModalAccount.module.scss";
const cx = classnames.bind(styles);

function ModalAccount({ data = {} }) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow } = useContext(AppContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const handleAddFollow = () => {
    if (currentUser.uid) {
      if (isFollowed) {
        addFollow(currentUser.id, newFollow, isFollowed, data);
        setIsFollowed(false);
      } else {
        addFollow(currentUser.id, newFollow, isFollowed, data);
        setIsFollowed(true);
      }
    } else {
      handleShowModal();
    }
  };

  useEffect(() => {
    if (newFollow && newFollow.length >= 0) {
      setIsFollowed(false);
      if (newFollow.length > 0) {
        newFollow.map((item) => {
          if (data.uid === item.uid) {
            setIsFollowed(true);
          }
        });
      }
    }
  }, [newFollow]);

  return (
    <div className={cx(styles.modalWrap)}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.img)}>
          <img src={data.photoURL} alt="" />
        </div>
        <Button
          onClick={handleAddFollow}
          followedBtn={isFollowed && true}
          followBtn={!isFollowed && true}
          data={data}
          borderRadius
        >
          {isFollowed ? "Đang Follow" : "Follow"}
        </Button>
      </div>
      <a href="#" className={cx(styles.linkUser)}>
        <div className={cx(styles.nickName)}>
          <strong>{data.nickName}</strong>
          <FontAwesomeIcon icon={faCircleCheck} className={cx(styles.stick)} />
        </div>
        <strong className={cx(styles.name)}>{data.name}</strong>
      </a>
      <div className={cx(styles.desc)}>
        <p className={cx(styles.content)}>
          <strong>7.1M </strong>
          Follower
        </p>
        <p className={cx(styles.content)}>
          <strong>10M </strong>
          Likes
        </p>
      </div>
    </div>
  );
}

export default ModalAccount;
