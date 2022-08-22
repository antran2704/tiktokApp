import Button from "../components/Button/Button";
import styles from "./Menu.module.scss";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import className from "classnames/bind";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

const cx = className.bind(styles);

function Menu({ children, data }) {
  const [currentMenu, setCurrentMenu] = useState([{ data: data }]);
  const history = currentMenu[currentMenu.length - 1];

  const handleMenu = (item) => {
    if (item.children) {
      setCurrentMenu((prev) => [...prev, item.children]);
    }
    if (item.signOut) {
      auth.signOut()
    }
  };

  const handleBackMenu = () => {
    const newCurrentMenu = currentMenu.splice(0, currentMenu.length - 1);
    setCurrentMenu(newCurrentMenu);
  };

  useEffect(() => {
    setCurrentMenu([{ data: data }]);
  }, [data]);

  return (
    <Tippy
      delay={[10, 700]}
      placement="bottom-start"
      interactive
      className={cx(styles.menu)}
      render={(attrs) => (
        <div className={cx(styles.body)} tabIndex="-1" {...attrs}>
          {currentMenu.length > 1 && (
            <Button
              onClick={handleBackMenu}
              iconLeft={<FontAwesomeIcon icon={faChevronLeft} />}
            >
              {history.title}
            </Button>
          )}
          {history.data.map((item, index) => (
            <Button
              onClick={handleMenu}
              data={item}
              to={item.to}
              key={index}
              iconLeft={item.icon}
              borderTop={item.borderTop && true}
            >
              {item.title}
            </Button>
          ))}
        </div>
      )}
      onHidden={() => {
        setCurrentMenu([currentMenu[0]]);
      }}
    >
      <div className={cx(styles.content)}>{children}</div>
    </Tippy>
  );
}

export default Menu;
