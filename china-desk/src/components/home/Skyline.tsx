/** 서울 스카이라인 선화 — 산 능선 · 남산타워 · 빌딩 · 한강 다리. 장식용(금색 35%) */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      fill="none"
      stroke="#A8875A"
      strokeOpacity="0.35"
      strokeWidth="1.2"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* 산 능선 (북한산·인왕산) */}
      <path d="M0 150 L70 118 L120 132 L190 92 L250 120 L300 104 L360 128 L420 112 L470 126" />
      <path d="M980 128 L1040 96 L1090 116 L1150 84 L1210 110 L1270 98 L1340 124 L1440 106" />
      {/* 남산 + N서울타워 */}
      <path d="M520 160 C 580 120, 640 104, 700 104 C 760 104, 820 124, 880 160" />
      <path d="M700 104 V 52 M694 104 L697 60 M706 104 L703 60" />
      <path d="M690 60 h20 v-6 h-20 z M693 54 h14 l-2 -7 h-10 z M700 47 V 22" />
      {/* 빌딩 */}
      <path d="M180 170 V 128 h26 v42 M214 170 V 112 h20 v58 M242 170 V 136 h30 v34" />
      <path d="M300 170 V 120 l14 -10 l14 10 v50 M338 170 V 140 h22 v30" />
      <path d="M900 170 V 118 h22 v52 M930 170 V 98 h18 v72 M956 170 V 132 h28 v38" />
      <path d="M1010 170 V 108 h16 v62 M1034 170 V 124 h30 v46 M1072 170 V 86 l10 -12 l10 12 v84" />
      <path d="M1110 170 V 130 h24 v40 M1142 170 V 116 h20 v54 M1170 170 V 140 h40 v30" />
      <path d="M380 170 V 132 h24 v38 M412 170 V 146 h30 v24" />
      {/* 한강 다리 */}
      <path d="M0 176 H 1440" />
      <path d="M560 176 Q 600 150 640 176 Q 680 150 720 176 Q 760 150 800 176 Q 840 150 880 176" />
      <path d="M560 176 V 190 M640 176 V 190 M720 176 V 190 M800 176 V 190 M880 176 V 190" />
      {/* 물결 */}
      <path d="M40 196 H 300 M420 204 H 760 M900 198 H 1200 M1260 208 H 1420" strokeOpacity="0.2" />
    </svg>
  );
}
