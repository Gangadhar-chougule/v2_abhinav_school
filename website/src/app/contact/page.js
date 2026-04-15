'use client';

import { Phone, MapPin, MessageCircle, Mail } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const contacts = [
  { name: 'श्री. रविंद्र वसंतराव मोरे', role: 'मानसशास्त्रज्ञ (Psychologist)', phone: '989074075' },
  { name: 'श्री. संभाजी जगन्नाथ साळुंखे', role: 'वि. शिक्षक (Special Teacher)', phone: '9373131363' },
  { name: 'सौ. संगिता पांडुरंग गायकवाड', role: 'प्र.मुख्या. (Head Teacher)', phone: '9665410264' },
  { name: 'सौ. आशाराणी उत्तमराव शिंदे', role: 'व्सतिगृह अधिक्षिका (Hostel Warden)', phone: '9850665078' },
];

const adpsContacts = [
  { phone: '9922121619' },
  { phone: '9096731749' },
  { phone: '9730420843' },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="section-spacing">
        <div className="section-container max-w-3xl">
          <h1 className="heading-display text-center mb-4">{t('contactTitle')}</h1>
          <p className="body-large text-center max-w-2xl mx-auto mb-16">
            {t('contactDesc')}
          </p>

          {/* ADPS Contact Info */}
          <div className="border border-border rounded-md p-8 mb-12">
            <h2 className="heading-section mb-6">{t('adpsContact')}</h2>
            <div className="flex flex-col gap-4 mb-6">
              {adpsContacts.map((c, i) => (
                <a
                  key={i}
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone size={16} />
                  (+91) {c.phone}
                </a>
              ))}
              <a
                href="mailto:adpsashta@gmail.com"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail size={16} />
                adpsashta@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 shrink-0" size={24} />
              <div>
                <h3 className="heading-sub mb-2">{t('schoolAddress')}</h3>
                <p className="body-text">
                  Annasaheb Dange Public School & JR. College,<br />
                  Ashta, Tal-Walwa, Dist-Sangli,<br />
                  Maharashtra
                </p>
              </div>
            </div>
          </div>

          {/* Contact Cards */}
          <h2 className="heading-section mb-8">{t('contactFor')}</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contacts.map((c, i) => (
              <div key={i} className="border border-border rounded-md p-6 hover:border-primary/30 transition-colors">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.role}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone size={14} />
                    {c.phone}
                  </a>
                  <a
                    href={`https://wa.me/91${c.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Email note */}
          <div className="bg-secondary rounded-md p-8 text-center">
            <Phone className="mx-auto mb-4 text-primary" size={32} />
            <h3 className="heading-sub mb-2">{t('visitOrCall')}</h3>
            <p className="body-text">
              {t('contactInfo')}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
