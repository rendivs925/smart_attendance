import { IUser } from "@/types";
import { userService } from "@/services";

export async function createUser(data: IUser) {
  try {
    const newUser = await userService.createUserInDb(data);
    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}

export async function getUsers() {
  try {
    const users = await userService.getAllUsersFromDb();
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
}
