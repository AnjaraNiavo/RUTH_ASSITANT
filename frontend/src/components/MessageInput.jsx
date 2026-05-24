import { useState } from "react";

export default function MessageInput({
  onSend,
  loading,
  logs,
  connected,
}) {
  const [input, setInput] = useState("");

  const submit = () => {
    const q = input.trim();
    if (!q || loading || !connected) return;
    onSend(q);
    setInput("");
  };

  return (
    <div className="absolute bottom-4 right-4 z-40 flex w-[min(400px,38vw)] flex-col items-end">
      {logs.length > 0 && (
        <div className="custom-scrollbar glass-panel mb-2 max-h-36 w-full space-y-2 overflow-y-auto rounded-sm px-4 py-3">
          {logs.slice(0, 6).map((entry) => (
            <div
              key={entry.id}
              className="border-l border-red-500/40 pl-2 font-mono text-[11px]"
            >
              <p className="text-red-400/60">&gt; {entry.query}</p>
              <p
                className={
                  entry.pending
                    ? "text-orange-300/60 animate-pulse"
                    : "text-white/90"
                }
              >
                {entry.pending ? "…" : entry.response}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="glass-panel w-full rounded-sm px-4 py-3">
        <div
          className={`mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider ${
            connected ? "text-red-400/90" : "text-red-600/80"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              connected
                ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
                : "bg-red-900"
            }`}
          />
          {connected ? "Agent connected" : "offline — python server.py"}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message to RUTH..."
            disabled={!connected || loading}
            className="flex-1 border border-red-500/30 bg-black/60 px-4 py-2.5 font-mono text-sm text-red-50 placeholder:text-red-500/35 outline-none transition focus:border-red-400/70 focus:shadow-[0_0_12px_rgba(239,68,68,0.2)] disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={!connected || loading}
            className="shrink-0 border border-red-500/50 bg-red-500/10 px-4 py-2.5 font-hud text-[10px] uppercase tracking-[0.15em] text-red-200 transition hover:bg-red-500/20 hover:shadow-[0_0_14px_rgba(239,68,68,0.3)] disabled:opacity-40"
          >
            {loading ? "…" : "SEND"}
          </button>
        </form>
      </div>
    </div>
  );
}
