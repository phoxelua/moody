# Moody

Daily mood & health journal PWA. Hosted on GitHub Pages, added to iPhone home screen.

## Architecture

- **Vanilla JS** — no framework, no build step. Static files served directly.
- **localStorage** — fast local cache for entries
- **Google Sheets API** — durable backend (one row per check-in), accessed via OAuth
- **Service worker** — offline caching
- **Open-Meteo API** — weather data (no API key needed)
- **Nominatim API** — reverse geocoding for city name

## Project Structure

```
index.html          — Single-page app shell
css/style.css       — Dark mode theme
js/app.js           — Main logic: form, geolocation, weather, auto-selections
js/sheets.js        — Google Sheets API + OAuth (write/read entries)
js/storage.js       — localStorage persistence
sw.js               — Service worker (cache-first with network update)
manifest.json       — PWA manifest
```

## Commands

- `npm run lint` — ESLint on js/
- `npm run format` — Prettier format all files
- `npm run format:check` — Check formatting

## Key Details

- Google OAuth CLIENT_ID in sheets.js is safe to expose (identifier, not a secret)
- Cache version in sw.js (`CACHE_NAME`) must be bumped on every code change
- Google Sheets columns: Date, Happiness, Emotions, Social, Activities, Ate, Sleep, Notes, Location, Weather (A:J)
- Auto-selections: Work (weekdays), Home (always), Cook (weekdays except Fri, only if home), Travel (if not in Bay Area/Stockton)
- Weather + geocode API calls are parallelized via Promise.all
