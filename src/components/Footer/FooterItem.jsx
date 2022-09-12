import className from "classnames/bind";
import { useTranslation } from "react-i18next";
import styles from "./FooterItem.module.scss";
const cx = className.bind(styles);

function FooterItem({ data }) {
  const { t } = useTranslation();

  return (
    <div className={cx(styles.listItem)}>
      {data.category.map((item, index) => (
        <a key={index} href={item.link} className={cx(styles.item)}>
          {t(item.title)}
        </a>
      ))}
    </div>
  );
}

export default FooterItem;
