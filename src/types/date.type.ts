// 🐱 ISO date utility functions

export type ISO8601String = string & { __brand: 'ISO8601' };
export type Timestamp = ISO8601String;

// Narrow ISO 8601 (UTC "Z") — adjust if you allow offsets
const ISO_UTC_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

export const getCurrentISODate = (): Timestamp =>
  new Date().toISOString() as Timestamp;

export const toISOString = (date: Date): Timestamp =>
  date.toISOString() as Timestamp;

export const toTimestamp = (s: string): Timestamp => {
  if (!ISO_UTC_REGEX.test(s) || Number.isNaN(Date.parse(s))) {
    throw new Error('Invalid ISO 8601 timestamp');
  }
  return s as Timestamp;
};

export const parseISODate = (iso: string): Date | null => {
  if (!ISO_UTC_REGEX.test(iso)) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const isValidISODate = (iso: string): boolean =>
  parseISODate(iso) !== null;

export const formatDate = (
  date: Date | string,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(
    locale,
    options ?? {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short'
    }
  ).format(d);
};

export const getRelativeTime = (input: Date | string, locale = 'en-US'): string => {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diffSec = Math.round((d.getTime() - Date.now()) / 1000);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000], ['month', 2592000], ['day', 86400],
    ['hour', 3600], ['minute', 60], ['second', 1],
  ];
  for (const [unit, sec] of units) {
    const value = Math.trunc(diffSec / sec);
    if (value !== 0) return rtf.format(value, unit);
  }
  return rtf.format(0, 'second'); // "now"
};
