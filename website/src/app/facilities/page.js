'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const facilities = [
  {
    titleKey: 'spaciousBuilding',
    titleEn: 'Spacious & Well-Equipped Building',
    descKey: 'spaciousBuildingDesc',
    image: '/images/school-building.jpg',
  },
  {
    titleKey: 'schoolCampus',
    titleEn: 'School Campus',
    descKey: 'schoolCampusDesc',
    image: '/images/school-corridor.jpg',
  },
  {
    titleKey: 'physicalInfrastructure',
    titleEn: 'Physical Infrastructure',
    descKey: 'physicalInfrastructureDesc',
    image: '/images/water-facility.jpg',
  },
];

export default function Facilities() {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="section-spacing">
        <div className="section-container">
          <h1 className="heading-display text-center mb-4">{t('facilitiesTitle')}</h1>
          <p className="body-large text-center max-w-2xl mx-auto mb-16">
            {t('facilitiesDesc')}
          </p>

          <div className="space-y-16">
            {facilities.map((f, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                <div className="md:w-1/2">
                  <div className="relative w-full h-72">
                    <Image
                      src={f.image}
                      alt={f.titleEn}
                      fill
                      className="object-cover rounded-md"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="heading-sub mb-1">{t(f.titleKey)}</h2>
                  <p className="text-sm text-primary font-medium mb-3">{f.titleEn}</p>
                  <p className="body-text">{t(f.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-border rounded-md p-8 text-center">
            <h3 className="heading-sub mb-4">{t('additionalFacilities')}</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                t('healthCheckups'),
                t('educationalTrips'),
                t('treePlantingProgram'),
                t('schoolCelebrations'),
                t('vocationalSkills'),
                t('parentCounseling'),
              ].map((item, i) => (
                <div key={i} className="p-4 bg-secondary rounded-md">
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
