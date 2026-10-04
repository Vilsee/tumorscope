import React from 'react';
import { ClinicalTrial } from '@/types';
import { GlassCard } from './GlassCard';

export function TrialCard({ trial }: { trial: ClinicalTrial }) {
  return (
    <GlassCard className="mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-[#E8EDF4]">{trial.title}</h3>
        <span className="px-2 py-1 text-xs rounded bg-[#2D7DD2]/20 text-[#2D7DD2] ml-4 whitespace-nowrap">
          {trial.status}
        </span>
      </div>
      <div className="text-sm text-[#8A96AC] mb-4">NCT ID: {trial.nctId} | Phase: {trial.phase}</div>
      {trial.summary && <p className="text-sm text-[#E8EDF4] line-clamp-3 mb-4">{trial.summary}</p>}
      <div className="flex flex-wrap gap-2">
        {trial.conditions.slice(0, 3).map((c, i) => (
          <span key={i} className="px-2 py-1 text-xs rounded-full bg-[#1A2236] text-[#E8EDF4]">{c}</span>
        ))}
      </div>
    </GlassCard>
  );
}
