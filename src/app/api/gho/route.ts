import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const indicator = searchParams.get('indicator') || 'NCDMORT3070';

  try {
    const url = `https://ghoapi.azureedge.net/api/${indicator}`;
    const res = await fetch(url);
    const data = await res.json();

    const dataPoints = data.value?.slice(0, 100).map((v: any) => ({
      indicator: v.IndicatorCode,
      country: v.SpatialDim,
      year: v.TimeDim,
      value: v.NumericValue,
      sex: v.Dim1
    })) || [];

    return NextResponse.json(dataPoints);
  } catch (error) {
    console.error('GHO API Error:', error);
    return NextResponse.json({ error: "source unavailable" }, { status: 500 });
  }
}
