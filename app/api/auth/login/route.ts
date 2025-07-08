// In app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth"; // Adjust the import path as needed

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // fake check - use real DB logic
  if (email === "admin@degan.com" && password === "123456") {
    const token = signToken({ email });

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
