'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VisionMission() {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="relative h-[40vh] overflow-hidden">
        <Image src="/images/school-building.jpg" alt="School" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="section-container">
            <h1 className="heading-display text-primary-foreground">{t('visionMission')}</h1>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="heading-section text-4xl md:text-5xl mb-4">&ldquo;{t('visionQuote')}&rdquo;</h2>
            <p className="text-xl text-muted-foreground">&ldquo;{t('visionQuoteEn')}&rdquo;</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="border border-border rounded-md p-8">
              <h3 className="heading-sub mb-4">{t('ourGoal')}</h3>
              <p className="body-text">{t('goalDesc')}</p>
            </div>

            <div className="border border-border rounded-md p-8">
              <h3 className="heading-sub mb-4">{t('ourPath')}</h3>
              <p className="body-text">{t('pathDesc')}</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="heading-section mb-6">{t('qualityPolicy')}</h3>
            <ul className="space-y-4">
              {[
                'qualityPolicy1',
                'qualityPolicy2',
                'qualityPolicy3',
                'qualityPolicy4',
                'qualityPolicy5',
              ].map((key, i) => (
                <li key={i} className="body-text flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="heading-section mb-6">{t('ourFeatures')}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              ].map((key, i) => (
                <div key={i} className="border border-border rounded-md p-4">
                  <p className="body-text">{t(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}