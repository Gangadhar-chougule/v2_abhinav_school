'use client';

import ScrollReveal from './ScrollReveal';

export function SectionIntroReveal({
  children,
  className = '',
  delay = 100,
  as = 'div',
}) {
  return (
    <ScrollReveal as={as} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

export function StaggerReveal({
  children,
  index = 0,
  baseDelay = 140,
  step = 90,
  className = '',
  as = 'div',
}) {
  return (
    <ScrollReveal as={as} delay={baseDelay + index * step} className={className}>
      {children}
    </ScrollReveal>
  );
}
