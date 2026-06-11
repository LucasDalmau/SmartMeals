import { describe, expect, it } from "vitest";
import {
  addWeeks,
  civilDate,
  currentIsoWeek,
  datesOf,
  formatWeekRange,
  isValidIsoWeek,
  isoWeekOf,
  mondayOf,
  todayIndexIn,
  weekdayName,
} from "@/lib/week";

const utc = (s: string) => new Date(`${s}T00:00:00Z`);

describe("isoWeekOf — casos borde del calendario ISO", () => {
  it("una fecha común", () => {
    expect(isoWeekOf(utc("2026-06-11"))).toBe("2026-W24");
  });

  it("el 1 de enero puede pertenecer a la última semana del año anterior", () => {
    // 2027-01-01 es viernes → semana 53 de 2026
    expect(isoWeekOf(utc("2027-01-01"))).toBe("2026-W53");
  });

  it("fin de diciembre puede pertenecer a la semana 1 del año siguiente", () => {
    // 2025-12-29 es lunes → semana 1 de 2026
    expect(isoWeekOf(utc("2025-12-29"))).toBe("2026-W01");
  });

  it("2026 tiene 53 semanas", () => {
    expect(isoWeekOf(utc("2026-12-28"))).toBe("2026-W53");
  });

  it("domingo pertenece a la misma semana que su lunes", () => {
    expect(isoWeekOf(utc("2026-06-08"))).toBe("2026-W24"); // lunes
    expect(isoWeekOf(utc("2026-06-14"))).toBe("2026-W24"); // domingo
  });
});

describe("mondayOf / datesOf / addWeeks", () => {
  it("mondayOf devuelve el lunes correcto", () => {
    expect(mondayOf("2026-W24").toISOString().slice(0, 10)).toBe("2026-06-08");
  });

  it("roundtrip: isoWeekOf(mondayOf(w)) === w para todo 2026", () => {
    for (let w = 1; w <= 53; w++) {
      const iso = `2026-W${String(w).padStart(2, "0")}`;
      expect(isoWeekOf(mondayOf(iso))).toBe(iso);
    }
  });

  it("datesOf devuelve 7 días consecutivos lun→dom", () => {
    const days = datesOf("2026-W24");
    expect(days).toHaveLength(7);
    expect(days[0].toISOString().slice(0, 10)).toBe("2026-06-08");
    expect(days[6].toISOString().slice(0, 10)).toBe("2026-06-14");
  });

  it("addWeeks cruza el límite de año", () => {
    expect(addWeeks("2026-W53", 1)).toBe("2027-W01");
    expect(addWeeks("2027-W01", -1)).toBe("2026-W53");
  });
});

describe("isValidIsoWeek", () => {
  it("acepta semanas reales", () => {
    expect(isValidIsoWeek("2026-W01")).toBe(true);
    expect(isValidIsoWeek("2026-W53")).toBe(true);
  });
  it("rechaza formato y semanas inexistentes", () => {
    expect(isValidIsoWeek("2026-W54")).toBe(false);
    expect(isValidIsoWeek("2025-W53")).toBe(false); // 2025 tiene 52
    expect(isValidIsoWeek("2026-24")).toBe(false);
    expect(isValidIsoWeek("basura")).toBe(false);
  });
});

describe("timezone Buenos Aires", () => {
  it("a las 01:00 UTC todavía es el día anterior en BA (UTC-3)", () => {
    const civil = civilDate(new Date("2026-06-12T01:00:00Z"));
    expect(civil.toISOString().slice(0, 10)).toBe("2026-06-11");
  });

  it("currentIsoWeek usa la fecha civil de BA", () => {
    // Lunes 2026-06-15 00:30 UTC = domingo 14 en BA → sigue siendo W24
    expect(currentIsoWeek(new Date("2026-06-15T00:30:00Z"))).toBe("2026-W24");
    expect(currentIsoWeek(new Date("2026-06-15T12:00:00Z"))).toBe("2026-W25");
  });

  it("todayIndexIn devuelve el índice o null", () => {
    const jueves = new Date("2026-06-11T12:00:00Z");
    expect(todayIndexIn("2026-W24", jueves)).toBe(3);
    expect(todayIndexIn("2026-W25", jueves)).toBeNull();
  });
});

describe("nombres derivados de Intl", () => {
  it("weekdayName en español capitalizado", () => {
    expect(weekdayName(utc("2026-06-08"))).toBe("Lunes");
    expect(weekdayName(utc("2026-06-14"))).toBe("Domingo");
  });

  it("formatWeekRange arma el rango", () => {
    expect(formatWeekRange("2026-W24")).toMatch(/8.*jun.*14.*jun/i);
  });
});
