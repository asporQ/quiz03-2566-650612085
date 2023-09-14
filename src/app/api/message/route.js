import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();

  const foundId = DB.roomId.findIndex((x) => x.roomId === roomId);
  if (roomId !== null || foundId !== -1) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }
  return NextResponse.json({
    ok: true,
    messages: DB.messages,
  });
};

export const POST = async (request) => {
  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: `Room is not found`,
  //   },
  //   { status: 404 }
  // );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  role = payload.role;
  const body = await request.json();
  const { messageId } = body;

  if (role !== "SUPER_ADMIN") {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  readDB();
  const foundId = DB.messageId.findIndex((x) => x.messageId === messageId);
  if (foundId === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );
  }

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
