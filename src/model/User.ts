import { UserRoles } from "src/misc/enums/User/UserRoles";
import { Entity } from "src/model/Entity";

export default class User extends Entity {
  email: string;

  password: string;

  firstName: string;

  lastName: string;

  roles: UserRoles[];

  constructor(data: Partial<User> = null, clone: boolean = false) {
    if (!clone && data instanceof User) return data;
    super(data);

    this.email = data?.email ?? "";
    this.password = data?.password ?? "";
    this.firstName = data?.firstName ?? "";
    this.lastName = data?.lastName ?? "";
    this.roles = data?.roles ?? [];
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
}
