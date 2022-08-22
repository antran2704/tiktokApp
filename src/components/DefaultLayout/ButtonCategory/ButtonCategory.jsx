import className from "classnames/bind";
import styles from "./ButtonCategory.module.scss";
const cx = className.bind(styles);

function ButtonCategory({ Icon, title, link, isLoading}) {
  return (
    <>
      {isLoading ? (
        <>
          <a href={link} className={cx(styles.link,"loading","desc")}>
            <span className={cx(styles.title)}></span>
          </a>
          <a href={link} className={cx(styles.link,"loading","desc")}>
            <span className={cx(styles.title)}></span>
          </a>
        </>
      ) : (
        <a href={link} className={cx(styles.link)}>
          <Icon className={cx(styles.icon)} />
          <p className={cx(styles.title)}>{title}</p>
        </a>
      )}
    </>
  );
}

export default ButtonCategory;
