window.MoodyConfig = {
  sheetId: '1y0MlPZNevWcPaPXVrKWzvhXOBWGU57ZO8QPh5W-WrTs',
  notifHour: 23,
  notifMinute: 0,

  get(key) {
    const stored = localStorage.getItem(`moody_${key}`);
    if (stored !== null) return stored;
    return String(this[key]);
  },

  set(key, value) {
    if (String(value) === String(this[key])) {
      localStorage.removeItem(`moody_${key}`);
    } else {
      localStorage.setItem(`moody_${key}`, value);
    }
  },
};
