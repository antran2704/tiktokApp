import {
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faCoins,
  faGear,
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MENU_ITEMS = [
  {
    title: "Tiếng Việt",
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    children: {
      title: "Language",
      data: [
        {
          title: "English",
          icon: "",
          children: {
            title: "Language1",
            data: [
              {
                title: "English",
                icon: "",
              },

            ],
          },
        },
        {
          title: "Tiếng Việt",
          icon: "",
        },
      ],
    },
  },
  {
    title: "Phản hồi và trợ giúp",
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    to: "/feedback",
  },
  {
    title: "Phím tắt trên bàn phím",
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    to: "/feedback",
  },
];

export const USER_MENU = [
  {
    title: "Xem hồ sơ",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: "Nhận xu",
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
  {
    title: "Cài đặt",
    icon: <FontAwesomeIcon icon={faGear} />,
  },
  ...MENU_ITEMS,
  {
    title: "Đăng xuất",
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    borderTop: true,
    signOut: true
  },
];
