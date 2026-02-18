"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Code } from "lucide-react";

interface AboutData {
  name: string;
  bio: string;
  extraBio?: string;
  location: string;
  email: string;
  skills?: string[];
  profileImage: string;
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const data = await res.json();
        setAbout(data);
      } catch (error) {
        console.error("Failed to load about data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p className="text-white/60 animate-pulse">Loading...</p>
      </section>
    );
  }

  if (!about) return null;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 md:px-8 py-20 md:py-28 text-white overflow-hidden"
    >
      {/* Background Glow (Reduced on Mobile) */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] blur-[100px]  rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] blur-[100px] bg-emerald-500/10 rounded-full"></div>
      </div>

      <div className="max-w-6xl w-full">
        {/* Title */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide relative inline-block">
            About Me
            <span className="block h-1 w-14 md:w-16 bg-white mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] items-center">
          {/* TEXT CARD */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl transition duration-300 hover:-translate-y-1">
            <p className="text-base md:text-lg leading-relaxed text-white/90 mb-6">
              Hello! I'm{" "}
              <span className="font-semibold text-white">{about.name}</span>,{" "}
              {about.bio}
            </p>

            {about.extraBio && (
              <p className="text-base md:text-lg leading-relaxed text-white/80 mb-6">
                {about.extraBio}
              </p>
            )}

            <div className="space-y-4 text-sm md:text-base text-white/85">
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>{about.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>{about.email}</span>
              </div>

              {about.skills && (
                <div className="flex items-start gap-3">
                  <Code size={18} className="mt-1" />
                  <span className="leading-relaxed">
                    {about.skills.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="relative w-60 h-72 md:w-80 md:h-96">
              <Image
                src={about.profileImage}
                alt="Profile Image"
                fill
                sizes="(max-width: 768px) 240px, 320px"
                className="object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
