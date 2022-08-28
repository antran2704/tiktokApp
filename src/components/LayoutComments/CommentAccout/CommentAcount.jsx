import classnames from "classnames/bind";
import styles from "./CommentAccout.module.scss";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Tippy from "@tippyjs/react/headless";

const cx = classnames.bind(styles);
function CommentAccout() {
  return (
    <div className={cx(styles.item)}>
      <div className={cx(styles.itemWrap)}>
        <img
          className={cx(styles.img)}
          src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/45cdbc597ed5b41c3c5ae32952c9ca1d~c5_100x100.jpg?x-expires=1661774400&x-signature=aqoznLhEuyTPwzM396CoET5qiUY%3D"
          alt=""
        />
        <div className={cx(styles.itemContent)}>
          <a className={cx(styles.itemLink)} href="">
            Antran
          </a>
          <p className={cx(styles.content)}>hello World</p>
          <p className={cx(styles.time)}>1d ago</p>
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
