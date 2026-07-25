'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─── Animated Section: wraps content, passes `show` when in view ─── */
export function AnimSection({
  children,
  className = '',
  rootMargin = '0px 0px -120px 0px',
  onShow,
}: {
  children: (show: boolean) => React.ReactNode;
  className?: string;
  rootMargin?: string;
  onShow?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120 && rect.bottom > 0) {
      setShow(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  useEffect(() => {
    if (show) onShow?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  return (
    <div ref={ref} className={className}>
      {children(show)}
    </div>
  );
}

/* Simple fade-in helper */
export function Anim({
  show,
  delay = 0,
  children,
  className = '',
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
