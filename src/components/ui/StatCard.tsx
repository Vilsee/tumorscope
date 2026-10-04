import React from 'react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <GlassCard className="flex flex-col gap-2 justify-center items-center text-center">
      {icon && <div className="text-[#5AC8FA] mb-2">{icon}</div>}
      <div className="text-3xl font-bold font-mono text-[#E8EDF4]">{value}</div>
      <div className="text-sm text-[#8A96AC] uppercase tracking-wider">{label}</div>
    </GlassCard>
  );
}
