import React from "react";
import PlaywrightCharts from "./PlaywrightCharts";
type BrowserStatistics = {
  [browser: string]: {
    total: number;
    passed: number;
    failed: number;
  };
};

type FailedTest = {
  test: string;
  browser: string;
  duration_ms: number;
};

type SlowTest = {
  test: string;
  browser: string;
  duration_ms: number;
};

type Props = {
  data: {
    summary: {
      total_tests: number;
      passed: number;
      failed: number;
      skipped: number;
      success_rate: number;
    };

    browser_statistics: BrowserStatistics;

    failed_tests: FailedTest[];

    slowest_tests: SlowTest[];
  };
};

function cardStyle(color: string): React.CSSProperties {
  return {
    flex: 1,
    minWidth: 180,
    background: "#1e293b",
    borderLeft: `5px solid ${color}`,
    borderRadius: 12,
    padding: 20,
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,.25)",
  };
}

function PlaywrightDashboard({ data }: Props) {
  return (
    <div style={{ marginTop: 30 }}>

      <h2 style={{ color: "white" }}>
        🎭 Playwright Dashboard
      </h2>

      {/* KPI Cards */}

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <div style={cardStyle("#3b82f6")}>
          <h3>Total Tests</h3>
          <h1>{data.summary.total_tests}</h1>
        </div>

        <div style={cardStyle("#22c55e")}>
          <h3>Passed</h3>
          <h1>{data.summary.passed}</h1>
        </div>

        <div style={cardStyle("#ef4444")}>
          <h3>Failed</h3>
          <h1>{data.summary.failed}</h1>
        </div>

        <div style={cardStyle("#eab308")}>
          <h3>Success Rate</h3>
          <h1>{data.summary.success_rate}%</h1>
        </div>
      </div>

      {/* Browser Statistics */}

      <div
        style={{
          marginTop: 30,
          background: "#1e293b",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <h2 style={{ color: "white" }}>
          🌐 Browser Statistics
        </h2>

        <table
          style={{
            width: "100%",
            marginTop: 20,
            color: "white",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Browser</th>
              <th style={th}>Total</th>
              <th style={th}>Passed</th>
              <th style={th}>Failed</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(data.browser_statistics).map(
              ([browser, stats]) => (
                <tr key={browser}>
                  <td style={td}>{browser}</td>
                  <td style={td}>{stats.total}</td>
                  <td style={td}>{stats.passed}</td>
                  <td
                    style={{
                      ...td,
                      color:
                        stats.failed > 0
                          ? "#ef4444"
                          : "#22c55e",
                    }}
                  >
                    {stats.failed}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Failed Tests */}

      <div
        style={{
          marginTop: 30,
          background: "#1e293b",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <h2 style={{ color: "white" }}>
          ❌ Failed Tests
        </h2>

        {data.failed_tests.length === 0 ? (
          <p style={{ color: "#22c55e" }}>
            No failed tests 🎉
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              color: "white",
              marginTop: 20,
            }}
          >
            <thead>
              <tr>
                <th style={th}>Test</th>
                <th style={th}>Browser</th>
                <th style={th}>Duration (ms)</th>
              </tr>
            </thead>

            <tbody>
              {data.failed_tests.map((t, i) => (
                <tr key={i}>
                  <td style={td}>{t.test}</td>
                  <td style={td}>{t.browser}</td>
                  <td style={td}>{t.duration_ms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slowest Tests */}

      <div
        style={{
          marginTop: 30,
          background: "#1e293b",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <h2 style={{ color: "white" }}>
          🐢 Slowest Tests
        </h2>

        <table
          style={{
            width: "100%",
            color: "white",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th style={th}>Test</th>
              <th style={th}>Browser</th>
              <th style={th}>Duration (ms)</th>
            </tr>
          </thead>

          <tbody>
            {data.slowest_tests.map((t, i) => (
              <tr key={i}>
                <td style={td}>{t.test}</td>
                <td style={td}>{t.browser}</td>
                <td style={td}>{t.duration_ms}</td>
              </tr>
            ))}
          </tbody>
        </table>
           </div>

      <PlaywrightCharts
        summary={data.summary}
        browserStatistics={data.browser_statistics}
        slowestTests={data.slowest_tests}
      />

    </div>
  );
}

const th: React.CSSProperties = {
  padding: 12,
  textAlign: "left",
  borderBottom: "1px solid #475569",
};

const td: React.CSSProperties = {
  padding: 12,
  borderBottom: "1px solid #334155",
};

export default PlaywrightDashboard;