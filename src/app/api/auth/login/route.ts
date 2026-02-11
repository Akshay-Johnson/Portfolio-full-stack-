import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/user";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email, role: "admin" });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    const token = generateToken(user);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
