'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] overflow-hidden">
        <Image src="/images/school-building.jpg" alt="School" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="section-container">
            <h1 className="heading-display text-primary-foreground">{t('aboutUs')}</h1>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-container max-w-3xl">
          <h2 className="heading-section mb-6">{t('ourStory')}</h2>
          <div className="space-y-6">
            <p className="body-large">
              {t('storyDesc1')}
            </p>
            <p className="body-text">
              {t('storySanskrit')}
            </p>
            <p className="body-text">
              {t('storyDesc2')}
            </p>
            <p className="body-text">
              {t('storyDesc3')}
            </p>

            <h3 className="heading-sub mt-12 mb-4">{t('underGuidance')}</h3>
            <ul className="space-y-3">
              {[
                t('guidance1'),
                t('guidance2'),
                t('guidance3'),
                t('guidance4'),
                t('guidance5'),
              ].map((item, i) => (
                <li key={i} className="body-text flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="heading-sub mt-12 mb-4">{t('achievements')}</h3>
            <p className="body-text">
              {t('achievementDesc1')}
            </p>
            <p className="body-text">
              {t('achievementDesc2')}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
