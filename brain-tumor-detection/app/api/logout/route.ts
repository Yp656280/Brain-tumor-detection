import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //create response
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    //set token in cookies
    response.cookies.set("token", "", { expires: new Date(0) });
    //return response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
