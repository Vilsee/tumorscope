import { useState, useEffect } from 'react';
import { PubMedArticle } from '@/types';

export function usePubMed(query: string, page: number = 1) {
  const [data, setData] = useState<PubMedArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/pubmed?query=${encodeURIComponent(query)}&page=${page}`);
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
  }, [query, page]);

  return { data, loading, error };
}
