import { UserRoles } from "src/misc/enums/User/UserRoles";
import { Entity } from "./Entity";
import { Ticket } from "./Ticket";

export class User extends Entity {
  email: string;

  password: string;

  firstname: string;

  lastname: string;

  roles: UserRoles[];

  tickets: Ticket[];

  constructor(data: Partial<User> = null, clone: boolean = false) {
    if (!clone && data instanceof User) return data;
    super(data);

    this.email = data?.email ?? "";
    this.password = data?.password ?? "";
    this.firstname = data?.firstname ?? "";
    this.lastname = data?.lastname ?? "";
    this.roles = data?.roles ?? [];
    this.tickets = data?.tickets?.map((t) => new Ticket(t)) ?? [];
  }

  public hasRole(roleToCheck: UserRoles): boolean {
    return !!this.roles.find((role) => role === roleToCheck);
  }

  // check with logic OR between args and logic AND between same array
  public hasRoles(...rolesToCheck: UserRoles[][]): boolean {
    return rolesToCheck.some(
      (roles) => this.roles.filter((role) => roles.includes(role)).length !== 0
    );
  }

  public getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
