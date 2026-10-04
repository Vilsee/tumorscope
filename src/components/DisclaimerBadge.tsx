'use client';

export default function DisclaimerBadge() {
  return (
    <div className="disclaimer-badge" role="status" aria-label="Educational disclaimer">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
        style={{ color: 'var(--amber)' }}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>
        Educational Anatomical Atlas — Not a Diagnostic Tool. Does not analyze medical images.
      </span>
    </div>
  );
}
