import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#1B3B2F',
        ivory: '#F6F2EA',
        sand: '#ECE5D8',
        gold: '#B8955A',
        ink: '#1C1C1A',
        background: '#ffffff',
        foreground: '#111111',
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
