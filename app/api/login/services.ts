import { verifyUserCredentials } from "./utils";

export async function loginService(data: {
  role: string;
  email?: string;
  nim?: string;
  nidn?: string;
  password: string;
}) {
  const { role, email, nim, nidn, password } = data;

  const identifier =
    role === "student" ? nim : role === "teacher" ? nidn : email;

  if (!identifier) {
    throw new Error(`Identifier is required for role: ${role}`);
  }

  const isValid = await verifyUserCredentials(role, identifier, password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return { message: "Login successful", role };
}
