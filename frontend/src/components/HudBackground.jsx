export default function HudBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hud-grid" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0c0c0c] to-[#141010]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.07)_0%,transparent_55%)]" />
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px bg-red-500/5"
          style={{ top: `${8 + i * 7.5}%` }}
        />
      ))}
      <div className="absolute left-0 top-0 h-full w-px bg-red-500/10" style={{ left: "12%" }} />
      <div className="absolute right-0 top-0 h-full w-px bg-red-500/10" style={{ right: "18%" }} />
    </div>
  );
}
