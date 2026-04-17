'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Users,
  Calendar,
  Award
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

      {/* Stats / Features Strip */}
      <section className="relative z-20 -mt-12 sm:-mt-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: t('specialEducation'), icon: GraduationCap },
              { label: t('comprehensiveTherapy'), icon: HeartHandshake },
              { label: t('guidanceCounseling'), icon: ShieldCheck },
              { label: t('vocationalTraining'), icon: Sparkles },
            ].map((item, index) => (
              <ScrollReveal 
                key={index} 
                delay={index * 100} 
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <item.icon size={24} />
                </div>
                <span className="text-sm font-bold text-slate-900 leading-tight">{item.label}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="relative" delay={100}>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={getImageUrl('school-corridor.jpg') || '/images/school-corridor.jpg'}
                  alt="School environment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">ISO</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Certified School</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <span className="section-kicker">{t('aboutUs')}</span>
              <h2 className="heading-section mb-6 text-slate-900">{t('aboutSection')}</h2>
              <p className="body-large mb-6">{t('aboutDesc1')}</p>
              <p className="body-text mb-8">{t('aboutDesc2')}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="button-primary">
                  {t('learnMore')} <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="button-secondary">
                  {t('contactUs')}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing bg-slate-50">
        <div className="section-container">
          <ScrollReveal className="text-center mb-16" delay={100}>
            <span className="section-kicker">{t('ourServices')}</span>
            <h2 className="heading-section text-slate-900">{t('ourServices')}</h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {[
              { title: t('specialEducation'), titleEn: 'Special Education', desc: t('specialEducationDesc') },
              { title: t('comprehensiveTherapy'), titleEn: 'Comprehensive Therapy', desc: t('comprehensiveTherapyDesc') },
              { title: t('guidanceCounseling'), titleEn: 'Guidance & Counseling', desc: t('guidanceCounselingDesc') },
              { title: t('vocationalTraining'), titleEn: 'Vocational Training', desc: t('vocationalTrainingDesc') },
            ].map((item, index) => {
              const Icon = serviceIcons[index];
              return (
                <ScrollReveal key={index} delay={150 + index * 100}>
                  <div className="surface-card p-10 h-full group">
                    <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <Icon size={28} />
                    </div>
                    <h3 className="heading-sub mb-3 text-slate-900">{item.title}</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">{item.titleEn}</p>
                    <p className="body-text">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activities Highlight */}
      <section className="section-spacing">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <ScrollReveal delay={100}>
              <span className="section-kicker">{t('schoolActivities')}</span>
              <h2 className="heading-section text-slate-900">{t('schoolActivities')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link href="/events" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                {t('viewAllEvents')} <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: t('treePlanting'),
                desc: t('treePlantingDesc'),
                image: getImageUrl('tree-planting.jpg') || '/images/tree-planting.jpg',
                icon: Calendar,
              },
              {
                title: t('educationalTrip'),
                desc: t('educationalTripDesc'),
                image: getImageUrl('educational-trip.jpg') || '/images/educational-trip.jpg',
                icon: Users,
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={150 + index * 100}>
                <article className="surface-card overflow-hidden h-full group">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                      <item.icon size={16} />
                      {t('activity')}
                    </div>
                    <h3 className="heading-sub mb-4 text-slate-900 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="body-text line-clamp-3">{item.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing">
        <div className="section-container">
          <ScrollReveal className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden" delay={100}>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mb-8">
                {t('contactUs')}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
                {t('contactDesc')}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="button-accent px-8 py-4 text-base">
                  {t('getInTouch')} <ArrowRight size={20} />
                </Link>
                <Link href="/admissions" className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 rounded-lg font-bold transition-all backdrop-blur-sm">
                  {t('applyNow')}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
