import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/project";

/* ================= NORMALIZE URL ================= */

function normalizeUrl(url?: string) {
  if (!url) return "";
  if (!url.startsWith("http")) return "https://" + url;
  return url;
}

/* ================= GET ALL PROJECTS ================= */

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

/* ================= CREATE PROJECT ================= */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const project = await Project.create({
      title: body.title,
      description: body.description,
      techStack: body.techStack || [],
      liveUrl: normalizeUrl(body.liveUrl),
      githubUrl: normalizeUrl(body.githubUrl),
      image: body.image || "", // ⭐ Cloudinary URL stored here
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 },
    );
  }
}
