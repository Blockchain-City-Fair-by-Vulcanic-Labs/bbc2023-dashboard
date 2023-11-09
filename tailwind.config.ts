import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "carnival-red": "#ff2600",
        "carnival-yellow": "#fabf38",
        "carnival-navy": "#003956",
        "carnival-blue": "#4f9ad0",
        "carnival-green": "#0c8177",
        "carnival-white": "#e4eaec",
      },
    },
  },
  plugins: [],
};
export default config;
