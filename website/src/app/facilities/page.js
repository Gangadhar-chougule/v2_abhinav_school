'use client';

import Image from 'next/image';
import { Building2, Droplets, Trees } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

const facilities = [
  {
    titleKey: 'spaciousBuilding',
    titleEn: 'Spacious & Well-Equipped Building',
    descKey: 'spaciousBuildingDesc',
    image: getImageUrl('school-building.jpg') || '/images/school-building.jpg',
    icon: Building2,
  },
  {
    titleKey: 'schoolCampus',
    titleEn: 'School Campus',
    descKey: 'schoolCampusDesc',
    image: getImageUrl('school-corridor.jpg') || '/images/school-corridor.jpg',
    icon: Trees,
  },
  {
    titleKey: 'physicalInfrastructure',
    titleEn: 'Physical Infrastructure',
    descKey: 'physicalInfrastructureDesc',
    image: getImageUrl('water-facility.jpg') || '/images/water-facility.jpg',
    icon: Droplets,
  },
];

export default function Facilities() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Use green ribbon hero for facilities and apply facility-specific tuning */}
      <PageHero title={t('facilitiesTitle')} description={t('facilitiesDesc')} image={null} className="hero-facilities" />

      <section className="section-spacing">
        <div className="section-container">
          <div className="space-y-8">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <ScrollReveal key={facility.titleEn} delay={90 + index * 70}>
                  <article className="surface-card-strong overflow-hidden">
                    <div className={`grid items-center gap-0 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                      <div className="relative min-h-[280px] md:min-h-[360px]">
                        <Image
                          src={facility.image}
                          alt={facility.titleEn}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-8 md:p-10 lg:p-12">
                        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-primary/14 via-secondary/14 to-accent/18 text-secondary">
                          <Icon size={24} />
                        </span>
                        <h2 className="heading-sub mb-2">{t(facility.titleKey)}</h2>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">{facility.titleEn}</p>
                        <p className="body-text mt-5">{t(facility.descKey)}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal className="surface-card-strong mt-10 p-8 text-center md:p-10" delay={180}>
            <h3 className="heading-sub mb-6">{t('additionalFacilities')}</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                t('healthCheckups'),
                t('educationalTrips'),
                t('treePlantingProgram'),
                t('schoolCelebrations'),
                t('vocationalSkills'),
                t('parentCounseling'),
              ].map((item, index) => (
                <div key={item} className={`rounded-[1.25rem] px-4 py-5 text-sm font-medium ${index % 3 === 0 ? 'bg-primary/8 text-primary' : index % 3 === 1 ? 'bg-secondary/8 text-secondary' : 'bg-accent/16 text-foreground'}`}>
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
