export default function BottomStatusBar({ cpu, battery, coords }) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-40 flex h-8 items-center justify-between border-t border-cyan-500/15 bg-slate-950/80 px-4 font-mono text-[9px] uppercase tracking-wider text-cyan-400/50">
      <div className="flex gap-6">
        <span>
          LAT {coords.lat.toFixed(1)} LNG {coords.lng.toFixed(3)}
        </span>
        <span>ALT 178.214</span>
      </div>
      <div className="hidden gap-4 sm:flex">
        <span>CPU {cpu?.toFixed(0) ?? "--"}%</span>
        <span>BAT {battery?.toFixed(0) ?? "--"}%</span>
      </div>
      <div className="flex gap-4">
        <span>POSE 027%</span>
        <span className="text-cyan-300/70">JARVIS v1.0</span>
      </div>
    </footer>
  );
}
