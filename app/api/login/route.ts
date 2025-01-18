import { NextResponse } from "next/server";
import { loginController } from "./controllers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await loginController(body);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
