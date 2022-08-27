import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleXmark,
  faEllipsisVertical,
  faPaperPlane,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import className from "classnames/bind";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "tippy.js/dist/tippy.css";
import { MENU_ITEMS, USER_MENU } from "../../Menu";

import Menu from "../../Menu/Menu";
import imgs from "../assets";
import Button from "../Button/Button";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
import SearchLayout from "../SearchLayout/SearchLayout";
import styles from "./Navbar.module.scss";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const cx = className.bind(styles);
function Navbar() {
  const { user,handleShowModal } = useContext(AuthContext);
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
        <div className={cx(styles.control)}>
          <Button
            onClick={!user.uid && handleShowModal}
            to={user.uid && "upload"}
            borderRadius
            smallBtn
            iconLeft={<FontAwesomeIcon icon={faPlus} />}
          >
            Tải lên
          </Button>

          {user && user.uid ? (
            <>
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
