import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGroup, faVideo} from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    title: "sideBar.forYou",
    icon: <FontAwesomeIcon icon={faHouse} />,
    to: "/",
  },
  {
    title: "sideBar.following",
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    to: "/following",
  },
  {
    title: "sideBar.live",
    icon: <FontAwesomeIcon icon={faVideo} />,
    to: "/live",
  },
];

 const categoryItem = [
  {
    title: "sideBar.suggesAccounts",
    collection: "users",
    type: "suggestAccounts"
  },
  {
    title: "sideBar.followingAccounts",
    collection: "users",
    type: "followingAccounts"
  },
  {
    title: "sideBar.discover",
    collection: "users",
    type: "explore"
  },
]
export {data,categoryItem};
