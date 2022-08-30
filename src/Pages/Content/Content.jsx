import Video from "../../components/Video/Video";
import styles from "./Content.module.scss"
import classnames from "classnames/bind"
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
const cx = classnames.bind(styles)
function Content() {
  const { listVideos} = useContext(AppContext);

    return ( 
        <div className={cx(styles.content)}>
            <Video data = {listVideos}/>
        </div>
     );
}

export default Content;