import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/project";
import path from "path";
import fs from "fs/promises";

function normalizeUrl(url?: string) {
  if (!url) return "";
  if (!url.startsWith("http")) return "https://" + url;
  return url;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const techStack = JSON.parse(formData.get("techStack") as string);
    const liveUrl = formData.get("liveUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const imageFile = formData.get("image") as File | null;

    const updateData: any = {
      title,
      description,
      techStack,
      liveUrl: normalizeUrl(liveUrl),
      githubUrl: normalizeUrl(githubUrl),
    };

    // 🔁 replace image only if new file uploaded
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${crypto.randomUUID()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      updateData.image = `/uploads/${fileName}`;
    }

    const updated = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    await Project.findByIdAndDelete(id);

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 },
    );
  }
}
