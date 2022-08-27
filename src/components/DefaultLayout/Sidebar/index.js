import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGroup, faVideo} from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    title: "Dành cho bạn",
    icon: <FontAwesomeIcon icon={faHouse} />,
    to: "/",
  },
  {
    title: "Đang theo dõi",
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    to: "/following",
  },
  {
    title: "Live",
    icon: <FontAwesomeIcon icon={faVideo} />,
    to: "/live",
  },
];

 const categoryItem = [
  {
    title: "Tài khoản được đề xuất",
    collection: "users",
    type: "suggestAccounts"
  },
  {
    title: "Tài khoản đang theo dõi",
    collection: "users",
    type: "followingAccounts"
  },
  {
    title: "Khám phá",
    collection: "users",
    type: "explore"
  },
]
export {data,categoryItem};
