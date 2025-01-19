import { IUser } from "@/types";
import { verifyUserCredentials } from "./utils";
import { resolveIdentifier, generateJwt, setAuthCookie } from "@/utils/auth";

export async function loginService(data: {
  role: string;
  email?: string;
  nim?: string;
  nidn?: string;
  password: string;
}) {
  const { role, email, nim, nidn, password } = data;

  const identifier = resolveIdentifier(role, { email, nim, nidn });

  const isValid = await verifyUserCredentials(role, identifier, password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = await generateJwt(data as unknown as IUser);
  setAuthCookie(token);

  return { message: "Login successful", role };
}
