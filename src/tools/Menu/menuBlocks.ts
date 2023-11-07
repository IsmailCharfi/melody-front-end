import { RouteParts } from "src/router/routes";
import MenuBlock from "./MenuBlock";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import { I18nKeys } from "src/i18n/translations/I18nKeys";

export const menuBlocks: MenuBlock[] = [
  {
    heading: "",
    items: [
      {
        name: I18nKeys.EVENTS,
        icon: CelebrationTwoToneIcon,
        link: RouteParts.EVENTS,
      },
      {
        name: I18nKeys.MY_TICKETS,
        icon: ConfirmationNumberTwoToneIcon,
        link: RouteParts.TICKETS,
      },
    ],
  },
];
