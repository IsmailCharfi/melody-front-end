import { Client } from "src/misc/enums/Client";
import Event from "src/model/Event";
import { Ticket } from "src/model/Ticket";
import { User } from "src/model/User";
import { fetcher } from "src/tools/Fetcher/fetchers";

export default class EventService {
  static async getEvents() {
    const response = await fetcher.get<Event[]>("/events");

    if (response.isOk && Array.isArray(response.data)) {
      response.data = response.data.map((e) => new Event(e));
    }

    return response;
  }

  static async bookTicket(event: Event, user: User) {
    const response = await fetcher.post<Ticket>(`/events/${event.id}/book`, {});

    if (response.isOk) {
      response.data = new Ticket(response.data);
    }

    return response;
  }

  static async generateWalletTicket(ticket: Ticket, client: Client) {
    const response = await fetcher.get<string>(
      `/tickets/${ticket.id}/generate?client=${client}`
    );

    return response;
  }
}
