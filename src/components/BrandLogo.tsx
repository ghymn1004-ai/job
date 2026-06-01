import { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
}

export default function BrandLogo({ className = '', imgClassName = '' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <div className={className}>
        <img
          src="/logo_eumjob.png"
          alt="이음JOB 로고"
          className={`w-full h-full object-contain ${imgClassName}`}
          onError={() => {
            console.warn("Local logo_eumjob.png failed to load. Falling back to vector SVG Brand Logo.");
            setHasError(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`} id="brand-logo-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className={`w-full h-full ${imgClassName}`}
        style={{ maxHeight: '100%', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}
      >
        <defs>
          <linearGradient id="iium-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
          <linearGradient id="iium-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="iium-ai-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* --- Top Visual Symbol Group --- */}
        <g transform="translate(0, 30)">
          {/* 1. Infinity Wings (Drawn first so other items lay on top) */}
          {/* Blue Infinity Wing (Left Figure) */}
          <path
            d="M 245,238 C 210,195 130,190 130,240 C 130,285 200,290 248,242"
            fill="none"
            stroke="url(#iium-blue-grad)"
            strokeWidth="26"
            strokeLinecap="round"
          />

          {/* Green Infinity Wing (Right Figure) */}
          <path
            d="M 255,242 C 290,285 370,290 370,240 C 370,195 300,190 252,238"
            fill="none"
            stroke="url(#iium-green-grad)"
            strokeWidth="26"
            strokeLinecap="round"
          />

          {/* Left Head (Blue Figure) */}
          <circle cx="168" cy="165" r="17" fill="url(#iium-blue-grad)" />

          {/* Right Head (Green Figure) */}
          <circle cx="332" cy="165" r="17" fill="url(#iium-green-grad)" />

          {/* 2. AI Connections & Arch (Layers on top of the wings) */}
          {/* Left Stalk */}
          <line x1="226" y1="201" x2="214" y2="180" stroke="url(#iium-ai-grad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="212" cy="177" r="5" fill="#00c6ff" />

          {/* Center Stalk */}
          <line x1="250" y1="184" x2="250" y2="159" stroke="url(#iium-ai-grad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="250" cy="154" r="5" fill="#00b5e2" />

          {/* Right Stalk */}
          <line x1="274" y1="201" x2="286" y2="180" stroke="url(#iium-ai-grad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="288" cy="177" r="5" fill="#10b981" />

          {/* AI Arc */}
          <path
            d="M 213,212 A 40,40 0 0,1 287,212"
            fill="none"
            stroke="url(#iium-ai-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* 3. Text "AI" inside the arch (Drawn last on top of everything to be perfectly visible) */}
          <text
            x="250"
            y="218"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="26"
            fill="#035fc7"
            textAnchor="middle"
            letterSpacing="-0.5"
          >
            AI
          </text>
        </g>

        {/* --- Bottom Typography Group: 이음 JOB --- */}
        <g transform="translate(0, 30)">
          {/* 이음 (Korean Typography) in official deep blue */}
          <text
            x="135"
            y="370"
            fontFamily="system-ui, -apple-system, sans-serif, 'Malgun Gothic', 'Noto Sans KR'"
            fontWeight="900"
            fontSize="54"
            fill="#004b8d"
            letterSpacing="-1.5"
          >
            이음
          </text>

          {/* J in JOB */}
          <text
            x="248"
            y="370"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="54"
            fill="#035fc7"
            letterSpacing="-0.5"
          >
            J
          </text>

          {/* Outer circle O */}
          <circle cx="304" cy="351" r="23" fill="url(#iium-green-grad)" />
          {/* Handshake graphic in white */}
          <g transform="translate(291, 338) scale(0.65)" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Hand Left */}
            <path d="M 5,16 C 5,16 11,13 14,16 L 21,23 L 17,27 L 13,23" />
            {/* Hand Right */}
            <path d="M 33,16 C 33,16 27,13 24,16 L 17,23 L 21,27 L 25,23" strokeWidth="2.8" />
            {/* Lines representing fingers grip */}
            <path d="M 15,20 L 19,16" />
            <path d="M 17,22 L 21,18" />
          </g>

          {/* B in JOB */}
          <text
            x="338"
            y="370"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="54"
            fill="#10b981"
            letterSpacing="-0.5"
          >
            B
          </text>
        </g>
      </svg>
    </div>
  );
}

