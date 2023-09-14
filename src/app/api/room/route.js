import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  const room = DB.rooms.filter((x) => x).length;
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: room,
  });
};

export const POST = async (request) => {
  const payload = checkToken();

  if (payload === null) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();
  // if(){
  //   return NextResponse.json(
  //     {
  //       ok: false,
  //       message: `Room ${"replace this with room name"} already exists`,
  //     },
  //     { status: 400 }
  //   );
  // }

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
