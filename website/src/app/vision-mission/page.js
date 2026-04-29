'use client';

import { CheckCircle2, Compass, Target } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

export default function VisionMission() {
  const { t } = useLanguage();

  return (
    <Layout>
      <PageHero
        title={t('visionMission')}
        image={getImageUrl('school-building.jpg') || '/images/school-building.jpg'}
        imageAlt="School"
      />

      <section className="section-spacing">
        <div className="section-container max-w-6xl">
          <ScrollReveal className="section-panel text-center" delay={90}>
            <SectionHeader
              kicker={t('visionMission')}
              title={`“${t('visionQuote')}”`}
              align="center"
              className="mb-4"
            />
            <p className="body-large">&ldquo;{t('visionQuoteEn')}&rdquo;</p>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ScrollReveal delay={120}>
              <div className="grid-card h-full">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-primary/12 text-primary">
                  <Target size={24} />
                </span>
                <h3 className="heading-sub mb-4">{t('ourGoal')}</h3>
                <p className="body-text">{t('goalDesc')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="grid-card h-full">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-secondary/12 text-secondary">
                  <Compass size={24} />
                </span>
                <h3 className="heading-sub mb-4">{t('ourPath')}</h3>
                <p className="body-text">{t('pathDesc')}</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="surface-card-strong mt-8 p-8 md:p-10" delay={180}>
            <h3 className="heading-sub mb-6">{t('qualityPolicy')}</h3>
            <ul className="grid gap-4">
              {[
                'qualityPolicy1',
                'qualityPolicy2',
                'qualityPolicy3',
                'qualityPolicy4',
                'qualityPolicy5',
              ].map((key) => (
                <li key={key} className="flex items-start gap-3 rounded-[1.25rem] border border-secondary/10 bg-secondary/5 px-4 py-4">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-secondary" />
                  <span className="body-text text-foreground/80">{t(key)}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="surface-card-strong mt-8 p-8 md:p-10" delay={220}>
            <h3 className="heading-sub mb-6">{t('ourFeatures')}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'feature1',
                'feature2',
                'feature3',
                'feature4',
                'feature5',
                'feature6',
                'feature7',
                'feature8',
                'feature9',
                'feature10',
                'feature11',
                'feature12',
                'feature13',
              ].map((key, index) => (
                <div key={key} className={`rounded-[1.35rem] border px-4 py-4 ${index % 3 === 0 ? 'border-primary/12 bg-primary/5' : index % 3 === 1 ? 'border-secondary/12 bg-secondary/5' : 'border-accent/25 bg-accent/10'}`}>
                  <p className="body-text text-foreground/80">{t(key)}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
