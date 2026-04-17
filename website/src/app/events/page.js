'use client';

import { Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Events() {
  const { t } = useLanguage();

  return (
    <Layout>
      <PageHero title={t('eventsTitle')} description={t('eventsDesc')} />

      <section className="section-spacing">
        <div className="section-container max-w-4xl">
          <ScrollReveal className="section-panel text-center" delay={100}>
            <span className="section-kicker">{t('upcomingEvents')}</span>
            <h2 className="heading-section mb-6">{t('upcomingEvents')}</h2>
            <div className="mx-auto flex max-w-xl flex-col items-center rounded-[1.75rem] border border-secondary/10 bg-white/80 px-6 py-10 shadow-[0_18px_40px_rgba(33,150,243,0.08)]">
              <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-secondary/10 text-secondary">
                <Calendar size={30} />
              </span>
              <p className="body-large">{t('noEvents')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
