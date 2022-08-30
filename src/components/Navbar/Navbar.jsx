import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleXmark,
  faEllipsisVertical,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames/bind";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MENU_ITEMS, USER_MENU } from "../../Menu";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import imgs from "../../assets/index";
import Menu from "../../Menu/Menu";
import Button from "../Button/Button";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
import SearchLayout from "../SearchLayout/SearchLayout";
import styles from "./Navbar.module.scss";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useViewport from "../../hooks/useViewport";

const cx = className.bind(styles);
function Navbar() {
  const { user, handleShowModal } = useContext(AuthContext);
  const width = useViewport();
  const [search, setSearch] = useState("");

  const handleShowSearch = (value) => {
    setSearch(value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  return (
    <div className={cx(styles.navbarContainer)}>
      <div className={cx(styles.navbar, "container")}>
        <Link to="/" className={cx(styles.logo)}>
          <img src={imgs.logo} alt="logo" />
        </Link>
        <div className={cx(styles.search)}>
          <input
            placeholder="Tìm kiếm tài khoản và video"
            value={search}
            onChange={(e) => handleShowSearch(e.target.value)}
            type="text"
            className={cx(styles.inp)}
          />

          {search && (
            <FontAwesomeIcon
              className={cx(styles.closeIcon)}
              onClick={handleClearSearch}
              icon={faCircleXmark}
            />
          )}

          <div className={cx(styles.searchWrap)}>
            <BsSearch className={cx(styles.searchIcon)} />
          </div>
          {search && (
            <div className={cx(styles.searchLayout)}>
              <SearchLayout />
              <SearchAccounts />
            </div>
          )}
        </div>
        <div
          style={{ width: `${width < 600 && user?.uid ? "50%" : "40%"}` }}
          className={cx(styles.control)}
        >
          {width > 600 && (
            <Button
              onClick={!user.uid && handleShowModal}
              to={user.uid && "upload"}
              borderRadius
              smallBtn
              iconLeft={<FontAwesomeIcon icon={faPlus} />}
              gap="6"
            >
              Tải lên
            </Button>
          )}

          {user && user.uid ? (
            <>
              {width < 600 && (
                <Button
                  onClick={!user.uid && handleShowModal}
                  to={user.uid && "upload"}
                  borderRadius
                  smallBtn
                  iconLeft={<FontAwesomeIcon icon={faPlus} />}
                  gap="6"
                >
                  Tải lên
                </Button>
              )}

              <Tippy content="Tin nhắn">
                <FontAwesomeIcon
                  className={cx(styles.icon)}
                  icon={faPaperPlane}
                />
              </Tippy>
              <Tippy content="Hộp thư">
                <FontAwesomeIcon className={cx(styles.icon)} icon={faMessage} />
              </Tippy>
            </>
          ) : (
            <Button onClick={handleShowModal} borderRadius smallBtn primary>
              Đăng nhập
            </Button>
          )}
          <Menu data={user && user.uid ? USER_MENU : MENU_ITEMS}>
            {user && user.uid ? (
              <img className={cx(styles.img)} src={user.photoURL} alt="" />
            ) : (
              <FontAwesomeIcon icon={faEllipsisVertical} />
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
