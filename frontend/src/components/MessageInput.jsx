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
    <div className="absolute bottom-4 left-1/2 z-40 w-[min(640px,92vw)] -translate-x-1/2">
      {/* Historique des messages */}
      {logs.length > 0 && (
        <div className="custom-scrollbar glass-panel mb-2 max-h-32 space-y-2 overflow-y-auto rounded-sm px-4 py-3">
          {logs.slice(0, 6).map((entry) => (
            <div key={entry.id} className="border-l border-cyan-500/30 pl-2 font-mono text-[11px]">
              <p className="text-cyan-500/60">&gt; {entry.query}</p>
              <p className="text-white/85">{entry.response}</p>
            </div>
          ))}
        </div>
      )}

      <div className="glass-panel rounded-sm px-4 py-3">
        <div
          className={`mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider ${
            connected ? "text-emerald-400/80" : "text-red-400/80"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-red-500"}`}
          />
          {connected ? "Agent connecté · réponse vocale active" : "Hors ligne — lancez python server.py"}
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
            placeholder="Envoyer un message à JARVIS…"
            disabled={!connected || loading}
            className="flex-1 border border-cyan-500/30 bg-black/50 px-4 py-2.5 font-mono text-sm text-cyan-50 placeholder:text-cyan-500/35 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_12px_rgba(34,211,238,0.2)] disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={!connected || loading}
            className="shrink-0 border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 font-hud text-[10px] uppercase tracking-[0.2em] text-cyan-300 transition hover:bg-cyan-500/20 hover:shadow-[0_0_14px_rgba(34,211,238,0.25)] disabled:opacity-40"
          >
            {loading ? "…" : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
}
