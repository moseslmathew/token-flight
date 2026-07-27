'use client';

import React, { useEffect, useState } from 'react';

/**
 * Hairline progress bar pinned under the masthead.
 * Deliberately quiet — it answers "how much is left?" without demanding attention.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-40 h-px bg-transparent"
    >
      <div
        className="h-full origin-left bg-accent/70"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
