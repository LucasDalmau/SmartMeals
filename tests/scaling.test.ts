import { describe, expect, it } from "vitest";
import {
  personalMacros,
  personalServings,
  scaleAmount,
  scaleFactor,
  scaleMacros,
  sumMacros,
} from "@/lib/scaling";
import type { Macros } from "@/types";

const macros: Macros = { protein: 48, carbs: 52, fats: 18, calories: 570 };

describe("scaleFactor / scaleAmount", () => {
  it("identidad cuando servings == default", () => {
    expect(scaleFactor(1, 1)).toBe(1);
    expect(scaleAmount(200, 1, 1)).toBe(200);
  });

  it("escala proporcional hacia arriba y abajo", () => {
    expect(scaleAmount(200, 3, 1)).toBe(600);
    expect(scaleAmount(600, 1, 2)).toBe(300); // receta para 2 hecha para 1
  });

  it("redondea a 2 decimales (1/3 de 100g)", () => {
    expect(scaleAmount(100, 1, 3)).toBe(33.33);
  });

  it("servings 0 da 0 (slot vaciado)", () => {
    expect(scaleAmount(200, 0, 1)).toBe(0);
  });

  it("rechaza valores inválidos", () => {
    expect(() => scaleFactor(1, 0)).toThrow();
    expect(() => scaleFactor(-1, 2)).toThrow();
  });
});

describe("scaleMacros", () => {
  it("multiplica por porciones", () => {
    expect(scaleMacros(macros, 2)).toEqual({
      protein: 96,
      carbs: 104,
      fats: 36,
      calories: 1140,
    });
  });

  it("porciones fraccionarias con redondeo a 1 decimal", () => {
    expect(scaleMacros(macros, 1.5).protein).toBe(72);
    expect(scaleMacros({ ...macros, protein: 47 }, 1.5).protein).toBe(70.5);
  });
});

describe("regla para-dos (macros pre-divididos a porción personal)", () => {
  it("personalServings divide por 2 solo en for-two", () => {
    expect(personalServings("for-two", 2)).toBe(1);
    expect(personalServings("beef", 2)).toBe(2);
  });

  it("asado para 2: tus macros son 1 porción", () => {
    const asado: Macros = { protein: 46, carbs: 0, fats: 32, calories: 480 };
    expect(personalMacros(asado, "for-two", 2)).toEqual(asado);
  });

  it("receta normal cocinada x2 (sobras): macros x2", () => {
    expect(personalMacros(macros, "pasta", 2).calories).toBe(1140);
  });
});

describe("sumMacros", () => {
  it("suma una lista", () => {
    const total = sumMacros([macros, macros]);
    expect(total.protein).toBe(96);
    expect(total.calories).toBe(1140);
  });

  it("lista vacía = ceros", () => {
    expect(sumMacros([])).toEqual({ protein: 0, carbs: 0, fats: 0, calories: 0 });
  });

  it("evita acumulación de error flotante", () => {
    const tenth: Macros = { protein: 0.1, carbs: 0.1, fats: 0.1, calories: 1 };
    const total = sumMacros(Array.from({ length: 10 }, () => tenth));
    expect(total.protein).toBe(1);
  });
});
