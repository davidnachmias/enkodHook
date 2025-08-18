import React from "react";
import GeneratorPage from "./pages/GeneratorPage";

export default function App() {
  console.log("App component rendering...");

  try {
    return <GeneratorPage />;
  } catch (error) {
    console.error("Error rendering App:", error);
    return (
      <div className="error-page">
        <h1>enKod Hook - Render Error</h1>
        <p>There was an error rendering the application:</p>
        <pre className="error-message">
          {error.message}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="error-reload-button"
        >
          Reload Page
        </button>
      </div>
    );
  }
}
