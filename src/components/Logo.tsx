import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  variant?: 'light' | 'dark';
  wordmarkClass?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
  showWordmark = true,
  variant = 'light',
  wordmarkClass,
}) => {
  const defaultWordmarkColor =
    variant === 'dark' ? 'text-white' : 'text-[var(--ink)]';

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
        <rect width="32" height="32" rx="9" fill="#1A56F0" />
        <path d="M9 6.5H18.5L23.5 11.5V25.5H9V6.5Z" fill="#FFFFFF" />
        <path d="M18.5 6.5V11.5H23.5L18.5 6.5Z" fill="#CFE0FF" />
        <path
          d="M12 14H20"
          stroke="#2DD4BF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 18H19"
          stroke="#0B1020"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 22H17"
          stroke="#4A5368"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span
          className={
            wordmarkClass ??
            `display-heading text-xl font-extrabold tracking-tight ${defaultWordmarkColor}`
          }
        >
          Tridral
        </span>
      )}
    </span>
  );
};
