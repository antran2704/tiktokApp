import Tippy from "@tippyjs/react";
import className from "classnames/bind";
import "tippy.js/dist/tippy.css";
import styles from "./Footer.module.scss";
import FooterItem from "./FooterItem";

import data from "./index";
const cx = className.bind(styles);

function Footer() {
  return (
    <div className={cx(styles.footer)}>
      <div className={cx(styles.footerLine)}></div>
      {data.map((item, index) => (
        <FooterItem key={index} data={item} />
      ))}
      <div className={cx(styles.footerBottom)}>
        <Tippy
          arrow={false}
          className={cx(styles.ruleModal)}
          placement="top-end"
          maxWidth={200}
          // interactive
          content={
            <div className={cx(styles.ruleContent)}>
              NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK
            </div>
          }
        >
          <p className={cx(styles.rule)}>Thêm</p>
        </Tippy>
        <p className={cx(styles.copyRight)}>© 2022 TikTok</p>
      </div>
    </div>
  );
}

export default Footer;
