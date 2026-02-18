"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
};

const techColors = [
  "bg-blue-500/80",
  "bg-purple-500/80",
  "bg-orange-500/80",
  "bg-green-500/80",
  "bg-yellow-500/80",
  "bg-red-500/80",
  "bg-indigo-500/80",
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 text-center">
        <p className="text-white/60 animate-pulse">Loading projects...</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-20">
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-12 md:mb-16">
        My Projects
      </h2>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projects.map((p) => (
          <div
            key={p._id}
            className="group relative bg-white/5 backdrop-blur-md border border-white/15 
                       rounded-2xl overflow-hidden shadow-lg transition duration-300 
                       hover:-translate-y-2 flex flex-col"
          >
            {/* Image */}
            {p.image && (
              <div className="relative w-full h-48 md:h-52 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Desktop Hover Overlay */}
                <div
                  className="absolute inset-0 bg-black/70 opacity-0 
                             md:group-hover:opacity-100 transition duration-300 
                             hidden md:flex items-center justify-center gap-4"
                >
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
                    >
                      Live
                    </a>
                  )}

                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-800 transition"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-bold mb-2">{p.title}</h3>

              {p.description && (
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  {p.description}
                </p>
              )}

              {/* Mobile Buttons */}
              <div className="flex gap-3 mb-3 md:hidden">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 bg-blue-500 rounded-md"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}

                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 bg-gray-700 rounded-md"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto pt-3">
                {p.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1 rounded-md border border-white/20 font-medium text-white 
                                ${techColors[i % techColors.length]}`}
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
