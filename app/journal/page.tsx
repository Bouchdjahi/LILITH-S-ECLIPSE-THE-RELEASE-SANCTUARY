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
   HELPERS
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
    for (let i = 0; i < (isMobile ? 15 : 40); i++) {
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
    for (let i = 0; i < (isMobile ? 30 : 90); i++) {
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
    for (let i = 0; i < (isMobile ? 2 : 6); i++) {
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
    for (let i = 0; i < (isMobile ? 0 : 2); i++) {
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

      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse at 50% 20%, #142448 0%, #0a1428 40%, #050812 70%, #02040a 100%)',
        }}
      />

      {/* Breathing glows */}
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

      {/* Stars */}
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

      {/* Crescent moon */}
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

      {/* Book silhouette */}
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
          <line x1="450" y1="200" x2="450" y2="540" stroke="rgba(180, 210, 240, 0.6)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating pages */}
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

      {/* Quills */}
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
            </svg>
          </div>
        ))}
      </div>

      {/* Ink drops */}
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

      {/* Vignette */}
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

      {/* ============ CONTENT ============ */}
      <div className="jn-content">
        {/* ============ SHELF ============ */}
        {!activeJournalId && (
          <div className="jn-shelf-wrap">
            <div className="fade-up jn-shelf-header" style={{ animationDelay: '0.2s' }}>
              <div className="jn-shelf-label">{t('JOURNAL', 'المُذكّرات')}</div>
              <h2 className="jn-shelf-title">{t('YOUR SHELF', 'رفّك')}</h2>
              <p className="jn-shelf-subtitle">
                {t(
                  'A notebook that belongs entirely to you. Choose a cover. Choose a feeling. Begin.',
                  'دفتر يخصك وحدك. اختر غلافًا. اختر إحساسًا. ابدأ.'
                )}
              </p>
            </div>

            <div className="fade-up jn-shelf-grid" style={{ animationDelay: '0.6s' }}>
              {journals.map((j) => {
                const th = THEMES[j.theme] || THEMES.midnight;
                const pagesLabel = isAr
                  ? `${j.entries.length} ${j.entries.length === 1 ? 'صفحة' : 'صفحات'}`
                  : `${j.entries.length} ${j.entries.length === 1 ? 'page' : 'pages'}`;
                return (
                  <button
                    key={j.id}
                    onClick={() => openNotebook(j.id)}
                    className="jn-book-btn"
                  >
                    <div className="jn-book-inner">
                      <div
                        className="jn-book"
                        style={{
                          background: th.coverBg,
                          color: th.coverInk,
                        }}
                      >
                        <div className="jn-book-spine" />
                        <div className="jn-book-corner" />
                        <div className="jn-book-content">
                          <div
                            className="jn-book-motif"
                            style={{
                              color: th.coverAccent,
                              textShadow: `0 0 15px ${th.coverAccent}`,
                            }}
                          >
                            {th.motif}
                          </div>
                          <div className="jn-book-title" style={{ color: th.coverInk }}>
                            {j.name}
                          </div>
                          <div
                            className="jn-book-meta"
                            style={{ color: th.coverAccent }}
                          >
                            {pagesLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              <button onClick={openCreateModal} className="jn-book-btn">
                <div className="jn-new-book">
                  <span className="jn-new-plus">+</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ============ NOTEBOOK ============ */}
        {activeJournalId && activeJournal && (
          <div className="jn-notebook-wrap">
            <div className="jn-topbar">
              <div className="jn-topbar-left">
                <button onClick={closeNotebook} className="jn-btn-outline">
                  {t('← Shelf', '→ الرفّ')}
                </button>
                <div className="jn-notebook-name">{activeJournal.name}</div>
              </div>
              <div className="jn-topbar-controls">
                <button
                  onClick={() => setHandwriting((h) => !h)}
                  className={
                    handwriting ? 'jn-btn-blue-active' : 'jn-btn-outline'
                  }
                >
                  {handwriting
                    ? t('⌨ Typing', '⌨ كتابة')
                    : t('✍ Handwriting', '✍ خط اليد')}
                </button>
                <button onClick={deleteNotebook} className="jn-btn-outline">
                  {t('Delete', 'احذف')}
                </button>
              </div>
            </div>

            {!isBookOpen && (
              <div
                onClick={() => setIsBookOpen(true)}
                className="jn-closed-book-wrap"
              >
                <div
                  className="jn-closed-book"
                  style={{ background: currentTheme.coverBg }}
                >
                  <div className="jn-book-spine" />
                  <div className="jn-book-corner" />
                  <div className="jn-closed-book-inner">
                    <div
                      className="jn-closed-motif"
                      style={{
                        color: currentTheme.coverAccent,
                        textShadow: `0 0 25px ${currentTheme.coverAccent}`,
                      }}
                    >
                      {currentTheme.motif}
                    </div>
                    <div
                      className="jn-closed-title"
                      style={{ color: currentTheme.coverInk }}
                    >
                      {activeJournal.name}
                    </div>
                    <div
                      className="jn-closed-hint"
                      style={{ color: currentTheme.coverAccent }}
                    >
                      {t('Click to open', 'اضغط للفتح')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isBookOpen && (
              <div className="jn-open-wrap">
                <div
                  className="jn-spread"
                  style={{ background: 'linear-gradient(180deg, #c8bfa8 0%, #a89d84 100%)' }}
                >
                  <div className="jn-spine" />

                  {/* Page 1 — writing */}
                  <div
                    className="jn-page"
                    style={{
                      background: currentTheme.pageBg,
                      color: currentTheme.pageInk,
                      fontFamily: currentFont,
                    }}
                  >
                    <div className="jn-page-header">
                      <div
                        className="jn-page-date"
                        style={{ color: currentTheme.pageInk }}
                      >
                        {dateString}
                      </div>
                      <div className="jn-mood-row">
                        {MOODS.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => setMood(m.id === mood ? null : m.id)}
                            className={`jn-mood-dot ${
                              mood === m.id ? 'active' : ''
                            }`}
                            style={{
                              background: m.color,
                              boxShadow:
                                mood === m.id
                                  ? `0 0 0 2px rgba(0,0,0,0.18), 0 0 14px ${m.color}`
                                  : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <textarea
                      className="jn-textarea"
                      value={entryText}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder={t(
                        'Write here. Only the page sees it.',
                        'اكتب هنا. لا يرى هذا إلا الصفحة.'
                      )}
                      style={{
                        color: currentTheme.pageInk,
                        fontFamily: currentFont,
                        caretColor: currentTheme.pageAccent,
                        direction: isAr ? 'rtl' : 'ltr',
                        textAlign: isAr ? 'right' : 'left',
                      }}
                    />
                    <div
                      className="jn-page-footer"
                      style={{ color: currentTheme.pageInk }}
                    >
                      <span>{pageNumber}</span>
                      <span>{t('Autosaved', 'محفوظ تلقائيًا')}</span>
                    </div>
                  </div>

                  {/* Page 2 — past entries */}
                  <div
                    className="jn-page"
                    style={{
                      background: currentTheme.pageBg,
                      color: currentTheme.pageInk,
                    }}
                  >
                    <div
                      className="jn-entries-title"
                      style={{ color: currentTheme.pageInk }}
                    >
                      {t('PAST PAGES', 'الصفحات السابقة')}
                    </div>
                    {activeJournal.entries.length === 0 ? (
                      <div
                        className="jn-empty"
                        style={{ color: currentTheme.pageInk }}
                      >
                        {t(
                          'Your pages will appear here. Write something to begin.',
                          'ستظهر صفحاتك هنا. اكتب شيئًا لتبدأ.'
                        )}
                      </div>
                    ) : (
                      <div className="jn-entries-list">
                        {activeJournal.entries.map((e) => {
                          const preview =
                            (e.text || '')
                              .slice(0, 90)
                              .replace(/\s+/g, ' ')
                              .trim() || (isAr ? 'صفحة فارغة' : 'Empty page');
                          return (
                            <div
                              key={e.id}
                              onClick={() => loadEntry(e.id)}
                              className="jn-entry-card"
                              style={{
                                borderColor: 'rgba(120,140,170,0.28)',
                                color: currentTheme.pageInk,
                              }}
                            >
                              <div
                                className="jn-entry-title"
                                style={{
                                  color: currentTheme.pageInk,
                                  fontFamily: "'Marcellus', serif",
                                }}
                              >
                                {e.title}
                              </div>
                              <div
                                className="jn-entry-preview"
                                style={{
                                  color: currentTheme.pageInk,
                                  fontFamily: currentFont,
                                }}
                              >
                                {preview}
                              </div>
                              <div
                                className="jn-entry-date"
                                style={{ color: currentTheme.pageInk }}
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
            )}

            {isBookOpen && (
              <div className="jn-newpage-wrap">
                <button onClick={newPage} className="jn-btn-outline">
                  {t('+ New Page', '+ صفحة جديدة')}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============ MODAL ============ */}
        {modalOpen && (
          <div className="jn-modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="jn-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="jn-modal-title">{t('NEW NOTEBOOK', 'دفتر جديد')}</h3>
              <div className="jn-modal-sub">
                {t('Give it a name and a feeling.', 'أعطه اسمًا وإحساسًا.')}
              </div>

              <label className="jn-modal-label">{t('Name', 'الاسم')}</label>
              <input
                type="text"
                className="jn-modal-input"
                value={newNotebookName}
                onChange={(e) => setNewNotebookName(e.target.value)}
                placeholder={t('My Daily Journal...', 'مُذكّراتي اليومية...')}
                maxLength={40}
              />

              <label className="jn-modal-label">{t('Theme', 'الطابع')}</label>
              <div className="jn-theme-grid">
                {Object.entries(THEMES).map(([id, th]) => (
                  <div
                    key={id}
                    onClick={() => setSelectedThemeId(id)}
                    className={`jn-theme-choice ${
                      id === selectedThemeId ? 'selected' : ''
                    }`}
                  >
                    <div
                      className="jn-theme-swatch"
                      style={{ background: th.coverBg }}
                    />
                    <div className="jn-theme-name">
                      {isAr ? th.nameAr : th.nameEn}
                    </div>
                  </div>
                ))}
              </div>

              <div className="jn-modal-actions">
                <button
                  onClick={() => setModalOpen(false)}
                  className="jn-btn-outline"
                >
                  {t('Cancel', 'إلغاء')}
                </button>
                <button onClick={confirmCreate} className="jn-btn-blue">
                  {t('Create', 'إنشاء')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============ TOAST ============ */}
        {toastVisible && <div className="jn-toast">{toast}</div>}
      </div>

      {/* ============ STYLES ============ */}
      <style jsx global>{`
        /* ---------- Base ---------- */
        .jn-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding: 130px 24px 80px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .jn-shelf-wrap,
        .jn-notebook-wrap {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ---------- Header ---------- */
        .jn-shelf-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .jn-shelf-label {
          font-family: 'Marcellus', serif;
          color: var(--soft-blue);
          text-transform: uppercase;
          margin-bottom: 22px;
          text-shadow: 0 0 20px rgba(74, 139, 194, 0.7),
            0 2px 12px rgba(0, 0, 0, 0.9);
        }
        .jn-shelf-title {
          font-family: 'Marcellus', serif;
          color: var(--white);
          text-shadow: 0 2px 30px rgba(0, 0, 0, 0.9),
            0 0 60px rgba(74, 139, 194, 0.7);
        }
        .jn-shelf-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--silver);
          margin: 0 auto;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95);
        }

        /* ---------- Shelf grid + books ---------- */
        .jn-shelf-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 44px 34px;
        }
        .jn-book-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: block;
          width: 100%;
        }
        .jn-book-inner {
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .jn-book-btn:hover .jn-book-inner {
          transform: translateY(-12px);
        }
        .jn-book {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4.3;
          border-radius: 3px 10px 10px 3px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85),
            0 0 60px rgba(74, 139, 194, 0.3),
            0 0 100px rgba(42, 90, 156, 0.15),
            inset -8px 0 20px rgba(0, 0, 0, 0.5),
            inset 8px 0 20px rgba(255, 255, 255, 0.05);
        }
        .jn-book-spine {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 16px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.6),
            rgba(255, 255, 255, 0.06) 40%,
            rgba(0, 0, 0, 0.35)
          );
        }
        .jn-book-corner {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border-top: 1px solid rgba(160, 200, 240, 0.45);
          border-right: 1px solid rgba(160, 200, 240, 0.45);
        }
        .jn-book-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 38px 28px 30px 42px;
        }
        .jn-book-motif {
          font-size: 1.8rem;
          opacity: 0.85;
        }
        .jn-book-title {
          font-family: 'Marcellus', serif;
          font-size: 1.05rem;
          letter-spacing: 0.14em;
          line-height: 1.5;
          text-transform: uppercase;
          text-align: left;
          word-break: break-word;
        }
        .jn-book-meta {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          opacity: 0.9;
          font-style: italic;
        }

        .jn-new-book {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4.3;
          border-radius: 3px 10px 10px 3px;
          background: rgba(13, 27, 62, 0.5);
          border: 1px dashed rgba(160, 200, 240, 0.4);
          box-shadow: 0 0 40px rgba(74, 139, 194, 0.15),
            inset 0 0 30px rgba(42, 90, 156, 0.2);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--soft-blue);
          transition: all 0.5s ease;
        }
        .jn-book-btn:hover .jn-new-book {
          border-color: var(--soft-blue);
          box-shadow: 0 0 70px rgba(74, 139, 194, 0.5),
            inset 0 0 40px rgba(42, 90, 156, 0.35);
        }
        .jn-new-plus {
          font-family: 'Marcellus', serif;
          font-size: 2.4rem;
          text-shadow: 0 0 20px rgba(74, 139, 194, 0.9);
        }

        /* ---------- Topbar ---------- */
        .jn-topbar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .jn-topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .jn-notebook-name {
          font-family: 'Marcellus', serif;
          font-size: 1.2rem;
          letter-spacing: 0.18em;
          color: var(--white);
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(74, 139, 194, 0.5),
            0 2px 12px rgba(0, 0, 0, 0.9);
        }
        .jn-topbar-controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ---------- Buttons ---------- */
        .jn-btn-outline {
          background: rgba(13, 27, 62, 0.5);
          border: 1px solid rgba(160, 200, 240, 0.4);
          color: var(--silver);
          padding: 10px 20px;
          border-radius: 50px;
          font-family: 'Marcellus', serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }
        .jn-btn-outline:hover {
          border-color: var(--soft-blue);
          color: var(--white);
          background: rgba(74, 139, 194, 0.1);
        }
        .jn-btn-blue,
        .jn-btn-blue-active {
          background: rgba(74, 139, 194, 0.2);
          border: 1px solid var(--soft-blue);
          color: var(--white);
          padding: 10px 20px;
          border-radius: 50px;
          font-family: 'Marcellus', serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }
        .jn-btn-blue:hover {
          background: rgba(74, 139, 194, 0.4);
          box-shadow: 0 0 25px rgba(74, 139, 194, 0.5);
        }
        [dir='rtl'] .jn-btn-outline,
        [dir='rtl'] .jn-btn-blue,
        [dir='rtl'] .jn-btn-blue-active {
          letter-spacing: 0;
          text-transform: none;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
        }

        /* ---------- Closed book ---------- */
        .jn-closed-book-wrap {
          perspective: 2000px;
          margin: 20px auto 0;
          cursor: pointer;
        }
        .jn-closed-book {
          position: relative;
          width: min(400px, 78vw);
          aspect-ratio: 3 / 4.3;
          border-radius: 4px 10px 10px 4px;
          box-shadow: 0 45px 100px rgba(0, 0, 0, 0.9),
            0 0 120px rgba(74, 139, 194, 0.5),
            0 0 200px rgba(42, 90, 156, 0.2),
            inset -10px 0 30px rgba(0, 0, 0, 0.55),
            inset 10px 0 20px rgba(255, 255, 255, 0.05);
          animation: bookFloat 7s ease-in-out infinite;
          overflow: hidden;
        }
        .jn-closed-book-inner {
          position: absolute;
          inset: 0;
          padding: 55px 46px 50px 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .jn-closed-motif {
          font-size: 2.4rem;
          opacity: 0.9;
        }
        .jn-closed-title {
          font-family: 'Marcellus', serif;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .jn-closed-hint {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.8rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        /* ---------- Spread (open notebook) ---------- */
        .jn-open-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .jn-spread {
          position: relative;
          width: min(1100px, 96vw);
          aspect-ratio: 16 / 10;
          border-radius: 14px;
          padding: 26px;
          display: flex;
          gap: 4px;
          box-shadow: 0 70px 160px rgba(0, 0, 0, 0.95),
            0 0 180px rgba(74, 139, 194, 0.4),
            inset 0 0 70px rgba(0, 0, 0, 0.45);
        }
        .jn-spine {
          position: absolute;
          top: 26px;
          bottom: 26px;
          left: 50%;
          width: 24px;
          transform: translateX(-50%);
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.18) 40%,
            rgba(0, 0, 0, 0.4) 60%,
            rgba(0, 0, 0, 0.55)
          );
          z-index: 5;
          pointer-events: none;
        }
        .jn-page {
          position: relative;
          flex: 1;
          border-radius: 4px;
          padding: 46px 52px 50px;
          overflow-y: auto;
          box-shadow: inset 0 0 70px rgba(120, 140, 170, 0.18),
            inset -4px 0 12px rgba(0, 0, 0, 0.07),
            inset 4px 0 12px rgba(0, 0, 0, 0.07);
        }
        .jn-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px dashed rgba(120, 140, 170, 0.3);
        }
        .jn-page-date {
          font-family: 'Marcellus', serif;
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          opacity: 0.6;
        }
        .jn-mood-row {
          display: flex;
          gap: 8px;
        }
        .jn-mood-dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.18);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .jn-mood-dot.active {
          transform: scale(1.2);
        }
        .jn-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          font-size: 1.2rem;
          line-height: 1.95;
          min-height: 340px;
          display: block;
          font-family: inherit;
        }
        .jn-textarea::placeholder {
          opacity: 0.4;
          font-style: italic;
        }
        .jn-page-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px dashed rgba(120, 140, 170, 0.3);
          font-family: 'Marcellus', serif;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.55;
        }
        .jn-entries-title {
          font-family: 'Marcellus', serif;
          font-size: 0.95rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0.72;
        }
        .jn-empty {
          text-align: center;
          padding: 50px 20px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          opacity: 0.55;
          font-size: 1.1rem;
          line-height: 1.9;
        }
        .jn-entries-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .jn-entry-card {
          padding: 16px 18px;
          border: 1px solid;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .jn-entry-card:hover {
          background: rgba(255, 255, 255, 0.55);
        }
        .jn-entry-title {
          font-size: 0.8rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.88;
          margin-bottom: 8px;
        }
        .jn-entry-preview {
          font-size: 0.98rem;
          line-height: 1.5;
          opacity: 0.62;
        }
        .jn-entry-date {
          font-family: 'Marcellus', serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0.48;
          margin-top: 10px;
        }
        .jn-newpage-wrap {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
        }

        /* ---------- Modal ---------- */
        .jn-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(5, 5, 8, 0.92);
          backdrop-filter: blur(18px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .jn-modal {
          background: linear-gradient(
            160deg,
            rgba(20, 30, 50, 0.98),
            rgba(10, 15, 28, 0.98)
          );
          border: 1px solid rgba(160, 200, 240, 0.4);
          border-radius: 18px;
          padding: 46px 44px;
          max-width: 640px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 60px 140px rgba(0, 0, 0, 0.95),
            0 0 100px rgba(74, 139, 194, 0.35);
        }
        .jn-modal-title {
          font-family: 'Marcellus', serif;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          color: var(--white);
          margin-bottom: 10px;
          text-shadow: 0 0 20px rgba(74, 139, 194, 0.5);
        }
        .jn-modal-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--silver);
          margin-bottom: 32px;
          font-size: 1.1rem;
        }
        .jn-modal-label {
          display: block;
          font-family: 'Marcellus', serif;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--soft-blue);
          margin-bottom: 12px;
        }
        .jn-modal-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(13, 27, 62, 0.7);
          border: 1px solid rgba(160, 200, 240, 0.3);
          border-radius: 10px;
          color: var(--white);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          outline: none;
          margin-bottom: 32px;
        }
        .jn-theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 14px;
          margin-bottom: 36px;
        }
        .jn-theme-choice {
          cursor: pointer;
          border-radius: 10px;
          padding: 14px 12px;
          text-align: center;
          border: 2px solid transparent;
          background: rgba(13, 27, 62, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: all 0.4s ease;
        }
        .jn-theme-choice.selected {
          border-color: var(--soft-blue);
          background: rgba(74, 139, 194, 0.2);
          box-shadow: 0 0 25px rgba(74, 139, 194, 0.5);
        }
        .jn-theme-swatch {
          width: 46px;
          height: 64px;
          border-radius: 3px 7px 7px 3px;
          box-shadow: inset -3px 0 6px rgba(0, 0, 0, 0.45),
            0 5px 14px rgba(0, 0, 0, 0.55);
        }
        .jn-theme-name {
          font-family: 'Marcellus', serif;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--silver);
        }
        .jn-theme-choice.selected .jn-theme-name {
          color: var(--white);
        }
        .jn-modal-actions {
          display: flex;
          gap: 14px;
          justify-content: flex-end;
        }

        /* ---------- Toast ---------- */
        .jn-toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          padding: 16px 32px;
          background: rgba(13, 27, 62, 0.95);
          border: 1px solid rgba(160, 200, 240, 0.4);
          border-radius: 50px;
          color: var(--white);
          font-family: 'Marcellus', serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(14px);
          z-index: 2000;
          box-shadow: 0 0 40px rgba(74, 139, 194, 0.4);
          max-width: calc(100vw - 48px);
          text-align: center;
        }

        /* =========================================================
           MOBILE — TABLET (768px and below)
           ========================================================= */
        @media (max-width: 768px) {
          .jn-content {
            padding: 100px 12px 60px !important;
            align-items: flex-start;
          }
          .jn-shelf-header {
            margin-bottom: 36px !important;
            padding: 0 8px;
          }
          .jn-shelf-label {
            font-size: 0.6rem !important;
            letter-spacing: 0.3em !important;
            margin-bottom: 18px !important;
          }
          .jn-shelf-title {
            font-size: 2.2rem !important;
            margin-bottom: 16px !important;
          }
          .jn-shelf-subtitle {
            font-size: 1rem !important;
            padding: 0 12px;
          }
          .jn-shelf-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
            gap: 28px 20px !important;
          }
          .jn-book-content {
            padding: 26px 20px 22px 30px !important;
          }
          .jn-book-motif {
            font-size: 1.5rem !important;
          }
          .jn-book-title {
            font-size: 0.85rem !important;
            letter-spacing: 0.1em !important;
          }
          .jn-book-meta {
            font-size: 0.6rem !important;
          }
          .jn-new-plus {
            font-size: 2rem !important;
          }

          /* Topbar */
          .jn-topbar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 14px !important;
            margin-bottom: 24px !important;
          }
          .jn-topbar-left {
            justify-content: space-between;
          }
          .jn-notebook-name {
            font-size: 1.1rem !important;
            letter-spacing: 0.12em !important;
          }
          .jn-topbar-controls {
            justify-content: center;
            width: 100%;
          }
          .jn-topbar-controls .jn-btn-outline,
          .jn-topbar-controls .jn-btn-blue-active {
            flex: 1 1 45%;
            text-align: center;
          }

          /* Closed book */
          .jn-closed-book {
            width: 80vw !important;
          }
          .jn-closed-book-inner {
            padding: 40px 32px 36px 44px !important;
          }
          .jn-closed-motif {
            font-size: 2rem !important;
          }
          .jn-closed-title {
            font-size: 1.2rem !important;
          }
          .jn-closed-hint {
            font-size: 0.7rem !important;
          }

          /* ===================================================
             SPREAD BECOMES FULL-SCREEN VERTICAL STACK
             Each page fills the phone width, generously tall
             =================================================== */
          .jn-open-wrap {
            margin-top: 8px !important;
          }
          .jn-spread {
            flex-direction: column !important;
            aspect-ratio: auto !important;
            width: 100% !important;
            padding: 14px !important;
            border-radius: 14px !important;
            gap: 16px !important;
          }
          .jn-spine {
            display: none !important;
          }
          .jn-page {
            padding: 28px 24px 26px !important;
            min-height: 480px !important;
            border-radius: 8px !important;
          }
          .jn-page-header {
            margin-bottom: 18px !important;
            padding-bottom: 12px !important;
          }
          .jn-page-date {
            font-size: 0.6rem !important;
            letter-spacing: 0.25em !important;
          }
          .jn-textarea {
            min-height: 340px !important;
            font-size: 1.15rem !important;
            line-height: 1.9 !important;
          }
          .jn-page-footer {
            font-size: 0.6rem !important;
            letter-spacing: 0.2em !important;
            margin-top: 16px !important;
            padding-top: 12px !important;
          }
          .jn-entries-title {
            font-size: 0.85rem !important;
          }
          .jn-empty {
            padding: 36px 16px !important;
            font-size: 1rem !important;
          }
          .jn-entry-card {
            padding: 16px 18px !important;
          }
          .jn-entry-title {
            font-size: 0.78rem !important;
          }
          .jn-entry-preview {
            font-size: 0.95rem !important;
          }
          .jn-newpage-wrap {
            margin-top: 22px !important;
          }
          .jn-newpage-wrap .jn-btn-outline {
            width: 100%;
            text-align: center;
            padding: 14px 20px;
          }

          /* Modal */
          .jn-modal {
            padding: 32px 24px 26px !important;
            border-radius: 14px !important;
            max-height: 92vh !important;
          }
          .jn-modal-title {
            font-size: 1.25rem !important;
          }
          .jn-modal-sub {
            font-size: 1rem !important;
            margin-bottom: 24px !important;
          }
          .jn-modal-input {
            padding: 14px 16px !important;
            font-size: 1rem !important;
            margin-bottom: 24px !important;
          }
          .jn-theme-grid {
            grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)) !important;
            gap: 10px !important;
            margin-bottom: 24px !important;
          }
          .jn-theme-choice {
            padding: 10px 8px !important;
            gap: 6px !important;
          }
          .jn-theme-swatch {
            width: 36px !important;
            height: 50px !important;
          }
          .jn-theme-name {
            font-size: 0.55rem !important;
            letter-spacing: 0.1em !important;
          }
          .jn-modal-actions {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .jn-modal-actions .jn-btn-outline,
          .jn-modal-actions .jn-btn-blue {
            width: 100% !important;
            text-align: center;
            padding: 14px 20px;
          }
        }

        /* =========================================================
           MOBILE — SMALL PHONES (480px and below)
           ========================================================= */
        @media (max-width: 480px) {
          .jn-shelf-title {
            font-size: 1.8rem !important;
          }
          .jn-shelf-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
            gap: 20px 14px !important;
          }
          .jn-book-content {
            padding: 22px 16px 18px 26px !important;
          }
          .jn-book-title {
            font-size: 0.78rem !important;
          }
          .jn-closed-book-title {
            font-size: 1rem !important;
          }
          .jn-page {
            padding: 24px 20px 22px !important;
            min-height: 420px !important;
          }
          .jn-textarea {
            min-height: 300px !important;
            font-size: 1.05rem !important;
          }
          .jn-modal {
            padding: 26px 20px 22px !important;
          }
          .jn-modal-title {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
