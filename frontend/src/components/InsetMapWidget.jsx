export default function InsetMapWidget({ children }) {
  return (
    <div className="glass-panel w-[min(340px,42vw)] overflow-hidden rounded-sm">
      <div className="border-b border-cyan-500/20 px-3 py-1.5">
        <p className="font-hud text-[8px] uppercase tracking-[0.3em] text-cyan-400/70">
          Global Network Status
        </p>
      </div>
      <div className="relative h-[150px] w-full bg-slate-950/40">
        {children}
        {/* Coins décoratifs */}
        <span className="absolute left-1 top-1 h-3 w-3 border-l border-t border-cyan-400/50" />
        <span className="absolute right-1 top-1 h-3 w-3 border-r border-t border-cyan-400/50" />
        <span className="absolute bottom-1 left-1 h-3 w-3 border-b border-l border-cyan-400/50" />
        <span className="absolute bottom-1 right-1 h-3 w-3 border-b border-r border-cyan-400/50" />
      </div>
    </div>
  );
}
