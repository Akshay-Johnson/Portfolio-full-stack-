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
  const [skillInput, setSkillInput] = useState<{ [key: string]: string }>({});

  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedEducation, setSelectedEducation] = useState<number | null>(
    null,
  );
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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

  function openExperienceModal(index: number) {
    setSelectedExperience(index);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedExperience(null);
    setIsModalOpen(false);
  }

  function openEducationModal(index: number) {
    setSelectedEducation(index);
    setIsEducationModalOpen(true);
  }

  function closeEducationModal() {
    setSelectedEducation(null);
    setIsEducationModalOpen(false);
  }

  function openProjectModal(index: number) {
    setSelectedProject(index);
    setIsProjectModalOpen(true);
  }

  function closeProjectModal() {
    setSelectedProject(null);
    setIsProjectModalOpen(false);
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
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/10 p-3 mb-6 rounded">
          <div className="flex flex-wrap gap-3 font-black">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded capitalize transition ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.experience.map((exp: any, i: number) => (
              <div
                key={i}
                className="bg-black/30 border border-white/10 rounded-xl p-5 hover:border-blue-400 transition"
              >
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.company}</p>
                <button
                  onClick={() => openExperienceModal(i)}
                  className="mt-4 bg-blue-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            ))}
            {/* Add Experience Button */}
            <button
              onClick={() => {
                const newIndex = data.experience.length;

                setData({
                  ...data,
                  experience: [
                    ...data.experience,
                    { title: "", company: "", year: "", points: [""] },
                  ],
                });

                openExperienceModal(newIndex);
              }}
              className="border border-dashed border-gray-500 rounded-xl p-6 hover:border-blue-400"
            >
              Add Experience
            </button>
          </div>
        )}

        {/* ================= EDUCATION ================= */}

        {activeTab === "education" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.education.map((edu: any, i: number) => (
              <div
                key={i}
                className="bg-black/30 border border-white/10 rounded-xl p-5 hover:border-blue-400 transition"
              >
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-sm text-gray-400">{edu.institute}</p>

                <button
                  onClick={() => openEducationModal(i)}
                  className="mt-4 bg-blue-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const newIndex = data.education.length;

                setData({
                  ...data,
                  education: [
                    ...data.education,
                    { degree: "", institute: "", year: "" },
                  ],
                });

                openEducationModal(newIndex);
              }}
              className="border border-dashed border-gray-500 rounded-xl p-6 hover:border-blue-400"
            >
              Add Education
            </button>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.skills || {}).map(
              ([category, values]: any) => (
                <div
                  key={category}
                  className=" p-4 rounded space-y-4 border bg-black/20"
                >
                  <h3 className="font-bold text-lg capitalize">{category}</h3>

                  <div className="flex gap-2">
                    <input
                      value={skillInput[category] || ""}
                      onChange={(e) => {
                        setSkillInput({
                          ...skillInput,
                          [category]: e.target.value,
                        });
                      }}
                      placeholder="Add Skill"
                      className="w-32 border-1 rounded p-1"
                    />

                    <button
                      onClick={() => {
                        if (!skillInput[category]?.trim()) return;

                        const updated = { ...data.skills };
                        updated[category] = [
                          ...updated[category],
                          skillInput[category]?.trim(),
                        ];
                        setData({ ...data, skills: updated });

                        setSkillInput({ ...skillInput, [category]: "" });
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Add Skill
                    </button>
                  </div>
                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {values.map((skill: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm"
                      >
                        <span>{skill}</span>

                        <button
                          onClick={() => {
                            const updated = { ...data.skills };
                            updated[category] = updated[category].filter(
                              (_: string, index: number) => index !== i,
                            );
                            setData({ ...data, skills: updated });
                          }}
                          className="text-red-400 hover:text-red-500 text-xs font-bold"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.projects.map((proj: any, i: number) => (
              <div
                key={i}
                className="bg-black/30 border border-white/10 rounded-xl p-5 hover:border-blue-400 transition"
              >
                <h3 className="text-lg font-semibold">{proj.title}</h3>

                <button
                  onClick={() => openProjectModal(i)}
                  className="mt-4 bg-blue-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const newIndex = data.projects.length;

                setData({
                  ...data,
                  projects: [
                    ...data.projects,
                    { title: "", description: [""] },
                  ],
                });

                openProjectModal(newIndex);
              }}
              className="border border-dashed border-gray-500 rounded-xl p-6 hover:border-blue-400"
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
          <div className="space-y-4 flex flex-col items-center">
            {/* Input + Add */}
            <div className="flex gap-2">
              <input
                value={skillInput.languages || ""}
                onChange={(e) =>
                  setSkillInput({
                    ...skillInput,
                    languages: e.target.value,
                  })
                }
                placeholder="Add Language"
                className="w-40 border border-gray-600 rounded p-2"
              />

              <button
                onClick={() => {
                  if (!skillInput.languages?.trim()) return;

                  setData({
                    ...data,
                    languages: [...data.languages, skillInput.languages.trim()],
                  });

                  setSkillInput({
                    ...skillInput,
                    languages: "",
                  });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>

            {/* Language Chips */}
            <div className="flex flex-wrap gap-2">
              {data.languages?.map((lang: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm"
                >
                  <span>{lang}</span>

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
                    className="text-red-400 hover:text-red-500 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isModalOpen && selectedExperience !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Experience</h2>
              <button onClick={closeModal} className="text-red-400">
                ✕
              </button>
            </div>

            {(() => {
              const i = selectedExperience;
              const exp = data.experience?.[i];

              if (!exp) return null;

              return (
                <div className="space-y-4">
                  <RightLabelInput
                    label="-Job Title"
                    value={exp.title}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[i].title = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                  />

                  <div className="flex gap-4">
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

                  <div className="space-y-2">
                    <p className="font-semibold">Responsibilities</p>

                    {(exp.points || []).map((p: string, pI: number) => (
                      <div key={pI} className="flex gap-2">
                        <input
                          value={p}
                          className="w-full border rounded p-2 bg-black/40"
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[i].points[pI] = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                        />

                        <button
                          onClick={() => {
                            const updated = [...data.experience];
                            updated[i].points = updated[i].points.filter(
                              (_: string, index: number) => index !== pI,
                            );
                            setData({ ...data, experience: updated });
                          }}
                          className="bg-red-500 px-3 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const updated = [...data.experience];
                        updated[i].points.push("");
                        setData({ ...data, experience: updated });
                      }}
                      className="bg-blue-500 px-3 py-1 rounded"
                    >
                      Add Responsibility
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const updated = data.experience.filter(
                        (_: any, index: number) => index !== i,
                      );
                      setData({ ...data, experience: updated });
                      closeModal();
                    }}
                    className="bg-red-600 px-4 py-2 rounded w-full"
                  >
                    Delete Experience
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {isEducationModalOpen && selectedEducation !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Education</h2>
              <button onClick={closeEducationModal}>✕</button>
            </div>

            {(() => {
              const i = selectedEducation;
              const edu = data.education?.[i];
              if (!edu) return null;

              return (
                <div className="space-y-4">
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
                    label="-Institute"
                    value={edu.institute}
                    onChange={(e) => {
                      const updated = [...data.education];
                      updated[i].institute = e.target.value;
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

                  <button
                    onClick={() => {
                      const updated = data.education.filter(
                        (_: any, index: number) => index !== i,
                      );
                      setData({ ...data, education: updated });
                      closeEducationModal();
                    }}
                    className="bg-red-600 px-4 py-2 rounded w-full"
                  >
                    Delete Education
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
      {isProjectModalOpen && selectedProject !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Project</h2>
              <button onClick={closeProjectModal}>✕</button>
            </div>

            {(() => {
              const i = selectedProject;
              const proj = data.projects?.[i];
              if (!proj) return null;

              return (
                <div className="space-y-4">
                  <RightLabelInput
                    label="-Project Title"
                    value={proj.title}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[i].title = e.target.value;
                      setData({ ...data, projects: updated });
                    }}
                  />

                  {(proj.description || []).map((p: string, pI: number) => (
                    <div key={pI} className="flex gap-2">
                      <input
                        value={p}
                        className="w-full border rounded p-2 bg-black/40"
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[i].description[pI] = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                      />

                      <button
                        onClick={() => {
                          const updated = [...data.projects];
                          updated[i].description = updated[
                            i
                          ].description.filter(
                            (_: any, index: number) => index !== pI,
                          );
                          setData({ ...data, projects: updated });
                        }}
                        className="bg-red-500 px-3 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const updated = [...data.projects];
                      updated[i].description.push("");
                      setData({ ...data, projects: updated });
                    }}
                    className="bg-blue-500 px-3 py-1 rounded"
                  >
                    Add Bullet
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
