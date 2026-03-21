// --- Daily Quote (placeholder for grateful textarea) ---
const QUOTES = [
  ['Breathe in calm, breathe out tension.', 'Thich Nhat Hanh'],
  ['The present moment is the only moment available to us.', 'Thich Nhat Hanh'],
  [
    'When you love someone, the best thing you can offer is your presence.',
    'Thich Nhat Hanh',
  ],
  ['Smile, breathe, and go slowly.', 'Thich Nhat Hanh'],
  ['Because you are alive, everything is possible.', 'Thich Nhat Hanh'],
  ['Walk as if you are kissing the earth with your feet.', 'Thich Nhat Hanh'],
  ['No mud, no lotus.', 'Thich Nhat Hanh'],
  ['Life is available only in the present moment.', 'Thich Nhat Hanh'],
  ['To be beautiful means to be yourself.', 'Thich Nhat Hanh'],
  [
    "Many people are alive but don't touch the miracle of being alive.",
    'Thich Nhat Hanh',
  ],
  [
    'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.',
    'Thich Nhat Hanh',
  ],
  [
    'Every breath we take, every step we make, can be filled with peace, joy, and serenity.',
    'Thich Nhat Hanh',
  ],
  [
    'Sometimes your joy is the source of your smile, and sometimes your smile is the source of your joy.',
    'Thich Nhat Hanh',
  ],
  [
    "The seed of suffering in you may be strong, but don't wait until you have no more suffering before allowing yourself to be happy.",
    'Thich Nhat Hanh',
  ],
  [
    'Letting go gives us freedom, and freedom is the only condition for happiness.',
    'Thich Nhat Hanh',
  ],
  [
    'People have a hard time letting go of their suffering. Out of a fear of the unknown, they prefer suffering that is familiar.',
    'Thich Nhat Hanh',
  ],
  [
    'The wave does not need to die to become water. She is already water.',
    'Thich Nhat Hanh',
  ],
  [
    'Hope is important because it can make the present moment less difficult to bear.',
    'Thich Nhat Hanh',
  ],
  [
    "Understanding someone's suffering is the best gift you can give another person.",
    'Thich Nhat Hanh',
  ],
  [
    'If we are peaceful, if we are happy, we can smile and blossom like a flower.',
    'Thich Nhat Hanh',
  ],
  [
    'You must love in such a way that the person you love feels free.',
    'Thich Nhat Hanh',
  ],
  [
    'Around us, life bursts with miracles — a glass of water, a ray of sunshine, a leaf, a caterpillar.',
    'Thich Nhat Hanh',
  ],
  [
    'When another person makes you suffer, it is because he suffers deeply within himself.',
    'Thich Nhat Hanh',
  ],
  [
    'Waking up this morning, I smile. Twenty-four brand new hours are before me.',
    'Thich Nhat Hanh',
  ],
  [
    'To think in terms of either pessimism or optimism oversimplifies the truth. The problem is to see reality as it is.',
    'Thich Nhat Hanh',
  ],
  ['Peace comes from within. Do not seek it without.', 'Buddha'],
  [
    'What you think, you become. What you feel, you attract. What you imagine, you create.',
    'Buddha',
  ],
  [
    'Three things cannot be long hidden: the sun, the moon, and the truth.',
    'Buddha',
  ],
  [
    'In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go.',
    'Buddha',
  ],
  ['Every morning we are born again. What we do today matters most.', 'Buddha'],
  ['The root of suffering is attachment.', 'Buddha'],
  ['Nothing is permanent.', 'Buddha'],
  [
    'Better than a thousand hollow words is one word that brings peace.',
    'Buddha',
  ],
  [
    'You will not be punished for your anger — you will be punished by your anger.',
    'Buddha',
  ],
  ['There is no path to happiness — happiness is the path.', 'Buddha'],
  [
    'Even as a solid rock is unshaken by the wind, so are the wise unshaken by praise or blame.',
    'Buddha',
  ],
  [
    'Set your heart on doing good. Do it over and over and you will be filled with joy.',
    'Buddha',
  ],
  ['A disciplined mind brings happiness.', 'Buddha'],
  [
    'Your worst enemy cannot harm you as much as your own unguarded thoughts.',
    'Buddha',
  ],
  [
    'If you light a lamp for somebody, it will also brighten your path.',
    'Buddha',
  ],
  ['A jug fills drop by drop.', 'Buddha'],
  ['All that we are is the result of what we have thought.', 'Buddha'],
  ['No one saves us but ourselves. We ourselves must walk the path.', 'Buddha'],
  [
    'Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened.',
    'Buddha',
  ],
  ['Health is the greatest gift, contentment the greatest wealth.', 'Buddha'],
  ['Hatred does not cease by hatred, but only by love.', 'Buddha'],
  ['You only lose what you cling to.', 'Buddha'],
  ['It is better to travel well than to arrive.', 'Buddha'],
  ['Rule your mind or it will rule you.', 'Buddha'],
  ['If anything is worth doing, do it with all your heart.', 'Buddha'],
  ['Radiate boundless love towards the entire world.', 'Buddha'],
  [
    'Have compassion for all beings, rich and poor alike — each has their suffering.',
    'Buddha',
  ],
  ['Doubt everything. Find your own light.', 'Buddha'],
  ['Conquer anger with non-anger, conquer badness with goodness.', 'Buddha'],
  ['Be kind whenever possible. It is always possible.', 'Dalai Lama'],
  ['Calm mind brings inner strength and self-confidence.', 'Dalai Lama'],
  ['The purpose of our lives is to be happy.', 'Dalai Lama'],
  [
    'If you want others to be happy, practice compassion. If you want to be happy, practice compassion.',
    'Dalai Lama',
  ],
  ['Choose to be optimistic — it feels better.', 'Dalai Lama'],
  [
    'The planet does not need more successful people. It needs more peacemakers, healers, and lovers of all kinds.',
    'Dalai Lama',
  ],
  [
    'Happiness is not something ready-made. It comes from your own actions.',
    'Dalai Lama',
  ],
  [
    'If the problem can be solved, why worry? If it cannot be solved, worrying will do you no good.',
    'Shantideva',
  ],
  [
    'Nothing ever goes away until it has taught us what we need to know.',
    'Pema Chödrön',
  ],
  ['You are the sky. Everything else is just the weather.', 'Pema Chödrön'],
  [
    'The most fundamental aggression to ourselves is to remain ignorant by not having the courage to look at ourselves honestly.',
    'Pema Chödrön',
  ],
  [
    'What you are is what you have been. What you will be is what you do now.',
    'Buddha',
  ],
  [
    'If we could see the miracle of a single flower clearly, our whole life would change.',
    'Buddha',
  ],
  ['Train your mind to see something good in everything.', 'Ajahn Chah'],
  [
    'If you let go a little, you will have a little peace. If you let go a lot, you will have a lot of peace.',
    'Ajahn Chah',
  ],
  [
    'When you plant seeds of kindness, you grow a garden of peace.',
    'Thich Nhat Hanh',
  ],
  [
    'Stop, breathe, look around you — this moment is your life.',
    'Thich Nhat Hanh',
  ],
  ['The way is not in the sky. The way is in the heart.', 'Buddha'],
  ['To understand everything is to forgive everything.', 'Buddha'],
  ['Give, even if you only have a little.', 'Buddha'],
  ['True love is born from understanding.', 'Thich Nhat Hanh'],
  [
    'The past is already gone, the future is not yet here. There is only one moment for you to live.',
    'Buddha',
  ],
  ['Generosity brings happiness at every stage of its expression.', 'Buddha'],
  [
    'If you are quiet enough, you will hear the flow of the universe.',
    'Buddha',
  ],
  ['Wear your ego like a loose-fitting garment.', 'Buddha'],
  [
    'It is in the nature of things that joy arises in a person free from remorse.',
    'Buddha',
  ],
  ['The whole secret of existence is to have no fear.', 'Buddha'],
  [
    'Every day is a new beginning. Take a deep breath and start again.',
    'Buddha',
  ],
  ['May all beings have happy minds.', 'Buddha'],
  [
    'Be gentle with yourself. You are doing the best you can.',
    'Thich Nhat Hanh',
  ],
  [
    'The less you respond to negativity, the more peaceful your life becomes.',
    'Buddha',
  ],
  [
    'When you realize how perfect everything is, you will tilt your head back and laugh at the sky.',
    'Buddha',
  ],
  ['Awake. Be the witness of your thoughts.', 'Buddha'],
  [
    'The one who has conquered himself is a far greater hero than he who has defeated a thousand times a thousand men.',
    'Buddha',
  ],
  [
    'Do not dwell in the past, do not dream of the future. Concentrate the mind on the present moment.',
    'Buddha',
  ],
  ['You yourself deserve your love and affection.', 'Buddha'],
  ['Meditate. Do not delay, lest you later regret it.', 'Buddha'],
  ['If you want to fly, give up everything that weighs you down.', 'Buddha'],
  [
    'There has to be evil so that good can prove its purity above it.',
    'Buddha',
  ],
  ['Patience is key. Remember: a jug fills drop by drop.', 'Buddha'],
  [
    'One moment can change a day, one day can change a life, and one life can change the world.',
    'Buddha',
  ],
  ['The trouble is, you think you have time.', 'Buddha'],
  ['Those who are free of resentful thoughts surely find peace.', 'Buddha'],
  [
    'Happiness will never come to those who fail to appreciate what they already have.',
    'Buddha',
  ],
  ['With our thoughts, we make the world.', 'Buddha'],
  ['Do not overrate what you have received, nor envy others.', 'Buddha'],
  ['The greatest prayer is patience.', 'Buddha'],
];

const today = new Date();
const dayOfYear = Math.floor(
  (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
);
const quote = QUOTES[dayOfYear % QUOTES.length];
document.getElementById('grateful').placeholder = `"${quote[0]}" — ${quote[1]}`;


// --- Form validation ---
function checkFormValidity() {
  const valid =
    getSingleValue('happiness') &&
    getSingleValue('sleep') &&
    getSingleValue('ate') &&
    getSelectedChips('emotion-chips').length > 0 &&
    getSelectedChips('social-chips').length > 0 &&
    getSelectedChips('activity-chips').length > 0;
  submitBtn.disabled = !valid;
}

// --- Face selector (happiness, single-select) ---
document.querySelectorAll('.face-row').forEach((row) => {
  row.addEventListener('click', (e) => {
    const face = e.target.closest('.face');
    if (!face) return;
    row
      .querySelectorAll('.face')
      .forEach((f) => f.classList.remove('selected'));
    face.classList.add('selected');
    checkFormValidity();
  });
});

// --- Scale selectors (ate, sleep — single-select) ---
document.querySelectorAll('.scale-row').forEach((row) => {
  row.addEventListener('click', (e) => {
    const btn = e.target.closest('.scale-btn');
    if (!btn) return;
    row
      .querySelectorAll('.scale-btn')
      .forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    checkFormValidity();
  });
});

// --- Chips (multi-select) ---
document.querySelectorAll('.chip-grid').forEach((grid) => {
  grid.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    // Handle "+ More" toggle
    if (chip.classList.contains('chip--more')) {
      const section = chip.dataset.section;
      const expanded = document.getElementById(`${section}-expanded`);
      expanded.classList.toggle('visible');
      chip.classList.toggle('open');
      chip.textContent = chip.classList.contains('open') ? '- Less' : '+ More';
      const customInput = document.querySelector(
        `.chip-custom[data-section="${section}-chips"]`,
      );
      if (customInput) customInput.classList.toggle('visible');
      return;
    }

    chip.classList.toggle('selected');
    checkFormValidity();
  });
});

// --- Submit ---
const submitBtn = document.getElementById('submit-btn');
submitBtn.disabled = true;
const syncStatus = document.getElementById('sync-status');

function getSelectedChips(sectionId) {
  const main = document.querySelectorAll(`#${sectionId} .chip.selected`);
  const expandedEl = document.getElementById(
    `${sectionId.replace('-chips', '')}-expanded`,
  );
  const expanded = expandedEl
    ? expandedEl.querySelectorAll('.chip.selected')
    : [];
  const values = [...main, ...expanded].map((el) => el.dataset.value);
  const customInput = document.querySelector(
    `.chip-custom[data-section="${sectionId}"]`,
  );
  if (customInput && customInput.value.trim()) {
    values.push(customInput.value.trim());
  }
  return values;
}

function getSingleValue(containerId) {
  const selected = document.querySelector(`#${containerId} .selected`);
  return selected ? Number(selected.dataset.value) : null;
}

function localISOString() {
  const now = new Date();
  const offset = -now.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const pad = (n) => String(Math.abs(n)).padStart(2, '0');
  const hours = pad(Math.floor(offset / 60));
  const mins = pad(offset % 60);
  return (
    now.getFullYear() +
    '-' +
    pad(now.getMonth() + 1) +
    '-' +
    pad(now.getDate()) +
    'T' +
    pad(now.getHours()) +
    ':' +
    pad(now.getMinutes()) +
    ':' +
    pad(now.getSeconds()) +
    sign +
    hours +
    ':' +
    mins
  );
}

submitBtn.addEventListener('click', async () => {
  const entry = {
    date: localISOString(),
    happiness: getSingleValue('happiness'),
    emotions: getSelectedChips('emotion-chips'),
    social: getSelectedChips('social-chips'),
    activities: getSelectedChips('activity-chips'),
    ate: getSingleValue('ate'),
    sleep: getSingleValue('sleep'),
    grateful: document.getElementById('grateful').value.trim(),
    note: document.getElementById('note').value.trim(),
    weather: currentWeather || '',
  };

  window.MoodyStorage.saveEntry(entry);

  submitBtn.textContent = '✅ Saved!';
  submitBtn.classList.add('success');
  submitBtn.disabled = true;

  // Sync to Google Sheets in the background
  if (window.MoodySheets.isSignedIn()) {
    try {
      await window.MoodySheets.saveRow(entry);
      showSync('Synced to Google Sheets');
      // Auto-close after successful sync
      setTimeout(() => window.close(), 1500);
    } catch (err) {
      window.MoodyErrors.logError('sheets', 'Sync failed', err.message);
      showSync('Saved locally (sync failed)');
    }
  }

  setTimeout(() => {
    submitBtn.textContent = '✨ Save';
    submitBtn.classList.remove('success');
    submitBtn.disabled = false;
    resetForm();
  }, 2000);
});

function showSync(message) {
  syncStatus.textContent = message;
  syncStatus.style.display = 'block';
  setTimeout(() => {
    syncStatus.style.display = 'none';
  }, 3000);
}

function resetForm() {
  document
    .querySelectorAll('.face.selected')
    .forEach((f) => f.classList.remove('selected'));
  document
    .querySelectorAll('.scale-btn.selected')
    .forEach((b) => b.classList.remove('selected'));
  document
    .querySelectorAll('.chip.selected')
    .forEach((c) => c.classList.remove('selected'));
  document.querySelectorAll('.chip-grid--expanded').forEach((el) => {
    el.classList.remove('visible');
  });
  document.querySelectorAll('.chip--more').forEach((btn) => {
    btn.classList.remove('open');
    btn.textContent = '+ More';
  });
  document.querySelectorAll('.chip-custom').forEach((input) => {
    input.value = '';
    input.classList.remove('visible');
  });
  document.getElementById('grateful').value = '';
  document.getElementById('note').value = '';
}

// --- Auto-select defaults ---
const dayOfWeek = today.getDay();
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
  const workChip = document.querySelector(
    '#activity-chips .chip[data-value="Work"]',
  );
  if (workChip) workChip.classList.add('selected');
}

const homeChip = document.querySelector(
  '#social-chips .chip[data-value="Home"]',
);
if (homeChip) homeChip.classList.add('selected');

// --- Pre-fill from today's earlier submission ---
function prefillForm(entry) {
  // Happiness
  if (entry.happiness) {
    const face = document.querySelector(
      `#happiness .face[data-value="${entry.happiness}"]`,
    );
    if (face) face.classList.add('selected');
  }

  // Sleep
  if (entry.sleep) {
    const btn = document.querySelector(
      `#sleep .scale-btn[data-value="${entry.sleep}"]`,
    );
    if (btn) btn.classList.add('selected');
  }

  // Ate
  if (entry.ate) {
    const btn = document.querySelector(
      `#ate .scale-btn[data-value="${entry.ate}"]`,
    );
    if (btn) btn.classList.add('selected');
  }

  // Chips (emotions, social, activities)
  const chipSections = [
    { key: 'emotions', mainId: 'emotion-chips', expandedId: 'emotion-expanded' },
    { key: 'social', mainId: 'social-chips', expandedId: 'social-expanded' },
    { key: 'activities', mainId: 'activity-chips', expandedId: 'activity-expanded' },
  ];
  for (const section of chipSections) {
    const values = entry[section.key] || [];
    // Clear auto-selections first
    document
      .querySelectorAll(`#${section.mainId} .chip.selected, #${section.expandedId} .chip.selected`)
      .forEach((c) => c.classList.remove('selected'));
    for (const val of values) {
      const chip =
        document.querySelector(`#${section.mainId} .chip[data-value="${val}"]`) ||
        document.querySelector(`#${section.expandedId} .chip[data-value="${val}"]`);
      if (chip) chip.classList.add('selected');
    }
  }

  // Text fields
  if (entry.grateful) {
    document.getElementById('grateful').value = entry.grateful;
  }
  if (entry.note) {
    document.getElementById('note').value = entry.note;
  }

  checkFormValidity();
}

const todayEntry = window.MoodyStorage.getTodayEntry();
if (todayEntry) {
  prefillForm(todayEntry);
}

// --- Header meta (date + location + weather) ---
const headerMeta = document.getElementById('header-meta');
const dateStr = today.toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});
headerMeta.textContent = dateStr;

// Geolocation-based defaults (Travel, Cook, Weather, header)
let currentWeather = null;

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const inBayArea =
      lat >= 37.2 && lat <= 37.9 && lng >= -122.6 && lng <= -121.7;
    const inStockton =
      lat >= 37.85 && lat <= 38.1 && lng >= -121.5 && lng <= -121.1;
    const isHome = inBayArea || inStockton;

    if (!isHome) {
      const travelChip = document.querySelector(
        '#activity-expanded .chip[data-value="Travel"]',
      );
      if (travelChip) travelChip.classList.add('selected');
    }

    // Auto-select Cook every day except Friday, not if traveling
    if (isHome && dayOfWeek !== 5) {
      const cookChip = document.querySelector(
        '#activity-chips .chip[data-value="Cook"]',
      );
      if (cookChip) cookChip.classList.add('selected');
    }

    // Fetch daily high weather + location in parallel
    try {
      const [weatherRes, geoRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,weather_code&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`,
        ),
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10`,
        ),
      ]);
      const weatherData = await weatherRes.json();
      const temp = Math.round(weatherData.daily.temperature_2m_max[0]);
      const code = weatherData.daily.weather_code[0];
      const info = weatherCodeInfo(code);
      currentWeather = `${temp}°F, ${info.text}`;

      const geoData = await geoRes.json();
      const city =
        geoData.address.city ||
        geoData.address.town ||
        geoData.address.village ||
        '';

      headerMeta.textContent = `${dateStr} · ${city ? city + ' · ' : ''}${info.emoji} ${temp}°F ${info.text}`;
    } catch (err) {
      window.MoodyErrors.logError('weather', 'Weather/geo API failed', err.message);
    }
    },
    (err) => {
      window.MoodyErrors.logError('geolocation', 'Location unavailable', err.message);
    },
    { timeout: 10000 },
  );
}

function weatherCodeInfo(code) {
  if (code === 0) return { emoji: '☀️', text: 'Clear' };
  if (code <= 3) return { emoji: '☁️', text: 'Cloudy' };
  if (code <= 49) return { emoji: '🌫️', text: 'Foggy' };
  if (code <= 59) return { emoji: '🌧️', text: 'Drizzle' };
  if (code <= 69) return { emoji: '🌧️', text: 'Rain' };
  if (code <= 79) return { emoji: '❄️', text: 'Snow' };
  if (code <= 84) return { emoji: '🌦️', text: 'Showers' };
  if (code <= 94) return { emoji: '⛈️', text: 'Thunderstorm' };
  return { emoji: '🌩️', text: 'Stormy' };
}

// --- Google Auth (gates the form) ---
const signInBtn = document.getElementById('sign-in-btn');
const checkinForm = document.getElementById('checkin-form');

function showForm() {
  checkinForm.style.display = '';
  signInBtn.style.display = 'none';
  checkFormValidity();
}

function initAuth() {
  if (typeof google === 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(initAuth, 500);
    });
    return;
  }

  window.MoodySheets.initGoogleAuth();

  if (window.MoodySheets.hasConnected()) {
    showForm();
  } else {
    signInBtn.style.display = 'block';
  }
}

signInBtn.addEventListener('click', async () => {
  try {
    await window.MoodySheets.signIn();
    showForm();
    showSync('Connected to Google Sheets');
  } catch (err) {
    window.MoodyErrors.logError('auth', 'Sign-in failed', err.message);
    showSync('Sign-in failed');
  }
});

initAuth();

// --- Notification hour setting ---
const notifHourSelect = document.getElementById('notif-hour');
notifHourSelect.value = String(window.MoodyNotifications.getNotifHour());
notifHourSelect.addEventListener('change', () => {
  window.MoodyNotifications.setNotifHour(Number(notifHourSelect.value));
});

// --- Service Worker + Notifications ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(async () => {
    if (!window.MoodyNotifications.isEnabled()) {
      const granted = await window.MoodyNotifications.requestPermission();
      if (granted) {
        window.MoodyNotifications.enable();
      }
    }
    window.MoodyNotifications.scheduleNightly();
  });
}
