'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  tumorClassification,
  ALL_CATEGORIES,
  CATEGORY_META,
} from '@/data/tumorClassification';
import { zoneToRegion } from '@/lib/zoneMapping';
import type { TumorCategoryName, TumorStatus, TumorEntry, BrainRegion, AnatomicalZone } from '@/types';
import { TumorSpectrumScale } from '@/components/ui/TumorSpectrumScale';
import { EvidenceOverlay } from '@/components/ui/EvidenceOverlay';
import { ActiveResearchRadar } from '@/components/ui/ActiveResearchRadar';

const BrainScene = dynamic(() => import('@/components/brain/BrainScene'), {
  ssr: false,
  loading: () => <div className="skeleton w-full h-[260px] rounded-2xl"></div>,
});

/* ─── Sort options ─── */
type SortKey = 'name' | 'grade-asc' | 'grade-desc' | 'category';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name',       label: 'Alphabetical' },
  { value: 'grade-asc',  label: 'Grade ↑ (low → high)' },
  { value: 'grade-desc', label: 'Grade ↓ (high → low)' },
  { value: 'category',   label: 'Category' },
];

const STATUS_OPTIONS: TumorStatus[] = ['Benign', 'Malignant', 'Variable'];
const GRADE_OPTIONS = [1, 2, 3, 4] as const;

/* ─── Grade badge styling ─── */
function gradeColor(g: number) {
  switch (g) {
    case 1: return 'var(--grade-1)';
    case 2: return 'var(--grade-2)';
    case 3: return 'var(--grade-3)';
    case 4: return 'var(--grade-4)';
    default: return 'var(--text-muted)';
  }
}

function statusStyle(s: TumorStatus) {
  switch (s) {
    case 'Benign':    return { bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)', color: '#34D399' };
    case 'Malignant': return { bg: 'rgba(239, 68, 68, 0.12)',  border: 'rgba(239, 68, 68, 0.3)',  color: '#EF4444' };
    case 'Variable':  return { bg: 'rgba(232, 163, 61, 0.12)', border: 'rgba(232, 163, 61, 0.3)', color: '#E8A33D' };
  }
}

/* ─── Sort comparators ─── */
function sortEntries(entries: TumorEntry[], key: SortKey): TumorEntry[] {
  const sorted = [...entries];
  switch (key) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'grade-asc':
      return sorted.sort((a, b) => Math.min(...a.gradeRange) - Math.min(...b.gradeRange));
    case 'grade-desc':
      return sorted.sort((a, b) => Math.max(...b.gradeRange) - Math.max(...a.gradeRange));
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
}

/* ─── FilterChip ─── */
function FilterChip({
  label,
  active,
  onClick,
  accent,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: string;
}) {
  const color = accent || 'var(--cyan)';
  return (
    <button
      onClick={onClick}
      className="filter-chip"
      style={{
        padding: '6px 14px',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        border: `1px solid ${active ? color : 'var(--glass-border)'}`,
        background: active ? `${color}18` : 'transparent',
        color: active ? color : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

/* ─── TumorCard ─── */
function TumorCard({
  tumor,
  isSelected,
  onSelect,
}: {
  tumor: TumorEntry;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const meta = CATEGORY_META[tumor.category];
  const ss = statusStyle(tumor.status);

  return (
    <div
      className="tumor-card"
      onClick={() => {
        onSelect();
        setIsExpanded(!isExpanded);
      }}
      style={{
        background: isSelected ? 'rgba(232, 163, 61, 0.08)' : 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: `1px solid ${isSelected ? 'var(--amber)' : 'var(--glass-border)'}`,
        borderRadius: '12px',
        padding: '20px 24px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isSelected ? '0 0 20px rgba(232, 163, 61, 0.2)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLDivElement).style.borderColor = meta.accent;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${meta.accent}20`;
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--glass-border)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.1rem' }}>{meta.icon}</span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: meta.accent,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tumor.category}
            </span>
          </div>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: isSelected ? 'var(--amber)' : 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {tumor.name}
          </h3>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
          {tumor.gradeRange.map((g) => (
            <span
              key={g}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                background: `${gradeColor(g)}18`,
                color: gradeColor(g),
                border: `1px solid ${gradeColor(g)}40`,
              }}
            >
              G{g}
            </span>
          ))}

          <span
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              background: ss.bg,
              color: ss.color,
              border: `1px solid ${ss.border}`,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {tumor.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          marginTop: '12px',
          fontSize: '0.88rem',
          lineHeight: 1.65,
          color: 'var(--text-muted)',
          marginBottom: 0,
          display: isExpanded ? 'block' : '-webkit-box',
          WebkitLineClamp: isExpanded ? undefined : 2,
          WebkitBoxOrient: 'vertical',
          overflow: isExpanded ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {tumor.description}
      </p>

      {/* Bottom Details */}
      <div
        style={{
          marginTop: '14px',
          paddingTop: '12px',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>📍</span>
          <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--cyan)' }}>
            {tumor.anatomicalOrigin}
          </span>
        </span>
        <span style={{ fontSize: '0.72rem', color: isSelected ? 'var(--amber)' : 'var(--text-muted)' }}>
          {isSelected ? '🎯 Highlighted on 3D Model' : 'Click to highlight 3D zone'}
        </span>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ClassificationExplorer() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<TumorCategoryName>>(new Set());
  const [selectedGrades, setSelectedGrades] = useState<Set<number>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<TumorStatus>>(new Set());
  const [selectedZone, setSelectedZone] = useState<AnatomicalZone | null>(null);
  const [selectedTumorId, setSelectedTumorId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('category');

  // Selected tumor object
  const selectedTumor = useMemo(
    () => tumorClassification.find((t) => t.id === selectedTumorId) || null,
    [selectedTumorId]
  );

  // Determine active 3D region based on selected tumor or selected zone filter
  const active3DRegion: BrainRegion | null = useMemo(() => {
    if (selectedTumor) {
      return zoneToRegion(selectedTumor.anatomicalOrigin);
    }
    if (selectedZone) {
      return zoneToRegion(selectedZone);
    }
    return null;
  }, [selectedTumor, selectedZone]);

  /* ── Toggle helpers ── */
  function toggleCategory(cat: TumorCategoryName) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }
  function toggleGrade(g: number) {
    setSelectedGrades((prev) => {
      const next = new Set(prev);
      next.has(g) ? next.delete(g) : next.add(g);
      return next;
    });
  }
  function toggleStatus(s: TumorStatus) {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }
  function clearAll() {
    setSelectedCategories(new Set());
    setSelectedGrades(new Set());
    setSelectedStatuses(new Set());
    setSelectedZone(null);
    setSelectedTumorId(null);
    setSearch('');
  }

  /* ── Handle 3D Region Click ── */
  function handleRegionSelect(region: string) {
    const reg = region as BrainRegion;
    // Map region back to anatomical zone
    const zoneMapReverse: Record<string, AnatomicalZone> = {
      frontal: 'cerebrum',
      parietal: 'cerebrum',
      temporal: 'cerebrum',
      occipital: 'cerebrum',
      cerebellum: 'cerebellum',
      brainstem: 'brainstem',
      meninges: 'meninges',
      ventricles: 'ventricles',
      sellar: 'sellar',
      pineal: 'pineal',
      cranialNerves: 'cranialNerves',
      spinalCord: 'spinalCord',
    };
    const zone = zoneMapReverse[reg] || 'cerebrum';
    setSelectedZone(selectedZone === zone ? null : zone);
    setSelectedTumorId(null);
  }

  /* ── Filter + Sort ── */
  const filtered = useMemo(() => {
    let results = tumorClassification;

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.size > 0) {
      results = results.filter((t) => selectedCategories.has(t.category));
    }

    if (selectedGrades.size > 0) {
      results = results.filter((t) => t.gradeRange.some((g) => selectedGrades.has(g)));
    }

    if (selectedStatuses.size > 0) {
      results = results.filter((t) => selectedStatuses.has(t.status));
    }

    if (selectedZone) {
      results = results.filter((t) => t.anatomicalOrigin === selectedZone || t.anatomicalOrigin === 'multiple');
    }

    return sortEntries(results, sortKey);
  }, [search, selectedCategories, selectedGrades, selectedStatuses, selectedZone, sortKey]);

  const hasActiveFilters =
    selectedCategories.size > 0 ||
    selectedGrades.size > 0 ||
    selectedStatuses.size > 0 ||
    selectedZone !== null ||
    search.length > 0;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 16px 64px' }}>
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          Classification Explorer & 3D Link
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Explore WHO CNS5 tumors bidirectionally. Click any tumor card to highlight its anatomical origin zone in 3D, or click a 3D region on the mini model to filter tumors.
        </p>
      </div>

      {/* ── Malignancy & Grade Visual Spectrum Scale Component ── */}
      <TumorSpectrumScale />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Mini 3D Brain Viewer & Selected Info Panel (Sticky Left) ── */}
        <div className="lg:col-span-4 space-y-4">
          <div
            className="sticky top-20"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '20px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  3D Anatomical Zone
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, textTransform: 'capitalize' }}>
                  {active3DRegion ? active3DRegion.replace(/([A-Z])/g, ' $1') : 'Interactive Brain'}
                </h3>
              </div>
              {active3DRegion && (
                <button
                  onClick={() => {
                    setSelectedTumorId(null);
                    setSelectedZone(null);
                  }}
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--amber)',
                    background: 'rgba(232, 163, 61, 0.1)',
                    border: '1px solid rgba(232, 163, 61, 0.3)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                  }}
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* 3D Canvas */}
            <div style={{ height: '280px', width: '100%', position: 'relative', borderRadius: '14px', overflow: 'hidden', background: 'radial-gradient(ellipse at center, var(--bg-panel-cool) 0%, var(--bg-base) 100%)' }}>
              <BrainScene
                interactive={true}
                selectedRegion={active3DRegion}
                onRegionSelect={handleRegionSelect}
              />
            </div>

            {/* Info feedback bar */}
            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              {selectedTumor ? (
                <div style={{ background: 'rgba(232, 163, 61, 0.12)', border: '1px solid rgba(232, 163, 61, 0.3)', borderRadius: '10px', padding: '10px' }}>
                  <span style={{ color: 'var(--amber)', fontWeight: 700, display: 'block' }}>
                    {selectedTumor.name}
                  </span>
                  <span style={{ fontSize: '0.75rem' }}>
                    Origin: <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{selectedTumor.anatomicalOrigin}</strong>
                  </span>
                </div>
              ) : selectedZone ? (
                <div style={{ background: 'rgba(90, 200, 250, 0.12)', border: '1px solid rgba(90, 200, 250, 0.3)', borderRadius: '10px', padding: '10px' }}>
                  <span style={{ color: 'var(--cyan)', fontWeight: 700, display: 'block', textTransform: 'capitalize' }}>
                    Filtered Zone: {selectedZone}
                  </span>
                  <span style={{ fontSize: '0.75rem' }}>Showing tumors originating in {selectedZone}</span>
                </div>
              ) : (
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.78rem' }}>
                  💡 Select a tumor card or click a 3D zone to trigger bidirectional highlighting.
                </p>
              )}
            </div>
          </div>

          {/* ── Live Evidence Overlay & Active Research Radar ── */}
          <div className="space-y-4 pt-2">
            <EvidenceOverlay tumorType={selectedTumor ? selectedTumor.name : selectedZone ? `${selectedZone} tumor` : null} />
            <ActiveResearchRadar tumorType={selectedTumor ? selectedTumor.name : selectedZone ? `${selectedZone} tumor` : null} />
          </div>
        </div>

        {/* ── Main Content Area: Search, Filters, and Cards ── */}
        <div className="lg:col-span-8">
          {/* Search Bar */}
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tumors by name, description, category..."
              style={{
                width: '100%',
                padding: '14px 48px 14px 20px',
                borderRadius: '999px',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.4,
                color: 'var(--text-muted)',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Filter Panel */}
          <div
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
            }}
          >
            {/* Categories */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Category Filter
                </span>
                {hasActiveFilters && (
                  <button onClick={clearAll} style={{ fontSize: '0.72rem', color: 'var(--cyan)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Clear all filters
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {ALL_CATEGORIES.map((cat) => (
                  <FilterChip
                    key={cat}
                    label={`${CATEGORY_META[cat].icon} ${cat}`}
                    active={selectedCategories.has(cat)}
                    onClick={() => toggleCategory(cat)}
                    accent={CATEGORY_META[cat].accent}
                  />
                ))}
              </div>
            </div>

            {/* Grade, Behavior & Sort */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* Grade */}
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                  WHO Grade
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {GRADE_OPTIONS.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleGrade(g)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        border: `1.5px solid ${selectedGrades.has(g) ? gradeColor(g) : 'var(--glass-border)'}`,
                        background: selectedGrades.has(g) ? `${gradeColor(g)}18` : 'transparent',
                        color: selectedGrades.has(g) ? gradeColor(g) : 'var(--text-muted)',
                      }}
                    >
                      G{g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                  Behavior
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {STATUS_OPTIONS.map((s) => {
                    const ss = statusStyle(s);
                    return (
                      <FilterChip
                        key={s}
                        label={s}
                        active={selectedStatuses.has(s)}
                        onClick={() => toggleStatus(s)}
                        accent={ss.color}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div style={{ marginLeft: 'auto' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                  Sort by
                </span>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--bg-panel)',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Showing {filtered.length} of {tumorClassification.length} tumors
            </span>
          </div>

          {/* Tumor Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filtered.map((tumor) => (
              <TumorCard
                key={tumor.id}
                tumor={tumor}
                isSelected={selectedTumorId === tumor.id}
                onSelect={() => {
                  if (selectedTumorId === tumor.id) {
                    setSelectedTumorId(null);
                  } else {
                    setSelectedTumorId(tumor.id);
                  }
                }}
              />
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔬</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
                No tumors match your selected filters.
              </p>
              <button onClick={clearAll} style={{ padding: '10px 24px', borderRadius: '999px', border: '1px solid var(--cyan)', background: 'rgba(90, 200, 250, 0.1)', color: 'var(--cyan)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
