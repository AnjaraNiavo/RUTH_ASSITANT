/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hud: {
          bg: "#020617",
          cyan: "#22d3ee",
          blue: "#38bdf8",
          glow: "#0ea5e9",
        },
      },
      fontFamily: {
        hud: ["Orbitron", "Segoe UI", "sans-serif"],
        mono: ["Share Tech Mono", "Consolas", "monospace"],
      },
      animation: {
        scan: "scan 10s linear infinite",
        "eq-bar": "eq 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        eq: {
          "0%": { height: "20%" },
          "100%": { height: "100%" },
        },
      },
    },
  },
  plugins: [],
};
