import { connectDB } from "@/app/_database/database";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/app/_database/verifyAuthToken";

connectDB();

export async function POST(request: NextRequest) {
    const getCurrentUser = await verifyAuthToken(request);
    // TODO: clean this up
    const { user }  = await getCurrentUser.json();
    const res = NextResponse.json({message: "Log out successful, Crypt sealed."});
    res.cookies.delete('auth_token');
    return res;
}