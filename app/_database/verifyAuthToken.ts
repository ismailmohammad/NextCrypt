import User from "@/app/_models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWTAuthToken } from "@/app/_models/authToken.model";

export const verifyAuthToken = async (request: NextRequest) => {
  const jwtToken = request.cookies.get("auth_token");
  console.log(jwtToken);
  if (!jwtToken) {
    return NextResponse.json({ error: "Please log in to use this endpoint" }, { status: 401 });
  }
  const tokenData = jwt.verify(jwtToken.value, process.env.AUTH_TOKEN_SECRET!);
  const { id } = tokenData as JwtPayload;
  // TODO: ensure token not expired
  const user = await User.findOne({ _id: id });
  if (!user) {
    return NextResponse.json({ error: "Please log in to use this endpoint" }, { status: 401 });
  }
  return NextResponse.json({ message: `Logged in as ${user.email}`, user: user.email });
};
