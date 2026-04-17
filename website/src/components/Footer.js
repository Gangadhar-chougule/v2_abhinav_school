'use client';

import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { to: '/', labelKey: 'home' },
  { to: '/about', labelKey: 'aboutUs' },
  { to: '/admissions', labelKey: 'admissions' },
  { to: '/events', labelKey: 'events' },
  { to: '/facilities', labelKey: 'facilities' },
  { to: '/staff', labelKey: 'ourStaff' },
  { to: '/gallery', labelKey: 'gallery' },
  { to: '/contact', labelKey: 'contact' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#164e63_42%,#1b5e20_100%)]" />
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />

      <div className="section-container relative z-10 py-14 md:py-18">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="surface-card border-white/15 bg-white/8 p-6 text-white md:p-8">
            <h3 className="text-2xl font-bold">{t('orgName')}</h3>
            <p className="mt-3 text-sm leading-7 text-white/78">{t('schoolName')}</p>
            <div className="mt-5 flex items-start gap-3 text-sm text-white/78">
              <MapPin size={18} className="mt-1 shrink-0 text-accent" />
              <span>{t('location')}, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤° 911001</span>
            </div>
            <p className="mt-4 text-sm text-white/78">RCI Registration No: 0589</p>
            <p className="mt-1 text-sm text-white/78">ISO Certified â€” First in Western Maharashtra (2016)</p>
          </div>

          <div className="surface-card border-white/15 bg-white/8 p-6 text-white">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} href={link.to} className="text-sm text-white/75 hover:translate-x-1 hover:text-white">
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="surface-card border-white/15 bg-white/8 p-6 text-white">
            <h4 className="text-lg font-semibold">{t('contactUs')}</h4>
            <div className="mt-4 flex flex-col gap-3">
              {['9922121619', '9096731749', '9730420843'].map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-3 text-sm text-white/75 hover:translate-x-1 hover:text-white"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-accent">
                    <Phone size={15} />
                  </span>
                  (+91) {phone}
                </a>
              ))}
            </div>
          </div>

          <div className="surface-card border-white/15 bg-white/8 p-3 text-white">
            <h4 className="px-3 pt-3 text-lg font-semibold">{t('location')}</h4>
            <div className="mt-3 h-56 overflow-hidden rounded-[1.5rem] border border-white/12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1v18!1m12!1m3!1d3803.578744444854!2d75.2445!3d17.5785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAbhinav%20Matimand%20Mulanchi%20Niwasi%20Shala!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/12 pt-6 text-center text-sm text-white/60">
          Â© {new Date().getFullYear()} {t('orgName')}. {t('allRightsReserved')}
        </div>
      </div>
    </footer>
  );
}
