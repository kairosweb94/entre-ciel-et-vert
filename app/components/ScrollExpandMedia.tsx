'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useNavigation } from './NavigationContext';

interface Props {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({ mediaSrc, bgImageSrc, title, scrollToExpand, children }: Props) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { pendingTarget, clearTarget } = useNavigation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Quand un lien nav est cliqué ──────────────────────────────
  useEffect(() => {
    if (!pendingTarget) return;
    if (fullyExpanded) {
      // Déjà expansé → scroll direct
      const el = document.getElementById(pendingTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      clearTarget();
    } else {
      // Expand en accéléré puis scroll
      let prog = scrollProgress;
      const step = () => {
        prog = Math.min(prog + 0.04, 1);
        setScrollProgress(prog);
        if (prog < 1) {
          requestAnimationFrame(step);
        } else {
          setFullyExpanded(true);
          setShowContent(true);
          setTimeout(() => {
            const el = document.getElementById(pendingTarget);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            clearTarget();
          }, 400);
        }
      };
      requestAnimationFrame(step);
    }
  }, [pendingTarget]);

  // ── Wheel ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as WheelEvent;
      if (fullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false); setShowContent(false);
        setScrollProgress(0.95);
        we.preventDefault();
      } else if (!fullyExpanded) {
        we.preventDefault();
        const next = Math.min(Math.max(scrollProgress + we.deltaY * 0.001, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
      }
    };
    const handleScroll = () => { if (!fullyExpanded) window.scrollTo(0, 0); };
    const handleTouchStart = (e: Event) => setTouchStartY((e as TouchEvent).touches[0].clientY);
    const handleTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      if (!touchStartY) return;
      const deltaY = touchStartY - te.touches[0].clientY;
      if (fullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setFullyExpanded(false); setShowContent(false); setScrollProgress(0.95);
        te.preventDefault(); return;
      }
      if (!fullyExpanded) {
        te.preventDefault();
        const next = Math.min(Math.max(scrollProgress + deltaY * 0.007, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
        setTouchStartY(te.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => setTouchStartY(0);

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, fullyExpanded, touchStartY]);

  const mediaW = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaH = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textShift = scrollProgress * (isMobile ? 180 : 150);
  const firstWord = title?.split(' ')[0] ?? '';
  const rest = title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

          {/* Fond fixe */}
          <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}>
            <Image src={bgImageSrc} alt="Background" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,43,26,0.5) 0%,transparent 60%)' }} />
          </motion.div>

          {/* Contenu centré */}
          <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            {/* Image centrale qui s'étend */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: `${mediaW}px`, height: `${mediaH}px`,
              maxWidth: '95vw', maxHeight: '85vh',
              borderRadius: scrollProgress > 0.8 ? '0' : '16px',
              overflow: 'hidden',
              boxShadow: `0 0 ${60 - scrollProgress * 60}px rgba(28,43,26,0.4)`,
              transition: 'border-radius 0.3s',
            }}>
              <Image src={mediaSrc} alt="Hero" fill style={{ objectFit: 'cover' }} />
              <motion.div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
                animate={{ opacity: 0.7 - scrollProgress * 0.5 }}
                transition={{ duration: 0.2 }} />
            </div>

            {/* Titre qui s'écarte */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
              <div style={{ transform: `translateX(-${textShift}vw)`, display: 'inline-block', padding: '0 1rem' }}>
                <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', color: '#C4A882', fontSize: 'clamp(1rem,2vw,1.2rem)', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
                  Entre Ciel et Vert
                </p>
                <h1 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05, color: '#F7F4EF', fontWeight: 400 }}>
                  {firstWord}
                </h1>
              </div>
              <div style={{ transform: `translateX(${textShift}vw)`, display: 'inline-block', padding: '0 1rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05, color: '#F7F4EF', fontWeight: 300, fontStyle: 'italic' }}>
                  {rest}
                </h1>
                {scrollToExpand && (
                  <p style={{ fontFamily: 'Inter,system-ui,sans-serif', color: 'rgba(247,244,239,0.6)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem', opacity: Math.max(0, 1 - scrollProgress * 4) }}>
                    ↓ {scrollToExpand}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contenu sections — visible après expansion */}
          <motion.div style={{ width: '100%' }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.7 }}>
            {children}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
