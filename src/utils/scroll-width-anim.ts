import type { RefObject } from 'react';

type TAnimOptions = {
  frames: number;
  speed: number;
};

export const scrollWidthAnim = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  { frames, speed }: TAnimOptions
) => {
  if (elementRef.current) {
    const scrollPosition = window.scrollY;
    const progress = Math.min(scrollPosition / frames, 1);

    elementRef.current.style.width = `calc(100% - (${speed}% * ${progress}))`;
  }
};
