import User from "src/model/User";
import MenuBlock from "./MenuBlock";
import { menuBlocks } from "./menuBlocks";

export default class Menu {
  user: User;

  public constructor(user: User) {
    this.user = user;
  }

  get menuBlocks(): MenuBlock[] {
    const output = menuBlocks.filter(
      (menuItem: MenuBlock) =>
        !menuItem.roles || this.user.hasRoles(menuItem.roles)
    );

    output.map((menuBlock) => {
      menuBlock.items = menuBlock.items.filter(
        (item) => !item.roles || this.user.hasRoles(item.roles)
      );
      return menuBlock;
    });

    return output;
  }
}
