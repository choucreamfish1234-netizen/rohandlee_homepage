import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#13233F", deep: "#0C1830", soft: "#1E3358" },
        ivory: "#F7F3EC",
        mist: { DEFAULT: "#F3F5F8", deep: "#E9EDF3" },
        line: "#E2E6ED",
        gold: { DEFAULT: "#A8875A", light: "#C9AE84", pale: "#EADFC9" },
        charcoal: "#24272D",
        mute: "#5B6170",
        warn: { DEFAULT: "#B4533A", bg: "#FDF6F3" },
        wechat: "#07C160",
        kakao: "#FEE500",
      },
      borderRadius: { card: "12px" },
      maxWidth: { site: "1200px" },
      fontFamily: {
        sans: ["PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "system-ui", "sans-serif"],
        ko: ["Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", "system-ui", "sans-serif"],
        serif: ["Songti SC", "STSong", "Nanum Myeongjo", "AppleMyungjo", "Batang", "Times New Roman", "serif"],
      },
      boxShadow: { float: "0 12px 32px -12px rgba(12,24,48,0.28)" },
    },
  },
  plugins: [],
};
export default config;
