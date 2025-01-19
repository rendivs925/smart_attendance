import { COOKIE_NAME, JWT_SECRET_KEY } from "@/constants";
import { jwtVerify } from "jose";
import { SignJWT } from "jose";
import { IUser } from "@/types";
import { nanoid } from "nanoid";

const MAX_AGE = 60 * 60 * 24;
import { cookies } from "next/headers";
import { RoleType } from "@/types";
import bcrypt from "bcryptjs";

export interface IUserJwtPayload {
  jti: string;
  iat: number;
  _id: string;
  username: string;
  email: string;
  role: RoleType;
}

export function resolveIdentifier(
  role: string,
  identifiers: { email?: string; nim?: string; nidn?: string },
) {
  const { email, nim, nidn } = identifiers;

  if (role === "student" && nim) return nim;
  if (role === "teacher" && nidn) return nidn;
  if (role === "admin" && email) return email;

  throw new Error(`Identifier is required for role: ${role}`);
}

export async function generateJwt(user: IUser) {
  const secretKey = getJwtSecretKey();

  return new SignJWT({
    _id: user._id,
    role: user.role,
    email: user.email,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(new TextEncoder().encode(secretKey));
}

export function setAuthCookie(token: string) {
  cookies().set({
    name: COOKIE_NAME,
    value: token,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
    maxAge: MAX_AGE,
    sameSite: "strict",
    expires: new Date(Date.now() + MAX_AGE * 1000),
  });
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
