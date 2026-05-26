import React, { useRef, useState } from 'react';

const TiltCard = ({ children, className = '', maxRotation = 5 }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isReset, setIsReset] = useState(true);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    setIsReset(false);
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsReset(true);
    setRotate({ x: 0, y: 0 });
  };

  const style = {
    '--rotate-x': `${rotate.x}deg`,
    '--rotate-y': `${rotate.y}deg`,
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${isReset ? 'tilt-reset' : ''} ${className}`}
      style={style}
    >
      <div className="tilt-card-inner h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
