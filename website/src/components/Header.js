'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-lg md:text-xl font-semibold text-foreground leading-tight text-primary">
            {t('orgName')}
          </span>
          <span className="text-xs text-muted-foreground">
            {t('schoolName')}, {t('location')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-sm font-medium transition-colors ${
                pathname === link.to
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
            <LanguageSwitcher />
            <Link
              href="/admissions"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('applyNow')}
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="lg:hidden border-t border-border bg-background shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm font-medium border-b border-border transition-colors ${
                pathname === link.to
                  ? 'text-primary bg-primary/5 border-l-4 border-l-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <Link
            href="/admissions"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 text-center mx-4 mt-3 rounded-md"
          >
            {t('applyNow')}
          </Link>
        </nav>
      )}
    </header>
  );
}
