import className from "classnames/bind";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { getDocuments } from "../../../firebase/getColection";
import useViewport from "../../../hooks/useViewport";
import { AppContext } from "../../../providers/AppProvider";
import ButtonCategory from "../ButtonCategory/ButtonCategory";
import SidebarItem from "../SidebarItem/SidebarItem";
import listItem from "./index";
import styles from "./SidebarList.module.scss";

const cx = className.bind(styles);

function SidebarList({ type, collection, title }) {
  const { currentUser, listCurrentUsers } = useContext(AppContext);
  const [listUsers, setListUsers] = useState([]);
  const [showUser, setShowUser] = useState(5);
  const [isShowFullUser, setIsShowFullUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const width = useViewport();
  const currentListUser = currentUser.uid
    ? listCurrentUsers.slice(0, showUser)
    : listUsers.slice(0, showUser);

  const handleShowFullUser = () => {
    if (isShowFullUser) {
      setShowUser(5);
      setIsShowFullUser(!isShowFullUser);
    } else {
      setShowUser(listUsers.length);
      setIsShowFullUser(!isShowFullUser);
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
  return (
    <div className={cx(styles.listItem)}>
      {type === "suggestAccounts" || type === "followingAccounts" ? (
        <>
          {isLoading ? (
            <SidebarItem isLoading={isLoading} />
          ) : type === "suggestAccounts" ? (
            <div className={cx(styles.item)}>
              {currentListUser.length > 0 && width > 900 ? (
                <>
                  <div className={cx(styles.line)}></div>
                  <h3 className={cx(styles.title)}>{title}</h3>
                </>
              ) : (
                <div className={cx(styles.line)}></div>
              )}
              {currentListUser.length > 0 &&
                currentListUser.map((item, index) => (
                  <SidebarItem key={index} type={type} data={item} />
                ))}
            </div>
          ) : (
            <div className={cx(styles.item)}>
              {currentUser?.uid && currentUser.following.length > 0 && (
                <>
                  {width > 900 ? (
                    <>
                      <div className={cx(styles.line)}></div>
                      <h3 className={cx(styles.title)}>{title}</h3>
                    </>
                  ) : (
                    <div className={cx(styles.line)}></div>
                  )}
                </>
              )}
              {currentUser &&
                currentUser.uid &&
                currentUser.following.map((item, index) => (
                  <SidebarItem key={index} type={type} data={item} />
                ))}
            </div>
          )}
          {listUsers.length > 5 &&
            (isShowFullUser ? (
              <p onClick={handleShowFullUser} className={cx(styles.btnShow)}>
                Ẩn bớt
              </p>
            ) : (
              <p onClick={handleShowFullUser} className={cx(styles.btnShow)}>
                Xem tất cả
              </p>
            ))}
        </>
      ) : (
        <div>
          {width > 900 && (
            <div className={cx(styles.item)}>
              <div className={cx(styles.line)}></div>
              <h3 className={cx(styles.title)}>{title}</h3>
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
