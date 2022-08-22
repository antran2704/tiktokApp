import styles from "./VideoAction.module.scss"
import classnames from "classnames/bind"


const cx = classnames.bind(styles)


function VideoAction({Icon,number,liked,onClick}) {
    return ( 
        <div className= {cx(styles.item)}>
            <div onClick={onClick} className= {cx(styles.itemIcon, (liked) ? "active" : "")}>
                <Icon className= {cx(styles.icon)}/>
                <div className= {cx(styles.iconEffect)}></div>
            </div>
            <p className= {cx(styles.number)}>{number}</p>
        </div>
     );
}

export default VideoAction;