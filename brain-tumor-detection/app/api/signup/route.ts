import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
export async function POST(request: NextRequest) {
  try {
    dbConnect();
    const { name, email, password } = await request.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 }
      );
    }

    // Check if the user is already registered
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return NextResponse.json(
        { _id: user.id, email: user.email, success: true },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User not created" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
