const STORAGE_KEY = 'moody_entries';

function getEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveEntry(entry) {
  const entries = getEntries();
  const todayStr = new Date().toDateString();
  const existingIndex = entries.findIndex(
    (e) => new Date(e.date).toDateString() === todayStr,
  );
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function getTodayEntry() {
  const entries = getEntries();
  const todayStr = new Date().toDateString();
  return entries.find((e) => new Date(e.date).toDateString() === todayStr) || null;
}

window.MoodyStorage = { getEntries, saveEntry, getTodayEntry };
