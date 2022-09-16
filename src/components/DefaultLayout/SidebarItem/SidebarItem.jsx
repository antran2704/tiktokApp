import Tippy from "@tippyjs/react/headless";
import className from "classnames/bind";
import "tippy.js/dist/tippy.css";
import useViewport from "../../../hooks/useViewport";
import SearchAccountsItem from "../../SearchAccounts/SearchAccountsItem";
import ModalAccount from "../ModalAccount/ModalAccount";
import styles from "./SidebarItem.module.scss";

const cx = className.bind(styles);
function SidebarItem({ data, isLoading, type , widthModal}) {
  const width = useViewport();
  return (
    <div className={cx(styles.modalWrap)}>
      {type === "suggestAccounts" && width > 900 ? (
        <Tippy
          delay={[800, 0]}
          offset={[0, 1]}
          placement="bottom"
          interactive
          render={(attrs) => (
            <div style={{width: `${widthModal}px`}} className={cx(styles.modal)} tabIndex="-1" {...attrs}>
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
