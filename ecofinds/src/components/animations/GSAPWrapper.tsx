'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'stagger';
  delay?: number;
  duration?: number;
  trigger?: boolean; // Use ScrollTrigger
  className?: string;
}

export const GSAPWrapper: React.FC<GSAPWrapperProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  trigger = false,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: animation === 'slideUp' ? 30 : 0,
      x: animation === 'slideInLeft' ? -30 : animation === 'slideInRight' ? 30 : 0,
      scale: animation === 'scaleIn' ? 0.95 : 1,
    });

    const animationConfig = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power2.out',
    };

    if (trigger) {
      // Use ScrollTrigger for scroll-based animations
      gsap.to(element, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    } else {
      // Immediate animation
      gsap.to(element, animationConfig);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration, trigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Stagger animation component for animating multiple children
interface StaggerWrapperProps {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
  trigger?: boolean;
  className?: string;
}

export const StaggerWrapper: React.FC<StaggerWrapperProps> = ({
  children,
  staggerDelay = 0.1,
  animation = 'slideUp',
  trigger = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const childElements = container.children;

    // Set initial state for all children
    gsap.set(childElements, {
      opacity: 0,
      y: animation === 'slideUp' ? 30 : 0,
      scale: animation === 'scaleIn' ? 0.95 : 1,
    });

    const animationConfig = {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: staggerDelay,
    };

    if (trigger) {
      gsap.to(childElements, {
        ...animationConfig,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    } else {
      gsap.to(childElements, animationConfig);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [staggerDelay, animation, trigger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};