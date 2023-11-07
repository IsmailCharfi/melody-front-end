import { User } from "src/model/User";
import { fetcher } from "src/tools/Fetcher/fetchers";

type LoginResponse = {
  user: User;
  token: string;
};

export default class AuthService {
  static async getConnectedUser() {
    const response = await fetcher.get<User>("/auth/connected-user");

    if (response.isOk) {
      response.data = new User(response.data);
    }

    return response;
  }

  static async login(email: string, password: string) {
    const response = await fetcher.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    if (response.isOk) {
      response.data.user = new User(response.data.user);
    }

    return response;
  }

  static async register(data: Partial<User>) {
    const response = await fetcher.post<LoginResponse>("/auth/register", data);

    if (response.isOk) {
      response.data.user = new User(response.data.user);
    }

    return response;
  }
}
