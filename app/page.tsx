'use client';

import Link from 'next/link';
import { useLang } from './layout';
import OceanScene from '@/lib/OceanScene';

export default function HomePage() {
  const { lang } = useLang();
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);

  return (
    <div style={{ position: 'relative' }}>
      {/* Ocean video background */}
      <OceanScene />

      {/* ========== HERO ========== */}
      <section
        className="home-hero"
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '120px 24px 0',
        }}
      >
        <h2
          className="fade-up home-hero-title"
          style={{
            fontFamily: "'Marcellus', serif",
            letterSpacing: lang === 'ar' ? 0 : '0.18em',
            marginBottom: 20,
            textShadow:
              '0 0 30px rgba(74,139,194,0.7), 0 0 80px rgba(42,90,156,0.4), 0 4px 20px rgba(0,0,0,0.9)',
            animationDelay: '0.5s',
            color: 'var(--white)',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          {t("LILITH'S ECLIPSE", 'كسوف ليليث')}
        </h2>

        <div
          className="fade-up home-hero-subtitle"
          style={{
            fontFamily: "'Marcellus', serif",
            color: 'var(--silver)',
            textTransform: lang === 'ar' ? 'none' : 'uppercase',
            marginBottom: 50,
            animationDelay: '1s',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          {t('THE RELEASE SANCTUARY', 'ملاذ التحرّر')}
        </div>

        <div
          className="fade-up home-hero-tagline"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: lang === 'ar' ? 'normal' : 'italic',
            color: 'var(--soft-blue)',
            marginBottom: 24,
            animationDelay: '1.5s',
            textShadow:
              '0 2px 20px rgba(0,0,0,0.9), 0 0 30px rgba(74,139,194,0.5)',
            fontWeight: 400,
          }}
        >
          {t(
            'Write it. Feel it. Release it. Return to yourself.',
            'اكتبه. اشعره. أطلقه. عُد إلى نفسك.'
          )}
        </div>

        <div
          className="fade-up home-hero-desc"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--silver)',
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: 64,
            animationDelay: '2s',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          {t(
            'A private space for the things you cannot always say out loud.',
            'مساحة خاصة للأشياء التي لا تستطيع دائمًا قولها بصوت عالٍ.'
          )}
        </div>

        <Link
          href="/sanctuary"
          className="fade-up btn-primary home-hero-btn"
          style={{ animationDelay: '2.5s' }}
        >
          {t('ENTER THE SANCTUARY', 'ادخل الملاذ')}
        </Link>
      </section>

      {/* ========== PHILOSOPHY ========== */}
      <section
        className="home-philosophy"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          className="home-philosophy-label"
          style={{
            fontFamily: "'Marcellus', serif",
            color: 'var(--soft-blue)',
            textTransform: lang === 'ar' ? 'none' : 'uppercase',
            marginBottom: 28,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {t('THIS IS YOUR SPACE', 'هذه مساحتك')}
        </div>

        <h3
          className="home-philosophy-title"
          style={{
            fontFamily: "'Marcellus', serif",
            lineHeight: 1.35,
            marginBottom: 44,
            maxWidth: 660,
            fontWeight: 400,
            textShadow:
              '0 2px 20px rgba(0,0,0,0.9), 0 0 30px rgba(74,139,194,0.4)',
          }}
        >
          {t(
            "You don't have to explain everything here.",
            'لست مضطرًا لشرح كل شيء هنا.'
          )}
        </h3>

        <div
          className="home-philosophy-text"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 2,
            color: 'var(--silver)',
            maxWidth: 520,
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          <p>{t("You don't have to be okay here.", 'لست مضطرًا أن تكون بخير هنا.')}</p>
          <p>
            {t(
              "You don't have to hold everything together.",
              'لست مضطرًا أن تُمسك كل شيء معًا.'
            )}
          </p>
        </div>

        <div className="home-philosophy-steps">
          {[
            ['Write it.', 'اكتبه.'],
            ['Feel it.', 'اشعره.'],
            ['Release it.', 'أطلقه.'],
            ['Return to yourself.', 'عُد إلى نفسك.'],
          ].map(([en, ar]) => (
            <span
              key={en}
              className="home-philosophy-step"
              style={{
                fontFamily: "'Marcellus', serif",
                color: 'var(--white)',
                letterSpacing: lang === 'ar' ? 0 : '0.08em',
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              {t(en, ar)}
            </span>
          ))}
        </div>
      </section>

      {/* ========== SPACING FOR SCROLL ========== */}
      <div className="home-tail" />

      {/* ========== RESPONSIVE STYLES ========== */}
      <style jsx global>{`
        /* Desktop */
        .home-hero-title {
          font-size: 4.5rem;
        }
        .home-hero-subtitle {
          font-size: 1rem;
          letter-spacing: 0.6em;
        }
        .home-hero-tagline {
          font-size: 1.5rem;
        }
        .home-hero-desc {
          font-size: 1.05rem;
        }
        .home-hero-btn {
          font-size: 0.9rem;
          letter-spacing: 0.35em;
          padding: 20px 54px;
        }
        .home-philosophy {
          padding: 160px 48px 100px;
        }
        .home-philosophy-label {
          font-size: 0.8rem;
          letter-spacing: 0.4em;
        }
        .home-philosophy-title {
          font-size: 2.8rem;
        }
        .home-philosophy-text {
          font-size: 1.3rem;
        }
        .home-philosophy-steps {
          margin-top: 52px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .home-philosophy-step {
          font-size: 1.25rem;
        }
        .home-tail {
          height: 180px;
        }

        /* Tablet + Phone (768px and below) */
        @media (max-width: 768px) {
          .home-hero {
            padding: 100px 20px 0 !important;
            min-height: 100vh !important;
          }
          .home-hero-title {
            font-size: 2.4rem !important;
            letter-spacing: 0.08em !important;
          }
          .home-hero-subtitle {
            font-size: 0.7rem !important;
            letter-spacing: 0.35em !important;
            margin-bottom: 40px !important;
          }
          .home-hero-tagline {
            font-size: 1.15rem !important;
            margin-bottom: 20px !important;
            padding: 0 8px;
          }
          .home-hero-desc {
            font-size: 0.95rem !important;
            margin-bottom: 48px !important;
            padding: 0 12px;
          }
          .home-hero-btn {
            font-size: 0.72rem !important;
            letter-spacing: 0.2em !important;
            padding: 16px 40px !important;
            width: auto !important;
            max-width: 100%;
          }
          .home-philosophy {
            padding: 100px 24px 80px !important;
          }
          .home-philosophy-label {
            font-size: 0.65rem !important;
            letter-spacing: 0.3em !important;
            margin-bottom: 20px !important;
          }
          .home-philosophy-title {
            font-size: 1.9rem !important;
            line-height: 1.4 !important;
            margin-bottom: 32px !important;
          }
          .home-philosophy-text {
            font-size: 1.05rem !important;
            line-height: 1.9 !important;
          }
          .home-philosophy-steps {
            margin-top: 40px !important;
            gap: 8px !important;
          }
          .home-philosophy-step {
            font-size: 1.05rem !important;
          }
          .home-tail {
            height: 120px !important;
          }
        }

        /* Small phones (480px and below) */
        @media (max-width: 480px) {
          .home-hero {
            padding: 90px 16px 0 !important;
          }
          .home-hero-title {
            font-size: 2rem !important;
            margin-bottom: 14px !important;
          }
          .home-hero-subtitle {
            font-size: 0.62rem !important;
            letter-spacing: 0.28em !important;
            margin-bottom: 32px !important;
          }
          .home-hero-tagline {
            font-size: 1.05rem !important;
          }
          .home-hero-desc {
            font-size: 0.9rem !important;
          }
          .home-hero-btn {
            font-size: 0.68rem !important;
            padding: 15px 32px !important;
          }
          .home-philosophy {
            padding: 80px 20px 60px !important;
          }
          .home-philosophy-title {
            font-size: 1.6rem !important;
          }
          .home-philosophy-text {
            font-size: 1rem !important;
          }
          .home-philosophy-step {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
