import VoiceVisualizer from "./VoiceVisualizer";

export default function TopRightHud({ connected, isSpeaking }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        <svg
          className={`h-6 w-6 shrink-0 ${isSpeaking ? "text-orange-400" : "text-red-400/80"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
          style={
            isSpeaking
              ? { filter: "drop-shadow(0 0 6px rgba(249, 115, 22, 0.8))" }
              : undefined
          }
        >
          <path
            strokeLinecap="round"
            d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
          />
        </svg>

        <VoiceVisualizer active={isSpeaking} />

        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-300/70">
          {connected ? "AUDIO · ONLINE" : "AUDIO · OFFLINE"}
        </p>
      </div>
    </div>
  );
}
