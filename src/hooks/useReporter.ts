import { useState, useEffect } from 'react';
import { ResearchProject } from '@/types';

export function useReporter(query: string, offset: number = 0) {
  const [data, setData] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/reporter?query=${encodeURIComponent(query)}&offset=${offset}`);
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, offset]);

  return { data, loading, error };
}
