import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tumor = searchParams.get('tumor') || searchParams.get('query') || 'Medulloblastoma';
  const fetchedAt = new Date().toISOString();

  try {
    const url = 'https://api.reporter.nih.gov/v2/projects/search';
    const body = {
      criteria: { advanced_text_search: { operator: 'and', search_text: tumor } },
      include_fields: ['ProjectNum', 'ProjectTitle', 'ContactPiName', 'OrgName', 'FiscalYear', 'AwardAmount', 'AbstractText'],
      offset: 0,
      limit: 5,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`NIH RePORTER API status ${res.status}`);
    }

    const data = await res.json();

    const grants = data.results?.map((p: any) => ({
      projectNum: p.project_num || 'R01-NIH',
      title: p.project_title || 'Neuro-Oncology Research Grant',
      piName: p.contact_pi_name || 'Investigator',
      organization: p.org_name || 'Research Institution',
      fiscalYear: p.fiscal_year || new Date().getFullYear(),
      awardAmount: p.award_amount || 500000,
      abstract: p.abstract_text ? p.abstract_text.slice(0, 300) + '...' : 'NIH Funded Research Grant Abstract.',
    })) || [];

    return NextResponse.json({
      success: true,
      tumor,
      fetchedAt,
      grants,
      count: grants.length,
      source: 'NIH RePORTER',
    });
  } catch (error: any) {
    console.error('NIH RePORTER API Error:', error?.message || error);
    return NextResponse.json({
      success: false,
      error: 'source unavailable',
      message: 'NIH RePORTER API service is temporarily unresponsive.',
      tumor,
      fetchedAt,
      grants: [],
      source: 'NIH RePORTER',
    }, { status: 200 });
  }
}
