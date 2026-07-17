'use client';

import { useEffect, useState, ReactNode } from 'react';
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

const ScrollExpandMedia = ({ mediaSrc, bgImageSrc, scrollToExpand, children }: Props) => {
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

  useEffect(() => {
    if (!pendingTarget) return;
    if (fullyExpanded) {
      const el = document.getElementById(pendingTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      clearTarget();
    } else {
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

  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as WheelEvent;
      if (fullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false);
        setShowContent(false);
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

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

          {/* IMAGE DE FOND — paysagiste-2.jpg */}
          <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}>
            <Image src={bgImageSrc} alt="Fond jardin" fill priority
              style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,43,26,0.92) 0%, rgba(28,43,26,0.5) 40%, rgba(28,43,26,0.2) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,43,26,0.4), transparent 60%)' }} />
          </motion.div>

          {/* IMAGE CENTRALE ANIMÉE — salarie.jpg */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${mediaW}px`, height: `${mediaH}px`,
            maxWidth: '95vw', maxHeight: '85vh',
            borderRadius: scrollProgress > 0.8 ? '0' : '16px',
            overflow: 'hidden',
            boxShadow: `0 0 ${60 - scrollProgress * 60}px rgba(28,43,26,0.5)`,
            transition: 'border-radius 0.3s',
            zIndex: 5,
          }}>
            <Image src={mediaSrc} alt="Paysagiste au travail" fill
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
            <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}
              animate={{ opacity: 0.6 - scrollProgress * 0.55 }}
              transition={{ duration: 0.2 }} />
          </div>

          {/* TEXTES — en bas à gauche */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            padding: '0 clamp(1.5rem,5vw,4rem) clamp(4rem,7vw,7rem)',
          }}>
            <motion.div style={{ transform: `translateX(-${textShift}vw)` }}>
              <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', color: '#C4A882', fontSize: 'clamp(1rem,1.5vw,1.2rem)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                Entre Ciel et Vert
              </p>
              <h1 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 'clamp(3rem,7vw,6.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#F7F4EF', fontWeight: 400, maxWidth: '56rem', margin: '0 0 1.5rem' }}>
                Votre jardin,<br />
                <em style={{ fontWeight: 300 }}>une œuvre vivante.</em>
              </h1>
            </motion.div>
            <motion.div style={{ transform: `translateX(${textShift}vw)` }}>
              <p style={{ fontFamily: 'Inter,system-ui,sans-serif', color: 'rgba(247,244,239,0.8)', fontSize: 'clamp(0.9rem,1.2vw,1.1rem)', fontWeight: 300, lineHeight: 1.7, maxWidth: '36rem', marginBottom: '2rem' }}>
                Alexandre Phelip conçoit et réalise des espaces extérieurs sur mesure, pensés pour durer et évoluer avec les saisons.
              </p>
              {scrollToExpand && (
                <p style={{ fontFamily: 'Inter,system-ui,sans-serif', color: 'rgba(247,244,239,0.5)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: Math.max(0, 1 - scrollProgress * 4) }}>
                  ↓ {scrollToExpand}
                </p>
              )}
            </motion.div>
          </div>

          {/* CONTENU SECTIONS */}
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
