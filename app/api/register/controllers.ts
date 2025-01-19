import { connectToDatabase } from "@/config";
import { User } from "@/models";
import { IUser } from "@/types";
import { hashPassword } from "@/utils/auth";

export async function createUser(data: Partial<IUser> & { password: string }) {
  try {
    console.log("Incoming data:", data);

    const { password, ...restData } = data;
    if (!password) {
      throw new Error("Password is required");
    }

    const passwordHash = await hashPassword(password);

    const userToSave = {
      ...restData,
      password_hash: passwordHash,
    };

    await connectToDatabase();

    const newUser = await User.create(userToSave);

    return newUser;
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error && error.message.includes("Validation")) {
      throw new Error("Validation error: " + error.message);
    }
    throw new Error((error as { message: string }).message);
  }
}
