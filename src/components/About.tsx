export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-black/10 backdrop-blur-[60px] text-white py-20 px-6"
    >
      <div className="max-w-7xl w-full">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 drop-shadow-lg"
          data-aos="fade-down"
          data-aos-duration="1200"
        >
          About Me
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-16">
          <div
            className="flex-1 min-w-[280px] bg-black/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-3xl"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            <p className="text-lg leading-relaxed mb-4 text-white/95">
              Hello! I'm
              <b>
                <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing align-bottom">
                  Akshay
                </span>{" "}
              </b>
              , a technically proficient and highly motivated individual
              currently pursuing a Master’s degree in Computer Applications,
              with a strong interest in software development, network
              engineering, and data engineering.
            </p>

            <p className="text-lg leading-relaxed mb-6 text-white/90">
              I have a deep passion for continuous learning and thrive on
              understanding new technologies, programming concepts, and system
              design patterns. I am actively seeking opportunities to contribute
              to innovative projects and grow as a technology professional.
            </p>

            <div className="space-y-2 text-white/95">
              <p>
                <strong>Location:</strong> Thrissur
              </p>
              <p>
                <strong>Email:</strong> akshayjohnson117@gmail.com
              </p>
              <p>
                <strong>Skills:</strong>
                HTML, CSS, JavaScript, Bootstrap, MERN
              </p>
            </div>
          </div>

          <div
            className="flex-1 flex justify-center relative"
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <img
              src="p5.jpg"
              alt="Profile"
              className="w-72 md:w-80 max-w-full rounded-3xl object-cover shadow-2xl transition duration-500 hover:scale-110 hover:-rotate-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
