import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "./app/ErrorBoundary";
import { AppRouter } from "./app/router";
import { loadRuntimeConfig } from "./shared/lib/runtimeConfig";
import "./index.css";

async function bootstrap(): Promise<void> {
  await loadRuntimeConfig();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

void bootstrap();
