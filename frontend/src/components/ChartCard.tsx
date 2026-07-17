import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import type { Graph } from "../types/Graph";

type Props = {
  graph: Graph;
};

function ChartCard({ graph }: Props) {
  const data =
    graph.series.length > 0
      ? graph.series[0].points.map((point) => ({
          time: point.time,
          value: point.value,
        }))
      : [];

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h3
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        {graph.graph_name}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            label={{
              value: graph.x_axis,
              position: "insideBottom",
            }}
          />

          <YAxis
            label={{
              value: graph.y_axis,
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartCard;