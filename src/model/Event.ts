import { Entity } from "./Entity";

export default class Event extends Entity {
  name: string;

  constructor(data: Partial<Event> = null, clone: boolean = false) {
    if (!clone && data instanceof Event) return data;
    super(data);

    this.name = data?.name ?? "";
  }
}
