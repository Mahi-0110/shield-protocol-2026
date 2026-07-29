import React, { useEffect, useState } from 'react';

const CursorSpotlight: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-300">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(56,189,248,0.1) 45%, transparent 70%)',
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
