import Video from "../Video/Video";
import styles from "./Content.module.scss"
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
function Content() {
    return ( 
        <div className={cx(styles.content)}>
            <Video />
        </div>
     );
}

export default Content;