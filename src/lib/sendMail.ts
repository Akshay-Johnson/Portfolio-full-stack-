import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    // Mail to you
    const adminMail = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_TO!,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Admin mail:", adminMail);

    // Auto reply
    const userMail = await resend.emails.send({
      from: "Akshay Johnson <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me",
      html: `<p>Hi ${name}, I received your message and will reply soon.</p>`,
    });

    console.log("User mail:", userMail);
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
}
