const CLIENT_ID =
  '17613324771-5glb8vdob9d6pmjo59dpkk7l7f1kh56e.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const SHEET_ID_KEY = 'moody_sheet_id';
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';

let tokenClient;
let accessToken = null;

function initGoogleAuth() {
  return new Promise((resolve) => {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        if (response.access_token) {
          accessToken = response.access_token;
          resolve(response.access_token);
        }
      },
    });
  });
}

function requestToken(prompt) {
  return new Promise((resolve, reject) => {
    tokenClient.callback = (response) => {
      if (response.error) {
        reject(new Error(response.error));
        return;
      }
      accessToken = response.access_token;
      resolve(response.access_token);
    };
    tokenClient.requestAccessToken({ prompt });
  });
}

async function getToken() {
  if (accessToken) return accessToken;
  try {
    return await requestToken('');
  } catch {
    return await requestToken('consent');
  }
}

async function ensureSheet() {
  let sheetId = localStorage.getItem(SHEET_ID_KEY);
  if (sheetId) return sheetId;

  const token = await getToken();
  const response = await fetch(SHEETS_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { title: 'Moody Journal' },
      sheets: [
        {
          properties: { title: 'Entries' },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    'Date',
                    'Happiness',
                    'Emotions',
                    'Social',
                    'Activities',
                    'Ate',
                    'Sleep',
                    'Grateful For',
                    'Quick Note',
                    'Weather',
                    'Steps',
                  ].map((v) => ({ userEnteredValue: { stringValue: v } })),
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  sheetId = data.spreadsheetId;
  localStorage.setItem(SHEET_ID_KEY, sheetId);
  return sheetId;
}

async function appendRow(entry) {
  const token = await getToken();
  const sheetId = await ensureSheet();

  const values = [
    [
      new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
      entry.happiness || '',
      entry.emotions.join(', '),
      entry.social.join(', '),
      entry.activities.join(', '),
      entry.ate || '',
      entry.sleep || '',
      entry.grateful,
      entry.note,
      entry.weather || '',
      entry.steps || '',
    ],
  ];

  const response = await fetch(
    `${SHEETS_API}/${sheetId}/values/Entries!A:K:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    },
  );

  if (!response.ok) {
    // Queue for retry
    const queue = JSON.parse(localStorage.getItem('moody_sync_queue') || '[]');
    queue.push(entry);
    localStorage.setItem('moody_sync_queue', JSON.stringify(queue));
    throw new Error(`Sheets API error: ${response.status}`);
  }

  // Flush any previously queued entries (non-recursive to avoid infinite loops)
  const queue = JSON.parse(localStorage.getItem('moody_sync_queue') || '[]');
  if (queue.length > 0) {
    localStorage.setItem('moody_sync_queue', '[]');
    for (const queued of queue) {
      const queuedValues = [
        [
          new Date(queued.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          }),
          queued.happiness || '',
          queued.emotions.join(', '),
          queued.social.join(', '),
          queued.activities.join(', '),
          queued.ate || '',
          queued.sleep || '',
          queued.grateful,
          queued.note,
          queued.weather || '',
          queued.steps || '',
        ],
      ];
      const queuedRes = await fetch(
        `${SHEETS_API}/${sheetId}/values/Entries!A:K:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: queuedValues }),
        },
      );
      if (!queuedRes.ok) {
        // Re-queue remaining items and stop
        const remaining = queue.slice(queue.indexOf(queued));
        localStorage.setItem('moody_sync_queue', JSON.stringify(remaining));
        break;
      }
    }
  }
}

async function readEntries() {
  const sheetId = localStorage.getItem(SHEET_ID_KEY);
  if (!sheetId) return [];

  const token = await getToken();
  const response = await fetch(
    `${SHEETS_API}/${sheetId}/values/Entries!A2:K?majorDimension=ROWS`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await response.json();
  if (!data.values) return [];

  return data.values.map((row) => ({
    date: row[0] || '',
    happiness: Number(row[1]) || null,
    emotions: row[2] ? row[2].split(', ') : [],
    social: row[3] ? row[3].split(', ') : [],
    activities: row[4] ? row[4].split(', ') : [],
    ate: Number(row[5]) || null,
    sleep: Number(row[6]) || null,
    grateful: row[7] || '',
    note: row[8] || '',
    weather: row[9] || '',
    steps: row[10] || '',
  }));
}

async function signIn() {
  await requestToken('consent');
  localStorage.setItem('moody_connected', '1');
  await ensureSheet();
}

function isSignedIn() {
  return accessToken !== null;
}

function hasConnected() {
  return localStorage.getItem('moody_connected') === '1';
}

window.MoodySheets = {
  initGoogleAuth,
  signIn,
  isSignedIn,
  hasConnected,
  appendRow,
  readEntries,
  getToken,
};
