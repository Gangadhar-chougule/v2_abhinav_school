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
  const heightClass = size === 'large' ? 'min-h-[68vh] md:min-h-[82vh]' : 'min-h-[34vh] md:min-h-[44vh]';

  return (
    <section className={`page-hero ${heightClass}`}>
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center scale-[1.03]"
        />
      ) : null}
      <div className="page-hero__overlay" />
      <div className="page-hero__mesh" />
      <div className="page-hero__content section-container">
        <ScrollReveal className="max-w-4xl" delay={100}>
          <h1 className="heading-display text-white">{title}</h1>
          {description ? (
            <p className="body-large mt-5 max-w-2xl text-white/88">
              {description}
            </p>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
