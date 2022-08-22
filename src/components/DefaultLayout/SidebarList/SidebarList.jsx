import className from "classnames/bind";
import { useEffect, useState } from "react";
import { getDocuments } from "../../../firebase/getColection";
import ButtonCategory from "../ButtonCategory/ButtonCategory";
import SidebarItem from "../SidebarItem/SidebarItem";
import listItem from "./index";
import styles from "./SidebarList.module.scss";

const cx = className.bind(styles);

function SidebarList({ type, collection, title }) {
  const [listUsers, setListUsers] = useState([]);
  const [showUser, setShowUser] = useState(5);
  const [isShowFullUser, setIsShowFullUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentListUser = listUsers.length > 0 && listUsers.slice(0, showUser);

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
      <div className={cx(styles.line)}></div>
      <h3 className={cx(styles.title)}>{title}</h3>
      {type === "categoryItem" ? (
        <>
          {isLoading ? (
            <SidebarItem isLoading={isLoading} />
          ) : (
            <>
              {currentListUser.length > 0 &&
                currentListUser.map((item, index) => (
                  <SidebarItem key={index} data={item} />
                ))}
            </>
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
      )}
    </div>
  );
}

export default SidebarList;
