'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../layout';

/* =========================================================
   TYPES
   ========================================================= */

interface SavedLetter {
  id: string;
  title: string;
  text: string;
  date: string;
  status?: 'saved' | 'archived';
  templateId?: string;
}

interface BottledLetter {
  id: string;
  title: string;
  text: string;
  date: string;
  templateId: string;
  bottleSeed: number;
}

interface JournalEntry {
  id: string;
  title: string;
  text: string;
  mood: string | null;
  date: string;
}

interface Journal {
  id: string;
  name: string;
  theme: string;
  entries: JournalEntry[];
  createdAt: string;
}

/* =========================================================
   STORAGE KEYS
   ========================================================= */

const SAVED_LETTERS_KEY = 'release_letters_v1';
const BOTTLES_KEY = 'lilith_bottles_v1';
const JOURNALS_KEY = 'lilith_journals_v1';

const THEME_COLORS: Record<string, string> = {
  midnight: '#1a2540',
  celestial: '#101a3a',
  gothic: '#0a0a0e',
  dream: '#253256',
  ocean: '#0e3054',
  minimal: '#f0ece4',
  witching: '#191424',
  vintage: '#3a2842',
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function VaultPage() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [savedLetters, setSavedLetters] = useState<SavedLetter[]>([]);
  const [bottledLetters, setBottledLetters] = useState<BottledLetter[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [openLetter, setOpenLetter] = useState<
    SavedLetter | BottledLetter | null
  >(null);
  const [openBottleText, setOpenBottleText] = useState<string | null>(null);
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      size: string;
      delay: string;
      duration: string;
      opacity: number;
    }>
  >([]);

  /* ====== Load from localStorage ====== */
  useEffect(() => {
    try {
      setSavedLetters(
        JSON.parse(localStorage.getItem(SAVED_LETTERS_KEY) || '[]')
      );
      setBottledLetters(JSON.parse(localStorage.getItem(BOTTLES_KEY) || '[]'));
      setJournals(JSON.parse(localStorage.getItem(JOURNALS_KEY) || '[]'));
    } catch {}
  }, []);

  /* ====== Ambient particles ====== */
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: `${0.6 + Math.random() * 1.6}px`,
        delay: `-${Math.random() * 25}s`,
        duration: `${4 + Math.random() * 8}s`,
        opacity: 0.15 + Math.random() * 0.55,
      });
    }
    setParticles(arr);
  }, []);

  /* ====== Totals ====== */
  const totalEntries = journals.reduce((sum, j) => sum + j.entries.length, 0);
  const totalItems = savedLetters.length + bottledLetters.length + totalEntries;
  const isEmpty = totalItems === 0;

  /* ====== Helpers ====== */
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const shortDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const truncate = (text: string, len = 120) => {
    const clean = text.replace(/\s+/g, ' ').trim();
    return clean.length > len ? clean.slice(0, len) + '…' : clean;
  };

  const deleteSavedLetter = (id: string) => {
    if (!confirm(t('Delete this forever?', 'حذف هذا نهائيًا؟'))) return;
    const next = savedLetters.filter((l) => l.id !== id);
    setSavedLetters(next);
    localStorage.setItem(SAVED_LETTERS_KEY, JSON.stringify(next));
  };

  const deleteBottle = (id: string) => {
    if (
      !confirm(
        t(
          'Release this bottle back to the sea?',
          'إعادة هذه الزجاجة إلى البحر؟'
        )
      )
    )
      return;
    const next = bottledLetters.filter((b) => b.id !== id);
    setBottledLetters(next);
    localStorage.setItem(BOTTLES_KEY, JSON.stringify(next));
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '140px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* ========== BACKGROUND ========== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse at 50% 25%, #16284c 0%, #0a1428 45%, #050812 75%, #02040a 100%)',
        }}
      />

      {/* Breathing glow */}
      <div
        style={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(74,139,194,0.18) 0%, rgba(42,90,156,0.06) 45%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'vaultBreathe 20s ease-in-out infinite',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Stars */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'rgba(220, 230, 245, 0.9)',
              boxShadow: '0 0 5px rgba(160, 200, 240, 0.6)',
              opacity: p.opacity,
              animation: `vaultTwinkle ${p.duration} ease-in-out infinite`,
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
            radial-gradient(ellipse at 50% 40%, rgba(5,10,20,0) 0%, rgba(5,10,20,0.4) 55%, rgba(2,4,10,0.92) 100%),
            linear-gradient(to bottom, rgba(5,10,20,0.5) 0%, transparent 25%, transparent 70%, rgba(2,4,10,0.9) 100%)
          `,
        }}
      />

      {/* ========== CONTENT ========== */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* ========== HEADER ========== */}
        <div
          className="fade-up"
          style={{
            textAlign: 'center',
            marginBottom: 70,
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
            {t('THE VAULT', 'الخزنة')}
          </div>
          <h2
            style={{
              fontFamily: "'Marcellus', serif",
              fontSize: isAr ? '2.4rem' : '3rem',
              letterSpacing: isAr ? 0 : '0.2em',
              marginBottom: 20,
              textShadow:
                '0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(74,139,194,0.7), 0 0 120px rgba(42,90,156,0.4)',
            }}
          >
            {t('WHAT YOU KEPT', 'ما حفظته')}
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: isAr ? 'normal' : 'italic',
              fontSize: '1.15rem',
              color: 'var(--silver)',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.9,
              textShadow: '0 2px 12px rgba(0,0,0,0.95)',
            }}
          >
            {t(
              'Everything you saved, released, wrote, and understood. Kept quietly, only for you.',
              'كل ما حفظته، وأطلقته، وكتبته، وفهمته. محفوظ بهدوء، لك وحدك.'
            )}
          </p>
        </div>

        {/* ========== EMPTY STATE ========== */}
        {isEmpty && (
          <div
            className="fade-up"
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              animationDelay: '0.5s',
            }}
          >
            <div
              style={{
                fontSize: '4rem',
                color: 'var(--soft-blue)',
                marginBottom: 32,
                opacity: 0.55,
                textShadow: '0 0 60px rgba(74,139,194,0.8)',
                animation: 'vaultGlow 7s ease-in-out infinite',
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
                marginBottom: 20,
                color: 'var(--white)',
                textShadow:
                  '0 2px 20px rgba(0,0,0,0.9), 0 0 30px rgba(74,139,194,0.5)',
              }}
            >
              {t('THE VAULT IS QUIET', 'الخزنة هادئة')}
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: isAr ? 'normal' : 'italic',
                color: 'var(--silver)',
                lineHeight: 2,
                fontSize: '1.15rem',
                maxWidth: 520,
                margin: '0 auto',
              }}
            >
              {t(
                'Nothing has been saved yet. When you write in the Release Room or the Journal, your words will find their way here.',
                'لم يُحفظ شيء بعد. عندما تكتب في غرفة التحرّر أو المُذكّرات، ستعثر كلماتك على طريقها إلى هنا.'
              )}
            </p>
          </div>
        )}

        {/* ========== STATS STRIP ========== */}
        {!isEmpty && (
          <div
            className="fade-up"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              marginBottom: 80,
              flexWrap: 'wrap',
              animationDelay: '0.4s',
            }}
          >
            {[
              {
                count: savedLetters.length,
                en: 'Saved Letters',
                ar: 'رسائل محفوظة',
                icon: '❦',
              },
              {
                count: bottledLetters.length,
                en: 'Bottled Letters',
                ar: 'زجاجات مختومة',
                icon: '🍾',
              },
              {
                count: totalEntries,
                en: 'Journal Entries',
                ar: 'صفحات مُذكّرات',
                icon: '☾',
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--soft-blue)',
                    textShadow: '0 0 15px rgba(74,139,194,0.7)',
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Marcellus', serif",
                    fontSize: '1.8rem',
                    color: 'var(--white)',
                    textShadow: '0 0 20px rgba(74,139,194,0.5)',
                  }}
                >
                  {stat.count}
                </div>
                <div
                  style={{
                    fontFamily: "'Marcellus', serif",
                    fontSize: '0.65rem',
                    letterSpacing: isAr ? 0 : '0.25em',
                    textTransform: isAr ? 'none' : 'uppercase',
                    color: 'var(--silver)',
                    opacity: 0.7,
                  }}
                >
                  {isAr ? stat.ar : stat.en}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== SHELF 1: SAVED LETTERS ==================== */}
        {savedLetters.length > 0 && (
          <section style={{ marginBottom: 90 }}>
            <ShelfTitle
              icon="❦"
              en="Saved Letters"
              ar="رسائل محفوظة"
              isAr={isAr}
              count={savedLetters.length}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {savedLetters.map((letter) => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  isAr={isAr}
                  onOpen={() => setOpenLetter(letter)}
                  onDelete={() => deleteSavedLetter(letter.id)}
                  formatDate={shortDate}
                  truncate={truncate}
                  t={t}
                />
              ))}
            </div>
          </section>
        )}

        {/* ==================== SHELF 2: BOTTLED LETTERS ==================== */}
        {bottledLetters.length > 0 && (
          <section style={{ marginBottom: 90 }}>
            <ShelfTitle
              icon="🍾"
              en="Bottled Letters"
              ar="زجاجات مختومة"
              isAr={isAr}
              count={bottledLetters.length}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 24,
              }}
            >
              {bottledLetters.map((bottle) => (
                <BottleCard
                  key={bottle.id}
                  bottle={bottle}
                  isAr={isAr}
                  onOpen={() => setOpenBottleText(bottle.text)}
                  onDelete={() => deleteBottle(bottle.id)}
                  formatDate={shortDate}
                  t={t}
                />
              ))}
            </div>
          </section>
        )}

        {/* ==================== SHELF 3: JOURNAL NOTEBOOKS ==================== */}
        {journals.length > 0 && (
          <section style={{ marginBottom: 90 }}>
            <ShelfTitle
              icon="☾"
              en="Your Journals"
              ar="مُذكّراتك"
              isAr={isAr}
              count={journals.length}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 24,
              }}
            >
              {journals.map((j) => (
                <JournalCard
                  key={j.id}
                  journal={j}
                  isAr={isAr}
                  t={t}
                  formatDate={shortDate}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ==================== LETTER MODAL ==================== */}
      {openLetter && (
        <div
          className="vault-modal-backdrop"
          onClick={() => setOpenLetter(null)}
        >
          <div className="vault-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vault-modal-header">
              <div
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '0.7rem',
                  letterSpacing: isAr ? 0 : '0.3em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  color: 'var(--soft-blue)',
                  marginBottom: 8,
                  textShadow: '0 0 15px rgba(74,139,194,0.6)',
                }}
              >
                {isAr ? 'رسالة محفوظة' : 'SAVED LETTER'}
              </div>
              <h3
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '1.3rem',
                  letterSpacing: isAr ? 0 : '0.15em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  color: 'var(--white)',
                  marginBottom: 8,
                }}
              >
                {openLetter.title}
              </h3>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: isAr ? 'normal' : 'italic',
                  fontSize: '0.85rem',
                  color: 'var(--silver)',
                  opacity: 0.7,
                }}
              >
                {formatDate(openLetter.date)}
              </div>
            </div>
            <div className="vault-modal-body">
              <div
                style={{
                  fontFamily: isAr
                    ? "'Tajawal', sans-serif"
                    : "'Cormorant Garamond', serif",
                  fontSize: isAr ? '1.05rem' : '1.15rem',
                  lineHeight: 1.95,
                  color: 'var(--white)',
                  whiteSpace: 'pre-wrap',
                  textAlign: isAr ? 'right' : 'left',
                }}
              >
                {openLetter.text}
              </div>
            </div>
            <button
              className="vault-modal-close"
              onClick={() => setOpenLetter(null)}
            >
              {t('Close', 'إغلاق')}
            </button>
          </div>
        </div>
      )}

      {/* ==================== BOTTLE OPEN MODAL ==================== */}
      {openBottleText !== null && (
        <div
          className="vault-modal-backdrop"
          onClick={() => setOpenBottleText(null)}
        >
          <div
            className="vault-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background:
                'linear-gradient(160deg, rgba(30,50,90,0.95), rgba(10,20,45,0.95))',
              border: '1px solid rgba(160,200,240,0.4)',
            }}
          >
            <div className="vault-modal-header">
              <div
                style={{
                  fontSize: '2rem',
                  color: 'var(--soft-blue)',
                  marginBottom: 16,
                  textShadow: '0 0 25px rgba(74,139,194,0.9)',
                }}
              >
                🍾
              </div>
              <h3
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '1.2rem',
                  letterSpacing: isAr ? 0 : '0.15em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  color: 'var(--white)',
                  marginBottom: 8,
                }}
              >
                {t('A message from the sea', 'رسالة من البحر')}
              </h3>
            </div>
            <div className="vault-modal-body">
              <div
                style={{
                  fontFamily: isAr
                    ? "'Tajawal', sans-serif"
                    : "'Cormorant Garamond', serif",
                  fontSize: isAr ? '1.05rem' : '1.15rem',
                  lineHeight: 1.95,
                  color: 'var(--white)',
                  whiteSpace: 'pre-wrap',
                  textAlign: isAr ? 'right' : 'left',
                }}
              >
                {openBottleText}
              </div>
            </div>
            <button
              className="vault-modal-close"
              onClick={() => setOpenBottleText(null)}
            >
              {t('Close', 'إغلاق')}
            </button>
          </div>
        </div>
      )}

      {/* ==================== STYLES ==================== */}
      <style jsx global>{`
        @keyframes vaultBreathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
        }
        @keyframes vaultTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        @keyframes vaultGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(74,139,194,0.6); }
          50% { text-shadow: 0 0 90px rgba(74,139,194,1), 0 0 130px rgba(42,90,156,0.7); }
        }

        .vault-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(5,5,8,0.92);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: vaultFadeIn 0.5s ease;
        }

        @keyframes vaultFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .vault-modal {
          width: 100%;
          max-width: 620px;
          max-height: 85vh;
          background: linear-gradient(160deg, rgba(20,30,50,0.97), rgba(10,15,28,0.97));
          border: 1px solid rgba(160,200,240,0.35);
          border-radius: 18px;
          padding: 40px 44px 36px;
          box-shadow:
            0 60px 140px rgba(0,0,0,0.95),
            0 0 100px rgba(74,139,194,0.3),
            0 0 180px rgba(42,90,156,0.15);
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: vaultModalIn 0.6s cubic-bezier(0.16,1,0.3,1);
        }

        @keyframes vaultModalIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .vault-modal-header { flex-shrink: 0; }

        .vault-modal-body {
          flex: 1;
          overflow-y: auto;
          padding-right: 8px;
          max-height: 55vh;
        }

        .vault-modal-body::-webkit-scrollbar { width: 4px; }
        .vault-modal-body::-webkit-scrollbar-thumb {
          background: rgba(74,139,194,0.3);
          border-radius: 2px;
        }

        .vault-modal-close {
          align-self: flex-end;
          padding: 14px 32px;
          border-radius: 50px;
          border: 1px solid rgba(160,200,240,0.35);
          background: rgba(74,139,194,0.15);
          color: var(--white);
          font-family: 'Marcellus', serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .vault-modal-close:hover {
          border-color: var(--soft-blue);
          background: rgba(74,139,194,0.3);
          box-shadow: 0 0 25px rgba(74,139,194,0.5);
        }

        [dir='rtl'] .vault-modal-close {
          letter-spacing: 0;
          text-transform: none;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
        }

        @media (max-width: 720px) {
          .vault-modal {
            padding: 30px 24px 24px;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   SUB-COMPONENTS
   ========================================================= */

function ShelfTitle({
  icon,
  en,
  ar,
  isAr,
  count,
}: {
  icon: string;
  en: string;
  ar: string;
  isAr: boolean;
  count: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 30,
        paddingBottom: 14,
        borderBottom: '1px solid rgba(74,139,194,0.15)',
      }}
    >
      <span
        style={{
          fontSize: '1.5rem',
          color: 'var(--soft-blue)',
          textShadow: '0 0 20px rgba(74,139,194,0.7)',
        }}
      >
        {icon}
      </span>
      <h3
        style={{
          fontFamily: "'Marcellus', serif",
          fontSize: isAr ? '1.3rem' : '1.1rem',
          letterSpacing: isAr ? 0 : '0.25em',
          textTransform: isAr ? 'none' : 'uppercase',
          color: 'var(--white)',
          textShadow: '0 2px 15px rgba(0,0,0,0.9)',
          margin: 0,
        }}
      >
        {isAr ? ar : en}
      </h3>
      <span
        style={{
          fontFamily: "'Marcellus', serif",
          fontSize: '0.7rem',
          letterSpacing: isAr ? 0 : '0.2em',
          color: 'var(--silver)',
          opacity: 0.6,
          marginLeft: isAr ? 0 : 'auto',
          marginRight: isAr ? 'auto' : 0,
        }}
      >
        {count}
      </span>
    </div>
  );
}

function LetterCard({
  letter,
  isAr,
  onOpen,
  onDelete,
  formatDate,
  truncate,
  t,
}: {
  letter: SavedLetter;
  isAr: boolean;
  onOpen: () => void;
  onDelete: () => void;
  formatDate: (iso: string) => string;
  truncate: (text: string, len?: number) => string;
  t: (en: string, ar: string) => string;
}) {
  return (
    <div
      onClick={onOpen}
      style={{
        position: 'relative',
        padding: '24px 26px',
        background:
          'linear-gradient(160deg, rgba(30,50,90,0.5), rgba(15,25,50,0.5))',
        border: '1px solid rgba(160,200,240,0.2)',
        borderRadius: 14,
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        backdropFilter: 'blur(12px)',
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(160,200,240,0.5)';
        e.currentTarget.style.boxShadow =
          '0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(74,139,194,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(160,200,240,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          fontFamily: "'Marcellus', serif",
          fontSize: '0.85rem',
          letterSpacing: isAr ? 0 : '0.15em',
          textTransform: isAr ? 'none' : 'uppercase',
          color: 'var(--white)',
          marginBottom: 4,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}
      >
        {letter.title}
      </div>
      <div
        style={{
          fontFamily: isAr
            ? "'Tajawal', sans-serif"
            : "'Cormorant Garamond', serif",
          fontStyle: isAr ? 'normal' : 'italic',
          fontSize: isAr ? '0.9rem' : '0.95rem',
          lineHeight: 1.6,
          color: 'var(--silver)',
          opacity: 0.8,
          flex: 1,
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {truncate(letter.text)}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid rgba(160,200,240,0.12)',
        }}
      >
        <span
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '0.62rem',
            letterSpacing: isAr ? 0 : '0.25em',
            textTransform: isAr ? 'none' : 'uppercase',
            color: 'var(--soft-blue)',
            opacity: 0.75,
          }}
        >
          {formatDate(letter.date)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(160,180,200,0.5)',
            fontSize: '0.9rem',
            cursor: 'pointer',
            padding: 4,
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#e88')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'rgba(160,180,200,0.5)')
          }
          title={t('Delete', 'حذف')}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function BottleCard({
  bottle,
  isAr,
  onOpen,
  onDelete,
  formatDate,
  t,
}: {
  bottle: BottledLetter;
  isAr: boolean;
  onOpen: () => void;
  onDelete: () => void;
  formatDate: (iso: string) => string;
  t: (en: string, ar: string) => string;
}) {
  return (
    <div
      onClick={onOpen}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        gap: 16,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 90,
          height: 200,
          animation: 'bottleFloat 6s ease-in-out infinite',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))',
        }}
      >
        {/* Cork */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 34,
            height: 22,
            background: 'linear-gradient(180deg, #a8845c, #6a4e2e)',
            borderRadius: '3px 3px 5px 5px',
            boxShadow: 'inset 0 2px 4px rgba(255,220,180,0.3)',
            zIndex: 5,
          }}
        />
        {/* Neck */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 34,
            height: 50,
            background:
              'linear-gradient(to right, rgba(140,180,220,0.4), rgba(220,240,250,0.5), rgba(140,180,220,0.4))',
            borderRadius: 3,
            backdropFilter: 'blur(1px)',
          }}
        />
        {/* Shoulder */}
        <div
          style={{
            position: 'absolute',
            top: 68,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 84,
            height: 22,
            background:
              'linear-gradient(to right, rgba(140,180,220,0.4), rgba(220,240,250,0.5), rgba(140,180,220,0.4))',
            borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%',
          }}
        />
        {/* Body */}
        <div
          style={{
            position: 'absolute',
            top: 82,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 118,
            background:
              'linear-gradient(to right, rgba(140,180,220,0.5), rgba(220,240,250,0.55), rgba(140,180,220,0.5))',
            borderRadius: '8px 8px 16px 16px',
            backdropFilter: 'blur(1px)',
            boxShadow:
              'inset 0 0 30px rgba(255,255,255,0.3), inset -8px 0 16px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Paper inside */}
          <div
            style={{
              position: 'absolute',
              top: 30,
              left: '50%',
              transform: 'translateX(-50%) rotate(-6deg)',
              width: 40,
              height: 65,
              background: 'linear-gradient(160deg, #f6efe0, #d8c8a8)',
              borderRadius: 2,
              opacity: 0.85,
            }}
          />
          {/* Highlight */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 8,
              width: 6,
              height: 85,
              borderRadius: 50,
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
              filter: 'blur(2px)',
            }}
          />
        </div>
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(160,200,240,0.25), transparent 70%)',
            filter: 'blur(15px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </div>

      <div
        style={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '0.62rem',
            letterSpacing: isAr ? 0 : '0.25em',
            textTransform: isAr ? 'none' : 'uppercase',
            color: 'var(--soft-blue)',
            opacity: 0.7,
            marginBottom: 4,
          }}
        >
          {formatDate(bottle.date)}
        </div>
        <div
          style={{
            fontFamily: isAr
              ? "'Tajawal', sans-serif"
              : "'Cormorant Garamond', serif",
            fontStyle: isAr ? 'normal' : 'italic',
            fontSize: '0.75rem',
            color: 'var(--silver)',
            opacity: 0.6,
            marginBottom: 8,
            lineHeight: 1.5,
          }}
        >
          {isAr ? 'اضغط لفتح الزجاجة' : 'Tap to open the bottle'}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(160,180,200,0.4)',
            fontSize: '0.7rem',
            letterSpacing: isAr ? 0 : '0.15em',
            textTransform: isAr ? 'none' : 'uppercase',
            fontFamily: "'Marcellus', serif",
            cursor: 'pointer',
            padding: 4,
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#e88')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'rgba(160,180,200,0.4)')
          }
        >
          {t('Release', 'أطلق')}
        </button>
      </div>
    </div>
  );
}

function JournalCard({
  journal,
  isAr,
  t,
  formatDate,
}: {
  journal: Journal;
  isAr: boolean;
  t: (en: string, ar: string) => string;
  formatDate: (iso: string) => string;
}) {
  const color = THEME_COLORS[journal.theme] || '#1a2540';

  return (
    <div
      style={{
        position: 'relative',
        padding: 24,
        background:
          'linear-gradient(160deg, rgba(30,50,90,0.5), rgba(15,25,50,0.5))',
        border: '1px solid rgba(160,200,240,0.2)',
        borderRadius: 14,
        backdropFilter: 'blur(12px)',
        display: 'flex',
        gap: 18,
        alignItems: 'center',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(160,200,240,0.45)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(160,200,240,0.2)';
      }}
    >
      {/* Miniature book cover */}
      <div
        style={{
          width: 60,
          height: 85,
          borderRadius: '3px 8px 8px 3px',
          background: color,
          boxShadow:
            'inset -4px 0 10px rgba(0,0,0,0.4), 0 6px 15px rgba(0,0,0,0.5)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 5,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
            borderRadius: '3px 0 0 3px',
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '0.9rem',
            letterSpacing: isAr ? 0 : '0.12em',
            textTransform: isAr ? 'none' : 'uppercase',
            color: 'var(--white)',
            marginBottom: 8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {journal.name}
        </div>
        <div
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: '0.62rem',
            letterSpacing: isAr ? 0 : '0.22em',
            textTransform: isAr ? 'none' : 'uppercase',
            color: 'var(--soft-blue)',
            opacity: 0.75,
            marginBottom: 6,
          }}
        >
          {isAr
            ? `${journal.entries.length} صفحة`
            : `${journal.entries.length} ${
                journal.entries.length === 1 ? 'page' : 'pages'
              }`}
        </div>
        <div
          style={{
            fontFamily: isAr
              ? "'Tajawal', sans-serif"
              : "'Cormorant Garamond', serif",
            fontStyle: isAr ? 'normal' : 'italic',
            fontSize: '0.75rem',
            color: 'var(--silver)',
            opacity: 0.6,
          }}
        >
          {formatDate(journal.createdAt)}
        </div>
      </div>
    </div>
  );
}
