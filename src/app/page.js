"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { PREP_ITEMS, DINNERS as BASE_DINNERS, SNACKS, CATEGORIES } from "@/data/meals";

const allPrepFlat = [...PREP_ITEMS.fresh, ...PREP_ITEMS.frozen];
const diffLabel = d => d === 1 ? "Fácil" : d === 2 ? "Media" : "Desafío";
const diffColor = d => d === 1 ? "var(--green)" : d === 2 ? "var(--yellow)" : "var(--red)";

function load(key, fb) { if (typeof window === "undefined") return fb; try { const v = localStorage.getItem(`sm_${key}`); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function save(key, v) { try { localStorage.setItem(`sm_${key}`, JSON.stringify(v)); } catch {} }

const emptyRecipe = () => ({
  id: Date.now(), name: "", cat: "chinese", emoji: "🍽️", time: "", sv: 1, diff: 1,
  macros: { prot: 0, carbs: 0, fat: 0, cal: 0 },
  skill: "", prep: [], allIngredients: [{ name: "", qty: 0, unit: "g", cat: "Despensa" }],
  steps: [""], isCustom: true,
});

// ─── Combine ingredients from multiple sources ───
function combineIngredients(sources) {
  const map = {};
  sources.forEach(ing => {
    const key = `${ing.name}__${ing.unit}`;
    if (!map[key]) map[key] = { ...ing, qty: 0 };
    map[key].qty += ing.qty;
  });
  // group by cat
  const grouped = {};
  Object.values(map).forEach(item => {
    if (!grouped[item.cat]) grouped[item.cat] = [];
    grouped[item.cat].push(item);
  });
  return grouped;
}

const CAT_ORDER = ["Proteínas", "Verduras", "Carbs", "Lácteos", "Despensa"];
const CAT_EMOJI = { "Proteínas": "🥩", "Verduras": "🥬", "Carbs": "🍞", "Lácteos": "🧀", "Despensa": "🏪" };

export default function Home() {
  const [tab, setTab] = useState("dinners");
  const [expanded, setExpanded] = useState(null);
  const [prepSec, setPrepSec] = useState("fresh");
  const [hydrated, setHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const [favs, setFavs] = useState({});
  const [snackFavs, setSnackFavs] = useState({});
  const [checked, setChecked] = useState({});
  const [shopChecked, setShopChecked] = useState({});
  const [theme, setTheme] = useState("dark");
  const [customRecipes, setCustomRecipes] = useState([]);
  const [collapsedCats, setCollapsedCats] = useState({});
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    setFavs(load("favs", {})); setSnackFavs(load("snackFavs", {}));
    setChecked(load("checked", {})); setShopChecked(load("shopChecked", {}));
    setTheme(load("theme", "dark")); setCustomRecipes(load("customRecipes", []));
    setCollapsedCats(load("collapsedCats", {})); setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) save("favs", favs); }, [favs, hydrated]);
  useEffect(() => { if (hydrated) save("snackFavs", snackFavs); }, [snackFavs, hydrated]);
  useEffect(() => { if (hydrated) save("checked", checked); }, [checked, hydrated]);
  useEffect(() => { if (hydrated) save("shopChecked", shopChecked); }, [shopChecked, hydrated]);
  useEffect(() => { if (hydrated) save("customRecipes", customRecipes); }, [customRecipes, hydrated]);
  useEffect(() => { if (hydrated) save("collapsedCats", collapsedCats); }, [collapsedCats, hydrated]);
  useEffect(() => { if (hydrated) { save("theme", theme); document.documentElement.setAttribute("data-theme", theme); } }, [theme, hydrated]);

  const ALL_DINNERS = useMemo(() => [...BASE_DINNERS, ...customRecipes], [customRecipes]);
  const toggleFav = useCallback((id, e) => { e.stopPropagation(); setFavs(f => ({ ...f, [id]: !f[id] })); setShopChecked({}); }, []);
  const toggleSnackFav = useCallback((id, e) => { e.stopPropagation(); setSnackFavs(f => ({ ...f, [id]: !f[id] })); setShopChecked({}); }, []);
  const toggleCat = useCallback(cat => setCollapsedCats(p => ({ ...p, [cat]: !p[cat] })), []);
  const toggleCheck = useCallback(k => setChecked(p => ({ ...p, [k]: !p[k] })), []);
  const toggleShopCheck = useCallback(k => setShopChecked(p => ({ ...p, [k]: !p[k] })), []);

  const selectedDinners = useMemo(() => ALL_DINNERS.filter(d => favs[d.id]), [favs, ALL_DINNERS]);
  const selectedSnacks = useMemo(() => SNACKS.filter(s => snackFavs[s.id]), [snackFavs]);
  const selDinCount = selectedDinners.length;
  const selSnackCount = selectedSnacks.length;

  // ─── Ingredient search ───
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const terms = searchQuery.toLowerCase().split(",").map(t => t.trim()).filter(Boolean);
    return ALL_DINNERS.filter(d => {
      const text = [d.name, ...(d.allIngredients || []).map(i => i.name), ...(d.steps || [])].join(" ").toLowerCase();
      return terms.every(t => text.includes(t));
    });
  }, [searchQuery, ALL_DINNERS]);

  const dinnersGrouped = useMemo(() => {
    const g = {}; Object.keys(CATEGORIES).forEach(c => { g[c] = ALL_DINNERS.filter(d => d.cat === c); }); return g;
  }, [ALL_DINNERS]);

  // ─── SMART SHOPPING LIST ───
  const shoppingList = useMemo(() => {
    const allIngs = [];
    selectedDinners.forEach(d => (d.allIngredients || []).forEach(i => allIngs.push({ ...i })));
    selectedSnacks.forEach(s => (s.allIngredients || []).forEach(i => allIngs.push({ ...i })));
    if (!allIngs.length) return null;
    return combineIngredients(allIngs);
  }, [selectedDinners, selectedSnacks]);

  const shopItemCount = useMemo(() => {
    if (!shoppingList) return 0;
    return Object.values(shoppingList).reduce((s, items) => s + items.length, 0);
  }, [shoppingList]);

  const shopCheckedCount = useMemo(() => Object.values(shopChecked).filter(Boolean).length, [shopChecked]);

  // ─── PREP ───
  const neededPrep = useMemo(() => {
    if (!selDinCount) return { items: [], totalMin: 0 };
    const ids = new Set();
    selectedDinners.forEach(d => (d.prep || []).forEach(p => ids.add(p)));
    const items = allPrepFlat.filter(p => ids.has(p.id));
    return { items, totalMin: items.reduce((s, p) => s + p.time, 0) };
  }, [selectedDinners, selDinCount]);

  // ─── MACROS ───
  const weeklyMacros = useMemo(() => {
    const m = { prot: 0, carbs: 0, fat: 0, cal: 0 };
    selectedDinners.forEach(d => {
      if (d.macros) { m.prot += d.macros.prot; m.carbs += d.macros.carbs; m.fat += d.macros.fat; m.cal += d.macros.cal; }
    });
    selectedSnacks.forEach(s => {
      if (s.macros) { m.prot += s.macros.prot; m.carbs += s.macros.carbs; m.fat += s.macros.fat; m.cal += s.macros.cal; }
    });
    return m;
  }, [selectedDinners, selectedSnacks]);

  const dailyAvg = useMemo(() => {
    const days = Math.max(selDinCount, 1);
    return {
      prot: Math.round(weeklyMacros.prot / days),
      carbs: Math.round(weeklyMacros.carbs / days),
      fat: Math.round(weeklyMacros.fat / days),
      cal: Math.round(weeklyMacros.cal / days),
    };
  }, [weeklyMacros, selDinCount]);

  // Recipe CRUD
  const saveRecipe = useCallback((r) => {
    setCustomRecipes(prev => { const idx = prev.findIndex(x => x.id === r.id); if (idx >= 0) { const u = [...prev]; u[idx] = r; return u; } return [...prev, r]; });
    setEditingRecipe(null);
  }, []);
  const deleteRecipe = useCallback((id) => {
    setCustomRecipes(prev => prev.filter(r => r.id !== id));
    setFavs(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  const tabs = [
    { id: "dinners", label: "🍽️ Cenas", sub: `${ALL_DINNERS.length}` },
    { id: "snacks", label: "⚡ Snacks", sub: selSnackCount ? `${selSnackCount}` : "" },
    { id: "shopping", label: "🛒 Compras", sub: shopItemCount ? `${shopCheckedCount}/${shopItemCount}` : "" },
    { id: "prep", label: "🔪 Prep", sub: neededPrep.totalMin ? `~${neededPrep.totalMin}m` : "" },
    { id: "macros", label: "📊 Macros" },
    { id: "creator", label: "➕" },
  ];

  if (!hydrated) return <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#8a8580" }}>Cargando...</div></div>;

  // ─── Dinner Card ───
  const renderCard = (d) => {
    const open = expanded === d.id;
    const ci = CATEGORIES[d.cat] || { label: d.cat, emoji: "🍽️", color: "var(--accent)" };
    return (
      <div key={d.id} style={{ background: "var(--bg-card)", borderRadius: 14, marginBottom: 7, border: `1px solid ${open ? "var(--border-active)" : "var(--border)"}`, overflow: "hidden" }}>
        <div onClick={() => setExpanded(open ? null : d.id)} style={{ padding: "13px 15px", cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 700, background: `${ci.color}18`, color: ci.color, textTransform: "uppercase" }}>{ci.emoji} {ci.label}</span>
                <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 600, background: `${diffColor(d.diff)}18`, color: diffColor(d.diff) }}>{diffLabel(d.diff)}</span>
                {d.sv === 2 && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "var(--purple-bg)", color: "var(--purple)", fontWeight: 600 }}>×2</span>}
                {d.isCustom && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "var(--accent-bg)", color: "var(--accent)", fontWeight: 600 }}>CUSTOM</span>}
              </div>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{d.emoji} {d.name}</h3>
            </div>
            <button onClick={e => toggleFav(d.id, e)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 3, filter: favs[d.id] ? "none" : "grayscale(1) opacity(.3)" }}>⭐</button>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[{ l: "Tiempo", v: d.time }, { l: "Prot", v: `${d.macros?.prot || 0}g` }, { l: "Carbs", v: `${d.macros?.carbs || 0}g` }, { l: "Fat", v: `${d.macros?.fat || 0}g` }, { l: "Cal", v: d.macros?.cal || 0 }].map((s, j) => (
              <div key={j}>
                <div style={{ fontSize: 9, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".5px" }}>{s.l}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        {open && <div style={{ padding: "0 15px 15px", borderTop: "1px solid var(--border)" }}>
          {d.skill && <div style={{ margin: "12px 0", padding: "8px 12px", background: "var(--bg-elevated)", borderRadius: 8, borderLeft: "3px solid var(--accent)" }}>
            <span style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase" }}>Skill</span>
            <p style={{ margin: "2px 0 0", fontSize: 13, fontWeight: 500 }}>{d.skill}</p>
          </div>}
          {d.prep?.length > 0 && <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: "var(--green)", fontWeight: 600 }}>✅ Prep domingo: </span>
            <span style={{ fontSize: 11, color: "var(--green)" }}>{d.prep.map(pid => allPrepFlat.find(p => p.id === pid)?.what || pid).join(" · ")}</span>
          </div>}
          {d.allIngredients?.length > 0 && <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: "var(--amber)", fontWeight: 600 }}>🛒 Ingredientes: </span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{d.allIngredients.map(i => `${i.name} ${i.qty}${i.unit}`).join(" · ")}</span>
          </div>}
          {d.steps?.length > 0 && <>
            <h4 style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: 8 }}>Paso a paso</h4>
            {d.steps.filter(Boolean).map((step, j) => (
              <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 700, color: "var(--accent)" }}>{j + 1}</div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{step}</p>
              </div>
            ))}
          </>}
          {d.isCustom && <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => { setEditingRecipe({ ...d }); setTab("creator"); }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-elevated)", color: "var(--accent)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✏️ Editar</button>
            <button onClick={() => { if (confirm("¿Eliminar?")) deleteRecipe(d.id); }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--red)", background: "transparent", color: "var(--red)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🗑️</button>
          </div>}
        </div>}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 16px", maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, margin: "0 0 2px" }}>SmartMeals</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 11, margin: 0 }}>
            {selDinCount} cenas · {selSnackCount} snacks seleccionados
          </p>
        </div>
        <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{
          width: 38, height: 38, borderRadius: 12, border: "1px solid var(--border)",
          background: "var(--bg-card)", cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{theme === "dark" ? "☀️" : "🌙"}</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "creator" && !editingRecipe) setEditingRecipe(emptyRecipe()); }} style={{
            padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
            background: tab === t.id ? "var(--tab-active-bg)" : "var(--bg-card)", color: tab === t.id ? "var(--tab-active-color)" : "var(--text-secondary)",
          }}>{t.label}{t.sub && <span style={{ marginLeft: 4, fontSize: 10, opacity: .7 }}>{t.sub}</span>}</button>
        ))}
      </div>

      {/* ═══════ DINNERS ═══════ */}
      {tab === "dinners" && <div>
        <div style={{ marginBottom: 14 }}>
          <input type="text" placeholder="🔍 Buscar por ingrediente (ej: pollo, arroz...)" value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSearchMode(!!e.target.value); }}
            style={{ paddingRight: 36 }} />
          {searchQuery && <button onClick={() => { setSearchQuery(""); setSearchMode(false); }} style={{ position: "relative", float: "right", marginTop: -30, marginRight: 10, background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--text-secondary)" }}>✕</button>}
        </div>

        {searchMode ? <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
            {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} para "<strong style={{ color: "var(--text-primary)" }}>{searchQuery}</strong>"
          </div>
          {searchResults.map(renderCard)}
          {!searchResults.length && <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Sin resultados.</div>}
        </div> : <div>
          <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid var(--border)", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            💡 Marcá ⭐ tus cenas → 🛒 Compras se arma sola con todos los ingredientes combinados.
          </div>
          {Object.entries(CATEGORIES).map(([catKey, catInfo]) => {
            const catDinners = dinnersGrouped[catKey] || [];
            if (!catDinners.length) return null;
            const isCollapsed = collapsedCats[catKey];
            return <div key={catKey} style={{ marginBottom: 10 }}>
              <button onClick={() => toggleCat(catKey)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 16px", borderRadius: isCollapsed ? 12 : "12px 12px 0 0",
                border: "1px solid var(--border)", cursor: "pointer", background: "var(--bg-card)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{catInfo.emoji}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{catInfo.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{catDinners.length} recetas · {catDinners.filter(d => favs[d.id]).length} elegidas</div>
                  </div>
                </div>
                <span style={{ fontSize: 18, color: "var(--text-tertiary)", transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform .2s" }}>⌄</span>
              </button>
              {!isCollapsed && <div style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)", borderRadius: "0 0 12px 12px", padding: "8px 8px 2px", background: "var(--bg-elevated)" }}>
                {catDinners.map(renderCard)}
              </div>}
            </div>;
          })}
        </div>}
      </div>}

      {/* ═══════ SNACKS ═══════ */}
      {tab === "snacks" && <div>
        <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: "12px 16px", marginBottom: 10, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Marcá ⭐ los snacks que querés esta semana. Se agregan a la <strong style={{ color: "var(--text-primary)" }}>lista de compras</strong> y al <strong style={{ color: "var(--text-primary)" }}>resumen de macros</strong>.
        </div>
        {SNACKS.map((s) => (
          <div key={s.id} style={{ background: "var(--bg-card)", borderRadius: 12, border: `1px solid ${snackFavs[s.id] ? "var(--green-border)" : "var(--border)"}`, padding: "12px 14px", marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600 }}>{s.emoji} {s.name}</h3>
                <p style={{ margin: "0 0 6px", fontSize: 11, color: "var(--text-secondary)" }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ l: "P", v: s.macros.prot, c: "var(--green)" }, { l: "C", v: s.macros.carbs, c: "var(--blue)" }, { l: "G", v: s.macros.fat, c: "var(--amber)" }, { l: "Cal", v: s.macros.cal, c: "var(--accent)" }].map((m, i) => (
                    <span key={i} style={{ fontSize: 10, color: m.c, fontWeight: 600 }}>{m.l}: {m.v}{m.l !== "Cal" ? "g" : ""}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <button onClick={e => toggleSnackFav(s.id, e)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, filter: snackFavs[s.id] ? "none" : "grayscale(1) opacity(.3)" }}>⭐</button>
                <span style={{ fontSize: 10, color: "var(--text-secondary)" }}>{s.when}</span>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {/* ═══════ SHOPPING — SUPERMARKET MODE ═══════ */}
      {tab === "shopping" && <div>
        {!shoppingList ? (
          <div style={{ textAlign: "center", padding: 50, color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
            <p style={{ margin: 0, fontSize: 14 }}>Elegí cenas con ⭐ y snacks</p>
            <p style={{ margin: "6px 0 0", fontSize: 12 }}>Los ingredientes se combinan automáticamente</p>
          </div>
        ) : <div>
          {/* Summary */}
          <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "12px 16px", marginBottom: 6, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
              Ingredientes para <strong style={{ color: "var(--text-primary)" }}>{selDinCount} cena{selDinCount !== 1 ? "s" : ""}</strong>
              {selSnackCount > 0 && <> + <strong style={{ color: "var(--text-primary)" }}>{selSnackCount} snack{selSnackCount !== 1 ? "s" : ""}</strong></>}:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {selectedDinners.map(d => <span key={d.id} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "var(--accent-bg)", color: "var(--accent)" }}>{d.emoji} {d.name}</span>)}
              {selectedSnacks.map(s => <span key={s.id} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "var(--green-bg)", color: "var(--green)" }}>{s.emoji} {s.name}</span>)}
            </div>
          </div>

          {/* Progress */}
          {shopItemCount > 0 && <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "10px 16px", marginBottom: 14, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Progreso en el súper</span>
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>{shopCheckedCount}/{shopItemCount}</span>
            </div>
            <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(shopCheckedCount / shopItemCount) * 100}%`, background: "var(--green)", borderRadius: 3, transition: "width .3s" }} />
            </div>
          </div>}

          {/* Items by category */}
          {CAT_ORDER.map(cat => {
            const items = shoppingList[cat];
            if (!items?.length) return null;
            return <div key={cat} style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: "12px 16px", marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>{CAT_EMOJI[cat] || "📦"} {cat}</div>
              {items.map((item, j) => {
                const key = `${item.name}__${item.unit}`;
                const done = shopChecked[key];
                return <div key={j} onClick={() => toggleShopCheck(key)} style={{
                  display: "flex", gap: 10, alignItems: "center", padding: "7px 0", cursor: "pointer",
                  borderTop: j ? "1px solid var(--bg-elevated)" : "none",
                  opacity: done ? .45 : 1, transition: "opacity .2s"
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    border: `2px solid ${done ? "var(--green)" : "var(--check-border)"}`,
                    background: done ? "var(--green)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{done && <span style={{ color: "var(--bg-primary)", fontSize: 11, fontWeight: 700 }}>✓</span>}</div>
                  <span style={{ fontSize: 13, flex: 1, textDecoration: done ? "line-through" : "none", color: done ? "var(--text-tertiary)" : "var(--text-primary)" }}>{item.name}</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
                    {item.qty % 1 === 0 ? item.qty : item.qty.toFixed(1)}{item.unit !== "u" ? item.unit : ""}
                    {item.unit === "u" && ` unid.`}
                  </span>
                </div>;
              })}
            </div>;
          })}

          {shopCheckedCount > 0 && <button onClick={() => setShopChecked({})} style={{
            marginTop: 8, padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
            background: "var(--bg-elevated)", color: "var(--text-secondary)", cursor: "pointer", fontSize: 12, width: "100%"
          }}>↻ Resetear checks</button>}
        </div>}
      </div>}

      {/* ═══════ PREP ═══════ */}
      {tab === "prep" && <div>
        {selDinCount > 0 && <div style={{ background: "var(--green-bg)", borderRadius: 10, padding: "12px 16px", marginBottom: 14, border: "1px solid var(--green-border)", fontSize: 13, color: "var(--green)", lineHeight: 1.6 }}>
          📊 Para tus <strong>{selDinCount} cenas</strong>: {neededPrep.items.length} tareas — <strong>~{neededPrep.totalMin} min</strong> el domingo.
        </div>}
        {!selDinCount && <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "12px 16px", marginBottom: 14, border: "1px solid var(--border)", fontSize: 12, color: "var(--text-secondary)" }}>
          Elegí cenas con ⭐ y el prep se adapta automáticamente.
        </div>}

        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {[["fresh", "❄️", "Fresco"], ["frozen", "🧊", "Freezer"]].map(([k, icon, label]) => (
            <button key={k} onClick={() => setPrepSec(k)} style={{
              flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left",
              background: prepSec === k ? "var(--bg-card)" : "var(--bg-elevated)",
              border: `1px solid ${prepSec === k ? "var(--accent)" : "var(--border)"}`
            }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: prepSec === k ? "var(--text-primary)" : "var(--text-secondary)" }}>{label}</div>
            </button>
          ))}
        </div>

        {PREP_ITEMS[prepSec].map((item, i) => {
          const key = `${prepSec}-${i}`;
          const needed = selDinCount > 0 && selectedDinners.some(d => (d.prep || []).includes(item.id));
          return <div key={key} onClick={() => toggleCheck(key)} style={{
            background: "var(--bg-card)", borderRadius: 12, border: `1px solid ${needed ? "var(--green-border)" : "var(--border)"}`,
            padding: "12px 14px", marginBottom: 6, cursor: "pointer", opacity: checked[key] ? .45 : 1, transition: "opacity .2s"
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2, border: `2px solid ${checked[key] ? "var(--accent)" : "var(--check-border)"}`, background: checked[key] ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {checked[key] && <span style={{ color: "var(--bg-primary)", fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, textDecoration: checked[key] ? "line-through" : "none", color: checked[key] ? "var(--text-tertiary)" : "var(--text-primary)" }}>{item.what}</span>
                  <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8 }}>~{item.time}m</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 3 }}>💡 {item.tip}</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>📦 {item.storage}</div>
                {selDinCount > 0 && <div style={{ marginTop: 3 }}>
                  {needed ? <span style={{ fontSize: 10, color: "var(--green)" }}>✅ Necesario</span> : <span style={{ fontSize: 10, color: "var(--text-muted)" }}>— No necesario</span>}
                </div>}
              </div>
            </div>
          </div>;
        })}
      </div>}

      {/* ═══════ MACROS ═══════ */}
      {tab === "macros" && <div>
        {(selDinCount + selSnackCount) === 0 ? (
          <div style={{ textAlign: "center", padding: 50, color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
            <p style={{ margin: 0, fontSize: 14 }}>Elegí cenas y snacks para ver el resumen</p>
          </div>
        ) : <div>
          {/* Weekly totals */}
          <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: "18px", marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Resumen semanal</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "Proteína", val: weeklyMacros.prot, unit: "g", color: "var(--green)", bg: "var(--green-bg)" },
                { label: "Carbos", val: weeklyMacros.carbs, unit: "g", color: "var(--blue)", bg: `var(--blue)11` },
                { label: "Grasas", val: weeklyMacros.fat, unit: "g", color: "var(--amber)", bg: `var(--amber)11` },
                { label: "Calorías", val: weeklyMacros.cal, unit: "", color: "var(--accent)", bg: "var(--accent-bg)" },
              ].map((m, i) => (
                <div key={i} style={{ background: m.bg, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.val}<span style={{ fontSize: 12, fontWeight: 500 }}>{m.unit}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily average */}
          <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: "18px", marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Promedio diario</h3>
            <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "0 0 14px" }}>Basado en {selDinCount} cena{selDinCount !== 1 ? "s" : ""} + {selSnackCount} snack{selSnackCount !== 1 ? "s" : ""} seleccionados</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "Prot", val: dailyAvg.prot, unit: "g", color: "var(--green)" },
                { label: "Carbs", val: dailyAvg.carbs, unit: "g", color: "var(--blue)" },
                { label: "Fat", val: dailyAvg.fat, unit: "g", color: "var(--amber)" },
                { label: "Cal", val: dailyAvg.cal, unit: "", color: "var(--accent)" },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: "center", padding: "8px" }}>
                  <div style={{ fontSize: 9, color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 2 }}>{m.label}/día</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.val}<span style={{ fontSize: 11 }}>{m.unit}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: "16px", marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Detalle por comida</h3>
            {selectedDinners.map(d => (
              <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: "1px solid var(--bg-elevated)" }}>
                <div>
                  <span style={{ fontSize: 13 }}>{d.emoji} {d.name}</span>
                  {d.sv === 2 && <span style={{ fontSize: 10, color: "var(--purple)", marginLeft: 6 }}>(tu porción)</span>}
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: 11 }}>
                  <span style={{ color: "var(--green)" }}>{d.macros.prot}p</span>
                  <span style={{ color: "var(--blue)" }}>{d.macros.carbs}c</span>
                  <span style={{ color: "var(--amber)" }}>{d.macros.fat}g</span>
                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>{d.macros.cal}</span>
                </div>
              </div>
            ))}
            {selectedSnacks.length > 0 && <>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", margin: "10px 0 6px", textTransform: "uppercase" }}>Snacks</div>
              {selectedSnacks.map(s => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: "1px solid var(--bg-elevated)" }}>
                  <span style={{ fontSize: 13 }}>{s.emoji} {s.name}</span>
                  <div style={{ display: "flex", gap: 10, fontSize: 11 }}>
                    <span style={{ color: "var(--green)" }}>{s.macros.prot}p</span>
                    <span style={{ color: "var(--blue)" }}>{s.macros.carbs}c</span>
                    <span style={{ color: "var(--amber)" }}>{s.macros.fat}g</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{s.macros.cal}</span>
                  </div>
                </div>
              ))}
            </>}
          </div>

          <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "10px 14px", border: "1px solid var(--border)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            💡 Los macros de recetas para 2 ya están calculados como tu porción individual. Los snacks se suman tal cual.
          </div>
        </div>}
      </div>}

      {/* ═══════ RECIPE CREATOR ═══════ */}
      {tab === "creator" && editingRecipe && <RecipeCreator recipe={editingRecipe} onChange={setEditingRecipe} onSave={saveRecipe}
        onCancel={() => { setEditingRecipe(null); setTab("dinners"); }} />}

      {/* Footer */}
      <div style={{ marginTop: 24, padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: 10, border: "1px solid var(--border)", textAlign: "center", fontSize: 11, color: "var(--text-muted)" }}>
        SmartMeals v2.1 · ⭐ Elegí → 🛒 Comprá → 🔪 Preparé → 📊 Trackeá
      </div>
    </div>
  );
}

// ═══════ RECIPE CREATOR ═══════
function RecipeCreator({ recipe, onChange, onSave, onCancel }) {
  const update = (f, v) => onChange({ ...recipe, [f]: v });
  const updateMacro = (f, v) => onChange({ ...recipe, macros: { ...recipe.macros, [f]: parseInt(v) || 0 } });

  const updateIng = (idx, field, val) => {
    const ings = [...(recipe.allIngredients || [])];
    ings[idx] = { ...ings[idx], [field]: field === "qty" ? (parseFloat(val) || 0) : val };
    onChange({ ...recipe, allIngredients: ings });
  };
  const addIng = () => onChange({ ...recipe, allIngredients: [...(recipe.allIngredients || []), { name: "", qty: 0, unit: "g", cat: "Despensa" }] });
  const removeIng = (idx) => onChange({ ...recipe, allIngredients: (recipe.allIngredients || []).filter((_, i) => i !== idx) });

  const updateStep = (idx, v) => { const s = [...recipe.steps]; s[idx] = v; onChange({ ...recipe, steps: s }); };
  const addStep = () => onChange({ ...recipe, steps: [...recipe.steps, ""] });
  const removeStep = (idx) => onChange({ ...recipe, steps: recipe.steps.filter((_, i) => i !== idx) });

  const canSave = recipe.name.trim() && recipe.steps.some(s => s.trim());
  const emojiOptions = ["🍽️", "🥢", "🍳", "🥩", "🍜", "🍊", "🌶️", "🔥", "🍚", "🥦", "🍝", "🥚", "🌯", "🍔", "🌮", "🥗", "🧀", "🫑", "🇬🇷", "🍋", "🫒", "🥖", "🍖", "🍷", "🥡"];
  const lbl = { fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{recipe.name || "Nueva Receta"}</h2>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--text-secondary)" }}>✕</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><label style={lbl}>Nombre</label><input value={recipe.name} onChange={e => update("name", e.target.value)} placeholder="Ej: Wok de pollo" /></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={lbl}>Categoría</label><select value={recipe.cat} onChange={e => update("cat", e.target.value)}>
            {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
          </select></div>
          <div><label style={lbl}>Dificultad</label><select value={recipe.diff} onChange={e => update("diff", parseInt(e.target.value))}>
            <option value={1}>Fácil</option><option value={2}>Media</option><option value={3}>Desafío</option>
          </select></div>
          <div><label style={lbl}>Porciones</label><select value={recipe.sv} onChange={e => update("sv", parseInt(e.target.value))}>
            <option value={1}>1 persona</option><option value={2}>2 personas</option>
          </select></div>
          <div><label style={lbl}>Tiempo</label><input value={recipe.time} onChange={e => update("time", e.target.value)} placeholder="15 min" /></div>
        </div>

        <div><label style={lbl}>Emoji</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {emojiOptions.map(em => (
              <button key={em} onClick={() => update("emoji", em)} style={{
                width: 30, height: 30, borderRadius: 6, border: `1px solid ${recipe.emoji === em ? "var(--accent)" : "var(--border)"}`,
                background: recipe.emoji === em ? "var(--accent-bg)" : "var(--bg-input)", cursor: "pointer", fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{em}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
          <div><label style={lbl}>Proteína (g)</label><input type="number" value={recipe.macros.prot || ""} onChange={e => updateMacro("prot", e.target.value)} /></div>
          <div><label style={lbl}>Carbos (g)</label><input type="number" value={recipe.macros.carbs || ""} onChange={e => updateMacro("carbs", e.target.value)} /></div>
          <div><label style={lbl}>Grasas (g)</label><input type="number" value={recipe.macros.fat || ""} onChange={e => updateMacro("fat", e.target.value)} /></div>
          <div><label style={lbl}>Calorías</label><input type="number" value={recipe.macros.cal || ""} onChange={e => updateMacro("cal", e.target.value)} /></div>
        </div>

        <div><label style={lbl}>Skill culinaria (opcional)</label><input value={recipe.skill || ""} onChange={e => update("skill", e.target.value)} placeholder="Ej: Wok a fuego alto" /></div>

        {/* Ingredients */}
        <div><label style={lbl}>Ingredientes (para lista de compras)</label>
          {(recipe.allIngredients || []).map((ing, idx) => (
            <div key={idx} style={{ display: "flex", gap: 4, marginBottom: 6 }}>
              <input value={ing.name} onChange={e => updateIng(idx, "name", e.target.value)} placeholder="Ingrediente" style={{ flex: 3 }} />
              <input type="number" value={ing.qty || ""} onChange={e => updateIng(idx, "qty", e.target.value)} placeholder="Qty" style={{ flex: 1 }} />
              <select value={ing.unit} onChange={e => updateIng(idx, "unit", e.target.value)} style={{ flex: 1 }}>
                {["g", "ml", "u", "cda", "cdta", "L", "rebanadas", "dientes"].map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <select value={ing.cat} onChange={e => updateIng(idx, "cat", e.target.value)} style={{ flex: 1.5 }}>
                {CAT_ORDER.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => removeIng(idx)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", padding: "0 6px", color: "var(--red)" }}>−</button>
            </div>
          ))}
          <button onClick={addIng} style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", padding: "6px", color: "var(--accent)", fontSize: 12, fontWeight: 600, width: "100%" }}>+ Ingrediente</button>
        </div>

        {/* Prep items */}
        <div><label style={lbl}>Items de prep dominical</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {allPrepFlat.map(p => {
              const sel = (recipe.prep || []).includes(p.id);
              return <button key={p.id} onClick={() => {
                if (sel) update("prep", recipe.prep.filter(x => x !== p.id));
                else update("prep", [...(recipe.prep || []), p.id]);
              }} style={{
                padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontSize: 11,
                border: `1px solid ${sel ? "var(--green-border)" : "var(--border)"}`,
                background: sel ? "var(--green-bg)" : "var(--bg-input)", color: sel ? "var(--green)" : "var(--text-secondary)",
              }}>{sel ? "✓ " : ""}{p.what}</button>;
            })}
          </div>
        </div>

        {/* Steps */}
        <div><label style={lbl}>Pasos</label>
          {recipe.steps.map((step, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 8, fontSize: 10, fontWeight: 700, color: "var(--accent)" }}>{idx + 1}</div>
              <textarea value={step} onChange={e => updateStep(idx, e.target.value)} placeholder={`Paso ${idx + 1}`} rows={2} style={{ flex: 1 }} />
              {recipe.steps.length > 1 && <button onClick={() => removeStep(idx)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", padding: "0 6px", color: "var(--red)", marginTop: 6 }}>−</button>}
            </div>
          ))}
          <button onClick={addStep} style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", padding: "6px", color: "var(--accent)", fontSize: 12, fontWeight: 600, width: "100%" }}>+ Paso</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8, paddingBottom: 20 }}>
          <button onClick={() => { if (canSave) onSave(recipe); }} style={{
            flex: 1, padding: "12px", borderRadius: 10, border: "none", cursor: canSave ? "pointer" : "not-allowed",
            background: canSave ? "var(--accent)" : "var(--border)", color: canSave ? "var(--bg-primary)" : "var(--text-tertiary)",
            fontSize: 14, fontWeight: 700,
          }}>💾 Guardar</button>
          <button onClick={onCancel} style={{ padding: "12px 20px", borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer", fontSize: 14 }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
