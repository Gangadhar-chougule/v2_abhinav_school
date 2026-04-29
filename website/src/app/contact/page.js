'use client';

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';

const contacts = [
  { name: 'श्री. रविंद्र वसंतराव मोरे', role: 'मानसशास्त्रज्ञ (Psychologist)', phone: '989074075' },
  { name: 'श्री. संभाजी जगन्नाथ साळुंखे', role: 'वि. शिक्षक (Special Teacher)', phone: '9373131363' },
  { name: 'सौ. संगिता पांडुरंग गायकवाड', role: 'प्र.मुख्या. (Head Teacher)', phone: '9665410264' },
  { name: 'सौ. आशाराणी उत्तमराव शिंदे', role: 'व्सतिगृह अधिक्षिका (Hostel Warden)', phone: '9850665078' },
];

const adpsContacts = [{ phone: '9922121619' }, { phone: '9096731749' }, { phone: '9730420843' }];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <Layout>
      <PageHero title={t('contactTitle')} description={t('contactDesc')} />

      <section className="section-spacing">
        <div className="section-container max-w-3xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              title={t('contactTitle')}
              subtitle={t('contactDesc')}
              align="center"
              titleTag="h1"
              className="mb-16"
            />
          </ScrollReveal>

          <ScrollReveal className="surface-card-strong hover-lift p-8 mb-12" delay={100}>
            <SectionHeader kicker={t('adpsContact')} title={t('adpsContact')} titleTag="h2" className="mb-6" />
            <div className="flex flex-col gap-4 mb-6">
              {adpsContacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone size={16} />
                  (+91) {contact.phone}
                </a>
              ))}
              <a href="mailto:adpsashta@gmail.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail size={16} />
                adpsashta@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="heading-sub mb-2">{t('schoolAddress')}</h3>
                <p className="body-text">
                  Annasaheb Dange Public School & JR. College,<br />
                  Ashta, Tal-Walwa, Dist-Sangli,<br />
                  Maharashtra
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h2 className="heading-sub mb-8">For Contact</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contacts.map((contact, index) => (
              <ScrollReveal key={`${contact.phone}-${index}`} delay={index * 100}>
                <div className="contact-card card-touch border border-border rounded-md p-6 hover-lift">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{contact.role}</p>
                  <div className="flex flex-col gap-2">
                    <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                      <Phone size={14} />
                      {contact.phone}
                    </a>
                    <a
                      href={`https://wa.me/91${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="card-touch hover-lift bg-secondary/10 rounded-md p-8 text-center">
              <Phone className="mx-auto mb-4 text-primary pulse-icon" size={32} />
              <h3 className="heading-sub mb-2">{t('visitOrCall')}</h3>
              <p className="body-text">{t('contactInfo')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
