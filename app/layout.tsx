'use client';

import './globals.css';
import { useEffect, useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* =========================================================
   LANGUAGE CONTEXT — shared across every page
   ========================================================= */

type Lang = 'en' | 'ar';

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: 'en', toggle: () => {} });

export function useLang() {
  return useContext(LanguageContext);
}

/* =========================================================
   ROOT LAYOUT
   ========================================================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>('en');
  const pathname = usePathname();

  useEffect(() => {
    const saved = (localStorage.getItem('lilith_lang') as Lang) || 'en';
    setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lilith_lang', lang);
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);

  const navItems: { href: string; en: string; ar: string }[] = [
    { href: '/', en: 'Home', ar: 'الرئيسية' },
    { href: '/listener', en: 'The Listener', ar: 'المُنصِت' },
    { href: '/release-room', en: 'Release Room', ar: 'غرفة التحرّر' },
    { href: '/journal', en: 'Journal', ar: 'المُذكّرات' },
    { href: '/hypnosis', en: 'Hypnosis', ar: 'التنويم' },
    { href: '/vault', en: 'Vault', ar: 'الخزنة' },
  ];

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <LanguageContext.Provider value={{ lang, toggle }}>
          {/* NAVIGATION */}
          <nav
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              padding: '22px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 100,
              background:
                'linear-gradient(to bottom, rgba(5,5,8,0.85), rgba(5,5,8,0))',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '1.1rem',
                  letterSpacing: '0.2em',
                  color: 'var(--white)',
                }}
              >
                {t("LILITH'S ECLIPSE", 'كسوف ليليث')}
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  color: 'var(--silver)',
                  marginTop: 4,
                }}
              >
                {t('THE RELEASE SANCTUARY', 'ملاذ التحرّر')}
              </span>
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div
                className="nav-links"
                style={{
                  display: 'flex',
                  gap: 28,
                }}
              >
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        color: isActive ? 'var(--white)' : 'var(--silver)',
                        textDecoration: 'none',
                        fontSize: lang === 'ar' ? '0.85rem' : '0.7rem',
                        letterSpacing: lang === 'ar' ? 0 : '0.15em',
                        textTransform: lang === 'ar' ? 'none' : 'uppercase',
                        transition: 'color 0.4s ease',
                        borderBottom: isActive
                          ? '1px solid var(--luminous-blue)'
                          : '1px solid transparent',
                        paddingBottom: 4,
                        fontFamily:
                          lang === 'ar'
                            ? "'Tajawal', sans-serif"
                            : "'Marcellus', serif",
                      }}
                    >
                      {t(item.en, item.ar)}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={toggle}
                style={{
                  padding: '8px 16px',
                  borderRadius: 50,
                  border: '1px solid rgba(74,139,194,0.4)',
                  background: 'rgba(13,27,62,0.6)',
                  color: 'var(--white)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {lang === 'en' ? '🌐 العربية' : '🌐 English'}
              </button>
            </div>
          </nav>

          {/* PAGE CONTENT */}
          <main style={{ position: 'relative', zIndex: 10 }}>{children}</main>
        </LanguageContext.Provider>

        <style jsx global>{`
          @media (max-width: 1024px) {
            .nav-links {
              display: none !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
