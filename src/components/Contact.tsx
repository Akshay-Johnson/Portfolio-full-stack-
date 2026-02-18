import { sendMessage } from "@/actions/contact";
import Submit from "@/components/Submit";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="text-base md:text-lg text-white/80 mt-2">
            Let's connect!
          </p>
        </div>

        {/* Form */}
        <form
          action={sendMessage}
          className="bg-white/5 backdrop-blur-md border border-white/10 
                     p-6 md:p-8 rounded-2xl shadow-xl 
                     max-w-2xl mx-auto space-y-5"
        >
          {/* Name + Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm mb-1 text-white/80"
              >
                Name *
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="John Doe"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="phone"
                className="block text-sm mb-1 text-white/80"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 9876543210"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-white/80">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm mb-1 text-white/80"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Write your message..."
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <Submit />
          </div>
        </form>
      </div>
    </section>
  );
}
