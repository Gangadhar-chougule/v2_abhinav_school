'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import EmptyState from '@/components/EmptyState';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { EventsListSkeleton } from '@/components/LoadingSkeletons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Events() {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/events');
        const result = await response.json();
        if (response.ok && result.success) {
          setEvents((result.data || []).filter((event) => event.isActive !== false));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <PageHero title={t('eventsTitle')} description={t('eventsDesc')} />

      <section className="section-spacing">
        <div className="section-container max-w-4xl">
          <ScrollReveal className="section-panel" delay={100}>
            <SectionHeader kicker={t('upcomingEvents')} title={t('upcomingEvents')} className="mb-6" />

            {loading ? (
              <EventsListSkeleton count={3} />
            ) : events.length === 0 ? (
              <EmptyState icon={Calendar} title={t('upcomingEvents')} description={t('noEvents')} />
            ) : (
              <div className="grid gap-6">
                {events.map((event) => (
                  <article key={event._id} className="surface-card overflow-hidden">
                    {event.image ? (
                      <div className="relative h-56 w-full">
                        <Image src={event.image} alt={event.title} fill className="object-cover" sizes="100vw" />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <h3 className="heading-sub text-slate-900">{event.title}</h3>
                      <p className="meta-text mt-2">
                        {event.date ? new Date(event.date).toLocaleDateString() : '-'}
                        {event.location ? ` • ${event.location}` : ''}
                      </p>
                      {event.description ? <p className="body-text mt-4">{event.description}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
