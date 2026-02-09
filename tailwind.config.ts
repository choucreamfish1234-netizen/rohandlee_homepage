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
        background: '#ffffff',
        foreground: '#111111',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Noto Serif KR"', 'Georgia', 'serif'],
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
