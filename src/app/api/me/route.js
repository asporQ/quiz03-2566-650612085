import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Tikomporn Luxsanaprokin",
    studentId: "650612085",
  });
};
