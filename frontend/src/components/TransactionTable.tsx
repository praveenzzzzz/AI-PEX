type Transaction = {
  name: string;
  minimum: string;
  average: string;
  maximum: string;
  percentile_90: string;
  passed: string;
  failed: string;
};

type Props = {
  transactions: Transaction[];
};

function TransactionTable({
  transactions,
}: Props) {
  return (
    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        📋 Transaction Performance
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#334155",
            }}
          >
            <th style={th}>Transaction</th>
            <th style={th}>Avg</th>
            <th style={th}>Max</th>
            <th style={th}>P90</th>
            <th style={th}>Passed</th>
            <th style={th}>Failed</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, index) => (
            <tr key={index}>
              <td style={td}>{t.name}</td>
              <td style={td}>{t.average}</td>
              <td style={td}>{t.maximum}</td>
              <td style={td}>{t.percentile_90}</td>
              <td style={td}>{t.passed}</td>
              <td
                style={{
                  ...td,
                  color:
                    Number(t.failed) > 0
                      ? "#ef4444"
                      : "#22c55e",
                }}
              >
                {t.failed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #475569",
};

const td: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #334155",
};

export default TransactionTable;