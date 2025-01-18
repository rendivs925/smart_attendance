import { connectToDatabase } from "@/config";
import { User } from "@/models";
import { IUser } from "@/types";
import { userSchema } from "@/schemas/";

export async function createUser(data: IUser) {
  try {
    const validatedData = userSchema.parse(data);

    await connectToDatabase();

    const newUser = await User.create(validatedData);

    return newUser;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Invalid")) {
      throw new Error("Validation error: " + error.message);
    }
    throw new Error("Error creating user");
  }
}
