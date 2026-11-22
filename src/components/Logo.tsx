import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 30,
  showWordmark = true,
  variant = 'light',
}) => {
  const isDarkBg = variant === 'dark';

  return (
    <span className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect
          width="32"
          height="32"
          rx="7"
          fill={isDarkBg ? '#16243A' : '#101B2C'}
          stroke={isDarkBg ? 'rgba(255,255,255,0.16)' : 'rgba(16,27,44,0.12)'}
          strokeWidth="1"
        />
        <path
          d="M7.5 8.5H24.5V12.2H18V24.5H14V12.2H7.5V8.5Z"
          fill="#FFFFFF"
        />
        <rect x="20.5" y="19.5" width="4" height="5" rx="1" fill="#3979F6" />
        <rect x="7.5" y="19.5" width="4" height="5" rx="1" fill="#18B8A6" />
      </svg>

      {showWordmark && (
        <span
          className={`display-heading text-[18px] font-extrabold tracking-[0.06em] leading-none ${
            isDarkBg ? 'text-white' : 'text-[#101B2C]'
          }`}
        >
          TRIDRAL
        </span>
      )}
    </span>
  );
};
