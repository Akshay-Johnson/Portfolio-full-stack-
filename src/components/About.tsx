"use client";

import { useEffect, useState } from "react";
import { MapPin, Mail, Code } from "lucide-react";

export default function About() {
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then(setAbout);
  }, []);

  if (!about) return null;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-28 px-6 text-white overflow-hidden"
    >
      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px]  blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full"></div>
      </div>

      <div className="max-w-6xl w-full">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide relative inline-block">
            About Me
            <span className="block h-1 w-16  mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-16 items-center">
          {/* LEFT - TEXT */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl transition duration-500 hover:-translate-y-2 hover:shadow-green-500/20">
            <p className="text-lg leading-relaxed text-white/90 mb-6">
              Hello! I'm{" "}
              <span className="font-semibold text-white relative">
                {about.name}
                <span className="absolute left-0 -bottom-1 w-full h-[2px]"></span>
              </span>
              , {about.bio}
            </p>

            {about.extraBio && (
              <p className="text-lg leading-relaxed text-white/80 mb-6">
                {about.extraBio}
              </p>
            )}

            <div className="space-y-3 text-white/85 text-base">
              <p>
                <strong className="text-white"> <MapPin size={16} className="inline mr-2" /> </strong>{" "}
                {about.location}
              </p>

              <p>
                <strong className="text-white"></strong> <Mail size={16} className="inline mr-2" /> {about.email}
              </p>

              <p>
                <strong className="text-white"></strong>{" "}
                {about.skills?.join(", ")}
              </p>
            </div>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="flex justify-center relative group">
            {/* Decorative Border Glow */}
            <div
              className="flex-1 flex justify-center relative"
              data-aos="fade-left"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              <div className="relative">
                <img
                  src={about.profileImage}
                  alt="Profile"
                  className="w-72 md:w-80 rounded-3xl object-cover shadow-2xl transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
