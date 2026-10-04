'use client';
import React from 'react';
import { PubMedArticle } from '@/types';
import { GlassCard } from './GlassCard';
import { useSummarize } from '@/hooks/useSummarize';

export function ArticleCard({ article }: { article: PubMedArticle }) {
  const { summarize, summary, loading } = useSummarize();

  return (
    <GlassCard className="mb-4">
      <h3 className="text-lg font-bold text-[#E8EDF4] mb-2">{article.title}</h3>
      <div className="text-sm text-[#8A96AC] mb-3">
        {article.journal} • {article.year}
      </div>
      <p className="text-sm text-[#E8EDF4] line-clamp-3 mb-4">{article.abstract}</p>
      
      {summary ? (
        <div className="mt-4 p-4 rounded bg-[#1A2236] text-sm text-[#E8EDF4]">
          <strong className="text-[#5AC8FA] block mb-1">AI Summary:</strong>
          {summary}
        </div>
      ) : (
        <button
          onClick={() => summarize(article.abstract, article.title)}
          disabled={loading || !article.abstract}
          className="text-sm px-4 py-2 rounded bg-[#2D7DD2] text-white hover:bg-[#2D7DD2]/80 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Summarizing...' : 'Summarize with AI'}
        </button>
      )}
    </GlassCard>
  );
}
