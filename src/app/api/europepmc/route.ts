import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'glioma';
  const cursor = searchParams.get('cursor') || '*';

  try {
    const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=10&cursorMark=${encodeURIComponent(cursor)}`;
    const res = await fetch(url);
    const data = await res.json();

    const articles = data.resultList?.result?.map((item: any) => ({
      pmid: item.pmid || item.id,
      title: item.title,
      abstract: item.abstractText || '',
      authors: item.authorString ? item.authorString.split(', ') : [],
      journal: item.journalTitle,
      year: item.pubYear ? parseInt(item.pubYear) : new Date().getFullYear(),
      doi: item.doi
    })) || [];

    return NextResponse.json({ articles, nextCursor: data.nextCursorMark });
  } catch (error) {
    console.error('EuropePMC API Error:', error);
    return NextResponse.json({ error: "source unavailable" }, { status: 500 });
  }
}
