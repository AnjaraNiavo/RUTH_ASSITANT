import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";
import Ripple from "./Ripple";
import {
  RIPPLE_HUBS,
  ALERT_POINTS,
  CONNECTION_LINES,
} from "../data/mapData";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const STROKE = "#ef4444";

export default function WorldMap({ variant = "full", className = "" }) {
  const isBg = variant === "background";
  const isInset = variant === "inset";

  const scale = isBg ? 160 : isInset ? 100 : 140;
  const width = isBg ? 1100 : isInset ? 360 : 980;
  const height = isBg ? 540 : isInset ? 175 : 520;
  const strokeW = isBg ? 0.28 : 0.45;
  const showRipples = !isBg;

  return (
    <div
      className={`map-glow h-full w-full ${className}`}
      style={{ opacity: isBg ? 0.4 : 1 }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale, center: [15, 15] }}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke={STROKE}
                strokeWidth={strokeW}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {CONNECTION_LINES.map((line, idx) => (
          <Line
            key={idx}
            from={line.from}
            to={line.to}
            stroke={line.stroke}
            strokeWidth={isInset ? 0.55 : 0.65}
            strokeLinecap="round"
          />
        ))}

        {showRipples &&
          RIPPLE_HUBS.map((hub, idx) => (
            <Marker key={hub.label} coordinates={hub.coords}>
              <Ripple x={0} y={0} color={hub.color} delay={idx * 0.8} />
            </Marker>
          ))}

        {ALERT_POINTS.map((point, idx) => (
          <Marker key={idx} coordinates={point.coords}>
            <circle
              r={isInset ? point.size * 0.75 : point.size}
              fill={point.color}
              style={{ filter: `drop-shadow(0 0 5px ${point.color})` }}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
