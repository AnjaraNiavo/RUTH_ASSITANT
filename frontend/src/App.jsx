import { useCallback, useEffect, useRef, useState } from "react";
import WorldMap from "./components/WorldMap";
import HudBackground from "./components/HudBackground";
import CentralCore from "./components/CentralCore";
import CircularGauge from "./components/CircularGauge";
import InsetMapWidget from "./components/InsetMapWidget";
import TopRightHud from "./components/TopRightHud";
import RadarDial from "./components/RadarDial";
import MessageInput from "./components/MessageInput";
import {
  checkHealth,
  fetchSystemStatus,
  sendCommand,
} from "./api/jarvisApi";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [logs, setLogs] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [cpuAvg, setCpuAvg] = useState(null);
  const cpuHistory = useRef([]);
  const speakTimer = useRef(null);

  const refreshStatus = useCallback(async () => {
    try {
      const data = await fetchSystemStatus();
      setSystemStatus(data);
      setConnected(true);
      cpuHistory.current = [...cpuHistory.current.slice(-9), data.cpu];
      const avg =
        cpuHistory.current.reduce((a, b) => a + b, 0) /
        cpuHistory.current.length;
      setCpuAvg(avg);
    } catch {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    checkHealth()
      .then((h) => setConnected(h.status === "ok"))
      .catch(() => setConnected(false));
    refreshStatus();
    const interval = setInterval(refreshStatus, 6000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  useEffect(() => {
    return () => {
      if (speakTimer.current) clearTimeout(speakTimer.current);
    };
  }, []);

  const handleSend = async (query) => {
    const entryId = `${Date.now()}`;
    setLogs((prev) => [
      { id: entryId, query, response: "…", pending: true },
      ...prev.slice(0, 18),
    ]);
    setLoading(true);

    try {
      const outcome = await sendCommand(query, true);

      setLogs((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                response: outcome.response || "(aucune réponse)",
                pending: false,
              }
            : e
        )
      );

      if (outcome.system) setSystemStatus(outcome.system);

      const duration =
        outcome.speak_duration_ms ||
        Math.max(1500, (outcome.response?.length || 0) * 85);

      if (outcome.response && outcome.spoken !== false) {
        setIsSpeaking(true);
        if (speakTimer.current) clearTimeout(speakTimer.current);
        speakTimer.current = setTimeout(() => {
          setIsSpeaking(false);
        }, duration);
      }
    } catch {
      setConnected(false);
      setLogs((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                response: "Serveur hors ligne — lancez python server.py",
                pending: false,
              }
            : e
        )
      );
    } finally {
      setLoading(false);
      refreshStatus();
    }
  };

  const cpu = systemStatus?.cpu ?? 0;
  const battery = systemStatus?.battery ?? 0;
  const speaking = isSpeaking || loading;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a] text-red-100">
      <HudBackground />

      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
        <div className="h-[88%] w-[95%] translate-y-[1%]">
          <WorldMap variant="background" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[6] overflow-hidden opacity-15"
        aria-hidden
      >
        <div className="absolute left-0 right-0 h-24 animate-scan bg-gradient-to-b from-transparent via-red-500/10 to-transparent" />
      </div>

      <div className="absolute left-4 top-4 z-30 flex items-start gap-2 sm:left-8 sm:top-8 sm:gap-4">
        <CircularGauge
          label="CPU Usage"
          value={cpu}
          subLabel={cpuAvg != null ? `avg: ${cpuAvg.toFixed(1)}%` : "avg: --"}
          size={130}
          stroke={4}
        />
        <div className="flex flex-col gap-3 pt-2">
          <CircularGauge label="Battery" value={battery} size={72} stroke={3} />
          <CircularGauge
            label="Power"
            value={systemStatus?.plugged ? 100 : battery}
            size={72}
            stroke={3}
          />
        </div>
      </div>

      <div className="absolute right-4 top-4 z-30 sm:right-8 sm:top-8">
        <TopRightHud connected={connected} isSpeaking={speaking} />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 text-center">
        <h1 className="font-hud text-sm font-bold uppercase tracking-[0.45em] text-red-400/90 neon-text sm:text-base">
          RUTH
        </h1>
      </div>

      <div className="absolute left-1/2 top-[46%] z-20 -translate-x-1/2 -translate-y-1/2">
        <CentralCore active={speaking} />
      </div>

      <div className="absolute bottom-4 left-4 z-30 sm:bottom-6 sm:left-6">
        <InsetMapWidget>
          <WorldMap variant="inset" />
        </InsetMapWidget>
      </div>

      <div className="absolute bottom-44 right-4 z-20 hidden sm:block sm:bottom-48 sm:right-6">
        <RadarDial />
      </div>

      <MessageInput
        onSend={handleSend}
        loading={loading}
        logs={logs}
        connected={connected}
      />
    </div>
  );
}
