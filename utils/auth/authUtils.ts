import { COOKIE_NAME, JWT_SECRET_KEY } from "@/constants";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { RoleType } from "@/types";

export interface IUserJwtPayload {
  jti: string;
  iat: number;
  _id: string;
  username: string;
  email: string;
  role: RoleType;
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
