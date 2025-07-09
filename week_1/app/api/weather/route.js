
export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const city = searchParams.get('city');
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API}&units=metric`);
  const data = await res.json();

  return Response.json(data, {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  });
}
