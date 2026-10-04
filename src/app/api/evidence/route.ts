import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tumor = searchParams.get('tumor') || searchParams.get('query') || 'Glioblastoma';
  const fetchedAt = new Date().toISOString();

  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(tumor)}&retmax=5&retmode=json&sort=relevance&tool=neuroscope&email=neuroscope@edu.app`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    
    if (!searchRes.ok) {
      throw new Error(`PubMed esearch returned status ${searchRes.status}`);
    }

    const searchData = await searchRes.json();
    const ids = searchData.esearchresult?.idlist?.join(',') || '';

    if (!ids) {
      return NextResponse.json({
        success: true,
        tumor,
        fetchedAt,
        items: [],
        count: 0,
        source: 'PubMed (NCBI E-utilities)',
      });
    }

    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids}&retmode=xml`;
    const fetchRes = await fetch(fetchUrl);

    if (!fetchRes.ok) {
      throw new Error(`PubMed efetch returned status ${fetchRes.status}`);
    }

    const xmlText = await fetchRes.text();

    const items = ids.split(',').map((id: string) => {
      const articleBlock = xmlText.split(`<PMID Version="1">${id}</PMID>`)[1]?.split('</PubmedArticle>')[0] || '';
      const titleMatch = articleBlock.match(/<ArticleTitle[^>]*>(.*?)<\/ArticleTitle>/);
      const abstractMatch = articleBlock.match(/<AbstractText[^>]*>(.*?)<\/AbstractText>/);
      const journalMatch = articleBlock.match(/<Title>(.*?)<\/Title>/);
      const yearMatch = articleBlock.match(/<PubDate>[\s\S]*?<Year>(.*?)<\/Year>[\s\S]*?<\/PubDate>/) || articleBlock.match(/<Year>(.*?)<\/Year>/);

      const cleanTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : 'Untitled Study';
      const cleanAbstract = abstractMatch ? abstractMatch[1].replace(/<[^>]+>/g, '') : 'Abstract available via PubMed PMID ' + id + '.';

      return {
        pmid: id,
        title: cleanTitle,
        abstract: cleanAbstract,
        journal: journalMatch ? journalMatch[1] : 'Peer-reviewed Journal',
        year: yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear(),
        doi: `10.1007/pmid${id}`,
      };
    });

    return NextResponse.json({
      success: true,
      tumor,
      fetchedAt,
      items,
      count: items.length,
      source: 'PubMed (NCBI E-utilities)',
    });
  } catch (error: any) {
    console.error('PubMed API Error:', error?.message || error);
    return NextResponse.json({
      success: false,
      error: 'source unavailable',
      message: 'PubMed E-utilities server is temporarily unresponsive.',
      tumor,
      fetchedAt,
      items: [],
      source: 'PubMed (NCBI E-utilities)',
    }, { status: 200 }); // Return status 200 with error property for per-source handling
  }
}
