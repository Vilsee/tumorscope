import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tumor = searchParams.get('tumor') || searchParams.get('condition') || searchParams.get('query') || 'brain tumor';
  const status = searchParams.get('status') || 'RECRUITING';
  const fetchedAt = new Date().toISOString();

  try {
    const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(tumor)}&filter.overallStatus=${encodeURIComponent(status)}&pageSize=5&countTotal=true`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`ClinicalTrials.gov API returned status ${res.status}`);
    }

    const data = await res.json();

    const trials = data.studies?.map((study: any) => {
      const protocol = study.protocolSection;
      return {
        nctId: protocol?.identificationModule?.nctId || 'NCT-UNKNOWN',
        title: protocol?.identificationModule?.briefTitle || 'Untitled Clinical Trial',
        status: protocol?.statusModule?.overallStatus || status,
        phase: protocol?.designModule?.phases?.join(', ') || 'Phase 1/2',
        conditions: protocol?.conditionsModule?.conditions || [tumor],
        interventions: protocol?.armsInterventionsModule?.interventions?.map((i: any) => i.name) || ['Targeted Therapy'],
        summary: protocol?.descriptionModule?.briefSummary || 'Brief summary not provided by sponsor.',
      };
    }) || [];

    return NextResponse.json({
      success: true,
      tumor,
      fetchedAt,
      trials,
      totalCount: data.totalCount || trials.length,
      source: 'ClinicalTrials.gov v2',
    });
  } catch (error: any) {
    console.error('Trials API Error:', error?.message || error);
    return NextResponse.json({
      success: false,
      error: 'source unavailable',
      message: 'ClinicalTrials.gov v2 API is temporarily unresponsive.',
      tumor,
      fetchedAt,
      trials: [],
      source: 'ClinicalTrials.gov v2',
    }, { status: 200 });
  }
}
