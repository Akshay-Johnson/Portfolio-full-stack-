"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  title: string;
  description?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    image: "", // ✅ store Cloudinary URL
  });

  // ================= FETCH PROJECTS =================
  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= SUBMIT =================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

      if (uploading) {
        alert("Please wait for image upload");
        return;
      }

    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()),
    };

    const url = editingId ? `/api/projects/${editingId}` : `/api/projects`;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    resetForm();
    fetchProjects();
  }

  // ================= CLOUDINARY UPLOAD =================
  async function uploadImage(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        image: data.secure_url || data.url,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }

  // ================= EDIT =================
  function handleEdit(project: Project) {
    setEditingId(project._id);

    setForm({
      title: project.title,
      description: project.description || "",
      techStack: project.techStack?.join(", ") || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      image: project.image || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ================= DELETE =================
  async function deleteProject(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      description: "",
      techStack: "",
      liveUrl: "",
      githubUrl: "",
      image: "",
    });
  }

  // ================= UI =================
  return (
    <div>
      <h1 className="text-3xl mb-6">Project CMS</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <input
          placeholder="Tech stack (comma separated)"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Live URL"
          value={form.liveUrl}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="GitHub URL"
          value={form.githubUrl}
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          className="border p-2 w-full"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
          }}
        />

        {/* Preview */}
        {form.image && <img src={form.image} className="w-40 rounded mt-2" />}

        <button className="bg-blue-500 px-4 py-2 rounded text-white">
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* PROJECT LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p._id} className="border p-4 rounded">
              <p className="font-bold">{p.title}</p>

              {p.image && <img src={p.image} className="w-40 mt-2 rounded" />}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(p._id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
