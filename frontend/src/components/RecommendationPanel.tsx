type Props = {
  overallStatus: string;
  recommendations: string[];
};

function RecommendationPanel({
  overallStatus,
  recommendations,
}: Props) {
  return (
    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        📋 AI Recommendations
      </h2>

      <p
        style={{
          color: "#cbd5e1",
        }}
      >
        <strong>Overall Status:</strong>{" "}
        {overallStatus}
      </p>

      <ul
        style={{
          marginTop: "20px",
          paddingLeft: "20px",
        }}
      >
        {recommendations.map((item, index) => (
          <li
            key={index}
            style={{
              color: "#e2e8f0",
              marginBottom: "12px",
              lineHeight: "1.6",
            }}
          >
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationPanel;