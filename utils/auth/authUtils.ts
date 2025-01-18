import { COOKIE_NAME, JWT_SECRET_KEY } from "@/constants";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { RoleType } from "@/types";
import bcrypt from "bcrypt";

export interface IUserJwtPayload {
  jti: string;
  iat: number;
  _id: string;
  username: string;
  email: string;
  role: RoleType;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

function getEnvVariable(name: string): string | undefined {
  const value = process.env[name];
  if (!value || value.length === 0) {
    throw new Error(
      `Environment variable ${name} is not set. Please ensure it's properly configured.`,
    );
  }
  return value;
}

export const getJwtSecretKey = (): string | undefined => {
  return getEnvVariable(JWT_SECRET_KEY);
};

export const getVerifiedToken = async () => {
  const token = cookies().get(COOKIE_NAME);
  if (!token) {
    throw new Error(
      "Authentication token is missing. Please login to continue.",
    );
  }

  return await verifyAuth(token?.value as string);
};

export async function verifyAuth(
  token: string,
): Promise<IUserJwtPayload | void> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    );
    return payload as unknown as IUserJwtPayload;
  } catch (error) {
    throw new Error(
      "Token verification failed. Your token may have expired or is invalid.",
    );
  }
}
