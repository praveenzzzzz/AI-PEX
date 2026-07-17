type Props = {
  role: "user" | "assistant";
  message: string;
};

function ChatMessage({ role, message }: Props) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "14px 18px",
          borderRadius: 14,
          background: isUser ? "#2563eb" : "#1e293b",
          color: "white",
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
        }}
      >
        <strong>
          {isUser ? "🧑 You" : "🤖 AI-PEX"}
        </strong>

        <div style={{ marginTop: 8 }}>
          {message}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;