'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

const galleryImages = [
  { src: getImageUrl('unnamed.webp') || '/images/unnamed.webp', alt: 'Gallery Image 1' },
  { src: getImageUrl('unnamed (1).webp') || '/images/unnamed (1).webp', alt: 'Gallery Image 2' },
  { src: getImageUrl('unnamed (2).webp') || '/images/unnamed (2).webp', alt: 'Gallery Image 3' },
  { src: getImageUrl('unnamed (3).webp') || '/images/unnamed (3).webp', alt: 'Gallery Image 4' },
  { src: getImageUrl('unnamed (4).webp') || '/images/unnamed (4).webp', alt: 'Gallery Image 5' },
  { src: getImageUrl('unnamed (5).webp') || '/images/unnamed (5).webp', alt: 'Gallery Image 6' },
  { src: getImageUrl('unnamed (6).webp') || '/images/unnamed (6).webp', alt: 'Gallery Image 7' },
  { src: getImageUrl('unnamed (7).webp') || '/images/unnamed (7).webp', alt: 'Gallery Image 8' },
  { src: getImageUrl('unnamed (8).webp') || '/images/unnamed (8).webp', alt: 'Gallery Image 9' },
  { src: getImageUrl('unnamed (9).webp') || '/images/unnamed (9).webp', alt: 'Gallery Image 10' },
  { src: getImageUrl('unnamed (10).webp') || '/images/unnamed (10).webp', alt: 'Gallery Image 11' },
  { src: getImageUrl('unnamed (11).webp') || '/images/unnamed (11).webp', alt: 'Gallery Image 12' },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <PageHero title={t('galleryTitle')} description={t('galleryDesc')} />

      <section className="section-spacing">
        <div className="section-container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryImages.map((img, index) => (
              <ScrollReveal key={img.src} delay={70 + index * 30}>
                <button
                  type="button"
                  className="surface-card-strong group relative aspect-square w-full overflow-hidden text-left"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {selectedImage ? (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/92 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label="Close gallery preview"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/18"
              onClick={() => setSelectedImage(null)}
            >
              <X size={22} />
            </button>
            <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/6">
              <Image src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" />
            </div>
          </div>
        ) : null}
      </section>
    </Layout>
  );
}
