'use client';

import { useEffect, useState } from 'react';

/** Steps through `count` items every `ms` while `running` is true. */
export function useAutoStep(count: number, ms: number, running: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearInterval(timer);
  }, [count, ms, running]);
  return [index, setIndex] as const;
}
