// ═══════════════════════════════════════════════════
// MEAL PLAN DATA — Editá este archivo para agregar
// o modificar recetas, snacks y prep items.
// ═══════════════════════════════════════════════════

// ─── PREP ITEMS ───
// Cada item necesita un `id` único que se referencia
// desde las cenas en el campo `prep`.
export const PREP_ITEMS = {
  fresh: [
    { id: "rice", what: "Arroz basmati cocido (1.5kg)", time: 20, tip: "Enfriá destapado. El arroz frío es ideal para arroz frito.", storage: "Heladera 4-5 días en tupper cerrado." },
    { id: "chicken", what: "Pollo cocido desmenuzado (800g)", time: 25, tip: "Hervilo con laurel y sal, desmenuzá con 2 tenedores.", storage: "Heladera 4 días con un poco de caldo. Freezer 3 meses." },
    { id: "eggs", what: "Huevos duros (8 unidades)", time: 12, tip: "10 min desde hervor, pasá a agua helada. No los peles hasta usar.", storage: "Heladera 5 días con cáscara, 3 días pelados." },
    { id: "veggies", what: "Verduras cortadas: brócoli, morrón, verdeo, zanahoria", time: 15, tip: "Separadas en tuppers con papel absorbente.", storage: "Heladera 4-5 días. El brócoli dura menos, usalo primero." },
    { id: "asian_sauce", what: "Salsa base asiática (frasco)", time: 5, tip: "Soja + sésamo + miel + jengibre + ajo. Base para todo lo chino.", storage: "Heladera 2-3 semanas en frasco cerrado." },
    { id: "oats", what: "Overnight oats x2 frascos", time: 5, tip: "Avena + yogur griego + chía + leche. Agarrá y salí.", storage: "Heladera 3 días máximo." },
    { id: "guac", what: "Guacamole casero (opcional)", time: 8, tip: "Palta + limón + cilantro + sal + tomate. Cubrí con film pegado a la superficie.", storage: "Heladera 2 días (el limón frena oxidación)." },
    { id: "tzatziki", what: "Tzatziki / salsa yogur (opcional)", time: 5, tip: "Yogur griego + pepino rallado + ajo + limón + eneldo.", storage: "Heladera 4-5 días." },
  ],
  frozen: [
    { id: "beef_cubes", what: "Carne en cubos (500g en bolsitas de 200g)", time: 10, tip: "Cuadril o nalga. Aplanalos en la bolsa para congelar rápido.", storage: "Freezer 3 meses. Descongelar en heladera 8hs o microondas 2min." },
    { id: "beef_strips", what: "Carne en tiras (500g en bolsitas de 200g)", time: 10, tip: "Cortá semi-congelada para tiras finas perfectas.", storage: "Freezer 3 meses." },
    { id: "wok_mix", what: "Mix verduras wok (bolsas x1 porción)", time: 15, tip: "Morrón + zucchini + zanahoria + chaucha. Congelá en bandeja, luego a bolsa.", storage: "Freezer 2-3 meses. Directo del freezer al wok." },
    { id: "pasta_mix", what: "Mix verduras pasta (bolsas x1 porción)", time: 10, tip: "Zucchini + cebolla + champignones.", storage: "Freezer 2-3 meses." },
    { id: "rice_extra", what: "Porciones extra de arroz (bolsitas 200g)", time: 5, tip: "Aplastá las bolsitas. Microondas 3 min.", storage: "Freezer 2 meses." },
    { id: "sofrito", what: "Cebolla sofrita (cubeteras/frascos)", time: 25, tip: "3 cebollas grandes a fuego bajo 20 min. Base instantánea.", storage: "Freezer 3 meses en cubeteras o frascos." },
    { id: "ground_beef", what: "Carne picada porcionada (bolsitas 200g)", time: 5, tip: "Aplastá en bolsas finas para descongelar rápido.", storage: "Freezer 3 meses." },
  ]
};

// ─── DINNERS ───
// Campos:
//   id       — número único
//   name     — nombre del plato
//   cat      — categoría (chinese, normal, mexican, mediterranean, american, pareja)
//   emoji    — emoji decorativo
//   time     — tiempo de cocción (con prep ya hecho)
//   prot     — proteína estimada por porción
//   cal      — calorías estimadas
//   sv       — porciones (1 o 2)
//   diff     — dificultad (1=fácil, 2=media, 3=desafío)
//   skill    — técnica culinaria a practicar
//   prep     — array de IDs de PREP_ITEMS necesarios
//   shop     — array de {i: "item", c: "categoría"} extras a comprar
//   steps    — pasos de cocción

export const DINNERS = [
  // ── CHINESE / ASIAN ──
  { id: 1, name: "Pollo Teriyaki con Arroz y Brócoli", cat: "chinese", emoji: "🥢", time: "12 min", prot: "48g", cal: "580", sv: 1, diff: 1,
    skill: "Wok a fuego alto — la clave del stir-fry",
    prep: ["chicken", "rice", "veggies", "asian_sauce"],
    shop: [{ i: "Semillas de sésamo", c: "Despensa" }, { i: "Miel", c: "Despensa" }],
    steps: ["Wok a fuego MÁXIMO hasta que humee.", "Aceite + pollo desmenuzado, 2 min.", "Brócoli del prep, 2 min más.", "Salsa asiática + miel, glasear 1 min.", "Sobre arroz + sésamo."]
  },
  { id: 2, name: "Arroz Frito con Pollo y Verduras", cat: "chinese", emoji: "🍳", time: "10 min", prot: "42g", cal: "550", sv: 1, diff: 1,
    skill: "Arroz frito — arroz frío + fuego máximo",
    prep: ["rice", "chicken", "veggies"],
    shop: [{ i: "Salsa de soja", c: "Despensa" }, { i: "Aceite de sésamo", c: "Despensa" }],
    steps: ["Wok al máximo. Arroz TIENE que estar frío.", "Huevos revueltos rápido, sacar.", "Pollo + verduras, 2 min.", "Arroz contra el wok, no mover 30seg = tostado.", "Todo junto + soja + sésamo + verdeo."]
  },
  { id: 3, name: "Wok de Carne con Verduras", cat: "chinese", emoji: "🥩", time: "12 min", prot: "50g", cal: "520", sv: 1, diff: 2,
    skill: "Sellado rápido + maicena para salsa espesa",
    prep: ["beef_strips", "wok_mix", "asian_sauce", "rice"],
    shop: [{ i: "Maicena", c: "Despensa" }],
    steps: ["Carne del freezer a heladera a la mañana.", "Mezclá con 1 cda maicena (queda tierna).", "Wok al máximo, carne en tandas 30seg.", "Verduras freezer directo, 3 min.", "Volver carne + salsa. Servir con arroz."]
  },
  { id: 4, name: "Fideos Lo Mein", cat: "chinese", emoji: "🍜", time: "15 min", prot: "44g", cal: "560", sv: 1, diff: 2,
    skill: "Fideos para wok — al dente y aceitados",
    prep: ["chicken", "veggies", "asian_sauce"],
    shop: [{ i: "Fideos spaghetti o de arroz 120g", c: "Carbs" }, { i: "Salsa de ostras", c: "Despensa" }],
    steps: ["Fideos 1 min MENOS. Colar + aceite sésamo.", "Wok: pollo + verduras, 2 min.", "Fideos + salsa asiática + ostras.", "Saltear con pinzas 2 min.", "Verdeo picado arriba."]
  },
  { id: 5, name: "Pollo Agridulce", cat: "chinese", emoji: "🍊", time: "15 min", prot: "46g", cal: "590", sv: 1, diff: 2,
    skill: "Salsa agridulce casera — balance dulce/ácido",
    prep: ["chicken", "rice", "veggies"],
    shop: [{ i: "Ketchup", c: "Despensa" }, { i: "Vinagre de manzana", c: "Despensa" }, { i: "Maicena", c: "Despensa" }],
    steps: ["Mezclar ketchup + soja + vinagre + miel = salsa.", "Wok: pollo + morrón, 3 min.", "Agregar salsa, 1 min.", "Maicena en agua fría, echar y revolver 30seg.", "Sobre arroz."]
  },
  { id: 6, name: "Chaufa de Pollo", cat: "chinese", emoji: "🇵🇪", time: "12 min", prot: "44g", cal: "570", sv: 1, diff: 1,
    skill: "Fuego alto sostenido — no sobrecargar el wok",
    prep: ["rice", "chicken", "veggies"],
    shop: [{ i: "Jengibre fresco", c: "Verduras" }, { i: "Salsa de soja", c: "Despensa" }],
    steps: ["Wok al máximo. Huevos revueltos, sacar.", "Pollo + jengibre, 1 min.", "Arroz frío, aplastar contra wok. 30seg sin tocar.", "Repetir tostado 2 veces.", "Huevo + soja + sésamo + verdeo."]
  },
  { id: 7, name: "Carne con Brócoli y Salsa de Ostras", cat: "chinese", emoji: "🥦", time: "12 min", prot: "50g", cal: "500", sv: 1, diff: 2,
    skill: "Velveting — técnica china para carne sedosa",
    prep: ["beef_strips", "veggies", "rice"],
    shop: [{ i: "Salsa de ostras", c: "Despensa" }, { i: "Maicena", c: "Despensa" }, { i: "Ajo", c: "Verduras" }],
    steps: ["Marinar carne 5min en maicena + soja + agua (velveting).", "Wok máximo, carne en tandas 30seg.", "Ajo + brócoli, 2 min con splash de agua.", "Volver carne + salsa de ostras, 30seg.", "Con arroz."]
  },
  { id: 8, name: "Pollo Kung Pao", cat: "chinese", emoji: "🌶️", time: "12 min", prot: "46g", cal: "540", sv: 1, diff: 2,
    skill: "Salsa Kung Pao + manejo del picante",
    prep: ["chicken", "veggies", "asian_sauce", "rice"],
    shop: [{ i: "Maní tostado", c: "Despensa" }, { i: "Ají seco o sriracha", c: "Despensa" }, { i: "Vinagre de arroz", c: "Despensa" }],
    steps: ["Wok al máximo: pollo + morrón, 2 min.", "Salsa asiática + vinagre + ají (al gusto).", "Toque de maicena si querés más espesa.", "Maní tostado al final para crocante.", "Sobre arroz."]
  },
  { id: 9, name: "Carne Mongoliana", cat: "chinese", emoji: "🔥", time: "12 min", prot: "48g", cal: "530", sv: 1, diff: 2,
    skill: "Reducción de salsa — que glaseé sin quemarse",
    prep: ["beef_strips", "veggies", "rice"],
    shop: [{ i: "Azúcar negra o moscabado", c: "Despensa" }, { i: "Salsa de soja", c: "Despensa" }, { i: "Jengibre", c: "Verduras" }],
    steps: ["Carne con maicena, sellar en tandas.", "En el wok: ajo + jengibre 30seg.", "Soja + azúcar negra + agua, reducir 2 min.", "Volver la carne, glasear.", "Verdeo generoso + arroz."]
  },
  { id: 10, name: "Arroz Cantonés con Pollo", cat: "chinese", emoji: "🍚", time: "10 min", prot: "40g", cal: "530", sv: 1, diff: 1,
    skill: "Arroz salteado estilo cantón — arvejas + jamón",
    prep: ["rice", "chicken", "veggies"],
    shop: [{ i: "Arvejas congeladas", c: "Verduras" }, { i: "Jamón cocido 50g", c: "Proteínas" }],
    steps: ["Wok máximo: huevos revueltos, sacar.", "Jamón en cubitos + arvejas, 1 min.", "Arroz frío, tostar contra el wok.", "Pollo + huevo + soja.", "Verdeo + sésamo."]
  },

  // ── CLASSIC ──
  { id: 11, name: "Bowl de Carne, Batata y Huevo", cat: "normal", emoji: "🥩", time: "18 min", prot: "52g", cal: "620", sv: 1, diff: 1,
    skill: "Sellado de cubos — dorar sin sobre-revolver",
    prep: ["beef_cubes", "eggs"],
    shop: [{ i: "Batata x1", c: "Verduras" }, { i: "Rúcula", c: "Verduras" }, { i: "Tomates cherry", c: "Verduras" }],
    steps: ["Batata rodajas finas al micro 5 min.", "Sartén MUY caliente, carne salpimentada, 3-4 min.", "Armar: batata, rúcula, carne, huevos, cherrys.", "Aceite oliva + sal."]
  },
  { id: 12, name: "Pasta con Pollo al Pesto", cat: "normal", emoji: "🍝", time: "15 min", prot: "45g", cal: "560", sv: 1, diff: 1,
    skill: "Pasta al dente + ligar con agua de cocción",
    prep: ["chicken", "pasta_mix"],
    shop: [{ i: "Penne o fusilli 120g", c: "Carbs" }, { i: "Pesto (frasco)", c: "Despensa" }, { i: "Parmesano", c: "Lácteos" }],
    steps: ["Agua con sal a hervir. Pasta 1 min MENOS.", "Saltear verduras freezer 3 min + pollo 2 min.", "Guardar medio vaso agua cocción.", "Pasta + pollo + verduras + pesto + agua hasta que ligue.", "Parmesano."]
  },
  { id: 13, name: "Omelette Proteico con Verduras", cat: "normal", emoji: "🥚", time: "8 min", prot: "40g", cal: "420", sv: 1, diff: 1,
    skill: "Omelette francés — cremoso adentro",
    prep: ["veggies", "chicken"],
    shop: [{ i: "Queso (lo que tengas)", c: "Lácteos" }, { i: "Manteca", c: "Lácteos" }],
    steps: ["Batir 3 huevos sin sobre-batir. Sal y pimienta.", "Sartén antiadherente a MEDIO-BAJO con manteca.", "Volcar huevos, empujar bordes al centro.", "Cuando casi cuajado (brilloso arriba), relleno en una mitad.", "Doblar, deslizar. Babé adentro."]
  },
  { id: 14, name: "Wrap Proteico de Carne", cat: "normal", emoji: "🌯", time: "10 min", prot: "48g", cal: "530", sv: 1, diff: 1,
    skill: "Enrollado firme de wrap",
    prep: ["beef_strips", "sofrito", "veggies"],
    shop: [{ i: "Tortillas grandes x2", c: "Carbs" }, { i: "Queso crema o hummus", c: "Lácteos" }, { i: "Lechuga", c: "Verduras" }],
    steps: ["Carne con sal + pimienta + pimentón, 3 min.", "Tortilla en misma sartén 20seg.", "Untar, lechuga, carne, sofrito, tomate.", "Doblar costados, enrollar apretado.", "Sellar 30seg en sartén = crujiente."]
  },
  { id: 15, name: "Hamburguesa Smash Casera", cat: "normal", emoji: "🍔", time: "15 min", prot: "52g", cal: "600", sv: 1, diff: 2,
    skill: "Smash burger — reacción Maillard al máximo",
    prep: ["sofrito", "ground_beef"],
    shop: [{ i: "Pan de hamburguesa", c: "Carbs" }, { i: "Queso cheddar", c: "Lácteos" }, { i: "Lechuga y tomate", c: "Verduras" }],
    steps: ["Bolita de carne, NO trabajarla mucho.", "Sartén bien caliente, APLASTAR con espátula.", "2 min sin tocar. Vuelta, queso arriba, 1 min.", "Pan tostado en la grasa.", "Armar con sofrito del freezer."]
  },

  // ── MEXICAN ──
  { id: 16, name: "Tacos de Carne Salteada", cat: "mexican", emoji: "🌮", time: "12 min", prot: "46g", cal: "520", sv: 1, diff: 1,
    skill: "Sartén de hierro para tacos — máximo calor",
    prep: ["beef_strips", "veggies", "sofrito"],
    shop: [{ i: "Tortillas de maíz x6", c: "Carbs" }, { i: "Palta x1", c: "Verduras" }, { i: "Limón", c: "Verduras" }, { i: "Cilantro", c: "Verduras" }],
    steps: ["Carne con comino + pimentón + sal, 3 min fuego alto.", "Calentar tortillas en sartén seca 20seg/lado.", "Armar: carne, palta, sofrito, cilantro.", "Limón arriba."]
  },
  { id: 17, name: "Burrito Bowl de Pollo", cat: "mexican", emoji: "🥗", time: "10 min", prot: "48g", cal: "590", sv: 1, diff: 1,
    skill: "Bowl assembly — capas de sabor y textura",
    prep: ["chicken", "rice", "veggies"],
    shop: [{ i: "Porotos negros (lata)", c: "Despensa" }, { i: "Palta x1", c: "Verduras" }, { i: "Crema agria o yogur", c: "Lácteos" }, { i: "Comino", c: "Despensa" }],
    steps: ["Calentar pollo con comino + pimentón.", "Calentar porotos negros con sal.", "Armar bowl: arroz, pollo, porotos, morrón, palta.", "Crema agria + limón arriba."]
  },
  { id: 18, name: "Quesadillas de Pollo", cat: "mexican", emoji: "🧀", time: "10 min", prot: "42g", cal: "540", sv: 1, diff: 1,
    skill: "Quesadilla crocante — fuego medio-bajo, paciencia",
    prep: ["chicken", "veggies", "sofrito"],
    shop: [{ i: "Tortillas grandes x2", c: "Carbs" }, { i: "Queso mozzarella", c: "Lácteos" }],
    steps: ["Tortilla en sartén a fuego medio.", "Queso en toda la superficie, pollo, morrón, sofrito.", "Doblar al medio, cocinar 2 min/lado.", "Cortar en triángulos. Con guacamole."]
  },
  { id: 19, name: "Fajitas de Carne", cat: "mexican", emoji: "🫑", time: "12 min", prot: "46g", cal: "510", sv: 1, diff: 1,
    skill: "Salteado de fajitas — tiras con color",
    prep: ["beef_strips", "veggies", "sofrito"],
    shop: [{ i: "Tortillas x4", c: "Carbs" }, { i: "Crema agria", c: "Lácteos" }, { i: "Comino y pimentón", c: "Despensa" }],
    steps: ["Carne con comino + pimentón + sal, fuego alto 2 min.", "Morrón + cebolla, 2 min más.", "Tortillas calientes en sartén seca.", "Armar fajitas con crema agria."]
  },
  { id: 20, name: "Nachos Proteicos con Carne", cat: "mexican", emoji: "🔺", time: "15 min", prot: "44g", cal: "620", sv: 1, diff: 1,
    skill: "Nachos al horno — capas uniformes de queso",
    prep: ["ground_beef", "sofrito", "veggies"],
    shop: [{ i: "Nachos/tortilla chips", c: "Carbs" }, { i: "Queso cheddar rallado", c: "Lácteos" }, { i: "Porotos negros (lata)", c: "Despensa" }, { i: "Palta", c: "Verduras" }, { i: "Jalapeños (opc.)", c: "Verduras" }],
    steps: ["Carne picada con comino + pimentón, 5 min.", "Nachos en fuente, carne + porotos + queso.", "Horno/grill 5 min hasta gratinar.", "Palta + jalapeños + crema arriba."]
  },

  // ── MEDITERRANEAN ──
  { id: 21, name: "Pollo Griego con Ensalada", cat: "mediterranean", emoji: "🇬🇷", time: "12 min", prot: "48g", cal: "480", sv: 1, diff: 1,
    skill: "Condimentar pollo estilo mediterráneo",
    prep: ["chicken", "tzatziki"],
    shop: [{ i: "Pepino", c: "Verduras" }, { i: "Tomate", c: "Verduras" }, { i: "Aceitunas negras", c: "Despensa" }, { i: "Queso feta", c: "Lácteos" }, { i: "Orégano", c: "Despensa" }],
    steps: ["Pollo del prep con orégano + limón + aceite, calentar.", "Ensalada: tomate, pepino, aceitunas, feta.", "Tzatziki del prep como aderezo.", "Opcional: pan pita caliente."]
  },
  { id: 22, name: "Shakshuka Proteica", cat: "mediterranean", emoji: "🍳", time: "15 min", prot: "36g", cal: "420", sv: 1, diff: 2,
    skill: "Huevos pochados en salsa — punto justo",
    prep: ["sofrito", "veggies"],
    shop: [{ i: "Tomates triturados (400ml)", c: "Despensa" }, { i: "Comino y pimentón", c: "Despensa" }, { i: "Queso feta", c: "Lácteos" }, { i: "Pan para mojar", c: "Carbs" }],
    steps: ["Sofrito del freezer + ajo + morrón, 2 min.", "Tomates + comino + pimentón, 5 min.", "Hacer huecos, romper 3 huevos adentro.", "Tapar, 4-5 min hasta clara cuajada, yema líquida.", "Feta desmenuzado + pan."]
  },
  { id: 23, name: "Bowl Mediterráneo de Pollo", cat: "mediterranean", emoji: "🫒", time: "10 min", prot: "46g", cal: "530", sv: 1, diff: 1,
    skill: "Bowl assembly con hummus como base",
    prep: ["chicken", "rice", "veggies"],
    shop: [{ i: "Hummus", c: "Despensa" }, { i: "Pepino", c: "Verduras" }, { i: "Tomates cherry", c: "Verduras" }, { i: "Aceitunas", c: "Despensa" }],
    steps: ["Base de hummus generoso en el bowl.", "Arroz + pollo con za'atar o comino.", "Pepino, cherrys, aceitunas, morrón.", "Aceite oliva + limón."]
  },
  { id: 24, name: "Pasta al Limón con Pollo", cat: "mediterranean", emoji: "🍋", time: "15 min", prot: "44g", cal: "540", sv: 1, diff: 2,
    skill: "Salsa al limón — emulsión con manteca y pasta water",
    prep: ["chicken"],
    shop: [{ i: "Spaghetti 120g", c: "Carbs" }, { i: "Limones x2", c: "Verduras" }, { i: "Parmesano", c: "Lácteos" }, { i: "Manteca", c: "Lácteos" }],
    steps: ["Pasta al dente, guardar MUCHO agua de cocción.", "En sartén: manteca + jugo de 1.5 limones + ralladura.", "Pasta + agua cocción, revolver con energía (emulsiona).", "Pollo + parmesano generoso.", "Pimienta negra + toque de limón."]
  },

  // ── AMERICAN ──
  { id: 25, name: "Mac & Cheese Proteico", cat: "american", emoji: "🧀", time: "18 min", prot: "44g", cal: "620", sv: 1, diff: 2,
    skill: "Salsa de queso sin grumos — roux básico",
    prep: ["chicken"],
    shop: [{ i: "Macarrones 150g", c: "Carbs" }, { i: "Queso cheddar 100g", c: "Lácteos" }, { i: "Leche", c: "Lácteos" }, { i: "Manteca", c: "Lácteos" }, { i: "Mostaza", c: "Despensa" }],
    steps: ["Pasta al dente. Roux: manteca + 1cda harina, 1 min.", "Leche de a poco revolviendo.", "Cuando espese: queso + mostaza + sal.", "Mezclar con pasta + pollo.", "Opcional: gratinar 3 min."]
  },
  { id: 26, name: "Philly Cheesesteak Casero", cat: "american", emoji: "🥖", time: "12 min", prot: "48g", cal: "580", sv: 1, diff: 2,
    skill: "Carne ultra-fina + queso derretido",
    prep: ["beef_strips", "sofrito", "veggies"],
    shop: [{ i: "Pan baguette o submarino", c: "Carbs" }, { i: "Queso provolone o cheddar", c: "Lácteos" }],
    steps: ["Carne en tiras fuego alto 2 min.", "Morrón + sofrito del freezer, 1 min.", "Queso arriba, tapar para derretir.", "Pan abierto, cargar todo.", "Opcional: mostaza o mayo."]
  },
  { id: 27, name: "BBQ Chicken Bowl", cat: "american", emoji: "🍖", time: "10 min", prot: "46g", cal: "560", sv: 1, diff: 1,
    skill: "Glasear con BBQ sin quemar el azúcar",
    prep: ["chicken", "rice"],
    shop: [{ i: "Salsa BBQ", c: "Despensa" }, { i: "Choclo (lata o congelado)", c: "Verduras" }, { i: "Porotos negros (lata)", c: "Despensa" }],
    steps: ["Pollo en sartén con BBQ, 2 min glaseando.", "Choclo + porotos calientes.", "Bowl: arroz, pollo BBQ, choclo, porotos.", "Cilantro o verdeo."]
  },

  // ── PARA DOS ──
  { id: 28, name: "Risotto de Hongos y Pollo", cat: "pareja", emoji: "🍷", time: "30 min", prot: "38g/p", cal: "520/p", sv: 2, diff: 3,
    skill: "Risotto — tostado, caldo gradual, mantecatura",
    prep: ["chicken", "sofrito"],
    shop: [{ i: "Arroz arbóreo 300g", c: "Carbs" }, { i: "Champignones 200g", c: "Verduras" }, { i: "Caldo de verdura 1L", c: "Despensa" }, { i: "Vino blanco", c: "Despensa" }, { i: "Manteca", c: "Lácteos" }, { i: "Parmesano", c: "Lácteos" }],
    steps: ["Sofrito del freezer + champignones, 3 min.", "Arroz, tostar 2 min.", "Vino blanco, evaporar.", "Caldo de a cucharón, revolver. ~18 min.", "Fuera del fuego: manteca + parmesano (mantecatura). Pollo."]
  },
  { id: 29, name: "Pasta Bolognesa", cat: "pareja", emoji: "🍝", time: "20 min", prot: "42g/p", cal: "580/p", sv: 2, diff: 2,
    skill: "Sofrito + dorar carne sin revolver",
    prep: ["sofrito", "pasta_mix", "ground_beef"],
    shop: [{ i: "Spaghetti 250g", c: "Carbs" }, { i: "Passata tomate 400ml", c: "Despensa" }, { i: "Ajo", c: "Verduras" }, { i: "Parmesano", c: "Lácteos" }, { i: "Albahaca", c: "Verduras" }],
    steps: ["Sofrito freezer + ajo, 1 min.", "Carne picada, 5 min sin revolver mucho.", "Verduras freezer + passata, fuego bajo 10 min.", "Pasta al dente + agua cocción.", "Parmesano + albahaca."]
  },
  { id: 30, name: "Wok Grande para Compartir", cat: "pareja", emoji: "🥡", time: "15 min", prot: "44g/p", cal: "540/p", sv: 2, diff: 2,
    skill: "Wok en volumen — cocinar en tandas",
    prep: ["beef_strips", "wok_mix", "rice", "asian_sauce"],
    shop: [{ i: "Salsa de ostras", c: "Despensa" }, { i: "Maní picado", c: "Despensa" }],
    steps: ["Wok máximo. Carne en 2 tandas de 200g.", "Sacar carne. Verduras freezer x2, 3 min.", "Volver carne + salsa asiática + ostras.", "Sobre arroz, maní arriba."]
  },
  { id: 31, name: "Taco Night para Dos", cat: "pareja", emoji: "🌮", time: "15 min", prot: "44g/p", cal: "550/p", sv: 2, diff: 1,
    skill: "Mise en place compartida — todo listo en mesa",
    prep: ["beef_strips", "sofrito", "veggies", "guac"],
    shop: [{ i: "Tortillas x8", c: "Carbs" }, { i: "Crema agria", c: "Lácteos" }, { i: "Queso rallado", c: "Lácteos" }, { i: "Palta x2", c: "Verduras" }, { i: "Limones x2", c: "Verduras" }],
    steps: ["Carne con comino + pimentón, fuego alto 3 min.", "Calentar tortillas.", "Armar mesa con bowls: carne, guac, sofrito, queso, crema, limón.", "Cada uno arma los suyos."]
  },
];

// ─── SNACKS ───
export const SNACKS = [
  { name: "Overnight oats proteicos", emoji: "🫙", when: "AM", prot: "22g", desc: "Avena + yogur griego + chía + banana. Del prep." },
  { name: "Huevos duros + frutos secos", emoji: "🥚", when: "AM/PM", prot: "18g", desc: "2 huevos del prep + mix almendras/nueces 30g." },
  { name: "Yogur griego con granola", emoji: "🥣", when: "PM", prot: "20g", desc: "200g yogur griego + granola + miel + nueces." },
  { name: "Banana + manteca de maní", emoji: "🍌", when: "Pre gym", prot: "8g", desc: "1 banana + 2 cda PB. Energía rápida." },
  { name: "Zanahoria + hummus", emoji: "🥕", when: "PM", prot: "10g", desc: "Bastones del prep + hummus. Volumen, pocas cal." },
  { name: "Shake express", emoji: "🥤", when: "Post gym", prot: "30g", desc: "Leche + scoop proteína + banana + PB. 2 min." },
  { name: "Cottage cheese con frutas", emoji: "🧀", when: "PM", prot: "24g", desc: "200g cottage + arándanos o durazno." },
  { name: "Tostada de palta + huevo", emoji: "🍞", when: "AM", prot: "16g", desc: "Pan integral + medio palta + huevo duro del prep." },
  { name: "Edamames con sal", emoji: "🫛", when: "PM", prot: "17g", desc: "150g edamames congelados, micro 3 min + sal." },
  { name: "Mix proteico rápido", emoji: "🧈", when: "AM/PM", prot: "20g", desc: "Jamón + queso + frutos secos. Zero cocina." },
  { name: "Licuado verde proteico", emoji: "🥬", when: "AM", prot: "26g", desc: "Espinaca + banana congelada + proteína + leche." },
  { name: "Barrita de arroz y PB", emoji: "🍫", when: "Pre gym", prot: "12g", desc: "Rice cake + manteca maní + miel + banana." },
];

// ─── CATEGORY CONFIG ───
export const CATEGORIES = {
  chinese: { label: "China / Asiática", emoji: "🥢", color: "#e85d3a" },
  normal: { label: "Clásica", emoji: "🍽️", color: "#4a9eff" },
  mexican: { label: "Mexicana", emoji: "🌮", color: "#22c55e" },
  mediterranean: { label: "Mediterránea", emoji: "🫒", color: "#f59e0b" },
  american: { label: "Americana", emoji: "🇺🇸", color: "#ef4444" },
  pareja: { label: "Para Dos", emoji: "🍷", color: "#c47ccf" },
};

// ─── BASE PREP SHOPPING (always needed) ───
export const BASE_PREP_SHOPPING = {
  "Proteínas": ["1.2kg pechuga de pollo", "8 huevos", "500g cuadril (cubos)", "500g nalga (tiras)", "300g carne picada"],
  "Base Prep": ["Arroz basmati 1.5kg", "Salsa de soja", "Aceite de sésamo", "Miel", "Jengibre", "Ajo", "Avena", "Yogur griego 1kg", "Semillas de chía", "Leche"],
};
