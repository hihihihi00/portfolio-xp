export function Wallpaper() {
  return (
    <div className="wall">
      <svg
        className="land"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hill" x2="0" y2="1">
            <stop stopColor="#76b42b" />
            <stop offset=".5" stopColor="#4f9b16" />
            <stop offset="1" stopColor="#235b13" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="13" />
          </filter>
        </defs>
        <g fill="white" opacity=".65" filter="url(#blur)">
          <ellipse cx="1030" cy="150" rx="145" ry="27" />
          <ellipse cx="1130" cy="125" rx="80" ry="23" />
          <ellipse cx="330" cy="260" rx="140" ry="22" />
          <ellipse cx="50" cy="110" rx="110" ry="25" />
        </g>
        <path d="M0 610 Q330 410 770 565 T1440 520V900H0Z" fill="#54913b" />
        <path
          d="M0 640 Q460 465 970 660 Q1220 745 1440 675V900H0Z"
          fill="url(#hill)"
        />
        <path
          d="M0 780 Q450 670 1040 825"
          fill="none"
          stroke="#8ab33f"
          strokeWidth="3"
          opacity=".2"
        />
      </svg>
    </div>
  );
}
