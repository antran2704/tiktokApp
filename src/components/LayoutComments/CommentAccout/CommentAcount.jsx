/* eslint-disable jsx-a11y/anchor-is-valid */
import classnames from "classnames/bind";
import styles from "./CommentAccout.module.scss";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Tippy from "@tippyjs/react/headless";

const cx = classnames.bind(styles);
function CommentAccout({data}) {

  
  return (
    <div className={cx(styles.item)}>
      <div className={cx(styles.itemWrap)}>
        <img
          className={cx(styles.img)}
          src= {data.photoURL}
          alt=""
        />
        <div className={cx(styles.itemContent)}>
          <a className={cx(styles.itemLink)} href="#">
            {data.nickName}
          </a>
          <p className={cx(styles.content)}>{data.comment}</p>
          <p className={cx(styles.time)}>{data.createdAt}</p>
        </div>
      </div>
      <Tippy
        delay={[200, 0]}
        offset={[10, -20]}
        interactive
        arrow
        placement="left-end"
        render={(attrs) => (
          <div className={cx(styles.modal)} tabIndex="-1" {...attrs}>
            <button className={cx(styles.modalBtn)}>Delete</button>
          </div>
        )}
      >
        <div>
          <BiDotsHorizontalRounded className={cx(styles.itemMenu)} />
        </div>
      </Tippy>
    </div>
  );
}

export default CommentAccout;
