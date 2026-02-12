import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/lib/models/resume";

/* ----------------------------
   Utility: Force Value To Array
----------------------------- */
function ensureArray(value: any): string[] {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  if (typeof value === "object") {
    return Object.values(value);
  }

  return [];
}

/* ----------------------------
   Normalize Resume Payload
----------------------------- */
function normalizeResumeData(data: any) {
  if (!data.skills) data.skills = {};

  // Normalize skills categories
  Object.keys(data.skills || {}).forEach((key) => {
    data.skills[key] = ensureArray(data.skills[key]);
  });

  // Normalize top-level arrays
  data.certifications = ensureArray(data.certifications);
  data.languages = ensureArray(data.languages);

  // Normalize experience points
  if (Array.isArray(data.experience)) {
    data.experience = data.experience.map((exp: any) => ({
      ...exp,
      points: ensureArray(exp.points),
    }));
  }

  return data;
}

/* ----------------------------
   GET Resume
----------------------------- */
export async function GET() {
  await connectDB();

  const resume = await Resume.findOne();

  return NextResponse.json(resume);
}

/* ----------------------------
   CREATE / UPDATE Resume
----------------------------- */
export async function POST(req: Request) {
  await connectDB();

  let body = await req.json();

  // 🔥 Normalize Incoming CMS Data
  body = normalizeResumeData(body);

  let resume = await Resume.findOne();

  if (resume) {
    resume = await Resume.findByIdAndUpdate(resume._id, body, {
      new: true,
      runValidators: true,
    });
  } else {
    resume = await Resume.create(body);
  }

  return NextResponse.json(resume);
}
