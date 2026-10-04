import { NextResponse } from 'next/server';

interface AbstractPayload {
  pmid?: string;
  title: string;
  abstract: string;
  journal?: string;
  year?: number;
  doi?: string | null;
}

function generateExtractiveSummary(text: string): string {
  if (!text || text.length < 50) {
    return 'Summary available via full paper citation.';
  }

  // Extract sentences
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (sentences.length <= 2) {
    return sentences.join(' ');
  }

  // Pick first sentence (Objective) + key finding sentence (containing results/found/showed/conclude) + last sentence
  const firstSentence = sentences[0];
  const lastSentence = sentences[sentences.length - 1];

  const findingSentence = sentences.find((s, idx) =>
    idx > 0 &&
    idx < sentences.length - 1 &&
    /(result|demonstrate|show|identify|find|mutation|survival|inhibit|expression)/i.test(s)
  );

  const selected = [firstSentence];
  if (findingSentence && findingSentence !== firstSentence && findingSentence !== lastSentence) {
    selected.push(findingSentence);
  }
  if (lastSentence && lastSentence !== firstSentence) {
    selected.push(lastSentence);
  }

  return selected.join(' ');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const articles: AbstractPayload[] = body.articles || (body.abstract ? [{ title: body.title || 'Study', abstract: body.abstract, pmid: body.pmid, journal: body.journal, year: body.year, doi: body.doi }] : []);

    if (!articles || articles.length === 0) {
      return NextResponse.json(
        { error: 'No abstracts provided for summarization.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Silent graceful fallback if GEMINI_API_KEY is missing
    if (!apiKey) {
      const fallbackSummaries = articles.map((art) => ({
        summary: generateExtractiveSummary(art.abstract),
        citation: {
          pmid: art.pmid || null,
          title: art.title,
          journal: art.journal || 'Peer-reviewed Journal',
          year: art.year || new Date().getFullYear(),
          doi: art.doi || null,
        },
        method: 'extractive-fallback',
      }));

      return NextResponse.json({
        success: true,
        method: 'extractive-fallback',
        note: 'GEMINI_API_KEY not configured. Generated via extractive fallback.',
        summaries: fallbackSummaries,
      });
    }

    // Try Gemini API free tier
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const promptText = `You are a clinical neuro-oncology AI assistant. Summarize the following ${articles.length} peer-reviewed research abstract(s) into concise clinical bullet points (Objective, Key Finding, Diagnostic Relevance). Attach no extra chatter.\n\n` +
        articles.map((art, idx) => `[Abstract ${idx + 1} - ${art.title}]\n${art.abstract}`).join('\n\n');

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          const geminiSummaries = articles.map((art) => ({
            summary: rawText,
            citation: {
              pmid: art.pmid || null,
              title: art.title,
              journal: art.journal || 'Peer-reviewed Journal',
              year: art.year || new Date().getFullYear(),
              doi: art.doi || null,
            },
            method: 'gemini-2.5-flash',
          }));

          return NextResponse.json({
            success: true,
            method: 'gemini-2.5-flash',
            summaries: geminiSummaries,
          });
        }
      }
    } catch (geminiError) {
      console.warn('Gemini API call failed, using silent extractive fallback:', geminiError);
    }

    // Silent fallback if Gemini call fails or rate limits
    const fallbackSummaries = articles.map((art) => ({
      summary: generateExtractiveSummary(art.abstract),
      citation: {
        pmid: art.pmid || null,
        title: art.title,
        journal: art.journal || 'Peer-reviewed Journal',
        year: art.year || new Date().getFullYear(),
        doi: art.doi || null,
      },
      method: 'extractive-fallback',
    }));

    return NextResponse.json({
      success: true,
      method: 'extractive-fallback',
      summaries: fallbackSummaries,
    });
  } catch (error: any) {
    console.error('Summarize API Error:', error);
    return NextResponse.json(
      { error: 'source unavailable', message: error?.message || 'Summarization service failed.' },
      { status: 500 }
    );
  }
}
