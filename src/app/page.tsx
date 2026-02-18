"use client";

import Loader from "@/components/loaderCamp";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
      const dataFetch = Promise.all([
        fetch("/api/about"),
        fetch("/api/projects"),
        fetch("/api/resume"),
      ]);
      await Promise.all([minDelay, dataFetch]);
      setLoading(false);
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
    <>
      <Hero />
      <About />
      <Resume />
      <Portfolio />
      <Contact />
    </>
  );
}
