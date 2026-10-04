'use client';

import React, { useState, useMemo } from 'react';
import { tumorClassification, ALL_CATEGORIES, CATEGORY_META } from '@/data/tumorClassification';
import type { TumorEntry, TumorCategoryName, TumorStatus } from '@/types';

function gradeBadgeStyle(grade: number) {
  switch (grade) {
    case 1:
      return { bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.4)', text: '#34D399', label: 'Grade 1 — Low Grade / Benign' };
    case 2:
      return { bg: 'rgba(250, 204, 21, 0.15)', border: 'rgba(250, 204, 21, 0.4)', text: '#FACC15', label: 'Grade 2 — Intermediate / Atypical' };
    case 3:
      return { bg: 'rgba(251, 146, 60, 0.15)', border: 'rgba(251, 146, 60, 0.4)', text: '#FB923C', label: 'Grade 3 — High Grade / Anaplastic' };
    case 4:
      return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#EF4444', label: 'Grade 4 — Highly Malignant' };
    default:
      return { bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.4)', text: '#94A3B8', label: 'Unclassified' };
  }
}

export function TumorSpectrumScale() {
  const [selectedCategory, setSelectedCategory] = useState<TumorCategoryName | 'ALL'>('ALL');
  const [hoveredTumor, setHoveredTumor] = useState<TumorEntry | null>(null);
  const [activeGradeFilter, setActiveGradeFilter] = useState<number | null>(null);

  // Group tumors by grade (tumors with grade range appear in each grade they encompass)
  const tumorsByGrade = useMemo(() => {
    const map: Record<number, TumorEntry[]> = { 1: [], 2: [], 3: [], 4: [] };

    tumorClassification.forEach((tumor) => {
      if (selectedCategory !== 'ALL' && tumor.category !== selectedCategory) {
        return;
      }
      tumor.gradeRange.forEach((grade) => {
        if (map[grade] && !map[grade].some((t) => t.id === tumor.id)) {
          map[grade].push(tumor);
        }
      });
    });

    return map;
  }, [selectedCategory]);

  return (
    <div className="w-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
      {/* ── Educational Framing Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--glass-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--cyan)] bg-[var(--cyan)]/10 px-2.5 py-0.5 rounded-full border border-[var(--cyan)]/30">
              WHO CNS5 Taxonomy Scale
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">35 Tumor Types Mapped</span>
          </div>
          <h2 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
            Biological Malignancy & WHO Grade Spectrum
          </h2>
        </div>

        {/* Category Selector Dropdown / Pills */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono font-semibold text-[var(--text-muted)] uppercase">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TumorCategoryName | 'ALL')}
            className="bg-[var(--bg-panel)] border border-[var(--glass-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--cyan)] cursor-pointer"
          >
            <option value="ALL">All 10 WHO Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_META[cat].icon} {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Visual Continuous Gradient Axis Bar ── */}
      <div className="relative pt-2 pb-4">
        <div className="flex justify-between text-xs font-mono font-semibold mb-2 text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5 text-[#34D399]">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
            BENIGN / LOW GRADE (G1)
          </span>
          <span className="text-[#FACC15]">INTERMEDIATE (G2)</span>
          <span className="text-[#FB923C]">ANAPLASTIC (G3)</span>
          <span className="flex items-center gap-1.5 text-[#EF4444]">
            HIGHLY MALIGNANT (G4)
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
          </span>
        </div>

        {/* Gradient bar background */}
        <div className="h-3 w-full rounded-full bg-gradient-to-r from-[#34D399] via-[#FACC15] via-[#FB923C] to-[#EF4444] shadow-inner opacity-90 relative">
          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between px-[12.5%] pointer-events-none">
            <div className="w-0.5 h-full bg-black/40"></div>
            <div className="w-0.5 h-full bg-black/40"></div>
            <div className="w-0.5 h-full bg-black/40"></div>
          </div>
        </div>
      </div>

      {/* ── 4-Column Grade Columns Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((grade) => {
          const style = gradeBadgeStyle(grade);
          const tumors = tumorsByGrade[grade];
          const isGradeFiltered = activeGradeFilter === grade;

          return (
            <div
              key={grade}
              onClick={() => setActiveGradeFilter(isGradeFiltered ? null : grade)}
              className={`rounded-xl border transition-all p-4 flex flex-col justify-between cursor-pointer ${
                isGradeFiltered ? 'ring-2 ring-[var(--cyan)] scale-[1.01]' : ''
              }`}
              style={{
                background: style.bg,
                borderColor: style.border,
              }}
            >
              <div>
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider block"
                      style={{ color: style.text }}
                    >
                      WHO Grade {grade}
                    </span>
                    <span className="text-[0.7rem] text-[var(--text-muted)] font-mono">
                      {grade === 1 && 'Slow growing, circumscribed'}
                      {grade === 2 && 'Locally invasive, recurrence risk'}
                      {grade === 3 && 'Anaplastic features, invasive'}
                      {grade === 4 && 'Rapid growth, necrosis, lethal'}
                    </span>
                  </div>
                  <span
                    className="text-xs font-mono font-bold px-2 py-1 rounded-md"
                    style={{ background: style.border, color: style.text }}
                  >
                    {tumors.length}
                  </span>
                </div>

                {/* Tumor Badges List */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {tumors.map((t) => {
                    const catMeta = CATEGORY_META[t.category];
                    const isHovered = hoveredTumor?.id === t.id;

                    return (
                      <div
                        key={`${grade}-${t.id}`}
                        onMouseEnter={() => setHoveredTumor(t)}
                        onMouseLeave={() => setHoveredTumor(null)}
                        className={`p-2.5 rounded-lg border text-xs transition-all ${
                          isHovered
                            ? 'bg-white/15 border-white/40 shadow-lg scale-[1.02]'
                            : 'bg-black/20 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-semibold text-[var(--text-primary)] truncate max-w-[170px]">
                            {t.name}
                          </span>
                          <span className="text-[0.65rem]" title={t.category}>
                            {catMeta.icon}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[0.65rem] text-[var(--text-muted)]">
                          <span className="capitalize font-mono">{t.anatomicalOrigin}</span>
                          <span
                            className="font-mono font-bold px-1.5 py-0.2 rounded"
                            style={{
                              color:
                                t.status === 'Benign'
                                  ? '#34D399'
                                  : t.status === 'Malignant'
                                  ? '#EF4444'
                                  : '#E8A33D',
                              background: 'rgba(0,0,0,0.3)',
                            }}
                          >
                            {t.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {tumors.length === 0 && (
                    <div className="text-center py-6 text-xs text-[var(--text-muted)] italic">
                      No tumors match selected category in Grade {grade}.
                    </div>
                  )}
                </div>
              </div>

              {/* Column Footer */}
              <div className="mt-3 pt-2 border-t border-white/5 text-[0.68rem] text-[var(--text-muted)] font-mono text-center">
                Click column to filter view
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Detail Hover Popover / Card Preview ── */}
      {hoveredTumor && (
        <div className="p-4 rounded-xl bg-black/80 border border-[var(--cyan)]/40 backdrop-blur-xl animate-fade-in flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base">{CATEGORY_META[hoveredTumor.category].icon}</span>
              <span className="text-xs font-mono font-bold uppercase text-[var(--cyan)]">
                {hoveredTumor.category}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                WHO Grade(s): {hoveredTumor.gradeRange.map((g) => `G${g}`).join(', ')}
              </span>
            </div>
            <h4 className="text-base font-bold text-white font-[var(--font-display)]">
              {hoveredTumor.name}
            </h4>
            <p className="text-xs text-[var(--text-muted)] max-w-2xl leading-relaxed">
              {hoveredTumor.description}
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0 text-right text-xs font-mono">
            <div>
              <span className="text-[var(--text-muted)] block text-[0.65rem]">ANATOMICAL ORIGIN</span>
              <span className="text-[var(--cyan)] capitalize font-bold">{hoveredTumor.anatomicalOrigin}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block text-[0.65rem]">AGE GROUP</span>
              <span className="text-white">{hoveredTumor.ageGroup}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Strict Educational / Non-Diagnostic Explicit Framing Notice ── */}
      <div className="p-4 rounded-xl bg-[var(--bg-panel)]/80 border border-[var(--glass-border)] text-xs text-[var(--text-muted)] leading-relaxed space-y-1">
        <p className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
          <span className="text-[var(--cyan)]">ℹ️</span> Purely Educational Taxonomy Spectrum Reference
        </p>
        <p>
          This visual spectrum component represents published WHO CNS5 (2021) general classification ranges from Grade 1 (low biological aggressiveness) to Grade 4 (high biological aggressiveness). 
          <strong> It is strictly classificatory and educational. It never accepts, requests, or processes inputs representing an individual clinical case, patient imaging, or diagnostic scores.</strong>
        </p>
      </div>
    </div>
  );
}
