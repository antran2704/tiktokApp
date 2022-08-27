import classnames from "classnames/bind";
import styles from "./LayoutComments.module.scss";
import LayoutContent from "./LayoutContent/LayoutContent";
import LayoutVideo from "./LayoutVideo/LayoutVideo";

const cx = classnames.bind(styles);
function LayoutComments({show,onClick,data, volume, volumeChange, muted}) {
    return ( 
        <div className= {cx(styles.layout, show && "show")}>
            <div className= {cx(styles.layoutVideo)}>
                {data.uid && <LayoutVideo data = {data} volume = {volume} volumeChange = {volumeChange} muted = {muted} show = {show} onClick = {onClick}/>}
            </div>
            <div className= {cx(styles.layoutCotent)}>
                <LayoutContent />
            </div>
        </div>
     );
}

export default LayoutComments;