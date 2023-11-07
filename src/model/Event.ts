import { Entity } from "./Entity";

export default class Event extends Entity {
  name: string;

  capacity: number;

  place: string;

  description: string;


  artist: string;

  image: string;

  artistImage: string;

  date: string;

  category: string;

  constructor(data: Partial<Event> = null, clone: boolean = false) {
    if (!clone && data instanceof Event) return data;
    super(data);

    this.name = data?.name ?? "";
    this.capacity = data?.capacity ?? 0;
    this.place = data?.place ?? "";
    this.description = data?.description ?? "";
    this.artist = data?.artist ?? "";
    this.image = data?.image ?? "";
    this.artistImage = data?.artistImage ?? "";
    this.date = data?.date ?? "";
    this.category = data?.category ?? "";
  }
}
