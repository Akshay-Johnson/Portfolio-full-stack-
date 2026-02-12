"use client";

import { useEffect, useState } from "react";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function fetchMessages() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function deleteMessage(id: string) {
    await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    fetchMessages();
  }

  return (
    <div>
      <h1 className="text-3xl mb-6">Messages Inbox</h1>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="border p-4 rounded bg-black/30"
            >
              <p><b>Name:</b> {msg.name}</p>
              <p><b>Email:</b> {msg.email}</p>
              <p><b>Phone:</b> {msg.phone}</p>
              <p><b>Message:</b> {msg.message}</p>

              <button
                onClick={() => deleteMessage(msg._id)}
                className="bg-red-500 px-3 py-1 mt-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
