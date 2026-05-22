export default function RadarDial() {
  return (
    <div className="pointer-events-none relative h-44 w-44 opacity-40 md:h-56 md:w-56 md:opacity-50">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {[90, 70, 50, 30].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="rgba(34, 211, 238, 0.15)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 95 * Math.cos(a)}
              y2={100 + 95 * Math.sin(a)}
              stroke="rgba(34, 211, 238, 0.2)"
              strokeWidth="0.5"
            />
          );
        })}
        <path
          d="M 100 100 L 100 10 A 90 90 0 0 1 175 55 Z"
          fill="rgba(34, 211, 238, 0.08)"
          className="origin-center animate-spin-slow"
          style={{ transformOrigin: "100px 100px" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/30">
          RADAR
        </span>
      </div>
    </div>
  );
}
