"use client";

import RightLabelInput from "@/components/RighntLabelInput";
import { useEffect, useState } from "react";

type AboutData = {
  name: string;
  bio: string;
  location: string;
  email: string;
  skills: string[];
  profileImage: string;
};

export default function AboutCMS() {
  const [data, setData] = useState<AboutData>({
    name: "",
    bio: "",
    location: "",
    email: "",
    skills: [],
    profileImage: "",
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ================= REMOVE SKILL ================= */
  function removeSkill(index: number) {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }

  /* ================= FETCH ABOUT ================= */
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((res) => res && setData(res));
  }, []);

  /* ================= SAVE ABOUT ================= */
  async function saveAbout() {
    await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("About Updated");
  }

  /* ================= ADD SKILL ================= */
  function addSkill() {
    const skill = skillsInput.trim();

    if (!skill) return;
    if (data.skills.includes(skill)) return;

    setData({
      ...data,
      skills: [...data.skills, skill],
    });

    setSkillsInput("");
  }

  /* ================= IMAGE UPLOAD ================= */
  async function uploadImage(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      setData((prev) => ({
        ...prev,
        profileImage: result.secure_url || result.url,
      }));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl  backdrop-blur-xl  p-6 rounded-2xl shadow-xl space-y-6">
        {/* BASIC DETAILS */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <RightLabelInput
              label="-Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <RightLabelInput
              label="-Location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>

          <div className="flex flex-col md:col-span-1">
            <RightLabelInput
              label="-Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
        </div>

        {/* BIO */}
        <div className="flex flex-col">
          <label className="text-sm mb-1">Bio</label>
          <textarea
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            className="input-style h-28 border border-gray-600 p-2 rounded"
          />
        </div>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col gap-3">
          <label className="text-sm">Profile Image</label>

          <input
            type="file"
            disabled={uploading}
            className="file-style border border-gray-600 p-2 rounded min-w-12 max-w-max text-sm cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
            }}
          />

          {uploading && (
            <p className="text-sm text-gray-400">Uploading image...</p>
          )}

          {data.profileImage && (
            <img
              src={data.profileImage}
              className="w-28 h-28 object-cover rounded-xl border border-white/30"
            />
          )}
        </div>

        {/* SKILLS */}
        <div>
          <label className="text-sm">Skills</label>

          <div className="flex gap-3 mt-2">
            <RightLabelInput
              label="-Add Skill"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
            />

            <button
              onClick={addSkill}
              className="primary-btn bg-blue-600 rounded px-4 py-2 text-sm cursor-pointer"
            >
              Add
            </button>
          </div>

          {/* Skill Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {data.skills.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm"
              >
                <span>{s}</span>

                <button
                  onClick={() => removeSkill(i)}
                  className="text-red-400 hover:text-red-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          {/* SAVE BUTTON */}
          <button
            onClick={saveAbout}
            className="primary-btn mx-auto px-2 py-2 text-lg bg-green-600 rounded text-lg"
          >
            Save About
          </button>
        </div>
      </div>
    </div>
  );
}
