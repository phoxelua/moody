const NOTIF_KEY = 'moody_notif_enabled';

function getNotifHour() {
  return Number(window.MoodyConfig.get('notifHour'));
}

function getNotifMinute() {
  return Number(window.MoodyConfig.get('notifMinute'));
}

async function requestPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

let nightlyInterval = null;

function scheduleNightly() {
  if (!('serviceWorker' in navigator)) return;
  if (nightlyInterval) return; // Prevent duplicate intervals

  // Check every minute if it's time to notify
  nightlyInterval = setInterval(() => {
    const now = new Date();
    if (
      now.getHours() === getNotifHour() &&
      now.getMinutes() === getNotifMinute() &&
      localStorage.getItem(NOTIF_KEY) === 'true'
    ) {
      showNotification();
    }
  }, 60000);
}

async function showNotification() {
  // Don't notify if already checked in today
  const entries = window.MoodyStorage.getEntries();
  const today = new Date().toDateString();
  const alreadyDone = entries.some(
    (e) => new Date(e.date).toDateString() === today,
  );
  if (alreadyDone) return;

  const reg = await navigator.serviceWorker.ready;
  reg.showNotification('Moody', {
    body: 'How was your day? Tap to check in.',
    icon: 'icons/icon-192.png',
    tag: 'moody-checkin',
    renotify: true,
  });
}

function enable() {
  localStorage.setItem(NOTIF_KEY, 'true');
}

function isEnabled() {
  return localStorage.getItem(NOTIF_KEY) === 'true';
}

window.MoodyNotifications = {
  requestPermission,
  scheduleNightly,
  showNotification,
  enable,
  isEnabled,
  getNotifHour,
  getNotifMinute,
};
