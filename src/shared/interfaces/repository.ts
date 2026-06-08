export type EntityId = string;

export interface Repository<TEntity> {
  findById(id: EntityId): Promise<TEntity | null>;
  save(entity: TEntity): Promise<TEntity>;
}
