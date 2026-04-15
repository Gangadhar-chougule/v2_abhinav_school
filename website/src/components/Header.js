'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { to: '/', labelKey: 'home' },
  { to: '/about', labelKey: 'aboutUs', hasDropdown: true },
  { to: '/admissions', labelKey: 'admissions' },
  { to: '/events', labelKey: 'events' },
  { to: '/facilities', labelKey: 'facilities' },
  { to: '/staff', labelKey: 'ourStaff' },
  { to: '/gallery', labelKey: 'gallery' },
  { to: '/contact', labelKey: 'contact' },
];

const aboutSubLinks = [
  { to: '/about', labelKey: 'overview' },
  { to: '/vision-mission', labelKey: 'visionMission' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutDropdownRef = useRef(null);
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
            link.hasDropdown ? (
              <div key={link.to} className="relative" ref={aboutDropdownRef}>
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    pathname.startsWith(link.to) || (link.to === '/about' && pathname.includes('vision'))
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(link.labelKey)}
                  <ChevronDown size={14} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>
                {aboutOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-50">
                    {aboutSubLinks.map((subLink) => (
                      <Link
                        key={subLink.to}
                        href={subLink.to}
                        onClick={() => setAboutOpen(false)}
                        className={`block px-4 py-2 text-sm hover:bg-muted/50 transition-colors ${
                          pathname === subLink.to
                            ? 'text-primary bg-primary/5'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {t(subLink.labelKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
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
            )
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
