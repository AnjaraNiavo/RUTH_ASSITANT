import { useState } from "react";

const QUICK_COMMANDS = [
  "hello",
  "system condition",
  "schedule",
  "volume up",
  "open calculator",
];

export default function CommandPanel({
  onSend,
  loading,
  logs,
  connected,
}) {
  const [input, setInput] = useState("");

  const submit = (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    onSend(q);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
        <span
          className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-400 shadow-glow" : "bg-red-500 shadow-glow-red"}`}
        />
        <span className={connected ? "text-emerald-400/90" : "text-red-400/90"}>
          {connected ? "API connectée" : "API hors ligne — lancez python server.py"}
        </span>
      </div>

      <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto font-mono text-xs leading-relaxed text-jarvis-teal/80">
        {logs.length === 0 && (
          <p className="text-jarvis-teal/40">
            Entrez une commande (ex. hello, schedule, system condition)…
          </p>
        )}
        {logs.map((entry) => (
          <div key={entry.id} className="border-l border-jarvis-teal/20 pl-2">
            <p className="text-jarvis-cyan/50">&gt; {entry.query}</p>
            <p className="text-slate-200/90">{entry.response}</p>
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
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Commande JARVIS…"
          disabled={loading || !connected}
          className="flex-1 rounded border border-jarvis-teal/30 bg-black/80 px-3 py-2 font-mono text-sm text-jarvis-teal placeholder:text-jarvis-teal/30 outline-none focus:border-jarvis-teal/60 focus:shadow-glow disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={loading || !connected}
          className="rounded border border-jarvis-teal/50 bg-jarvis-teal/10 px-4 py-2 font-hud text-[10px] uppercase tracking-wider text-jarvis-teal transition hover:bg-jarvis-teal/20 disabled:opacity-40"
        >
          {loading ? "…" : "Envoyer"}
        </button>
      </form>

      <div className="flex flex-wrap gap-1.5">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => submit(cmd)}
            disabled={loading || !connected}
            className="rounded border border-jarvis-teal/20 px-2 py-1 font-mono text-[10px] text-jarvis-teal/70 hover:border-jarvis-teal/50 hover:text-jarvis-teal disabled:opacity-40"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
