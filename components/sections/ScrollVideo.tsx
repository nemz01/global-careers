'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface CardZone {
  show: number;
  hide: number;
}

const CARD_ZONES: CardZone[] = [
  { show: 0.05, hide: 0.22 },
  { show: 0.25, hide: 0.42 },
  { show: 0.45, hide: 0.62 },
  { show: 0.65, hide: 0.82 },
  { show: 0.85, hide: 0.98 },
];

export function ScrollVideo() {
  const t = useTranslations('scrollVideo');
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);

  const cards = [
    { num: '01', titleKey: 'card1Title', descKey: 'card1Desc', statKey: 'card1Stat', labelKey: 'card1Label' },
    { num: '02', titleKey: 'card2Title', descKey: 'card2Desc', statKey: 'card2Stat', labelKey: 'card2Label' },
    { num: '03', titleKey: 'card3Title', descKey: 'card3Desc', statKey: 'card3Stat', labelKey: 'card3Label' },
    { num: '04', titleKey: 'card4Title', descKey: 'card4Desc', statKey: 'card4Stat', labelKey: 'card4Label' },
    { num: '05', titleKey: 'card5Title', descKey: 'card5Desc', statKey: 'card5Stat', labelKey: 'card5Label' },
  ];

  // Video loading — use multiple events for reliability
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function markReady() {
      setReady(true);
    }

    // loadedmetadata fires earliest, canplay fires when enough data is buffered
    video.addEventListener('loadedmetadata', markReady);
    video.addEventListener('canplay', markReady);

    // If already loaded (e.g. from cache), fire immediately
    if (video.readyState >= 1) {
      markReady();
    }

    // Fallback timeout — show content even if events don't fire
    const timeout = setTimeout(markReady, 3000);

    return () => {
      video.removeEventListener('loadedmetadata', markReady);
      video.removeEventListener('canplay', markReady);
      clearTimeout(timeout);
    };
  }, []);

  // Scroll-driven video scrubbing
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !ready) return;

    function tick() {
      const rect = section!.getBoundingClientRect();
      const scrollable = section!.offsetHeight - window.innerHeight;
      if (scrollable > 0) {
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

        // Set video time — all-keyframe encoding makes this instant
        if (video!.duration && isFinite(video!.duration)) {
          video!.currentTime = progress * video!.duration;
        }

        // Determine active annotation card
        let active = -1;
        for (let i = 0; i < CARD_ZONES.length; i++) {
          if (progress >= CARD_ZONES[i].show && progress <= CARD_ZONES[i].hide) {
            active = i;
            break;
          }
        }
        setActiveCard(active);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] md:h-[350vh] lg:h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-dark-navy">
        {/* Video element — covers viewport */}
        <video
          ref={videoRef}
          src="/videos/hero-scroll.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlays for seamless blending */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark-navy to-transparent pointer-events-none z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark-navy to-transparent pointer-events-none z-[2]" />

        {/* Annotation cards */}
        {cards.map((card, i) => (
          <div
            key={card.num}
            className={`
              absolute bottom-[8vh] left-[5vw] max-w-[360px] z-10
              bg-[rgba(10,22,40,0.75)] border border-white/[0.06]
              backdrop-blur-[24px] rounded-2xl p-7
              transition-all duration-400 ease-out
              ${activeCard === i
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-5 pointer-events-none'
              }
              max-md:bottom-[1.5vh] max-md:left-[2vw] max-md:right-[2vw] max-md:max-w-none
              max-md:flex max-md:items-center max-md:gap-3 max-md:p-3 max-md:rounded-xl
            `}
          >
            <span className="font-mono text-xs text-primary-cyan max-md:mb-0 mb-2 block">
              {card.num}
            </span>
            <div>
              <h3 className="font-heading font-semibold text-lg text-white max-md:text-base max-md:mb-0 mb-2">
                {t(card.titleKey)}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed max-md:hidden mb-4">
                {t(card.descKey)}
              </p>
              <div className="max-md:hidden">
                <span className="font-heading text-3xl font-bold text-primary-cyan">
                  {t(card.statKey)}
                </span>
                <span className="text-white/55 text-xs block mt-0.5">
                  {t(card.labelKey)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Loading state */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-navy z-20">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary-cyan/30 border-t-primary-cyan rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-white/40 uppercase tracking-widest">Loading</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
