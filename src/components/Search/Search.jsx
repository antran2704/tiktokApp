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
import { useTranslation } from "react-i18next";
import "../../i18n";

const cx = className.bind(styles);

function Search() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { searchText, listAllUsers } = useSelector((state) => state);
  const [listSearch, setListSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFilterSearch = () => {
    if (searchText.length > 0) {
      const result = listAllUsers.filter((item) => {
        return item.nickName.includes(searchText);
      });
      setListSearch(result);
    }
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
    // if searchText === 0 then clear all result search and return right now !!!
    if (searchText.length === 0) {
      handleClearSearch();
      return;
    }
    // if searchText.length > 0 then function handle action
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
        placeholder={t("placeholderSearch")}
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
          {listSearch.length > 0 && (
            <SearchAccounts data={listSearch} loading={isLoading} />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
