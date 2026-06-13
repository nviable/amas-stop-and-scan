/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // STOP&SCAN step cues (mapped to Amito's glow colors)
        stop: "#ef4a6b", // pink-red torso
        source: "#22b8cf", // cyan right cuff
        content: "#37b24d", // green left cuff
        alignment: "#b197fc", // lilac head A
        reflect: "#ff922b", // orange torso
        ink: "#241b3a", // deep navy from Amito visor
        cream: "#f6f0e4", // journal paper
      },
      fontFamily: {
        display: ["'Baloo 2'", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
        hand: ["'Gochi Hand'", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(36, 27, 58, 0.25)",
      },
      keyframes: {
        wave: {
          "0%,100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(12deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowpulse: {
          "0%,100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
      animation: {
        wave: "wave 1.6s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        glowpulse: "glowpulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
