import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";

/* ================= NORMALIZE URL ================= */

function normalizeUrl(url?: string) {
  if (!url) return "";
  if (!url.startsWith("http")) return "https://" + url;
  return url;
}

/* ================= UPDATE PROJECT ================= */

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    // ⭐ MUST await params
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const updateData: any = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.techStack !== undefined) updateData.techStack = body.techStack;

    if (body.liveUrl !== undefined)
      updateData.liveUrl = normalizeUrl(body.liveUrl);

    if (body.githubUrl !== undefined)
      updateData.githubUrl = normalizeUrl(body.githubUrl);

    if (body.image !== undefined) updateData.image = body.image;

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 },
    );
  }
}

/* ================= DELETE PROJECT ================= */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    // ⭐ MUST await params
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: 400 },
      );
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 },
    );
  }
}
