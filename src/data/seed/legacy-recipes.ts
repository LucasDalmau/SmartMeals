import type { SeedRecipe } from "@/types";

// ⚠ ARCHIVO GENERADO por scripts/import-legacy.ts a partir de la data v2.
// Es editable: las correcciones manuales sobreviven mientras no se re-genere.
// Estimaciones a revisar: timers de pasos, mealSlots, freezable, prep deps.

export const LEGACY_RECIPES: SeedRecipe[] = [
  {
    "slug": "pollo-teriyaki-con-arroz-y-brocoli",
    "name": "Pollo Teriyaki con Arroz y Brócoli",
    "description": "Técnica: Wok a fuego alto — la clave del stir-fry.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 48,
      "carbs": 65,
      "fats": 14,
      "calories": 580
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Brócoli",
        "amount": 150,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Miel",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Jengibre fresco",
        "amount": 5,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Semillas de sésamo",
        "amount": 5,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Wok a fuego MÁXIMO hasta que humee."
      },
      {
        "text": "Aceite + pollo desmenuzado, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Brócoli del prep, 2 min más.",
        "timerSeconds": 120
      },
      {
        "text": "Salsa asiática + miel, glasear 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Sobre arroz + sésamo."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Salsa base asiática",
        "action": "cook",
        "durationMinutes": 5,
        "storageDays": 14,
        "freezable": false
      }
    ]
  },
  {
    "slug": "arroz-frito-con-pollo-y-verduras",
    "name": "Arroz Frito con Pollo y Verduras",
    "description": "Técnica: Arroz frito — arroz frío + fuego máximo.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 42,
      "carbs": 68,
      "fats": 16,
      "calories": 580
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 180,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 200,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Huevo",
        "amount": 2,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla de verdeo",
        "amount": 2,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 3,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Wok al máximo. Arroz TIENE que estar frío."
      },
      {
        "text": "Huevos revueltos rápido, sacar."
      },
      {
        "text": "Pollo + verduras, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Arroz contra el wok, no mover 30seg.",
        "timerSeconds": 30
      },
      {
        "text": "Todo junto + soja + sésamo + verdeo."
      }
    ],
    "prepDependencies": [
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "wok-de-carne-con-verduras",
    "name": "Wok de Carne con Verduras",
    "description": "Técnica: Sellado rápido + maicena para salsa espesa.",
    "category": "beef",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 50,
      "carbs": 55,
      "fats": 16,
      "calories": 560
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Zucchini",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Zanahoria",
        "amount": 60,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Maicena",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Jengibre fresco",
        "amount": 5,
        "unit": "g",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Carne del freezer a heladera a la mañana."
      },
      {
        "text": "Mezclá con 1 cda maicena."
      },
      {
        "text": "Wok al máximo, carne en tandas 30seg.",
        "timerSeconds": 30
      },
      {
        "text": "Verduras freezer directo, 3 min.",
        "timerSeconds": 180
      },
      {
        "text": "Volver carne + salsa. Con arroz."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Mix de verduras para wok",
        "action": "freeze",
        "durationMinutes": 15,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Salsa base asiática",
        "action": "cook",
        "durationMinutes": 5,
        "storageDays": 14,
        "freezable": false
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "fideos-lo-mein",
    "name": "Fideos Lo Mein",
    "description": "Técnica: Fideos para wok — al dente y aceitados.",
    "category": "pasta",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 72,
      "fats": 15,
      "calories": 600
    },
    "freezable": false,
    "tags": [
      "asiática"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 180,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Fideos spaghetti",
        "amount": 120,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla de verdeo",
        "amount": 2,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Salsa de ostras",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Fideos 1 min MENOS. Colar + aceite sésamo.",
        "timerSeconds": 60
      },
      {
        "text": "Wok: pollo + verduras, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Fideos + salsa asiática + ostras."
      },
      {
        "text": "Saltear con pinzas 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Verdeo arriba."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Salsa base asiática",
        "action": "cook",
        "durationMinutes": 5,
        "storageDays": 14,
        "freezable": false
      }
    ]
  },
  {
    "slug": "pollo-agridulce",
    "name": "Pollo Agridulce",
    "description": "Técnica: Salsa agridulce casera — balance dulce/ácido.",
    "category": "poultry",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 46,
      "carbs": 70,
      "fats": 14,
      "calories": 590
    },
    "freezable": false,
    "tags": [
      "asiática",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Ketchup",
        "amount": 3,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Salsa de soja",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Vinagre de manzana",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Miel",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Maicena",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Mezclar ketchup + soja + vinagre + miel."
      },
      {
        "text": "Wok: pollo + morrón, 3 min.",
        "timerSeconds": 180
      },
      {
        "text": "Agregar salsa, 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Maicena en agua fría, espesar 30seg.",
        "timerSeconds": 30
      },
      {
        "text": "Sobre arroz."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "chaufa-de-pollo",
    "name": "Chaufa de Pollo",
    "description": "Técnica: Fuego alto sostenido — no sobrecargar el wok.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 68,
      "fats": 16,
      "calories": 590
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 180,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 200,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Huevo",
        "amount": 2,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Cebolla de verdeo",
        "amount": 3,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Jengibre fresco",
        "amount": 5,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 3,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Wok al máximo. Huevos revueltos, sacar."
      },
      {
        "text": "Pollo + jengibre, 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Arroz frío, aplastar. 30seg sin tocar.",
        "timerSeconds": 30
      },
      {
        "text": "Repetir tostado 2 veces."
      },
      {
        "text": "Huevo + soja + sésamo + verdeo."
      }
    ],
    "prepDependencies": [
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "carne-con-brocoli-y-salsa-de-ostras",
    "name": "Carne con Brócoli y Salsa de Ostras",
    "description": "Técnica: Velveting — técnica china para carne sedosa.",
    "category": "beef",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 50,
      "carbs": 50,
      "fats": 15,
      "calories": 540
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Brócoli",
        "amount": 200,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Salsa de ostras",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Salsa de soja",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Maicena",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Ajo",
        "amount": 2,
        "unit": "clove",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Marinar carne en maicena + soja + agua (velveting)."
      },
      {
        "text": "Wok máximo, carne en tandas 30seg.",
        "timerSeconds": 30
      },
      {
        "text": "Ajo + brócoli, 2 min con splash de agua.",
        "timerSeconds": 120
      },
      {
        "text": "Volver carne + salsa de ostras, 30seg.",
        "timerSeconds": 30
      },
      {
        "text": "Con arroz."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "pollo-kung-pao",
    "name": "Pollo Kung Pao",
    "description": "Técnica: Salsa Kung Pao + manejo del picante.",
    "category": "poultry",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 46,
      "carbs": 58,
      "fats": 18,
      "calories": 580
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Maní tostado",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Salsa de soja",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Vinagre de arroz",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Sriracha o ají seco",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Wok al máximo: pollo + morrón, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Salsa asiática + vinagre + ají."
      },
      {
        "text": "Toque de maicena si querés más espesa."
      },
      {
        "text": "Maní tostado al final."
      },
      {
        "text": "Sobre arroz."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Salsa base asiática",
        "action": "cook",
        "durationMinutes": 5,
        "storageDays": 14,
        "freezable": false
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "carne-mongoliana",
    "name": "Carne Mongoliana",
    "description": "Técnica: Reducción de salsa — que glaseé sin quemarse.",
    "category": "beef",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 48,
      "carbs": 56,
      "fats": 16,
      "calories": 560
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Cebolla de verdeo",
        "amount": 4,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 3,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Azúcar negra",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Jengibre fresco",
        "amount": 10,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Ajo",
        "amount": 3,
        "unit": "clove",
        "category": "produce"
      },
      {
        "name": "Maicena",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Carne con maicena, sellar en tandas."
      },
      {
        "text": "Ajo + jengibre 30seg.",
        "timerSeconds": 30
      },
      {
        "text": "Soja + azúcar negra + agua, reducir 2 min.",
        "timerSeconds": 120,
        "canParallelize": true
      },
      {
        "text": "Volver carne, glasear."
      },
      {
        "text": "Verdeo generoso + arroz."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "arroz-cantones-con-pollo",
    "name": "Arroz Cantonés con Pollo",
    "description": "Técnica: Arroz salteado cantón — arvejas + jamón.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 40,
      "carbs": 70,
      "fats": 14,
      "calories": 570
    },
    "freezable": false,
    "tags": [
      "asiática",
      "rápido"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 150,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 200,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Huevo",
        "amount": 2,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Arvejas congeladas",
        "amount": 80,
        "unit": "g",
        "category": "frozen"
      },
      {
        "name": "Jamón cocido",
        "amount": 50,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Cebolla de verdeo",
        "amount": 2,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Wok máximo: huevos revueltos, sacar."
      },
      {
        "text": "Jamón en cubitos + arvejas, 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Arroz frío, tostar contra el wok."
      },
      {
        "text": "Pollo + huevo + soja."
      },
      {
        "text": "Verdeo + sésamo."
      }
    ],
    "prepDependencies": [
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "bowl-de-carne-batata-y-huevo",
    "name": "Bowl de Carne, Batata y Huevo",
    "description": "Técnica: Sellado de cubos — dorar sin sobre-revolver.",
    "category": "beef",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 13,
    "macrosPerServing": {
      "protein": 52,
      "carbs": 55,
      "fats": 22,
      "calories": 630
    },
    "freezable": false,
    "tags": [
      "clásico",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Batata",
        "amount": 200,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Huevo",
        "amount": 2,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Rúcula",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Tomates cherry",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Aceite de oliva",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Batata rodajas finas al micro 5 min.",
        "timerSeconds": 300
      },
      {
        "text": "Sartén MUY caliente, carne salpimentada, 3-4 min.",
        "timerSeconds": 240
      },
      {
        "text": "Armar: batata, rúcula, carne, huevos, cherrys."
      },
      {
        "text": "Aceite oliva + sal."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en cubos porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Huevos duros",
        "action": "cook",
        "durationMinutes": 12,
        "storageDays": 5,
        "freezable": false
      }
    ]
  },
  {
    "slug": "pasta-con-pollo-al-pesto",
    "name": "Pasta con Pollo al Pesto",
    "description": "Técnica: Pasta al dente + ligar con agua de cocción.",
    "category": "pasta",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 45,
      "carbs": 65,
      "fats": 18,
      "calories": 600
    },
    "freezable": false,
    "tags": [
      "clásico",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 180,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Penne o fusilli",
        "amount": 120,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Zucchini",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Pesto (frasco)",
        "amount": 3,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Parmesano",
        "amount": 20,
        "unit": "g",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Agua con sal a hervir. Pasta 1 min MENOS.",
        "timerSeconds": 60,
        "canParallelize": true
      },
      {
        "text": "Saltear verduras 3 min + pollo 2 min.",
        "timerSeconds": 180
      },
      {
        "text": "Guardar medio vaso agua cocción."
      },
      {
        "text": "Pasta + pollo + verduras + pesto + agua."
      },
      {
        "text": "Parmesano."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Mix de verduras para pasta",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      }
    ]
  },
  {
    "slug": "omelette-proteico-con-verduras",
    "name": "Omelette Proteico con Verduras",
    "description": "Técnica: Omelette francés — cremoso adentro.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 3,
    "macrosPerServing": {
      "protein": 40,
      "carbs": 8,
      "fats": 28,
      "calories": 440
    },
    "freezable": false,
    "tags": [
      "clásico",
      "rápido"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Huevo",
        "amount": 3,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Pechuga de pollo",
        "amount": 50,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Morrón rojo",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 30,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Queso fresco",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Manteca",
        "amount": 10,
        "unit": "g",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Batir 3 huevos. Sal y pimienta."
      },
      {
        "text": "Sartén antiadherente MEDIO-BAJO con manteca."
      },
      {
        "text": "Volcar huevos, empujar bordes al centro."
      },
      {
        "text": "Casi cuajado, relleno en una mitad."
      },
      {
        "text": "Doblar, deslizar. Babé adentro."
      }
    ],
    "prepDependencies": [
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "wrap-proteico-de-carne",
    "name": "Wrap Proteico de Carne",
    "description": "Técnica: Enrollado firme de wrap.",
    "category": "beef",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 48,
      "carbs": 42,
      "fats": 22,
      "calories": 560
    },
    "freezable": false,
    "tags": [
      "clásico",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Tortillas grandes",
        "amount": 2,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Lechuga",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Tomate",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Queso crema",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Carne con sal + pimienta + pimentón, 3 min.",
        "timerSeconds": 180
      },
      {
        "text": "Tortilla en sartén 20seg.",
        "timerSeconds": 20
      },
      {
        "text": "Untar, lechuga, carne, sofrito, tomate."
      },
      {
        "text": "Doblar costados, enrollar apretado."
      },
      {
        "text": "Sellar 30seg = crujiente.",
        "timerSeconds": 30
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "hamburguesa-smash-casera",
    "name": "Hamburguesa Smash Casera",
    "description": "Técnica: Smash burger — reacción Maillard al máximo.",
    "category": "beef",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 52,
      "carbs": 38,
      "fats": 30,
      "calories": 630
    },
    "freezable": false,
    "tags": [
      "clásico",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne picada",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Pan de hamburguesa",
        "amount": 1,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Queso cheddar",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Lechuga",
        "amount": 30,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Tomate",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Bolita de carne, NO trabajarla mucho."
      },
      {
        "text": "Sartén caliente, APLASTAR con espátula."
      },
      {
        "text": "2 min sin tocar. Vuelta, queso arriba, 1 min.",
        "timerSeconds": 120
      },
      {
        "text": "Pan tostado en la grasa."
      },
      {
        "text": "Armar con sofrito del freezer."
      }
    ],
    "prepDependencies": [
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Carne picada porcionada",
        "action": "freeze",
        "durationMinutes": 5,
        "storageDays": 1,
        "freezable": true
      }
    ]
  },
  {
    "slug": "tacos-de-carne-salteada",
    "name": "Tacos de Carne Salteada",
    "description": "Técnica: Sartén de hierro para tacos — máximo calor.",
    "category": "beef",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 46,
      "carbs": 45,
      "fats": 20,
      "calories": 540
    },
    "freezable": false,
    "tags": [
      "mexicana",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Tortillas de maíz",
        "amount": 6,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Palta",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Limón",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Cilantro",
        "amount": 10,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Comino",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Pimentón",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Carne con comino + pimentón, 3 min fuego alto.",
        "timerSeconds": 180
      },
      {
        "text": "Tortillas en sartén seca 20seg/lado.",
        "timerSeconds": 20
      },
      {
        "text": "Armar: carne, palta, sofrito, cilantro."
      },
      {
        "text": "Limón arriba."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      }
    ]
  },
  {
    "slug": "burrito-bowl-de-pollo",
    "name": "Burrito Bowl de Pollo",
    "description": "Técnica: Bowl assembly — capas de sabor y textura.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 48,
      "carbs": 72,
      "fats": 18,
      "calories": 640
    },
    "freezable": false,
    "tags": [
      "mexicana",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Porotos negros (lata)",
        "amount": 100,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Palta",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Crema agria",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Comino",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Limón",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Calentar pollo con comino + pimentón."
      },
      {
        "text": "Calentar porotos negros."
      },
      {
        "text": "Bowl: arroz, pollo, porotos, morrón, palta."
      },
      {
        "text": "Crema agria + limón."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "quesadillas-de-pollo",
    "name": "Quesadillas de Pollo",
    "description": "Técnica: Quesadilla crocante — fuego medio-bajo.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 42,
      "carbs": 48,
      "fats": 24,
      "calories": 580
    },
    "freezable": false,
    "tags": [
      "mexicana",
      "rápido"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 150,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Tortillas grandes",
        "amount": 2,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Queso mozzarella",
        "amount": 80,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Morrón rojo",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Tortilla en sartén fuego medio."
      },
      {
        "text": "Queso, pollo, morrón, sofrito."
      },
      {
        "text": "Doblar, 2 min/lado.",
        "timerSeconds": 120
      },
      {
        "text": "Cortar en triángulos."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      }
    ]
  },
  {
    "slug": "fajitas-de-carne",
    "name": "Fajitas de Carne",
    "description": "Técnica: Salteado de fajitas — tiras con color.",
    "category": "beef",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 46,
      "carbs": 42,
      "fats": 18,
      "calories": 510
    },
    "freezable": false,
    "tags": [
      "mexicana",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Tortillas grandes",
        "amount": 4,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Crema agria",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Comino",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Pimentón",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Carne con comino + pimentón, fuego alto 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Morrón + cebolla, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Tortillas en sartén seca."
      },
      {
        "text": "Armar con crema agria."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      }
    ]
  },
  {
    "slug": "nachos-proteicos-con-carne",
    "name": "Nachos Proteicos con Carne",
    "description": "Técnica: Nachos al horno — capas de queso.",
    "category": "beef",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 58,
      "fats": 28,
      "calories": 660
    },
    "freezable": false,
    "tags": [
      "mexicana"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne picada",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Nachos/tortilla chips",
        "amount": 100,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Queso cheddar",
        "amount": 60,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Porotos negros (lata)",
        "amount": 80,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Palta",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Jalapeños",
        "amount": 20,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Comino",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Carne con comino + pimentón, 5 min.",
        "timerSeconds": 300
      },
      {
        "text": "Nachos en fuente, carne + porotos + queso."
      },
      {
        "text": "Horno/grill 5 min hasta gratinar.",
        "timerSeconds": 300,
        "canParallelize": true
      },
      {
        "text": "Palta + jalapeños arriba."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne picada porcionada",
        "action": "freeze",
        "durationMinutes": 5,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "pollo-griego-con-ensalada",
    "name": "Pollo Griego con Ensalada",
    "description": "Técnica: Condimentar pollo estilo mediterráneo.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 48,
      "carbs": 18,
      "fats": 22,
      "calories": 460
    },
    "freezable": false,
    "tags": [
      "mediterránea",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Pepino",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Tomate",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Aceitunas negras",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Queso feta",
        "amount": 40,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Yogur griego",
        "amount": 100,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Orégano",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Limón",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Aceite de oliva",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Pollo del prep con orégano + limón + aceite."
      },
      {
        "text": "Ensalada: tomate, pepino, aceitunas, feta."
      },
      {
        "text": "Tzatziki como aderezo."
      },
      {
        "text": "Opcional: pan pita."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Tzatziki / salsa de yogur",
        "action": "portion",
        "durationMinutes": 5,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "shakshuka-proteica",
    "name": "Shakshuka Proteica",
    "description": "Técnica: Huevos pochados en salsa — punto justo.",
    "category": "vegetarian",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 36,
      "carbs": 32,
      "fats": 20,
      "calories": 450
    },
    "freezable": false,
    "tags": [
      "mediterránea"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Huevo",
        "amount": 3,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Tomate triturado",
        "amount": 400,
        "unit": "ml",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Queso feta",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Pan para mojar",
        "amount": 2,
        "unit": "slice",
        "category": "pantry"
      },
      {
        "name": "Comino",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Pimentón",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Ajo",
        "amount": 2,
        "unit": "clove",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Sofrito + ajo + morrón, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Tomates + comino + pimentón, 5 min.",
        "timerSeconds": 300
      },
      {
        "text": "Huecos, romper 3 huevos."
      },
      {
        "text": "Tapar, 4-5 min.",
        "timerSeconds": 300,
        "canParallelize": true
      },
      {
        "text": "Feta + pan."
      }
    ],
    "prepDependencies": [
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "bowl-mediterraneo-de-pollo",
    "name": "Bowl Mediterráneo de Pollo",
    "description": "Técnica: Bowl con hummus como base.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 46,
      "carbs": 58,
      "fats": 20,
      "calories": 600
    },
    "freezable": false,
    "tags": [
      "mediterránea",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Hummus",
        "amount": 60,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Pepino",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Tomates cherry",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Aceitunas",
        "amount": 20,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Aceite de oliva",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Limón",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Hummus generoso en el bowl."
      },
      {
        "text": "Arroz + pollo con comino."
      },
      {
        "text": "Pepino, cherrys, aceitunas."
      },
      {
        "text": "Aceite oliva + limón."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "pasta-al-limon-con-pollo",
    "name": "Pasta al Limón con Pollo",
    "description": "Técnica: Salsa al limón — emulsión con manteca.",
    "category": "pasta",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 62,
      "fats": 20,
      "calories": 600
    },
    "freezable": false,
    "tags": [
      "mediterránea"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 180,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Spaghetti",
        "amount": 120,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Limón",
        "amount": 2,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Parmesano",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Manteca",
        "amount": 20,
        "unit": "g",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Pasta al dente, guardar agua."
      },
      {
        "text": "Manteca + jugo 1.5 limones + ralladura."
      },
      {
        "text": "Pasta + agua cocción, revolver."
      },
      {
        "text": "Pollo + parmesano."
      },
      {
        "text": "Pimienta negra."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "mac-cheese-proteico",
    "name": "Mac & Cheese Proteico",
    "description": "Técnica: Salsa de queso sin grumos — roux.",
    "category": "pasta",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 13,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 68,
      "fats": 28,
      "calories": 700
    },
    "freezable": false,
    "tags": [
      "americana"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 150,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Macarrones",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Queso cheddar",
        "amount": 100,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Leche",
        "amount": 200,
        "unit": "ml",
        "category": "dairy"
      },
      {
        "name": "Manteca",
        "amount": 15,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Harina",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Mostaza",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Pasta al dente. Roux: manteca + harina, 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Leche de a poco."
      },
      {
        "text": "Queso + mostaza + sal."
      },
      {
        "text": "Mezclar con pasta + pollo."
      },
      {
        "text": "Gratinar 3 min.",
        "timerSeconds": 180,
        "canParallelize": true
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "philly-cheesesteak-casero",
    "name": "Philly Cheesesteak Casero",
    "description": "Técnica: Carne ultra-fina + queso derretido.",
    "category": "beef",
    "difficulty": 2,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 7,
    "macrosPerServing": {
      "protein": 48,
      "carbs": 45,
      "fats": 26,
      "calories": 610
    },
    "freezable": false,
    "tags": [
      "americana",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Pan baguette",
        "amount": 1,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Queso provolone",
        "amount": 40,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Morrón rojo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Carne en tiras fuego alto 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Morrón + sofrito, 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Queso arriba, tapar.",
        "canParallelize": true
      },
      {
        "text": "Pan abierto, cargar."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      }
    ]
  },
  {
    "slug": "bbq-chicken-bowl",
    "name": "BBQ Chicken Bowl",
    "description": "Técnica: Glasear con BBQ sin quemar.",
    "category": "poultry",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 5,
    "macrosPerServing": {
      "protein": 46,
      "carbs": 65,
      "fats": 14,
      "calories": 570
    },
    "freezable": false,
    "tags": [
      "americana",
      "rápido",
      "alto en proteína"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 200,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 150,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Salsa BBQ",
        "amount": 3,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Choclo",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Porotos negros (lata)",
        "amount": 80,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Pollo en sartén con BBQ, 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Choclo + porotos calientes."
      },
      {
        "text": "Bowl: arroz, pollo, choclo, porotos."
      },
      {
        "text": "Cilantro o verdeo."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      }
    ]
  },
  {
    "slug": "risotto-de-hongos-y-pollo",
    "name": "Risotto de Hongos y Pollo",
    "description": "Técnica: Risotto — tostado, caldo, mantecatura.",
    "category": "for-two",
    "difficulty": 3,
    "servingsDefault": 2,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 25,
    "macrosPerServing": {
      "protein": 38,
      "carbs": 65,
      "fats": 18,
      "calories": 570
    },
    "freezable": false,
    "tags": [
      "para dos"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Pechuga de pollo",
        "amount": 300,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz arbóreo",
        "amount": 300,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Champignones",
        "amount": 200,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Cebolla",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Caldo de verdura",
        "amount": 1,
        "unit": "l",
        "category": "pantry"
      },
      {
        "name": "Vino blanco",
        "amount": 100,
        "unit": "ml",
        "category": "pantry"
      },
      {
        "name": "Manteca",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Parmesano",
        "amount": 50,
        "unit": "g",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Sofrito + champignones, 3 min.",
        "timerSeconds": 180
      },
      {
        "text": "Arroz, tostar 2 min.",
        "timerSeconds": 120
      },
      {
        "text": "Vino, evaporar."
      },
      {
        "text": "Caldo de a cucharón, ~18 min.",
        "timerSeconds": 1080
      },
      {
        "text": "Manteca + parmesano (mantecatura). Pollo."
      }
    ],
    "prepDependencies": [
      {
        "name": "Pollo cocido desmenuzado",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      }
    ]
  },
  {
    "slug": "pasta-bolognesa",
    "name": "Pasta Bolognesa",
    "description": "Técnica: Sofrito + dorar carne sin revolver.",
    "category": "for-two",
    "difficulty": 2,
    "servingsDefault": 2,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 15,
    "macrosPerServing": {
      "protein": 42,
      "carbs": 70,
      "fats": 20,
      "calories": 630
    },
    "freezable": true,
    "tags": [
      "para dos"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne picada",
        "amount": 300,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Spaghetti",
        "amount": 250,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Passata de tomate",
        "amount": 400,
        "unit": "ml",
        "category": "pantry"
      },
      {
        "name": "Cebolla",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Zucchini",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Ajo",
        "amount": 3,
        "unit": "clove",
        "category": "produce"
      },
      {
        "name": "Parmesano",
        "amount": 40,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Albahaca",
        "amount": 5,
        "unit": "g",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Sofrito + ajo, 1 min.",
        "timerSeconds": 60
      },
      {
        "text": "Carne picada, 5 min sin revolver.",
        "timerSeconds": 300
      },
      {
        "text": "Verduras + passata, fuego bajo 10 min.",
        "timerSeconds": 600
      },
      {
        "text": "Pasta al dente + agua."
      },
      {
        "text": "Parmesano + albahaca."
      }
    ],
    "prepDependencies": [
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Mix de verduras para pasta",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Carne picada porcionada",
        "action": "freeze",
        "durationMinutes": 5,
        "storageDays": 1,
        "freezable": true
      }
    ]
  },
  {
    "slug": "wok-grande-para-compartir",
    "name": "Wok Grande para Compartir",
    "description": "Técnica: Wok en volumen — cocinar en tandas.",
    "category": "for-two",
    "difficulty": 2,
    "servingsDefault": 2,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 58,
      "fats": 16,
      "calories": 550
    },
    "freezable": false,
    "tags": [
      "para dos"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 400,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Arroz basmati",
        "amount": 300,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Morrón rojo",
        "amount": 150,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Zucchini",
        "amount": 150,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Zanahoria",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Salsa de soja",
        "amount": 4,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Salsa de ostras",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Aceite de sésamo",
        "amount": 2,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Maní",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Wok máximo, carne en 2 tandas."
      },
      {
        "text": "Sacar. Verduras 3 min.",
        "timerSeconds": 180
      },
      {
        "text": "Volver carne + salsa asiática + ostras."
      },
      {
        "text": "Sobre arroz, maní arriba."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Mix de verduras para wok",
        "action": "freeze",
        "durationMinutes": 15,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Arroz basmati cocido",
        "action": "cook",
        "durationMinutes": 20,
        "storageDays": 4,
        "freezable": true
      },
      {
        "name": "Salsa base asiática",
        "action": "cook",
        "durationMinutes": 5,
        "storageDays": 14,
        "freezable": false
      }
    ]
  },
  {
    "slug": "taco-night-para-dos",
    "name": "Taco Night para Dos",
    "description": "Técnica: Mise en place compartida.",
    "category": "for-two",
    "difficulty": 1,
    "servingsDefault": 2,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 10,
    "macrosPerServing": {
      "protein": 44,
      "carbs": 50,
      "fats": 24,
      "calories": 590
    },
    "freezable": false,
    "tags": [
      "para dos"
    ],
    "mealSlots": [
      "lunch",
      "dinner"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Carne (cuadril o nalga)",
        "amount": 400,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Tortillas de maíz",
        "amount": 8,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Palta",
        "amount": 2,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Limón",
        "amount": 2,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Crema agria",
        "amount": 60,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Queso rallado",
        "amount": 50,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Cebolla",
        "amount": 100,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Comino",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      },
      {
        "name": "Pimentón",
        "amount": 1,
        "unit": "tsp",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Carne con comino + pimentón, 3 min.",
        "timerSeconds": 180
      },
      {
        "text": "Calentar tortillas."
      },
      {
        "text": "Mesa: carne, guac, sofrito, queso, crema, limón."
      },
      {
        "text": "Cada uno arma."
      }
    ],
    "prepDependencies": [
      {
        "name": "Carne en tiras porcionada",
        "action": "freeze",
        "durationMinutes": 10,
        "storageDays": 1,
        "freezable": true
      },
      {
        "name": "Cebolla sofrita (cubeteras)",
        "action": "cook",
        "durationMinutes": 25,
        "storageDays": 5,
        "freezable": true
      },
      {
        "name": "Verduras cortadas",
        "action": "cut",
        "durationMinutes": 15,
        "storageDays": 4,
        "freezable": false
      },
      {
        "name": "Guacamole casero",
        "action": "portion",
        "durationMinutes": 8,
        "storageDays": 2,
        "freezable": false
      }
    ]
  },
  {
    "slug": "overnight-oats-proteicos",
    "name": "Overnight oats proteicos",
    "description": "Avena + yogur griego + chía + banana.",
    "category": "breakfast",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 22,
      "carbs": 45,
      "fats": 10,
      "calories": 360
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "breakfast"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Avena",
        "amount": 50,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Yogur griego",
        "amount": 100,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Semillas de chía",
        "amount": 10,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Banana",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Leche",
        "amount": 80,
        "unit": "ml",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Prepará: Avena + yogur griego + chía + banana."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "huevos-duros-frutos-secos",
    "name": "Huevos duros + frutos secos",
    "description": "2 huevos + mix almendras/nueces 30g.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 18,
      "carbs": 6,
      "fats": 16,
      "calories": 240
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "breakfast",
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Huevo",
        "amount": 2,
        "unit": "unit",
        "category": "protein"
      },
      {
        "name": "Mix frutos secos",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Prepará: 2 huevos + mix almendras/nueces 30g."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "yogur-griego-con-granola",
    "name": "Yogur griego con granola",
    "description": "200g yogur griego + granola + miel + nueces.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 20,
      "carbs": 35,
      "fats": 12,
      "calories": 330
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Yogur griego",
        "amount": 200,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Granola",
        "amount": 40,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Miel",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Nueces",
        "amount": 15,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Prepará: 200g yogur griego + granola + miel + nueces."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "banana-manteca-de-mani",
    "name": "Banana + manteca de maní",
    "description": "1 banana + 2 cda PB.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 8,
      "carbs": 32,
      "fats": 16,
      "calories": 300
    },
    "freezable": false,
    "tags": [
      "rápido",
      "entrenamiento"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Banana",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Manteca de maní",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Prepará: 1 banana + 2 cda PB."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "zanahoria-hummus",
    "name": "Zanahoria + hummus",
    "description": "Bastones del prep + hummus.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 10,
      "carbs": 22,
      "fats": 12,
      "calories": 240
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Zanahoria",
        "amount": 150,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Hummus",
        "amount": 60,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Prepará: Bastones del prep + hummus."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "shake-express",
    "name": "Shake express",
    "description": "Leche + proteína + banana + PB.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 30,
      "carbs": 40,
      "fats": 12,
      "calories": 390
    },
    "freezable": false,
    "tags": [
      "rápido",
      "entrenamiento"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Leche",
        "amount": 250,
        "unit": "ml",
        "category": "dairy"
      },
      {
        "name": "Proteína en polvo",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Banana",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Manteca de maní",
        "amount": 15,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Prepará: Leche + proteína + banana + PB."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "cottage-cheese-con-frutas",
    "name": "Cottage cheese con frutas",
    "description": "200g cottage + arándanos o durazno.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 24,
      "carbs": 15,
      "fats": 5,
      "calories": 200
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Cottage cheese",
        "amount": 200,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Arándanos",
        "amount": 80,
        "unit": "g",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Prepará: 200g cottage + arándanos o durazno."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "edamames-con-sal",
    "name": "Edamames con sal",
    "description": "150g edamames congelados, micro 3 min.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 17,
      "carbs": 12,
      "fats": 8,
      "calories": 190
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Edamames congelados",
        "amount": 150,
        "unit": "g",
        "category": "frozen"
      }
    ],
    "steps": [
      {
        "text": "Prepará: 150g edamames congelados, micro 3 min."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "mix-proteico-rapido",
    "name": "Mix proteico rápido",
    "description": "Jamón + queso + frutos secos.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 20,
      "carbs": 4,
      "fats": 18,
      "calories": 260
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "breakfast",
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Jamón cocido",
        "amount": 50,
        "unit": "g",
        "category": "protein"
      },
      {
        "name": "Queso fresco",
        "amount": 30,
        "unit": "g",
        "category": "dairy"
      },
      {
        "name": "Mix frutos secos",
        "amount": 20,
        "unit": "g",
        "category": "pantry"
      }
    ],
    "steps": [
      {
        "text": "Prepará: Jamón + queso + frutos secos."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "licuado-verde-proteico",
    "name": "Licuado verde proteico",
    "description": "Espinaca + banana congelada + proteína + leche.",
    "category": "breakfast",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 26,
      "carbs": 30,
      "fats": 6,
      "calories": 280
    },
    "freezable": false,
    "tags": [
      "rápido"
    ],
    "mealSlots": [
      "breakfast"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Espinaca",
        "amount": 50,
        "unit": "g",
        "category": "produce"
      },
      {
        "name": "Banana",
        "amount": 1,
        "unit": "unit",
        "category": "produce"
      },
      {
        "name": "Proteína en polvo",
        "amount": 30,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Leche",
        "amount": 200,
        "unit": "ml",
        "category": "dairy"
      }
    ],
    "steps": [
      {
        "text": "Prepará: Espinaca + banana congelada + proteína + leche."
      }
    ],
    "prepDependencies": []
  },
  {
    "slug": "barrita-de-arroz-y-pb",
    "name": "Barrita de arroz y PB",
    "description": "Rice cake + manteca maní + miel + banana.",
    "category": "snack",
    "difficulty": 1,
    "servingsDefault": 1,
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 0,
    "macrosPerServing": {
      "protein": 12,
      "carbs": 35,
      "fats": 14,
      "calories": 310
    },
    "freezable": false,
    "tags": [
      "rápido",
      "entrenamiento"
    ],
    "mealSlots": [
      "snack"
    ],
    "variationSlugs": [],
    "ingredients": [
      {
        "name": "Rice cakes",
        "amount": 2,
        "unit": "unit",
        "category": "pantry"
      },
      {
        "name": "Manteca de maní",
        "amount": 20,
        "unit": "g",
        "category": "pantry"
      },
      {
        "name": "Miel",
        "amount": 1,
        "unit": "tbsp",
        "category": "pantry"
      },
      {
        "name": "Banana",
        "amount": 0.5,
        "unit": "unit",
        "category": "produce"
      }
    ],
    "steps": [
      {
        "text": "Prepará: Rice cake + manteca maní + miel + banana."
      }
    ],
    "prepDependencies": []
  }
];
