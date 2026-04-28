'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PageHero({
  title,
  description,
  image,
  imageAlt,
  size = 'default',
}) {
  const { t } = useLanguage();
  const heightClass = size === 'large' ? 'min-h-[70vh] md:min-h-[85vh]' : 'min-h-[40vh] md:min-h-[50vh]';

  // If no image is provided render a centered green banner with a constrained width so heading doesn't stretch
  if (!image) {
    return (
      <section className={`relative flex items-center justify-center overflow-hidden bg-hero-green ${heightClass}`}>
        <div className="absolute inset-0 opacity-90 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400" />
        <div className="relative z-10 section-container text-center w-full">
          {/* Limit hero content width to make the green bar feel narrower on very large screens */}
          <ScrollReveal className="max-w-[1000px] mx-auto hero-animate" delay={120}>
            <h1 className="heading-display text-white drop-shadow-md">{title}</h1>
            {description ? (
              <p className="body-large mt-4 max-w-2xl text-white/90 mx-auto">{description}</p>
            ) : null}
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative flex items-center overflow-hidden ${heightClass}`}>
      {/* Background Image or slideshow (supports string or array of image urls) */}
      <div className="absolute inset-0 z-0">
        {Array.isArray(image) ? (
          <div className="hero-slideshow absolute inset-0">
            {image.map((imgSrc, idx) => (
              <Image
                key={idx}
                src={imgSrc}
                alt={imageAlt || `hero-${idx}`}
                fill
                priority={idx === 0}
                className={`object-cover object-center hero-slide`}
                sizes="100vw"
                style={{ animationDelay: `${idx * 6}s` }}
              />
            ))}
          </div>
        ) : (
          <Image
            src={image}
            alt={imageAlt || ''}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}

        {/* Softer overlay for lighter UI while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <ScrollReveal className="max-w-3xl" delay={100}>
          <h1 className="heading-display text-white drop-shadow-md">{title}</h1>
          {description ? (
            <p className="body-large mt-6 max-w-2xl text-white/90">{description}</p>
          ) : null}

          {/* Default CTAs to match visual layout from screenshot (purely presentational)
              Use localized labels when available. */}
          <div className="mt-8 flex flex-wrap gap-4 justify-start">
            <Link href="/about" className="button-primary px-6 py-3 rounded-full">
              {t('learnMore')}
            </Link>
            <Link href="/contact" className="button-secondary px-6 py-3 rounded-full">
              {t('contactUs')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
