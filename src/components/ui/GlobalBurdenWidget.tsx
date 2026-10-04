'use client';

import React, { useState, useEffect } from 'react';

interface RegionBurden {
  code: string;
  name: string;
  incidenceRatePer100k: number;
  mortalityRatePer100k: number;
  estimatedAnnualCases: number;
}

interface GHOResponse {
  success?: boolean;
  indicator?: string;
  source?: string;
  fetchedAt?: string;
  globalSummary?: {
    totalGlobalAnnualCases: number;
    globalAgeStandardizedRatePer100k: number;
    maleToFemaleRatio: number;
    primaryDistribution: string;
  };
  regions?: RegionBurden[];
}

export function GlobalBurdenWidget() {
  const [data, setData] = useState<GHOResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/who-gho')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching WHO GHO data:', err))
      .finally(() => setLoading(false));
  }, []);

  const maxRate = data?.regions ? Math.max(...data.regions.map((r) => r.incidenceRatePer100k)) : 6;

  return (
    <div className="w-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-10">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--glass-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--cyan)] bg-[var(--cyan)]/10 px-2.5 py-0.5 rounded-full border border-[var(--cyan)]/30">
              WHO GHO Epidemiological Context
            </span>
            {data?.fetchedAt && (
              <span className="text-[0.7rem] font-mono text-[var(--text-muted)]">
                Live GHO • {new Date(data.fetchedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
            Global Brain & CNS Tumor Burden Context
          </h3>
        </div>

        <div className="text-right text-xs font-mono text-[var(--text-muted)]">
          <span className="block font-semibold text-[var(--cyan)]">Source: WHO GHO OData</span>
          <span>Indicator: NCDMORT3070</span>
        </div>
      </div>

      {loading ? (
        <div className="h-36 bg-white/5 rounded-xl animate-pulse"></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Key Stats */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1">
              <span className="text-[0.68rem] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Estimated Global Annual Cases
              </span>
              <div className="text-3xl font-extrabold text-[var(--cyan)] font-[var(--font-display)]">
                {data?.globalSummary?.totalGlobalAnnualCases ? data.globalSummary.totalGlobalAnnualCases.toLocaleString() : '308,200'}
              </div>
              <span className="text-[0.72rem] text-[var(--text-muted)]">New primary CNS tumors per year worldwide</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1">
              <span className="text-[0.68rem] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Age-Standardized Rate (ASIR)
              </span>
              <div className="text-2xl font-bold text-white font-[var(--font-display)]">
                {data?.globalSummary?.globalAgeStandardizedRatePer100k || 3.5} <span className="text-sm font-normal text-[var(--text-muted)]">per 100,000</span>
              </div>
              <span className="text-[0.72rem] text-[var(--text-muted)]">Global incidence baseline benchmark</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 text-xs text-[var(--text-muted)] space-y-1">
              <span className="font-semibold text-[var(--text-primary)] block">Demographic Ratio:</span>
              <p className="text-[0.72rem] leading-relaxed">
                {data?.globalSummary?.primaryDistribution || '55.6% Male, 44.4% Female (Male-to-female ratio 1.25)'}
              </p>
            </div>
          </div>

          {/* Right Column: Regional Comparison Bars */}
          <div className="lg:col-span-8 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Regional Age-Standardized Incidence Rates (per 100,000 population)
            </h4>

            {data?.regions?.map((reg) => {
              const widthPct = Math.min(100, (reg.incidenceRatePer100k / maxRate) * 100);

              return (
                <div key={reg.code} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[var(--text-primary)]">{reg.name}</span>
                    <span className="text-[var(--cyan)] font-bold">
                      {reg.incidenceRatePer100k} / 100k
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--cyan)] to-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}

            <div className="pt-2 text-[0.7rem] text-[var(--text-muted)] font-mono text-right opacity-80">
              * Rates standardized to the WHO World Standard Population.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
