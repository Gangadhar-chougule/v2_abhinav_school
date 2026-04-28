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
        // Resolve image via helper so it can come from Cloudinary mapping or the bundled public images
        // Pass an array so the hero shows a subtle slideshow between two campus images
        image={[getImageUrl('school-building.jpg') || '/images/school-building.jpg', getImageUrl('unnamed (11).webp') || '/images/unnamed (11).webp']}
        imageAlt="School campus"
        size="large"
      />

      {/* Stats / Features Strip */}
      <section className="relative z-20 -mt-10 sm:-mt-14">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { label: t('specialEducation'), icon: GraduationCap },
              { label: t('comprehensiveTherapy'), icon: HeartHandshake },
              { label: t('guidanceCounseling'), icon: ShieldCheck },
              { label: t('vocationalTraining'), icon: Sparkles },
            ].map((item, index) => (
              <ScrollReveal 
                key={index} 
                delay={index * 100} 
                className="bg-white p-5 md:p-6 rounded-xl shadow-md flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform"
              >
                <div className="h-11 w-11 rounded-lg bg-primary text-white flex items-center justify-center shadow-md">
                  <item.icon size={22} />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-900 leading-tight">{item.label}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal className="relative" delay={100}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={getImageUrl('school-corridor.jpg')}
                  alt="School environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-5 md:p-6 rounded-xl shadow-lg border border-slate-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">ISO</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Certified School</p>
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
          <ScrollReveal className="text-center mb-12" delay={100}>
            <span className="section-kicker">{t('ourServices')}</span>
            <h2 className="heading-section text-slate-900">{t('ourServices')}</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: t('specialEducation'), titleEn: 'Special Education', desc: t('specialEducationDesc') },
              { title: t('comprehensiveTherapy'), titleEn: 'Comprehensive Therapy', desc: t('comprehensiveTherapyDesc') },
              { title: t('guidanceCounseling'), titleEn: 'Guidance & Counseling', desc: t('guidanceCounselingDesc') },
              { title: t('vocationalTraining'), titleEn: 'Vocational Training', desc: t('vocationalTrainingDesc') },
            ].map((item, index) => {
              const Icon = serviceIcons[index];
              return (
                <ScrollReveal key={index} delay={150 + index * 100}>
                  <div className="surface-card p-8 h-full group hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="heading-sub mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">{item.titleEn}</p>
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10 md:mb-12">
            <ScrollReveal delay={100}>
              <span className="section-kicker">{t('schoolActivities')}</span>
              <h2 className="heading-section text-slate-900">{t('schoolActivities')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link href="/events" className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm">
                {t('viewAllEvents')} <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: t('treePlanting'),
                desc: t('treePlantingDesc'),
                image: getImageUrl('tree-planting.jpg'),
                icon: Calendar,
              },
              {
                title: t('educationalTrip'),
                desc: t('educationalTripDesc'),
                image: getImageUrl('educational-trip.jpg'),
                icon: Users,
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={150 + index * 100}>
                <article className="surface-card overflow-hidden h-full group">
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                      <item.icon size={14} />
                      {t('activity')}
                    </div>
                    <h3 className="heading-sub mb-3 text-slate-900 group-hover:text-primary transition-colors">{item.title}</h3>
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
