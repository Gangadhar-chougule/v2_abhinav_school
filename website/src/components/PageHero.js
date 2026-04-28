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
    <section className={`relative flex items-center overflow-hidden ${heightClass}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt || ''}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Softer overlay for lighter UI while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <ScrollReveal className="max-w-3xl" delay={100}>
          <h1 className="heading-display text-white">
            {title}
          </h1>
          {description ? (
            <p className="body-large mt-6 max-w-2xl text-white/90">
              {description}
            </p>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
