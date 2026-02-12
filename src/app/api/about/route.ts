import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import About from "@/lib/models/about";

/* ================= GET ABOUT ================= */
export async function GET() {
  await connectDB();

  const about = await About.findOne();
  return NextResponse.json(about);
}

/* ================= CREATE / UPDATE ABOUT ================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    let about = await About.findOne();

    if (about) {
      about = await About.findByIdAndUpdate(about._id, body, { new: true });
    } else {
      about = await About.create(body);
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("ABOUT SAVE ERROR:", error);

    return NextResponse.json(
      { message: "Failed to save about" },
      { status: 500 },
    );
  }
}
