'use client';

import { CheckCircle2 } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      <PageHero
        title={t('aboutUs')}
        image={getImageUrl('school-building.jpg') || '/images/school-building.jpg'}
        imageAlt="School"
      />

      <section className="section-spacing">
        <div className="section-container max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <ScrollReveal className="section-panel" delay={90}>
              <SectionHeader kicker={t('ourStory')} title={t('ourStory')} className="mb-6" />
              <div className="space-y-5">
                <p className="body-large">{t('storyDesc1')}</p>
                <p className="body-text">{t('storySanskrit')}</p>
                <p className="body-text">{t('storyDesc2')}</p>
                <p className="body-text">{t('storyDesc3')}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="surface-card-strong p-8 md:p-10" delay={140}>
              <SectionHeader kicker={t('achievements')} title={t('achievements')} titleTag="h3" className="mb-5" />
              <p className="body-text">{t('achievementDesc1')}</p>
              <p className="body-text mt-4">{t('achievementDesc2')}</p>
            </ScrollReveal>
          </div>

          <ScrollReveal className="surface-card-strong mt-8 p-8 md:p-10" delay={160}>
            <h3 className="heading-sub mb-6">{t('underGuidance')}</h3>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                t('guidance1'),
                t('guidance2'),
                t('guidance3'),
                t('guidance4'),
                t('guidance5'),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-primary/10 bg-primary/5 px-4 py-4">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" />
                  <span className="body-text text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
