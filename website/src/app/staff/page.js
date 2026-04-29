'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import Layout from '@/components/Layout';
import EmptyState from '@/components/EmptyState';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { StaffTableSkeleton } from '@/components/LoadingSkeletons';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

export default function Staff() {
  const { t } = useLanguage();
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/staff');
        const result = await response.json();
        if (response.ok && result.success) {
          setStaffMembers((result.data || []).filter((member) => member.isActive !== false));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <PageHero title={t('staffTitle')} description={t('staffDesc')} />

      <section className="section-spacing">
        <div className="section-container">
          <ScrollReveal className="surface-card-strong overflow-hidden" delay={100}>
            <div className="relative h-72 md:h-[30rem]">
              <Image
                src={getImageUrl('staff-group.png') || '/images/staff-group.png'}
                alt="Staff Group Photo"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal className="table-shell mt-8" delay={150}>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em]">{t('srNo')}</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em]">{t('staffName')}</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em]">{t('position')}</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em]">{t('mobile')}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <StaffTableSkeleton rows={6} />
                  ) : staffMembers.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6" colSpan={4}>
                        <EmptyState
                          icon={Users}
                          title={t('ourStaff')}
                          description="No staff members found."
                          className="max-w-2xl"
                        />
                      </td>
                    </tr>
                  ) : staffMembers.map((member, index) => (
                    <tr key={`${member.phone}-${index}`} className="border-b border-border/70 bg-white/70 hover:bg-secondary/6">
                      <td className="px-4 py-4 text-sm font-medium text-muted-foreground">{index + 1}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-foreground">{member.name}</td>
                      <td className="px-4 py-4 text-sm text-foreground/70">{member.role}</td>
                      <td className="px-4 py-4 text-sm">
                        {member.phone ? (
                          <a href={`tel:${member.phone}`} className="font-medium text-primary hover:text-secondary hover:underline">
                            {member.phone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
