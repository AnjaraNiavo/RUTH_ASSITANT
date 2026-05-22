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

/**
 * @param {"background" | "inset" | "full"} variant
 */
export default function WorldMap({
  variant = "full",
  className = "",
}) {
  const isBg = variant === "background";
  const isInset = variant === "inset";

  const scale = isBg ? 155 : isInset ? 95 : 140;
  const width = isBg ? 1100 : isInset ? 320 : 980;
  const height = isBg ? 520 : isInset ? 160 : 520;
  const stroke = isBg ? "#22d3ee" : "#2dd4bf";
  const strokeW = isBg ? 0.25 : 0.4;
  const showRipples = !isBg;
  const showLines = true;

  return (
    <div
      className={`map-glow h-full w-full ${className}`}
      style={{ opacity: isBg ? 0.35 : isInset ? 1 : 1 }}
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
                stroke={stroke}
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

        {showLines &&
          CONNECTION_LINES.map((line, idx) => (
            <Line
              key={idx}
              from={line.from}
              to={line.to}
              stroke={line.stroke}
              strokeWidth={isInset ? 0.5 : 0.6}
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
              r={isInset ? point.size * 0.7 : point.size}
              fill={point.color}
              style={{ filter: `drop-shadow(0 0 4px ${point.color})` }}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
