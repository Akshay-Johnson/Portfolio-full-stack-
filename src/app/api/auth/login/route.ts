import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/user";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    console.log("LOGIN API HIT");

    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    await connectDB();
    console.log("DB Connected");

    const { email, password } = await req.json();
    console.log("Login attempt:", email);

    const user = await User.findOne({ email, role: "admin" });
    console.log("User found:", !!user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    console.log("Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    const token = generateToken(user);
    console.log("JWT created");

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("LOGIN ERROR FULL:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
