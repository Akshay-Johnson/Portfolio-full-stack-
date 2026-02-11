import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/project";

import path from "path";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";

// ================= GET ALL PROJECTS =================
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

function normalizeUrl(url?: string) {
  if (!url) return "";
  if (!url.startsWith("http")) {
    return "https://" + url;
  }
  return url;
}

// ================= CREATE PROJECT =================
export async function POST(req: Request) {
  try {
    await connectDB();

    // 🔹 Read multipart form data
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const techStackRaw = formData.get("techStack") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const imageFile = formData.get("image") as File | null;

    // 🔹 Parse tech stack safely
    let techStack: string[] = [];
    if (techStackRaw) {
      try {
        techStack = JSON.parse(techStackRaw);
      } catch {
        techStack = [];
      }
    }

    let imagePath = "";

    // 🔹 Handle file upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${uuid()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Ensure uploads folder exists
      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      imagePath = `/uploads/${fileName}`;
    }

    // 🔹 Create DB record
    const project = await Project.create({
      title,
      description,
      techStack,
      liveUrl: normalizeUrl(liveUrl),
      githubUrl: normalizeUrl(githubUrl),
      image: imagePath,
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
