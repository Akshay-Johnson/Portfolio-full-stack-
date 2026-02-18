"use server";

import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  // Basic validation
  if (!data.name || !data.email || !data.message) {
    throw new Error("Missing required fields");
  }

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  redirect("/?success=true");
}
