import Button from "../components/Button/Button";
import styles from "./Menu.module.scss";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import className from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../providers/AuthProvider";

const cx = className.bind(styles);

function Menu({ children, data }) {
  const { t,i18n } = useTranslation();
  const { handleLogOut } = useContext(AuthContext);
  const [currentMenu, setCurrentMenu] = useState([{ data: data }]);
  const history = currentMenu[currentMenu.length - 1];

  const handleMenu = (item) => {
    if (item.children) {
      setCurrentMenu((prev) => [...prev, item.children]);
    }
    if (item.signOut) {
      handleLogOut();
      window.location.reload();
      window.location.pathname = "/";
    }
  };

  const handleBackMenu = () => {
    const newCurrentMenu = currentMenu.splice(0, currentMenu.length - 1);
    setCurrentMenu(newCurrentMenu);
  };

  const handleChangeLanguage = (item) => {
    if (item.type === "language") {
      i18n.changeLanguage(item.code);
      window.location.reload();
    }
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
              justifyContent="unset"
              iconLeft={<FontAwesomeIcon icon={faChevronLeft} />}
            >
              {history.title}
            </Button>
          )}
          {history.data.map((item, index) => (
            <Button
              onClick={handleMenu}
              onHandle={handleChangeLanguage}
              data={item}
              to={item.to}
              key={index}
              iconLeft={item.icon}
              borderTop={item.borderTop && true}
              justifyContent="unset"
              gap="10"
            >
              {item.type === "language" ? item.title : t(item.title)}
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
