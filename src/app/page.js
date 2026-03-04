"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { PREP_ITEMS, DINNERS as BASE_DINNERS, SNACKS, CATEGORIES, BASE_PREP_SHOPPING } from "@/data/meals";

const allPrepFlat = [...PREP_ITEMS.fresh, ...PREP_ITEMS.frozen];
const diffLabel = d => d === 1 ? "Fácil" : d === 2 ? "Media" : "Desafío";
const diffColor = d => d === 1 ? "var(--green)" : d === 2 ? "var(--yellow)" : "var(--red)";

// ─── localStorage ───
function load(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(`sm_${key}`); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(`sm_${key}`, JSON.stringify(value)); } catch {}
}

// ─── Empty recipe template ───
const emptyRecipe = () => ({
  id: Date.now(),
  name: "", cat: "chinese", emoji: "🍽️", time: "", prot: "", cal: "", sv: 1, diff: 1,
  skill: "", prep: [], shop: [], steps: [""],
  ingredients: [""], // for search — plain text list
  isCustom: true,
});

export default function Home() {
  const [tab, setTab] = useState("dinners");
  const [expanded, setExpanded] = useState(null);
  const [prepSec, setPrepSec] = useState("fresh");
  const [hydrated, setHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  // Persisted
  const [favs, setFavs] = useState({});
  const [checked, setChecked] = useState({});
  const [theme, setTheme] = useState("dark");
  const [customRecipes, setCustomRecipes] = useState([]);
  const [collapsedCats, setCollapsedCats] = useState({});

  // Recipe creator state
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Hydrate
  useEffect(() => {
    setFavs(load("favs", {}));
    setChecked(load("checked", {}));
    setTheme(load("theme", "dark"));
    setCustomRecipes(load("customRecipes", []));
    setCollapsedCats(load("collapsedCats", {}));
    setHydrated(true);
  }, []);

  // Save
  useEffect(() => { if (hydrated) save("favs", favs); }, [favs, hydrated]);
  useEffect(() => { if (hydrated) save("checked", checked); }, [checked, hydrated]);
  useEffect(() => { if (hydrated) save("customRecipes", customRecipes); }, [customRecipes, hydrated]);
  useEffect(() => { if (hydrated) save("collapsedCats", collapsedCats); }, [collapsedCats, hydrated]);
  useEffect(() => {
    if (hydrated) {
      save("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, hydrated]);

  // All dinners = base + custom
  const ALL_DINNERS = useMemo(() => [...BASE_DINNERS, ...customRecipes], [customRecipes]);

  const toggleCheck = useCallback(k => setChecked(p => ({ ...p, [k]: !p[k] })), []);
  const toggleFav = useCallback((id, e) => { e.stopPropagation(); setFavs(f => ({ ...f, [id]: !f[id] })); }, []);
  const toggleCat = useCallback(cat => setCollapsedCats(p => ({ ...p, [cat]: !p[cat] })), []);

  const selectedDinners = useMemo(() => ALL_DINNERS.filter(d => favs[d.id]), [favs, ALL_DINNERS]);
  const selectedCount = selectedDinners.length;

  // ─── Ingredient search ───
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const terms = searchQuery.toLowerCase().split(",").map(t => t.trim()).filter(Boolean);
    return ALL_DINNERS.filter(d => {
      const allText = [
        d.name,
        ...(d.shop || []).map(s => s.i),
        ...(d.ingredients || []),
        ...(d.prep || []).map(pid => {
          const p = allPrepFlat.find(x => x.id === pid);
          return p ? p.what : "";
        }),
        ...(d.steps || []),
      ].join(" ").toLowerCase();
      return terms.every(term => allText.includes(term));
    });
  }, [searchQuery, ALL_DINNERS]);

  // ─── Grouped dinners by category ───
  const dinnersGrouped = useMemo(() => {
    const groups = {};
    Object.keys(CATEGORIES).forEach(cat => {
      groups[cat] = ALL_DINNERS.filter(d => d.cat === cat);
    });
    return groups;
  }, [ALL_DINNERS]);

  // Shopping list
  const shoppingList = useMemo(() => {
    if (!selectedCount) return null;
    const items = {};
    selectedDinners.forEach(d => {
      (d.shop || []).forEach(s => {
        const key = s.i;
        if (!items[key]) items[key] = { name: s.i, cat: s.c, count: 1 };
        else items[key].count++;
      });
    });
    const grouped = {};
    Object.values(items).forEach(item => {
      if (!grouped[item.cat]) grouped[item.cat] = [];
      grouped[item.cat].push(item);
    });
    return grouped;
  }, [selectedDinners, selectedCount]);

  // Prep estimator
  const neededPrep = useMemo(() => {
    if (!selectedCount) return { items: [], totalMin: 0 };
    const ids = new Set();
    selectedDinners.forEach(d => (d.prep || []).forEach(p => ids.add(p)));
    const items = allPrepFlat.filter(p => ids.has(p.id));
    const totalMin = items.reduce((s, p) => s + p.time, 0);
    return { items, totalMin };
  }, [selectedDinners, selectedCount]);

  // ─── Recipe CRUD ───
  const saveRecipe = useCallback((recipe) => {
    setCustomRecipes(prev => {
      const idx = prev.findIndex(r => r.id === recipe.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = recipe;
        return updated;
      }
      return [...prev, recipe];
    });
    setEditingRecipe(null);
  }, []);

  const deleteRecipe = useCallback((id) => {
    setCustomRecipes(prev => prev.filter(r => r.id !== id));
    setFavs(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  // ─── Tabs ───
  const tabs = [
    { id: "dinners", label: "🍽️ Cenas", sub: `${ALL_DINNERS.length}` },
    { id: "shopping", label: "🛒 Compras", sub: selectedCount ? `${selectedCount}` : "" },
    { id: "prep", label: "🔪 Prep", sub: neededPrep.totalMin ? `~${neededPrep.totalMin}m` : "" },
    { id: "snacks", label: "⚡ Snacks" },
    { id: "creator", label: "➕ Nueva" },
  ];

  if (!hydrated) {
    return <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#8a8580", fontSize: 14 }}>Cargando...</div>
    </div>;
  }

  // ─── Render a dinner card ───
  const renderDinnerCard = (d) => {
    const open = expanded === d.id;
    const ci = CATEGORIES[d.cat] || { label: d.cat, emoji: "🍽️", color: "var(--accent)" };
    return (
      <div key={d.id} style={{ background: "var(--bg-card)", borderRadius: 14, marginBottom: 7, border: `1px solid ${open ? "var(--border-active)" : "var(--border)"}`, overflow: "hidden" }}>
        <div onClick={() => setExpanded(open ? null : d.id)} style={{ padding: "14px 16px", cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 700, background: `${ci.color}18`, color: ci.color, textTransform: "uppercase", letterSpacing: ".3px" }}>
                  {ci.emoji} {ci.label}
                </span>
                <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 600, background: `${diffColor(d.diff)}18`, color: diffColor(d.diff) }}>
                  {diffLabel(d.diff)}
                </span>
                {d.sv === 2 && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "var(--purple-bg)", color: "var(--purple)", fontWeight: 600 }}>×2</span>}
                {d.isCustom && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "var(--accent-bg)", color: "var(--accent)", fontWeight: 600 }}>CUSTOM</span>}
              </div>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{d.emoji} {d.name}</h3>
            </div>
            <button onClick={e => toggleFav(d.id, e)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 3, filter: favs[d.id] ? "none" : "grayscale(1) opacity(.3)" }}>⭐</button>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            {[{ l: "Tiempo", v: d.time }, { l: "Prot", v: d.prot }, { l: "Cal", v: d.cal }].map((s, j) => (
              <div key={j}>
                <div style={{ fontSize: 9, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".5px" }}>{s.l}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        {open && (
          <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border)" }}>
            {d.skill && <div style={{ margin: "12px 0", padding: "8px 12px", background: "var(--bg-elevated)", borderRadius: 8, borderLeft: "3px solid var(--accent)" }}>
              <span style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px" }}>Skill culinaria</span>
              <p style={{ margin: "3px 0 0", fontSize: 13, fontWeight: 500 }}>{d.skill}</p>
            </div>}
            {d.prep?.length > 0 && <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: "var(--green)", fontWeight: 600 }}>✅ Del prep: </span>
              <span style={{ fontSize: 11, color: "var(--green)" }}>{d.prep.map(pid => allPrepFlat.find(p => p.id === pid)?.what.split("(")[0].trim() || pid).join(" · ")}</span>
            </div>}
            {d.shop?.length > 0 && <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: "var(--amber)", fontWeight: 600 }}>🛒 Comprar: </span>
              <span style={{ fontSize: 11, color: "var(--amber)" }}>{d.shop.map(s => s.i).join(" · ")}</span>
            </div>}
            {d.ingredients?.length > 0 && d.isCustom && <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: "var(--blue)", fontWeight: 600 }}>📝 Ingredientes: </span>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{d.ingredients.filter(Boolean).join(" · ")}</span>
            </div>}
            {d.steps?.length > 0 && <>
              <h4 style={{ fontSize: 10, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Paso a paso</h4>
              {d.steps.filter(Boolean).map((step, j) => (
                <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 700, color: "var(--accent)" }}>{j + 1}</div>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
            </>}
            {d.isCustom && <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button onClick={() => { setEditingRecipe({ ...d }); setTab("creator"); }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-elevated)", color: "var(--accent)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✏️ Editar</button>
              <button onClick={() => { if (confirm("¿Eliminar esta receta?")) deleteRecipe(d.id); }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--red)", background: "transparent", color: "var(--red)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🗑️ Eliminar</button>
            </div>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 16px", maxWidth: 700, margin: "0 auto" }}>

      {/* ─── Header ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, margin: "0 0 2px" }}>SmartMeals</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 11, margin: 0 }}>
            {ALL_DINNERS.length} cenas · {SNACKS.length} snacks
          </p>
        </div>
        <button
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
          style={{
            width: 40, height: 40, borderRadius: 12, border: "1px solid var(--border)",
            background: "var(--bg-card)", cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ─── Tabs ─── */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "creator" && !editingRecipe) setEditingRecipe(emptyRecipe()); }} style={{
            padding: "8px 13px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
            background: tab === t.id ? "var(--tab-active-bg)" : "var(--bg-card)",
            color: tab === t.id ? "var(--tab-active-color)" : "var(--text-secondary)",
          }}>
            {t.label}{t.sub && <span style={{ marginLeft: 4, fontSize: 10, opacity: .7 }}>{t.sub}</span>}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════ DINNERS ═══════════════════════════════ */}
      {tab === "dinners" && <div>

        {/* Search bar */}
        <div style={{ marginBottom: 14, position: "relative" }}>
          <input
            type="text"
            placeholder="🔍 Buscar por ingrediente (ej: pollo, arroz, palta...)"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSearchMode(!!e.target.value); }}
            style={{ paddingRight: 36 }}
          />
          {searchQuery && <button onClick={() => { setSearchQuery(""); setSearchMode(false); }} style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--text-secondary)"
          }}>✕</button>}
        </div>

        {searchMode ? (
          /* ─── Search results ─── */
          <div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
              {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} para "<strong style={{ color: "var(--text-primary)" }}>{searchQuery}</strong>"
            </div>
            {searchResults.map(d => renderDinnerCard(d))}
            {!searchResults.length && <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              No hay recetas con esos ingredientes. Probá con otros términos o agregá una receta nueva.
            </div>}
          </div>
        ) : (
          /* ─── Collapsible categories ─── */
          <div>
            <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid var(--border)", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              💡 Marcá ⭐ para elegir tus cenas. Se guardan entre sesiones. Buscá por ingrediente arriba.
            </div>

            {Object.entries(CATEGORIES).map(([catKey, catInfo]) => {
              const catDinners = dinnersGrouped[catKey] || [];
              if (!catDinners.length) return null;
              const isCollapsed = collapsedCats[catKey];
              return (
                <div key={catKey} style={{ marginBottom: 10 }}>
                  {/* Category header */}
                  <button onClick={() => toggleCat(catKey)} style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", borderRadius: isCollapsed ? 12 : "12px 12px 0 0",
                    border: "1px solid var(--border)", cursor: "pointer",
                    background: "var(--bg-card)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{catInfo.emoji}</span>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{catInfo.label}</div>
                        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                          {catDinners.length} recetas · {catDinners.filter(d => favs[d.id]).length} elegidas
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: "var(--text-tertiary)", transition: "transform .2s", transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)" }}>⌄</span>
                  </button>

                  {/* Category dinners */}
                  {!isCollapsed && (
                    <div style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)", borderRadius: "0 0 12px 12px", padding: "8px 8px 2px", background: "var(--bg-elevated)" }}>
                      {catDinners.map(d => renderDinnerCard(d))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>}

      {/* ═══════════════════════════════ SHOPPING ═══════════════════════════════ */}
      {tab === "shopping" && <div>
        {!selectedCount ? (
          <div style={{ textAlign: "center", padding: 50, color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
            <p style={{ margin: 0, fontSize: 14 }}>Elegí cenas con ⭐ en la pestaña Cenas</p>
            <p style={{ margin: "6px 0 0", fontSize: 12 }}>La lista se arma automáticamente</p>
          </div>
        ) : (<div>
          <div style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "12px 16px", marginBottom: 14, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
              Lista para <strong style={{ color: "var(--text-primary)" }}>{selectedCount} cena{selectedCount > 1 ? "s" : ""}</strong>:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {selectedDinners.map(d => <span key={d.id} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "var(--accent-bg)", color: "var(--accent)" }}>{d.emoji} {d.name}</span>)}
            </div>
          </div>

          <h3 style={{ fontSize: 13, fontWeight: 600, margin: "18px 0 8px" }}>🔪 Base del Prep (siempre)</h3>
          {Object.entries(BASE_PREP_SHOPPING).map(([cat, items]) => (
            <div key={cat} style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: "12px 16px", marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{cat}</div>
              {items.map((item, j) => <div key={j} style={{ fontSize: 13, color: "var(--text-secondary)", padding: "3px 0", borderTop: j ? "1px solid var(--bg-elevated)" : "none" }}>{item}</div>)}
            </div>
          ))}

          {shoppingList && Object.keys(shoppingList).length > 0 && <>
            <h3 style={{ fontSize: 13, fontWeight: 600, margin: "18px 0 8px" }}>🍽️ Extras según tus cenas</h3>
            {Object.entries(shoppingList).map(([cat, items]) => (
              <div key={cat} style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: "12px 16px", marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{cat}</div>
                {items.map((item, j) => <div key={j} style={{ fontSize: 13, color: "var(--text-secondary)", padding: "3px 0", borderTop: j ? "1px solid var(--bg-elevated)" : "none" }}>
                  {item.name}{item.count > 1 && <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: 6 }}>×{item.count}</span>}
                </div>)}
              </div>
            ))}
          </>}
        </div>)}
      </div>}

      {/* ═══════════════════════════════ PREP ═══════════════════════════════ */}
      {tab === "prep" && <div>
        {selectedCount > 0 && <div style={{ background: "var(--green-bg)", borderRadius: 10, padding: "12px 16px", marginBottom: 14, border: "1px solid var(--green-border)", fontSize: 13, color: "var(--green)", lineHeight: 1.6 }}>
          📊 Para tus <strong>{selectedCount} cenas</strong>: {neededPrep.items.length} tareas — <strong>~{neededPrep.totalMin} minutos</strong> el domingo.
        </div>}

        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {[["fresh", "❄️", "Fresco (4-5 días)"], ["frozen", "🧊", "Freezer (2-3 meses)"]].map(([k, icon, label]) => (
            <button key={k} onClick={() => setPrepSec(k)} style={{
              flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left",
              background: prepSec === k ? "var(--bg-card)" : "var(--bg-elevated)",
              border: `1px solid ${prepSec === k ? "var(--accent)" : "var(--border)"}`
            }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: prepSec === k ? "var(--text-primary)" : "var(--text-secondary)" }}>{label}</div>
            </button>
          ))}
        </div>

        {prepSec === "frozen" && <div style={{ background: "var(--prep-bg)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid var(--prep-border)", fontSize: 12, color: "var(--prep-text)", lineHeight: 1.6 }}>
          🧊 <strong style={{ color: "var(--prep-strong)" }}>Tip:</strong> Prepará doble cada 2 domingos.
        </div>}

        {PREP_ITEMS[prepSec].map((item, i) => {
          const key = `${prepSec}-${i}`;
          const needed = selectedCount > 0 && selectedDinners.some(d => (d.prep || []).includes(item.id));
          return <div key={key} onClick={() => toggleCheck(key)} style={{
            background: "var(--bg-card)", borderRadius: 12, border: `1px solid ${needed ? "var(--green-border)" : "var(--border)"}`,
            padding: "12px 14px", marginBottom: 6, cursor: "pointer",
            opacity: checked[key] ? .45 : 1, transition: "opacity .2s"
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                border: `2px solid ${checked[key] ? "var(--accent)" : "var(--check-border)"}`,
                background: checked[key] ? "var(--accent)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {checked[key] && <span style={{ color: "var(--bg-primary)", fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, textDecoration: checked[key] ? "line-through" : "none", color: checked[key] ? "var(--text-tertiary)" : "var(--text-primary)" }}>{item.what}</span>
                  <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8 }}>~{item.time}min</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 3 }}>💡 {item.tip}</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>📦 {item.storage}</div>
                {selectedCount > 0 && <div style={{ marginTop: 3 }}>
                  {needed
                    ? <span style={{ fontSize: 10, color: "var(--green)" }}>✅ Necesario</span>
                    : <span style={{ fontSize: 10, color: "var(--text-muted)" }}>— No necesario esta semana</span>}
                </div>}
              </div>
            </div>
          </div>;
        })}
      </div>}

      {/* ═══════════════════════════════ SNACKS ═══════════════════════════════ */}
      {tab === "snacks" && <div>
        <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", padding: "12px 16px", marginBottom: 10, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Para <strong style={{ color: "var(--text-primary)" }}>antes de salir (8:00)</strong> y <strong style={{ color: "var(--text-primary)" }}>al volver (19:00)</strong>. Todos con buena proteína.
        </div>
        {SNACKS.map((s, i) => (
          <div key={i} style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: "12px 14px", marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600 }}>{s.emoji} {s.name}</h3>
                <p style={{ margin: 0, fontSize: 11, color: "var(--text-secondary)" }}>{s.desc}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "var(--green-bg)", color: "var(--green)", fontWeight: 600 }}>{s.prot}</div>
                <div style={{ fontSize: 10, color: "var(--text-secondary)", marginTop: 3 }}>{s.when}</div>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {/* ═══════════════════════════════ RECIPE CREATOR ═══════════════════════════════ */}
      {tab === "creator" && editingRecipe && <RecipeCreator
        recipe={editingRecipe}
        onChange={setEditingRecipe}
        onSave={saveRecipe}
        onCancel={() => { setEditingRecipe(null); setTab("dinners"); }}
      />}

      {/* Footer */}
      <div style={{ marginTop: 24, padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: 10, border: "1px solid var(--border)", textAlign: "center", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>
        SmartMeals v2.0 · ⭐ Elegí → 🛒 Compras → 🔪 Prep · {theme === "dark" ? "☀️" : "🌙"} para cambiar tema
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// RECIPE CREATOR COMPONENT
// ═══════════════════════════════════════════
function RecipeCreator({ recipe, onChange, onSave, onCancel }) {
  const update = (field, value) => onChange({ ...recipe, [field]: value });

  const updateStep = (idx, val) => {
    const steps = [...recipe.steps];
    steps[idx] = val;
    onChange({ ...recipe, steps });
  };
  const addStep = () => onChange({ ...recipe, steps: [...recipe.steps, ""] });
  const removeStep = (idx) => onChange({ ...recipe, steps: recipe.steps.filter((_, i) => i !== idx) });

  const updateIngredient = (idx, val) => {
    const ingredients = [...(recipe.ingredients || [])];
    ingredients[idx] = val;
    onChange({ ...recipe, ingredients });
  };
  const addIngredient = () => onChange({ ...recipe, ingredients: [...(recipe.ingredients || []), ""] });
  const removeIngredient = (idx) => onChange({ ...recipe, ingredients: (recipe.ingredients || []).filter((_, i) => i !== idx) });

  const updateShop = (idx, field, val) => {
    const shop = [...(recipe.shop || [])];
    shop[idx] = { ...shop[idx], [field]: val };
    onChange({ ...recipe, shop });
  };
  const addShop = () => onChange({ ...recipe, shop: [...(recipe.shop || []), { i: "", c: "Despensa" }] });
  const removeShop = (idx) => onChange({ ...recipe, shop: (recipe.shop || []).filter((_, i) => i !== idx) });

  const canSave = recipe.name.trim() && recipe.steps.some(s => s.trim());

  const emojiOptions = ["🍽️", "🥢", "🍳", "🥩", "🍜", "🍊", "🌶️", "🔥", "🍚", "🥦", "🍝", "🥚", "🌯", "🍔", "🌮", "🥗", "🧀", "🫑", "🔺", "🇬🇷", "🍋", "🫒", "🥖", "🍖", "🍷", "🥡", "🇵🇪", "🐟", "🥘", "🫔"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
          {recipe.id && !recipe.name ? "Nueva Receta" : recipe.name || "Editando..."}
        </h2>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--text-secondary)" }}>✕ Cerrar</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Name */}
        <div>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Nombre del plato</label>
          <input value={recipe.name} onChange={e => update("name", e.target.value)} placeholder="Ej: Wok de pollo con fideos" />
        </div>

        {/* Row: emoji, category, difficulty, servings */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Categoría</label>
            <select value={recipe.cat} onChange={e => update("cat", e.target.value)}>
              {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Dificultad</label>
            <select value={recipe.diff} onChange={e => update("diff", parseInt(e.target.value))}>
              <option value={1}>Fácil</option>
              <option value={2}>Media</option>
              <option value={3}>Desafío</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Porciones</label>
            <select value={recipe.sv} onChange={e => update("sv", parseInt(e.target.value))}>
              <option value={1}>1 persona</option>
              <option value={2}>2 personas</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Emoji</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {emojiOptions.slice(0, 12).map(em => (
                <button key={em} onClick={() => update("emoji", em)} style={{
                  width: 30, height: 30, borderRadius: 6, border: `1px solid ${recipe.emoji === em ? "var(--accent)" : "var(--border)"}`,
                  background: recipe.emoji === em ? "var(--accent-bg)" : "var(--bg-input)",
                  cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center"
                }}>{em}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Row: time, protein, calories */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Tiempo</label>
            <input value={recipe.time} onChange={e => update("time", e.target.value)} placeholder="15 min" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Proteína</label>
            <input value={recipe.prot} onChange={e => update("prot", e.target.value)} placeholder="45g" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Calorías</label>
            <input value={recipe.cal} onChange={e => update("cal", e.target.value)} placeholder="550" />
          </div>
        </div>

        {/* Skill */}
        <div>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Skill culinaria (opcional)</label>
          <input value={recipe.skill} onChange={e => update("skill", e.target.value)} placeholder="Ej: Wok a fuego alto" />
        </div>

        {/* Ingredients */}
        <div>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>
            Ingredientes <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none" }}>(para buscar por ingrediente)</span>
          </label>
          {(recipe.ingredients || []).map((ing, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <input value={ing} onChange={e => updateIngredient(idx, e.target.value)} placeholder={`Ingrediente ${idx + 1}`} />
              {(recipe.ingredients || []).length > 1 && (
                <button onClick={() => removeIngredient(idx)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", padding: "0 8px", color: "var(--red)", fontSize: 14 }}>−</button>
              )}
            </div>
          ))}
          <button onClick={addIngredient} style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", padding: "6px 14px", color: "var(--accent)", fontSize: 12, fontWeight: 600, width: "100%" }}>+ Agregar ingrediente</button>
        </div>

        {/* Shopping items */}
        <div>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>
            Items de compra extras <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none" }}>(se agregan a la lista automática)</span>
          </label>
          {(recipe.shop || []).map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <input value={item.i} onChange={e => updateShop(idx, "i", e.target.value)} placeholder="Item" style={{ flex: 2 }} />
              <select value={item.c} onChange={e => updateShop(idx, "c", e.target.value)} style={{ flex: 1 }}>
                <option value="Proteínas">Proteínas</option>
                <option value="Verduras">Verduras</option>
                <option value="Carbs">Carbs</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Despensa">Despensa</option>
              </select>
              <button onClick={() => removeShop(idx)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", padding: "0 8px", color: "var(--red)", fontSize: 14 }}>−</button>
            </div>
          ))}
          <button onClick={addShop} style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", padding: "6px 14px", color: "var(--accent)", fontSize: 12, fontWeight: 600, width: "100%" }}>+ Agregar item de compra</button>
        </div>

        {/* Prep items */}
        <div>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>
            Items de prep que usa <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none" }}>(del prep dominical)</span>
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {allPrepFlat.map(p => {
              const selected = (recipe.prep || []).includes(p.id);
              return (
                <button key={p.id} onClick={() => {
                  if (selected) update("prep", (recipe.prep || []).filter(x => x !== p.id));
                  else update("prep", [...(recipe.prep || []), p.id]);
                }} style={{
                  padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 500,
                  border: `1px solid ${selected ? "var(--green-border)" : "var(--border)"}`,
                  background: selected ? "var(--green-bg)" : "var(--bg-input)",
                  color: selected ? "var(--green)" : "var(--text-secondary)",
                }}>
                  {selected ? "✓ " : ""}{p.what.split("(")[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Steps */}
        <div>
          <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", display: "block", marginBottom: 4 }}>Pasos de cocción</label>
          {recipe.steps.map((step, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "flex-start" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 8, fontSize: 10, fontWeight: 700, color: "var(--accent)" }}>{idx + 1}</div>
              <textarea value={step} onChange={e => updateStep(idx, e.target.value)} placeholder={`Paso ${idx + 1}`} rows={2} style={{ flex: 1, minHeight: 40 }} />
              {recipe.steps.length > 1 && (
                <button onClick={() => removeStep(idx)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", padding: "0 8px", color: "var(--red)", fontSize: 14, marginTop: 6 }}>−</button>
              )}
            </div>
          ))}
          <button onClick={addStep} style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", padding: "6px 14px", color: "var(--accent)", fontSize: 12, fontWeight: 600, width: "100%" }}>+ Agregar paso</button>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 8, paddingBottom: 20 }}>
          <button onClick={() => { if (canSave) onSave(recipe); }} style={{
            flex: 1, padding: "12px", borderRadius: 10, border: "none", cursor: canSave ? "pointer" : "not-allowed",
            background: canSave ? "var(--accent)" : "var(--border)",
            color: canSave ? "var(--bg-primary)" : "var(--text-tertiary)",
            fontSize: 14, fontWeight: 700,
          }}>
            💾 Guardar Receta
          </button>
          <button onClick={onCancel} style={{
            padding: "12px 20px", borderRadius: 10, border: "1px solid var(--border)",
            background: "transparent", color: "var(--text-secondary)",
            cursor: "pointer", fontSize: 14, fontWeight: 600,
          }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
