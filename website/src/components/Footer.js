'use client';

import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
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
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">
              {t('orgName')}
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t('schoolName')}
            </p>
            <div className="flex items-start gap-2 text-primary-foreground/70 text-sm mt-4">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{t('location')}, महाराष्ट्र 911001</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-2">
              RCI Registration No: 0589
            </p>
            <p className="text-primary-foreground/70 text-sm">
              ISO Certified — First in Western Maharashtra (2016)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">{t('contactUs')}</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:9922121619" className="flex items-center gap-2 text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                <Phone size={16} />
                (+91) 9922121619
              </a>
              <a href="tel:9096731749" className="flex items-center gap-2 text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                <Phone size={16} />
                (+91) 9096731749
              </a>
              <a href="tel:9730420843" className="flex items-center gap-2 text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                <Phone size={16} />
                (+91) 9730420843
              </a>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-4">{t('location')}</h4>
            <div className="w-full h-40 rounded-md overflow-hidden border border-primary-foreground/20">
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

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} {t('orgName')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
