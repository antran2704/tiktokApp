import {
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faCoins,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MENU_ITEMS = [
  {
    title: "menu.language",
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    children: {
      title: "Language",
      data: [
        {
          title: "English",
          code: "en",
          type: "language",
        },
        {
          title: "Tiếng Việt",
          code: "vi",
          type: "language",
        },
      ],
    },
  },
  {
    title: "menu.feedback",
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    to: "/feedback",
  },
  {
    title: "menu.keyboard",
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    to: "/feedback",
  },
];

export const USER_MENU = [
  {
    title: "menu.profile",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: "menu.getCoins",
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
  {
    title: "menu.setting",
    icon: <FontAwesomeIcon icon={faGear} />,
  },
  ...MENU_ITEMS,
  {
    title: "menu.logout",
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    borderTop: true,
    signOut: true,
  },
];
