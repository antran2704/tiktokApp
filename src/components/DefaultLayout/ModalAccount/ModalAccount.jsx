import { faCircleCheck, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import Button from "../../Button/Button";
import { AppContext } from "../../Provider/AppProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import styles from "./ModalAccount.module.scss";
const cx = classnames.bind(styles);

function ModalAccount({ data = {} }) {
  const { handleShowModal } = useContext(AuthContext);
  const { currentUser, newFollow, setNewFollow} =
    useContext(AppContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const handleAddFollow = () => {
    if (currentUser.uid) {
      const followingRef = db.collection("users").doc(currentUser.id);
      let deleteFollowed;
      if (isFollowed) {
        deleteFollowed = newFollow.filter((item) => {
          if (item.uid !== data.uid) {
            return item;
          }
        });
        console.log(deleteFollowed);
        followingRef.update({ following: deleteFollowed});
        // setNewFollow(deleteFollowed);
        setIsFollowed(false);
      } else {
        const followingRef = db.collection("users").doc(currentUser.id);
        if (!newFollow.includes(data.id)) {
          console.log(newFollow.includes(data.id))
          followingRef.update({
            following: [...newFollow, data],
          });
        }
        // newFollow && newFollow.length > 0
        //   ? setNewFollow((prev) => [...prev, { ...data, isFollow: true }])
        //   : setNewFollow([{ ...data, isFollow: true }]);
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

  // useEffect(() => {
  //   if (newFollow && newFollow.length > 0) {
  //     console.log("modal")
  //     handleNewFollow(currentUser.id);
  //   }
  // }, [isFollowed]);
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
      <a href="" className={cx(styles.linkUser)}>
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
