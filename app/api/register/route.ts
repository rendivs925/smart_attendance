import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/config";
import { createUser } from "./controllers";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const data = await req.json();
    const newUser = await createUser(data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 },
    );
  }
}
