
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Lahore';

  const apiKey = process.env.WEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );

  if (!res.ok) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
