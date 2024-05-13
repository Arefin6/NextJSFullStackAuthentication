import { getDataFromToken } from "@/helpers/getTokenData";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 400 });
  }
}
