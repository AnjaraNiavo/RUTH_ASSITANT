const ICONS = [
  { id: "hello", label: "Chat", icon: "◉" },
  { id: "system condition", label: "Sys", icon: "◎" },
  { id: "schedule", label: "Plan", icon: "▣" },
  { id: "volume up", label: "Vol+", icon: "♪" },
  { id: "open calculator", label: "Calc", icon: "∑" },
  { id: "open google", label: "Web", icon: "⬡" },
];

export default function IconGrid({ onCommand, disabled }) {
  return (
    <div className="flex gap-2">
      {ICONS.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={disabled}
          onClick={() => onCommand(item.id)}
          title={item.label}
          className="flex h-9 w-9 flex-col items-center justify-center rounded border border-cyan-500/25 bg-slate-900/60 font-mono text-sm text-cyan-300/90 transition hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.35)] disabled:opacity-30"
        >
          <span className="text-base leading-none">{item.icon}</span>
        </button>
      ))}
    </div>
  );
}
