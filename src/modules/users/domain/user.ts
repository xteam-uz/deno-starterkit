export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  permissions: string[];
  roles: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type CreateUserInput = {
  email: string;
  name: string;
  passwordHash: string;
};
