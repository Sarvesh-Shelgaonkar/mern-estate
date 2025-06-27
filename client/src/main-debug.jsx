import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App-debug.jsx";

console.log("🚀 Main.jsx loaded!");
console.log("🔍 Looking for root element...");

const rootElement = document.getElementById("root");
console.log("📍 Root element found:", rootElement);

if (rootElement) {
  console.log("✅ Creating React root...");
  const root = createRoot(rootElement);
  
  console.log("🎨 Rendering App...");
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("✅ App rendered successfully!");
} else {
  console.error("❌ Root element not found!");
}