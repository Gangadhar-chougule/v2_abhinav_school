'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

const serviceIcons = [GraduationCap, HeartHandshake, ShieldCheck, Sparkles];

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      <PageHero
        title={t('homeTitle')}
        description={t('homeDesc')}
        image={getImageUrl('school-building.jpg') || '/images/school-building.jpg'}
        imageAlt="School campus"
        size="large"
      />

      <section className="-mt-28 relative z-20 px-5 pb-6 sm:px-6 lg:px-8">
        <div className="section-container">
          <div className="hero-glass mx-auto max-w-5xl">
            <ScrollReveal className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]" delay={80}>
              <div>
                <span className="section-kicker text-white/90 bg-white/10 border-white/20 shadow-none">
                  {t('homeSanskrit')}
                </span>
                <p className="body-large max-w-2xl text-white/88">{t('homeDesc')}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/about" className="button-accent">
                    {t('learnMore')} <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact" className="button-secondary">
                    {t('contactUs')}
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  t('specialEducation'),
                  t('comprehensiveTherapy'),
                  t('guidanceCounseling'),
                  t('vocationalTraining'),
                ].map((item, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <div key={item} className="rounded-[1.5rem] border border-white/18 bg-white/10 p-5 text-white backdrop-blur-md">
                      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/16 text-accent">
                        <Icon size={20} />
                      </span>
                      <p className="text-base font-semibold leading-7">{item}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-container">
          <ScrollReveal className="section-panel text-center" delay={90}>
            <span className="section-kicker">{t('aboutUs')}</span>
            <h2 className="heading-section mb-6">{t('aboutSection')}</h2>
            <p className="body-large mx-auto max-w-3xl">{t('aboutDesc1')}</p>
            <p className="body-text mx-auto mt-4 max-w-3xl">{t('aboutDesc2')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-container pb-8 md:pb-12">
        <ScrollReveal className="surface-card-strong overflow-hidden" delay={110}>
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[320px] lg:min-h-[440px]">
              <Image
                src={getImageUrl('school-corridor.jpg') || '/images/school-corridor.jpg'}
                alt="School corridor"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
              <span className="section-kicker">
                <Leaf size={14} />
                {t('schoolActivities')}
              </span>
              <h2 className="heading-section mb-5">{t('ourServices')}</h2>
              <p className="body-large">{t('specialEducationDesc')}</p>
              <p className="body-text mt-4">{t('guidanceCounselingDesc')}</p>
              <div className="mt-8">
                <Link href="/facilities" className="button-primary">
                  {t('facilities')} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="section-spacing">
        <div className="section-container">
          <ScrollReveal className="text-center" delay={100}>
            <span className="section-kicker">{t('ourServices')}</span>
            <h2 className="heading-section mb-4">{t('ourServices')}</h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { title: t('specialEducation'), titleEn: 'Special Education', desc: t('specialEducationDesc') },
              { title: t('comprehensiveTherapy'), titleEn: 'Comprehensive Therapy', desc: t('comprehensiveTherapyDesc') },
              { title: t('guidanceCounseling'), titleEn: 'Guidance & Counseling', desc: t('guidanceCounselingDesc') },
              { title: t('vocationalTraining'), titleEn: 'Vocational Training', desc: t('vocationalTrainingDesc') },
            ].map((item, index) => {
              const Icon = serviceIcons[index];
              return (
                <ScrollReveal key={item.titleEn} delay={120 + index * 80}>
                  <div className="grid-card h-full">
                    <div className="relative z-10">
                      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-primary/14 via-secondary/14 to-accent/18 text-secondary">
                        <Icon size={24} />
                      </span>
                      <h3 className="heading-sub mb-2">{item.title}</h3>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">{item.titleEn}</p>
                      <p className="body-text mt-4">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white/45">
        <div className="section-container">
          <ScrollReveal className="text-center" delay={100}>
            <span className="section-kicker">{t('schoolActivities')}</span>
            <h2 className="heading-section mb-4">{t('schoolActivities')}</h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: t('treePlanting'),
                desc: t('treePlantingDesc'),
                image: getImageUrl('tree-planting.jpg') || '/images/tree-planting.jpg',
                icon: Leaf,
              },
              {
                title: t('educationalTrip'),
                desc: t('educationalTripDesc'),
                image: getImageUrl('educational-trip.jpg') || '/images/educational-trip.jpg',
                icon: Sparkles,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={130 + index * 80}>
                  <article className="surface-card-strong group overflow-hidden">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 md:p-8">
                      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon size={22} />
                      </span>
                      <h3 className="heading-sub mb-3">{item.title}</h3>
                      <p className="body-text">{item.desc}</p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-container">
          <ScrollReveal className="section-panel text-center" delay={100}>
            <span className="section-kicker">{t('contactUs')}</span>
            <h2 className="heading-section mb-5">{t('contactUs')}</h2>
            <p className="body-large mx-auto max-w-2xl">{t('contactDesc')}</p>
            <div className="mt-8">
              <Link href="/contact" className="button-primary">
                {t('getInTouch')} <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
