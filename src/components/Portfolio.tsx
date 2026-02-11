"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Project = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects);
    console.log(projects);
  }, []);

  return (
    <section className="py-20 backdrop-blur-2xl bg-black/20">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
        Projects
      </h2>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p) => (
          <div
            key={p._id}
            className="group relative bg-black/20 backdrop-blur-xl border border-white/25 rounded-2xl overflow-hidden shadow-xl transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
          >
            {/* Image */}
            {p.image && (
              <div className="relative w-full h-52">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
                    >
                      Live Demo
                    </a>
                  )}

                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-800 transition"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>

              <p className="text-white text-sm leading-relaxed py-2">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white/80 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
