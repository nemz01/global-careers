'use client';

export default function AnimatedBackground() {
  return (
    <div className="animated-background-container" aria-hidden="true">
      <div className="animated-bg-base" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="animated-bg-noise" />
    </div>
  );
}
