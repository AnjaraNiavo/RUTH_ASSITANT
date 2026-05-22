export default function HudBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hud-grid" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-[#0a1628]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08)_0%,transparent_55%)]" />
      {/* Lignes de données horizontales */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px bg-cyan-500/5"
          style={{ top: `${8 + i * 7.5}%` }}
        />
      ))}
      <div className="absolute left-0 top-0 h-full w-px bg-cyan-500/10" style={{ left: "12%" }} />
      <div className="absolute right-0 top-0 h-full w-px bg-cyan-500/10" style={{ right: "18%" }} />
    </div>
  );
}
