import { IUser } from "@/types";
import { connectToDatabase } from "@/config";
import { User } from "@/models";

export async function getUsers() {
  try {
    await connectToDatabase();

    const users = await User.find({});

    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
}

export async function getUserById(id: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user with ID: ${id}`);
  }
}

export async function updateUser(id: string, data: Partial<IUser>) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user with ID: ${id}`);
  }
}

export async function deleteUser(id: string) {
  try {
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User not found or delete failed");
    }

    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user with ID: ${id}`);
  }
}
