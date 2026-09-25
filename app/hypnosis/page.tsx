'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../layout';

/* =========================================================
   TYPES
   ========================================================= */

interface Track {
  titleEn: string;
  titleAr: string;
  category: string;
  // When you're ready to add YouTube, put the video ID here.
  // Example: youtubeId: "dQw4w9WgXcQ"
  youtubeId?: string;
  duration?: string;
}

/* =========================================================
   CATEGORY NAMES (Bilingual)
   ========================================================= */

const CATEGORY_NAMES: Record<string, { en: string; ar: string }> = {
  detachment: { en: 'Detachment', ar: 'التحرّر' },
  'self-love': { en: 'Self-Love', ar: 'حب الذات' },
  'self-confidence': { en: 'Self-Confidence', ar: 'الثقة بالنفس' },
  discipline: { en: 'Discipline', ar: 'الانضباط' },
  focus: { en: 'Focus', ar: 'التركيز' },
  'letting-go': { en: 'Letting Go', ar: 'الإفراج' },
  overthinking: { en: 'Overthinking', ar: 'التفكير المفرط' },
  'emotional-calm': { en: 'Emotional Calm', ar: 'الهدوء العاطفي' },
  sleep: { en: 'Sleep', ar: 'النوم' },
  'inner-safety': { en: 'Inner Safety', ar: 'الأمان الداخلي' },
  'self-worth': { en: 'Self-Worth', ar: 'تقدير الذات' },
  'creative-flow': { en: 'Creative Flow', ar: 'التدفق الإبداعي' },
  'morning-reset': { en: 'Morning Reset', ar: 'بداية الصباح' },
  'night-reset': { en: 'Night Reset', ar: 'ختام الليل' },
  release: { en: 'Release', ar: 'التحرير' },
};

const CATEGORY_GLYPHS: Record<string, string> = {
  detachment: '☾',
  'self-love': '♡',
  'self-confidence': '✦',
  discipline: '◢',
  focus: '◈',
  'letting-go': '✧',
  overthinking: '∞',
  'emotional-calm': '◯',
  sleep: '☾',
  'inner-safety': '⌂',
  'self-worth': '◈',
  'creative-flow': '✦',
  'morning-reset': '☀',
  'night-reset': '☾',
  release: '✦',
};

/* =========================================================
   YOUR TRACKS
   =========================================================
   When you're ready, add the YouTube video ID to each one:

   { titleEn: "...", titleAr: "...", category: "...", youtubeId: "dQw4w9WgXcQ", duration: "20:00" }

   For now, they're left empty so the shelf shows the "empty" state.
   ========================================================= */

const TRACKS: Track[] = [
  // Paste your real tracks here later. Example:
  // {
  //   titleEn: 'Release the Thread',
  //   titleAr: 'أطلق الخيط',
  //   category: 'detachment',
  //   youtubeId: 'YOUR_VIDEO_ID_HERE',
  //   duration: '22:14',
  // },
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function HypnosisPage() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [filter, setFilter] = useState<string>('all');
  const [particles, setParticles] = useState<
    Array<{ left: string; delay: string; duration: string; opacity: number }>
  >([]);
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  /* Generate ambient particles once */
  useEffect(() => {
    const arr: Array<{
      left: string;
      delay: string;
      duration: string;
      opacity: number;
    }> = [];
    for (let i = 0; i < 45; i++) {
      arr.push({
        left: Math.random() * 100 + '%',
        delay: `-${Math.random() * 60}s`,
        duration: `${30 + Math.random() * 40}s`,
        opacity: 0.1 + Math.random() * 0.5,
      });
    }
    setParticles(arr);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2400);
  };

  /* Categories present in the current track list */
  const categoriesInUse = Array.from(new Set(TRACKS.map((t) => t.category)));
  const filteredTracks =
    filter === 'all' ? TRACKS : TRACKS.filter((t) => t.category === filter);

  /* Group by category */
  const grouped: Record<string, Track[]> = {};
  filteredTracks.forEach((t) => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* ========== BACKGROUND ========== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse at 50% 25%, #12224a 0%, #0a1428 40%, #050812 70%, #02040a 100%)',
        }}
      />

      {/* Breathing blue glow */}
      <div
        style={{
          position: 'fixed',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(74,139,194,0.2) 0%, rgba(42,90,156,0.08) 40%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'hypnoBreathe 18s ease-in-out infinite',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Drifting particles */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-10px',
              width: 2,
              height: 2,
              borderRadius: '50%',
              background: 'rgba(200, 220, 245, 0.9)',
              boxShadow: '0 0 8px 1px rgba(74, 139, 194, 0.7)',
              opacity: p.opacity,
              animation: `hypnoDrift ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 50% 35%, rgba(5,10,20,0) 0%, rgba(5,10,20,0.4) 55%, rgba(2,4,10,0.9) 100%),
            linear-gradient(to bottom, rgba(5,10,20,0.5) 0%, transparent 25%, transparent 75%, rgba(2,4,10,0.85) 100%)
          `,
        }}
      />

      {/* ========== PAGE CONTENT ========== */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          padding: '140px 48px 200px',
        }}
      >
        {/* ========== HEADER ========== */}
        <div
          className="fade-up"
          style={{
            textAlign: 'center',
            marginBottom: 60,
            animationDelay: '0.2s',
          }}
        >
          <div
            style={{
              fontFamily: "'Marcellus', serif",
              fontSize: '0.7rem',
              letterSpacing: isAr ? '0.1em' : '0.5em',
              color: 'var(--soft-blue)',
              textTransform: isAr ? 'none' : 'uppercase',
              marginBottom: 22,
              textShadow:
                '0 0 25px rgba(74,139,194,0.8), 0 2px 12px rgba(0,0,0,0.9)',
            }}
          >
            {t('HYPNOSIS', 'التنويم')}
          </div>
          <h2
            style={{
              fontFamily: "'Marcellus', serif",
              fontSize: isAr ? '2.2rem' : '2.6rem',
              letterSpacing: isAr ? 0 : '0.18em',
              marginBottom: 20,
              textShadow:
                '0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(74,139,194,0.7), 0 0 120px rgba(42,90,156,0.4)',
            }}
          >
            {t(
              'CHOOSE THE STATE YOU WANT TO ENTER.',
              'اختر الحالة التي تريد الدخول إليها.'
            )}
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: isAr ? 'normal' : 'italic',
              fontSize: '1.15rem',
              color: 'var(--silver)',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 1.9,
              textShadow: '0 2px 12px rgba(0,0,0,0.95)',
            }}
          >
            {t(
              'Audio journeys created to guide your mind. Find a quiet place. Let the words do the rest.',
              'رحلات صوتية صُنعت لترشد عقلك. اعثر على مكان هادئ. ودع الكلمات تفعل الباقي.'
            )}
          </p>
        </div>

        {/* ========== EMPTY STATE (until you add tracks) ========== */}
        {TRACKS.length === 0 && (
          <div
            className="fade-up"
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              maxWidth: 720,
              margin: '0 auto',
              animationDelay: '0.5s',
            }}
          >
            <div
              style={{
                fontSize: '3.5rem',
                color: 'var(--soft-blue)',
                marginBottom: 32,
                opacity: 0.7,
                textShadow: '0 0 60px rgba(74,139,194,0.8)',
                animation: 'hypnoGlow 6s ease-in-out infinite',
              }}
            >
              ☾
            </div>
            <h3
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: '1.4rem',
                letterSpacing: isAr ? 0 : '0.2em',
                textTransform: isAr ? 'none' : 'uppercase',
                marginBottom: 24,
                color: 'var(--white)',
                textShadow:
                  '0 2px 20px rgba(0,0,0,0.9), 0 0 30px rgba(74,139,194,0.5)',
              }}
            >
              {t('YOUR LIBRARY IS QUIET', 'مكتبتك هادئة')}
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: isAr ? 'normal' : 'italic',
                color: 'var(--silver)',
                lineHeight: 1.9,
                fontSize: '1.15rem',
                marginBottom: 16,
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              {t(
                'No hypnosis recordings have been added yet.',
                'لم تُضف أي تسجيلات تنويم بعد.'
              )}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: isAr ? 'normal' : 'italic',
                color: 'var(--soft-blue)',
                lineHeight: 1.9,
                fontSize: '1rem',
                marginTop: 32,
              }}
            >
              {t(
                'When you are ready, add your recordings to the TRACKS list in this file.',
                'عندما تكون مستعدًا، أضف تسجيلاتك إلى قائمة TRACKS في هذا الملف.'
              )}
            </p>
          </div>
        )}

        {/* ========== CATEGORY CHIPS ========== */}
        {TRACKS.length > 0 && (
          <div
            className="fade-up"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 10,
              maxWidth: 1100,
              margin: '0 auto 60px',
              animationDelay: '0.4s',
            }}
          >
            <button
              onClick={() => setFilter('all')}
              style={chipStyle(filter === 'all', isAr)}
            >
              {t('All', 'الكل')}
            </button>
            {categoriesInUse.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={chipStyle(filter === cat, isAr)}
              >
                {isAr
                  ? CATEGORY_NAMES[cat]?.ar || cat
                  : CATEGORY_NAMES[cat]?.en || cat}
              </button>
            ))}
          </div>
        )}

        {/* ========== LIBRARY ========== */}
        {TRACKS.length > 0 && (
          <div
            className="fade-up"
            style={{ maxWidth: 1300, margin: '0 auto', animationDelay: '0.7s' }}
          >
            {Object.entries(grouped).map(([cat, tracks]) => (
              <div key={cat} style={{ marginBottom: 60 }}>
                <div
                  style={{
                    fontFamily: "'Marcellus', serif",
                    fontSize: '0.85rem',
                    letterSpacing: isAr ? 0 : '0.35em',
                    textTransform: isAr ? 'none' : 'uppercase',
                    color: 'var(--soft-blue)',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    textShadow: '0 0 20px rgba(74,139,194,0.5)',
                  }}
                >
                  <span>
                    {isAr ? CATEGORY_NAMES[cat]?.ar : CATEGORY_NAMES[cat]?.en}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      height: 1,
                      background:
                        'linear-gradient(to right, rgba(74,139,194,0.5), transparent)',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 24,
                  }}
                >
                  {tracks.map((tr, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        showToast(
                          t(
                            'Ready to play — add a YouTube ID first',
                            'جاهز للتشغيل — أضف معرّف يوتيوب أولاً'
                          )
                        )
                      }
                      style={trackCardStyle(isAr)}
                    >
                      <div style={trackCoverStyle(cat)}>
                        <span
                          style={{
                            fontSize: '3rem',
                            color: 'rgba(200,220,245,0.9)',
                            textShadow: '0 0 30px rgba(74,139,194,0.8)',
                          }}
                        >
                          {CATEGORY_GLYPHS[cat] || '☾'}
                        </span>
                      </div>
                      <div
                        style={{
                          padding: '18px 20px 20px',
                          textAlign: isAr ? 'right' : 'left',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Marcellus', serif",
                            fontSize: '0.95rem',
                            letterSpacing: isAr ? 0 : '0.12em',
                            color: 'var(--white)',
                            marginBottom: 6,
                            textTransform: isAr ? 'none' : 'uppercase',
                          }}
                        >
                          {isAr ? tr.titleAr : tr.titleEn}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.6rem',
                            letterSpacing: isAr ? 0 : '0.2em',
                            textTransform: isAr ? 'none' : 'uppercase',
                            color: 'var(--silver)',
                          }}
                        >
                          <span style={{ color: 'var(--soft-blue)' }}>
                            {isAr
                              ? CATEGORY_NAMES[cat]?.ar
                              : CATEGORY_NAMES[cat]?.en}
                          </span>
                          <span>{tr.duration || '—'}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========== TOAST ========== */}
      {toastVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 32px',
            background: 'rgba(13,27,62,0.95)',
            border: '1px solid rgba(160,200,240,0.4)',
            borderRadius: 50,
            fontFamily: "'Marcellus', serif",
            fontSize: '0.75rem',
            letterSpacing: isAr ? 0 : '0.2em',
            textTransform: isAr ? 'none' : 'uppercase',
            backdropFilter: 'blur(14px)',
            zIndex: 2000,
            boxShadow: '0 0 40px rgba(74,139,194,0.4)',
          }}
        >
          {toast}
        </div>
      )}

      {/* ========== KEYFRAMES ========== */}
      <style jsx global>{`
        @keyframes hypnoBreathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
        }
        @keyframes hypnoDrift {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120vh) translateX(40px); opacity: 0; }
        }
        @keyframes hypnoGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(74,139,194,0.6); }
          50% { text-shadow: 0 0 80px rgba(74,139,194,1), 0 0 120px rgba(42,90,156,0.6); }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   STYLE HELPERS
   ========================================================= */

const chipStyle = (active: boolean, isAr: boolean): React.CSSProperties => ({
  padding: '10px 20px',
  border: `1px solid ${active ? 'var(--soft-blue)' : 'rgba(74,139,194,0.3)'}`,
  borderRadius: 50,
  background: active ? 'rgba(74,139,194,0.35)' : 'rgba(13,27,62,0.35)',
  color: active ? 'var(--white)' : 'var(--silver)',
  fontFamily: "'Marcellus', serif",
  fontSize: '0.68rem',
  letterSpacing: isAr ? 0 : '0.15em',
  textTransform: isAr ? 'none' : 'uppercase',
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  backdropFilter: 'blur(8px)',
  boxShadow: active ? '0 0 24px rgba(74,139,194,0.5)' : 'none',
});

const trackCardStyle = (isAr: boolean): React.CSSProperties => ({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  cursor: 'pointer',
  background: 'rgba(13,27,62,0.45)',
  border: '1px solid rgba(74,139,194,0.25)',
  backdropFilter: 'blur(12px)',
  padding: 0,
  transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
  textAlign: isAr ? 'right' : 'left',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
});

const trackCoverStyle = (cat: string): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'radial-gradient(circle at 50% 50%, #14223e 0%, #0a1428 55%, #050812 100%)',
  overflow: 'hidden',
});
