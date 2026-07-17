type RootCause = {
  issue: string;
  transaction: string;
  reason: string;
};

type Props = {
  rootCauses: RootCause[];
};

function RootCausePanel({ rootCauses }: Props) {
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
        🔍 Root Cause Analysis
      </h2>

      {rootCauses.length === 0 ? (
        <p style={{ color: "#cbd5e1" }}>
          No root causes detected.
        </p>
      ) : (
        rootCauses.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#334155",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ margin: 0, color: "#f8fafc" }}>
              {item.issue}
            </h3>

            <p style={{ color: "#cbd5e1" }}>
              <strong>Transaction:</strong> {item.transaction}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              {item.reason}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RootCausePanel;