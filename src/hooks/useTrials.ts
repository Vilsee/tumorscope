import { useState, useEffect } from 'react';
import { ClinicalTrial } from '@/types';

export function useTrials(condition: string, status: string = 'RECRUITING') {
  const [data, setData] = useState<ClinicalTrial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!condition) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/trials?condition=${encodeURIComponent(condition)}&status=${encodeURIComponent(status)}`);
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setData(result.trials || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [condition, status]);

  return { data, loading, error };
}
