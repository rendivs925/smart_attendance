import { userSchema, UserSchemaType } from "@/schemas/";
import { User } from "@/models/";
import { verifyPassword } from "@/utils/auth";

export async function verifyUserCredentials(
  role: string,
  identifier: string,
  password: string,
): Promise<boolean> {
  try {
    let user;

    if (role === "student") {
      user = await User.findOne({ role, nim: identifier });
    } else if (role === "teacher") {
      user = await User.findOne({ role, nidn: identifier });
    } else if (role === "admin") {
      user = await User.findOne({ role, email: identifier });
    }

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
  const parsedData = userSchema.parse(data);

  const { role, nim, nidn, email } = parsedData;

  if (role === "student" && !nim) {
    throw new Error("NIM is required for students");
  }

  if (role === "teacher" && !nidn) {
    throw new Error("NIDN is required for teachers");
  }

  if (role === "admin" && !email) {
    throw new Error("Email is required for admins");
  }

  return parsedData;
};
