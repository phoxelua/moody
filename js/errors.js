const EVENT_LOG_KEY = 'moody_event_log';
const MAX_EVENTS = 50;

function logEvent(source, message, detail, level) {
  const log = JSON.parse(localStorage.getItem(EVENT_LOG_KEY) || '[]');
  log.push({
    time: new Date().toISOString(),
    source,
    message: String(message),
    detail: detail ? String(detail) : '',
    level: level || 'error',
  });
  while (log.length > MAX_EVENTS) log.shift();
  localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(log));
}

function logError(source, message, detail) {
  logEvent(source, message, detail, 'error');
}

function logSuccess(source, message, detail) {
  logEvent(source, message, detail, 'success');
}

function getEvents() {
  return JSON.parse(localStorage.getItem(EVENT_LOG_KEY) || '[]');
}

function clearEvents() {
  localStorage.removeItem(EVENT_LOG_KEY);
}

// Catch unhandled errors
window.addEventListener('error', (e) => {
  logError('window', e.message, `${e.filename}:${e.lineno}`);
});

window.addEventListener('unhandledrejection', (e) => {
  logError('promise', String(e.reason));
});

window.MoodyErrors = { logError, logSuccess, getEvents, clearEvents };
