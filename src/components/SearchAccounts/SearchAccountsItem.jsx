import styles from "./SearchAccountsItems.module.scss";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = className.bind(styles);
function SearchAccountsItem({ data, widthImg , isLoading}) {
  return (
    <div className={cx(styles.accountItems, isLoading && "load")} style = {{alignItems: `${isLoading ? "center" : "start"}`}}>
      {isLoading === true ? (
        <>
          <div
            style={{ width: `${widthImg}px`, height: `${widthImg}px`}}
            className={cx(styles.accountImg)}
          >
            <div  className={cx(styles.accountImg, "loading","card-chart")}></div>
          </div>
          <div className={cx(styles.accountInfor)}>
            <div className={cx(styles.accountNickname,"loading","card-title")}></div>
            <div className={cx(styles.accountName,"loading","card-title","shorter-m")}></div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{ width: `${widthImg}px`, height: `${widthImg}px` }}
            className={cx(styles.accountImg)}
          >
            <img src={data.img || data.photoURL} alt="" />
          </div>
          <div className={cx(styles.accountInfor)}>
            <h2 className={cx(styles.accountNickname)}>{data.nickName || data.displayName}</h2>
            <p className={cx(styles.accountName)}>{data.name || data.displayName}</p>
          </div>
          {data.sticker && (
            <div className={cx(styles.check)}>
              <FontAwesomeIcon
                className={cx(styles.checkIcon)}
                icon={faCircleCheck}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchAccountsItem;
