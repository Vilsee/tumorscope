import { whoCns5Taxonomy } from '@/data/whoCns5';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return whoCns5Taxonomy.map((cat) => ({
    categoryId: cat.id,
  }));
}

export default async function CategoryDetail({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  const category = whoCns5Taxonomy.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  // Pre-calculate grade distribution
  const allGrades = category.subtypes.flatMap(s => s.grades);
  const uniqueGrades = Array.from(new Set(allGrades)).sort((a, b) => a - b);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/classification" className="hover:text-cyan-400 transition-colors">Taxonomy</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>{category.name}</span>
      </div>

      {/* Hero */}
      <div className="glass-card p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {category.name}
            </h1>
          </div>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {category.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="flex flex-col">
              <span style={{ color: 'var(--text-muted)' }}>Subtypes</span>
              <span className="text-xl font-bold text-white">{category.subtypes.length}</span>
            </div>
            <div className="flex flex-col">
              <span style={{ color: 'var(--text-muted)' }}>Grade Range</span>
              <div className="flex gap-1 mt-1">
                {uniqueGrades.length > 0 ? (
                  uniqueGrades.map(g => (
                    <span key={g} className={`grade-badge grade-${g} text-[10px] px-1.5 py-0.5`}>
                      G{g}
                    </span>
                  ))
                ) : (
                  <span className="text-white">Unassigned / Variable</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Link to Research */}
        <div className="w-full md:w-auto">
          <Link
            href={`/research?q=${encodeURIComponent(category.name)}`}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all w-full"
            style={{ background: 'rgba(90, 200, 250, 0.1)', color: 'var(--cyan)', border: '1px solid rgba(90, 200, 250, 0.3)' }}
          >
            <span>Search Literature & Trials</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Subtypes */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>Subtypes</h2>
          
          {category.subtypes.map((sub, idx) => (
            <div key={idx} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold">{sub.name}</h3>
                <div className="flex gap-2">
                  {sub.grades.map(g => (
                    <span key={g} className={`grade-badge grade-${g}`}>
                      WHO Grade {g}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {sub.description}
              </p>

              {sub.molecularMarkers && sub.molecularMarkers.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Diagnostic Molecular Markers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sub.molecularMarkers.map((marker, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-3 py-1.5 text-sm rounded-md border"
                        style={{
                          background: 'rgba(232, 163, 61, 0.1)',
                          borderColor: 'rgba(232, 163, 61, 0.2)',
                          color: 'var(--amber)'
                        }}
                      >
                        {marker}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Locations:
                </span>
                <div className="flex flex-wrap gap-3">
                  {sub.locations.map((loc, lIdx) => (
                    <Link
                      key={lIdx}
                      href={`/atlas?region=${loc}`}
                      className="text-sm capitalize hover:text-cyan-400 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      📍 {loc.replace(/([A-Z])/g, ' $1').trim()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Primary Locations</h3>
            <ul className="space-y-3">
              {category.primaryLocations.map((loc, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--blue)' }}></span>
                  <Link href={`/atlas?region=${loc}`} className="capitalize hover:text-cyan-400 transition-colors">
                    {loc.replace(/([A-Z])/g, ' $1').trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6" style={{ background: 'rgba(90, 200, 250, 0.05)' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--cyan)' }}>
              Clinical Note
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Grading and diagnostic criteria listed here are based strictly on the 2021 WHO Classification of Tumours of the Central Nervous System (5th Edition). Many entities now require integrated phenotypic and genotypic characterization for a final diagnosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
