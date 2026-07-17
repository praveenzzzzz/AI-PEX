import AIChat from "./AIChat";
import { useState } from "react";
import api from "../services/api";
import type { ApiResponse } from "../types/ApiResponse";

import HealthCards from "./HealthCards";
import RecommendationPanel from "./RecommendationPanel";
import RootCausePanel from "./RootCausePanel";
import InsightsPanel from "./InsightsPanel";
import TransactionTable from "./TransactionTable";
import PerformanceCharts from "./PerformanceCharts";
import PlaywrightDashboard from "./PlaywrightDashboard";

function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [reportType, setReportType] = useState("loadrunner");

  const handleUpload = async () => {
    if (!file) {
      alert(
        reportType === "loadrunner"
          ? "Please select a LoadRunner ZIP report."
          : "Please select Playwright report.json."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("report_type", reportType);

    try {
      setLoading(true);
      const res = await api.post<ApiResponse>("/upload", formData);
      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 30, padding: 20 }}>
      <h2>📂 AI-PEX Report Analyzer</h2>

      <div style={{ marginBottom: 20, display: "flex", gap: 30 }}>
        <label>
          <input
            type="radio"
            value="loadrunner"
            checked={reportType === "loadrunner"}
            onChange={(e) => setReportType(e.target.value)}
          />
          {" "}LoadRunner
        </label>

        <label>
          <input
            type="radio"
            value="playwright"
            checked={reportType === "playwright"}
            onChange={(e) => setReportType(e.target.value)}
          />
          {" "}Playwright
        </label>
      </div>

      <input
        type="file"
        accept={reportType === "loadrunner" ? ".zip" : ".json"}
        onChange={(e) => {
          if (e.target.files?.length) setFile(e.target.files[0]);
        }}
      />

      <br />
      <br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Report"}
      </button>

      {response &&
        reportType === "loadrunner" &&
        response.report && (
          <>
            <HealthCards
              healthScore={response.health.health_score}
              grade={response.health.grade}
              risk={response.health.risk_level}
              processingTime={response.processing_time_ms}
            />
            <RecommendationPanel
              overallStatus={response.recommendations.overall_status}
              recommendations={response.recommendations.recommendations}
            />
            <RootCausePanel rootCauses={response.root_causes} />
            <InsightsPanel insights={response.insights} />
            <TransactionTable transactions={response.report.transactions} />
            <PerformanceCharts graphs={response.report.graphs} />
            <AIChat report={response} />
          </>
        )}

   {response &&
  reportType === "playwright" && (
    <>
      <PlaywrightDashboard data={response} />
      <AIChat report={response} />
    </>
)}
    </div>
  );
}

export default UploadPanel;