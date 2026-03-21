const ERROR_LOG_KEY = 'moody_error_log';
const MAX_ERRORS = 50;

function logError(source, message, detail) {
  const log = JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
  log.push({
    time: new Date().toISOString(),
    source,
    message: String(message),
    detail: detail ? String(detail) : '',
  });
  // Keep only the most recent entries
  while (log.length > MAX_ERRORS) log.shift();
  localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(log));
}

function getErrors() {
  return JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
}

function clearErrors() {
  localStorage.removeItem(ERROR_LOG_KEY);
}

// Catch unhandled errors
window.addEventListener('error', (e) => {
  logError('window', e.message, `${e.filename}:${e.lineno}`);
});

window.addEventListener('unhandledrejection', (e) => {
  logError('promise', String(e.reason));
});

window.MoodyErrors = { logError, getErrors, clearErrors };
