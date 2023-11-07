import { UserRoles } from "src/misc/enums/User/UserRoles";
import MenuItem from "src/tools/Menu/MenuItem";

export default class MenuBlock {
  items: MenuItem[];
  heading: string;
  roles?: UserRoles[];
}
