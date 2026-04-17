'use client';

import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function PageHero({
  title,
  description,
  image,
  imageAlt,
  size = 'default',
}) {
  const heightClass = size === 'large' ? 'min-h-[70vh] md:min-h-[85vh]' : 'min-h-[40vh] md:min-h-[50vh]';

  return (
    <section className={`relative flex items-center overflow-hidden bg-slate-900 ${heightClass}`}>
      {image ? (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-slate-900" />
      )}
      
      <div className="relative z-10 section-container w-full">
        <ScrollReveal className="max-w-3xl" delay={100}>
          <h1 className="heading-display text-white drop-shadow-sm">
            {title}
          </h1>
          {description ? (
            <p className="body-large mt-6 max-w-2xl text-white/90 drop-shadow-sm">
              {description}
            </p>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
