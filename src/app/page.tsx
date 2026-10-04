'use client';

import Link from 'next/link';
import { whoCns5Taxonomy } from '@/data/whoCns5';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { GlobalBurdenWidget } from '@/components/ui/GlobalBurdenWidget';

// Dynamically import the BrainScene to avoid SSR hydration issues
const BrainScene = dynamic(() => import('@/components/brain/BrainScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[500px]">
      <div className="skeleton w-64 h-64 rounded-full opacity-50"></div>
      <p className="mt-8 text-sm text-muted-foreground animate-pulse" style={{ color: 'var(--text-muted)' }}>
        Loading procedural brain model...
      </p>
    </div>
  ),
});

export default function Home() {
  const totalSubtypes = whoCns5Taxonomy.reduce((acc, cat) => acc + cat.subtypes.length, 0);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* 3D Hero Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--bg-panel-cool)_0%,_var(--bg-base)_100%)]">
        <Suspense fallback={null}>
          <BrainScene interactive={false} autoRotate />
        </Suspense>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-4xl w-full mx-auto text-center pointer-events-auto">
          <div className="animate-fade-in-up">
            <span
              className="inline-block py-1 px-3 rounded-full text-xs font-semibold mb-6 border glass"
              style={{
                color: 'var(--cyan)',
                borderColor: 'var(--glass-border)',
                letterSpacing: '0.05em'
              }}
            >
              WHO CNS5 CLASSIFICATION (2021)
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Explore the <span style={{ color: 'var(--cyan)' }}>Neuroaxis.</span>
            </h1>
            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              An interactive 3D anatomical atlas and comprehensive taxonomy of central nervous system tumors. Built for education.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/atlas"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
                style={{
                  background: 'var(--blue)',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(45, 125, 210, 0.4)'
                }}
              >
                Explore 3D Atlas
              </Link>
              <Link
                href="/classification"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold glass hover:bg-white/5 transition-all"
                style={{ color: 'var(--text-primary)' }}
              >
                View Taxonomy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 border-y py-6 glass mt-auto" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-12 gap-y-4">
          <div className="flex items-center gap-3 delay-100 animate-fade-in">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{whoCns5Taxonomy.length}</span>
            <span className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Categories</span>
          </div>
          <div className="flex items-center gap-3 delay-200 animate-fade-in">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)' }}>{totalSubtypes}+</span>
            <span className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Subtypes</span>
          </div>
          <div className="flex items-center gap-3 delay-300 animate-fade-in">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--grade-4)' }}>4</span>
            <span className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Grade Levels</span>
          </div>
        </div>
      </div>

      {/* Content Section below fold */}
      <div className="relative z-10 py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Global Brain Tumor Burden Context Widget */}
          <GlobalBurdenWidget />

          <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Major Tumor Families</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              The 2021 WHO Classification restructured CNS tumors into 12 major categories, integrating histopathology with molecular diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {whoCns5Taxonomy.map((cat, i) => (
              <Link key={cat.id} href={`/classification/${cat.id}`}>
                <div
                  className="glass-card p-5 h-full flex flex-col group cursor-pointer"
                  style={{ animationDelay: `${(i % 4) * 100}ms` }}
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {cat.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>{cat.subtypes.length} subtypes</span>
                    <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
