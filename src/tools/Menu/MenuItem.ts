import { Breakpoint } from "@mui/material";
import { ReactNode } from "react";
import { UserRoles } from "src/misc/enums/User/UserRoles";

export default class MenuItem {
  link?: string;

  icon?: ReactNode;

  badge?: string;

  badgeTooltip?: string;

  items?: MenuItem[];

  name: string;

  roles?: UserRoles[];
}

export type UserBoxMenuItemModal = {
  body?: (closeModal: () => any) => JSX.Element;
  title?: string;
  size?: Breakpoint;
  confirm?: {
    onAccept: () => Promise<any>;
    afterAccept?: () => Promise<any>;
    title: string;
  };
};

export type UserBoxMenuItem = {
  to?: string;
  modal?: UserBoxMenuItemModal;
  label?: string;
  icon?: ReactNode;
  roles?: UserRoles[];
  divider?: boolean;
  disabled?: boolean;
  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "secondary"
    | "primary"
    | "success"
    | "error"
    | "info"
    | "warning";
};
