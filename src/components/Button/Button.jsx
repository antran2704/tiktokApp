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
  fitContentBtn,
  followBtn,
  followedBtn,
  smallIcon,
  borderTop,
  borderRadius,
  onClick,
  onHandle,
  to,
  href,
  gap = 0,
  justifyContent = "center",
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
  if (onClick) {
    props.onClick = () => {
      onClick(data);
      if (onHandle) {
        onHandle(data);
      }
    };
  }

  const classname = cx(
    styles.btn,
    largeBtn && "large",
    smallBtn && "small",
    fitContentBtn && "fitContentBtn",
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
      style={{ gap: `${gap}px`, justifyContent: `${justifyContent}` }}
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
