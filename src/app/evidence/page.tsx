'use client';

import React, { useState } from 'react';
import { EvidenceOverlay } from '@/components/ui/EvidenceOverlay';
import { ActiveResearchRadar } from '@/components/ui/ActiveResearchRadar';
import { tumorClassification } from '@/data/tumorClassification';

export default function EvidencePage() {
  const [selectedTumor, setSelectedTumor] = useState<string>('Glioblastoma');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredTumors = tumorClassification.filter(t => 
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#E8EDF4] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(90,200,250,0.1)] text-[#5AC8FA] border border-[rgba(90,200,250,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#5AC8FA] animate-pulse"></span>
            Real-Time Literature & Clinical Trials Radar
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Evidence Hub & Active Research Radar
          </h1>
          <p className="text-sm sm:text-base text-[#8A96AC]">
            Query PubMed (NCBI), Europe PMC, ClinicalTrials.gov v2, and NIH RePORTER APIs per tumor type. 
            Generate grounded clinical AI summaries backed by original PubMed PMID citations.
          </p>
        </div>

        {/* Tumor Type Selector */}
        <div className="glass rounded-xl p-6 border border-[var(--glass-border)] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Select Target Tumor Entity</h2>
              <p className="text-xs text-[#8A96AC]">Choose a WHO CNS5 tumor entity to trigger real-time evidence synthesis</p>
            </div>
            
            <input 
              type="text" 
              placeholder="Search 35 WHO tumor entities..." 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 text-xs bg-[#121826] border border-[#232D42] rounded-lg text-white placeholder-[#8A96AC] focus:outline-none focus:border-[#5AC8FA]"
            />
          </div>

          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1 custom-scrollbar">
            {filteredTumors.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedTumor(t.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTumor === t.name
                    ? 'bg-[#2D7DD2] text-white shadow-lg shadow-[#2D7DD2]/30 scale-105'
                    : 'bg-[#121826] text-[#8A96AC] hover:bg-[#1A2333] hover:text-white'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Target Banner */}
        <div className="flex items-center justify-between px-6 py-3 rounded-lg bg-[rgba(45,125,210,0.1)] border border-[rgba(45,125,210,0.25)]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#5AC8FA]"></div>
            <span className="text-xs text-[#8A96AC]">Active Tumor Target:</span>
            <span className="text-sm font-bold text-white">{selectedTumor}</span>
          </div>
          <span className="text-xs font-mono text-[#5AC8FA]">WHO CNS5 Verified Query</span>
        </div>

        {/* Two Column Layout: Evidence Overlay & Research Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PubMed & Europe PMC + Gemini Summarizer */}
          <div className="space-y-4">
            <EvidenceOverlay tumorType={selectedTumor} />
          </div>

          {/* ClinicalTrials.gov v2 & NIH RePORTER */}
          <div className="space-y-4">
            <ActiveResearchRadar tumorType={selectedTumor} />
          </div>

        </div>

      </div>
    </div>
  );
}
