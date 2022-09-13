import styles from "./VideoAction.module.scss"
import classnames from "classnames/bind"


const cx = classnames.bind(styles)


function VideoAction({Icon,number,liked,onClick,small,row}) {
    const numbers = number.length >=0 ? number.length : number
    const newNumber = new Intl.NumberFormat("en-US",{
        notation: "compact",
        compactDisplay: "short"
    }).format(numbers)
   
    return ( 
        <div className= {cx(styles.item, small && "small" ,row && "row")}>
            <div onClick={onClick} className= {cx(styles.itemIcon, (liked) ? "active" : "")}>
                <Icon className= {cx(styles.icon)}/>
                <div className= {cx(styles.iconEffect)}></div>
            </div>
            <p className= {cx(styles.number)}>{newNumber}</p>
        </div>
     );
}

export default VideoAction;