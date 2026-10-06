import type { IconName } from "@/content/types";

export type UiIcon =
  | IconName
  | "phone" | "wechat" | "kakao" | "mail" | "form" | "check" | "arrow" | "chevron" | "pin"
  | "user" | "scale" | "message" | "close" | "menu" | "copy" | "clock" | "search" | "x-circle";

const P: Record<UiIcon, React.ReactNode> = {
  badge: <><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9.5 12.5l2 2 3.5-4" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M12 8v5M12 16h.01" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  alert: <><path d="M12 4l9 16H3l9-16z" /><path d="M12 10v4M12 17h.01" /></>,
  fist: <><path d="M7 11V8.5a1.5 1.5 0 013 0V11M10 10V7.5a1.5 1.5 0 013 0V10M13 10V8.5a1.5 1.5 0 013 0V12" /><path d="M16 11.5a1.5 1.5 0 013 0V14a6 6 0 01-6 6h-1a6 6 0 01-6-6v-2.5a1.5 1.5 0 013 0" /></>,
  car: <><path d="M5 16V12l2-5h10l2 5v4" /><path d="M3 16h18v2H3z" /><circle cx="7.5" cy="13" r=".8" /><circle cx="16.5" cy="13" r=".8" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></>,
  route: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h7a3 3 0 010 6H9a3 3 0 000 6h7" /></>,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  wechat: <><path d="M9.5 4C5.4 4 2 6.8 2 10.2c0 2 1.1 3.7 2.9 4.8L4.3 17l2.4-1.2c.9.2 1.8.4 2.8.4" /><path d="M15.5 9c3.6 0 6.5 2.4 6.5 5.3 0 1.6-.9 3.1-2.3 4l.5 1.7-2-1c-.8.2-1.7.4-2.7.4-3.6 0-6.5-2.4-6.5-5.2S11.9 9 15.5 9z" /><path d="M7 8.5h.01M12 8.5h.01M13.5 13.5h.01M17.5 13.5h.01" /></>,
  kakao: <><path d="M12 4C7 4 3 7.2 3 11.1c0 2.5 1.6 4.6 4.1 5.9L6.3 20l3.6-2.3c.7.1 1.4.2 2.1.2 5 0 9-3.2 9-7.1S17 4 12 4z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  form: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  pin: <><path d="M12 21s-6-5.6-6-11a6 6 0 0112 0c0 5.4-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0114 0" /></>,
  scale: <><path d="M12 4v16M7 20h10M5 7h14" /><path d="M5 7l-2.5 6a2.5 2.5 0 005 0L5 7zM19 7l-2.5 6a2.5 2.5 0 005 0L19 7z" /></>,
  message: <><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  "x-circle": <><circle cx="12" cy="12" r="8.5" /><path d="M9 9l6 6M15 9l-6 6" /></>,
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.6 }: { name: UiIcon; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name]}
    </svg>
  );
}
