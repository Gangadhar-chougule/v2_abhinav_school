'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/images/school-building.jpg"
          alt="School campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
        <div className="relative z-10 h-full flex items-center">
          <div className="section-container">
            <p className="text-primary-foreground/90 font-body text-sm md:text-base tracking-widest uppercase mb-4 animate-fade-in drop-shadow-lg">
              {t('homeSanskrit')}
            </p>
            <h1 className="heading-display text-primary-foreground mb-6 animate-fade-in drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
              {t('homeTitle')}
            </h1>
            <p className="body-large text-primary-foreground/95 max-w-xl mb-8 animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
              {t('homeDesc')}
            </p>
            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium rounded-md hover:bg-primary/90 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                {t('learnMore')} <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground/60 text-primary-foreground px-6 py-3 text-sm font-medium rounded-md hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all backdrop-blur-sm"
              >
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="section-spacing">
        <div className="section-container text-center">
          <h2 className="heading-section mb-6">{t('aboutSection')}</h2>
          <p className="body-large max-w-2xl mx-auto mb-4">
            {t('aboutDesc1')}
          </p>
          <p className="body-text max-w-2xl mx-auto">
            {t('aboutDesc2')}
          </p>
        </div>
      </section>

      {/* Image Break */}
      <section className="w-full">
        <div className="relative w-full h-[40vh] md:h-[50vh]">
          <Image
            src="/images/school-corridor.jpg"
            alt="School corridor"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Key Features */}
      <section className="section-spacing">
        <div className="section-container">
          <h2 className="heading-section text-center mb-12">{t('ourServices')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: t('specialEducation'), titleEn: 'Special Education', desc: t('specialEducationDesc') },
              { title: t('comprehensiveTherapy'), titleEn: 'Comprehensive Therapy', desc: t('comprehensiveTherapyDesc') },
              { title: t('guidanceCounseling'), titleEn: 'Guidance & Counseling', desc: t('guidanceCounselingDesc') },
              { title: t('vocationalTraining'), titleEn: 'Vocational Training', desc: t('vocationalTrainingDesc') },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-background hover:-translate-y-1"
              >
                <h3 className="heading-sub mb-1">{item.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{item.titleEn}</p>
                <p className="body-text">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="section-spacing bg-secondary">
        <div className="section-container">
          <h2 className="heading-section text-center mb-12">{t('schoolActivities')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-background">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/images/tree-planting.jpg"
                  alt={t('treePlanting')}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sub mb-2">{t('treePlanting')}</h3>
                <p className="body-text">{t('treePlantingDesc')}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-background">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/images/educational-trip.jpg"
                  alt={t('educationalTrip')}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sub mb-2">{t('educationalTrip')}</h3>
                <p className="body-text">{t('educationalTripDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="section-container text-center">
          <h2 className="heading-section mb-6">{t('contactUs')}</h2>
          <p className="body-large max-w-xl mx-auto mb-8">
            {t('contactDesc')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            {t('getInTouch')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
