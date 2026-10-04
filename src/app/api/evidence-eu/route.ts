import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tumor = searchParams.get('tumor') || searchParams.get('query') || 'Meningioma';
  const fetchedAt = new Date().toISOString();

  try {
    const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(tumor)}&format=json&resultType=core&pageSize=5`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Europe PMC API returned status ${res.status}`);
    }

    const data = await res.json();

    const items = data.resultList?.result?.map((item: any) => ({
      pmid: item.pmid || item.id,
      title: item.title ? item.title.replace(/<[^>]+>/g, '') : 'Untitled Literature Item',
      abstract: item.abstractText ? item.abstractText.replace(/<[^>]+>/g, '') : 'Abstract available on Europe PMC repository.',
      authors: item.authorString ? item.authorString.split(', ').slice(0, 3) : [],
      journal: item.journalTitle || 'Europe PMC Journal',
      year: item.pubYear ? parseInt(item.pubYear) : new Date().getFullYear(),
      doi: item.doi || null,
      fullTextUrl: item.fullTextUrlList?.fullTextUrl?.[0]?.url || `https://europepmc.org/article/MED/${item.pmid || item.id}`,
    })) || [];

    return NextResponse.json({
      success: true,
      tumor,
      fetchedAt,
      items,
      count: items.length,
      source: 'Europe PMC',
    });
  } catch (error: any) {
    console.error('EuropePMC API Error:', error?.message || error);
    return NextResponse.json({
      success: false,
      error: 'source unavailable',
      message: 'Europe PMC web service is temporarily unresponsive.',
      tumor,
      fetchedAt,
      items: [],
      source: 'Europe PMC',
    }, { status: 200 });
  }
}
