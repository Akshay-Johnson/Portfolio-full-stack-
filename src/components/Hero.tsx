"use client";

import { Github, Instagram, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen mb-2 relative flex items-center border border-2 border-gray-400 rounded-2xl justify-center text-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url("p.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm border border-2xl border-gray-400 rounded-2xl pointer-events-none"></div>

      {/* TOP RIGHT NAV */}
      <nav className="absolute top-8 right-10 z-30 hidden md:flex gap-8 text-sm tracking-widest uppercase text-white">
        <a href="#about" className="hover:text-gray-300 transition">
          About
        </a>
        <a href="#resume" className="hover:text-gray-300 transition">
          Resume
        </a>
        <a href="#projects" className="hover:text-gray-300 transition">
          Projects
        </a>
        <a href="#contact" className="hover:text-gray-300 transition">
          Contact
        </a>
      </nav>

      {/* LEFT BOTTOM SOCIAL */}
      <div className="absolute left-8 bottom-10 z-20 flex flex-col items-center gap-6 text-white">
        <a
          href="https://github.com/Akshay-Johnson"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <Github size={20} strokeWidth={1.5} />
        </a>

        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <Instagram size={20} strokeWidth={1.5} />
        </a>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=akshayjohnson117@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <Mail size={20} strokeWidth={1.5} />
        </a>
      </div>

      <div className="relative z-10 max-w-xl px-4" data-aos="zoom-in">
        <h1 className="text-6xl md:text-7xl font-bold tracking-widest">
          Hi, I'm Akshay
        </h1>

        <p className="mt-4 text-xl md:text-2xl overflow-hidden whitespace-nowrap border-r-4 border-white animate-typing animate-blink">
          Software Developer • Designer • Tech Enthusiast
        </p>

        <div className="flex justify-center gap-6 mt-8 text-3xl">
          <a
            href="https://github.com/Akshay-Johnson"
            target="_blank"
            className="hover:scale-125 transition"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/akshay-p-johnson"
            target="_blank"
            className="hover:scale-125 transition"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="mailto:akshayjohnson117@gmail.com"
            className="hover:scale-125 transition"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
