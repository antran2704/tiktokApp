import className from "classnames/bind";
import styles from "./FooterItem.module.scss";
const cx = className.bind(styles);

function FooterItem({ data }) {
  return (
    <div className={cx(styles.listItem)}>
      {data.category.map((item, index) => (
        <a key={index} href={item.link} className={cx(styles.item)}>
          {item.title}
        </a>
      ))}
    </div>
  );
}

export default FooterItem;
