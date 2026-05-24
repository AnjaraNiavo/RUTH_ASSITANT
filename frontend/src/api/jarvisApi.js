const API_BASE = "/api";

export async function fetchSystemStatus() {
  const res = await fetch(`${API_BASE}/status`);
  if (!res.ok) throw new Error("Impossible de récupérer le statut système");
  return res.json();
}

export async function sendCommand(query, speak = true) {
  const res = await fetch(`${API_BASE}/command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, speak }),
  });
  if (!res.ok) throw new Error("Erreur API commande");
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) return { status: "offline" };
  return res.json();
}
