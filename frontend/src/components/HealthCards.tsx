type Props = {
  healthScore: number;
  grade: string;
  risk: string;
  processingTime: number;
};

type CardProps = {
  title: string;
  value: string | number;
};

function Card({ title, value }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "180px",
        flex: 1,
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
      }}
    >
      <h3
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "white",
          margin: 0,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function HealthCards({
  healthScore,
  grade,
  risk,
  processingTime,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "30px",
      }}
    >
      <Card title="Health Score" value={healthScore} />

      <Card title="Grade" value={grade} />

      <Card title="Risk Level" value={risk} />

      <Card
        title="Processing Time"
        value={`${processingTime} ms`}
      />
    </div>
  );
}

export default HealthCards;