export enum RouteParts {
  BLANK = "",
  ROOT = "/",
  WILDCARD = "*",
  AUTH = "auth",
  LOGIN = "login",
  REGISTER = "register",
  EVENTS = "events",
  TICKETS = "tickets",
  DYNAMIC_ID = ":id",
}

export const LOGIN_PATH = `/${RouteParts.AUTH}/${RouteParts.LOGIN}`;
export const REGISTER_PATH = `/${RouteParts.AUTH}/${RouteParts.REGISTER}`;
export const EVENTS_PATH = `/${RouteParts.EVENTS}`;
export const TICKETS_PATH = `/${RouteParts.TICKETS}`;
