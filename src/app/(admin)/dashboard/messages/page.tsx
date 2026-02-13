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
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function openMessage(msg: Message) {
    setSelectedMessage(msg);

    if (!msg.isRead) {
      try {
        await fetch(`/api/messages/${msg._id}`, { method: "PATCH" });

        // Update UI
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m)),
        );

        // Update modal state
        setSelectedMessage({ ...msg, isRead: true });
      } catch {
        console.error("Failed to mark as read");
      }
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;

    await fetch(`/api/messages/${id}`, { method: "DELETE" });

    setMessages((prev) => prev.filter((msg) => msg._id !== id));
    setSelectedMessage(null);
  }

  if (loading) {
    return <p className="text-center mt-20">Loading messages...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <MessageCard key={msg._id} message={msg} onOpen={openMessage} />
        ))}
      </div>

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={deleteMessage}
        />
      )}
    </div>
  );
}

function MessageCard({
  message,
  onOpen,
}: {
  message: Message;
  onOpen: (msg: Message) => void;
}) {
  return (
    <div
      onClick={() => onOpen(message)}
      className="cursor-pointer p-5 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition"
    >
      <p className="font-semibold">{message.name}</p>
      <p className="text-sm opacity-70">{message.email}</p>

      <p className="text-sm mt-2 line-clamp-3">{message.message}</p>

      {!message.isRead && (
        <span className="text-xs bg-blue-500 px-2 py-1 rounded mt-2 inline-block">
          New
        </span>
      )}
    </div>
  );
}

function MessageModal({
  message,
  onClose,
  onDelete,
}: {
  message: Message;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border border-white/10 rounded-2xl p-6 max-w-lg w-full backdrop-blur-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Message Details</h2>

        <div className="space-y-2">
          <p>
            <b>Name:</b> {message.name}
          </p>
          <p>
            <b>Email:</b> {message.email}
          </p>
          <p>
            <b>Phone:</b> {message.phone}
          </p>

          <p className="mt-3 whitespace-pre-wrap">{message.message}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => onDelete(message._id)}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
