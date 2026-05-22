import { useId } from "react";

export default function CircularGauge({
  label,
  value = 0,
  subLabel,
  size = 100,
  stroke = 3,
  className = "",
}) {
  const gradId = useId();
  const r = (size - stroke * 2) / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(34, 211, 238, 0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: "drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))",
            transition: "stroke-dashoffset 0.8s ease",
          }}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-hud text-[7px] uppercase tracking-[0.2em] text-cyan-400/70">
          {label}
        </span>
        <span className="font-hud text-xl font-bold leading-none text-white neon-text">
          {pct.toFixed(1)}%
        </span>
        {subLabel && (
          <span className="mt-0.5 font-mono text-[8px] text-cyan-300/50">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
}
