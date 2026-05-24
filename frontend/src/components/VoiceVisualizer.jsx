import { useEffect, useState } from "react";

const BAR_COUNT = 12;

export default function VoiceVisualizer({ active = false }) {
  const [heights, setHeights] = useState(() =>
    Array(BAR_COUNT).fill(20)
  );

  useEffect(() => {
    if (!active) {
      setHeights(Array(BAR_COUNT).fill(12));
      return undefined;
    }

    const tick = () => {
      setHeights(
        Array.from({ length: BAR_COUNT }, () => 25 + Math.random() * 75)
      );
    };

    tick();
    const id = setInterval(tick, 90);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div
      className="flex h-7 items-center gap-[3px]"
      aria-hidden={!active}
      aria-label={active ? "JARVIS parle" : "Visualiseur audio inactif"}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm transition-all duration-75 ${
            active
              ? "bg-gradient-to-t from-red-600 to-orange-400 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
              : "bg-red-900/40"
          }`}
          style={{ height: `${active ? h : 12}%` }}
        />
      ))}
    </div>
  );
}
