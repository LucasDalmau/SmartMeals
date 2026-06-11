// Utilidades de semana ISO 8601. Los planes se persisten con clave
// "YYYY-Wnn" (CLAUDE.md, amendment 5). "Hoy" se calcula en la zona horaria
// de Buenos Aires: el server (UTC) cambiaría de día 3 horas antes.

export const TIMEZONE = "America/Argentina/Buenos_Aires";

export type IsoWeek = string; // "2026-W24"

/** Fecha civil (y/m/d) de `date` vista desde TIMEZONE, como Date UTC a medianoche. */
export function civilDate(date: Date, timeZone: string = TIMEZONE): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return new Date(`${parts}T00:00:00Z`);
}

/** Semana ISO de una fecha civil (Date UTC a medianoche). */
export function isoWeekOf(civil: Date): IsoWeek {
  // Algoritmo del jueves: la semana ISO de una fecha es la del jueves de su
  // semana, y ese jueves siempre cae en el año al que pertenece la semana.
  const d = new Date(civil);
  const day = (d.getUTCDay() + 6) % 7; // 0 = lunes
  d.setUTCDate(d.getUTCDate() - day + 3); // jueves de la semana
  const year = d.getUTCFullYear();
  const jan4 = new Date(Date.UTC(year, 0, 4)); // siempre en semana 1
  const jan4Day = (jan4.getUTCDay() + 6) % 7;
  const week1Monday = new Date(jan4);
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day);
  const week =
    1 + Math.round((d.getTime() - week1Monday.getTime()) / (7 * 86400000) - 3 / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

export function currentIsoWeek(now: Date = new Date()): IsoWeek {
  return isoWeekOf(civilDate(now));
}

const ISO_WEEK_RE = /^(\d{4})-W(\d{2})$/;

export function isValidIsoWeek(value: string): boolean {
  const m = value.match(ISO_WEEK_RE);
  if (!m) return false;
  const week = Number(m[2]);
  if (week < 1 || week > 53) return false;
  // Semana 53 solo existe en años que la tienen.
  return isoWeekOf(mondayOf(value)) === value;
}

/** Lunes (fecha civil UTC) de una semana ISO. */
export function mondayOf(isoWeek: IsoWeek): Date {
  const m = isoWeek.match(ISO_WEEK_RE);
  if (!m) throw new Error(`Semana ISO inválida: ${isoWeek}`);
  const year = Number(m[1]);
  const week = Number(m[2]);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = (jan4.getUTCDay() + 6) % 7;
  const week1Monday = new Date(jan4);
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day);
  const monday = new Date(week1Monday);
  monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7);
  return monday;
}

export function addWeeks(isoWeek: IsoWeek, n: number): IsoWeek {
  const monday = mondayOf(isoWeek);
  monday.setUTCDate(monday.getUTCDate() + n * 7);
  return isoWeekOf(monday);
}

/** Las 7 fechas civiles (lun→dom) de la semana. */
export function datesOf(isoWeek: IsoWeek): Date[] {
  const monday = mondayOf(isoWeek);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d;
  });
}

/** Índice 0-6 (lun-dom) de hoy dentro de la semana, o null si no pertenece. */
export function todayIndexIn(isoWeek: IsoWeek, now: Date = new Date()): number | null {
  const today = civilDate(now);
  if (isoWeekOf(today) !== isoWeek) return null;
  return (today.getUTCDay() + 6) % 7;
}

// Nombres derivados de Intl — nada hardcodeado, y cambiar de locale después
// es gratis.
export function weekdayName(date: Date, locale = "es"): string {
  const name = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone: "UTC",
  }).format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatWeekRange(isoWeek: IsoWeek, locale = "es"): string {
  const days = datesOf(isoWeek);
  const fmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return `${fmt.format(days[0])} – ${fmt.format(days[6])}`;
}

export function dayNumber(date: Date): number {
  return date.getUTCDate();
}
