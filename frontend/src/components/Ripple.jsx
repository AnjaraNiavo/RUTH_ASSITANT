import { motion } from "framer-motion";

export default function Ripple({ x, y, color, delay = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={8}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          initial={{ scale: 0.3, opacity: 0.7 }}
          animate={{ scale: 5 + i * 1.5, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: delay + i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}
    </g>
  );
}
