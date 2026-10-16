import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClass?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 28,
  showWordmark = true,
  wordmarkClass = 'text-xl font-bold tracking-tight text-[#0B0F1A]',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#0B0F1A" />
        <path
          d="M16 8L24 22H8L16 8Z"
          stroke="#2DD4BF"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="8" r="3.25" fill="#2F5FFF" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="24" cy="22" r="3.25" fill="#2F5FFF" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="8" cy="22" r="3.25" fill="#2DD4BF" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="16" cy="17" r="1.5" fill="#FFFFFF" />
      </svg>
      {showWordmark && (
        <span className={wordmarkClass}>
          Tridral
        </span>
      )}
    </div>
  );
};
