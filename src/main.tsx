import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.log("No html element with id #root found!");
  throw new Error("Root element not found!");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
