/* eslint-disable react-hooks/exhaustive-deps */
import className from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDocuments } from "../../../firebase/getColection";
import useViewport from "../../../hooks/useViewport";
import { AppContext } from "../../../providers/AppProvider";
import ButtonCategory from "../ButtonCategory/ButtonCategory";
import SidebarItem from "../SidebarItem/SidebarItem";
import listItem from "./index";
import styles from "./SidebarList.module.scss";

const cx = className.bind(styles);

function SidebarList({ type, collection, title }) {
  const { t } = useTranslation();
  const { currentUser, listCurrentUsers } = useContext(AppContext);
  const listItemRef = useRef();
  const [listUsers, setListUsers] = useState([]);
  const [showUser, setShowUser] = useState(5);
  const [isShowFullUser, setIsShowFullUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [widthListItem, setWidthListItem] = useState(0);
  const width = useViewport();
  const currentListUser = currentUser.uid
    ? listCurrentUsers.slice(0, showUser)
    : listUsers.slice(0, showUser);

  const listFolowing = currentUser.uid
    ? currentUser.following.slice(0, showUser)
    : [];

  const handleShowFullUser = (data) => {
    if (isShowFullUser) {
      setShowUser(5);
      setIsShowFullUser(!isShowFullUser);
    } else {
      const number = showUser + 5;
      if (number >= data.length) {
        setShowUser(number);
        setIsShowFullUser(!isShowFullUser);
      } else {
        setShowUser(number);
      }
    }
  };

  const getColletion = async () => {
    try {
      const result = await getDocuments(collection);
      setListUsers(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (collection) {
      getColletion();
    }
  }, []);

  useEffect(() => {
    if (width > 900) {
      setWidthListItem(listItemRef.current.clientWidth - 20);
    }
  }, [width]);

  return (
    <div ref={listItemRef} className={cx(styles.listItem)}>
      {type === "suggestAccounts" || type === "followingAccounts" ? (
        <>
          {isLoading ? (
            <SidebarItem isLoading={isLoading} />
          ) : type === "suggestAccounts" ? (
            <div className={cx(styles.item)}>
              {currentListUser.length > 0 &&
                (width > 900 ? (
                  <>
                    <div className={cx(styles.line)}></div>
                    <h3 className={cx(styles.title)}>{t(title)}</h3>
                  </>
                ) : (
                  <div className={cx(styles.line)}></div>
                ))}
              {currentListUser.length > 0 &&
                currentListUser.map((item, index) => (
                  <SidebarItem
                    widthModal={widthListItem}
                    key={index}
                    type={type}
                    data={item}
                  />
                ))}
              {listUsers.length > 5 &&
                (isShowFullUser ? (
                  <p
                    onClick={() => handleShowFullUser(listUsers)}
                    className={cx(styles.btnShow)}
                  >
                    {t("seeLessBtn")}
                  </p>
                ) : (
                  <p
                    onClick={() => handleShowFullUser(listUsers)}
                    className={cx(styles.btnShow)}
                  >
                    {t("seeMoreBtn")}
                  </p>
                ))}
            </div>
          ) : (
            <div className={cx(styles.item)}>
              {currentUser?.uid &&
                currentUser.following.length > 0 &&
                (width > 900 ? (
                  <>
                    <div className={cx(styles.line)}></div>
                    <h3 className={cx(styles.title)}>{t(title)}</h3>
                  </>
                ) : (
                  <div className={cx(styles.line)}></div>
                ))}
              {currentUser &&
                currentUser.uid &&
                listFolowing.map((item, index) => (
                  <SidebarItem key={index} type={type} data={item} />
                ))}
              {currentUser &&
                currentUser.following?.length > 5 &&
                (isShowFullUser ? (
                  <p
                    onClick={() => handleShowFullUser(currentUser.following)}
                    className={cx(styles.btnShow)}
                  >
                    {t("seeLessBtn")}
                  </p>
                ) : (
                  <p
                    onClick={() => handleShowFullUser(currentUser.following)}
                    className={cx(styles.btnShow)}
                  >
                    {t("seeMoreBtn")}
                  </p>
                ))}
            </div>
          )}
        </>
      ) : (
        <div>
          {width > 900 && (
            <div className={cx(styles.item)}>
              <div className={cx(styles.line)}></div>
              <h3 className={cx(styles.title)}>{t(title)}</h3>
              <div className={cx(styles.itemWrap)}>
                {isLoading ? (
                  <ButtonCategory isLoading={isLoading} />
                ) : (
                  <>
                    {listItem.map((item, index) => (
                      <ButtonCategory
                        key={index}
                        title={item.title}
                        Icon={item.icon}
                        link={item.link}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SidebarList;
