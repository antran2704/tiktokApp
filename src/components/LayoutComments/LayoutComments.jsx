import classnames from "classnames/bind";
import { useState } from "react";
import styles from "./LayoutComments.module.scss";
import LayoutContent from "./LayoutContent/LayoutContent";
import LayoutVideo from "./LayoutVideo/LayoutVideo";

const cx = classnames.bind(styles);
function LayoutComments({ show, onClick, data, volume, volumeChange, muted }) {
  const [ isCopied, setCopied ] = useState(false);

  const handleShowAlertCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className={cx(styles.layout, show && "show")}>
      {data.uid && (
        <>
          <div className={cx(styles.layoutVideo)}>
            <LayoutVideo
              data={data}
              volume={volume}
              volumeChange={volumeChange}
              muted={muted}
              show={show}
              onClick={onClick}
            />
          </div>
          <div className={cx(styles.layoutCotent)}>
            <LayoutContent copied={handleShowAlertCopied} data={data} loading={false} />
          </div>
          <div className={cx(styles.copyAlert, isCopied && "copied")}>
            Đã sao chép
          </div>
        </>
      )}
    </div>
  );
}

export default LayoutComments;
