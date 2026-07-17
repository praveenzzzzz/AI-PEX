type Props = {
  insights: {
    slowest_transaction: {
      name: string;
      average_response_time: string;
    };

    fastest_transaction: {
      name: string;
      average_response_time: string;
    };

    highest_p90_transaction: {
      name: string;
      p90: string;
    };
  };
};

function InsightCard({
  title,
  name,
  value,
}: {
  title: string;
  name: string;
  value: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "220px",
        backgroundColor: "#1e293b",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
      }}
    >
      <h3 style={{ color: "#94a3b8" }}>{title}</h3>

      <h2 style={{ color: "white" }}>{name}</h2>

      <p style={{ color: "#cbd5e1" }}>{value}</p>
    </div>
  );
}

function InsightsPanel({ insights }: Props) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ color: "white" }}>
        📈 Performance Insights
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <InsightCard
          title="🐢 Slowest Transaction"
          name={insights.slowest_transaction.name}
          value={`Average Response: ${insights.slowest_transaction.average_response_time} sec`}
        />

        <InsightCard
          title="⚡ Fastest Transaction"
          name={insights.fastest_transaction.name}
          value={`Average Response: ${insights.fastest_transaction.average_response_time} sec`}
        />

        <InsightCard
          title="📊 Highest P90"
          name={insights.highest_p90_transaction.name}
          value={`P90: ${insights.highest_p90_transaction.p90} sec`}
        />
      </div>
    </div>
  );
}

export default InsightsPanel;