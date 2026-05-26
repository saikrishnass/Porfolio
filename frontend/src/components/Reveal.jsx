import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, className = '', threshold = 0.15 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to keep it active
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? 'active' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
