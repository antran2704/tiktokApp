/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Modal.module.scss";
import className from "classnames/bind";
import { GrClose } from "react-icons/gr";
import { auth } from "../../firebase/firebaseConfig";
import data from "./index";
import addDocument from "../../firebase/addDocument";
import { useState } from "react";
const cx = className.bind(styles);
function Modal({ show, onClick }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleLogin = async (provider) => {
    try {
      const { additionalUserInfo, user} = await auth.signInWithPopup(provider);
      if (additionalUserInfo && additionalUserInfo.isNewUser) {
        addDocument("users", {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          nickName: user.displayName.toLocaleLowerCase().split(" ").join(""),
          following: [],
          liked: [],
          tick: false,
          isFollow: false,
          uid: user.uid,
        });
      } 
    } catch (error) {
      alert("Đăng nhập không thành công")
    }
  };
  return (
    <div className={cx(styles.modal, show && "show")}>
      <div onClick={onClick} className={cx(styles.layoutClose)}></div>
      <div className={cx(styles.layout, show && "show")}>
        <div onClick={onClick} className={cx(styles.closeBtn)}>
          <GrClose className={cx(styles.closeBtnIcon)} />
        </div>
        {isSignUp ? (
          <h1 className={cx(styles.title)}>Đăng nhập vào tiktok</h1>
        ) : (
          <h1 className={cx(styles.title)}>Đăng nhập vào tiktok</h1>
        )}
        <div className={cx(styles.listItem)}>
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                handleLogin(item.provider);
              }}
              className={cx(styles.item)}
            >
              <item.icon className={cx(styles.itemIcon)} />
              <p className={cx(styles.itemContent)}>{item.title}</p>
            </button>
          ))}
        </div>
       {isSignUp && <p className={cx(styles.desc)}>
          Bằng cách tiếp tục, bạn đồng ý với Điều khoản Sử dụng của TikTok và
          xác nhận rằng bạn đã đọc hiểu Chính sách Quyền riêng tư của TikTok.
        </p>}
        <div className={cx(styles.footer)}>
          <p className={cx(styles.footerContent)}>Bạn không có tài khoản?</p>
          <a onClick={() => setIsSignUp(!isSignUp)} href="#" className={cx(styles.footerLink)}>
            {isSignUp ? "Đăng ký" : "Đăng nhập"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Modal;
