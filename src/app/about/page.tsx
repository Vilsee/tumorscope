import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
          About <span style={{ color: 'var(--cyan)' }}>NeuroScope</span>
        </h1>

        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Project Mission</h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            NeuroScope is an interactive 3D anatomical atlas designed to educate students, researchers, and medical professionals about the 2021 WHO Classification of Tumours of the Central Nervous System (WHO CNS5).
          </p>
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            By integrating a procedural 3D brain model with live biomedical data (PubMed, ClinicalTrials.gov) and AI-powered summarization, NeuroScope aims to make complex neuro-oncology taxonomy accessible and exploratory.
          </p>
          
          <div className="p-4 rounded-xl mt-8 flex gap-4 items-start" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-400 mb-1">Strictly Educational Use</h3>
              <p className="text-sm text-red-200/80 leading-relaxed">
                NeuroScope is <strong>not a diagnostic tool</strong>. It does not accept image uploads, does not analyze MRI or CT scans, and cannot classify or diagnose any individual's medical condition. It is purely a reference atlas for published public data.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Data Sources</h2>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li>
                <strong className="text-white block mb-1">Taxonomy:</strong>
                <a href="https://doi.org/10.1093/neuonc/noab106" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline decoration-cyan-400/30">
                  Louis DN, et al. "The 2021 WHO Classification of Tumors of the Central Nervous System: a summary."
                </a>
              </li>
              <li><strong className="text-white">Literature:</strong> NCBI E-utilities (PubMed) & Europe PMC REST API</li>
              <li><strong className="text-white">Trials:</strong> ClinicalTrials.gov API v2</li>
              <li><strong className="text-white">Funding:</strong> NIH RePORTER API v2</li>
              <li><strong className="text-white">Epidemiology:</strong> WHO Global Health Observatory OData</li>
              <li><strong className="text-white">Proportions:</strong> BodyParts3D (CC BY-SA)</li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Technology Stack</h2>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li><strong className="text-white">Framework:</strong> Next.js 14 App Router, TypeScript</li>
              <li><strong className="text-white">3D Rendering:</strong> React Three Fiber, Three.js</li>
              <li><strong className="text-white">Modeling:</strong> Procedural Simplex noise displacement</li>
              <li><strong className="text-white">Styling:</strong> Tailwind CSS v4, Custom Glassmorphism</li>
              <li><strong className="text-white">AI Summaries:</strong> Gemini 2.5 Flash API (Google AI Studio)</li>
              <li><strong className="text-white">Deployment:</strong> Vercel</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Built in collaboration with <strong className="text-white">Ppragya and Vilsee</strong>.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="px-6 py-2 rounded-full glass hover:bg-white/5 transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
