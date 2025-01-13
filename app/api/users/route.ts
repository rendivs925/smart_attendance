import { NextResponse } from "next/server";
import { createUser, getUsers } from "@/controllers";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newUser = await createUser(data);
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.error();
  }
}
