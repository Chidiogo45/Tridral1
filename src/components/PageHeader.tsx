import React from 'react';
import { ArrowRightIcon } from './Icons.tsx';

interface PageHeaderProps {
  title: string;
  subline?: string;
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick: () => void;
  buttonIcon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subline,
  buttonLabel,
  buttonHref = '/early-access',
  onButtonClick,
  buttonIcon,
}) => {
  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold text-[var(--ink)] display-heading leading-[1.06]">
        {title}
      </h1>
      {subline && (
        <p className="text-[17px] text-[var(--text)] leading-[1.6]">
          {subline}
        </p>
      )}
      <div className="pt-1">
        {buttonHref ? (
          <a
            href={buttonHref}
            onClick={(e) => {
              e.preventDefault();
              onButtonClick();
            }}
            className="group h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors cursor-pointer whitespace-nowrap focus-ring"
          >
            {buttonIcon}
            <span>{buttonLabel}</span>
            {!buttonIcon && (
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </a>
        ) : (
          <button
            type="button"
            onClick={onButtonClick}
            className="group h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors cursor-pointer whitespace-nowrap focus-ring"
          >
            {buttonIcon}
            <span>{buttonLabel}</span>
            {!buttonIcon && (
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
