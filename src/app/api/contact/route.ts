import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/contact";

export async function POST(request: Request) {
  console.log("📩 Contact API called");

  try {
    // ----- DB CONNECTION -----
    console.log("⏳ Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB Connected");

    // ----- PARSE BODY -----
    const body = await request.json();
    console.log("📦 Received Body:", body);

    // ----- BASIC VALIDATION -----
    if (!body.name || !body.email || !body.message) {
      console.warn("⚠️ Validation Failed:", body);
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // ----- CREATE DOCUMENT -----
    console.log("📝 Creating Contact Document...");
    const message = await Contact.create(body);
    console.log("✅ Contact Saved:", message._id);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (err: any) {
    console.error("❌ Contact API Error");
    console.error("Message:", err?.message);
    console.error("Stack:", err?.stack);

    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 },
    );
  }
}
