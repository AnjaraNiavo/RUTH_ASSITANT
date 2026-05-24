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
  const [logs, setLogs] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [cpuAvg, setCpuAvg] = useState(null);
  const cpuHistory = useRef([]);

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

  const handleSend = async (query) => {
    setLoading(true);
    try {
      const outcome = await sendCommand(query, true);
      setLogs((prev) => [
        {
          id: `${Date.now()}-${prev.length}`,
          query,
          response: outcome.response || "(aucune réponse)",
        },
        ...prev.slice(0, 19),
      ]);
      if (outcome.system) setSystemStatus(outcome.system);
    } catch {
      setConnected(false);
      setLogs((prev) => [
        {
          id: Date.now(),
          query,
          response: "Serveur hors ligne — lancez python server.py",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
      refreshStatus();
    }
  };

  const cpu = systemStatus?.cpu ?? 0;
  const battery = systemStatus?.battery ?? 0;

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950 text-cyan-100">
      <HudBackground />

      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
        <div className="h-[85%] w-[90%] translate-x-[8%] translate-y-[2%]">
          <WorldMap variant="background" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[6] overflow-hidden opacity-20"
        aria-hidden
      >
        <div className="absolute left-0 right-0 h-24 animate-scan bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />
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
        <TopRightHud connected={connected} />
      </div>

      <div className="absolute left-1/2 top-[46%] z-20 -translate-x-1/2 -translate-y-1/2">
        <CentralCore active={loading} />
      </div>

      <div className="absolute bottom-28 left-4 z-30 sm:bottom-32 sm:left-8">
        <InsetMapWidget>
          <WorldMap variant="inset" />
        </InsetMapWidget>
      </div>

      <div className="absolute bottom-28 right-4 z-20 sm:bottom-32 sm:right-10">
        <RadarDial />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 text-center">
        <h1 className="font-hud text-[11px] font-semibold uppercase tracking-[0.5em] text-cyan-400/40 neon-text">
          J.A.R.V.I.S
        </h1>
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
