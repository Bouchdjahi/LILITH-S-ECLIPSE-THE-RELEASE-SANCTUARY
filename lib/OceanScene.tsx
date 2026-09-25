'use client';

import { useEffect, useRef } from 'react';

/* =========================================================
   LILITH'S ECLIPSE — DEEP OCEAN BACKGROUND
   Video-based cinematic underwater world with layered
   particles, vignette, and subtle mouse parallax.
   ========================================================= */

export default function OceanScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const particleLayerRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     MOUSE PARALLAX — video shifts gently as user moves mouse
     ========================================================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
      targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      // The video is 110% of the screen; we shift it within the extra 10%
      const shiftX = currentX * 20;
      const shiftY = currentY * 20;
      video.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px)) scale(1.1)`;
      frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  /* =========================================================
     DRIFTING PARTICLES — the atmosphere layer on top of video
     ========================================================= */
  useEffect(() => {
    const layer = particleLayerRef.current;
    if (!layer) return;

    const particleCount = 40;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1.5;
      const duration = 30 + Math.random() * 40;
      const delay = -Math.random() * duration;
      const driftType = i % 3;

      p.style.position = 'absolute';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.borderRadius = '50%';
      p.style.background = 'rgba(190, 220, 245, 0.7)';
      p.style.boxShadow = '0 0 10px 2px rgba(74, 139, 194, 0.6)';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animation = `drift${driftType} ${duration}s linear infinite`;
      p.style.animationDelay = delay + 's';
      p.style.pointerEvents = 'none';
      p.style.opacity = '0';

      layer.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  /* =========================================================
     SEAMLESS LOOP — restart just before the end
     ========================================================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      if (video.currentTime >= video.duration - 0.3) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <>
      {/* ========== LAYER 0: SOLID DEEP-BLUE BACKDROP ========== */}
      {/* This fills the whole screen behind the video — so even if
          the video has transparent parts, we see deep ocean, not white. */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(ellipse at 50% 30%, #0d1b3e 0%, #0a0f1c 45%, #050508 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ========== LAYER 1: THE FULL-SCREEN VIDEO ========== */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%) scale(1.1)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'brightness(0.65) saturate(1.15) contrast(1.05)',
        }}
      >
        <source src="/ocean.mp4" type="video/mp4" />
      </video>

      {/* ========== LAYER 2: DRIFTING PARTICLES ========== */}
      <div
        ref={particleLayerRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      />

      {/* ========== LAYER 3: CINEMATIC VIGNETTE + BLUE GLOW ========== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 50% 35%, rgba(42,90,156,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 40%, rgba(5,5,15,0) 0%, rgba(5,5,15,0.35) 55%, rgba(2,4,10,0.92) 100%),
            linear-gradient(to bottom, rgba(5,5,15,0.55) 0%, transparent 18%, transparent 72%, rgba(2,4,10,0.9) 100%)
          `,
        }}
      />

      {/* ========== KEYFRAMES FOR PARTICLES ========== */}
      <style jsx global>{`
        @keyframes drift0 {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.9; }
          100% { transform: translate(30px, -220px); opacity: 0; }
        }
        @keyframes drift1 {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.7; }
          100% { transform: translate(-45px, -280px); opacity: 0; }
        }
        @keyframes drift2 {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { transform: translate(15px, -340px); opacity: 0; }
        }
      `}</style>
    </>
  );
}
