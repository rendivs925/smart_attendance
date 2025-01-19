import { userSchema, UserSchemaType } from "@/schemas/";
import { User } from "@/models/";
import { verifyPassword } from "@/utils/auth";
import { connectToDatabase } from "@/config";

export async function verifyUserCredentials(
  role: string,
  identifier: string,
  password: string,
): Promise<boolean> {
  try {
    await connectToDatabase();
    const user = await User.findOne({
      role,
      [`${role === "student" ? "nim" : role === "teacher" ? "nidn" : "email"}`]:
        identifier,
    });

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error verifying user credentials:", error);
    return false;
  }
}

export const validateUserInput = (data: any): UserSchemaType => {
  try {
    const parsedData = userSchema.parse(data);

    const { role, nim, nidn, email } = parsedData;

    switch (role) {
      case "student":
        if (!nim) throw new Error("NIM is required for students");
        break;
      case "teacher":
        if (!nidn) throw new Error("NIDN is required for teachers");
        break;
      case "admin":
        if (!email) throw new Error("Email is required for admins");
        break;
      default:
        throw new Error("Invalid role");
    }

    return parsedData;
  } catch (error) {
    console.error("Error validating user input:", error);
    if (error instanceof Error) {
      console.error("Error validating user input:", error);
      throw new Error(`Validation failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during validation");
  }
};
