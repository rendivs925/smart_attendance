import { RoleType } from "@/types";

export interface IAuthState {
  _id: string | null;
  username: string | null;
  email: string | null;
  role: RoleType | null;
  isLoggedIn: boolean;
}
