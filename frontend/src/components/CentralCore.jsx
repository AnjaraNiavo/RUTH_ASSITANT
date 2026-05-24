export default function CentralCore({ active = false }) {
  return (
    <div
      className="relative flex h-[min(52vw,52vh)] w-[min(52vw,52vh)] max-h-[520px] max-w-[520px] items-center justify-center"
      aria-hidden
    >
      {/* Anneaux externes */}
      {[1, 2, 3, 4, 5].map((ring) => (
        <div
          key={ring}
          className={`absolute rounded-full border border-cyan-400/20 ${
            ring % 2 === 0 ? "animate-spin-slow" : "animate-spin-fast"
          }`}
          style={{
            width: `${88 + ring * 6}%`,
            height: `${88 + ring * 6}%`,
            borderStyle: ring === 3 ? "dashed" : "solid",
            borderWidth: ring <= 2 ? 1 : 0.5,
            opacity: 0.15 + ring * 0.06,
          }}
        />
      ))}

      {/* Cercle avec ticks (SVG) */}
      <svg
        className="absolute h-[78%] w-[78%] animate-spin-mid text-cyan-400/30"
        viewBox="0 0 200 200"
      >
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const x1 = 100 + 92 * Math.cos(a);
          const y1 = 100 + 92 * Math.sin(a);
          const x2 = 100 + (i % 5 === 0 ? 82 : 88) * Math.cos(a);
          const y2 = 100 + (i % 5 === 0 ? 82 : 88) * Math.sin(a);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={i % 5 === 0 ? 1.2 : 0.5}
            />
          );
        })}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="rgba(34,211,238,0.25)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Anneau lumineux */}
      <div
        className="absolute h-[42%] w-[42%] rounded-full border border-cyan-300/40"
        style={{
          boxShadow:
            "0 0 40px rgba(34, 211, 238, 0.35), inset 0 0 30px rgba(14, 165, 233, 0.2)",
        }}
      />

      {/* Noyau bleu */}
      <div
        className={`relative h-[22%] w-[22%] rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-600 animate-pulse-core ${
          active ? "shadow-[0_0_60px_rgba(34,211,238,0.9)]" : "shadow-[0_0_40px_rgba(34,211,238,0.6)]"
        }`}
      >
        <div className="absolute inset-[18%] rounded-full bg-white/30 blur-sm" />
      </div>

    </div>
  );
}
