# Moody

A daily mood & health journal that lives on your phone. Push notification at 11 PM, tap, check in, done in 30 seconds.

Built as a PWA — add to your iPhone home screen for a native-like experience.

## Features

- Happiness, sleep, and eating scales
- Emotion, social, and activity multi-select chips with custom input
- Gratitude and free-text journaling with daily Buddhist/mindfulness quotes
- Auto-selects based on day of week and geolocation
- Weather and location captured automatically
- Google Sheets sync for durable storage and Mac access
- Dark mode, offline-capable

## Setup

1. Deploy to GitHub Pages (or any HTTPS static host)
2. Create a Google Cloud project with Sheets API enabled
3. Configure OAuth consent screen and client ID
4. Open the app URL in Safari on iPhone
5. Tap Share → Add to Home Screen
6. Sign in with Google once
7. Allow notifications

## Development

```bash
npm install
npm run lint
npm run format
```

Serve locally with any static server (e.g., `npx serve .` or the Claude Preview MCP).
