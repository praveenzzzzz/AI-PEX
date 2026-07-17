import { useState } from "react";
import api from "../services/api";
import ChatMessage from "./ChatMessage";

type Props = {
  report: any;
};

type Message = {
  role: "user" | "assistant";
  message: string;
};

function AIChat({ report }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      message:
        "Hello! I'm AI-PEX.\n\nAsk me anything about your uploaded performance report.",
    },
  ]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        question: userQuestion,
        report,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: res.data.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "Unable to contact the AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: 40,
        background: "#0f172a",
        borderRadius: 16,
        padding: 24,
        color: "white",
      }}
    >
      <h2>🤖 AI Performance Assistant</h2>

      <div
        style={{
          marginTop: 20,
          maxHeight: 500,
          overflowY: "auto",
          paddingRight: 8,
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            message={msg.message}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 20,
        }}
      >
        <input
          type="text"
          value={question}
          placeholder="Ask about the uploaded report..."
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askAI();
            }
          }}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 10,
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            outline: "none",
          }}
        />

        <button
          onClick={askAI}
          disabled={loading}
          style={{
            padding: "14px 22px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>
    </div>
  );
}

export default AIChat;