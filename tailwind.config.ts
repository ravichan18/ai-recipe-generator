const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefef9",
          100: "#d7fdf0",
          200: "#b0f5df",
          300: "#7aeac9",
          400: "#38d8a7",
          500: "#13b98d",
          600: "#0f9c7d",
          700: "#0f7e66",
          800: "#125f50",
          900: "#124d40"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(19,185,141,0.15), 0 24px 60px rgba(20,94,73,0.15)"
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
