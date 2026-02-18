"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface ResumeData {
  profile?: {
    name?: string;
    phone?: string;
    email?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    summary?: string;
  };
  experience?: {
    title?: string;
    company?: string;
    year?: string;
    points?: string[];
  }[];
  education?: {
    degree?: string;
    institute?: string;
    year?: string;
  }[];
  skills?: Record<string, string[]>;
  projects?: {
    title?: string;
    description?: string[];
    link?: string;
  }[];
  certifications?: string[];
  languages?: string[];
}

function safeArray(value: unknown): any[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return Object.values(value);
  if (typeof value === "string") return [value];
  return [];
}

function formatSkillTitle(key: string) {
  const map: Record<string, string> = {
    apiSecurity: "APIs & Security",
    toolsDeployment: "Tools & Deployment",
    cloudVirtualization: "Cloud & Virtualization",
    focusAreas: "Focus Areas",
  };

  return map[key] || key;
}

export default function Resume() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/resume");
        const data = await res.json();
        setResume(data);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center text-white">
        <p className="animate-pulse text-white/60">Loading resume...</p>
      </section>
    );
  }

  if (!resume) return null;

  return (
    <section
      id="resume"
      className="py-16 md:py-24 px-4 md:px-6 flex justify-center"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-6">
          <h2 className="text-3xl md:text-5xl font-bold">Resume</h2>

          <a href="/api/resume/pdf" target="_blank" rel="noopener noreferrer">
            <Button />
          </a>
        </div>

        {/* Profile */}
        <div className="text-center mb-10 space-y-1 text-sm md:text-base">
          <h3 className="text-xl font-semibold">{resume.profile?.name}</h3>
          <p>{resume.profile?.phone}</p>
          <p>{resume.profile?.email}</p>
          <p>{resume.profile?.location}</p>
          <p>GitHub: {resume.profile?.github}</p>
          <p>LinkedIn: {resume.profile?.linkedin}</p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-10">
            {/* Summary */}
            <section>
              <h3 className="text-xl font-bold mb-3">Profile</h3>
              <p className="leading-relaxed text-white/90">
                {resume.profile?.summary}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h3 className="text-xl font-bold mb-4">Experience</h3>

              {safeArray(resume.experience).map((exp, i) => (
                <div key={i} className="mb-6">
                  <p className="font-semibold">
                    {exp.title} – {exp.company}
                  </p>
                  <p className="text-sm text-white/70 mb-2">{exp.year}</p>

                  <ul className="list-disc pl-5 space-y-1">
                    {safeArray(exp.points).map((point: string, idx: number) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Education */}
            <section>
              <h3 className="text-xl font-bold mb-4">Education</h3>

              {safeArray(resume.education).map((edu, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-sm text-white/70">
                    {edu.institute} – {edu.year}
                  </p>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-xl font-bold mb-4">Skills</h3>

              {resume.skills && Object.keys(resume.skills).length > 0 ? (
                <ul className="space-y-2">
                  {Object.entries(resume.skills).map(([key, value]) => (
                    <li key={key}>
                      <strong>{formatSkillTitle(key)}:</strong>{" "}
                      {safeArray(value).join(", ")}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm opacity-70">No skills added</p>
              )}
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-10">
            {/* Projects */}
            <section>
              <h3 className="text-xl font-bold mb-4">Projects</h3>

              {safeArray(resume.projects).map((proj, i) => (
                <div key={i} className="mb-6">
                  <p className="font-semibold">{proj.title}</p>

                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {safeArray(proj.description).map(
                      (point: string, idx: number) => (
                        <li key={idx}>{point}</li>
                      ),
                    )}
                  </ul>

                  {proj.link && (
                    <a
                      href={
                        proj.link.startsWith("http")
                          ? proj.link
                          : `https://${proj.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline mt-2 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-xl font-bold mb-4">Certifications</h3>

              <ul className="list-disc pl-5 space-y-1">
                {safeArray(resume.certifications).map(
                  (c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ),
                )}
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h3 className="text-xl font-bold mb-4">Languages</h3>

              <ul className="list-disc pl-5 space-y-1">
                {safeArray(resume.languages).map((l: string, i: number) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
