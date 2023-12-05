import { NextRequest, NextResponse } from "next/server";
import { registerFormSchema } from "@/app/_models/formValidation";
import { connectDB } from "@/app/_database/database";
import User from "@/app/_models/user.model";
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const parsed = registerFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirm: formData.get("confirm"),
    });
    // Ensure form data is fits schema before continuing
    if (!parsed.success) return NextResponse.json(parsed.error.format(), {status: 400});
    const {email, password } = parsed.data;
    const user = await User.findOne({ email });
    if (user) {
      // Change this to be more generic ie. thank user for registering and to check email for verification instead of letting 'bad actor' know
      // account exists with this email already.
      return NextResponse.json({error: "Crypt already claimed. Please use another email."}, {status: 400});
    }
    const salt = await bcryptjs.genSalt(14); // 14 rounds
    const hashed = await bcryptjs.hash(password, salt);
    const registerUser = new User({
      email,
      password: hashed
    });
    const registered = await registerUser.save();
    console.log(registered);
    return NextResponse.json({message: `Crypt created for: ${email}.`}, {status: 200});
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({error: err}, {status: 500})
  }
}
