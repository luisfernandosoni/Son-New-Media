
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#121212",
        accent: "#FFFFFF",
        "accent-contrast": "#000000",
        subtle: "#1C1C1E",
        text: "#F5F5F7",
        secondary: "#86868B",
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        'nano': ['clamp(0.75rem, 0.5vw, 0.82rem)', { lineHeight: '1.4', letterSpacing: '0.15em' }],
        'body-fluid': ['clamp(0.95rem, 1vw, 1.05rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'label-fluid': ['clamp(0.8rem, 0.6vw, 0.88rem)', { lineHeight: '1.2', letterSpacing: '0.22em' }],
        'h1-fluid': ['clamp(2.4rem, 5.5vw, 4.0rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'h2-fluid': ['clamp(1.8rem, 4vw, 3.0rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'h3-fluid': ['clamp(1.2rem, 1.8vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'card-title-fluid': ['clamp(1.3rem, 1.6vw, 1.7rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        'widest-2x': '0.35em',
        'widest-3x': '0.5em',
      }
    },
  },
  plugins: [],
}
