'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../layout';

/* =========================================================
   TYPES
   ========================================================= */

interface BottledLetter {
  id: string;
  title: string;
  text: string;
  date: string;
  templateId: string;
  bottleSeed: number; // used for consistent bottle color per letter
}

interface Template {
  id: string;
  labelEn: string;
  labelAr: string;
  titleEn: string;
  titleAr: string;
  placeholderEn: string;
  placeholderAr: string;
  paperBg: string;
  ink: string;
  font: string;
  fontSize: string;
  accent: string;
}

/* =========================================================
   TEMPLATES
   ========================================================= */

const TEMPLATES: Template[] = [
  {
    id: 'never-send',
    labelEn: 'A Letter I Will Never Send',
    labelAr: 'رسالة لن أرسلها أبدًا',
    titleEn: 'A LETTER I WILL NEVER SEND',
    titleAr: 'رسالة لن أرسلها أبدًا',
    placeholderEn:
      'Start anywhere. No one will read this unless you choose to release it.',
    placeholderAr: 'ابدأ من أي مكان. لن يقرأ أحد هذا إلا إذا اخترت أن تطلقه.',
    paperBg: 'linear-gradient(160deg, #f6efe0 0%, #eae0c8 100%)',
    ink: '#1e1a16',
    font: "'Cormorant Garamond', serif",
    fontSize: '1.35rem',
    accent: '#5a7ab0',
  },
  {
    id: 'unsent',
    labelEn: 'Unsent Letter',
    labelAr: 'رسالة لم تُرسَل',
    titleEn: 'AN UNSENT LETTER',
    titleAr: 'رسالة لم تُرسَل',
    placeholderEn: 'The letter you never had the chance to give them...',
    placeholderAr: 'الرسالة التي لم تسنح لك الفرصة لتسليمها...',
    paperBg: 'linear-gradient(160deg, #f1e8d5 0%, #e2d5bb 100%)',
    ink: '#25201a',
    font: "'Cormorant Garamond', serif",
    fontSize: '1.35rem',
    accent: '#6d7a90',
  },
  {
    id: 'goodbye',
    labelEn: 'Goodbye Letter',
    labelAr: 'رسالة وداع',
    titleEn: 'A GOODBYE LETTER',
    titleAr: 'رسالة وداع',
    placeholderEn: 'Say goodbye, even if only here. Even if only to the page.',
    placeholderAr: 'قل وداعًا، ولو هنا فقط. ولو للصفحة فقط.',
    paperBg: 'linear-gradient(160deg, #e4e6ea 0%, #cdd2d8 100%)',
    ink: '#232a35',
    font: "'Cormorant Garamond', serif",
    fontSize: '1.3rem',
    accent: '#7a8fa8',
  },
  {
    id: 'anger',
    labelEn: 'Anger Letter',
    labelAr: 'رسالة غضب',
    titleEn: 'AN ANGER LETTER',
    titleAr: 'رسالة غضب',
    placeholderEn: 'Everything you were told not to feel. Put it here.',
    placeholderAr: 'كل ما قيل لك ألا تشعره. ضعه هنا.',
    paperBg: 'linear-gradient(160deg, #edd8c8 0%, #d6bda8 100%)',
    ink: '#3a1c12',
    font: "'Special Elite', 'Courier New', monospace",
    fontSize: '1.05rem',
    accent: '#b45a3c',
  },
  {
    id: 'love',
    labelEn: 'Love Letter',
    labelAr: 'رسالة حب',
    titleEn: 'A LOVE LETTER',
    titleAr: 'رسالة حب',
    placeholderEn: 'Say the tender thing. The page will hold it.',
    placeholderAr: 'قل الشيء الرقيق. الصفحة ستحمله.',
    paperBg: 'linear-gradient(160deg, #f4dde0 0%, #e6c8cc 100%)',
    ink: '#5a2a34',
    font: "'Dancing Script', cursive",
    fontSize: '1.6rem',
    accent: '#c88a9a',
  },
  {
    id: 'everything',
    labelEn: 'Everything I Never Said',
    labelAr: 'كل ما لم أقله',
    titleEn: 'EVERYTHING I NEVER SAID',
    titleAr: 'كل ما لم أقله',
    placeholderEn: 'All of it. Unedited. Unfiltered. Just let it out.',
    placeholderAr: 'كل شيء. دون تعديل. دون تصفية. أطلقه كله.',
    paperBg: 'linear-gradient(160deg, #e8e4dc 0%, #cfc8bc 100%)',
    ink: '#2a2620',
    font: "'Special Elite', 'Courier New', monospace",
    fontSize: '1.05rem',
    accent: '#8a7a5c',
  },
  {
    id: 'past',
    labelEn: 'To My Past Self',
    labelAr: 'إلى نفسي الماضية',
    titleEn: 'TO MY PAST SELF',
    titleAr: 'إلى نفسي الماضية',
    placeholderEn: 'What would you tell the version of you who had no idea?',
    placeholderAr: 'ماذا ستقول للنسخة منك التي لم تكن تعرف؟',
    paperBg: 'linear-gradient(160deg, #e0eaf0 0%, #c4d6e0 100%)',
    ink: '#1c3448',
    font: "'Cormorant Garamond', serif",
    fontSize: '1.3rem',
    accent: '#5a90b4',
  },
  {
    id: 'future',
    labelEn: 'To My Future Self',
    labelAr: 'إلى نفسي المستقبلية',
    titleEn: 'TO MY FUTURE SELF',
    titleAr: 'إلى نفسي المستقبلية',
    placeholderEn:
      'What do you hope you remember? What do you hope you became?',
    placeholderAr: 'ما تأمل أن تتذكره؟ ما تأمل أن تصير إليه؟',
    paperBg: 'linear-gradient(160deg, #eae4f0 0%, #cfc2dd 100%)',
    ink: '#2e2040',
    font: "'Cormorant Garamond', serif",
    fontSize: '1.3rem',
    accent: '#8e6cbf',
  },
];

const STORAGE_KEY = 'release_letters_v1';
const BOTTLES_KEY = 'lilith_bottles_v1';

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function ReleaseRoomPage() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [activeTemplateId, setActiveTemplateId] = useState('never-send');
  const [text, setText] = useState('');
  const [dateString, setDateString] = useState('');
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [ritual, setRitual] = useState<'none' | 'burning' | 'bottling'>('none');
  const [ritualMessage, setRitualMessage] = useState('');
  const [ritualSubMessage, setRitualSubMessage] = useState('');
  const [ritualComplete, setRitualComplete] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: string; delay: string; duration: string; opacity: number }>
  >([]);
  const [ashes, setAshes] = useState<
    Array<{
      left: string;
      top: string;
      delay: string;
      size: string;
      rotation: number;
    }>
  >([]);

  const ritualTextRef = useRef<string>('');

  const currentTemplate =
    TEMPLATES.find((x) => x.id === activeTemplateId) || TEMPLATES[0];

  /* ====== Ambient particles ====== */
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        left: Math.random() * 100 + '%',
        delay: `-${Math.random() * 60}s`,
        duration: `${25 + Math.random() * 40}s`,
        opacity: 0.15 + Math.random() * 0.45,
      });
    }
    setParticles(arr);

    // Pre-generate ash fragments for the burn ritual
    const ashArr = [];
    for (let i = 0; i < 60; i++) {
      ashArr.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        size: `${2 + Math.random() * 6}px`,
        rotation: Math.random() * 360,
      });
    }
    setAshes(ashArr);
  }, []);

  /* ====== Date ====== */
  useEffect(() => {
    setDateString(
      new Date()
        .toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        .toUpperCase()
    );
  }, [lang]);

  /* ====== Toast ====== */
  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2400);
  };

  /* ====== Save to Vault (regular) ====== */
  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      showToast(isAr ? 'لا يوجد شيء لحفظه بعد' : 'Nothing to save yet');
      return;
    }

    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    entries.unshift({
      id: Date.now().toString(36),
      title: isAr ? currentTemplate.titleAr : currentTemplate.titleEn,
      text: trimmed,
      date: new Date().toISOString(),
      status: 'saved',
      templateId: currentTemplate.id,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    setText('');
    showToast(isAr ? 'محفوظ في الخزنة' : 'Saved to your Vault');
  };

  /* ====== Burn ritual ====== */
  const handleBurn = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      showToast(
        isAr ? 'لا يوجد شيء لتُحرقه بعد' : 'There is nothing to burn yet'
      );
      return;
    }
    ritualTextRef.current = trimmed;
    setRitual('burning');
    setRitualComplete(false);

    setTimeout(() => {
      setRitualMessage(
        isAr
          ? 'أعطيتَ الكلمات مكانًا تذهب إليه.'
          : 'You gave the words somewhere to go.'
      );
      setRitualSubMessage(
        isAr
          ? 'لم تعد مضطرًا لحملهن بنفس الطريقة.'
          : 'You don’t have to carry them the same way anymore.'
      );
      setRitualComplete(true);
    }, 7000);
  };

  /* ====== Bottle ritual ====== */
  const handleBottle = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      showToast(
        isAr ? 'لا يوجد شيء لتحفظه بعد' : 'There is nothing to keep yet'
      );
      return;
    }

    // Save to Bottles collection
    const bottles: BottledLetter[] = JSON.parse(
      localStorage.getItem(BOTTLES_KEY) || '[]'
    );
    const newBottle: BottledLetter = {
      id: Date.now().toString(36),
      title: isAr ? currentTemplate.titleAr : currentTemplate.titleEn,
      text: trimmed,
      date: new Date().toISOString(),
      templateId: currentTemplate.id,
      bottleSeed: Math.floor(Math.random() * 1000),
    };
    bottles.unshift(newBottle);
    localStorage.setItem(BOTTLES_KEY, JSON.stringify(bottles));

    ritualTextRef.current = trimmed;
    setRitual('bottling');
    setRitualComplete(false);

    setTimeout(() => {
      setRitualMessage(
        isAr ? 'كلماتك محفوظة في زجاجة.' : 'Your words are sealed in a bottle.'
      );
      setRitualSubMessage(
        isAr
          ? 'ستجدها في قسم الزجاجات متى شئت.'
          : 'You will find it in your Bottles section whenever you wish.'
      );
      setRitualComplete(true);
    }, 7000);
  };

  /* ====== Close ritual ====== */
  const closeRitual = () => {
    setRitual('none');
    setRitualComplete(false);
    setRitualMessage('');
    setRitualSubMessage('');
    setText('');
    ritualTextRef.current = '';
  };

  /* ====== Paper styles from active template ====== */
  const paperStyle = {
    '--paper-bg': currentTemplate.paperBg,
    '--paper-ink': currentTemplate.ink,
    '--paper-font': currentTemplate.font,
    '--paper-font-size': currentTemplate.fontSize,
    '--paper-accent': currentTemplate.accent,
  } as React.CSSProperties;

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '130px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* ===== Ambient Backdrop ===== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse at 50% 30%, #12224a 0%, #0a1428 45%, #050812 75%, #02040a 100%)',
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1100px',
          height: '1100px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(74,139,194,0.18) 0%, rgba(42,90,156,0.08) 40%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'rrBreathe 16s ease-in-out infinite',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

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
              background: 'rgba(200,220,245,0.9)',
              boxShadow: '0 0 8px 1px rgba(74,139,194,0.6)',
              opacity: p.opacity,
              animation: `rrDrift ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(5,10,20,0) 0%, rgba(5,10,20,0.4) 55%, rgba(2,4,10,0.9) 100%),
            linear-gradient(to bottom, rgba(5,10,20,0.5) 0%, transparent 25%, transparent 70%, rgba(2,4,10,0.9) 100%)
          `,
        }}
      />

      {/* ===== Content ===== */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {/* ===== Header ===== */}
        <div
          className="fade-up"
          style={{
            textAlign: 'center',
            marginBottom: 50,
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
            {t('RELEASE ROOM', 'غرفة التحرّر')}
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
            {t('WRITE WHAT YOU CANNOT SAY.', 'اكتب ما لا تستطيع قوله.')}
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
              'Some things don’t need to be sent. They only need somewhere to exist.',
              'بعض الأشياء لا تحتاج أن تُرسل. تحتاج فقط مكانًا لتوجد فيه.'
            )}
          </p>
        </div>

        {/* ===== Template Chips ===== */}
        <div
          className="fade-up"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 40,
            animationDelay: '0.4s',
          }}
        >
          {TEMPLATES.map((tpl) => {
            const active = tpl.id === activeTemplateId;
            return (
              <button
                key={tpl.id}
                onClick={() => setActiveTemplateId(tpl.id)}
                style={{
                  padding: '10px 20px',
                  border: `1px solid ${
                    active ? 'var(--soft-blue)' : 'rgba(74,139,194,0.25)'
                  }`,
                  borderRadius: 50,
                  background: active
                    ? 'linear-gradient(135deg, rgba(74,139,194,0.35), rgba(42,90,156,0.35))'
                    : 'linear-gradient(135deg, rgba(20,35,65,0.7), rgba(10,18,35,0.7))',
                  color: active ? 'var(--white)' : 'var(--silver)',
                  fontFamily: isAr
                    ? "'Tajawal', sans-serif"
                    : "'Marcellus', serif",
                  fontSize: isAr ? '0.8rem' : '0.68rem',
                  letterSpacing: isAr ? 0 : '0.14em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: active ? '0 0 25px rgba(74,139,194,0.5)' : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: tpl.accent,
                    boxShadow: `0 0 10px ${tpl.accent}`,
                  }}
                />
                {isAr ? tpl.labelAr : tpl.labelEn}
              </button>
            );
          })}
        </div>

        {/* ===== The Paper ===== */}
        <div
          className="fade-up rr-paper-wrap"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 720,
            margin: '0 auto',
            animationDelay: '0.7s',
          }}
        >
          <div className="rr-paper" style={paperStyle}>
            <div className="rr-paper-texture" />
            <div className="rr-paper-edge" />

            <div className="rr-paper-header">
              <span
                style={{
                  fontFamily: isAr
                    ? "'Tajawal', sans-serif"
                    : "'Marcellus', serif",
                  fontSize: '0.68rem',
                  letterSpacing: isAr ? 0 : '0.3em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  opacity: 0.55,
                }}
              >
                {dateString}
              </span>
              <span
                style={{
                  fontFamily: isAr
                    ? "'Tajawal', sans-serif"
                    : "'Cormorant Garamond', serif",
                  fontSize: '0.72rem',
                  fontStyle: isAr ? 'normal' : 'italic',
                  opacity: 0.5,
                }}
              >
                {t('For my eyes only', 'لعيني فقط')}
              </span>
            </div>

            <h3 className="rr-paper-title">
              {isAr ? currentTemplate.titleAr : currentTemplate.titleEn}
            </h3>

            <div className="rr-paper-divider" />

            <textarea
              className="rr-paper-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                isAr
                  ? currentTemplate.placeholderAr
                  : currentTemplate.placeholderEn
              }
              style={{
                fontFamily: currentTemplate.font,
                fontSize: currentTemplate.fontSize,
              }}
            />

            <div className="rr-paper-footer">
              <span>☙</span>
              <span className="rr-paper-inkblot" />
              <span>❧</span>
            </div>
          </div>

          {/* ===== Ritual Buttons ===== */}
          <div
            className="fade-up"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              marginTop: 40,
              flexWrap: 'wrap',
              animationDelay: '1s',
            }}
          >
            <button className="rr-btn rr-btn-keep" onClick={handleSave}>
              <span
                style={{
                  fontSize: '1rem',
                  marginRight: isAr ? 0 : 8,
                  marginLeft: isAr ? 8 : 0,
                }}
              >
                ❦
              </span>
              {t('Save to Vault', 'احفظ في الخزنة')}
            </button>

            <button className="rr-btn rr-btn-bottle" onClick={handleBottle}>
              <span
                style={{
                  fontSize: '1rem',
                  marginRight: isAr ? 0 : 8,
                  marginLeft: isAr ? 8 : 0,
                }}
              >
                🍾
              </span>
              {t('Cast it in a Bottle', 'ألقِها في زجاجة')}
            </button>

            <button className="rr-btn rr-btn-burn" onClick={handleBurn}>
              <span
                style={{
                  fontSize: '1rem',
                  marginRight: isAr ? 0 : 8,
                  marginLeft: isAr ? 8 : 0,
                }}
              >
                🕯️
              </span>
              {t('Burn it', 'أحرقها')}
            </button>
          </div>
        </div>
      </div>

      {/* ===== RITUAL OVERLAY ===== */}
      {ritual !== 'none' && (
        <div className="rr-ritual-overlay">
          {/* BURNING RITUAL — full paper burns */}
          {ritual === 'burning' && (
            <div className="rr-burn-stage">
              <div className="rr-burn-paper">
                <div className="rr-burn-text">{ritualTextRef.current}</div>
                {/* Full-paper flame layer covers the whole card */}
                <div className="rr-burn-flame-full" />
                {/* Rising sparks */}
                {[...Array(50)].map((_, i) => (
                  <span
                    key={i}
                    className="rr-spark"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: `${Math.random() * 40}%`,
                      animationDelay: `${-Math.random() * 5}s`,
                      animationDuration: `${1.5 + Math.random() * 2.5}s`,
                    }}
                  />
                ))}
                {/* Ash fragments flaking off */}
                {ashes.map((a, i) => (
                  <span
                    key={`ash-${i}`}
                    className="rr-ash"
                    style={{
                      left: a.left,
                      top: a.top,
                      width: a.size,
                      height: a.size,
                      animationDelay: a.delay,
                      transform: `rotate(${a.rotation}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* BOTTLING RITUAL — realistic bottle */}
          {ritual === 'bottling' && (
            <div className="rr-bottle-stage">
              {/* The scroll that rolls up and enters the bottle */}
              <div className="rr-scroll">
                <div className="rr-scroll-text">{ritualTextRef.current}</div>
              </div>

              {/* Realistic glass bottle */}
              <div className="rr-glass-bottle">
                {/* Cork */}
                <div className="rr-cork">
                  <div className="rr-cork-top" />
                </div>

                {/* Neck */}
                <div className="rr-neck">
                  <div className="rr-neck-shine" />
                </div>

                {/* Shoulder */}
                <div className="rr-shoulder" />

                {/* Body */}
                <div className="rr-body">
                  {/* Paper inside — visible through glass */}
                  <div className="rr-body-paper" />

                  {/* Glass highlights */}
                  <div className="rr-body-shine-left" />
                  <div className="rr-body-shine-right" />
                  <div className="rr-body-reflection" />

                  {/* Water level line */}
                  <div className="rr-water-line" />
                </div>

                {/* Light glow around the glass */}
                <div className="rr-bottle-glow" />
              </div>

              {/* Sandy floor at the bottom */}
              <div className="rr-ocean-floor" />
            </div>
          )}

          {/* Completion message */}
          {ritualComplete && (
            <div className="rr-ritual-message">
              <p className="rr-ritual-text">{ritualMessage}</p>
              <p className="rr-ritual-subtext">{ritualSubMessage}</p>
              <button className="rr-return-btn" onClick={closeRitual}>
                {t('Return to Myself', 'عُد إلى نفسك')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== Toast ===== */}
      {toastVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 32px',
            background: 'rgba(13,27,62,0.95)',
            border: '1px solid rgba(160,200,240,0.4)',
            borderRadius: 50,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Marcellus', serif",
            fontSize: '0.78rem',
            letterSpacing: isAr ? 0 : '0.15em',
            textTransform: isAr ? 'none' : 'uppercase',
            backdropFilter: 'blur(14px)',
            zIndex: 2000,
            boxShadow: '0 0 40px rgba(74,139,194,0.4)',
          }}
        >
          {toast}
        </div>
      )}

      {/* ===== Styles ===== */}
      <style jsx global>{`
        @keyframes rrBreathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        @keyframes rrDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) translateX(30px); opacity: 0; }
        }

        /* =========================================================
           THE PAPER
           ========================================================= */
        .rr-paper {
          position: relative;
          background: var(--paper-bg);
          border-radius: 3px 6px 4px 5px;
          padding: 64px 72px 56px;
          color: var(--paper-ink);
          font-family: var(--paper-font);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.75),
            0 0 60px rgba(74, 139, 194, 0.12),
            inset 0 0 100px rgba(180, 160, 120, 0.15),
            0 1px 0 rgba(255, 255, 255, 0.4) inset;
          overflow: hidden;
          transition: background 0.9s ease, color 0.9s ease, font-family 0.5s ease;
        }

        .rr-paper-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background-image:
            repeating-linear-gradient(
              90deg,
              rgba(120, 100, 70, 0.015) 0px,
              rgba(120, 100, 70, 0.015) 1px,
              transparent 1px,
              transparent 4px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(120, 100, 70, 0.02) 0px,
              rgba(120, 100, 70, 0.02) 1px,
              transparent 1px,
              transparent 3px
            ),
            radial-gradient(circle at 20% 30%, rgba(200, 180, 140, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(180, 160, 130, 0.1) 0%, transparent 45%),
            radial-gradient(circle at 60% 90%, rgba(150, 130, 100, 0.08) 0%, transparent 35%);
          mix-blend-mode: multiply;
        }

        .rr-paper-edge {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          box-shadow:
            inset 0 0 40px rgba(120, 100, 60, 0.12),
            inset 6px 6px 20px rgba(255, 240, 210, 0.15),
            inset -6px -6px 20px rgba(120, 90, 50, 0.1);
        }

        .rr-paper-header {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 32px;
          padding-bottom: 18px;
          border-bottom: 1px dashed rgba(120, 100, 70, 0.3);
          color: var(--paper-ink);
          z-index: 1;
        }

        .rr-paper-title {
          position: relative;
          font-family: 'Marcellus', serif;
          font-size: 1.05rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--paper-ink);
          opacity: 0.72;
          margin-bottom: 20px;
          font-weight: 500;
          z-index: 1;
        }

        .rr-paper-divider {
          position: relative;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(120, 100, 70, 0.25) 20%,
            rgba(120, 100, 70, 0.35) 50%,
            rgba(120, 100, 70, 0.25) 80%,
            transparent 100%
          );
          margin-bottom: 28px;
          z-index: 1;
        }

        .rr-paper-textarea {
          position: relative;
          width: 100%;
          min-height: 340px;
          background: transparent;
          border: none;
          outline: none;
          resize: vertical;
          color: var(--paper-ink);
          line-height: 1.95;
          letter-spacing: 0.005em;
          caret-color: var(--paper-accent);
          transition: color 0.5s ease, font-family 0.5s ease;
          z-index: 1;
          display: block;
        }

        .rr-paper-textarea::placeholder {
          color: var(--paper-ink);
          opacity: 0.28;
          font-style: italic;
        }

        .rr-paper-footer {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 30px;
          padding-top: 18px;
          border-top: 1px dashed rgba(120, 100, 70, 0.3);
          color: var(--paper-ink);
          opacity: 0.4;
          font-size: 1rem;
          z-index: 1;
        }

        .rr-paper-inkblot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--paper-ink);
          opacity: 0.35;
        }

        /* =========================================================
           RITUAL BUTTONS
           ========================================================= */
        .rr-btn {
          padding: 16px 38px;
          border-radius: 50px;
          font-family: 'Marcellus', serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.5s ease;
          backdrop-filter: blur(12px);
          display: inline-flex;
          align-items: center;
          border: 1px solid transparent;
        }

        .rr-btn-keep {
          background: linear-gradient(135deg, rgba(30,50,90,0.6), rgba(15,25,50,0.6));
          border-color: rgba(160,200,240,0.3);
          color: var(--white);
        }
        .rr-btn-keep:hover {
          border-color: var(--soft-blue);
          background: linear-gradient(135deg, rgba(50,80,140,0.6), rgba(25,45,90,0.6));
          box-shadow: 0 0 30px rgba(74,139,194,0.4);
          transform: translateY(-2px);
        }

        .rr-btn-bottle {
          background: linear-gradient(135deg, rgba(40,70,110,0.5), rgba(20,40,80,0.5));
          border-color: rgba(140,180,220,0.4);
          color: #cfe6ff;
        }
        .rr-btn-bottle:hover {
          border-color: rgba(200,220,250,0.7);
          background: linear-gradient(135deg, rgba(60,100,160,0.6), rgba(30,60,110,0.6));
          box-shadow: 0 0 40px rgba(120,170,220,0.5);
          transform: translateY(-2px);
        }

        .rr-btn-burn {
          background: linear-gradient(135deg, rgba(60,30,20,0.5), rgba(30,15,10,0.5));
          border-color: rgba(200,120,80,0.4);
          color: #ffd8b8;
        }
        .rr-btn-burn:hover {
          border-color: rgba(255,150,100,0.7);
          background: linear-gradient(135deg, rgba(90,45,25,0.6), rgba(45,20,12,0.6));
          box-shadow: 0 0 40px rgba(200,120,60,0.5);
          transform: translateY(-2px);
        }

        [dir='rtl'] .rr-btn {
          letter-spacing: 0;
          text-transform: none;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
        }

        /* =========================================================
           RITUAL OVERLAY
           ========================================================= */
        .rr-ritual-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: radial-gradient(
            ellipse at 50% 55%,
            rgba(10,15,28,0.9) 0%,
            rgba(5,5,8,0.98) 70%
          );
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: rrRitualFadeIn 1.2s ease;
        }

        @keyframes rrRitualFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* =========================================================
           BURN RITUAL — full paper burns
           ========================================================= */
        .rr-burn-stage {
          position: relative;
          width: min(560px, 88vw);
          display: flex;
          justify-content: center;
          animation: rrBurnStageIn 2.5s ease forwards;
        }

        @keyframes rrBurnStageIn {
          0% { transform: translateY(20px) scale(0.96); opacity: 0; }
          30% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-10px) scale(1); opacity: 1; }
        }

        .rr-burn-paper {
          position: relative;
          width: 100%;
          padding: 50px 55px 60px;
          background: linear-gradient(160deg, #f6efe0 0%, #eae0c8 100%);
          border-radius: 3px;
          color: #1e1a16;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          line-height: 1.75;
          max-height: 60vh;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.85);
          /* The whole card curls and darkens */
          animation: rrBurnCurl 7s ease-in forwards;
          animation-delay: 1s;
        }

        /* The card gradually darkens, curls at edges, and dissolves */
        @keyframes rrBurnCurl {
          0% {
            filter: brightness(1) contrast(1);
            transform: translateY(0) scale(1);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.85), 0 0 0 rgba(255,150,60,0);
          }
          25% {
            filter: brightness(0.95) contrast(1.1) sepia(0.3);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255,150,60,0.5);
          }
          55% {
            filter: brightness(0.65) contrast(1.3) sepia(0.7) hue-rotate(-10deg);
            box-shadow: 0 20px 70px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255,120,40,0.7);
          }
          80% {
            filter: brightness(0.35) contrast(1.5) sepia(1) hue-rotate(-20deg);
            transform: translateY(-15px) scale(0.96) rotate(-1deg);
            box-shadow: 0 15px 60px rgba(0, 0, 0, 0.95), 0 0 100px rgba(255,100,30,0.5);
            opacity: 0.75;
          }
          100% {
            filter: brightness(0) contrast(2) sepia(1);
            transform: translateY(-40px) scale(0.7) rotate(-4deg);
            box-shadow: 0 0 0 rgba(0,0,0,0);
            opacity: 0;
          }
        }

        /* The hot orange flame that washes over the whole paper */
        .rr-burn-flame-full {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 50% 100%, rgba(255,200,80,0.9) 0%, rgba(255,120,30,0.7) 20%, rgba(200,50,10,0.4) 40%, transparent 70%),
            radial-gradient(ellipse at 50% 0%, transparent 60%, rgba(255,140,40,0.15) 80%, rgba(200,60,10,0.3) 100%);
          mix-blend-mode: screen;
          opacity: 0;
          animation: rrFullFlame 7s ease-in forwards;
          animation-delay: 1s;
        }

        @keyframes rrFullFlame {
          0% { opacity: 0; }
          20% { opacity: 0.5; }
          50% { opacity: 1; }
          80% { opacity: 0.9; }
          100% { opacity: 0; }
        }

        .rr-burn-text {
          position: relative;
          z-index: 1;
          white-space: pre-wrap;
          word-wrap: break-word;
          animation: rrBurnTextFade 7s ease-in forwards;
          animation-delay: 1s;
        }

        @keyframes rrBurnTextFade {
          0% { opacity: 1; filter: blur(0); }
          30% { opacity: 0.9; filter: blur(0.3px); }
          60% { opacity: 0.5; filter: blur(1px); }
          85% { opacity: 0.15; filter: blur(2px); }
          100% { opacity: 0; filter: blur(4px); }
        }

        /* Sparks rising from the paper */
        .rr-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ffd8a0;
          box-shadow: 0 0 10px 2px rgba(255,180,80,0.9);
          pointer-events: none;
          animation: rrSparkRise linear infinite;
        }

        @keyframes rrSparkRise {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-70vh) translateX(30px) scale(0.2); opacity: 0; }
        }

        /* Ash fragments flaking off */
        .rr-ash {
          position: absolute;
          border-radius: 50%;
          background: rgba(30, 20, 15, 0.8);
          box-shadow: 0 0 4px rgba(255, 150, 60, 0.6);
          pointer-events: none;
          opacity: 0;
          animation: rrAshFlake 4s ease-out infinite;
        }

        @keyframes rrAshFlake {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(60px, -200px) rotate(180deg); opacity: 0; }
        }

        /* =========================================================
           BOTTLE RITUAL — realistic glass bottle
           ========================================================= */
        .rr-bottle-stage {
          position: relative;
          width: min(600px, 90vw);
          height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* The scroll that rolls up and enters the bottle */
        .rr-scroll {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 200px;
          background: linear-gradient(180deg, #f6efe0 0%, #e6d8b8 100%);
          border-radius: 4px;
          box-shadow:
            inset -8px 0 20px rgba(120, 90, 50, 0.3),
            inset 8px 0 20px rgba(255, 240, 210, 0.4),
            0 20px 60px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          animation: rrScrollRoll 2.5s ease-in forwards;
          animation-delay: 0.5s;
        }

        @keyframes rrScrollRoll {
          0% { width: 400px; height: 200px; border-radius: 4px; opacity: 1; }
          100% { width: 30px; height: 200px; border-radius: 15px; opacity: 0; }
        }

        .rr-scroll-text {
          padding: 20px 30px;
          font-family: 'Cormorant Garamond', serif;
          color: #1e1a16;
          font-size: 0.9rem;
          line-height: 1.6;
          opacity: 1;
          animation: rrScrollTextFade 2s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes rrScrollTextFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ===== The Realistic Glass Bottle ===== */
        .rr-glass-bottle {
          position: relative;
          width: 130px;
          height: 300px;
          animation: rrBottleSink 4s ease-in forwards;
          animation-delay: 3s;
          opacity: 0;
          transform: translateY(-200px);
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
        }

        @keyframes rrBottleSink {
          0% { transform: translateY(-200px) rotate(-3deg); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translateY(40px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(0deg); opacity: 0.35; }
        }

        /* Cork */
        .rr-cork {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 46px;
          height: 28px;
          background: linear-gradient(
            180deg,
            #a8845c 0%,
            #c9a878 30%,
            #8a6a42 70%,
            #6a4e2e 100%
          );
          border-radius: 3px 3px 6px 6px;
          box-shadow:
            inset 0 2px 4px rgba(255,220,180,0.4),
            inset 0 -2px 4px rgba(0,0,0,0.3),
            0 2px 6px rgba(0,0,0,0.4);
          z-index: 5;
        }

        .rr-cork-top {
          position: absolute;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 6px;
          background: linear-gradient(180deg, #d4b088 0%, #b89468 100%);
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        /* Neck */
        .rr-neck {
          position: absolute;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 70px;
          background: linear-gradient(
            to right,
            rgba(150, 200, 230, 0.35) 0%,
            rgba(180, 220, 245, 0.15) 20%,
            rgba(220, 240, 250, 0.5) 45%,
            rgba(200, 230, 250, 0.25) 65%,
            rgba(140, 180, 220, 0.4) 100%
          );
          border-radius: 4px;
          backdrop-filter: blur(1px);
          box-shadow:
            inset 0 0 15px rgba(255, 255, 255, 0.25),
            inset -6px 0 12px rgba(0, 0, 0, 0.15);
        }

        .rr-neck-shine {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 6px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.7),
            rgba(255, 255, 255, 0)
          );
          filter: blur(1px);
        }

        /* Shoulder — where neck meets body */
        .rr-shoulder {
          position: absolute;
          top: 88px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 30px;
          background: linear-gradient(
            to right,
            rgba(140, 180, 220, 0.4) 0%,
            rgba(180, 220, 245, 0.2) 20%,
            rgba(220, 240, 250, 0.55) 45%,
            rgba(200, 230, 250, 0.3) 65%,
            rgba(130, 170, 210, 0.45) 100%
          );
          border-radius: 50% 50% 20% 20% / 60% 60% 40% 40%;
          box-shadow:
            inset 0 0 20px rgba(255, 255, 255, 0.3),
            inset -8px 0 16px rgba(0, 0, 0, 0.15);
        }

        /* Body */
        .rr-body {
          position: absolute;
          top: 108px;
          left: 50%;
          transform: translateX(-50%);
          width: 130px;
          height: 190px;
          background: linear-gradient(
            to right,
            rgba(140, 180, 220, 0.5) 0%,
            rgba(180, 220, 245, 0.25) 15%,
            rgba(220, 240, 250, 0.55) 40%,
            rgba(200, 230, 250, 0.35) 65%,
            rgba(150, 190, 225, 0.45) 85%,
            rgba(120, 160, 200, 0.5) 100%
          );
          border-radius: 10px 10px 20px 20px;
          backdrop-filter: blur(1px);
          box-shadow:
            inset 0 0 30px rgba(255, 255, 255, 0.3),
            inset -10px 0 20px rgba(0, 0, 0, 0.2),
            inset 10px 0 20px rgba(255, 255, 255, 0.15);
          overflow: hidden;
        }

        /* Paper visible through the glass */
        .rr-body-paper {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%) rotate(-8deg);
          width: 60px;
          height: 100px;
          background: linear-gradient(160deg, #f6efe0 0%, #e0d0b0 100%);
          border-radius: 2px;
          box-shadow:
            inset -3px 0 6px rgba(120, 90, 50, 0.3),
            inset 3px 0 6px rgba(255, 240, 210, 0.4),
            0 0 8px rgba(0,0,0,0.3);
          opacity: 0.9;
          animation: rrPaperFadeIn 1.5s ease forwards;
          animation-delay: 4.5s;
        }

        @keyframes rrPaperFadeIn {
          0% { opacity: 0; transform: translateX(-50%) rotate(-8deg) scale(0.8); }
          100% { opacity: 0.9; transform: translateX(-50%) rotate(-8deg) scale(1); }
        }

        /* Highlights on the glass */
        .rr-body-shine-left {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 8px;
          height: 140px;
          border-radius: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0)
          );
          filter: blur(2px);
        }

        .rr-body-shine-right {
          position: absolute;
          top: 20px;
          right: 18px;
          width: 4px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0)
          );
          filter: blur(1px);
        }

        .rr-body-reflection {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(
            to top,
            rgba(200, 230, 250, 0.3) 0%,
            transparent 100%
          );
        }

        /* Water level line */
        .rr-water-line {
          position: absolute;
          bottom: 30px;
          left: 8px;
          right: 8px;
          height: 1px;
          background: rgba(200, 230, 250, 0.5);
          box-shadow: 0 0 6px rgba(200, 230, 250, 0.8);
        }

        /* Glow around the bottle */
        .rr-bottle-glow {
          position: absolute;
          inset: -30px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(160, 200, 240, 0.3) 0%,
            transparent 70%
          );
          filter: blur(20px);
          pointer-events: none;
          animation: rrBottleGlow 4s ease-in-out infinite;
        }

        @keyframes rrBottleGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        /* Ocean floor at the bottom */
        .rr-ocean-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(
            to top,
            rgba(5,10,20,0.95) 0%,
            rgba(5,10,20,0.6) 50%,
            transparent 100%
          );
        }

        /* =========================================================
           RITUAL MESSAGE
           ========================================================= */
        .rr-ritual-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          max-width: 560px;
          padding: 0 24px;
          animation: rrMessageIn 1.6s ease forwards;
          z-index: 10;
        }

        @keyframes rrMessageIn {
          from { opacity: 0; transform: translate(-50%, -40%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }

        .rr-ritual-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.7rem;
          line-height: 1.6;
          color: var(--white);
          margin-bottom: 16px;
          text-shadow: 0 0 40px rgba(74,139,194,0.6);
        }

        .rr-ritual-subtext {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--silver);
          margin-bottom: 40px;
          opacity: 0.85;
        }

        .rr-return-btn {
          padding: 16px 42px;
          border-radius: 50px;
          border: 1px solid var(--luminous-blue);
          background: rgba(42, 90, 156, 0.3);
          color: var(--white);
          font-family: 'Marcellus', serif;
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.5s ease;
          backdrop-filter: blur(10px);
        }

        .rr-return-btn:hover {
          background: rgba(42, 90, 156, 0.5);
          box-shadow: 0 0 40px rgba(42, 90, 156, 0.6);
          transform: translateY(-2px);
        }

        [dir='rtl'] .rr-return-btn {
          letter-spacing: 0;
          text-transform: none;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
        }

        [dir='rtl'] .rr-ritual-text,
        [dir='rtl'] .rr-ritual-subtext {
          font-family: 'Amiri', serif;
          font-style: normal;
        }

        /* =========================================================
           RESPONSIVE
           ========================================================= */
        @media (max-width: 720px) {
          .rr-paper { padding: 40px 28px 36px; }
          .rr-paper-title { font-size: 0.9rem; }
          .rr-paper-textarea { font-size: 1.15rem !important; min-height: 260px; }
          .rr-btn { padding: 14px 24px; font-size: 0.65rem; }
          .rr-ritual-text { font-size: 1.3rem; }
          .rr-ritual-subtext { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}
