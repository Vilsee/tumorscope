import React from 'react';

export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#121826]/80 backdrop-blur-md border border-[#1A2236] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}
