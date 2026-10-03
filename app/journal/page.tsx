'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../layout';

/* =========================================================
   TYPES
   ========================================================= */

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

interface Theme {
  nameEn: string;
  nameAr: string;
  motif: string;
  coverBg: string;
  coverInk: string;
  coverAccent: string;
  pageBg: string;
  pageInk: string;
  pageAccent: string;
  pageLine: string;
  font: string;
  fontAr: string;
  fontHand: string;
  fontHandAr: string;
}

interface Star {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
}

interface Mote {
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
}

interface FloatingPage {
  left: string;
  top: string;
  delay: string;
  duration: string;
  rotation: number;
  opacity: number;
  size: number;
}

interface Quill {
  top: string;
  delay: string;
  duration: string;
  opacity: number;
  scale: number;
}

/* =========================================================
   THEMES
   ========================================================= */

const THEMES: Record<string, Theme> = {
  midnight: {
    nameEn: 'Midnight', nameAr: 'منتصف الليل', motif: '☾',
    coverBg: 'linear-gradient(140deg, #1a2540 0%, #060a15 100%)',
    coverInk: '#d8e2ef', coverAccent: '#a8c4e0',
    pageBg: 'linear-gradient(180deg, #f0f4fa 0%, #dde5f0 100%)',
    pageInk: '#1e2938', pageAccent: '#4a7099',
    pageLine: 'rgba(120, 140, 170, 0.18)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Caveat', cursive", fontHandAr: "'Amiri', serif",
  },
  celestial: {
    nameEn: 'Celestial', nameAr: 'سماوي', motif: '✧',
    coverBg: 'linear-gradient(140deg, #101a3a 0%, #050814 100%)',
    coverInk: '#e0eaf8', coverAccent: '#b8cdf0',
    pageBg: 'linear-gradient(180deg, #f2f6fc 0%, #dde6f5 100%)',
    pageInk: '#1c2540', pageAccent: '#5a7ab8',
    pageLine: 'rgba(120, 140, 200, 0.18)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Dancing Script', cursive", fontHandAr: "'Amiri', serif",
  },
  gothic: {
    nameEn: 'Gothic', nameAr: 'قوطي', motif: '✥',
    coverBg: 'linear-gradient(140deg, #0a0a0e 0%, #1f1018 100%)',
    coverInk: '#d0d5de', coverAccent: '#8a9bb0',
    pageBg: 'linear-gradient(180deg, #1a1a20 0%, #0d0d12 100%)',
    pageInk: '#d0d0d8', pageAccent: '#9aabbf',
    pageLine: 'rgba(150, 160, 180, 0.14)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Caveat', cursive", fontHandAr: "'Amiri', serif",
  },
  dream: {
    nameEn: 'Dream', nameAr: 'حلم', motif: '☁',
    coverBg: 'linear-gradient(140deg, #253256 0%, #0d1730 100%)',
    coverInk: '#e8eefb', coverAccent: '#a8c0e8',
    pageBg: 'linear-gradient(180deg, #ecf1fb 0%, #d5ddf2 100%)',
    pageInk: '#252a4a', pageAccent: '#7a8ac9',
    pageLine: 'rgba(140, 150, 200, 0.18)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Dancing Script', cursive", fontHandAr: "'Amiri', serif",
  },
  ocean: {
    nameEn: 'Ocean', nameAr: 'محيط', motif: '⌘',
    coverBg: 'linear-gradient(140deg, #0e3054 0%, #061220 100%)',
    coverInk: '#cfe0ef', coverAccent: '#6fbfd9',
    pageBg: 'linear-gradient(180deg, #e8f1f5 0%, #c8dae0 100%)',
    pageInk: '#123040', pageAccent: '#2a6a8a',
    pageLine: 'rgba(80, 140, 170, 0.18)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Caveat', cursive", fontHandAr: "'Amiri', serif",
  },
  minimal: {
    nameEn: 'Minimal', nameAr: 'بسيط', motif: '·',
    coverBg: 'linear-gradient(140deg, #f0ece4 0%, #d8d2c4 100%)',
    coverInk: '#2a2620', coverAccent: '#8a8070',
    pageBg: 'linear-gradient(180deg, #fbf7ef 0%, #f0ebe0 100%)',
    pageInk: '#1a1a1f', pageAccent: '#4a4a55',
    pageLine: 'rgba(120, 110, 90, 0.14)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Caveat', cursive", fontHandAr: "'Amiri', serif",
  },
  witching: {
    nameEn: 'Witching Hour', nameAr: 'ساعة السحر', motif: '✩',
    coverBg: 'linear-gradient(140deg, #191424 0%, #050308 100%)',
    coverInk: '#dcd4ec', coverAccent: '#b0a0d0',
    pageBg: 'linear-gradient(180deg, #f0e8dc 0%, #d8ceb8 100%)',
    pageInk: '#2a2018', pageAccent: '#6a5540',
    pageLine: 'rgba(140, 110, 70, 0.2)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Dancing Script', cursive", fontHandAr: "'Amiri', serif",
  },
  vintage: {
    nameEn: 'Vintage', nameAr: 'عتيق', motif: '❦',
    coverBg: 'linear-gradient(140deg, #5a3528 0%, #241210 100%)',
    coverInk: '#f0e0c0', coverAccent: '#d4b888',
    pageBg: 'linear-gradient(180deg, #f5ead0 0%, #e0d0a8 100%)',
    pageInk: '#3a2818', pageAccent: '#8a5a30',
    pageLine: 'rgba(160, 120, 70, 0.2)',
    font: "'Cormorant Garamond', serif", fontAr: "'Tajawal', sans-serif",
    fontHand: "'Special Elite', 'Courier New', monospace", fontHandAr: "'Amiri', serif",
  },
};

const MOODS = [
  { id: 'light', color: '#a8c2e8' },
  { id: 'calm', color: '#7ea8c9' },
  { id: 'neutral', color: '#c8c8d0' },
  { id: 'heavy', color: '#8a7ab0' },
  { id: 'dark', color: '#4a4a6a' },
  { id: 'still', color: '#b0c8d8' },
];

const STORAGE_KEY = 'lilith_journals_v1';

/* =========================================================
   KEYFRAMES
   ========================================================= */

const GLOBAL_KEYFRAMES = `
  @keyframes lTwinkle {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.35); }
  }
  @keyframes lDrift {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-120vh) translateX(30px); opacity: 0; }
  }
  @keyframes bookFloat {
    0%, 100% { transform: translateY(0) rotateY(-6deg); }
    50% { transform: translateY(-10px) rotateY(-6deg); }
  }
  @keyframes pageDrift {
    0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    20%  { opacity: 0.1; }
    50%  { transform: translate(30px, -40px) rotate(8deg); }
    80%  { opacity: 0.1; }
    100% { transform: translate(-20px, -100px) rotate(-5deg); opacity: 0; }
  }
  @keyframes quillDrift {
    0%   { transform: translateX(0) translateY(0) rotate(-15deg); opacity: 0; }
    10%  { opacity: 0.12; }
    50%  { transform: translateX(60vw) translateY(-30px) rotate(-5deg); }
    90%  { opacity: 0.12; }
    100% { transform: translateX(120vw) translateY(-60px) rotate(5deg); opacity: 0; }
  }
  @keyframes moonBreathe {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  @keyframes eclipseBreath {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
    50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
  }
`;

/* =========================================================
   HELPERS — Cast helpers so TypeScript never complains
   ========================================================= */

const asNum = (v: string | number): number =>
  typeof v === 'number' ? v : parseFloat(v) || 0;

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function JournalPage() {
  const { lang } = useLang();
  const isAr = lang === 'ar';
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const [journals, setJournals] = useState<Journal[]>([]);
  const [activeJournalId, setActiveJournalId] = useState<string | null>(null);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [currentThemeKey, setCurrentThemeKey] = useState<string>('midnight');
  const [handwriting, setHandwriting] = useState(false);
  const [entryText, setEntryText] = useState('');
  const [mood, setMood] = useState<string | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState('midnight');
  const [newNotebookName, setNewNotebookName] = useState('');
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [dateString, setDateString] = useState('');

  const [inkDrops, setInkDrops] = useState<Mote[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [pages, setPages] = useState<FloatingPage[]>([]);
  const [quills, setQuills] = useState<Quill[]>([]);

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setJournals(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
    } catch {}
  }, [journals]);

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

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const inkArr: Mote[] = [];
    for (let i = 0; i < (isMobile ? 20 : 40); i++) {
      inkArr.push({
        left: Math.random() * 100 + '%',
        delay: `-${Math.random() * 30}s`,
        duration: `${25 + Math.random() * 35}s`,
        size: `${1.5 + Math.random() * 2.5}px`,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }
    setInkDrops(inkArr);

    const starArr: Star[] = [];
    for (let i = 0; i < (isMobile ? 40 : 90); i++) {
      starArr.push({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        delay: `-${Math.random() * 20}s`,
        duration: `${3 + Math.random() * 6}s`,
        size: `${0.6 + Math.random() * 1.6}px`,
        opacity: 0.2 + Math.random() * 0.5,
      });
    }
    setStars(starArr);

    const pageArr: FloatingPage[] = [];
    for (let i = 0; i < (isMobile ? 3 : 6); i++) {
      pageArr.push({
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 85}%`,
        delay: `-${Math.random() * 60}s`,
        duration: `${60 + Math.random() * 60}s`,
        rotation: -15 + Math.random() * 30,
        opacity: 0.04 + Math.random() * 0.06,
        size: 60 + Math.random() * 80,
      });
    }
    setPages(pageArr);

    const quillArr: Quill[] = [];
    for (let i = 0; i < (isMobile ? 1 : 2); i++) {
      quillArr.push({
        top: `${20 + Math.random() * 60}%`,
        delay: `-${Math.random() * 60}s`,
        duration: `${80 + Math.random() * 40}s`,
        opacity: 0.08 + Math.random() * 0.06,
        scale: 0.8 + Math.random() * 0.5,
      });
    }
    setQuills(quillArr);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2400);
  };

  const currentTheme = THEMES[currentThemeKey] || THEMES.midnight;
  const activeJournal = journals.find((j) => j.id === activeJournalId);

  const openCreateModal = () => {
    setSelectedThemeId('midnight');
    setNewNotebookName('');
    setModalOpen(true);
  };

  const confirmCreate = () => {
    const defaultName = isAr ? 'مُذكّراتي' : 'My Journal';
    const name = newNotebookName.trim() || defaultName;
    const newJ: Journal = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      theme: selectedThemeId,
      entries: [],
      createdAt: new Date().toISOString(),
    };
    setJournals((prev) => [newJ, ...prev]);
    setModalOpen(false);
    showToast(isAr ? 'تم إنشاء الدفتر' : 'Notebook created');
    setTimeout(() => openNotebook(newJ.id), 300);
  };

  const openNotebook = (id: string) => {
    const j = journals.find((x) => x.id === id);
    if (!j) return;
    setActiveJournalId(id);
    setCurrentThemeKey(j.theme);
    setHandwriting(false);
    setActiveEntryId(null);
    setEntryText('');
    setMood(null);
    setIsBookOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeNotebook = () => {
    autosave();
    setActiveJournalId(null);
    setIsBookOpen(false);
  };

  const deleteNotebook = () => {
    if (!activeJournal) return;
    const msg = isAr
      ? `هل تريد حذف "${activeJournal.name}" وكل صفحاته؟ لا يمكن التراجع عن هذا.`
      : `Delete "${activeJournal.name}" and all its pages? This cannot be undone.`;
    if (!confirm(msg)) return;
    setJournals((prev) => prev.filter((j) => j.id !== activeJournalId));
    setActiveJournalId(null);
    showToast(isAr ? 'تم حذف الدفتر' : 'Notebook deleted');
  };

  const makeTitle = (text: string) => {
    const untitled = isAr ? 'بدون عنوان' : 'Untitled';
    if (!text) return untitled;
    const first = text.trim().split(/\n|\.|!|\?|؟/)[0].trim();
    return first.length > 40 ? first.slice(0, 40) + '…' : first || untitled;
  };

  const autosave = () => {
    if (!activeJournal) return;
    const text = entryText;
    if (!text.trim() && !activeEntryId) return;

    setJournals((prev) =>
      prev.map((j) => {
        if (j.id !== activeJournalId) return j;
        if (activeEntryId) {
          return {
            ...j,
            entries: j.entries.map((e) =>
              e.id === activeEntryId
                ? { ...e, text, mood, title: makeTitle(text) }
                : e
            ),
          };
        }
        const newEntry: JournalEntry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
          title: makeTitle(text),
          text,
          mood,
          date: new Date().toISOString(),
        };
        setActiveEntryId(newEntry.id);
        return { ...j, entries: [newEntry, ...j.entries] };
      })
    );
  };

  const handleTextChange = (val: string) => {
    setEntryText(val);
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(autosave, 700);
  };

  const loadEntry = (id: string) => {
    if (!activeJournal) return;
    const e = activeJournal.entries.find((x) => x.id === id);
    if (!e) return;
    setActiveEntryId(id);
    setEntryText(e.text || '');
    setMood(e.mood);
  };

  const newPage = () => {
    autosave();
    setActiveEntryId(null);
    setEntryText('');
    setMood(null);
    showToast(isAr ? 'صفحة جديدة' : 'New page');
  };

  const shortDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });

  const pageNumber = activeJournal
    ? (isAr ? 'صفحة ' : 'Page ') +
      (activeEntryId
        ? activeJournal.entries.findIndex((e) => e.id === activeEntryId) + 1
        : activeJournal.entries.length + 1)
    : '';

  const currentFont = isAr
    ? handwriting
      ? currentTheme.fontHandAr
      : currentTheme.fontAr
    : handwriting
    ? currentTheme.fontHand
    : currentTheme.font;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_KEYFRAMES }} />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse at 50% 20%, #142448 0%, #0a1428 40%, #050812 70%, #02040a 100%)',
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
          animation: 'eclipseBreath 18s ease-in-out infinite',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: '65%',
          left: '15%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(120,160,220,0.06) 0%, transparent 65%)',
          filter: 'blur(70px)',
          animation: 'eclipseBreath 24s ease-in-out infinite reverse',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: 'rgba(220, 230, 245, 0.9)',
              boxShadow: '0 0 4px rgba(160, 200, 240, 0.6)',
              opacity: s.opacity,
              animation: `lTwinkle ${s.duration} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          top: '12%',
          right: '12%',
          width: 140,
          height: 140,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.35,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 40% 40%, rgba(220,230,245,0.9) 0%, rgba(180,200,230,0.3) 45%, transparent 70%)',
            boxShadow: '0 0 60px 20px rgba(160,190,230,0.25)',
            animation: 'moonBreathe 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '15%',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, #0a1428 0%, #0a1428 80%, transparent 100%)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(900px, 90vw)',
          height: 'min(700px, 70vh)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.06,
        }}
      >
        <svg viewBox="0 0 900 700" style={{ width: '100%', height: '100%' }}>
          <path
            d="M 450 200 Q 300 180 150 220 L 150 560 Q 300 520 450 540 Q 600 520 750 560 L 750 220 Q 600 180 450 200 Z"
            fill="none"
            stroke="rgba(180, 210, 240, 0.6)"
            strokeWidth="2"
          />
          <line
            x1="450"
            y1="200"
            x2="450"
            y2="540"
            stroke="rgba(180, 210, 240, 0.6)"
            strokeWidth="1.5"
          />
          {[260, 300, 340, 380, 420, 460].map((y) => (
            <line
              key={`l-${y}`}
              x1="200"
              y1={y}
              x2="400"
              y2={y}
              stroke="rgba(180, 210, 240, 0.4)"
              strokeWidth="1"
            />
          ))}
          {[260, 300, 340, 380, 420, 460].map((y) => (
            <line
              key={`r-${y}`}
              x1="500"
              y1={y}
              x2="700"
              y2={y}
              stroke="rgba(180, 210, 240, 0.4)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {pages.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: asNum(p.size),
              height: asNum(p.size) * 1.3,
              background:
                'linear-gradient(180deg, rgba(220, 230, 245, 0.15), rgba(180, 210, 240, 0.05))',
              border: '1px solid rgba(180, 210, 240, 0.15)',
              borderRadius: 2,
              transform: `rotate(${p.rotation}deg)`,
              opacity: p.opacity,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              animation: `pageDrift ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {quills.map((q, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: q.top,
              left: '-200px',
              opacity: q.opacity,
              transform: `scale(${q.scale})`,
              animation: `quillDrift ${q.duration} linear infinite`,
              animationDelay: q.delay,
            }}
          >
            <svg width="200" height="120" viewBox="0 0 200 120">
              <path
                d="M 10 100 Q 60 70 120 30 Q 160 5 180 15 Q 170 40 140 60 Q 100 90 30 110 Q 20 110 10 100 Z"
                fill="rgba(190, 215, 240, 0.35)"
              />
              <path
                d="M 20 105 Q 80 80 130 50"
                stroke="rgba(190, 215, 240, 0.5)"
                strokeWidth="1"
                fill="none"
              />
              <line
                x1="15"
                y1="108"
                x2="0"
                y2="120"
                stroke="rgba(190, 215, 240, 0.6)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {inkDrops.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: d.left,
              top: '110%',
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(180, 210, 240, 0.9) 0%, rgba(100, 150, 200, 0.4) 70%, transparent 100%)',
              boxShadow: '0 0 8px 1px rgba(140, 180, 220, 0.5)',
              opacity: d.opacity,
              animation: `lDrift ${d.duration} ease-in-out infinite`,
              animationDelay: d.delay,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(5,10,20,0) 0%, rgba(5,10,20,0.4) 60%, rgba(2,4,10,0.9) 100%),
            linear-gradient(to bottom, rgba(5,10,20,0.5) 0%, transparent 25%, transparent 70%, rgba(2,4,10,0.85) 100%)
          `,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', padding: '130px 24px 80px' }}>
        {!activeJournalId && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="fade-up" style={{ textAlign: 'center', marginBottom: 60, animationDelay: '0.2s' }}>
              <div
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '0.7rem',
                  letterSpacing: isAr ? '0.1em' : '0.55em',
                  color: 'var(--soft-blue)',
                  textTransform: isAr ? 'none' : 'uppercase',
                  marginBottom: 22,
                  textShadow:
                    '0 0 20px rgba(74,139,194,0.7), 0 2px 12px rgba(0,0,0,0.9)',
                }}
              >
                {t('JOURNAL', 'المُذكّرات')}
              </div>
              <h2
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: isAr ? '2.4rem' : '2.8rem',
                  letterSpacing: isAr ? 0 : '0.2em',
                  marginBottom: 20,
                  textShadow:
                    '0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(74,139,194,0.7), 0 0 120px rgba(42,90,156,0.4)',
                }}
              >
                {t('YOUR SHELF', 'رفّك')}
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: isAr ? 'normal' : 'italic',
                  fontSize: '1.2rem',
                  color: 'var(--silver)',
                  maxWidth: 540,
                  margin: '0 auto',
                  lineHeight: 1.9,
                  textShadow: '0 2px 12px rgba(0,0,0,0.95)',
                }}
              >
                {t(
                  'A notebook that belongs entirely to you. Choose a cover. Choose a feeling. Begin.',
                  'دفتر يخصك وحدك. اختر غلافًا. اختر إحساسًا. ابدأ.'
                )}
              </p>
            </div>

            <div
              className="fade-up"
              style={{
                width: '100%',
                maxWidth: 1100,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '44px 34px',
                padding: '40px 0',
                animationDelay: '0.6s',
              }}
            >
              {journals.map((j) => {
                const th = THEMES[j.theme] || THEMES.midnight;
                const pagesLabel = isAr
                  ? `${j.entries.length} ${j.entries.length === 1 ? 'صفحة' : 'صفحات'}`
                  : `${j.entries.length} ${j.entries.length === 1 ? 'page' : 'pages'}`;
                return (
                  <button
                    key={j.id}
                    onClick={() => openNotebook(j.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'translateY(-12px)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'translateY(0)')
                      }
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '3 / 4.3',
                          borderRadius: isAr
                            ? '10px 3px 3px 10px'
                            : '3px 10px 10px 3px',
                          background: th.coverBg,
                          color: th.coverInk,
                          boxShadow: `0 30px 70px rgba(0,0,0,0.85), 0 0 60px rgba(74,139,194,0.3), 0 0 100px rgba(42,90,156,0.15), inset -8px 0 20px rgba(0,0,0,0.5), inset 8px 0 20px rgba(255,255,255,0.05)`,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            [isAr ? 'right' : 'left']: 0,
                            bottom: 0,
                            width: 16,
                            background: isAr
                              ? 'linear-gradient(to left, rgba(0,0,0,0.6), rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.35))'
                              : 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.35))',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 14,
                            [isAr ? 'left' : 'right']: 14,
                            width: 30,
                            height: 30,
                            borderTop: '1px solid rgba(160,200,240,0.45)',
                            [isAr ? 'borderLeft' : 'borderRight']:
                              '1px solid rgba(160,200,240,0.45)',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: isAr
                              ? '38px 42px 30px 28px'
                              : '38px 28px 30px 42px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '1.8rem',
                              opacity: 0.85,
                              color: th.coverAccent,
                              textShadow: `0 0 15px ${th.coverAccent}`,
                            }}
                          >
                            {th.motif}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Marcellus', serif",
                              fontSize: '1.05rem',
                              letterSpacing: isAr ? 0 : '0.14em',
                              lineHeight: 1.5,
                              textTransform: isAr ? 'none' : 'uppercase',
                              color: th.coverInk,
                              textAlign: 'left',
                              wordBreak: 'break-word',
                            }}
                          >
                            {j.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: '0.7rem',
                              letterSpacing: isAr ? 0 : '0.3em',
                              textTransform: isAr ? 'none' : 'uppercase',
                              color: th.coverAccent,
                              opacity: 0.9,
                              fontStyle: isAr ? 'normal' : 'italic',
                            }}
                          >
                            {pagesLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={openCreateModal}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 4.3',
                    borderRadius: isAr
                      ? '10px 3px 3px 10px'
                      : '3px 10px 10px 3px',
                    background: 'rgba(13,27,62,0.5)',
                    border: '1px dashed rgba(160,200,240,0.4)',
                    boxShadow:
                      '0 0 40px rgba(74,139,194,0.15), inset 0 0 30px rgba(42,90,156,0.2)',
                    backdropFilter: 'blur(14px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--soft-blue)',
                    transition: 'all 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--soft-blue)';
                    e.currentTarget.style.boxShadow =
                      '0 0 70px rgba(74,139,194,0.5), inset 0 0 40px rgba(42,90,156,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      'rgba(160,200,240,0.4)';
                    e.currentTarget.style.boxShadow =
                      '0 0 40px rgba(74,139,194,0.15), inset 0 0 30px rgba(42,90,156,0.2)';
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Marcellus', serif",
                      fontSize: '2.4rem',
                      textShadow: '0 0 20px rgba(74,139,194,0.9)',
                    }}
                  >
                    +
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeJournalId && activeJournal && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1200,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                marginBottom: 36,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <button onClick={closeNotebook} style={btnOutline(isAr)}>
                  {t('← Shelf', '→ الرفّ')}
                </button>
                <div
                  style={{
                    fontFamily: "'Marcellus', serif",
                    fontSize: '1.2rem',
                    letterSpacing: isAr ? 0 : '0.18em',
                    textTransform: isAr ? 'none' : 'uppercase',
                    textShadow:
                      '0 0 20px rgba(74,139,194,0.5), 0 2px 12px rgba(0,0,0,0.9)',
                  }}
                >
                  {activeJournal.name}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setHandwriting((h) => !h)}
                  style={
                    handwriting ? btnBlueActive(isAr) : btnOutline(isAr)
                  }
                >
                  {handwriting
                    ? t('⌨ Typing', '⌨ كتابة')
                    : t('✍ Handwriting', '✍ خط اليد')}
                </button>
                <button onClick={deleteNotebook} style={btnOutline(isAr)}>
                  {t('Delete Notebook', 'احذف الدفتر')}
                </button>
              </div>
            </div>

            {!isBookOpen && (
              <div
                onClick={() => setIsBookOpen(true)}
                style={{
                  perspective: 2000,
                  margin: '20px auto 0',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: 'min(400px, 78vw)',
                    aspectRatio: '3 / 4.3',
                    borderRadius: isAr
                      ? '10px 4px 4px 10px'
                      : '4px 10px 10px 4px',
                    background: currentTheme.coverBg,
                    boxShadow: `0 45px 100px rgba(0,0,0,0.9), 0 0 120px rgba(74,139,194,0.5), 0 0 200px rgba(42,90,156,0.2), inset -10px 0 30px rgba(0,0,0,0.55), inset 10px 0 20px rgba(255,255,255,0.05)`,
                    animation: 'bookFloat 7s ease-in-out infinite',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      [isAr ? 'right' : 'left']: 0,
                      bottom: 0,
                      width: 20,
                      background: isAr
                        ? 'linear-gradient(to left, rgba(0,0,0,0.7), rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.4))'
                        : 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.4))',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
                      [isAr ? 'left' : 'right']: 20,
                      width: 40,
                      height: 40,
                      borderTop: '1px solid rgba(160,200,240,0.6)',
                      [isAr ? 'borderLeft' : 'borderRight']:
                        '1px solid rgba(160,200,240,0.6)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: isAr
                        ? '55px 70px 50px 46px'
                        : '55px 46px 50px 70px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      color: currentTheme.coverInk,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2.4rem',
                        color: currentTheme.coverAccent,
                        opacity: 0.9,
                        textShadow: `0 0 25px ${currentTheme.coverAccent}`,
                      }}
                    >
                      {currentTheme.motif}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Marcellus', serif",
                        fontSize: '1.5rem',
                        letterSpacing: isAr ? 0 : '0.18em',
                        lineHeight: 1.5,
                        textTransform: isAr ? 'none' : 'uppercase',
                      }}
                    >
                      {activeJournal.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: isAr ? 'normal' : 'italic',
                        fontSize: '0.8rem',
                        letterSpacing: isAr ? 0 : '0.35em',
                        textTransform: isAr ? 'none' : 'uppercase',
                        color: currentTheme.coverAccent,
                        opacity: 0.9,
                      }}
                    >
                      {t('Click to open', 'اضغط للفتح')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isBookOpen && (
              <div
                style={{
                  perspective: 2400,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: 'min(1100px, 96vw)',
                    aspectRatio: '16 / 10',
                    background:
                      'linear-gradient(180deg, #c8bfa8 0%, #a89d84 100%)',
                    borderRadius: 14,
                    padding: 26,
                    boxShadow: `0 70px 160px rgba(0,0,0,0.95), 0 0 180px rgba(74,139,194,0.4), 0 0 260px rgba(42,90,156,0.15), inset 0 0 70px rgba(0,0,0,0.45)`,
                    display: 'flex',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 26,
                      bottom: 26,
                      left: '50%',
                      width: 24,
                      transform: 'translateX(-50%)',
                      background:
                        'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.55))',
                      zIndex: 5,
                      pointerEvents: 'none',
                    }}
                  />
                  <div style={pageStyle(currentTheme)}>
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                          marginBottom: 24,
                          paddingBottom: 14,
                          borderBottom: '1px dashed rgba(120,140,170,0.3)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Marcellus', serif",
                            fontSize: '0.68rem',
                            letterSpacing: isAr ? 0 : '0.35em',
                            textTransform: isAr ? 'none' : 'uppercase',
                            color: currentTheme.pageInk,
                            opacity: 0.6,
                          }}
                        >
                          {dateString}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {MOODS.map((m) => (
                            <div
                              key={m.id}
                              onClick={() =>
                                setMood(m.id === mood ? null : m.id)
                              }
                              style={{
                                width: 13,
                                height: 13,
                                borderRadius: '50%',
                                background: m.color,
                                border: '1px solid rgba(0,0,0,0.18)',
                                cursor: 'pointer',
                                transform:
                                  mood === m.id ? 'scale(1.2)' : 'scale(1)',
                                boxShadow:
                                  mood === m.id
                                    ? `0 0 0 2px rgba(0,0,0,0.18), 0 0 14px ${m.color}`
                                    : 'none',
                                transition: 'all 0.3s ease',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={entryText}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={t(
                          'Write here. Only the page sees it.',
                          'اكتب هنا. لا يرى هذا إلا الصفحة.'
                        )}
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          resize: 'none',
                          color: currentTheme.pageInk,
                          fontFamily: currentFont,
                          fontSize: '1.2rem',
                          lineHeight: 1.95,
                          caretColor: currentTheme.pageAccent,
                          minHeight: 200,
                          direction: isAr ? 'rtl' : 'ltr',
                          textAlign: isAr ? 'right' : 'left',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 20,
                          paddingTop: 14,
                          borderTop: '1px dashed rgba(120,140,170,0.3)',
                          fontFamily: "'Marcellus', serif",
                          fontSize: '0.65rem',
                          letterSpacing: isAr ? 0 : '0.28em',
                          textTransform: isAr ? 'none' : 'uppercase',
                          color: currentTheme.pageInk,
                          opacity: 0.55,
                        }}
                      >
                        <span>{pageNumber}</span>
                        <span>{t('Autosaved', 'محفوظ تلقائيًا')}</span>
                      </div>
                    </div>
                  </div>

                  <div style={pageStyle(currentTheme)}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Marcellus', serif",
                          fontSize: '0.95rem',
                          letterSpacing: isAr ? 0 : '0.18em',
                          textTransform: isAr ? 'none' : 'uppercase',
                          marginBottom: 16,
                          color: currentTheme.pageInk,
                          opacity: 0.72,
                        }}
                      >
                        {t('PAST PAGES', 'الصفحات السابقة')}
                      </div>
                      {activeJournal.entries.length === 0 ? (
                        <div
                          style={{
                            textAlign: 'center',
                            padding: '50px 20px',
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: isAr ? 'normal' : 'italic',
                            color: currentTheme.pageInk,
                            opacity: 0.55,
                            fontSize: '1.1rem',
                            lineHeight: 1.9,
                          }}
                        >
                          {t(
                            'Your pages will appear here. Write something to begin.',
                            'ستظهر صفحاتك هنا. اكتب شيئًا لتبدأ.'
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                          }}
                        >
                          {activeJournal.entries.map((e) => {
                            const preview =
                              (e.text || '')
                                .slice(0, 90)
                                .replace(/\s+/g, ' ')
                                .trim() ||
                              (isAr ? 'صفحة فارغة' : 'Empty page');
                            return (
                              <div
                                key={e.id}
                                onClick={() => loadEntry(e.id)}
                                style={{
                                  padding: '16px 18px',
                                  border:
                                    '1px solid rgba(120,140,170,0.28)',
                                  borderRadius: 4,
                                  background: 'rgba(255,255,255,0.3)',
                                  cursor: 'pointer',
                                  transition: 'all 0.4s ease',
                                }}
                                onMouseEnter={(el) => {
                                  el.currentTarget.style.background =
                                    'rgba(255,255,255,0.55)';
                                  el.currentTarget.style.borderColor =
                                    currentTheme.pageAccent;
                                }}
                                onMouseLeave={(el) => {
                                  el.currentTarget.style.background =
                                    'rgba(255,255,255,0.3)';
                                  el.currentTarget.style.borderColor =
                                    'rgba(120,140,170,0.28)';
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: "'Marcellus', serif",
                                    fontSize: '0.8rem',
                                    letterSpacing: isAr ? 0 : '0.14em',
                                    textTransform: isAr
                                      ? 'none'
                                      : 'uppercase',
                                    color: currentTheme.pageInk,
                                    opacity: 0.88,
                                    marginBottom: 8,
                                  }}
                                >
                                  {e.title}
                                </div>
                                <div
                                  style={{
                                    fontFamily: currentFont,
                                    fontSize: '0.98rem',
                                    lineHeight: 1.5,
                                    color: currentTheme.pageInk,
                                    opacity: 0.62,
                                  }}
                                >
                                  {preview}
                                </div>
                                <div
                                  style={{
                                    fontFamily: "'Marcellus', serif",
                                    fontSize: '0.6rem',
                                    letterSpacing: isAr ? 0 : '0.25em',
                                    textTransform: isAr
                                      ? 'none'
                                      : 'uppercase',
                                    color: currentTheme.pageInk,
                                    opacity: 0.48,
                                    marginTop: 10,
                                  }}
                                >
                                  {shortDate(e.date)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isBookOpen && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 12,
                  marginTop: 32,
                }}
              >
                <button onClick={newPage} style={btnOutline(isAr)}>
                  {t('+ New Page', '+ صفحة جديدة')}
                </button>
              </div>
            )}
          </div>
        )}

        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,5,8,0.92)',
              backdropFilter: 'blur(18px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 24,
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(160deg, rgba(20,30,50,0.98) 0%, rgba(10,15,28,0.98) 100%)',
                border: '1px solid rgba(160,200,240,0.4)',
                borderRadius: 18,
                padding: '46px 44px',
                maxWidth: 640,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow:
                  '0 60px 140px rgba(0,0,0,0.95), 0 0 100px rgba(74,139,194,0.35), 0 0 180px rgba(42,90,156,0.2)',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '1.5rem',
                  letterSpacing: isAr ? 0 : '0.18em',
                  marginBottom: 10,
                  textShadow: '0 0 20px rgba(74,139,194,0.5)',
                }}
              >
                {t('NEW NOTEBOOK', 'دفتر جديد')}
              </h3>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: isAr ? 'normal' : 'italic',
                  color: 'var(--silver)',
                  marginBottom: 32,
                  fontSize: '1.1rem',
                }}
              >
                {t('Give it a name and a feeling.', 'أعطه اسمًا وإحساسًا.')}
              </div>

              <label style={modalLabel(isAr)}>{t('Name', 'الاسم')}</label>
              <input
                type="text"
                value={newNotebookName}
                onChange={(e) => setNewNotebookName(e.target.value)}
                placeholder={t('My Daily Journal...', 'مُذكّراتي اليومية...')}
                maxLength={40}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'rgba(13,27,62,0.7)',
                  border: '1px solid rgba(160,200,240,0.3)',
                  borderRadius: 10,
                  color: 'var(--white)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem',
                  outline: 'none',
                  marginBottom: 32,
                }}
              />

              <label style={modalLabel(isAr)}>{t('Theme', 'الطابع')}</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: 14,
                  marginBottom: 36,
                }}
              >
                {Object.entries(THEMES).map(([id, th]) => (
                  <div
                    key={id}
                    onClick={() => setSelectedThemeId(id)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 10,
                      padding: '14px 12px',
                      textAlign: 'center',
                      border: `2px solid ${
                        id === selectedThemeId
                          ? 'var(--soft-blue)'
                          : 'transparent'
                      }`,
                      background:
                        id === selectedThemeId
                          ? 'rgba(74,139,194,0.2)'
                          : 'rgba(13,27,62,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'all 0.4s ease',
                      boxShadow:
                        id === selectedThemeId
                          ? '0 0 25px rgba(74,139,194,0.5)'
                          : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 64,
                        borderRadius: '3px 7px 7px 3px',
                        background: th.coverBg,
                        boxShadow:
                          'inset -3px 0 6px rgba(0,0,0,0.45), 0 5px 14px rgba(0,0,0,0.55)',
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Marcellus', serif",
                        fontSize: '0.6rem',
                        letterSpacing: isAr ? 0 : '0.22em',
                        textTransform: isAr ? 'none' : 'uppercase',
                        color:
                          id === selectedThemeId
                            ? 'var(--white)'
                            : 'var(--silver)',
                      }}
                    >
                      {isAr ? th.nameAr : th.nameEn}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  justifyContent: isAr ? 'flex-start' : 'flex-end',
                }}
              >
                <button
                  onClick={() => setModalOpen(false)}
                  style={btnOutline(isAr)}
                >
                  {t('Cancel', 'إلغاء')}
                </button>
                <button onClick={confirmCreate} style={btnBlue(isAr)}>
                  {t('Create Notebook', 'إنشاء الدفتر')}
                </button>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}

/* =========================================================
   STYLE HELPERS
   ========================================================= */

const pageStyle = (th: Theme): React.CSSProperties => ({
  position: 'relative',
  flex: 1,
  background: th.pageBg,
  borderRadius: 4,
  padding: '46px 52px 50px',
  color: th.pageInk,
  fontFamily: th.font,
  fontSize: '1.2rem',
  lineHeight: 1.95,
  boxShadow:
    'inset 0 0 70px rgba(120,140,170,0.18), inset -4px 0 12px rgba(0,0,0,0.07), inset 4px 0 12px rgba(0,0,0,0.07)',
  overflowY: 'auto',
});

const btnOutline = (isAr: boolean): React.CSSProperties => ({
  background: 'rgba(13,27,62,0.5)',
  border: '1px solid rgba(160,200,240,0.4)',
  color: 'var(--silver)',
  padding: '10px 20px',
  borderRadius: 50,
  fontFamily: "'Marcellus', serif",
  fontSize: '0.7rem',
  letterSpacing: isAr ? 0 : '0.2em',
  textTransform: isAr ? 'none' : 'uppercase',
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  backdropFilter: 'blur(10px)',
});

const btnBlueActive = (isAr: boolean): React.CSSProperties => ({
  background: 'rgba(74,139,194,0.2)',
  border: '1px solid var(--soft-blue)',
  color: 'var(--white)',
  padding: '10px 20px',
  borderRadius: 50,
  fontFamily: "'Marcellus', serif",
  fontSize: '0.7rem',
  letterSpacing: isAr ? 0 : '0.2em',
  textTransform: isAr ? 'none' : 'uppercase',
  cursor: 'pointer',
  boxShadow: '0 0 25px rgba(74,139,194,0.5)',
  transition: 'all 0.4s ease',
  backdropFilter: 'blur(10px)',
});

const btnBlue = (isAr: boolean): React.CSSProperties => ({
  background: 'rgba(74,139,194,0.2)',
  border: '1px solid var(--soft-blue)',
  color: 'var(--white)',
  padding: '14px 32px',
  borderRadius: 50,
  fontFamily: "'Marcellus', serif",
  fontSize: '0.7rem',
  letterSpacing: isAr ? 0 : '0.24em',
  textTransform: isAr ? 'none' : 'uppercase',
  cursor: 'pointer',
  boxShadow: '0 0 30px rgba(74,139,194,0.4)',
  transition: 'all 0.4s ease',
});

const modalLabel = (isAr: boolean): React.CSSProperties => ({
  display: 'block',
  fontFamily: "'Marcellus', serif",
  fontSize: '0.65rem',
  letterSpacing: isAr ? 0 : '0.35em',
  textTransform: isAr ? 'none' : 'uppercase',
  color: 'var(--soft-blue)',
  marginBottom: 12,
  textShadow: '0 0 15px rgba(74,139,194,0.5)',
});
