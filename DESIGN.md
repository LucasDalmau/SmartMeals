# SmartMeals v3 — Dirección de diseño

> Basado en el prototipo aprobado por Lucas (junio 2026), con mejoras de arquitectura
> de navegación. Toda decisión de color, tipografía y espaciado del código deriva de
> este documento.

## Dirección: "Recetario de mercado"

Verde profundo de hoja + superficies crema cálidas + serif editorial. La estética
toma el lenguaje de los recetarios impresos y los mercados de barrio: el verde
comunica comida fresca y hábito saludable sin caer en los defaults de IA
(crema/terracota, dark con verde ácido), y la serif Fraunces le da a cada receta
peso de "página de libro de cocina" mientras DM Sans mantiene la UI legible a 13px.
Los colores por categoría funcionan como sistema de orientación rápida (stripe
lateral en cards), no como decoración.

## Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display | **Fraunces** (serif, opsz variable) | Títulos de recetas, headers de pantalla, nombres de día, logo |
| Body | **DM Sans** | Todo lo demás: UI, párrafos, labels, botones |

- Carga vía `next/font/google` con subsetting. **Nunca system fonts.**
- Escala: logo 22px/700 · h1 pantalla 22–28px (Fraunces) · título card 15–17px
  (Fraunces 600) · body 14px · secundario 12–13px · labels overline 10–11px/700
  uppercase con letter-spacing 0.5–1px.

## Color

### Marca y semánticos

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--brand` | `#1B3A2D` | `#3E7A5E` | Acción primaria, nav activa, logo |
| `--brand-mid` | `#2D5C47` | `#5E9B7E` | Texto secundario sobre brand-soft |
| `--brand-soft` | `#E8F0EC` | `#23362D` | Fondos de banners/badges de marca |
| `--background` | `#FFFFFF` | `#1C1C1E` | Fondo app |
| `--surface` | `#F5F0E8` | `#2C2C2E` | Cards, inputs (crema cálido, no gris) |
| `--surface-2` | `#EDE8DF` | `#3A3A3C` | Superficie elevada / hover |
| `--foreground` | `#1C1C1E` | `#F2F2F7` | Texto principal |
| `--muted-fg` | `#6B7280` | `#98989E` | Texto secundario |
| `--border` | `#E5E7EB` | `#3A3A3C` | Bordes y divisores |
| `--danger` | `#E63946` | `#FF6B6B` | Quitar/borrar, calorías |
| `--warning` | `#D97706` | `#F59E0B` | Avisos, "queda poco" en despensa |
| `--star` | `#FBBF24` | `#FBBF24` | Favoritos |

### Categorías de receta (stripe de 5px en cards + hero del detalle)

| Categoría | Color |
|---|---|
| Pollo | `#1B3A2D` |
| Carne | `#7C2D12` |
| Pasta | `#92400E` |
| Vegetariano | `#166534` |
| Para dos | `#4C1D95` |
| Desayuno | `#1E3A5F` |
| Snack | `#92400E` |

### Slots de comida

Desayuno `#1E3A5F` · Almuerzo `#166534` · Merienda `#92400E` · Cena `#1B3A2D`.

## Espaciado y forma

- Grilla de 4px. Padding lateral de pantalla: 20px.
- Radios: cards 12px · botones/inputs 10px · pills/badges 20px (full).
- Tap targets **mínimo 44px** (filas de slot ~52px). Sin hover-only en mobile.
- Sombras: no. La jerarquía se logra con superficie crema sobre fondo blanco y bordes.

## Navegación

- **Mobile (primario):** bottom nav fija con 5 tabs — Plan, Recetas, Compras,
  Macros, Perfil. Ícono 22px + label 10px. Activa: brand + peso 700.
- **Desktop:** sidebar izquierda con los mismos 5 destinos. Contenido máx. 430px
  en vistas tipo feed (la app es mobile-first incluso en desktop).
- **Prep** no es tab: es card destacada dentro de Plan (deriva de la semana).
- **Despensa** no es tab: es segmento dentro de Compras (es el input de la lista).

## Patrones de componente

- **Card de receta:** fila horizontal — stripe de categoría 5px, cuerpo con título
  Fraunces, metadata (`Xg prot · X kcal · X min`) en 11–12px muted, badges a la
  derecha (freezer, favorito).
- **Hero de detalle:** bloque de color de categoría full-bleed con título Fraunces
  28px blanco, descripción y stats (tiempo, kcal, dificultad ⬥).
- **Plan abre en HOY:** hero del día actual arriba, semana completa debajo.
- **Listas de compras agrupadas por góndola** (verduras, proteínas, lácteos,
  despensa…) con headers colapsables; checkbox 22px, ítem completado al 40% de
  opacidad con tachado.
- **Cooking mode:** full-screen, wake lock, texto ≥18px, timers visibles, un paso
  por pantalla, controles gigantes (manos mojadas).
- **Estados vacíos:** emoji 32px + frase corta + acción. Nunca pantalla en blanco.

## Dark mode

Paleta tipo iOS (`#1C1C1E` / `#2C2C2E` / `#3A3A3C`) con brand aclarado para
contraste AA. Toggle persistente (next-themes, estrategia `class`), respeta
`prefers-color-scheme` por defecto.
