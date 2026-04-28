'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

const galleryCategories = [
  { id: 'all', label: 'सर्व', labelEn: 'All' },
  { id: 'aarogya', label: 'आरोग्य पोषण', labelEn: 'Health & Nutrition' },
  { id: 'vari', label: 'आपली वारी', labelEn: 'Our Journey' },
  { id: 'vishesh', label: 'विशेष वर्ग', labelEn: 'Special Class' },
  { id: 'kushalya', label: 'वास्तविक कौशल्य', labelEn: 'Real Skills' },
  { id: 'sahal', label: 'शैक्षणिक सहल', labelEn: 'Educational Trip' },
];

const galleryImages = [
  {
    src: '/images/आरोग्य तपासणी/67ca4d58-4623-4ff0-b4a9-265b0923afa8.jpg',
    category: 'aarogya',
    alt: 'आरोग्य पोषण'
  },
  {
    src: '/images/आरोग्य तपासणी/8a65a145-978a-4e44-a41a-dadc5ef7b0c6.jpg',
    category: 'aarogya',
    alt: 'आरोग्य पोषण'
  },
  {
    src: '/images/आषाढी वारी/13b2cc09-c219-4674-b30d-52cc88f63402.jpg',
    category: 'vari',
    alt: 'आपली वारी'
  },
  {
    src: '/images/आषाढी वारी/91c2b451-b310-4703-8f58-c79c285bc2cb.jpg',
    category: 'vari',
    alt: 'आपली वारी'
  },
  {
    src: '/images/विशेष वर्ग/a9286d56-16c5-4845-b5b8-5413197b32df.jpg',
    category: 'vishesh',
    alt: 'विशेष वर्ग'
  },
  {
    src: '/images/विशेष वर्ग/902a8c6f-55bc-4327-aa29-c35d50f106a3.jpg',
    category: 'vishesh',
    alt: 'विशेष वर्ग'
  },
  {
    src: '/images/विशेष वर्ग/d8cd9a24-831e-4f4f-9835-9392b7460083.jpg',
    category: 'vishesh',
    alt: 'विशेष वर्ग'
  },
  {
    src: '/images/विशेष वर्ग/a3899c47-e5f6-4b8c-8ba6-a9cd10a61a5c.jpg',
    category: 'vishesh',
    alt: 'विशेष वर्ग'
  },
  {
    src: '/images/व्यवसायपूर्व कौशल्य/4d41cd57-f0b3-45a8-8afa-8fc47f114f4c.jpg',
    category: 'kushalya',
    alt: 'वास्तविक कौशल्य'
  },
  {
    src: '/images/व्यवसायपूर्व कौशल्य/8995a442-7488-41ab-9f5a-019e4e631637.jpg',
    category: 'kushalya',
    alt: 'वास्तविक कौशल्य'
  },
  {
    src: '/images/व्यवसायपूर्व कौशल्य/0e9f79e6-b573-4e8c-a1ce-84b460c67745.jpg',
    category: 'kushalya',
    alt: 'वास्तविक कौशल्य'
  },
  {
    src: '/images/व्यवसायपूर्व कौशल्य/54b211d9-ae37-402d-a588-4f7c0ed059d1.jpg',
    category: 'kushalya',
    alt: 'वास्तविक कौशल्य'
  },
  {
    src: '/images/शौक्षणिक सहल/f2b80c76-f5bb-48c7-a63e-c341ce057833.jpg',
    category: 'sahal',
    alt: 'शैक्षणिक सहल'
  },
  {
    src: '/images/शौक्षणिक सहल/8905100d-1890-490b-87cd-84d99679f955.jpg',
    category: 'sahal',
    alt: 'शैक्षणिक सहल'
  },
  {
    src: '/images/शौक्षणिक सहल/42107719-a062-40ad-aa16-03520f5dae78.jpg',
    category: 'sahal',
    alt: 'शैक्षणिक सहल'
  },
  {
    src: '/images/शौक्षणिक सहल/415931ef-415a-41ea-a35f-b9738231dff0.jpg',
    category: 'sahal',
    alt: 'शौक्षणिक सहल'
  },
  {
    src: '/images/शौक्षणिक सहल/2b3800bc-46e9-4df8-83e5-7a605ab78ce1.jpg',
    category: 'sahal',
    alt: 'शौक्षणिक सहल'
  },
  // Added images requested by the designer: fall back to cloudinary mapping when available
  {
    src: getImageUrl('tree-planting.jpg'),
    category: 'sahal',
    alt: 'Tree Planting Program (वृक्षारोपण)'
  },
  {
    src: getImageUrl('educational-trip.jpg'),
    category: 'sahal',
    alt: 'Educational Trips (शैक्षणिक सहल)'
  },
  {
    src: getImageUrl('unnamed (11).webp'),
    category: 'aarogya',
    alt: 'School Campus (शालेय परिसर)'
  },
];

export default function Gallery() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <Layout>
      <PageHero title={t('galleryTitle')} description={t('galleryDesc')} />

      <section className="section-spacing">
        <div className="section-container">
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'mr' ? cat.label : cat.labelEn}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((img, index) => (
              <ScrollReveal key={img.src} delay={70 + index * 30}>
                <button
                  type="button"
                  className="group relative aspect-square w-full overflow-hidden rounded border border-border bg-white text-left"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm font-medium text-white">{img.alt}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <p className="text-center text-slate-500 py-12">
              {language === 'mr' ? 'या श्रेणीमध्ये कोणतेही चित्र नाही' : 'No images in this category'}
            </p>
          )}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/92 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label="Close gallery preview"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X size={22} />
            </button>
            <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/6">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
