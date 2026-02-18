import { sendMessage } from "@/actions/contact";
import Submit from "@/components/Submit";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
          Get in Touch
        </h1>
        <p className="text-center text-lg mb-10 opacity-90">Let's connect!</p>

        <form
          action={sendMessage}
          className="p-8 rounded-lg shadow-lg max-w-2xl mx-auto space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="phone"
              placeholder="Phone"
              className="w-full p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            className="w-full p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-center">
            <Submit />
          </div>
        </form>
      </div>
    </section>
  );
}
