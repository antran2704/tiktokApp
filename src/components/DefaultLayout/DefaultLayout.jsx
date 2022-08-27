// import Content from "../Content/Content";
import Sidebar from "./Sidebar/Sidebar";

import styles from "./DefaultLayout.module.scss";

import className from "classnames/bind";

const cx = className.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx(styles.layout, "p-top", "container")}>
      <div className={cx(styles.sideBar)}>
        <Sidebar />
      </div>
      <div className={cx(styles.content)}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
