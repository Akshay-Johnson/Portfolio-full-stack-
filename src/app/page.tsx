"use client";

import Loader from "@/components/loaderCamp";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 0));

      const dataFetch = Promise.all([
        fetch("/api/about"),
        fetch("/api/projects"),
        fetch("/api/resume"),
      ]);
      await Promise.all([minDelay, dataFetch]);
      setLoading(false);
      setTimeout(() => setShowContent(true), 1000);
    };
    loadPage();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen overflow-hidden flex items-center justify-center py-20 text-center backdrop-blur-2xl bg-black/20">
        <Loader />
      </section>
    );
  }

  return (
    <div className="relative min-h-screen ">
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          showContent ? "opacity-100" : "opacity-75"
        }`}
      >
        <Hero />

        <section className="glass-section-wrapper">
          <div className="glass-section">
            <About />
          </div>
        </section>

        <section className="glass-section-wrapper">
          <div className="glass-section">
            <Resume />
          </div>
        </section>

        <section className="glass-section-wrapper">
          <div className="glass-section">
            <Portfolio />
          </div>
        </section>

        <section className="glass-section-wrapper">
          <div className="glass-section">
            <Contact />
          </div>
        </section>
      </div>
      <ScrollToTop />
    </div>
  );
}
