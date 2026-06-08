export type AuditFields = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy?: string | null;
  updatedBy?: string | null;
};

export function softDelete<T extends { deletedAt?: Date | null; updatedAt?: Date }>(entity: T): T {
  const now = new Date();
  return { ...entity, deletedAt: now, updatedAt: now };
}
