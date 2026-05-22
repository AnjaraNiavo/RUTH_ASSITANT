/** Hubs pour les ondes radar (coordonnées [longitude, latitude]) */
export const RIPPLE_HUBS = [
  { coords: [-122, 37], color: "rgba(250, 204, 21, 0.35)", label: "US-West" },
  { coords: [2, 48], color: "rgba(96, 165, 250, 0.35)", label: "Europe" },
  { coords: [139, 35], color: "rgba(192, 132, 252, 0.4)", label: "Asia" },
];

/** Points d'alerte décoratifs */
export const ALERT_POINTS = [
  { coords: [-74, 40], color: "#f87171", size: 3 },
  { coords: [-95, 29], color: "#fb7185", size: 2.5 },
  { coords: [-0.1, 51.5], color: "#f87171", size: 3 },
  { coords: [13, 52], color: "#fca5a5", size: 2 },
  { coords: [2.3, 48.8], color: "#fef08a", size: 2.5 },
  { coords: [37.6, 55.7], color: "#f87171", size: 3 },
  { coords: [116.4, 39.9], color: "#fb7185", size: 3.5 },
  { coords: [139.7, 35.7], color: "#f87171", size: 3 },
  { coords: [121.5, 31.2], color: "#e2e8f0", size: 2 },
  { coords: [77.2, 28.6], color: "#67e8f9", size: 2.5 },
  { coords: [31.2, 30], color: "#fbbf24", size: 3 },
  { coords: [55.3, 25.3], color: "#f87171", size: 2.5 },
  { coords: [-46.6, -23.5], color: "#fb7185", size: 2 },
  { coords: [151.2, -33.8], color: "#fca5a5", size: 2 },
];

/** Lignes de connexion entre régions */
export const CONNECTION_LINES = [
  {
    from: [31, 30],
    to: [116, 39],
    stroke: "rgba(251, 146, 60, 0.75)",
  },
  {
    from: [77, 28],
    to: [139, 35],
    stroke: "rgba(45, 212, 191, 0.65)",
  },
  {
    from: [-74, 40],
    to: [2, 48],
    stroke: "rgba(147, 197, 253, 0.5)",
  },
];
