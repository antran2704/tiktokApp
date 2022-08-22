import { data, categoryItem } from "./index";
import styles from "./Sidebar.module.scss";

import className from "classnames/bind";
import { useState } from "react";
import Button from "../../Button/Button";
import SidebarList from "../SidebarList/SidebarList";
import Footer from "../../Footer/Footer";

const cx = className.bind(styles);
function Sidebar() {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);

  const handleUrl = (url) => {
    if (url != currentUrl) {
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
            active={item.to == currentUrl ? true : false}
            key={index}
            largeBtn
            iconLeft={item.icon}
            borderRadius
          >
            {item.title}
          </Button>
        ))}
      </div>
      {categoryItem.map((category, index) => (
        <SidebarList key={index} type = {category.type} title ={category.title} collection={category.collection} />
      ))}

      <Footer />
    </div>
  );
}

export default Sidebar;
