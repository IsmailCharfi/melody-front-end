import User from "src/model/User";
import { fetcher } from "src/tools/Fetcher/fetchers";

export default class AuthService {
  static async getConnectedUser() {
    const response = await fetcher.get<User>("/connected-user");

    if (response.isOk) {
      response.data = new User(response.data);
    }

    return response;
  }
}
