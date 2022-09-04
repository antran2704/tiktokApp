/* eslint-disable react-hooks/exhaustive-deps */
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsSearch } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import className from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "../../redux/actions";
import SearchAccounts from "../SearchAccounts/SearchAccounts";
import SearchLayout from "../SearchLayout/SearchLayout";
import styles from "./Search.module.scss";

const cx = className.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const { searchText, listAllUsers } = useSelector((state) => state);
  const [listSearch, setListSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterSearch = () => {
    const result = listAllUsers.filter((item) => {
      if (searchText.lenght > 0) {
        return item.nickName.includes(searchText);
      }
      return [];
    });
    setListSearch(result);
  };

  const handleShowSearch = (value) => {
    dispatch(handleSearch(value));
  };

  const handleClearSearch = () => {
    dispatch(handleSearch(""));
    setListSearch([]);
  };

  useEffect(() => {
    setIsLoading(true);
    const handle = setTimeout(() => {
      handleFilterSearch();
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(handle);
    };
  }, [searchText]);

  return (
    <div className={cx(styles.search)}>
      <input
        placeholder="Tìm kiếm tài khoản và video"
        value={searchText}
        onChange={(e) => handleShowSearch(e.target.value)}
        type="text"
        className={cx(styles.inp)}
      />

      {searchText &&
        (!isLoading ? (
          <FontAwesomeIcon
            className={cx(styles.closeIcon)}
            onClick={handleClearSearch}
            icon={faCircleXmark}
          />
        ) : (
          <FontAwesomeIcon className={cx(styles.loadIcon)} icon={faSpinner} />
        ))}

      <div className={cx(styles.searchWrap)}>
        <BsSearch className={cx(styles.searchIcon)} />
      </div>
      {searchText && (
        <div className={cx(styles.searchLayout)}>
          <SearchLayout />
          <SearchAccounts data={listSearch} />
        </div>
      )}
    </div>
  );
}

export default Search;
