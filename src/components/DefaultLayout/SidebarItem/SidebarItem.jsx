import styles from "./SidebarItem.module.scss";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import className from "classnames/bind";
import SearchAccountsItem from "../../SearchAccounts/SearchAccountsItem";
import ModalAccount from "../ModalAccount/ModalAccount";

const cx = className.bind(styles);
function SidebarItem({ data, isLoading, type }) {
  return (
    <div>
      {type === "suggestAccounts" ? (
        <Tippy
          delay={[800, 0]}
          offset={[0, 1]}
          placement="bottom"
          interactive
          render={(attrs) => (
            <div className={cx(styles.modal)} tabIndex="-1" {...attrs}>
              <ModalAccount data={data} />
            </div>
          )}
        >
          <div className={cx(styles.item)}>
            <SearchAccountsItem
              isLoading={isLoading}
              data={data}
              widthImg={32}
            />
          </div>
        </Tippy>
      ) : (
        <div className={cx(styles.item)}>
          <SearchAccountsItem isLoading={isLoading} data={data} widthImg={32} />
        </div>
      )}
    </div>
  );
}

export default SidebarItem;
