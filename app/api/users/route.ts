import { NextResponse, NextRequest } from "next/server";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./controllers";
import { connectToDatabase } from "@/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectToDatabase();

  try {
    if (id) {
      const user = await getUserById(id);
      return user
        ? NextResponse.json(user)
        : NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 },
    );
  }
}

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

export async function PUT(req: NextRequest) {
  await connectToDatabase();

  try {
    const { id, data } = await req.json();
    if (!id || !data) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 },
      );
    }

    const updatedUser = await updateUser(id, data);
    return updatedUser
      ? NextResponse.json(updatedUser)
      : NextResponse.json({ error: "User not found." }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectToDatabase();

  if (!id) {
    return NextResponse.json({ error: "Missing user ID." }, { status: 400 });
  }

  try {
    const deletedUser = await deleteUser(id);
    return deletedUser
      ? NextResponse.json(deletedUser)
      : NextResponse.json({ error: "User not found." }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user." },
      { status: 500 },
    );
  }
}
