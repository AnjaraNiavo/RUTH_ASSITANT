export default function InsetMapWidget({ children }) {
  return (
    <div className="glass-panel w-[min(380px,44vw)] overflow-hidden rounded-sm">
      <div className="border-b border-red-500/25 px-3 py-1.5">
        <p className="font-hud text-[8px] uppercase tracking-[0.3em] text-red-400/80">
          Global Network Status
        </p>
      </div>
      <div className="relative h-[175px] w-full bg-black/50">
        {children}
        <span className="absolute left-1 top-1 h-3 w-3 border-l border-t border-red-500/50" />
        <span className="absolute right-1 top-1 h-3 w-3 border-r border-t border-red-500/50" />
        <span className="absolute bottom-1 left-1 h-3 w-3 border-b border-l border-red-500/50" />
        <span className="absolute bottom-1 right-1 h-3 w-3 border-b border-r border-red-500/50" />
      </div>
    </div>
  );
}
