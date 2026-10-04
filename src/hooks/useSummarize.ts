import { useState } from 'react';

export function useSummarize() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summarize = async (text: string, context: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context })
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setSummary(result.summary);
      return result.summary;
    } catch (err: any) {
      setError(err.message || 'Failed to summarize');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { summarize, summary, loading, error };
}
