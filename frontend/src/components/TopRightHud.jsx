export default function TopRightHud({ connected }) {
  const bars = [40, 65, 30, 80, 50, 70, 45, 90, 35, 60];

  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex items-center gap-3">
        <svg
          className="h-6 w-6 text-cyan-400/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            strokeLinecap="round"
            d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
          />
        </svg>
        <div className="text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-cyan-400/50">
            LABEL ADM NEIVE
          </p>
          <p className="font-mono text-[9px] text-cyan-300/70">
            {connected ? "AUDIO · ONLINE" : "AUDIO · OFFLINE"}
          </p>
        </div>
      </div>

      <div className="flex h-8 items-end gap-0.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-sm bg-cyan-400/60"
            style={{
              height: `${h}%`,
              animationDelay: `${i * 0.08}s`,
              boxShadow: "0 0 6px rgba(34, 211, 238, 0.5)",
            }}
          />
        ))}
      </div>

      {/* Motif connect-the-dots */}
      <svg width="120" height="60" className="opacity-30">
        {[
          [10, 30],
          [40, 10],
          [70, 40],
          [100, 15],
          [110, 50],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#22d3ee" />
        ))}
        <polyline
          points="10,30 40,10 70,40 100,15 110,50"
          fill="none"
          stroke="rgba(34,211,238,0.4)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
