import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  aspectClass?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  aspectClass = 'aspect-video',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#181816] text-[#9E9689] border border-white/10 p-6 text-center ${aspectClass} ${className}`}
      >
        <span className="font-mono-system text-xs tracking-widest uppercase opacity-70">
          ARCHIVE VISUAL
        </span>
        <span className="mt-2 font-serif-life text-lg text-[#F2EFE9]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
};
