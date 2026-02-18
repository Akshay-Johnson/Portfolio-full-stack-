"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";

function safeArray(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return Object.values(value);
  if (typeof value === "string") return [value];
  return [];
}

function formatSkillTitle(key: string) {
  const map: any = {
    apiSecurity: "APIs & Security",
    toolsDeployment: "Tools & Deployment",
    cloudVirtualization: "Cloud & Virtualization",
    focusAreas: "Focus Areas",
  };

  return map[key] || key;
}

export default function Resume() {
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        console.log("Resume Data:", data);
        setResume(data);
      });
  }, []);

  if (!resume) return null;

  return (
    <section className="py-20 backdrop-blur-2xl bg-black/20">
      <a
        href="/api/resume/pdf"
        target="_blank"
        
      >
        <Button/>
      </a>

      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl text-center mb-10">Resume</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Profile */}
            <div>
              <h2 className="text-xl font-bold">{resume.profile?.name}</h2>

              <p>{resume.profile?.phone}</p>
              <p>{resume.profile?.email}</p>
              <p>{resume.profile?.location}</p>
              <p>GitHub: {resume.profile?.github}</p>
              <p>LinkedIn: {resume.profile?.linkedin}</p>

              <p className="mt-3 text-white">{resume.profile?.summary}</p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-bold">Experience</h3>

              {safeArray(resume.experience).map((exp: any, i: number) => (
                <div key={i}>
                  <p className="font-semibold">
                    {exp.title} - {exp.company}
                  </p>

                  <p className="text-sm text-white/80">{exp.year}</p>

                  <ul className="list-disc pl-6">
                    {safeArray(exp.points).map((p: string, idx: number) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-bold">Education</h3>

              {safeArray(resume.education).map((edu: any, i: number) => (
                <div key={i}>
                  <ul className="list-disc pl-6">
                    <li className="font-semibold py-2">{edu.degree}</li>
                    <p>
                      {edu.institute} - {edu.year}
                    </p>
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-bold mb-2">Skills</h3>

              {resume.skills && Object.keys(resume.skills).length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {Object.entries(resume.skills).map(([key, value]: any) => (
                    <li key={key}>
                      <strong className="capitalize">
                        {formatSkillTitle(key)}:
                      </strong>{" "}
                      {safeArray(value).join(", ")}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm opacity-70">No skills added</p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Projects */}
            <div>
              <h3 className="text-xl font-bold">Projects</h3>
              {safeArray(resume.projects).map((proj: any, i: number) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{proj.title}</p>

                  <ul className="list-disc pl-6 mt-1 space-y-1">
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
                      className="text-blue-500 underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold">Certifications</h3>

              {safeArray(resume.certifications).map((c: string, i: number) => (
                <ul className="list-disc pl-6">
                  <li key={i}>{c}</li>
                </ul>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xl font-bold">Languages</h3>

              {safeArray(resume.languages).map((l: string, i: number) => (
                <ul className="list-disc pl-6">
                  <li key={i}>{l}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
