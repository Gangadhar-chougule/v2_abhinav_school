'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/imageUrls';

const staffMembers = [
  { name: 'à¤¸à¥Œ. à¤¸à¤‚à¤—à¤¿à¤¤à¤¾ à¤ªà¤¾à¤‚à¤¡à¥à¤°à¤‚à¤— à¤—à¤¾à¤¯à¤•à¤µà¤¾à¤¡', role: 'à¤ªà¥à¤°.à¤®à¥à¤–à¥à¤¯à¤¾. (Head Teacher)', phone: '9665410264' },
  { name: 'à¤¶à¥à¤°à¥€. à¤¸à¤‚à¤­à¤¾à¤œà¥€ à¤œà¤—à¤¨à¥à¤¨à¤¾à¤¥ à¤¸à¤¾à¤³à¥à¤‚à¤–à¥‡', role: 'à¤µà¤¿. à¤¶à¤¿à¤•à¥à¤·à¤• (Special Teacher)', phone: '9373131363' },
  { name: 'à¤¶à¥à¤°à¥€ à¤®à¤¾à¤°à¥‚à¤¤à¥€ à¤¶à¥à¤°à¥€à¤ªà¤¤à¥€ à¤µà¤¾à¤˜à¤®à¥‹à¤¡à¥‡', role: 'à¤µà¤¿. à¤¶à¤¿à¤•à¥à¤·à¤• (Special Teacher)', phone: '9665653285' },
  { name: 'à¤•à¥. à¤…à¤¶à¥à¤µà¤¿à¤¨à¥€ à¤¸à¤‚à¤¤à¥‹à¤· à¤•à¥à¤²à¤•à¤°à¥à¤£à¥€', role: 'à¤µà¤¿. à¤¶à¤¿à¤•à¥à¤·à¤¿à¤•à¤¾ (Special Teacher)', phone: '9960840546' },
  { name: 'à¤¶à¥à¤°à¥€. à¤¸à¥à¤¹à¤¾à¤¸ à¤µà¤¸à¤‚à¤¤à¤°à¤¾à¤µ à¤•à¤¦à¤®', role: 'à¤•à¤²à¤¾ à¤¶à¤¿à¤•à¥à¤·à¤• (Art Teacher)', phone: '9527941925' },
  { name: 'à¤¸à¥Œ à¤†à¤¶à¤¾à¤°à¤¾à¤£à¥€ à¤‰à¤¤à¥à¤¤à¤®à¤°à¤¾à¤µ à¤¶à¤¿à¤‚à¤¦à¥‡', role: 'à¤µà¥à¤¸à¤¤à¤¿à¤—à¥ƒà¤¹ à¤…à¤§à¤¿à¤•à¥à¤·à¤¿à¤•à¤¾ (Hostel Warden)', phone: '9850665078' },
  { name: 'à¤¸à¥Œ. à¤…à¤°à¥‚à¤£à¤¾ à¤¨à¤¿à¤µà¥ƒà¤¤à¥à¤¤à¥€ à¤¶à¤¿à¤£à¤—à¤¾à¤°à¥‡', role: 'à¤ªà¤°à¤¿à¤šà¤¾à¤°à¥€à¤•à¤¾ (Caretaker)', phone: '7397913963' },
  { name: 'à¤¶à¥à¤°à¥€. à¤°à¤µà¤¿à¤‚à¤¦à¥à¤° à¤µà¤¸à¤‚à¤¤à¤°à¤¾à¤µ à¤®à¥‹à¤°à¥‡', role: 'à¤®à¤¾à¤¨à¤¸à¤¶à¤¾à¤¸à¥à¤¤à¥à¤°à¤œà¥à¤ž (Psychologist)', phone: '989074075' },
  { name: 'à¤¶à¥à¤°à¥€. à¤¹à¤¿à¤®à¥à¤®à¤¤ à¤¸à¤°à¥à¤œà¥‡à¤°à¤¾à¤µ à¤¡à¤¾à¤‚à¤—à¥‡', role: 'à¤•à¤¾à¤³à¤œà¥€à¤µà¤¾à¤¹à¤• (Caretaker)', phone: '9970528898' },
  { name: 'à¤¶à¥à¤°à¥€. à¤¤à¤¨à¥à¤®à¤¯ à¤¤à¥à¤•à¤¾à¤°à¤¾à¤® à¤•à¥‹à¤¥à¤³à¤•à¤°', role: 'à¤•à¤¾à¤³à¤œà¥€à¤µà¤¾à¤¹à¤• (Caretaker)', phone: '9075011395' },
  { name: 'à¤¶à¥à¤°à¥€. à¤œà¥€à¤µà¤¨ à¤®à¤¹à¤¾à¤¦à¥‡à¤µ à¤ªà¤¾à¤Ÿà¥€à¤²', role: 'à¤°à¤¾à¤–à¤£à¤¦à¤¾à¤° (Watchman)', phone: '9309893582' },
  { name: 'à¤¶à¥à¤°à¥€. à¤²à¤•à¥à¤·à¥à¤®à¤£ à¤¤à¤¾à¤¯à¤¾à¤ªà¥à¤ªà¤¾ à¤®à¤¾à¤¨à¥‡', role: 'à¤¶à¤¿à¤ªà¤¾à¤ˆ (Peon)', phone: '9404004150' },
  { name: 'à¤¸à¥Œ. à¤¸à¥à¤®à¤¨ à¤°à¤˜à¥à¤¨à¤¾à¤¥ à¤–à¤¾à¤‚à¤¬à¥‡', role: 'à¤¸à¥à¤µà¤¯à¤‚à¤ªà¤¾à¤•à¥€à¤£ (Cook)', phone: '7517086888' },
  { name: 'à¤¸à¥Œ. à¤²à¤•à¥à¤·à¥à¤®à¥€ à¤­à¤¾à¤‰ à¤¸à¤¾à¤ à¥‡', role: 'à¤¸à¥à¤µà¤¯à¤‚à¤ªà¤¾à¤•à¥€à¤£ (Cook)', phone: '9665410264' },
  { name: 'à¤¶à¥à¤°à¥€. à¤¶à¥à¤°à¥€à¤§à¤° à¤¸à¤¤à¤¿à¤¶ à¤—à¥‹à¤°à¤¡', role: 'à¤¸à¤«à¤¾à¤ˆà¤—à¤¾à¤° (Sweeper)', phone: '9850079107' },
  { name: 'à¤¸à¥Œ. à¤µà¤¿à¤¦à¤¯à¤¾ à¤ªà¤¾à¤‚à¤¡à¥à¤°à¤‚à¤— à¤°à¤¾à¤µà¤£', role: 'à¤¸à¤«à¤¾à¤ˆà¤—à¤¾à¤° (Sweeper)', phone: '8380876229' },
  { name: 'à¤¶à¥à¤°à¥€. à¤µà¤¿à¤•à¤¾à¤¸ à¤¸à¤¾à¤¹à¥‡à¤¬à¤°à¤¾à¤µ à¤¡à¥à¤¬à¤²', role: 'à¤ªà¤¹à¤¾à¤°à¥‡à¤•à¤°à¥€ (Guard)', phone: '8766543303' },
];

export default function Staff() {
  const { t } = useLanguage();

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
                  {staffMembers.map((member, index) => (
                    <tr key={`${member.phone}-${index}`} className="border-b border-border/70 bg-white/70 hover:bg-secondary/6">
                      <td className="px-4 py-4 text-sm font-medium text-muted-foreground">{index + 1}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-foreground">{member.name}</td>
                      <td className="px-4 py-4 text-sm text-foreground/70">{member.role}</td>
                      <td className="px-4 py-4 text-sm">
                        <a href={`tel:${member.phone}`} className="font-medium text-primary hover:text-secondary hover:underline">
                          {member.phone}
                        </a>
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
