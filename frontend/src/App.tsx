import UploadPanel from "./components/UploadPanel";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>🚀 AI-PEX</h1>

      <p>AI Performance Engineering eXpert</p>

      <hr />

      <UploadPanel />
    </div>
  );
}

export default App;