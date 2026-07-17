import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

type BrowserStatistics = {
  [browser: string]: {
    total: number;
    passed: number;
    failed: number;
  };
};

type SlowTest = {
  test: string;
  browser: string;
  duration_ms: number;
};

type Props = {
  summary: {
    passed: number;
    failed: number;
  };

  browserStatistics: BrowserStatistics;

  slowestTests: SlowTest[];
};

const COLORS = ["#22c55e", "#ef4444"];

function PlaywrightCharts({
  summary,
  browserStatistics,
  slowestTests,
}: Props) {
  const pieData = [
    {
      name: "Passed",
      value: summary.passed,
    },
    {
      name: "Failed",
      value: summary.failed,
    },
  ];

  const browserData = Object.entries(browserStatistics).map(
    ([browser, stats]) => ({
      browser,
      Passed: stats.passed,
      Failed: stats.failed,
    })
  );

  const slowData = slowestTests
    .slice(0, 10)
    .map((test) => ({
      name: test.test,
      duration: test.duration_ms,
    }));

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginTop: 30,
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h2 style={{ color: "white" }}>
            🥧 Pass vs Fail
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h2 style={{ color: "white" }}>
            🌐 Browser Comparison
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={browserData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="browser" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="Passed" fill="#22c55e" />

              <Bar dataKey="Failed" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <BarChart
            layout="vertical"
            data={slowData}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="name"
              width={180}
            />

            <Tooltip />

            <Bar
              dataKey="duration"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default PlaywrightCharts;