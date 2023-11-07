import Event from "src/model/Event";
import { fetcher } from "src/tools/Fetcher/fetchers";

export default class EventService {
  static async getEvents() {
    const response = await fetcher.get<Event[]>("/events");

    if (response.isOk && Array.isArray(response.data)) {
      response.data = response.data.map((e) => new Event(e));
    }

    return response;
  }
}
