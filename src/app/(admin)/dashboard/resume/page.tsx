"use client";

import RightLabelInput from "@/components/RighntLabelInput";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <button
        onClick={saveResume}
        className="fixed right-2 top-20 -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition cursor-pointer z-50"
      >
        <Save className="inline-block w-5 h-5 mr-2" />
        Save Resume
      </button>
      <div className="w-full-max-w-2xl  backdrop-blur-lg rounded p-6  shadow-xl space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 font-black  p-3 rounded">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 cursor-pointer rounded capitalize ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-white/20 "
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <div className="space-y-6 ">
            <div className=" flex justify-between gap-6">
              {/* Name */}
              <RightLabelInput
                label="-Name"
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
              <RightLabelInput
                label="-Phone"
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
            </div>

            <div className="flex gap-6">
              {/* Email */}
              <RightLabelInput
                label="-Email"
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
              <RightLabelInput
                label="-Location"
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
            </div>
            <div className="flex gap-6">
              {/* GitHub */}
              <RightLabelInput
                label="-GitHub URL"
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
              <RightLabelInput
                label="-LinkedIn URL"
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
            </div>

            {/* Summary */}
            <textarea
              className="border border-gray-600 p-2 py-5 w-full h-40 rounded"
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
          <div className="space-y-6 ">
            {data.experience.map((exp: any, i: number) => (
              <div key={i} className=" p-4 rounded space-y-6 ">
                <RightLabelInput
                  label="-Job Title"
                  value={exp.title}
                  onChange={(e) => {
                    const updated = [...data.experience];
                    updated[i].title = e.target.value;
                    setData({ ...data, experience: updated });
                  }}
                />
                <div className="flex justify-between gap-6">
                  <RightLabelInput
                    label="-Company"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[i].company = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                  />

                  <RightLabelInput
                    label="-Year"
                    value={exp.year}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[i].year = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                  />
                </div>

                {/* Points */}
                <div className="space-y-4 ">
                  <p className="font-semibold">
                    Points - Achivements/Responsibilities
                  </p>

                  {(exp.points || []).map((p: string, pI: number) => (
                    <div key={pI} className=" relative flex gap-2">
                      <input
                        key={pI}
                        className="border border-gray-600 p-2 w-full rounded"
                        value={p}
                        placeholder="Achievement / Responsibility"
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[i].points[pI] = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...data.experience];
                          updated[i].points = updated[i].points.filter(
                            (_: string, index: number) => index !== pI,
                          );
                          setData({ ...data, experience: updated });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 font-bold cursor-pointer"
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-4 space-x-4 ">
                    {/* Add Point */}
                    <button
                      onClick={() => {
                        const updated = [...data.experience];
                        if (!updated[i].points) updated[i].points = [];
                        updated[i].points.push("");
                        setData({ ...data, experience: updated });
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center cursor-pointer "
                    >
                      Add Point
                    </button>

                    {/* Delete Experience */}
                    <button
                      onClick={() => {
                        const updated = data.experience.filter(
                          (_: any, index: number) => index !== i,
                        );
                        setData({ ...data, experience: updated });
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center cursor-pointer "
                    >
                      Delete Experience
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Experience */}
            <div className="flex justify-center">
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
                className="m-auto bg-green-500 text-white px-4 py-2 rounded cursor-pointer "
              >
                Add Experience
              </button>
            </div>
          </div>
        )}

        {/* ================= EDUCATION ================= */}

        {activeTab === "education" && (
          <div className="space-y-6">
            {data.education?.map((edu: any, i: number) => (
              <div key={i} className=" p-4 rounded space-y-4 flex flex-col">
                <div className="flex justify-between gap-6">
                  <RightLabelInput
                    label="-Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...data.education];
                      updated[i].degree = e.target.value;
                      setData({ ...data, education: updated });
                    }}
                  />

                  <RightLabelInput
                    label="-Year"
                    value={edu.year}
                    onChange={(e) => {
                      const updated = [...data.education];
                      updated[i].year = e.target.value;
                      setData({ ...data, education: updated });
                    }}
                  />
                </div>

                <RightLabelInput
                  label="-Institute"
                  value={edu.institute}
                  onChange={(e) => {
                    const updated = [...data.education];
                    updated[i].institute = e.target.value;
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
            <div className="flex justify-center">
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
                className="bg-green-500 text-white px-4 py-2 rounded mx-auto flex items-center justify-center cursor-pointer "
              >
                Add Education
              </button>
            </div>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.skills || {}).map(
              ([category, values]: any) => (
                <div key={category} className=" p-4 rounded space-y-3">
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
              ),
            )}
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {data.projects?.map((proj: any, i: number) => {
              const description = Array.isArray(proj.description)
                ? proj.description
                : [];

              return (
                <div
                  key={i}
                  className="p-4 rounded space-y-4 border border-gray-700"
                >
                  {/* Title */}
                  <RightLabelInput
                    label="- Project Title"
                    value={proj.title || ""}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[i] = { ...updated[i], title: e.target.value };

                      setData({ ...data, projects: updated });
                    }}
                  />

                  {/* Description Bullet Points */}
                  <div className="space-y-2">
                    <label className="font-semibold">Description Points</label>

                    {description.map((point: string, j: number) => (
                      <div key={j} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={point}
                          className="border border-gray-600 p-2 rounded w-full"
                          placeholder="Enter bullet point"
                          onChange={(e) => {
                            const updated = [...data.projects];
                            const updatedDesc = [...description];
                            updatedDesc[j] = e.target.value;

                            updated[i] = {
                              ...updated[i],
                              description: updatedDesc,
                            };

                            setData({ ...data, projects: updated });
                          }}
                        />

                        <button
                          onClick={() => {
                            const updated = [...data.projects];
                            const updatedDesc = description.filter(
                              (_: any, index: number) => index !== j,
                            );

                            updated[i] = {
                              ...updated[i],
                              description: updatedDesc,
                            };

                            setData({ ...data, projects: updated });
                          }}
                          className="bg-red-500 px-2 py-1 rounded text-white"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Add Bullet */}
                    <button
                      onClick={() => {
                        const updated = [...data.projects];

                        updated[i] = {
                          ...updated[i],
                          description: [...description, ""],
                        };

                        setData({ ...data, projects: updated });
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      + Add Bullet Point
                    </button>
                  </div>

                  {/* Delete Project */}
                  <button
                    onClick={() => {
                      const updated = data.projects.filter(
                        (_: any, index: number) => index !== i,
                      );

                      setData({ ...data, projects: updated });
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete Project
                  </button>
                </div>
              );
            })}

            {/* Add Project */}
            <div className="flex justify-center">
              <button
                onClick={() =>
                  setData({
                    ...data,
                    projects: [
                      ...data.projects,
                      {
                        title: "",
                        description: [""], // safe default
                      },
                    ],
                  })
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Project
              </button>
            </div>
          </div>
        )}

        {/* Certifications */}
        {activeTab === "certifications" && (
          <div className="space-y-3 py-2 ">
            {data.certifications?.map((c: string, i: number) => (
              <div key={i} className="flex gap-3 py-1 ">
                <RightLabelInput
                  label="-Certifications"
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
                  className="w-32 border border-gray-600 rounded p-1"
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
      </div>
    </div>
  );
}
