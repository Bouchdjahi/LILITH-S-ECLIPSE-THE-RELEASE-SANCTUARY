'use client';

import Link from 'next/link';
import { useLang } from './layout';
import OceanScene from '@/lib/OceanScene';

export default function HomePage() {
  const { lang } = useLang();
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);

  const scrollToSanctuary = () => {
    const el = document.getElementById('sanctuary-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const rooms = [
    {
      href: '/listener',
      icon: '✦',
      en: 'THE LISTENER',
      ar: 'المُنصِت',
      descEn: '"You can say it here."',
      descAr: '"يمكنك أن تقوله هنا."',
    },
    {
      href: '/release-room',
      icon: '✎',
      en: 'RELEASE ROOM',
      ar: 'غرفة التحرّر',
      descEn: '"Write what you cannot say."',
      descAr: '"اكتب ما لا تستطيع قوله."',
    },
    {
      href: '/journal',
      icon: '☾',
      en: 'JOURNAL',
      ar: 'المُذكّرات',
      descEn: '"Meet yourself on the page."',
      descAr: '"التقِ بنفسك على الورق."',
    },
    {
      href: '/hypnosis',
      icon: '◈',
      en: 'HYPNOSIS',
      ar: 'التنويم',
      descEn: '"Let your mind become quiet."',
      descAr: '"دع عقلك يهدأ."',
    },
    {
      href: '/vault',
      icon: '⚿',
      en: 'VAULT',
      ar: 'الخزنة',
      descEn: '"Keep what matters."',
      descAr: '"احفظ ما يهم."',
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <OceanScene />

      {/* ========== HERO ========== */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <h2
          className="fade-up"
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: lang === 'ar' ? '3.5rem' : '4.5rem',
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
          className="fade-up"
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '1rem',
            letterSpacing: lang === 'ar' ? '0.1em' : '0.6em',
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
          className="fade-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem',
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
          className="fade-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.05rem',
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

        <button
          onClick={scrollToSanctuary}
          className="fade-up btn-primary"
          style={{
            animationDelay: '2.5s',
            fontFamily: "'Marcellus', serif",
            fontSize: lang === 'ar' ? '1rem' : '0.9rem',
            letterSpacing: lang === 'ar' ? 0 : '0.35em',
            padding: '20px 54px',
            cursor: 'pointer',
            textTransform: lang === 'ar' ? 'none' : 'uppercase',
            border: '1px solid var(--luminous-blue)',
            background: 'rgba(42, 90, 156, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {t('ENTER THE SANCTUARY', 'ادخل الملاذ')}
        </button>

        <div
          className="fade-up"
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Marcellus', serif",
            fontSize: '0.7rem',
            letterSpacing: lang === 'ar' ? '0.1em' : '0.4em',
            textTransform: lang === 'ar' ? 'none' : 'uppercase',
            color: 'rgba(160,180,200,0.6)',
            animationDelay: '3s',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          {t('↓ Descend ↓', '↓ انزل ↓')}
        </div>
      </section>

      {/* ========== PHILOSOPHY ========== */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '160px 48px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '0.8rem',
            letterSpacing: lang === 'ar' ? '0.1em' : '0.4em',
            color: 'var(--soft-blue)',
            textTransform: lang === 'ar' ? 'none' : 'uppercase',
            marginBottom: 28,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {t('THIS IS YOUR SPACE', 'هذه مساحتك')}
        </div>

        <h3
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '2.8rem',
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
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.3rem',
            lineHeight: 2,
            color: 'var(--silver)',
            maxWidth: 520,
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          <p>
            {t(
              "You don't have to be okay here.",
              'لست مضطرًا أن تكون بخير هنا.'
            )}
          </p>
          <p>
            {t(
              "You don't have to hold everything together.",
              'لست مضطرًا أن تُمسك كل شيء معًا.'
            )}
          </p>
        </div>

        <div
          style={{
            marginTop: 52,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            ['Write it.', 'اكتبه.'],
            ['Feel it.', 'اشعره.'],
            ['Release it.', 'أطلقه.'],
            ['Return to yourself.', 'عُد إلى نفسك.'],
          ].map(([en, ar]) => (
            <span
              key={en}
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: '1.25rem',
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

      {/* ========== SANCTUARY GRID ========== */}
      <section
        id="sanctuary-grid"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '140px 48px 180px',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '2.2rem',
            marginBottom: 20,
            letterSpacing: lang === 'ar' ? '0.05em' : '0.35em',
            textShadow:
              '0 2px 30px rgba(0,0,0,0.9), 0 0 40px rgba(74,139,194,0.5)',
          }}
        >
          {t('CHOOSE YOUR ROOM', 'اختر غرفتك')}
        </h3>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.15rem',
            color: 'var(--silver)',
            fontStyle: lang === 'ar' ? 'normal' : 'italic',
            marginBottom: 60,
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          {t(
            'Each room holds something different.',
            'كل غرفة تحمل شيئًا مختلفًا.'
          )}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {rooms.map((room) => (
            <Link
              key={room.href}
              href={room.href}
              className="glass"
              style={{
                padding: '52px 32px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                background: 'rgba(13, 27, 62, 0.5)',
                backdropFilter: 'blur(14px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(74,139,194,0.6)';
                e.currentTarget.style.boxShadow =
                  '0 30px 60px rgba(5,5,8,0.7), inset 0 0 40px rgba(42,90,156,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(74,139,194,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  fontSize: '1.7rem',
                  color: 'var(--soft-blue)',
                  marginBottom: 8,
                  textShadow: '0 0 20px rgba(74,139,194,0.8)',
                }}
              >
                {room.icon}
              </div>
              <h4
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: lang === 'ar' ? '1.2rem' : '1.05rem',
                  letterSpacing: lang === 'ar' ? 0 : '0.22em',
                  color: 'var(--white)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                }}
              >
                {t(room.en, room.ar)}
              </h4>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.95rem',
                  color: 'var(--silver)',
                  lineHeight: 1.7,
                  fontStyle: lang === 'ar' ? 'normal' : 'italic',
                }}
              >
                {t(room.descEn, room.descAr)}
              </p>
              <div
                style={{
                  marginTop: 20,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(74,139,194,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--silver)',
                  transform: lang === 'ar' ? 'scaleX(-1)' : 'none',
                }}
              >
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== RETURN TO SELF ========== */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '200px 48px 240px',
          textAlign: 'center',
          maxWidth: 700,
          margin: '0 auto',
        }}
      >
        <h3
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '2.6rem',
            letterSpacing: lang === 'ar' ? '0.05em' : '0.3em',
            marginBottom: 40,
            textShadow:
              '0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(74,139,194,0.7), 0 0 120px rgba(42,90,156,0.4)',
          }}
        >
          {t('RETURN TO SELF', 'عُد إلى نفسك')}
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem',
            color: 'var(--soft-blue)',
            fontStyle: lang === 'ar' ? 'normal' : 'italic',
            lineHeight: 2,
            marginBottom: 16,
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          {t('You came here to meet yourself.', 'أتيت هنا لتلتقي بنفسك.')}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem',
            color: 'var(--silver)',
            fontStyle: lang === 'ar' ? 'normal' : 'italic',
            lineHeight: 2,
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
          }}
        >
          {t('Now return to yourself.', 'الآن، عُد إلى نفسك.')}
        </p>
      </section>
    </div>
  );
}
