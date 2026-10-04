import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{
        background: 'var(--bg-panel)',
        borderColor: 'var(--glass-border)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--blue), var(--cyan))' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                NeuroScope
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              Interactive 3D Anatomical Atlas of WHO CNS5 Brain Tumor Classification. 
              Built by <strong style={{ color: 'var(--text-primary)' }}>Ppragya &amp; Vilsee</strong>.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/atlas', label: 'Atlas Explorer' },
                { href: '/classification', label: 'Classification' },
                { href: '/research', label: 'Research Hub' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Data Sources
            </h4>
            <div className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>WHO CNS5 Classification (2021)</span>
              <span>PubMed / NCBI E-utilities</span>
              <span>Europe PMC</span>
              <span>ClinicalTrials.gov</span>
              <span>NIH RePORTER</span>
              <span>WHO Global Health Observatory</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            Educational Anatomical Atlas — Not a Diagnostic Tool. Does not analyze medical images.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} NeuroScope
          </p>
        </div>
      </div>
    </footer>
  );
}
