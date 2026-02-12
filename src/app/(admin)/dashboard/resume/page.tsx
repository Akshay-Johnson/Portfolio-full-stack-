"use client";

import { useState, useEffect } from "react";

const tabs = [
  "profile",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
];

export default function ResumeCMS() {
  const [activeTab, setActiveTab] = useState("profile");

  const [data, setData] = useState<any>({
    profile: {},
    experience: [],
    education: [],
    skills: { frontend: [] },
    projects: [],
    certifications: [],
    languages: [],
  });

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((res) => res && setData(res));
  }, []);

  async function saveResume() {
    await fetch("/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(data.projects);
    alert("Resume saved successfully!");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-black/20 backdrop-blur-2xl ">
      <h1 className="text-3xl font-bold mb-6">Resume CMS</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 font-black bg-black/30 p-3 rounded">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize ${
              activeTab === tab
                ? "bg-blue-500 text-white border-2 border-blue-500"
                : "bg-black/20 border-2"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= PROFILE ================= */}
      {activeTab === "profile" && (
        <div className="space-y-3">
          {/* Name */}
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={data.profile?.name ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  name: e.target.value,
                },
              })
            }
          />

          {/* Phone */}
          <input
            className="border p-2 w-full rounded"
            placeholder="Phone"
            value={data.profile?.phone ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  phone: e.target.value,
                },
              })
            }
          />

          {/* Email */}
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={data.profile?.email ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  email: e.target.value,
                },
              })
            }
          />

          {/* Location */}
          <input
            className="border p-2 w-full rounded"
            placeholder="Location"
            value={data.profile?.location ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  location: e.target.value,
                },
              })
            }
          />

          {/* GitHub */}
          <input
            className="border p-2 w-full rounded"
            placeholder="GitHub Username OR Full URL"
            value={data.profile?.github ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  github: e.target.value,
                },
              })
            }
          />

          {/* LinkedIn */}
          <input
            className="border p-2 w-full rounded"
            placeholder="LinkedIn Username OR Full URL"
            value={data.profile?.linkedin ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  linkedin: e.target.value,
                },
              })
            }
          />

          {/* Summary */}
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Summary"
            value={data.profile?.summary ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                profile: {
                  ...data.profile,
                  summary: e.target.value,
                },
              })
            }
          />
        </div>
      )}

      {/* ================= EXPERIENCE ================= */}
      {activeTab === "experience" && (
        <div className="space-y-6">
          {data.experience.map((exp: any, i: number) => (
            <div key={i} className="border p-4 rounded space-y-3">
              <input
                className="border p-2 w-full rounded"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => {
                  const updated = [...data.experience];
                  updated[i].title = e.target.value;
                  setData({ ...data, experience: updated });
                }}
              />

              <input
                className="border p-2 w-full rounded"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const updated = [...data.experience];
                  updated[i].company = e.target.value;
                  setData({ ...data, experience: updated });
                }}
              />

              <input
                className="border p-2 w-full rounded"
                placeholder="Year"
                value={exp.year}
                onChange={(e) => {
                  const updated = [...data.experience];
                  updated[i].year = e.target.value;
                  setData({ ...data, experience: updated });
                }}
              />

              {/* Points */}
              <div className="space-y-2">
                <p className="font-semibold">Points</p>

                {(exp.points || []).map((p: string, pI: number) => (
                  <input
                    key={pI}
                    className="border p-2 w-full rounded"
                    value={p}
                    placeholder="Achievement / Responsibility"
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[i].points[pI] = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                  />
                ))}

                {/* Add Point */}
                <button
                  onClick={() => {
                    const updated = [...data.experience];
                    if (!updated[i].points) updated[i].points = [];
                    updated[i].points.push("");
                    setData({ ...data, experience: updated });
                  }}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Add Point
                </button>
              </div>

              {/* Delete Experience */}
              <button
                onClick={() => {
                  const updated = data.experience.filter(
                    (_: any, index: number) => index !== i,
                  );
                  setData({ ...data, experience: updated });
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete Experience
              </button>
            </div>
          ))}

          {/* Add Experience */}
          <button
            onClick={() =>
              setData({
                ...data,
                experience: [
                  ...data.experience,
                  { title: "", company: "", year: "", points: [""] },
                ],
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Experience
          </button>
        </div>
      )}

      {/* ================= EDUCATION ================= */}

      {activeTab === "education" && (
        <div className="space-y-6">
          {data.education?.map((edu: any, i: number) => (
            <div key={i} className="border p-4 rounded space-y-4">
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...data.education];
                  updated[i].degree = e.target.value;
                  setData({ ...data, education: updated });
                }}
              />

              <input
                placeholder="Institute"
                value={edu.institute}
                onChange={(e) => {
                  const updated = [...data.education];
                  updated[i].institute = e.target.value;
                  setData({ ...data, education: updated });
                }}
              />

              <input
                placeholder="Year"
                value={edu.year}
                onChange={(e) => {
                  const updated = [...data.education];
                  updated[i].year = e.target.value;
                  setData({ ...data, education: updated });
                }}
              />

              <button
                onClick={() => {
                  const updated = data.education.filter(
                    (_: any, index: number) => i !== index,
                  );
                  setData({ ...data, education: updated });
                }}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete Education
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              setData({
                ...data,
                education: [
                  ...data.education,
                  { degree: "", institute: "", year: "" },
                ],
              });
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Education
          </button>
        </div>
      )}

      {/* Skills */}
      {activeTab === "skills" && (
        <div className="space-y-3">
          {Object.entries(data.skills || {}).map(([category, values]: any) => (
            <div key={category} className="border p-4 rounded space-y-3">
              <h3 className="font-bold text-lg">{category}</h3>
              {values.map((skill: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={skill}
                    onChange={(e) => {
                      const updated = { ...data.skills };
                      updated[category][i] = e.target.value;
                      setData({ ...data, skills: updated });
                    }}
                    className="w-32 border-1 rounded p-1"
                  />
                  <button
                    onClick={() => {
                      const updated = { ...data.skills };
                      updated[category] = updated[category].filter(
                        (_: string, index: number) => index !== i,
                      );
                      setData({ ...data, skills: updated });
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = { ...data.skills };
                  updated[category].push("");
                  setData({ ...data, skills: updated });
                }}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Skill
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {activeTab === "projects" && (
        <div className="space-y-3">
          {data.projects?.map((proj: any, i: number) => (
            <div key={i} className="border p-4 rounded space-y-3">
              <input
                placeholder="Project Title"
                value={proj.title}
                className="border p-2 rounded w-full"
                onChange={(e) => {
                  const updated = [...data.projects];
                  updated[i].title = e.target.value;
                  setData({ ...data, projects: updated });
                }}
              />

              <textarea
                placeholder="Project Description"
                value={proj.description}
                className="border p-2 rounded w-full"
                onChange={(e) => {
                  const updated = [...data.projects];
                  updated[i].description = e.target.value;
                  setData({ ...data, projects: updated });
                }}
              />

              <input
                placeholder="Project Link"
                value={proj.link || ""}
                className="border p-2 rounded w-full"
                onChange={(e) => {
                  const updated = [...data.projects];
                  updated[i].link = e.target.value;
                  setData({ ...data, projects: updated });
                }}
              />

              <button
                onClick={() => {
                  const updated = data.projects.filter(
                    (_: any, index: number) => index !== i,
                  );
                  setData({ ...data, projects: updated });
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete Project
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setData({
                ...data,
                projects: [
                  ...data.projects,
                  { title: "", description: "", link: "" },
                ],
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        </div>
      )}

      {/* Certifications */}
      {activeTab === "certifications" && (
        <div className="space-y-3 py-2 ">
          {data.certifications?.map((c: string, i: number) => (
            <div key={i} className="flex gap-3 py-1 ">
              <input
                key={i}
                value={c}
                onChange={(e) => {
                  const updated = [...data.certifications];
                  updated[i] = e.target.value;
                  setData({
                    ...data,
                    certifications: updated,
                  });
                }}
                className="w-full border-1 rounded p-1"
              />

              <button
                onClick={() => {
                  const updated = data.certifications.filter(
                    (_: string, index: number) => index !== i,
                  );
                  setData({
                    ...data,
                    certifications: updated,
                  });
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setData({
                ...data,
                certifications: [...data.certifications, ""],
              });
            }}
            className="bg-blue-600 mx-2 px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}

      {/* Languages */}
      {activeTab === "languages" && (
        <div className="space-y-3">
          {data.languages?.map((l: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                key={i}
                value={l}
                onChange={(e) => {
                  const updated = [...data.languages];
                  updated[i] = e.target.value;
                  setData({
                    ...data,
                    languages: updated,
                  });
                }}
                className="w-32 border-1 rounded p-1"
              />

              <button
                onClick={() => {
                  const updated = data.languages.filter(
                    (_: string, index: number) => index !== i,
                  );
                  setData({
                    ...data,
                    languages: updated,
                  });
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setData({
                ...data,
                languages: [...data.languages, ""],
              })
            }
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}

      {/* SAVE BUTTON */}
      <button
        onClick={saveResume}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Save Resume
      </button>
    </div>
  );
}
