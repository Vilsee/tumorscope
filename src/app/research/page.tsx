'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { TrialCard } from '@/components/ui/TrialCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { usePubMed } from '@/hooks/usePubMed';
import { useTrials } from '@/hooks/useTrials';

export default function ResearchHubPage() {
  const [query, setQuery] = useState('glioma');
  const [activeTab, setActiveTab] = useState<'literature' | 'trials'>('literature');
  
  const pubMed = usePubMed(activeTab === 'literature' ? query : '');
  const trials = useTrials(activeTab === 'trials' ? query : '');

  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#E8EDF4] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8 text-center text-[#5AC8FA]">Research Hub</h1>
        
        <SearchBar onSearch={setQuery} placeholder="Search literature or clinical trials..." />
        
        <div className="flex justify-center gap-4 my-8">
          <button 
            onClick={() => setActiveTab('literature')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'literature' ? 'bg-[#2D7DD2] text-white' : 'bg-[#121826] text-[#8A96AC] hover:text-white'}`}
          >
            Literature
          </button>
          <button 
            onClick={() => setActiveTab('trials')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'trials' ? 'bg-[#2D7DD2] text-white' : 'bg-[#121826] text-[#8A96AC] hover:text-white'}`}
          >
            Clinical Trials
          </button>
        </div>

        <div className="mt-8">
          {activeTab === 'literature' && (
            <div>
              {pubMed.loading && <LoadingSkeleton />}
              {pubMed.error && <div className="text-[#E8A33D]">{pubMed.error}</div>}
              {pubMed.data.map(article => (
                <ArticleCard key={article.pmid} article={article} />
              ))}
              {!pubMed.loading && pubMed.data.length === 0 && (
                <div className="text-center text-[#8A96AC]">No literature found.</div>
              )}
            </div>
          )}

          {activeTab === 'trials' && (
            <div>
              {trials.loading && <LoadingSkeleton />}
              {trials.error && <div className="text-[#E8A33D]">{trials.error}</div>}
              {trials.data.map(trial => (
                <TrialCard key={trial.nctId} trial={trial} />
              ))}
              {!trials.loading && trials.data.length === 0 && (
                <div className="text-center text-[#8A96AC]">No trials found.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
