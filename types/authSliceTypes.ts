import { RoleType } from "@/types";

export interface IAuthState {
  _id: string | null;
  username: string | null;
  email: string | null;
  role: RoleType | null;
  phone: string | null;
  nim: string | null;
  nidn: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
