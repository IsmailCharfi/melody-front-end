export abstract class Entity {
  id: number;

  protected constructor(
    entity: Partial<Entity> = null,
    clone: boolean = false
  ) {
    if (!clone && entity instanceof Entity) return entity;
    this.id = entity?.id ?? 0;
  }
}
