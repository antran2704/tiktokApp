import styles from "./Button.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";

const cx = className.bind(styles);
function Button({
  children,
  data,
  iconLeft,
  iconRight,
  primary,
  active,
  smallBtn,
  largeBtn,
  followBtn,
  followedBtn,
  smallIcon,
  borderTop,
  borderRadius,
  onClick,
  to,
  href,
}) {
  let Comp = "button";
  const props = {};

  if (href) {
    Comp = "a";
    props.href = href;
  }
  if (to) {
    Comp = Link;
    props.to = to;
  }
  if(onClick) {
    props.onClick = () => onClick(data)
  }
  
  const classname = cx(
    styles.btn,
    largeBtn && "large",
    smallBtn && "small",
    primary && "primary",
    borderTop && "borderTop",
    borderRadius && "borderRadius",
    active && "active",
    followBtn && "followBtn",
    followedBtn && "followedBtn"
  );

  return (
    <Comp
      {...props}
      className={classname}
    >
      {iconLeft && (
        <span className={cx(styles.icon, smallIcon && styles.smallIcon)}>
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className={cx(styles.icon, smallIcon && styles.smallIcon)}>
          {iconRight}
        </span>
      )}
    </Comp>
  );
}

export default Button;
