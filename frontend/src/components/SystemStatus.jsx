function MetricBar({ label, value, max = 100, color = "bg-jarvis-teal" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-[10px] text-jarvis-teal/70">
        <span>{label}</span>
        <span>{value}{max === 100 ? "%" : ""}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-jarvis-teal/10">
        <div
          className={`h-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function SystemStatus({ status }) {
  if (!status) {
    return (
      <p className="font-mono text-xs text-jarvis-teal/40">
        Chargement des métriques…
      </p>
    );
  }

  const batteryColor =
    status.battery >= 70
      ? "bg-emerald-400"
      : status.battery >= 30
        ? "bg-amber-400"
        : "bg-red-500";

  return (
    <div className="space-y-4 font-mono text-xs">
      <MetricBar label="CPU" value={status.cpu} color="bg-cyan-400" />
      <MetricBar
        label="Batterie"
        value={status.battery}
        color={batteryColor}
      />
      <p className="text-[10px] leading-relaxed text-jarvis-teal/60">
        {status.plugged ? "Alimentation branchée" : "Sur batterie"}
      </p>
      <p className="rounded border border-jarvis-teal/15 bg-jarvis-teal/5 p-2 text-[10px] text-slate-300/80">
        {status.power_message}
      </p>
    </div>
  );
}
