import { useState } from "react";

export default function CommandOverlay({
  open,
  onClose,
  onSend,
  loading,
  logs,
  connected,
}) {
  const [input, setInput] = useState("");

  if (!open) return null;

  const submit = () => {
    const q = input.trim();
    if (!q || loading) return;
    onSend(q);
    setInput("");
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 pb-28 backdrop-blur-sm">
      <div className="glass-panel mx-4 w-full max-w-lg rounded-sm p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-hud text-[10px] uppercase tracking-[0.3em] text-cyan-400">
            Terminal JARVIS
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs text-cyan-400/60 hover:text-cyan-300"
          >
            ✕ FERMER
          </button>
        </div>

        <div
          className={`mb-2 flex items-center gap-2 font-mono text-[9px] ${
            connected ? "text-emerald-400/80" : "text-red-400/80"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-red-500"}`}
          />
          {connected ? "Connecté à l'API" : "Serveur hors ligne — python server.py"}
        </div>

        <div className="custom-scrollbar mb-3 max-h-28 space-y-2 overflow-y-auto font-mono text-[11px]">
          {logs.slice(0, 5).map((e) => (
            <div key={e.id} className="border-l border-cyan-500/30 pl-2">
              <p className="text-cyan-500/50">&gt; {e.query}</p>
              <p className="text-white/80">{e.response}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex gap-2"
        >
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Parlez à JARVIS…"
            disabled={!connected || loading}
            className="flex-1 border border-cyan-500/30 bg-black/60 px-3 py-2 font-mono text-sm text-cyan-100 outline-none focus:border-cyan-400/60"
          />
          <button
            type="submit"
            disabled={!connected || loading}
            className="border border-cyan-500/50 px-4 font-hud text-[9px] uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/10 disabled:opacity-40"
          >
            {loading ? "…" : "OK"}
          </button>
        </form>
      </div>
    </div>
  );
}
