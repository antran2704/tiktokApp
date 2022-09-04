import styles from "./SearchLayout.module.scss";
import className from "classnames/bind";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

const cx = className.bind(styles);
function SearchLayout() {
    return ( 
        <div className= {cx(styles.layout)}>
            <Button iconLeft={<FontAwesomeIcon icon = {faMagnifyingGlass}/>} smallIcon justifyContent= "unset" gap= "10">Luu quynh anh</Button>
        </div>
     );
}

export default SearchLayout;