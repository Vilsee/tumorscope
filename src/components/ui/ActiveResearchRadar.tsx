'use client';

import React, { useState, useEffect } from 'react';

interface ClinicalTrialItem {
  nctId: string;
  title: string;
  status: string;
  phase: string;
  conditions: string[];
  interventions: string[];
  summary: string;
}

interface GrantItem {
  projectNum: string;
  title: string;
  piName: string;
  organization: string;
  fiscalYear: number;
  awardAmount: number;
  abstract: string;
}

interface TrialsResult {
  success?: boolean;
  error?: string;
  tumor?: string;
  fetchedAt?: string;
  trials?: ClinicalTrialItem[];
  totalCount?: number;
  source?: string;
  message?: string;
}

interface GrantsResult {
  success?: boolean;
  error?: string;
  tumor?: string;
  fetchedAt?: string;
  grants?: GrantItem[];
  count?: number;
  source?: string;
  message?: string;
}

export function ActiveResearchRadar({ tumorType }: { tumorType: string | null }) {
  const [trialsData, setTrialsData] = useState<TrialsResult | null>(null);
  const [grantsData, setGrantsData] = useState<GrantsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'trials' | 'grants'>('trials');

  useEffect(() => {
    if (!tumorType) {
      setTrialsData(null);
      setGrantsData(null);
      return;
    }

    setLoading(true);
    const query = tumorType.split(',')[0].trim();

    Promise.allSettled([
      fetch(`/api/trials?tumor=${encodeURIComponent(query)}`).then((r) => r.json()),
      fetch(`/api/grants?tumor=${encodeURIComponent(query)}`).then((r) => r.json()),
    ])
      .then(([trialsRes, grantsRes]) => {
        if (trialsRes.status === 'fulfilled') {
          setTrialsData(trialsRes.value);
        } else {
          setTrialsData({
            error: 'source unavailable',
            source: 'ClinicalTrials.gov v2',
            fetchedAt: new Date().toISOString(),
          });
        }

        if (grantsRes.status === 'fulfilled') {
          setGrantsData(grantsRes.value);
        } else {
          setGrantsData({
            error: 'source unavailable',
            source: 'NIH RePORTER',
            fetchedAt: new Date().toISOString(),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [tumorType]);

  if (!tumorType) {
    return (
      <div className="p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-center text-xs text-[var(--text-muted)] italic">
        📡 Active Research Radar ready — select any tumor to load live recruiting trials and NIH grants.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] p-6 space-y-4 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--glass-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--amber)] bg-[var(--amber)]/10 px-2 py-0.5 rounded border border-[var(--amber)]/30">
              Active Research Radar
            </span>
            <span className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[200px]">
              {tumorType}
            </span>
          </div>
          <p className="text-[0.72rem] text-[var(--text-muted)] mt-1">
            Real-time active clinical trials & NIH funded research grants
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('trials')}
            className={`px-2.5 py-1 rounded text-[0.72rem] font-mono font-semibold transition-colors ${
              activeTab === 'trials'
                ? 'bg-[var(--amber)] text-black font-bold shadow'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            Trials ({trialsData?.trials?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('grants')}
            className={`px-2.5 py-1 rounded text-[0.72rem] font-mono font-semibold transition-colors ${
              activeTab === 'grants'
                ? 'bg-[var(--amber)] text-black font-bold shadow'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            Grants ({grantsData?.grants?.length || 0})
          </button>
        </div>
      </div>

      {/* Timestamp & Source Bar */}
      <div className="flex items-center justify-between text-[0.7rem] font-mono text-[var(--text-muted)] bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--amber)] animate-pulse"></span>
          Source: <strong>{activeTab === 'trials' ? 'ClinicalTrials.gov v2' : 'NIH RePORTER API'}</strong>
        </span>
        {activeTab === 'trials' && trialsData?.fetchedAt && (
          <span>
            Fetched at: <strong className="text-[var(--text-primary)]">{new Date(trialsData.fetchedAt).toLocaleTimeString()}</strong>
          </span>
        )}
        {activeTab === 'grants' && grantsData?.fetchedAt && (
          <span>
            Fetched at: <strong className="text-[var(--text-primary)]">{new Date(grantsData.fetchedAt).toLocaleTimeString()}</strong>
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3 py-4">
          <div className="h-16 bg-white/5 rounded-xl animate-pulse"></div>
          <div className="h-16 bg-white/5 rounded-xl animate-pulse"></div>
        </div>
      )}

      {/* Trials View */}
      {!loading && activeTab === 'trials' && (
        <>
          {trialsData?.error ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold font-mono">
                <span>⚠️</span> SOURCE UNAVAILABLE: ClinicalTrials.gov v2
              </div>
              <p className="text-[0.72rem] opacity-90">
                {trialsData.message || 'ClinicalTrials.gov API endpoint is currently unreachable or rate-limited.'}
              </p>
            </div>
          ) : trialsData?.trials && trialsData.trials.length > 0 ? (
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
              {trialsData.trials.map((trial) => (
                <div
                  key={trial.nctId}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/10 hover:border-[var(--amber)]/40 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-xs text-[var(--text-primary)] leading-snug">
                      {trial.title}
                    </h5>
                    <span className="text-[0.65rem] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0 border border-emerald-500/40 uppercase">
                      {trial.status}
                    </span>
                  </div>

                  <p className="text-[0.72rem] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {trial.summary}
                  </p>

                  <div className="flex items-center justify-between text-[0.68rem] font-mono text-[var(--text-muted)] pt-1 border-t border-white/5">
                    <span className="text-[var(--amber)] font-semibold">{trial.nctId} • {trial.phase}</span>
                    <a
                      href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--cyan)] hover:underline font-semibold"
                    >
                      Study Record ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[var(--text-muted)] italic">
              No active recruiting clinical trials registered for &ldquo;{tumorType}&rdquo;.
            </div>
          )}
        </>
      )}

      {/* Grants View */}
      {!loading && activeTab === 'grants' && (
        <>
          {grantsData?.error ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold font-mono">
                <span>⚠️</span> SOURCE UNAVAILABLE: NIH RePORTER
              </div>
              <p className="text-[0.72rem] opacity-90">
                {grantsData.message || 'NIH RePORTER API endpoint is currently unreachable or rate-limited.'}
              </p>
            </div>
          ) : grantsData?.grants && grantsData.grants.length > 0 ? (
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
              {grantsData.grants.map((grant, idx) => (
                <div
                  key={grant.projectNum || idx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/10 hover:border-[var(--amber)]/40 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-xs text-[var(--text-primary)] leading-snug">
                      {grant.title}
                    </h5>
                    {grant.awardAmount > 0 && (
                      <span className="text-[0.65rem] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0 border border-emerald-500/40">
                        ${(grant.awardAmount / 1000).toFixed(0)}k
                      </span>
                    )}
                  </div>

                  <p className="text-[0.72rem] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {grant.abstract}
                  </p>

                  <div className="flex items-center justify-between text-[0.68rem] font-mono text-[var(--text-muted)] pt-1 border-t border-white/5">
                    <span>PI: <strong className="text-[var(--text-primary)]">{grant.piName}</strong></span>
                    <span className="text-[var(--amber)] font-semibold">{grant.projectNum} ({grant.fiscalYear})</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[var(--text-muted)] italic">
              No NIH funded research grants indexed for &ldquo;{tumorType}&rdquo;.
            </div>
          )}
        </>
      )}
    </div>
  );
}
