import { connectDB } from "@/app/_database/database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/_models/user.model";
import { loginFormSchema } from "@/app/_models/formValidation";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWTAuthToken } from "@/app/_models/authToken.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const parsed = loginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password")
    })
    if (!parsed.success) return NextResponse.json(parsed.error.format(), {status: 400});
    const { email, password } = parsed.data;
    const user = await User.findOne({ email });
    // TODO: debug - remove after - don't let a user know that it doesn't exist though for later attacks
    if (!user) {
      console.log("no user found ");
    }
    const passwordMatched = await bcryptjs.compare(password, user.password || "johuigyuftydrytuyiguohip'jhyguiyftudjuiugohipj'hpigufyitdukc");
    if (!passwordMatched) {
      return NextResponse.json({error: "The email or password entered is incorrect. Please check your credentials."}, {status: 400});
    }
    const jwtTokenPayload: JWTAuthToken = {
      id: user._id,
      email: user.email
    };
    const jwtToken = jwt.sign(jwtTokenPayload, process.env.AUTH_TOKEN_SECRET!, {expiresIn: "1h"});
    const res: NextResponse = NextResponse.json({message: `Login Successful! Welcome to your crypt: ${email}`});
    res.cookies.set("auth_token", jwtToken, { httpOnly: true });
    return res;
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
}
