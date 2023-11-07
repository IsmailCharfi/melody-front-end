import { Entity } from "./Entity";
import Event from "./Event";

export class Ticket extends Entity {
  seat: string;

  gate: string;

  event: Event;

  constructor(data: Partial<Ticket> = null, clone: boolean = false) {
    if (!clone && data instanceof Ticket) return data;
    super(data);

    this.seat = data?.seat;
    this.gate = data?.gate;
    this.event = data?.event ? new Event(data?.event) : null;
  }
}
