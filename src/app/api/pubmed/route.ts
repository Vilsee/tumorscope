import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'glioma';
  const page = parseInt(searchParams.get('page') || '1');
  const offset = (page - 1) * 10;

  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=10&retstart=${offset}&retmode=json&sort=relevance&tool=neuroscope&email=neuroscope@edu.app`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const ids = searchData.esearchresult?.idlist?.join(',') || '';

    if (!ids) {
      return NextResponse.json([]);
    }

    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids}&retmode=xml`;
    const fetchRes = await fetch(fetchUrl);
    const xmlText = await fetchRes.text();

    const articles = ids.split(',').map((id: string) => {
      const articleBlock = xmlText.split(`<PMID Version="1">${id}</PMID>`)[1]?.split('</PubmedArticle>')[0] || '';
      const titleMatch = articleBlock.match(/<ArticleTitle[^>]*>(.*?)<\/ArticleTitle>/);
      const abstractMatch = articleBlock.match(/<AbstractText[^>]*>(.*?)<\/AbstractText>/);
      const journalMatch = articleBlock.match(/<Title>(.*?)<\/Title>/);
      const yearMatch = articleBlock.match(/<PubDate>[\s\S]*?<Year>(.*?)<\/Year>[\s\S]*?<\/PubDate>/) || articleBlock.match(/<Year>(.*?)<\/Year>/);
      
      return {
        pmid: id,
        title: titleMatch ? titleMatch[1] : 'Unknown Title',
        abstract: abstractMatch ? abstractMatch[1] : '',
        authors: [], 
        journal: journalMatch ? journalMatch[1] : 'Unknown Journal',
        year: yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear(),
      };
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('PubMed API Error:', error);
    return NextResponse.json({ error: "source unavailable" }, { status: 500 });
  }
}
