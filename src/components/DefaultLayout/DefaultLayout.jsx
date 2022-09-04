import Sidebar from "./Sidebar/Sidebar";
import { BiArrowToTop } from "react-icons/bi";

import styles from "./DefaultLayout.module.scss";

import className from "classnames/bind";
import Scroll from "react-scroll"
import useScrollTop from "../../hooks/useScrolltop";

const cx = className.bind(styles);
function DefaultLayout({ children }) {
  const top = useScrollTop();

  const handleScrollTop = () => {
    Scroll.animateScroll.scrollToTop()
  }

  return (
    <div className={cx(styles.layout, "p-top", "container")}>
      <div className={cx(styles.sideBar)}>
        <Sidebar />
      </div>
      <div className={cx(styles.content)}>{children}</div>
        <button onClick={handleScrollTop} className={cx(styles.scrollToTop , top > 200 && "active")}>
          <BiArrowToTop className={cx(styles.scrollIcon)} />
        </button>
    </div>
  );
}

export default DefaultLayout;
