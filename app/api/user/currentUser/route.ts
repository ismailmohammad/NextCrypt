import { connectDB } from "@/app/_database/database";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/app/_database/verifyAuthToken";

connectDB();

export async function GET(request: NextRequest) {
    return verifyAuthToken(request);
}