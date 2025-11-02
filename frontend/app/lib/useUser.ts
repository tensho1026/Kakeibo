// composables/useUser.ts

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
export const useUser = () => useState<User | null>("user", () => null);
