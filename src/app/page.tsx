import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";

export default function Home() {
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
