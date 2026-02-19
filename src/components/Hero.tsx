"use client";

import Image from "next/image";
import { Github, Instagram, Mail, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Optimized Background Image */}
      <Image
        src="/p.jpg"
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay (lighter, no heavy blur) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Top Navigation (Desktop Only) */}
      <nav className="absolute top-8 right-10 z-30 hidden md:flex gap-8 text-sm tracking-widest uppercase ">
        {["About", "Resume", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-gray-300 transition"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Social Icons (Hidden on small screens to reduce clutter) */}
      <div className="absolute left-6 bottom-8 z-20 hidden md:flex flex-col gap-6 animate-bounce">
        <a
          href="https://github.com/Akshay-Johnson"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <Github size={20} strokeWidth={1.5} />
        </a>

        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <Instagram size={20} strokeWidth={1.5} />
        </a>

        <a
          href="mailto:akshayjohnson117@gmail.com"
          className="hover:scale-110 transition"
        >
          <Mail size={20} strokeWidth={1.5} />
        </a>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide">
          Hi, I'm Akshay
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-2xl text-white/90 animate-pulse">
          Software Developer • Designer • Tech Enthusiast
        </p>

        {/* Mobile Social Icons */}
        <div className="flex justify-center gap-6 mt-8 md:hidden animate-bounce">
          <a
            href="https://github.com/Akshay-Johnson"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <Github size={22} />
          </a>

          <a
            href="https://linkedin.com/in/akshay-p-johnson"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <Linkedin size={22} />
          </a>

          <a
            href="mailto:akshayjohnson117@gmail.com"
            className="hover:scale-110 transition"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
