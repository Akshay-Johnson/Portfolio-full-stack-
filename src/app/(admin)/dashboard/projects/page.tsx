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

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    imageFile: null as File | null,
  });

  // ================= FETCH PROJECTS =================
  async function fetchProjects() {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch projects error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= SUBMIT (CREATE / UPDATE) =================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append(
      "techStack",
      JSON.stringify(form.techStack.split(",").map((t) => t.trim())),
    );
    formData.append("liveUrl", form.liveUrl);
    formData.append("githubUrl", form.githubUrl);

    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    const url = editingId ? `/api/projects/${editingId}` : `/api/projects`;

    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        body: formData,
      });

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Submit project error:", err);
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
      imageFile: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ================= DELETE =================
  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;

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
      imageFile: null,
    });
  }

  // ================= UI =================
  return (
    <div>
      <h1 className="text-3xl mb-6">Project CMS</h1>

      {/* FORM */}
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, imageFile: e.target.files?.[0] || null })
          }
          className="border p-2 w-full"
        />

        <div className="flex gap-4">
          <button className="bg-blue-500 px-4 py-2 rounded text-white">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 px-4 py-2 rounded text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <span className="font-medium">{p.title}</span>

              <div className="flex gap-2">
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
