import styles from "./SearchAccounts.module.scss";
import className from "classnames/bind";
import SearchAccountsItem from "./SearchAccountsItem";

const cx = className.bind(styles);

function SearchAccounts() {
  return (
    <div>
      <p className={cx(styles.title)}>Tài khoản</p>
      <div className={cx(styles.listAccounts)}>
            <SearchAccountsItem widthImg={34}/>
      </div>
    </div>
  );
}

export default SearchAccounts;
