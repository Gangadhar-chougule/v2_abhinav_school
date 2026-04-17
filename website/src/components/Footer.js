'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Camera, Video, Globe } from 'lucide-react';
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
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('orgName')}</h3>
            <p className="text-sm leading-relaxed mb-6">
              {t('schoolName')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{t('location')}, Maharashtra 911001</span>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="p-2 rounded bg-slate-800 hover:bg-primary hover:text-white transition-colors">
                  <Camera size={18} />
                </a>
                <a href="#" className="p-2 rounded bg-slate-800 hover:bg-primary hover:text-white transition-colors">
                  <Globe size={18} />
                </a>
                <a href="#" className="p-2 rounded bg-slate-800 hover:bg-primary hover:text-white transition-colors">
                  <Video size={18} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.slice(0, 4).map((link) => (
                <Link key={link.to} href={link.to} className="text-sm hover:text-white transition-colors">
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Information</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.slice(4).map((link) => (
                <Link key={link.to} href={link.to} className="text-sm hover:text-white transition-colors">
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">{t('contactUs')}</h4>
            <div className="space-y-4">
              {['9922121619', '9096731749'].map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 text-sm hover:text-white transition-colors group"
                >
                  <span className="p-2 rounded-lg bg-slate-800 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Phone size={16} />
                  </span>
                  (+91) {phone}
                </a>
              ))}
              <div className="mt-6 h-40 w-full rounded overflow-hidden border border-slate-800 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
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
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t('orgName')}. {t('allRightsReserved')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
