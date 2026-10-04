'use client';

import { BrainRegion, TumorEntry } from '@/types';
import { getTumorsForRegion } from '@/lib/zoneMapping';
import { CATEGORY_META } from '@/data/tumorClassification';
import { EvidenceOverlay } from '@/components/ui/EvidenceOverlay';
import { ActiveResearchRadar } from '@/components/ui/ActiveResearchRadar';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, Suspense } from 'react';

const BrainScene = dynamic(() => import('@/components/brain/BrainScene'), {
  ssr: false,
  loading: () => <div className="skeleton w-full h-full min-h-[500px]"></div>,
});

function gradeColor(g: number) {
  switch (g) {
    case 1: return 'var(--grade-1)';
    case 2: return 'var(--grade-2)';
    case 3: return 'var(--grade-3)';
    case 4: return 'var(--grade-4)';
    default: return 'var(--text-muted)';
  }
}

export default function AtlasExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);

  // Get matching tumor entries from tumorClassification taxonomy
  const matchingTumors: TumorEntry[] = selectedRegion 
    ? getTumorsForRegion(selectedRegion)
    : [];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] bg-[var(--bg-base)]">
      
      {/* 3D Brain Viewport (Left/Top) */}
      <div className="w-full md:w-3/5 h-[50vh] md:h-full relative border-b md:border-b-0 md:border-r border-[var(--glass-border)] bg-[radial-gradient(ellipse_at_center,_var(--bg-panel-cool)_0%,_var(--bg-base)_100%)] flex-shrink-0">
        <div className="absolute top-4 left-4 z-10 glass-card px-4 py-2 pointer-events-none">
          <h2 className="text-sm font-semibold text-[var(--cyan)]">Interactive 3D Atlas</h2>
          <p className="text-xs text-[var(--text-muted)]">Click anatomical regions to discover associated WHO CNS5 tumors</p>
        </div>
        
        <Suspense fallback={null}>
          <BrainScene 
            interactive={true} 
            selectedRegion={selectedRegion}
            onRegionSelect={(region) => setSelectedRegion(region as BrainRegion)}
          />
        </Suspense>

        {selectedRegion && (
          <button 
            onClick={() => setSelectedRegion(null)}
            className="absolute top-4 right-4 z-10 glass px-3 py-1 rounded-full text-xs hover:bg-white/10 transition"
          >
            Reset View
          </button>
        )}
      </div>

      {/* Info Panel (Right/Bottom) */}
      <div className="w-full md:w-2/5 h-1/2 md:h-full overflow-y-auto custom-scrollbar p-6">
        {!selectedRegion ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto animate-fade-in">
            <div className="w-16 h-16 mb-4 rounded-full glass flex items-center justify-center text-2xl border-[var(--glass-border)]">
              🧠
            </div>
            <h3 className="text-xl font-bold mb-2 font-[var(--font-display)]">Select an Anatomical Zone</h3>
            <p className="text-[var(--text-muted)] text-sm">
              Click any anatomical marker or brain region on the 3D model (Cerebrum, Cerebellum, Brainstem, Meninges, Ventricles, Sellar, Pineal) to inspect all tumors originating in that zone.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <div className="mb-6 pb-4 border-b border-[var(--glass-border)] flex justify-between items-start">
              <div>
                <span className="text-[var(--cyan)] text-xs font-semibold uppercase tracking-wider mb-1 block">
                  Anatomical Origin Zone
                </span>
                <h2 className="text-3xl font-bold font-[var(--font-display)] capitalize">
                  {selectedRegion.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--cyan)]/15 text-[var(--cyan)] font-mono font-semibold">
                {matchingTumors.length} Tumor{matchingTumors.length !== 1 ? 's' : ''}
              </span>
            </div>

            <h3 className="font-semibold mb-4 text-[var(--text-primary)] text-sm uppercase tracking-wider text-muted">
              WHO CNS5 Tumors in this Zone
            </h3>

            {matchingTumors.length > 0 ? (
              <div className="space-y-3">
                {matchingTumors.map((tumor) => {
                  const meta = CATEGORY_META[tumor.category];
                  return (
                    <div 
                      key={tumor.id}
                      className="glass-card p-4 hover:bg-[var(--glass-bg)] transition-all group border border-[var(--glass-border)] hover:border-[var(--cyan)]/40 rounded-xl"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span 
                            className="text-[0.68rem] font-semibold uppercase tracking-wider font-mono block mb-1"
                            style={{ color: meta.accent }}
                          >
                            {meta.icon} {tumor.category}
                          </span>
                          <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--cyan)] transition-colors">
                            {tumor.name}
                          </h4>
                        </div>

                        <div className="flex gap-1 flex-shrink-0">
                          {tumor.gradeRange.map((g) => (
                            <span 
                              key={g} 
                              className="text-[0.68rem] font-bold font-mono px-1.5 py-0.5 rounded"
                              style={{ 
                                background: `${gradeColor(g)}20`, 
                                color: gradeColor(g),
                                border: `1px solid ${gradeColor(g)}40`
                              }}
                            >
                              G{g}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">
                        {tumor.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--glass-border)] text-[0.72rem] text-[var(--text-muted)]">
                        <span>Age: <strong className="text-[var(--text-primary)]">{tumor.ageGroup}</strong></span>
                        <Link 
                          href={`/classification?search=${encodeURIComponent(tumor.name)}`}
                          className="text-[var(--cyan)] font-semibold hover:underline flex items-center gap-1"
                        >
                          Explorer →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[var(--text-muted)] italic text-sm mb-6">
                No primary tumor classifications in the WHO CNS5 taxonomy are localized to this exact region.
              </p>
            )}

            {/* ── Live Evidence Overlay & Active Research Radar ── */}
            <div className="mt-8 space-y-6 pt-6 border-t border-[var(--glass-border)]">
              <EvidenceOverlay tumorType={selectedRegion ? `${selectedRegion.replace(/([A-Z])/g, ' $1').trim()} tumor` : null} />
              <ActiveResearchRadar tumorType={selectedRegion ? `${selectedRegion.replace(/([A-Z])/g, ' $1').trim()} tumor` : null} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
