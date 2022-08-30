import { categoryItem, data } from "./index";
import styles from "./Sidebar.module.scss";

import className from "classnames/bind";
import { useState } from "react";
import Button from "../../Button/Button";
import Footer from "../../Footer/Footer";
import SidebarList from "../SidebarList/SidebarList";
import useViewport from "../../../hooks/useViewport";

const cx = className.bind(styles);
function Sidebar() {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);
  const width = useViewport()

  const handleUrl = (url) => {
    if (url !== currentUrl) {
      setCurrentUrl(url);
    }
  };

  return (
    <div className={cx(styles.sideBar)}>
      <div className={cx(styles.header)}>
        {data.map((item, index) => (
          <Button
            onClick={() => handleUrl(item.to)}
            to={item.to}
            active={item.to === currentUrl ? true : false}
            key={index}
            largeBtn
            iconLeft={item.icon}
            borderRadius
            gap= "14"
            justifyContent= "unset"
          >
            {width > 900 && item.title}
          </Button>
        ))}
      </div>
      {categoryItem.map((category, index) => (
        <SidebarList key={index} type = {category.type} title ={category.title} collection={category.collection} />
      ))}

      {width > 900 && <Footer />}
    </div>
  );
}

export default Sidebar;
