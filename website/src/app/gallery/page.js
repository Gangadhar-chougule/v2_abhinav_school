'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const galleryImages = [
  { src: '/images/unnamed.webp', alt: 'Gallery Image 1' },
  { src: '/images/unnamed (1).webp', alt: 'Gallery Image 2' },
  { src: '/images/unnamed (2).webp', alt: 'Gallery Image 3' },
  { src: '/images/unnamed (3).webp', alt: 'Gallery Image 4' },
  { src: '/images/unnamed (4).webp', alt: 'Gallery Image 5' },
  { src: '/images/unnamed (5).webp', alt: 'Gallery Image 6' },
  { src: '/images/unnamed (6).webp', alt: 'Gallery Image 7' },
  { src: '/images/unnamed (7).webp', alt: 'Gallery Image 8' },
  { src: '/images/unnamed (8).webp', alt: 'Gallery Image 9' },
  { src: '/images/unnamed (9).webp', alt: 'Gallery Image 10' },
  { src: '/images/unnamed (10).webp', alt: 'Gallery Image 11' },
  { src: '/images/unnamed (11).webp', alt: 'Gallery Image 12' },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[30vh] md:h-[40vh] overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                {t('galleryTitle')}
              </h1>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto">
                {t('galleryDesc')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-4xl aspect-video">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}
