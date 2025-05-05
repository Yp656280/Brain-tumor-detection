import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.NEXT_ACCESS_TOKEN_SECRET!,
        { expiresIn: "50m" }
      );
      const response = NextResponse.json({
        message: "Login successful",
        user,
        success: true,
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during user login:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
