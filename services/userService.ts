import { IUser } from "@/types";
import { User } from "@/models";
import { handleError } from "@/utils";

export const userService = {
  async createUserInDb(
    data: Omit<IUser, "created_at" | "updated_at">,
  ): Promise<IUser | void> {
    try {
      const newUser = new User({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await newUser.save();
      return newUser;
    } catch (error: unknown) {
      handleError(error, "Error creating user");
    }
  },

  async getAllUsersFromDb(): Promise<IUser[] | void> {
    try {
      const users = await User.find();
      return users;
    } catch (error: unknown) {
      handleError(error, "Error fetching users");
    }
  },

  async getUserById(userId: string): Promise<IUser | void> {
    try {
      const user = await User.findById(userId);
      return user as IUser;
    } catch (error: unknown) {
      handleError(error, "Error fetching user");
    }
  },

  async updateUser(
    userId: string,
    updatedData: Partial<IUser>,
  ): Promise<IUser | void> {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
      return updatedUser as IUser;
    } catch (error: unknown) {
      handleError(error, "Error updating user");
    }
  },
};
