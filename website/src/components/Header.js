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
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setAboutOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isAboutActive = pathname === '/about' || pathname === '/vision-mission';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white border-b border-slate-200 py-2'
          : 'bg-white py-4'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-white">
              <Sparkles size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900">
                {t('orgName')}
              </span>
              <span className="text-xs text-slate-600">
                {t('schoolName')}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.to} ref={dropdownRef} className="relative group/dropdown">
                  <button
                    type="button"
                    onClick={() => setAboutOpen((value) => !value)}
                    className={`inline-flex items-center gap-1 rounded border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                      isAboutActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t(link.labelKey)}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute left-0 top-full mt-1 w-52 rounded border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/10 transition-all duration-200 ${
                      aboutOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                    }`}
                  >
                    {aboutSubLinks.map((subLink) => (
                      <Link
                        key={subLink.to}
                        href={subLink.to}
                        onClick={() => setAboutOpen(false)}
                        className={`block rounded px-3 py-2 text-sm transition-colors ${
                          pathname === subLink.to
                            ? 'bg-slate-50 font-semibold text-primary'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
                  className={`rounded border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === link.to
                      ? 'border-primary text-primary'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              )
            )}

            <div className="ml-4 flex items-center gap-4 border-l border-slate-200 pl-4">
              <LanguageSwitcher compact />
              <Link href="/admissions" className="button-primary px-5 py-2">
                {t('applyNow')}
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher compact />
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-controls="mobile-site-nav"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-white text-slate-900"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          id="mobile-site-nav"
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? 'mt-4 max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav role="navigation" className="flex flex-col gap-1.5 rounded border border-slate-200 bg-white p-2.5 shadow-lg shadow-slate-900/5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex min-h-12 items-center rounded border-l-4 px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === link.to || (link.to === '/about' && isAboutActive)
                    ? 'border-primary bg-slate-50 text-primary'
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Link href="/admissions" onClick={() => setIsOpen(false)} className="button-primary mt-2.5 w-full py-3">
              {t('applyNow')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
