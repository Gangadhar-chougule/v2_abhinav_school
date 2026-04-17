'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background/92 backdrop-blur-md transition-all duration-700 ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
      aria-hidden={!visible}
    >
      <div className="relative flex flex-col items-center gap-5">
        <div className="loader-orbit">
          <div className="loader-core" />
        </div>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-primary/15">
          <div className="loader-bar h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
        </div>
      </div>
    </div>
  );
}
