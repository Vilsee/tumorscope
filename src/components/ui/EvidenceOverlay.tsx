'use client';

import React, { useState, useEffect } from 'react';

interface EvidenceItem {
  pmid: string;
  title: string;
  abstract: string;
  journal: string;
  year: number;
  doi?: string | null;
  fullTextUrl?: string;
}

interface EvidenceSourceResult {
  success?: boolean;
  error?: string;
  tumor?: string;
  fetchedAt?: string;
  items?: EvidenceItem[];
  source?: string;
  message?: string;
}

export function EvidenceOverlay({ tumorType }: { tumorType: string | null }) {
  const [pubMedData, setPubMedData] = useState<EvidenceSourceResult | null>(null);
  const [europePmcData, setEuropePmcData] = useState<EvidenceSourceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSource, setActiveSource] = useState<'pubmed' | 'europepmc'>('pubmed');

  useEffect(() => {
    if (!tumorType) {
      setPubMedData(null);
      setEuropePmcData(null);
      return;
    }

    setLoading(true);
    const query = tumorType.split(',')[0].trim(); // Clean name for search

    Promise.allSettled([
      fetch(`/api/evidence?tumor=${encodeURIComponent(query)}`).then((r) => r.json()),
      fetch(`/api/evidence-eu?tumor=${encodeURIComponent(query)}`).then((r) => r.json()),
    ])
      .then(([pubmedRes, europeRes]) => {
        if (pubmedRes.status === 'fulfilled') {
          setPubMedData(pubmedRes.value);
        } else {
          setPubMedData({
            error: 'source unavailable',
            source: 'PubMed (NCBI E-utilities)',
            fetchedAt: new Date().toISOString(),
          });
        }

        if (europeRes.status === 'fulfilled') {
          setEuropePmcData(europeRes.value);
        } else {
          setEuropePmcData({
            error: 'source unavailable',
            source: 'Europe PMC',
            fetchedAt: new Date().toISOString(),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [tumorType]);

  if (!tumorType) {
    return (
      <div className="p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-center text-xs text-[var(--text-muted)] italic">
        💡 Select a tumor card in the explorer or an anatomical region on the 3D model to trigger the live Evidence Overlay.
      </div>
    );
  }

  const currentData = activeSource === 'pubmed' ? pubMedData : europePmcData;

  return (
    <div className="rounded-2xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] p-6 space-y-4 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--glass-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--cyan)] bg-[var(--cyan)]/10 px-2 py-0.5 rounded border border-[var(--cyan)]/30">
              Live Evidence Overlay
            </span>
            <span className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[200px]">
              {tumorType}
            </span>
          </div>
          <p className="text-[0.72rem] text-[var(--text-muted)] mt-1">
            Real-time peer-reviewed biomedical literature queried via NCBI E-utilities & Europe PMC APIs
          </p>
        </div>

        {/* Source Toggle */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 shrink-0">
          <button
            onClick={() => setActiveSource('pubmed')}
            className={`px-2.5 py-1 rounded text-[0.72rem] font-mono font-semibold transition-colors ${
              activeSource === 'pubmed'
                ? 'bg-[var(--cyan)] text-black font-bold shadow'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            PubMed
          </button>
          <button
            onClick={() => setActiveSource('europepmc')}
            className={`px-2.5 py-1 rounded text-[0.72rem] font-mono font-semibold transition-colors ${
              activeSource === 'europepmc'
                ? 'bg-[var(--cyan)] text-black font-bold shadow'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            Europe PMC
          </button>
        </div>
      </div>

      {/* Timestamp & Source Status Bar */}
      <div className="flex items-center justify-between text-[0.7rem] font-mono text-[var(--text-muted)] bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-ping"></span>
          Source: <strong>{activeSource === 'pubmed' ? 'NCBI PubMed E-utilities' : 'Europe PMC REST API'}</strong>
        </span>
        {currentData?.fetchedAt && (
          <span>
            Fetched at: <strong className="text-[var(--text-primary)]">{new Date(currentData.fetchedAt).toLocaleTimeString()}</strong>
          </span>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-3 py-4">
          <div className="h-16 bg-white/5 rounded-xl animate-pulse"></div>
          <div className="h-16 bg-white/5 rounded-xl animate-pulse"></div>
        </div>
      )}

      {/* Per-source Error Handling: "Source Unavailable" */}
      {!loading && currentData?.error && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold font-mono">
            <span>⚠️</span> SOURCE UNAVAILABLE: {currentData.source || activeSource.toUpperCase()}
          </div>
          <p className="text-[0.72rem] opacity-90">
            {currentData.message || 'The upstream repository endpoint is temporarily un-reachable or rate-limited. Switch sources or try again in a few seconds.'}
          </p>
        </div>
      )}

      {/* Data Items */}
      {!loading && !currentData?.error && currentData?.items && currentData.items.length > 0 && (
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
          {currentData.items.map((item, idx) => (
            <div
              key={item.pmid || idx}
              className="p-3.5 rounded-xl bg-black/30 border border-white/10 hover:border-[var(--cyan)]/40 transition-all space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h5 className="font-bold text-xs text-[var(--text-primary)] leading-snug">
                  {item.title}
                </h5>
                <span className="text-[0.65rem] font-mono font-bold px-2 py-0.5 rounded bg-[var(--cyan)]/15 text-[var(--cyan)] shrink-0 border border-[var(--cyan)]/30">
                  PMID {item.pmid}
                </span>
              </div>

              <p className="text-[0.72rem] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                {item.abstract}
              </p>

              <div className="flex items-center justify-between text-[0.68rem] font-mono text-[var(--text-muted)] pt-1 border-t border-white/5">
                <span className="truncate max-w-[240px]">{item.journal} ({item.year})</span>
                {item.fullTextUrl && (
                  <a
                    href={item.fullTextUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--cyan)] hover:underline font-semibold"
                  >
                    View Paper ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !currentData?.error && currentData?.items?.length === 0 && (
        <div className="text-center py-6 text-xs text-[var(--text-muted)] italic">
          No literature indexed for &ldquo;{tumorType}&rdquo; in this repository.
        </div>
      )}
    </div>
  );
}
