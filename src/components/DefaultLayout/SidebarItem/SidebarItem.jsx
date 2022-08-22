import styles from "./SidebarItem.module.scss";

import className from "classnames/bind";
import SearchAccountsItem from "../../SearchAccounts/SearchAccountsItem";

const cx = className.bind(styles);
function SidebarItem({data,isLoading}) {
    return ( 
        <div className={cx(styles.item)}>
        <SearchAccountsItem isLoading={isLoading} data = {data} widthImg={32}/>
        </div>
     );
}

export default SidebarItem;