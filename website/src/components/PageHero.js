'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PageHero({
  title,
  description,
  image,
  imageAlt,
  size = 'default',
  className = '',
}) {
  const { t } = useLanguage();
  const heightClass = size === 'large' ? 'min-h-[70vh] md:min-h-[85vh]' : 'min-h-[40vh] md:min-h-[50vh]';
  const isSlideshow = Array.isArray(image) && image.length > 1;
  const slides = useMemo(() => (Array.isArray(image) ? image : []), [image]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides.length > 0 ? currentSlide % slides.length : 0;

  useEffect(() => {
    if (!isSlideshow || isPaused) return undefined;
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused, isSlideshow, slides.length]);

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
    <section className={`relative flex items-center overflow-hidden ${heightClass} ${className}`.trim()}>
      {/* Background Image or slideshow (supports string or array of image urls) */}
      <div className="absolute inset-0 z-0">
        {Array.isArray(image) ? (
          <div
            className="hero-slideshow absolute inset-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {image.map((imgSrc, idx) => (
              <Image
                key={idx}
                src={imgSrc}
                alt={imageAlt || `hero-${idx}`}
                fill
                priority={idx === 0}
                className={`object-cover object-center transition-opacity duration-700 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                sizes="100vw"
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

        {/* Layered overlay keeps heading readable across bright/dark slides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <ScrollReveal
          className="max-w-3xl rounded-3xl border border-white/20 bg-black/35 p-6 shadow-2xl backdrop-blur-[3px] sm:p-8 md:p-10"
          delay={100}
        >
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

          {isSlideshow ? (
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPaused((value) => !value)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white hover:bg-black/40"
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${idx === activeSlide ? 'w-7 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
