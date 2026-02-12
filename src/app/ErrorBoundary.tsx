import React from "react";
import { supportCodeForError, supportInfoText } from "../shared/lib/apiError";

type ErrorBoundaryState = {
  hasError: boolean;
  supportInfo: string;
  supportCode?: string;
};

const INITIAL_STATE: ErrorBoundaryState = {
  hasError: false,
  supportInfo: "",
};

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = INITIAL_STATE;

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
      supportInfo: "",
    };
  }

  componentDidCatch(error: Error): void {
    const code = supportCodeForError(error);
    const info = supportInfoText(error);

    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] uncaught application error", {
      message: error.message,
      request_id: code,
      route: `${window.location.pathname}${window.location.search}`,
      ts: new Date().toISOString(),
    });

    this.setState({
      hasError: true,
      supportCode: code,
      supportInfo: info,
    });
  }

  async copySupportInfo(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.state.supportInfo);
    } catch {
      // Clipboard access can fail in restricted contexts.
    }
  }

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-[#260101] text-[#DCDEF2] flex items-center justify-center p-8">
        <section className="w-full max-w-2xl bg-[#1d0000] border border-[#8C5A67] rounded-xl p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Unerwarteter Fehler</h1>
          <p className="text-sm text-[#DCDEF2]/90">
            Die Anwendung ist in einen unerwarteten Zustand geraten. Bitte lade die Seite neu.
            Wenn der Fehler bestehen bleibt, gib den Support-Code weiter.
          </p>

          <div className="text-sm bg-[#120000] border border-[#8C5A67]/60 rounded p-3">
            <p>
              <span className="font-medium">Support-Code:</span>{" "}
              {this.state.supportCode || "n/a"}
            </p>
            <p>
              <span className="font-medium">Route:</span>{" "}
              {window.location.pathname}
              {window.location.search}
            </p>
            <p>
              <span className="font-medium">Zeitpunkt:</span>{" "}
              {new Date().toISOString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                void this.copySupportInfo();
              }}
              className="px-4 py-2 rounded bg-[#8C5A67] hover:bg-[#A67C7C] text-white text-sm"
            >
              Support-Info kopieren
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded border border-[#A67C7C] text-sm hover:bg-[#1d0000]"
            >
              Seite neu laden
            </button>
          </div>
        </section>
      </div>
    );
  }
}
