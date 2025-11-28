import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-sacred/30 animate-float-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      {/* Larger glowing orbs */}
      <div className="absolute w-32 h-32 bg-sacred/10 rounded-full blur-3xl top-1/4 left-1/4 animate-float-slow" />
      <div className="absolute w-24 h-24 bg-purple-500/10 rounded-full blur-3xl top-1/2 right-1/4 animate-float-slow-reverse" />
      <div className="absolute w-40 h-40 bg-amber-500/5 rounded-full blur-3xl bottom-1/4 left-1/3 animate-float-medium" />
    </div>
  );
};
