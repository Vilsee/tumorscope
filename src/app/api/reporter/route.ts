import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'glioblastoma';
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const url = 'https://api.reporter.nih.gov/v2/projects/search';
    const body = {
      criteria: { advanced_text_search: { operator: "and", search_text: query } },
      include_fields: ["ProjectNum", "ProjectTitle", "ContactPiName", "OrgName", "FiscalYear", "AwardAmount", "AbstractText"],
      offset: offset,
      limit: 10
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await res.json();

    const projects = data.results?.map((p: any) => ({
      projectNum: p.project_num,
      title: p.project_title,
      piName: p.contact_pi_name,
      organization: p.org_name,
      fiscalYear: p.fiscal_year,
      awardAmount: p.award_amount,
      abstract: p.abstract_text
    })) || [];

    return NextResponse.json(projects);
  } catch (error) {
    console.error('NIH RePORTER API Error:', error);
    return NextResponse.json({ error: "source unavailable" }, { status: 500 });
  }
}
