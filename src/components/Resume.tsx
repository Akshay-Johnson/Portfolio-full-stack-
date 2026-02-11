import { Download } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-20 backdrop-blur-2xl bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Resume
        </h1>

        <div className="mb-10">
          <a
            href="https://drive.google.com/file/d/1SfP6TeNOJfYEgv33gNFHdhWGK4P18mfq/view?usp=drive_link"
            target="_blank"
            className="inline-flex items-center gap-2 bg-black px-6 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition duration-300 group"
          >
            <Download className="w-5 h-5" />
            <span className="opacity-0 w-0 overflow-hidden whitespace-nowrap group-hover:opacity-100 group-hover:w-auto transition-all">
              Download Now
            </span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold">Akshay P Johnson</h4>
              <p>
                <strong>Role:</strong> Full Stack Developer (Fresher)
              </p>
              <p>
                <strong>Phone:</strong> +91 8137913653
              </p>
              <p>
                <strong>Email:</strong> akshayjohnson117@gmail.com
              </p>
              <p>
                <strong>Location:</strong> Thrissur, Kerala, India
              </p>
              <p>
                <strong>GitHub:</strong> github.com/Akshay-Johnson |
                <strong>LinkedIn:</strong> linkedin.com/in/akshay-p-johnson
              </p>
            </div>

            <hr className="border-white/20" />

            <div>
              <h4 className="text-xl font-bold mb-2">Professional Summary</h4>
              <p className="text-white/90 leading-relaxed">
                Entry-Level Full Stack Developer with hands-on experience in
                MERN Stack and Django, focused on building secure, scalable web
                applications. Skilled in RESTful API development, JWT
                authentication, role-based dashboards, and database optimization
                using MongoDB and MySQL. Seeking a junior or trainee software
                development role in a growth-oriented tech environment.
              </p>
            </div>

            <hr className="border-white/20" />

            <div>
              <h4 className="text-xl font-bold mb-2">Experience</h4>

              <p className="font-semibold">
                MERN Full Stack Developer Intern — Zoople Technologies
              </p>
              <p className="italic text-white/70 mb-2">2025</p>

              <ul className="list-disc pl-6 space-y-1 text-white/90">
                <li>Developed full-stack food delivery platform using MERN.</li>
                <li>Built secure REST APIs with JWT & RBAC.</li>
                <li>Designed dashboards for multi-role users.</li>
                <li>Optimized MongoDB queries & API performance.</li>
                <li>Worked in Agile workflow using GitHub.</li>
              </ul>
            </div>

            <hr className="border-white/20" />

            <div>
              <h4 className="text-xl font-bold mb-2">Education</h4>

              <ul className="space-y-4 text-white/90">
                <li>
                  <strong>MCA</strong>
                  <br />
                  Vidya Academy of Science and Technology
                  <br />
                  APJ Abdul Kalam Technological University
                  <br />
                  <em>2025</em>
                </li>

                <li>
                  <strong>BCA</strong>
                  <br />
                  A.C. Kunhimon Haji Memorial ICA
                  <br />
                  Calicut University
                  <br />
                  <em>2023</em>
                </li>

                <li>
                  <strong>Higher Secondary Education</strong>
                  <br />
                  Bethany St. Johns
                  <br />
                  <em>2020</em>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold mb-2">Technical Skills</h4>
              <ul className="list-disc pl-6 space-y-1 text-white/90">
                <li>
                  <strong>Languages:</strong> JavaScript, Python
                </li>
                <li>
                  <strong>Frontend:</strong> React, Next.js, Tailwind CSS
                </li>
                <li>
                  <strong>Backend:</strong> Node.js, Express, Django, PHP
                </li>
                <li>
                  <strong>Databases:</strong> MongoDB, MySQL
                </li>
                <li>
                  <strong>Security:</strong> REST APIs, JWT, RBAC
                </li>
                <li>
                  <strong>Tools:</strong> Git, GitHub, VS Code, Vercel
                </li>
              </ul>
            </div>

            <hr className="border-white/20" />

            <div>
              <h4 className="text-xl font-bold mb-2">Projects</h4>

              <ul className="space-y-4 text-white/90">
                <li>
                  <strong>DineX — MERN</strong>
                  <br />
                  Multi-role food delivery platform with dashboards & order
                  tracking.
                </li>

                <li>
                  <strong>JobPilot — Next.js</strong>
                  <br />
                  Kanban job tracking platform with drag-drop workflows.
                </li>

                <li>
                  <strong>TestSphere — Django</strong>
                  <br />
                  Secure online exam system with automated evaluation.
                </li>

                <li>
                  <strong>MindSense — ML + Django</strong>
                  <br />
                  NLP system detecting stress from Twitter data.
                </li>
              </ul>
            </div>

            <hr className="border-white/20" />

            <div>
              <h4 className="text-xl font-bold mb-2">Certifications</h4>

              <ul className="list-disc pl-6 space-y-1 text-white/90">
                <li>Python Web Development with Django</li>
                <li>NoSQL MongoDB — Infosys</li>
                <li>Agile Scrum Master — Infosys</li>
                <li>Git Programming — IIT Bombay</li>
                <li>Project Management — LinkedIn Learning</li>
                <li>Internet of Things — NPTEL</li>
              </ul>
            </div>

            <hr className="border-white/20" />

            <div>
              <h4 className="text-xl font-bold mb-2">Languages</h4>
              <ul className="list-disc pl-6 space-y-1 text-white/90">
                <li>English</li>
                <li>Malayalam</li>
                <li>Tamil</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
