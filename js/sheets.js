const CLIENT_ID =
  '17613324771-5glb8vdob9d6pmjo59dpkk7l7f1kh56e.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SHEET_ID = '1y0MlPZNevWcPaPXVrKWzvhXOBWGU57ZO8QPh5W-WrTs';
const HEADERS = [
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
];

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

async function ensureEntriesTab() {
  const token = await getToken();
  const response = await fetch(
    `${SHEETS_API}/${SHEET_ID}/values/Entries!A1:K1`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (response.ok) return;

  // Create the Entries tab
  await fetch(`${SHEETS_API}/${SHEET_ID}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{ addSheet: { properties: { title: 'Entries' } } }],
    }),
  });

  // Add headers
  await fetch(
    `${SHEETS_API}/${SHEET_ID}/values/Entries!A1:K1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [HEADERS] }),
    },
  );
}

function formatRow(entry) {
  return [
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
  ];
}

async function findTodayRow() {
  const token = await getToken();
  const response = await fetch(
    `${SHEETS_API}/${SHEET_ID}/values/Entries!A:A`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.values) return null;

  const todayPrefix = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  for (let i = 1; i < data.values.length; i++) {
    if (data.values[i][0] && data.values[i][0].startsWith(todayPrefix)) {
      window.MoodyErrors.logSuccess('sheets', `Found today's row: ${i + 1}`, `"${data.values[i][0]}" matches "${todayPrefix}"`);
      return i + 1; // 1-indexed row number
    }
  }
  window.MoodyErrors.logSuccess('sheets', 'No existing row for today', `Prefix: "${todayPrefix}"`);
  return null;
}

async function saveRow(entry) {
  const values = [formatRow(entry)];
  const existingRow = await findTodayRow();

  // Get a fresh token right before the write
  const token = await getToken();

  let response;
  if (existingRow) {
    // Update existing row (last write wins)
    window.MoodyErrors.logSuccess('sheets', `Updating row ${existingRow}`, JSON.stringify(values[0].slice(0, 5)));
    response = await fetch(
      `${SHEETS_API}/${SHEET_ID}/values/Entries!A${existingRow}:K${existingRow}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      },
    );
  } else {
    // Append new row
    window.MoodyErrors.logSuccess('sheets', 'Appending new row', JSON.stringify(values[0].slice(0, 5)));
    response = await fetch(
      `${SHEETS_API}/${SHEET_ID}/values/Entries!A:K:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      },
    );
  }

  const responseBody = await response.text();
  window.MoodyErrors.logSuccess('sheets', `Response ${response.status}`, responseBody.slice(0, 200));

  if (!response.ok) {
    const queue = JSON.parse(localStorage.getItem('moody_sync_queue') || '[]');
    queue.push(entry);
    localStorage.setItem('moody_sync_queue', JSON.stringify(queue));
    throw new Error(`Sheets API error: ${response.status} - ${responseBody.slice(0, 100)}`);
  }

  // Flush any previously queued entries
  const queue = JSON.parse(localStorage.getItem('moody_sync_queue') || '[]');
  if (queue.length > 0) {
    localStorage.setItem('moody_sync_queue', '[]');
    for (const queued of queue) {
      const queuedValues = [formatRow(queued)];
      const queuedRes = await fetch(
        `${SHEETS_API}/${SHEET_ID}/values/Entries!A:K:append?valueInputOption=USER_ENTERED`,
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
        const remaining = queue.slice(queue.indexOf(queued));
        localStorage.setItem('moody_sync_queue', JSON.stringify(remaining));
        break;
      }
    }
  }
}

async function readEntries() {
  const token = await getToken();
  const response = await fetch(
    `${SHEETS_API}/${SHEET_ID}/values/Entries!A2:K?majorDimension=ROWS`,
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
  await ensureEntriesTab();
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
  saveRow,
  readEntries,
  getToken,
};
