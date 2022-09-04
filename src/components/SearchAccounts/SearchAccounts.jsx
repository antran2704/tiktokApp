/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./SearchAccounts.module.scss";
import className from "classnames/bind";
import SearchAccountsItem from "./SearchAccountsItem";


const cx = className.bind(styles);

function SearchAccounts({data = []}) {
  return (
    <div>
      <p className={cx(styles.title)}>Tài khoản</p>
      <div className={cx(styles.listAccounts)}>
        {data.map((item, index) => (
          <SearchAccountsItem key={index} data={item} widthImg={34} />
        ))}
      </div>
    </div>
  );
}

export default SearchAccounts;
