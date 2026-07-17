'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useNavigation } from './NavigationContext';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  bgImageSrc,
  title,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { pendingTarget, clearTarget } = useNavigation();

  // ── Navigation onglets → expansion hero puis scroll ──────────
  useEffect(() => {
    if (!pendingTarget) return;
    if (mediaFullyExpanded) {
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
          setMediaFullyExpanded(true);
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
      if (mediaFullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        we.preventDefault();
      } else if (!mediaFullyExpanded) {
        we.preventDefault();
        const scrollDelta = we.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
      }
    };

    const handleTouchStart = (e: Event) => {
      setTouchStartY((e as TouchEvent).touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      if (!touchStartY) return;
      const touchY = te.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        te.preventDefault();
      } else if (!mediaFullyExpanded) {
        te.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

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
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  return (
    <div ref={sectionRef} style={{ overflowX: 'hidden' }}>
      <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100dvh' }}>
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100dvh' }}>

          {/* IMAGE DE FOND — paysagiste-2.jpg */}
          <motion.div
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Fond jardin"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,43,26,0.92) 0%, rgba(28,43,26,0.45) 50%, rgba(28,43,26,0.2) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,43,26,0.35), transparent 60%)' }} />
          </motion.div>

          <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', width: '100%', height: '100dvh', position: 'relative', paddingBottom: 'clamp(4rem,7vw,7rem)' }}>

              {/* IMAGE CENTRALE ANIMÉE — salarie.jpg */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${mediaWidth}px`, height: `${mediaHeight}px`,
                maxWidth: '95vw', maxHeight: '85vh',
                boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
                borderRadius: '12px', overflow: 'hidden',
              }}>
                <Image
                  src={mediaSrc}
                  alt="Paysagiste au travail"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                />
                <motion.div
                  style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '12px' }}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.7 - scrollProgress * 0.55 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* TEXTES */}
              <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 clamp(1.5rem,5vw,4rem)' }}>
                <motion.div style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                  <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', color: '#C4A882', fontSize: 'clamp(1rem,1.5vw,1.2rem)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                    Entre Ciel et Vert
                  </p>
                  <h1 style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 'clamp(3rem,7vw,6.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#F7F4EF', fontWeight: 400, maxWidth: '56rem', margin: '0 0 1.5rem' }}>
                    Votre jardin,<br />
                    <em style={{ fontWeight: 300 }}>une œuvre vivante.</em>
                  </h1>
                </motion.div>
                <motion.div style={{ transform: `translateX(${textTranslateX}vw)` }}>
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

            </div>

            {/* CONTENU SECTIONS */}
            <motion.section
              style={{ width: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
