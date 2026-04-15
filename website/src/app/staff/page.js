'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const staffMembers = [
  { name: 'सौ. संगिता पांडुरंग गायकवाड', role: 'प्र.मुख्या. (Head Teacher)', phone: '9665410264' },
  { name: 'श्री. संभाजी जगन्नाथ साळुंखे', role: 'वि. शिक्षक (Special Teacher)', phone: '9373131363' },
  { name: 'श्री मारूती श्रीपती वाघमोडे', role: 'वि. शिक्षक (Special Teacher)', phone: '9665653285' },
  { name: 'कु. अश्विनी संतोष कुलकर्णी', role: 'वि. शिक्षिका (Special Teacher)', phone: '9960840546' },
  { name: 'श्री. सुहास वसंतराव कदम', role: 'कला शिक्षक (Art Teacher)', phone: '9527941925' },
  { name: 'सौ आशाराणी उत्तमराव शिंदे', role: 'व्सतिगृह अधिक्षिका (Hostel Warden)', phone: '9850665078' },
  { name: 'सौ. अरूणा निवृत्ती शिणगारे', role: 'परिचारीका (Caretaker)', phone: '7397913963' },
  { name: 'श्री. रविंद्र वसंतराव मोरे', role: 'मानसशास्त्रज्ञ (Psychologist)', phone: '989074075' },
  { name: 'श्री. हिम्मत सर्जेराव डांगे', role: 'काळजीवाहक (Caretaker)', phone: '9970528898' },
  { name: 'श्री. तन्मय तुकाराम कोथळकर', role: 'काळजीवाहक (Caretaker)', phone: '9075011395' },
  { name: 'श्री. जीवन महादेव पाटील', role: 'राखणदार (Watchman)', phone: '9309893582' },
  { name: 'श्री. लक्ष्मण तायाप्पा माने', role: 'शिपाई (Peon)', phone: '9404004150' },
  { name: 'सौ. सुमन रघुनाथ खांबे', role: 'स्वयंपाकीण (Cook)', phone: '7517086888' },
  { name: 'सौ. लक्ष्मी भाउ साठे', role: 'स्वयंपाकीण (Cook)', phone: '9665410264' },
  { name: 'श्री. श्रीधर सतिश गोरड', role: 'सफाईगार (Sweeper)', phone: '9850079107' },
  { name: 'सौ. विदया पांडुरंग रावण', role: 'सफाईगार (Sweeper)', phone: '8380876229' },
  { name: 'श्री. विकास साहेबराव डुबल', role: 'पहारेकरी (Guard)', phone: '8766543303' },
];

export default function Staff() {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="section-spacing">
        <div className="section-container">
          <h1 className="heading-display text-center mb-4">{t('staffTitle')}</h1>
          <p className="body-large text-center max-w-2xl mx-auto mb-12">
            {t('staffDesc')}
          </p>

          {/* Group Photo */}
          <div className="mb-16">
            <div className="relative w-full h-96">
              <Image
                src="/images/staff-group.png"
                alt="Staff Group Photo"
                fill
                className="object-cover rounded-md"
                loading="lazy"
              />
            </div>
          </div>

          {/* Staff Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-3 px-4 font-heading text-lg font-semibold text-foreground">{t('srNo')}</th>
                  <th className="text-left py-3 px-4 font-heading text-lg font-semibold text-foreground">{t('staffName')}</th>
                  <th className="text-left py-3 px-4 font-heading text-lg font-semibold text-foreground">{t('position')}</th>
                  <th className="text-left py-3 px-4 font-heading text-lg font-semibold text-foreground">{t('mobile')}</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((member, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{member.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{member.role}</td>
                    <td className="py-3 px-4">
                      <a href={`tel:${member.phone}`} className="text-sm text-primary hover:underline">
                        {member.phone}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
