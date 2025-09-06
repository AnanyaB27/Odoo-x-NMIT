'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Set initial state
    gsap.set(container, {
      opacity: 0,
      y: 20,
    });

    // Animate in
    gsap.to(container, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Cleanup function
    return () => {
      gsap.killTweensOf(container);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

// Hook for programmatic page transitions
export const usePageTransition = () => {
  const transitionOut = (callback?: () => void) => {
    gsap.to('main', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: callback,
    });
  };

  const transitionIn = () => {
    gsap.fromTo('main', 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  };

  return { transitionOut, transitionIn };
};