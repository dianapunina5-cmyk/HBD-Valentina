
import React, { useEffect, useState } from 'react';

const Wisp: React.FC = () => {
  const [style, setStyle] = useState<React.CSSProperties>({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: 0,
    transition: 'all 5s ease-in-out',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        transition: 'all 8s ease-in-out',
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return <div className="wisp" style={style} />;
};

const FloatingWisps: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(12)].map((_, i) => (
        <Wisp key={i} />
      ))}
    </div>
  );
};

export default FloatingWisps;
