import ChartCard from "./ChartCard";
import type { Graph } from "../types/Graph";

type Props = {
  graphs: Graph[];
};

function PerformanceCharts({
  graphs,
}: Props) {
  if (!graphs || graphs.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "25px",
        }}
      >
        📈 Performance Charts
      </h2>

      {graphs.map((graph, index) => (
        <ChartCard
          key={index}
          graph={graph}
        />
      ))}
    </div>
  );
}

export default PerformanceCharts;