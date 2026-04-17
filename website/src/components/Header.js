'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAboutActive = pathname === '/about' || pathname === '/vision-mission';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/60 bg-white/86 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container py-3">
        <div className="surface-card flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="float-soft hidden h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-[0_16px_30px_rgba(33,150,243,0.24)] sm:flex">
              <Sparkles size={18} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold uppercase tracking-[0.25em] text-secondary/80">
                {t('orgName')}
              </div>
              <div className="truncate text-sm text-foreground/70 md:text-[0.95rem]">
                {t('schoolName')}, {t('location')}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.to} ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setAboutOpen((value) => !value)}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium ${
                      isAboutActive
                        ? 'bg-primary/12 text-primary'
                        : 'text-foreground/70 hover:bg-secondary/10 hover:text-secondary'
                    }`}
                  >
                    {t(link.labelKey)}
                    <ChevronDown size={16} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute left-0 top-full mt-3 w-56 rounded-3xl border border-white/70 bg-white/92 p-2 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-200 ${
                      aboutOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                    }`}
                  >
                    {aboutSubLinks.map((subLink) => (
                      <Link
                        key={subLink.to}
                        href={subLink.to}
                        onClick={() => setAboutOpen(false)}
                        className={`block rounded-2xl px-4 py-3 text-sm ${
                          pathname === subLink.to
                            ? 'bg-primary/10 font-medium text-primary'
                            : 'text-foreground/72 hover:bg-secondary/10 hover:text-secondary'
                        }`}
                      >
                        {t(subLink.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    pathname === link.to
                      ? 'bg-primary/12 text-primary'
                      : 'text-foreground/70 hover:bg-secondary/10 hover:text-secondary'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              )
            )}

            <div className="ml-3 flex items-center gap-3 border-l border-border/70 pl-4">
              <LanguageSwitcher />
              <Link href="/admissions" className="button-primary px-5 py-2.5 text-[0.92rem]">
                {t('applyNow')}
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-3 xl:hidden">
            <LanguageSwitcher compact />
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-label="Toggle menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-foreground shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 xl:hidden ${
            isOpen ? 'mt-3 max-h-[34rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="surface-card px-4 py-4">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    pathname === link.to || (link.to === '/about' && isAboutActive)
                      ? 'bg-primary/12 text-primary'
                      : 'text-foreground/72 hover:bg-secondary/10 hover:text-secondary'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link href="/admissions" onClick={() => setIsOpen(false)} className="button-primary mt-2 w-full">
                {t('applyNow')}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
