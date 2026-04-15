'use client';

import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Events() {
  const { t } = useLanguage();

  return (
    <Layout>
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[30vh] md:h-[40vh] overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                {t('eventsTitle')}
              </h1>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto">
                {t('eventsDesc')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
            {t('upcomingEvents')}
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <Calendar size={48} className="mx-auto text-primary/50 mb-4" />
              <p className="text-muted-foreground text-lg">
                {t('noEvents')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
