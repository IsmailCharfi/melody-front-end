import { RouteParts } from "src/router/routes";
import MenuBlock from "./MenuBlock";
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';

export const menuBlocks: MenuBlock[] = [
  {
    heading: "",
    items: [
      {
        name: "Tableau de bord",
        icon: DashboardTwoToneIcon,
        link: RouteParts.ROOT,
      },
    ],
  },
];
