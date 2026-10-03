'use client';

import Link from 'next/link';
import { useLang } from '../layout';
import OceanScene from '@/lib/OceanScene';

export default function SanctuaryPage() {
  const { lang } = useLang();
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);

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

      <section
        className="sanctuary-section"
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          textAlign: 'center',
          padding: '140px 24px 120px',
        }}
      >
        <h3
          className="sanctuary-title"
          style={{
            fontFamily: "'Marcellus', serif",
            color: 'var(--white)',
            marginBottom: 20,
            letterSpacing: lang === 'ar' ? '0.05em' : '0.35em',
            textShadow:
              '0 2px 30px rgba(0,0,0,0.9), 0 0 40px rgba(74,139,194,0.5)',
          }}
        >
          {t('CHOOSE YOUR ROOM', 'اختر غرفتك')}
        </h3>

        <p
          className="sanctuary-subtitle"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--silver)',
            fontStyle: lang === 'ar' ? 'normal' : 'italic',
            marginBottom: 60,
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          {t('Each room holds something different.', 'كل غرفة تحمل شيئًا مختلفًا.')}
        </p>

        <div className="sanctuary-grid">
          {rooms.map((room) => (
            <Link
              key={room.href}
              href={room.href}
              className="glass sanctuary-card"
            >
              <div
                className="sanctuary-card-icon"
                style={{
                  color: 'var(--soft-blue)',
                  textShadow: '0 0 20px rgba(74,139,194,0.8)',
                }}
              >
                {room.icon}
              </div>
              <h4
                className="sanctuary-card-title"
                style={{
                  fontFamily: "'Marcellus', serif",
                  color: 'var(--white)',
                  letterSpacing: lang === 'ar' ? 0 : '0.22em',
                  textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                }}
              >
                {t(room.en, room.ar)}
              </h4>
              <p
                className="sanctuary-card-desc"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: 'var(--silver)',
                  lineHeight: 1.7,
                  fontStyle: lang === 'ar' ? 'normal' : 'italic',
                }}
              >
                {t(room.descEn, room.descAr)}
              </p>
              <div className="sanctuary-card-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      <style jsx global>{`
        /* Desktop */
        .sanctuary-title {
          font-size: 2.2rem;
        }
        .sanctuary-subtitle {
          font-size: 1.15rem;
        }
        .sanctuary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .sanctuary-card {
          padding: 52px 32px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          background: rgba(13, 27, 62, 0.5);
          backdrop-filter: blur(14px);
        }
        .sanctuary-card:hover {
          transform: translateY(-8px);
          border-color: rgba(74, 139, 194, 0.6);
          box-shadow: 0 30px 60px rgba(5, 5, 8, 0.7),
            inset 0 0 40px rgba(42, 90, 156, 0.2);
        }
        .sanctuary-card-icon {
          font-size: 1.7rem;
          margin-bottom: 8px;
        }
        .sanctuary-card-title {
          font-size: 1.05rem;
        }
        .sanctuary-card-desc {
          font-size: 0.95rem;
        }
        .sanctuary-card-arrow {
          margin-top: 20px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(74, 139, 194, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--silver);
          transition: all 0.4s ease;
        }
        .sanctuary-card:hover .sanctuary-card-arrow {
          border-color: var(--soft-blue);
          color: var(--white);
        }

        /* RTL arrow flip */
        [dir='rtl'] .sanctuary-card-arrow {
          transform: scaleX(-1);
        }

        /* Tablet + Phone */
        @media (max-width: 768px) {
          .sanctuary-section {
            padding: 100px 16px 80px !important;
          }
          .sanctuary-title {
            font-size: 1.7rem !important;
            letter-spacing: 0.15em !important;
            margin-bottom: 14px !important;
          }
          .sanctuary-subtitle {
            font-size: 1rem !important;
            margin-bottom: 40px !important;
          }
          .sanctuary-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .sanctuary-card {
            padding: 32px 24px !important;
            gap: 12px !important;
          }
          .sanctuary-card-icon {
            font-size: 1.5rem !important;
          }
          .sanctuary-card-title {
            font-size: 1rem !important;
            letter-spacing: 0.15em !important;
          }
          .sanctuary-card-desc {
            font-size: 0.9rem !important;
          }
          .sanctuary-card-arrow {
            margin-top: 12px !important;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .sanctuary-title {
            font-size: 1.5rem !important;
          }
          .sanctuary-subtitle {
            font-size: 0.9rem !important;
          }
          .sanctuary-card {
            padding: 26px 20px !important;
          }
          .sanctuary-card-title {
            font-size: 0.95rem !important;
          }
          .sanctuary-card-desc {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
}
