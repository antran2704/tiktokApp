import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames/bind";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useViewport from "../../hooks/useViewport";
import { getInforUser } from "../../redux/actions";
import styles from "./SearchAccountsItems.module.scss";
const cx = className.bind(styles);
function SearchAccountsItem({
  data = {},
  widthImg,
  isLoading,
  handleClearSearch,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useViewport();

  const handleNavigateUserPage = (data) => {
    dispatch(getInforUser(data));
    navigate(`/user/${data.uid}`);
  };

  return (
    <button
      onClick={() => {
        handleNavigateUserPage(data);
        handleClearSearch();
      }}
      className={cx(styles.accountItems, isLoading && "load")}
      style={{ alignItems: `${isLoading ? "center" : "start"}` }}
    >
      {isLoading === true ? (
        <>
          <div
            style={{ width: `${widthImg}px`, height: `${widthImg}px` }}
            className={cx("loading", "card-chart")}
          ></div>
          {width > 900 && (
            <div className={cx(styles.accountInfor)}>
              <div
                className={cx(styles.accountNickname, "loading", "card-title")}
              ></div>
              <div
                className={cx(
                  styles.accountName,
                  "loading",
                  "card-title",
                  "shorter-m"
                )}
              ></div>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            style={{ width: `${widthImg}px`, height: `${widthImg}px` }}
            className={cx(styles.accountImg)}
          >
            <img src={data.img || data.photoURL} alt="" />
          </div>
          {width > 900 && (
            <div className={cx(styles.accountInfor)}>
              <h2 className={cx(styles.accountNickname)}>
                {data.nickName || data.displayName}
                {data.tick && (
                  <div className={cx(styles.check)}>
                    <FontAwesomeIcon
                      className={cx(styles.checkIcon)}
                      icon={faCircleCheck}
                    />
                  </div>
                )}
              </h2>
              <p className={cx(styles.accountName)}>
                {data.name || data.displayName}
              </p>
            </div>
          )}
        </>
      )}
    </button>
  );
}

export default SearchAccountsItem;
