export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen relative flex items-center justify-center text-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url("p.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <i className="fa-solid fa-code absolute left-10 bottom-20 text-4xl opacity-70 animate-float"></i>
      <i className="fa-solid fa-laptop-code absolute right-10 top-20 text-4xl opacity-70 animate-float"></i>

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
