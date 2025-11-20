import React, { useEffect, useRef } from 'react';

const BackgroundEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPct = (clientX / window.innerWidth - 0.5);
      const yPct = (clientY / window.innerHeight - 0.5);

      // Update CSS variables for spotlight
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }

      // Parallax for blobs (direct DOM manipulation for performance)
      requestAnimationFrame(() => {
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translate(${xPct * -40}px, ${yPct * -40}px)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translate(${xPct * 40}px, ${yPct * 40}px)`;
        }
        if (blob3Ref.current) {
          // Center blob moves slightly differently
          blob3Ref.current.style.transform = `translate(-50%, -50%) translate(${xPct * -20}px, ${yPct * -20}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Base Background */}
      <div className="absolute inset-0 bg-warm-50 dark:bg-zinc-900 transition-colors duration-500" />

      {/* Moving Gradient Orbs */}
      <div 
        ref={blob1Ref}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] bg-warm-200/50 dark:bg-warm-900/20 rounded-full blur-[80px] md:blur-[120px] transition-all duration-1000 ease-out will-change-transform mix-blend-multiply dark:mix-blend-screen opacity-80"
      />
      <div 
        ref={blob2Ref}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] bg-nature-200/50 dark:bg-nature-900/20 rounded-full blur-[80px] md:blur-[120px] transition-all duration-1000 ease-out will-change-transform mix-blend-multiply dark:mix-blend-screen opacity-80"
      />
      <div 
        ref={blob3Ref}
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[60px] md:blur-[100px] transition-all duration-1000 ease-out will-change-transform mix-blend-multiply dark:mix-blend-screen opacity-60"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Light Mode Spotlight (Subtle Brightening) */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.6), transparent 100%)`,
          mixBlendMode: 'soft-light'
        }}
      />

      {/* Dark Mode Spotlight (Subtle Glow) */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 100%)`,
        }}
      />
      
      {/* Grain Texture (Optional - Adds a bit of high-end feel) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default BackgroundEffect;